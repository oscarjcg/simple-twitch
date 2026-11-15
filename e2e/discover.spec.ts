import { categories, channels, expect, test } from './support/mock-backend';

test.describe('Discover page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('shows the recommended categories and channels', async ({ page }) => {
    const rows = page.locator('app-recommended-list');
    await expect(rows).toHaveCount(2);

    await expect(rows.nth(0).locator('.title')).toHaveText(/Recommended\s+categories/);
    await expect(rows.nth(0).locator('app-category-item').first()).toBeVisible();

    await expect(rows.nth(1).locator('.title')).toHaveText(/Recommended\s+Simulation/);
    await expect(rows.nth(1).locator('app-channel-item').first()).toBeVisible();
  });

  const cases = [
    { row: 0, item: 'app-category-item', total: categories.length },
    { row: 1, item: 'app-channel-item', total: channels.length },
  ];

  for (const { row, item, total } of cases) {
    test(`"Show more" expands the ${item} row`, async ({ page }) => {
      const list = page.locator('app-recommended-list').nth(row);
      const items = list.locator(item);
      const showMore = list.getByText('Show more');

      await expect(items.first()).toBeVisible();
      const before = await items.count();
      expect(before).toBeGreaterThan(0);
      expect(before).toBeLessThan(total);

      await showMore.click();

      await expect(showMore).toHaveCount(0);
      await expect.poll(() => items.count()).toBeGreaterThan(before);
    });
  }
});
