import { test, expect } from 'playwright-test-coverage';

test('franchisee processes', async({page}) => {
    await page.route('*/**/api/auth', async (route) => {
        const loginReq = { email: 'f@jwt.com', password: 'f' };
        const loginRes = { user: { id: 4, name: 'Frank Hisee', email: 'f@jwt.com',
            roles:[ { 
                objectId:10, role: "franchisee" 
            }] }, token: 'cbgb' };
        expect(route.request().method()).toBe('PUT');
        expect(route.request().postDataJSON()).toMatchObject(loginReq);
        await route.fulfill({ json: loginRes });
    });

    await page.route('*/**/api/franchise/', async (route) => {
        if(route.request().method() === 'GET'){
            const franchiseRes = [
                {
                    "stores": [],
                    "id": 10,
                    "name": "bestPizza",
                    "admins": [
                        {
                            "email": "f@jwt.com",
                            "id": 4,
                            "name": "Frank Hisee"
                        }
                    ]
                },
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

    await page.route('*/**/api/franchise/4', async (route) => {
        if(route.request().method() === 'GET'){
            const franchiseRes = [
                {
                    "stores": [{ id: 7, name: 'Spanish Fork' }],
                    "id": 10,
                    "name": "bestPizza",
                    "admins": [
                        {
                            "email": "f@jwt.com",
                            "id": 4,
                            "name": "Frank Hisee"
                        }
                    ]
                },
            ];
        await route.fulfill({ json: franchiseRes });
        }
    });
    
    // Log into franchisee account
    await page.goto('/');
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).fill('f@jwt.com');
    await page.getByRole('textbox', { name: 'Email address' }).press('Tab');
    await page.getByRole('textbox', { name: 'Password' }).fill('f');
    await page.getByRole('button', { name: 'Login' }).click();

    // Create Store
    await page.getByLabel('Global').getByRole('link', { name: 'Franchise' }).click();
    await page.getByRole('button', { name: 'Create store' }).click();
    await page.getByRole('textbox', { name: 'store name' }).fill('American Fork');
    await page.getByRole('button', { name: 'Create' }).click();
    
    // // Close Store
    await page.goto('/franchise-dashboard');

    await page.getByRole('row', { name: 'Spanish Fork ₿ Close' }).getByRole('button').click();
    await page.getByRole('button', { name: 'Close' }).click();

    // Close Franchise
    // await page.goto('/admin-dashboard');
    // await page.getByRole('row', { name: 'PizzaCorp Close' }).getByRole('button').click()
    // await page.getByRole('button', { name: 'Close' }).click();
});