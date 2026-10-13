import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://library-frontend-mu-nine.vercel.app/auth');
    await page.getByLabel('Email').fill('kim@email.com');
    await page.getByLabel('Password').fill(process.env.KIM_PASSWORD);
    await page.locator('form').getByRole('button', { name: 'Login' }).click();
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
});

test('user can see the book list after login', async ({ page }) => {
    await expect(page.getByRole('table')).toBeVisible();
});

test('user can borrow and return a book', async ({ page }) => {
    const row = page.getByRole('row')
        .filter({ has: page.getByRole('button', { name: 'Borrow' }) })
        .first();
    const title = (await row.getByRole('cell').first().textContent()).trim();

    await row.getByRole('button', { name: 'Borrow' }).click();
    const bookRow = page.getByRole('row', { name: title });
    await expect(bookRow.getByRole('button', { name: 'Return' })).toBeVisible();

    await bookRow.getByRole('button', { name: 'Return' }).click();
    await expect(bookRow.getByRole('button', { name: 'Borrow' })).toBeVisible();
});