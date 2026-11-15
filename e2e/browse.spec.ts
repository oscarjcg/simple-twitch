import { categories, channels, expect, test } from './support/mock-backend';

test.describe('Browse page', () => {
  test('lists every category', async ({ page }) => {
    await page.goto('/directory');

    await expect(page.locator('app-browse h1.title')).toHaveText('Browse');
    await expect(page.locator('app-browse a.feature-title', { hasText: 'Categories' })).toHaveClass(/active/);
    await expect(page.locator('app-category-list a.name')).toHaveText(categories.map(c => c.name));
  });

  test('Live Channels tab lists every channel', async ({ page }) => {
    await page.goto('/directory');

    await page.getByRole('link', { name: 'Live Channels' }).click();

    await expect(page).toHaveURL(/\/directory\/all$/);
    await expect(page.locator('app-browse a.feature-title', { hasText: 'Live Channels' })).toHaveClass(/active/);
    await expect(page.locator('app-channel-list .channel-name')).toHaveText(channels.map(c => c.name));
  });

  test('opening a category shows its game page with live channels', async ({ page }) => {
    await page.goto('/directory');

    await page.locator('app-category-list a.name', { hasText: 'Overwatch' }).click();

    await expect(page).toHaveURL(/\/directory\/game\/Overwatch$/);
    await expect(page.locator('app-game .header h1')).toHaveText('Overwatch');
    await expect(page.locator('app-game .header img')).toHaveAttribute('src', '/assets/img/overwatch.jpg');
    await expect(page.locator('app-game app-channel-item')).toHaveCount(channels.length);
  });

  test('a category name with spaces opens the right game page', async ({ page }) => {
    await page.goto('/directory');

    await page.locator('app-category-list a.name', { hasText: 'League of Legends' }).click();

    await expect(page).toHaveURL(/\/directory\/game\/League%20of%20Legends$/);
    await expect(page.locator('app-game .header h1')).toHaveText('League of Legends');
  });
});
