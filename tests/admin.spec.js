import { test, expect } from '@playwright/test';

const BASE = 'https://library-frontend-mu-nine.vercel.app';

async function login(page, email, password) {
    await page.goto(`${BASE}/auth`);
    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Password').fill(password);
    await page.locator('form').getByRole('button', { name: 'Login' }).click();
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
}

test('regular user does not see Users link', async ({ page }) => {
    await login(page, 'kim@email.com', process.env.KIM_PASSWORD);
    await expect(page.getByRole('link', { name: 'Users' })).toHaveCount(0);
});

test('admin sees Users link and can open the page', async ({ page }) => {
    await login(page, 'haris@test.com', process.env.HARIS_PASSWORD);
    await page.getByRole('link', { name: 'Users' }).click();
    await expect(page).toHaveURL(/\/users/);
});