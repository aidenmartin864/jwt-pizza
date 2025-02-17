import { test, expect } from '@playwright/test';
import { pizzaService } from '../src/service/service';

test('test', async ({ page }) => {
  await page.route('*/**/api/auth', async (route) => {
    const loginReq = { email: 'd@jwt.com', password: 'a' };
    const loginRes = { user: { id: 3, name: 'Kai Chen', email: 'd@jwt.com', roles: [{ role: 'diner' }] }, token: 'abcdef' };
    // expect(route.request().method()).toBe('PUT');
    // expect(route.request().postDataJSON()).toMatchObject(loginReq);
    // await route.fulfill({ json: loginRes });
  });

  await page.goto('/logout');
  await expect(page.getByRole('heading')).toContainText('Logout');
  await expect(page.getByRole('main')).toContainText('Logging out ...');

  // await page.goto('/');
  // await page.getByRole('link', { name: 'Login' }).click();
  // await page.getByRole('textbox', { name: 'Email address' }).fill('d@jwt.com');
  // await page.getByRole('textbox', { name: 'Email address' }).press('Tab');
  // await page.getByRole('textbox', { name: 'Password' }).fill('a');
  // await page.getByRole('button', { name: 'Login' }).click();

  // await page.getByRole('link', { name: 'Logout' }).click();
  // await page.getByRole('heading', { name: 'Logout' }).locator('span').isVisible();
  // await page.getByText('Logging out').isVisible();
});