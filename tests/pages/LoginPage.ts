import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * LoginPage - Page object for the login functionality
 */
export class LoginPage extends BasePage {
  // Login section selectors
  readonly loginEmailInput = 'input[data-qa="login-email"]';
  readonly loginPasswordInput = 'input[data-qa="login-password"]';
  readonly loginButton = 'button[data-qa="login-button"]';
  readonly loginErrorMessage = '.login-form .error';
  readonly loginForm = '.login-form';

  // Signup section selectors
  readonly signupNameInput = 'input[data-qa="signup-name"]';
  readonly signupEmailInput = 'input[data-qa="signup-email"]';
  readonly signupButton = 'button[data-qa="signup-button"]';
  readonly signupErrorMessage = '.signup-form .error';
  readonly signupForm = '.signup-form';

  // Page elements
  readonly pageTitle = 'h2';
  readonly loginHeading = 'text=Login';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to login page
   */
  async navigateToLogin(): Promise<void> {
    await this.goto('/login');
    await this.waitForElement(this.loginForm, 10000);
  }

  /**
   * Perform login with email and password
   */
  async login(email: string, password: string): Promise<void> {
    await this.fillInput(this.loginEmailInput, email);
    await this.fillInput(this.loginPasswordInput, password);
    await this.clickElement(this.loginButton);
    await this.waitForNavigation();
  }

  /**
   * Fill login form without submitting
   */
  async fillLoginForm(email: string, password: string): Promise<void> {
    await this.fillInput(this.loginEmailInput, email);
    await this.fillInput(this.loginPasswordInput, password);
  }

  /**
   * Click login button
   */
  async clickLoginButton(): Promise<void> {
    await this.clickElement(this.loginButton);
  }

  /**
   * Get login error message
   */
  async getLoginErrorMessage(): Promise<string | null> {
    return await this.getElementText(this.loginErrorMessage);
  }

  /**
   * Verify login error is displayed
   */
  async isLoginErrorDisplayed(): Promise<boolean> {
    return await this.isElementVisible(this.loginErrorMessage);
  }

  /**
   * Verify login form is visible
   */
  async isLoginFormVisible(): Promise<boolean> {
    return await this.isElementVisible(this.loginForm);
  }

  /**
   * Fill signup form
   */
  async fillSignupForm(name: string, email: string): Promise<void> {
    await this.fillInput(this.signupNameInput, name);
    await this.fillInput(this.signupEmailInput, email);
  }

  /**
   * Click signup button
   */
  async clickSignupButton(): Promise<void> {
    await this.clickElement(this.signupButton);
  }

  /**
   * Get signup error message
   */
  async getSignupErrorMessage(): Promise<string | null> {
    return await this.getElementText(this.signupErrorMessage);
  }

  /**
   * Verify signup error is displayed
   */
  async isSignupErrorDisplayed(): Promise<boolean> {
    return await this.isElementVisible(this.signupErrorMessage);
  }

  /**
   * Verify signup form is visible
   */
  async isSignupFormVisible(): Promise<boolean> {
    return await this.isElementVisible(this.signupForm);
  }

  /**
   * Perform complete signup process
   */
  async signupNewUser(name: string, email: string): Promise<void> {
    await this.fillSignupForm(name, email);
    await this.clickSignupButton();
    await this.waitForNavigation();
  }

  /**
   * Verify login page is loaded
   */
  async isLoginPageLoaded(): Promise<boolean> {
    return await this.isElementVisible(this.loginForm);
  }
}
