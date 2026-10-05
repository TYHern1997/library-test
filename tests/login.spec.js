import { test, expect } from '@playwright/test';

test('user can log in', async ({ page }) => {
    await page.goto('https://library-frontend-mu-nine.vercel.app/auth');
    await page.getByLabel('Email').fill('kim@email.com');
    await page.getByLabel('Password').fill(process.env.KIM_PASSWORD);
    await page.locator('form').getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Kim')).toBeVisible();
});