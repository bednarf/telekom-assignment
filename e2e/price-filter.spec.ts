import { test, expect } from '@playwright/test';

test.describe('Product Price Filter', () => {
  test('filters products by price range', async ({ page }) => {
    await page.goto('/');

    // 1. Wait for all products to be visible (20 products expected initially)
    const productCards = page.locator('a[aria-label^="View details for"]');
    await expect(productCards).toHaveCount(20);

    // 2. Check initial price range text
    const priceRangeText = page.locator('span.text-sm.text-gray-500.mb-2');
    await expect(priceRangeText).toHaveText(/Price range: \$0 - \$1000/);

    // 3. Interact with the price slider (set min to 10, max to 990)
    // The slider is custom, so use keyboard to move the thumbs
    const sliderThumbs = page.locator('[role="slider"]');
    await sliderThumbs.first().focus();
    // Move min thumb to 10 (simulate 10 right arrows)
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(100);
    }
    // Move to max thumb
    await sliderThumbs.nth(1).focus();
    // Move max thumb to 990 (simulate 10 left arrows from 1000)
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('ArrowLeft');
      await page.waitForTimeout(100);
    }

    // 4. Wait for UI to update
    await page.waitForTimeout(500);

    // 5. Check that the price range text updates
    await expect(priceRangeText).toHaveText(/Price range: \$10 - \$990/);

    // 6. Check that only products in the $10-$990 range are shown
    const filteredCards = page.locator('a[aria-label^="View details for"]');
    const count = await filteredCards.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const card = filteredCards.nth(i);
      const priceText = await card.locator('p.text-pink-600').innerText();
      const price = parseFloat(priceText.replace(/[^\d.]/g, ''));
      expect(price).toBeGreaterThanOrEqual(10);
      expect(price).toBeLessThanOrEqual(990);
    }
  });
});
