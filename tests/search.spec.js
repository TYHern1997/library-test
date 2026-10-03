import { test, expect } from '@playwright/test';

test('search shows only matching books', async ({ page }) => {
    await page.goto('https://library-frontend-mu-nine.vercel.app/');

    await page.getByPlaceholder('Search by title').fill('Dune');
    await page.getByRole('button', { name: 'Search' }).click();

    await expect(page.getByRole('cell', { name: 'Dune', exact: true })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Black Beauty' })).toHaveCount(0);
})