import { test, expect } from 'playwright-test-coverage';

test('home page', async ({ page }) => {
  await page.goto('/');

  expect(await page.title()).toBe('JWT Pizza');
  
  await page.getByRole('navigation', { name: 'Global' }).getByRole('img').click();
  await page.getByText('JWT Pizza', { exact: true }).click();
  await page.getByRole('navigation', { name: 'Global' }).click();
  await page.getByRole('banner').click();
  await page.getByRole('link', { name: 'Order' }).click();
  await page.getByLabel('Global').getByRole('link', { name: 'Franchise' }).click();
  await page.getByRole('link', { name: 'Login', exact: true }).click();
  await page.getByRole('link', { name: 'Register' }).click();
  await page.getByRole('link', { name: 'About' }).click();
  await page.getByRole('contentinfo').getByRole('link', { name: 'Franchise' }).click();
});