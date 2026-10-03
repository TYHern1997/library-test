import { test, expect } from '@playwright/test';

const BASE = 'https://library-frontend-mu-nine.vercel.app';

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
    await page.getByRole('button', { name: 'Borrow' }).first().click();

    const returnBtn = page.getByRole('button', { name: 'Return' }).first();
    await expect(returnBtn).toBeVisible();

    await returnBtn.click();
    await expect(page.getByRole('button', { name: 'Return' })).toHaveCount(0);
});