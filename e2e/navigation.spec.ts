import { channels, expect, test } from './support/mock-backend';

test.describe('Navigation', () => {
  test('header links switch between Discover and Browse', async ({ page }) => {
    await page.goto('/');
    const header = page.locator('app-header');
    const discover = header.locator('li', { hasText: 'Discover' });
    const browse = header.locator('li', { hasText: 'Browse' });

    await expect(header.locator('.navbar-brand')).toHaveText('Simple Twitch');
    await expect(discover).toHaveClass(/active/);
    await expect(browse).not.toHaveClass(/active/);

    await browse.getByRole('link').click();
    await expect(page).toHaveURL(/\/directory$/);
    await expect(browse).toHaveClass(/active/);
    await expect(discover).not.toHaveClass(/active/);

    await discover.getByRole('link').click();
    await expect(page).toHaveURL(/\/$/);
    await expect(discover).toHaveClass(/active/);
  });

  test('sidebar lists the popular channels and opens them', async ({ page }) => {
    await page.goto('/');
    const sidebar = page.locator('app-simple-channel-list');

    await expect(sidebar.locator('.title')).toHaveText('Popular channels');
    await expect(sidebar.locator('.channel-name')).toHaveText(channels.map(c => c.name));

    await sidebar.getByText('modeler', { exact: true }).click();

    await expect(page).toHaveURL(/\/modeler$/);
    await expect(page.locator('app-header-channel .channel-name')).toHaveText('modeler');
  });
});
