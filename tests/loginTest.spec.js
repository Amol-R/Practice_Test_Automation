import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage';
import { beforeEach } from 'node:test';


let loginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page)
  await loginPage.openURL()
})


// ------- Positive Tests (POS)------------------------------------------------------------------------

test('TC_POS_01 - Valid login with correct username & password', async ({ page }) => {
  await loginPage.login('student', 'Password123')
  await expect(page).toHaveURL(/.*logged-in-successfully/);
  await loginPage.verifySuccessMessage()
})

test('TC_POS_02 - Login button enabled after entering credentials', async ({ page }) => {
  await page.locator('#username').fill('student');
  await page.locator('#password').fill('Password123');
  await expect(page.locator('#submit')).toBeEnabled();
}); 

test('TC_POS_03 - Verify password masking', async ({ page }) => {
  await page.locator('#password').fill('Password123');
  const type = await page.locator('#password').getAttribute('type');
  expect(type).toBe('password');
});

test('TC_POS_04 - Verify navigation URL after successful login', async ({ page }) => {
  await loginPage.login('student', 'Password123');
  await expect(page).toHaveURL('https://practicetestautomation.com/logged-in-successfully/');
});

test('TC_POS_05 - Logout button should appear after login', async ({ page }) => {
  await loginPage.login('student', 'Password123');
  await expect(page.locator('.wp-block-button__link')).toBeVisible();
});

// ------- Negative Tests  (NEG)------------------------------------------------------------------------

  test('TC_NEG_01 - Login with invalid username', async () => {
    await loginPage.login('wrongUser', 'Password123');
    await loginPage.verifyErrorMessage('Your username is invalid!');
  });

  test('TC_NEG_02 - Login with invalid password', async () => {
    await loginPage.login('student', 'WrongPass');
    await loginPage.verifyErrorMessage('Your password is invalid!');
  });

  test('TC_NEG_03 - Login with blank username', async () => {
    await loginPage.login('', 'Password123');
    await loginPage.verifyErrorMessage('Your username is invalid!');
  });

  test('TC_NEG_04 - Login with blank password', async () => {
    await loginPage.login('student', '');
    await loginPage.verifyErrorMessage('Your password is invalid!');
  });

  test('TC_NEG_05 - Login with both fields blank', async () => {
    await loginPage.login('', '');
    await loginPage.verifyErrorMessage('Your username is invalid!');
  });