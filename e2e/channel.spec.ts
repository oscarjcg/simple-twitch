import { expect, test } from './support/mock-backend';

test.describe('Channel page', () => {
  test('a 3D model channel shows the model viewer', async ({ page }) => {
    await page.goto('/modeler');

    await expect(page.locator('app-header-channel .channel-name')).toHaveText('modeler');
    await expect(page.locator('app-channel iframe')).toHaveAttribute(
      'src',
      'https://models3d.codename-project.com/?model=robot',
    );
    await expect(page.locator('youtube-player')).toHaveCount(0);
    await expect(page.locator('app-channel .info')).toHaveText('People: 0');
  });

  test('a YouTube channel shows the video player', async ({ page }) => {
    await page.goto('/gamer');

    await expect(page.locator('app-header-channel .channel-name')).toHaveText('gamer');
    await expect(page.locator('youtube-player')).toBeAttached();
  });

  test('the chat shows the comments and sends new ones', async ({ page, postedComments }) => {
    await page.goto('/gamer');
    const chat = page.locator('app-chat');

    await expect(chat.locator('.title')).toHaveText('CHAT');
    await expect(chat.locator('.comment')).toHaveText(['Hello!', 'Nice stream']);

    const input = chat.getByPlaceholder('Send a message');
    await input.fill('Hello from Playwright');
    await input.press('Enter');

    await expect.poll(() => postedComments).toEqual([
      { channel_id: '1', author: 'Angular App', comment: 'Hello from Playwright' },
    ]);
    await expect(input).toHaveValue('');
  });

  test('switching channels from the sidebar loads the new chat', async ({ page }) => {
    await page.goto('/gamer');
    await expect(page.locator('app-chat .comment')).toHaveText(['Hello!', 'Nice stream']);

    await page.locator('app-simple-channel-list').getByText('modeler', { exact: true }).click();

    await expect(page).toHaveURL(/\/modeler$/);
    await expect(page.locator('app-chat .comment')).toHaveText(['Cool model']);
  });

  test.describe('on a phone', () => {
    test.use({ viewport: { width: 375, height: 812 } });

    test('hides the chat', async ({ page }) => {
      await page.goto('/gamer');

      await expect(page.locator('app-header-channel .channel-name')).toHaveText('gamer');
      await expect(page.locator('app-chat')).toHaveCount(0);
    });
  });
});
