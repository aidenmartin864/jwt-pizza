import { test, expect } from 'playwright-test-coverage';

test('admin processes', async({page}) => {
    await page.route('*/**/api/auth', async (route) => {
        const loginReq = { email: 'a@jwt.com', password: 'admin' };
        const loginRes = { user: { id: 4, name: 'Ad Min', email: 'a@jwt.com', roles: [{ role: 'admin' }] }, token: 'cbgb' };
        expect(route.request().method()).toBe('PUT');
        expect(route.request().postDataJSON()).toMatchObject(loginReq);
        await route.fulfill({ json: loginRes });
    });

    await page.route('*/**/api/franchise', async (route) => {
        if(route.request().method() === 'GET'){
            const franchiseRes = [
                {
                    "stores": [],
                    "id": 10,
                    "name": "bestPizza",
                    "admins": [
                        {
                            "email": "d@jwt.com",
                            "id": 2,
                            "name": "pizza diner"
                        }
                    ]
                },
                { id: 3, name: 'PizzaCorp', stores: [{ id: 7, name: 'Spanish Fork' }] },
            ];
            await route.fulfill({ json: franchiseRes });
        } else if(route.request().method() === 'POST'){
            const franchiseRes = [
            { id: 10, name: 'bestPizza' },
            ];
            await route.fulfill({ json: franchiseRes });
        } else {
            await route.continue();
        }
    });
    
    // Log into admin account
    await page.goto('/');
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).fill('a@jwt.com');
    await page.getByRole('textbox', { name: 'Email address' }).press('Tab');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin');
    await page.getByRole('button', { name: 'Login' }).click();

    // Add Franchise
    await page.getByRole('link', { name: 'Admin', exact: true }).click();
    await page.getByRole('button', { name: 'Add Franchise' }).click();
    await page.getByRole('textbox', { name: 'franchise name' }).click();
    await page.getByRole('textbox', { name: 'franchise name' }).fill('bestPizza');
    await page.getByRole('textbox', { name: 'franchise name' }).press('Tab');
    await page.getByRole('textbox', { name: 'franchisee admin email' }).fill('t@jwt.com');
    await page.getByRole('button', { name: 'Create' }).click();
    
    // Close Store
    await page.goto('/admin-dashboard');

    await page.getByRole('row', { name: 'Spanish Fork ₿ Close' }).getByRole('button').click();
    await page.getByRole('button', { name: 'Close' }).click();

    // Close Franchise
    await page.goto('/admin-dashboard');
    await page.getByRole('row', { name: 'PizzaCorp Close' }).getByRole('button').click()
    await page.getByRole('button', { name: 'Close' }).click();
});

test('non-admin user', async ({page}) => {
    await page.goto('/admin-dashboard');
    await page.getByText('Oops').click();
    await page.getByText('It looks like we have dropped').click();
});