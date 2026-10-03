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

test('admin can add and delete a book', async ({ page }) => {
    const title = `Test Book ${Date.now()}`;

    await page.getByPlaceholder('Title', { exact: true }).fill(title);
    await page.getByPlaceholder('Author', { exact: true }).fill('Test Author');
    await page.getByPlaceholder('Category', { exact: true }).fill('Testing');
    await page.getByPlaceholder('Year', { exact: true }).fill('2024');
    await page.getByRole('button', { name: 'Add Book' }).click();
    await expect(page.getByRole('cell', { name: title })).toBeVisible();

    const row = page.getByRole('row', { name: title });
    page.once('dialog', dialog => dialog.accept());
    await row.locator('.btn-outline-danger').click();

    await expect(page.getByRole('cell', { name: title })).toHaveCount(0);
});

test('admin can edit a book', async ({ page }) => {
    const title = `Test Book ${Date.now()}`;
    const newTitle = `${title} Edited`;

    await page.getByPlaceholder('Title', { exact: true }).fill(title);
    await page.getByPlaceholder('Author', { exact: true }).fill('Test Author');
    await page.getByPlaceholder('Category', { exact: true }).fill('Testing');
    await page.getByPlaceholder('Year', { exact: true }).fill('2024');
    await page.getByRole('button', { name: 'Add Book' }).click();
    await expect(page.getByRole('cell', { name: title, exact: true })).toBeVisible();

    await page.getByRole('row', { name: title }).locator('.btn-outline-primary').click();
    await page.getByPlaceholder('Title', { exact: true }).fill(newTitle);
    await page.getByRole('button', { name: 'Update Book' }).click();
    await expect(page.getByRole('cell', { name: newTitle, exact: true })).toBeVisible();

    page.once('dialog', dialog => dialog.accept());
    await page.getByRole('row', { name: newTitle }).locator('.btn-outline-danger').click();
    await expect(page.getByRole('cell', { name: newTitle })).toHaveCount(0);
});
