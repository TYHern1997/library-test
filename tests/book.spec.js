import { test, expect } from '@playwright/test';

test('book list loads', async ({ page }) => {
    await page.goto('https://library-frontend-mu-nine.vercel.app/');
    await expect(page.getByText('Book Collection')).toBeVisible();
});