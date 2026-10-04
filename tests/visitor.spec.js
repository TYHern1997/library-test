import { test, expect } from '@playwright/test';

test('guests or non-users gets a login alert when clicking Borrow', async ({ page }) => {
    await page.goto('https://library-frontend-mu-nine.vercel.app');

    let alertMessage = '';
    page.once('dialog', async (dialog) => {
        alertMessage = dialog.message();
        await dialog.accept();
    })

    await page.getByRole('button', { name: 'Borrow' }).first().click();

    expect(alertMessage).toBe('Please log in to borrow books.');
})