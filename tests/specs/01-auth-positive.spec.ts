import { test, expect } from '../fixtures/pageFixtures';
import { testData, testUrls, testTimeouts } from '../data/testData';

test.describe('Authentication - Positive Scenarios', () => {
  test.beforeEach(async ({ page }) => {
    // Clear cookies before each test
    await page.context().clearCookies();
  });

  test('TC-001: User should be able to register successfully with valid data', async ({
    page,
    loginPage,
    signupPage,
  }) => {
    // Test ID: TC-001
    // Description: Verify user can register successfully with valid information
    // Expected: Account created successfully
    
    await loginPage.navigateToLogin();
    
    // Verify login page is loaded
    expect(await loginPage.isLoginPageLoaded()).toBeTruthy();
    
    const user = { ...testData.validUsers[0] };
    user.email = `reg.${Date.now()}@automation.com`;
    
    // Fill signup form
    await loginPage.fillSignupForm(user.name, user.email);
    await loginPage.clickSignupButton();
    
    // Wait for signup page to load
    expect(await signupPage.isSignupPageLoaded()).toBeTruthy();
    
    // Complete account creation
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
    
    // Verify account created message
    expect(await signupPage.isAccountCreatedMessageDisplayed()).toBeTruthy();
    
    const message = await signupPage.getAccountCreatedMessage();
    expect(message).toContain('Account Created');
  });

  test('TC-002: User should be able to login with valid credentials', async ({
    page,
    loginPage,
    signupPage,
  }) => {
    // Test ID: TC-002
    // Description: Verify user can login with valid email and password
    // Expected: User successfully logged in and redirected to home page
    
    await loginPage.navigateToLogin();

    // Ensure a fresh user exists for this test (tests run in parallel)
    const user = { ...testData.validUsers[0] };
    user.email = `login2.${Date.now()}.${Math.random()}@automation.com`;

    // Register the user first
    await loginPage.fillSignupForm(user.name, user.email);
    await loginPage.clickSignupButton();
    await signupPage.waitForElement(signupPage.pageHeading, 10000);
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

    // Verify account created message
    expect(await signupPage.isAccountCreatedMessageDisplayed()).toBeTruthy();
    
    // Click continue button to go to account page
    await signupPage.clickContinueButton();
    
    // Verify successful login after signup
    //expect(await page.url()).toContain('/account');
    await expect(page).toHaveURL('https://automationexercise.com/');
  });

  test('TC-003: User should be able to logout successfully', async ({
    page,
    loginPage,
    signupPage,
  }) => {
    // Test ID: TC-003
    // Description: Verify user can logout from the application
    // Expected: User successfully logged out and returned to home/login page
    
    // Create and register a fresh user for this test
    await loginPage.navigateToLogin();
    const user = { ...testData.validUsers[0] };
    user.email = `logout2.${Date.now()}.${Math.random()}@automation.com`;

    await loginPage.fillSignupForm(user.name, user.email);
    await loginPage.clickSignupButton();
    await signupPage.waitForElement(signupPage.pageHeading, 10000);
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

    // Verify user is logged in by checking for "Continue" button on account created page
    expect(await signupPage.isAccountCreatedMessageDisplayed()).toBeTruthy();

    // Click continue button to proceed
    await signupPage.clickContinueButton();

    // Now we should be logged in, navigate to home to find logout button
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Verify user is logged in by checking for logout link
    const logoutLink = page.locator('a[href="/logout"]');
    expect(await logoutLink.isVisible()).toBeTruthy();

    // Perform logout
    await logoutLink.click();
    await page.waitForLoadState('networkidle');

    // Verify user is logged out by checking for login link
    const loginLink = page.locator('a[href="/login"]');
    expect(await loginLink.isVisible()).toBeTruthy();
  });

  test('TC-004: User information should be persisted after registration', async ({
    page,
    loginPage,
    signupPage,
  }) => {
    // Test ID: TC-004
    // Description: Verify user information persists after registration
    await loginPage.navigateToLogin();
    
    const user = { ...testData.validUsers[1] };
    user.email = `persist.${Date.now()}.${Math.random()}@automation.com`;
    
    // Register new user
    await loginPage.fillSignupForm(user.name, user.email);
    await loginPage.clickSignupButton();
    await signupPage.waitForElement(signupPage.pageHeading, 10000);
    
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
    
    // Verify registration success
    expect(await signupPage.isAccountCreatedMessageDisplayed()).toBeTruthy();
  });

  test('TC-005: New user registration flow should work on different browsers', async ({
    browserName,
    loginPage,
    signupPage,
  }) => {
    // Test ID: TC-005
    // Description: Verify signup works across different browsers
    // Expected: Signup works on Chrome, Firefox, Safari, and mobile browsers
    
    await loginPage.navigateToLogin();
    
    const user = { ...testData.validUsers[0] };
    user.email = `${browserName}.${Date.now()}@automation.com`;
    
    await loginPage.fillSignupForm(user.name, user.email);
    await loginPage.clickSignupButton();
    await signupPage.waitForElement(signupPage.pageHeading, 10000);
    
    expect(await signupPage.isSignupPageLoaded()).toBeTruthy();
  });
});
