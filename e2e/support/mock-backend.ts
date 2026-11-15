import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test as base, expect, Page } from '@playwright/test';

function fixture<T>(name: string): T {
  return JSON.parse(readFileSync(join(__dirname, '..', 'fixtures', name), 'utf8'));
}

export const categories = fixture<{ name: string; image: string }[]>('categories.json');
export const channels = fixture<{ id: number; name: string; content: string; channelTypeId: number }[]>('channels.json');
export const comments = fixture<Record<string, { id: number; author: string; text: string }[]>>('comments.json');

export type PostedComment = Record<string, string>;

function parseMultipart(body: string): PostedComment {
  const fields: PostedComment = {};
  for (const match of body.matchAll(/name="([^"]+)"\r\n\r\n([\s\S]*?)\r\n--/g)) {
    fields[match[1]] = match[2];
  }
  return fields;
}

async function mockBackend(page: Page, posted: PostedComment[]) {
  await page.route('**/api/category', route => route.fulfill({ json: categories }));
  await page.route('**/api/channel', route => route.fulfill({ json: channels }));
  await page.route('**/api/comment/ByChannelName/*', route => {
    const name = decodeURIComponent(new URL(route.request().url()).pathname.split('/').pop());
    return route.fulfill({ json: comments[name] ?? [] });
  });
  await page.route('**/api/comment', route => {
    if (route.request().method() !== 'POST') {
      return route.fallback();
    }
    posted.push(parseMultipart(route.request().postData() ?? ''));
    return route.fulfill({ status: 201, json: {} });
  });

  await page.route('**/socket.io/**', route => route.abort());
  await page.routeWebSocket(/socket\.io/, ws => ws.close());
  await page.route(/youtube\.com|ytimg\.com|googlevideo\.com/, route => route.abort());
  await page.route(/models3d\.codename-project\.com/, route => route.abort());
}

export const test = base.extend<{ postedComments: PostedComment[] }>({
  postedComments: [
    async ({ page }, use) => {
      const posted: PostedComment[] = [];
      await mockBackend(page, posted);
      await use(posted);
    },
    { auto: true },
  ],
});

export { expect };
