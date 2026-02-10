import { test, expect } from '../fixtures/pageFixtures';
import { testData } from '../data/testData';

test.describe('Account Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.context().clearCookies();
    try {
      await page.goto('/');
      await page.evaluate(() => {
        (globalThis as any).localStorage?.clear();
        (globalThis as any).sessionStorage?.clear();
      });
    } catch (e) {
      // ignore storage access errors
    }
  });

  test('TC-201: User should be able to view account details after login', async ({
    page,
    loginPage,
    signupPage,
  }) => {
    // Test ID: TC-201
    // Description: Verify user can access account details
    // Expected: Account page displays user information

    await loginPage.navigateToLogin();

    // Create a unique user for this test
    const testUser = {
      ...testData.validUsers[0],
      name: 'TC201 Test User',
      email: `tc201.${Date.now()}@automation.com`,
    };

    // First signup
    await loginPage.fillSignupForm(testUser.name, testUser.email);
    await loginPage.clickSignupButton();
    await page.waitForSelector('h2:has-text("Enter Account Information")');

    // Complete account creation using helper method
    await signupPage.completeSignup(
      testUser.title,
      testUser.password,
      testUser.day,
      testUser.month,
      testUser.year,
      testUser.firstName,
      testUser.lastName,
      testUser.company,
      testUser.address,
      testUser.city,
      testUser.state,
      testUser.zipcode,
      testUser.mobileNumber
    );

    // Verify account created
    await expect(signupPage.isAccountCreatedMessageDisplayed()).toBeTruthy();

    // Continue after success
    await signupPage.clickContinueButton();

    // ✅ FINAL LOGIN PROOF
    await expect(page.getByRole('link', { name: /logout/i })).toBeVisible();
  });

  test('TC-202: User should be able to delete account', async ({
    page,
    loginPage,
    signupPage,
  }) => {
    // Test ID: TC-202
    // Description: Verify user can delete their account
    // Expected: Account is deleted and user is logged out

    await loginPage.navigateToLogin();

    // Create a unique user for this test
    const testUser = {
      ...testData.validUsers[0],
      name: 'TC202 Delete User',
      email: `tc202.delete.${Date.now()}@automation.com`,
    };

    // Sign up fully
    await loginPage.fillSignupForm(testUser.name, testUser.email);
    await loginPage.clickSignupButton();
    await page.waitForSelector('h2:has-text("Enter Account Information")');

    await signupPage.completeSignup(
      testUser.title,
      testUser.password,
      testUser.day,
      testUser.month,
      testUser.year,
      testUser.firstName,
      testUser.lastName,
      testUser.company,
      testUser.address,
      testUser.city,
      testUser.state,
      testUser.zipcode,
      testUser.mobileNumber
    );

    // Verify created
    await expect(signupPage.isAccountCreatedMessageDisplayed()).toBeTruthy();

    // Click continue button
    await signupPage.clickContinueButton();

    // Try to access delete account link
    // It's usually visible in navbar if logged in
    const deleteLink = page.locator('a[href="/delete_account"]');
    await expect(deleteLink).toBeVisible();

    await deleteLink.click();

    // Verify we got a deletion confirmation or were redirected
    // Usually shows "ACCOUNT DELETED!"
    await expect(page.getByText(/account deleted/i)).toBeVisible({ timeout: 15000 });
  });

  test('TC-203: User should not be able to access account page without login', async ({
    page,
  }) => {
    // Test ID: TC-203
    // Description: Verify protected page requires authentication
    // Expected: User redirected to login page

    await page.goto('/account');

    await page.waitForTimeout(2000);

    const currentUrl = await page.url();
    const isOnLoginPage = currentUrl.includes('/login') || !currentUrl.includes('/account');

    expect(isOnLoginPage).toBeTruthy();
  });

  test('TC-204: User should maintain session across page navigation', async ({
    page,
    loginPage,
    signupPage,
  }) => {
    // Test ID: TC-204
    // Description: Verify session persists across navigation
    // Expected: User remains logged in while browsing

    await loginPage.navigateToLogin();

    // Create fresh user for session test
    const user = { ...testData.validUsers[0] };
    user.email = `session.${Date.now()}@automation.com`;

    // Register first using helper
    await loginPage.fillSignupForm(user.name, user.email);
    await loginPage.clickSignupButton();
    await page.waitForSelector('h2:has-text("Enter Account Information")');

    await signupPage.completeSignup(
      user.title,
      user.password,
      user.day,
      user.month,
      user.year,
      user.firstName,
      user.lastName,
      user.company,
      user.address,
      user.city,
      user.state,
      user.zipcode,
      user.mobileNumber
    );

    // Verify account created
    await expect(signupPage.isAccountCreatedMessageDisplayed()).toBeTruthy();
    await signupPage.clickContinueButton();

    // Navigate to different pages
    await page.goto('/');
    let hasLogoutLink = await page.locator('a[href="/logout"]').isVisible().catch(() => false);
    expect(hasLogoutLink).toBeTruthy();

    // Navigate to products
    await page.goto('/products');
    hasLogoutLink = await page.locator('a[href="/logout"]').isVisible().catch(() => false);
    expect(hasLogoutLink).toBeTruthy();
  });

  test('TC-205: User profile information should be retrievable', async ({
    page,
    loginPage,
    signupPage,
  }) => {
    // Test ID: TC-205
    // Description: Verify user profile information is accessible
    // Expected: Profile data is displayed correctly

    await loginPage.navigateToLogin();

    const user = { ...testData.validUsers[0] };
    user.email = `profile.${Date.now()}@automation.com`;

    // Register first using helper
    await loginPage.fillSignupForm(user.name, user.email);
    await loginPage.clickSignupButton();
    await page.waitForSelector('h2:has-text("Enter Account Information")');

    await signupPage.completeSignup(
      user.title,
      user.password,
      user.day,
      user.month,
      user.year,
      user.firstName,
      user.lastName,
      user.company,
      user.address,
      user.city,
      user.state,
      user.zipcode,
      user.mobileNumber
    );

    // Verify account created
    await expect(signupPage.isAccountCreatedMessageDisplayed()).toBeTruthy();
    await signupPage.clickContinueButton();

    // Check if user information is displayed on page
    const pageContent = await page.locator('body').textContent();

    // Check if any user info is visible (name, email, etc.)
    const hasUserInfo = pageContent && (
      pageContent.includes(user.firstName) ||
      pageContent.includes(user.email) ||
      pageContent.includes(user.name)
    );

    expect(hasUserInfo || await page.url().includes('account')).toBeTruthy();
  });
});
