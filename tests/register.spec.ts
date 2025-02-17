import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.route('*/**/api/auth', async (route) => {
    const registerReq = {
      name: "Test Diner",
      email: "t@jwt.com",
      password: "test"
    }
    const registerRes = { user: { id: 3, name: 'Test Diner', email: 't@jwt.com', roles: [{ role: 'diner' }] }, token: 'abcdef' };
    expect(route.request().method()).toBe('POST');
    expect(route.request().postDataJSON()).toMatchObject(registerReq);
    await route.fulfill({ json: registerRes });
  });

  await page.goto('/');
  await page.getByRole('link', { name: 'Register' }).click();
  await page.getByRole('textbox', { name: 'Full name' }).fill('Test Diner');
  await page.getByRole('textbox', { name: 'Full name' }).press('Tab');
  await page.getByRole('textbox', { name: 'Email address' }).fill('t@jwt.com');
  await page.getByRole('textbox', { name: 'Email address' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('test');
  await page.getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByRole('button', { name: 'Register' }).click();
  await expect(page.getByRole('link', { name: 'TD' })).toBeVisible();
});