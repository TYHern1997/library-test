import { test, expect } from '@playwright/test'


test.beforeEach(async ({ page }) => {
    await page.goto('https://library-frontend-mu-nine.vercel.app/auth');
    await page.getByLabel('Email').fill('kim@email.com');
    await page.getByLabel('Password').fill(process.env.KIM_PASSWORD);
    await page.locator('form').getByRole('button', { name: 'Login' }).click();
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
})

test('borrowed book moves from Current Borrow to History', async ({ page }) => {
    const row = page.getByRole('row')
        .filter({ has: page.getByRole('button', { name: 'Borrow' }) })
        .first()
    const title = (await row.getByRole('cell').first().textContent()).trim()

    const returnBtn = page.getByRole('button', { name: 'Return' }).first();

    await page.getByRole('button', { name: 'Borrow' }).first().click();

    await expect(
        page.getByRole('row', { name: title }).getByRole('button', { name: 'Return' })
    ).toBeVisible();

    await page.goto('https://library-frontend-mu-nine.vercel.app/profile');
    ;
    await expect(page.getByRole('cell', { name: title })).toBeVisible()

    await page.getByRole('row', { name: title }).getByRole('button', { name: 'Return' }).click();
    await expect(page.getByRole('cell', { name: title })).toHaveCount(0);
    await page.getByRole('tab', { name: /History/ }).click()
    await expect(page.getByRole('cell', { name: title })).toBeVisible()

})