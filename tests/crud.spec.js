import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://library-frontend-mu-nine.vercel.app/auth');
    await page.getByLabel('Email').fill('haris@test.com');
    await page.getByLabel('Password').fill(process.env.HARIS_PASSWORD);
    await page.locator('form').getByRole('button', { name: 'Login' }).click();
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();

});

test('admin can see the book table', async ({ page }) => {
    await expect(page.getByRole('table')).toBeVisible();
});

test('admin can add books', async ({ page }) => {
    const title = `Test Book ${Date.now()}`;

    await page.getByPlaceholder('Title', { exact: true }).fill(title);
    await page.getByPlaceholder('Author', { exact: true }).fill('Test Author');
    await page.getByPlaceholder('Category', { exact: true }).fill('Testing');
    await page.getByPlaceholder('Year', { exact: true }).fill('2024');
    await page.getByRole('button', { name: 'Add Book' }).click();

    await expect(page.getByRole('cell', { name: title })).toBeVisible();
})