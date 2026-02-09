import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * HomePage - Page object for the Automation Exercise home page
 */
export class HomePage extends BasePage {
  // Selectors
  readonly signupLoginLink = 'a[href="/login"]';
  readonly logoutLink = 'a[href="/logout"]';
  readonly accountDropdown = '.dropdown-toggle';
  readonly deleteAccountBtn = 'a[href="/delete_account"]';
  readonly contactUsLink = 'a[href="#contact-us"]';
  readonly productsLink = 'a[href="/products"]';
  readonly cartLink = 'a[href="/view_cart"]';
  readonly testimonials = '.testimonial-item';
  readonly usernameDisplay = '.navbar-text';
  readonly mainSlider = '.carousel';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to the home page
   */
  async navigateToHome(): Promise<void> {
    await this.goto('/');
    await this.waitForElement(this.signupLoginLink, 10000);
  }

  /**
   * Click on Signup/Login link
   */
  async clickSignupLoginLink(): Promise<void> {
    await this.clickElement(this.signupLoginLink);
  }

  /**
   * Click on Logout link
   */
  async clickLogoutLink(): Promise<void> {
    await this.clickElement(this.logoutLink);
  }

  /**
   * Click on Delete Account button
   */
  async clickDeleteAccountBtn(): Promise<void> {
    await this.clickElement(this.deleteAccountBtn);
  }

  /**
   * Verify user is logged in by checking for logout link
   */
  async isUserLoggedIn(): Promise<boolean> {
    return await this.isElementVisible(this.logoutLink);
  }

  /**
   * Verify user is logged out by checking for signup/login link
   */
  async isUserLoggedOut(): Promise<boolean> {
    return await this.isElementVisible(this.signupLoginLink);
  }

  /**
   * Click on Products link
   */
  async clickProductsLink(): Promise<void> {
    await this.clickElement(this.productsLink);
  }

  /**
   * Click on Cart link
   */
  async clickCartLink(): Promise<void> {
    await this.clickElement(this.cartLink);
  }

  /**
   * Wait for homepage to load completely
   */
  async waitForPageLoad(): Promise<void> {
    await this.waitForElement(this.mainSlider, 5000);
  }
}
