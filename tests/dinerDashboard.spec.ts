import { test, expect } from '@playwright/test';

test('diner login and dashboard', async ({ page }) => {
  await page.route('*/**/api/auth', async (route) => {
    const loginReq = { email: 'd@jwt.com', password: 'diner' };
    const loginRes = { user: { id: 4, name: 'Dine Hur', email: 'd@jwt.com', roles: [{ role: 'diner' }] }, token: 'cbgb' };
    expect(route.request().method()).toBe('PUT');
    expect(route.request().postDataJSON()).toMatchObject(loginReq);
    await route.fulfill({ json: loginRes });
  });

  await page.route('*/**/api/order', async (route) => {
    expect(route.request().method()).toBe('GET');
    const orderRes = {"dinerId": 2,
    "orders": [
        {
            "id": 4,
            "franchiseId": 1,
            "storeId": 1,
            "date": "2025-01-15T21:49:29.000Z",
            "items": [
                {
                    "id": 3,
                    "menuId": 2,
                    "description": "Pepperoni",
                    "price": 0.0042
                }
            ]
        }]
    }
    await route.fulfill({ json: orderRes });
  });

  // Diner Login
  await page.goto('/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('d@jwt.com');
  await page.getByRole('textbox', { name: 'Email address' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('diner');
  await page.getByRole('button', { name: 'Login' }).click();

  // Diner Dashboard
  await page.getByRole('link', { name: 'DH' }).click();
  await expect(page.getByRole('main')).toContainText('Dine Hur');
  await expect(page.getByRole('main')).toContainText('d@jwt.com');
  await expect(page.getByRole('main')).toContainText('diner');

  await expect(page.getByRole('cell', { name: '4', exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: '₿' }).first()).toBeVisible();
  await expect(page.getByRole('cell', { name: '2025-01-15T21:49:29.000Z' })).toBeVisible();
});