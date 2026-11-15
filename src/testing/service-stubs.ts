import { Subject } from 'rxjs';
import { vi } from 'vitest';
import { Category } from '../app/shared/model/category.model';
import { Channel } from '../app/shared/model/channel.model';
import { CommentChat } from '../app/shared/model/comment.model';
import { CategoryService } from '../app/shared/service/category.service';
import { ChannelService } from '../app/shared/service/channel.service';
import { ChatService } from '../app/shared/service/chat.service';

export function createCategoryServiceStub(categories: Category[] = []) {
  const stub = {
    categories,
    categoriesChanged: new Subject<Category[]>(),
    fetchCategories: vi.fn(),
    getCategories: vi.fn(() => stub.categories.slice()),
  };
  return stub;
}

export function createChannelServiceStub(channels: Channel[] = []) {
  const stub = {
    channels,
    channelChanged: new Subject<Channel[]>(),
    currentTimeChanged: new Subject<number>(),
    fetchChannels: vi.fn(),
    getChannels: vi.fn(() => stub.channels.slice()),
    getChannel: vi.fn((name: string) => stub.channels.find(c => c.name === name)),
  };
  return stub;
}

export function createChatServiceStub() {
  return {
    commentsChanged: new Subject<CommentChat[]>(),
    fetchComments: vi.fn(),
    addComment: vi.fn(),
  };
}

export const provideCategoryStub = (stub: ReturnType<typeof createCategoryServiceStub>) =>
  ({ provide: CategoryService, useValue: stub });
export const provideChannelStub = (stub: ReturnType<typeof createChannelServiceStub>) =>
  ({ provide: ChannelService, useValue: stub });
export const provideChatStub = (stub: ReturnType<typeof createChatServiceStub>) =>
  ({ provide: ChatService, useValue: stub });

export function setElementSize(el: Element, size: { clientWidth?: number; clientHeight?: number }) {
  for (const [key, value] of Object.entries(size)) {
    Object.defineProperty(el, key, { configurable: true, value });
  }
}

export function resizeWindow(width: number): () => void {
  const original = window.innerWidth;
  Object.defineProperty(window, 'innerWidth', { configurable: true, writable: true, value: width });
  window.dispatchEvent(new Event('resize'));
  return () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, writable: true, value: original });
  };
}
