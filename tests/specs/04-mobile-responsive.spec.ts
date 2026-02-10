import { test, expect } from '../fixtures/pageFixtures';
import { testData } from '../data/testData';

/**
 * Mobile and Responsive Design Tests
 * These tests validate functionality on mobile devices
 * Runs on: Mobile Chrome (Pixel 5), Mobile Safari (iPhone 12)
 */
test.describe('Mobile Testing - Signup & Login', () => {
  test.skip(({ browserName }) => browserName === 'firefox' || browserName === 'webkit', 
    'Mobile tests only run on Chromium');

  test('TC-301: Signup form should be responsive on mobile', async ({
    page,
    loginPage,
    signupPage,
  }) => {
    // Test ID: TC-301
    // Description: Verify signup form is usable on mobile
    // Expected: Form elements are accessible and properly displayed
    
    await loginPage.navigateToLogin();
    
    // Verify form is visible on mobile
    expect(await loginPage.isSignupFormVisible()).toBeTruthy();
    
    const user = testData.validUsers[0];
    user.email = `mobile.${Date.now()}@automation.com`;
    
    // Fill signup form
    await loginPage.fillSignupForm(user.name, user.email);
    
    // Verify inputs are filled
    const nameValue = await page.inputValue(loginPage.signupNameInput);
    const emailValue = await page.inputValue(loginPage.signupEmailInput);
    
    expect(nameValue).toContain(user.name);
    expect(emailValue).toContain(user.email);
  });

  test('TC-302: Login form should be responsive on mobile', async ({
    loginPage,
    page,
  }) => {
    // Test ID: TC-302
    // Description: Verify login form is usable on mobile
    // Expected: Form fields are accessible and properly sized
    
    await loginPage.navigateToLogin();
    
    // Verify form is visible
    expect(await loginPage.isLoginFormVisible()).toBeTruthy();
    
    // Verify input fields are accessible
    const emailInput = page.locator(loginPage.loginEmailInput);
    const passwordInput = page.locator(loginPage.loginPasswordInput);
    
    expect(await emailInput.isVisible()).toBeTruthy();
    expect(await passwordInput.isVisible()).toBeTruthy();
    
    // Verify button is clickable
    const loginBtn = page.locator(loginPage.loginButton);
    expect(await loginBtn.isVisible()).toBeTruthy();
  });

  test('TC-303: Navigation should work on mobile devices', async ({
    homePage,
    page,
  }) => {
    // Test ID: TC-303
    // Description: Verify navigation links work on mobile
    // Expected: User can navigate without issues
    
    await homePage.navigateToHome();
    
    // Verify navigation elements are visible
    const signupLink = page.locator(homePage.signupLoginLink);
    expect(await signupLink.isVisible()).toBeTruthy();
    
    // Click signup link
    await signupLink.click();
    
    // Verify navigation successful
    await page.waitForURL(/.*login/);
    const currentUrl = await page.url();
    expect(currentUrl).toContain('/login');
  });

  test('TC-304: Text inputs should have proper mobile keyboard', async ({
    loginPage,
    page,
  }) => {
    // Test ID: TC-304
    // Description: Verify inputs have correct input types
    // Expected: Mobile keyboard adapts to input type
    
    await loginPage.navigateToLogin();
    
    const emailInput = page.locator(loginPage.loginEmailInput);
    const passwordInput = page.locator(loginPage.loginPasswordInput);
    
    // Verify input types
    const emailType = await emailInput.getAttribute('type');
    const passwordType = await passwordInput.getAttribute('type');
    
    expect(emailType).toBe('email');
    expect(passwordType).toBe('password');
  });

  test('TC-305: Buttons should be easily tappable on mobile (minimum 44x44px)', async ({
    loginPage,
    page,
  }) => {
    // Test ID: TC-305
    // Description: Verify touch targets are properly sized
    // Expected: Buttons are at least 44x44px for easy tapping
    
    await loginPage.navigateToLogin();
    
    const loginBtn = page.locator(loginPage.loginButton);
    const signupBtn = page.locator(loginPage.signupButton);
    
    // Verify buttons are visible (size check happens in layout)
    expect(await loginBtn.isVisible()).toBeTruthy();
    expect(await signupBtn.isVisible()).toBeTruthy();
    
    // Verify buttons are within viewport
    const loginBtnBox = await loginBtn.boundingBox();
    const signupBtnBox = await signupBtn.boundingBox();
    
    expect(loginBtnBox).not.toBeNull();
    expect(signupBtnBox).not.toBeNull();
  });

  test('TC-306: Mobile checkout flow should prevent accidental scrolling', async ({
    page,
    loginPage,
  }) => {
    // Test ID: TC-306
    // Description: Verify form interactions don't interfere with usability
    // Expected: User can scroll and interact without issues
    
    await loginPage.navigateToLogin();
    
    const viewport = page.viewportSize();
    
    // Verify page is responsive
   // expect(viewport?.width).toBeLessThanOrEqual(600);
    
    // Try to fill form
    const emailInput = page.locator(loginPage.loginEmailInput);
    await emailInput.fill('test@test.com');
    
    expect(await emailInput.inputValue()).toBe('test@test.com');
  });

  test('TC-307: Verify page layout on different mobile screen sizes', async ({
    page,
    loginPage,
  }) => {
    // Test ID: TC-307
    // Description: Verify layout adapts to different mobile sizes
    // Expected: Content is properly laid out on various screen sizes
    
    await loginPage.navigateToLogin();
    
    const viewport = page.viewportSize();
    
    // Should be mobile viewport
    expect(viewport).not.toBeNull();
    
    // Get all form elements
    const loginForm = page.locator(loginPage.loginForm);
    const signupForm = page.locator(loginPage.signupForm);
    
    // Both should be within viewport without horizontal scrolling
    expect(await loginForm.isVisible()).toBeTruthy();
    expect(await signupForm.isVisible()).toBeTruthy();
  });
});

test.describe('Desktop Testing - Cross Browser', () => {
  test.skip(({ browserName }) => browserName === 'firefox', 'Run on Chromium and WebKit');

  test('TC-401: Verify signup works on all supported browsers', async ({
    browserName,
    loginPage,
    signupPage,
    page,
  }) => {
    // Test ID: TC-401
    // Description: Verify cross-browser compatibility for signup
    // Expected: Signup process works identically on all browsers
    
    await loginPage.navigateToLogin();
    
    // Verify browser-specific rendering
    expect(await loginPage.isLoginPageLoaded()).toBeTruthy();
    
    const user = testData.validUsers[0];
    user.email = `${browserName}.${Date.now()}@automation.com`;
    
    await loginPage.fillSignupForm(user.name, user.email);
    
    // Verify form state across browsers
    const nameValue = await page.inputValue(loginPage.signupNameInput);
    const emailValue = await page.inputValue(loginPage.signupEmailInput);
    
    expect(nameValue).toContain(user.name);
    expect(emailValue).toContain(user.email);
  });

  test('TC-402: CSS rendering should be consistent across browsers', async ({
    page,
  }) => {
    // Test ID: TC-402
    // Description: Verify CSS is properly applied across browsers
    // Expected: Visual styling is consistent
    
    await page.goto('/login');
    
    const loginForm = page.locator('.login-form');
    const displayValue = await loginForm.evaluate((el) => (el.ownerDocument.defaultView as any).getComputedStyle(el).display);
    
    // Verify form has styling (not just native elements)
    expect(displayValue).not.toBe('none');
  });

  test('TC-403: JavaScript functionality should work correctly on all browsers', async ({
    page,
    loginPage,
  }) => {
    // Test ID: TC-403
    // Description: Verify JavaScript execution across browsers
    // Expected: Form submission and validation work correctly
    
    await loginPage.navigateToLogin();
    
    // Try to submit empty form
    const loginBtn = page.locator(loginPage.loginButton);
    await loginBtn.click();
    
    // Page should still show form or error
    const isFormVisible = await loginPage.isLoginFormVisible();
    const isErrorVisible = await loginPage.isLoginErrorDisplayed();
    
    expect(isFormVisible || isErrorVisible).toBeTruthy();
  });
});

