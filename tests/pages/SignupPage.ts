import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * SignupPage - Page object for the account creation/signup process
 */
export class SignupPage extends BasePage {
  // Account Information section
  readonly titleMrRadio = 'input[id="id_gender1"]';
  readonly titleMrsRadio = 'input[id="id_gender2"]';
  readonly passwordInput = 'input[data-qa="password"]';
  readonly daySelect = 'select[data-qa="days"]';
  readonly monthSelect = 'select[data-qa="months"]';
  readonly yearSelect = 'select[data-qa="years"]';
  readonly newsletterCheckbox = 'input[id="newsletter"]';
  readonly specialOffersCheckbox = 'input[id="optin"]';

  // Address Information section
  readonly firstNameInput = 'input[data-qa="first_name"]';
  readonly lastNameInput = 'input[data-qa="last_name"]';
  readonly companyInput = 'input[data-qa="company"]';
  readonly addressInput = 'input[data-qa="address"]';
  readonly address2Input = 'input[data-qa="address2"]';
  readonly countrySelect = 'select[data-qa="country"]';
  readonly stateInput = 'input[data-qa="state"]';
  readonly cityInput = 'input[data-qa="city"]';
  readonly zipcodeInput = 'input[data-qa="zipcode"]';
  readonly mobileNumberInput = 'input[data-qa="mobile_number"]';

  // Form buttons
  readonly createAccountButton = 'button[data-qa="create-account"]';
  readonly continueButton = 'button[data-qa="continue-button"]';

  // Page elements
  readonly accountCreatedMessage = 'h2:has-text("Account Created!")';
  readonly signupForm = 'form';
  readonly pageHeading = 'h2:has-text("Enter Account Information")';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to signup page
   */
  async navigateToSignup(): Promise<void> {
    await this.goto('/signup');
    await this.waitForElement(this.pageHeading, 10000);
  }

  /**
   * Select title (Mr./Mrs.)
   */
  async selectTitle(title: 'Mr' | 'Mrs'): Promise<void> {
    if (title === 'Mr') {
      await this.clickElement(this.titleMrRadio);
    } else {
      await this.clickElement(this.titleMrsRadio);
    }
  }

  /**
   * Fill password
   */
  async fillPassword(password: string): Promise<void> {
    await this.fillInput(this.passwordInput, password);
  }

  /**
   * Select date of birth
   */
  async selectDateOfBirth(day: string, month: string, year: string): Promise<void> {
    await this.page.selectOption(this.daySelect, day);
    await this.page.selectOption(this.monthSelect, month);
    await this.page.selectOption(this.yearSelect, year);
  }

  /**
   * Toggle newsletter checkbox
   */
  async toggleNewsletter(enable: boolean = true): Promise<void> {
    const checkbox = this.page.locator(this.newsletterCheckbox);
    const isChecked = await checkbox.isChecked();
    if (enable && !isChecked) {
      await checkbox.click();
    } else if (!enable && isChecked) {
      await checkbox.click();
    }
  }

  /**
   * Toggle special offers checkbox
   */
  async toggleSpecialOffers(enable: boolean = true): Promise<void> {
    const checkbox = this.page.locator(this.specialOffersCheckbox);
    const isChecked = await checkbox.isChecked();
    if (enable && !isChecked) {
      await checkbox.click();
    } else if (!enable && isChecked) {
      await checkbox.click();
    }
  }

  /**
   * Fill address information
   */
  async fillAddressInfo(
    firstName: string,
    lastName: string,
    company: string,
    address: string,
    city: string,
    state: string,
    zipcode: string,
    mobileNumber: string,
    country: string = 'Canada'
  ): Promise<void> {
    await this.fillInput(this.firstNameInput, firstName);
    await this.fillInput(this.lastNameInput, lastName);
    await this.fillInput(this.companyInput, company);
    await this.fillInput(this.addressInput, address);
    await this.fillInput(this.cityInput, city);
    await this.fillInput(this.stateInput, state);
    await this.fillInput(this.zipcodeInput, zipcode);
    await this.fillInput(this.mobileNumberInput, mobileNumber);
    await this.page.selectOption(this.countrySelect, country);
  }

  /**
   * Click Create Account button
   */
  async clickCreateAccountButton(): Promise<void> {
    await this.clickElement(this.createAccountButton);
  }

  /**
   * Click Continue button
   */
  async clickContinueButton(): Promise<void> {
    await this.clickElement(this.continueButton);
    await this.waitForNavigation();
  }

  /**
   * Verify account created message is displayed
   */
  async isAccountCreatedMessageDisplayed(): Promise<boolean> {
    return await this.isElementVisible(this.accountCreatedMessage);
  }

  /**
   * Get account created message text
   */
  async getAccountCreatedMessage(): Promise<string | null> {
    return await this.getElementText(this.accountCreatedMessage);
  }

  /**
   * Complete full signup process
   */
  async completeSignup(
    title: 'Mr' | 'Mrs',
    password: string,
    day: string,
    month: string,
    year: string,
    firstName: string,
    lastName: string,
    company: string,
    address: string,
    city: string,
    state: string,
    zipcode: string,
    mobileNumber: string
  ): Promise<void> {
    await this.selectTitle(title);
    await this.fillPassword(password);
    await this.selectDateOfBirth(day, month, year);
    await this.toggleNewsletter(true);
    await this.toggleSpecialOffers(true);
    await this.fillAddressInfo(firstName, lastName, company, address, city, state, zipcode, mobileNumber);
    await this.clickCreateAccountButton();
    await this.waitForElement(this.accountCreatedMessage, 5000);
  }

  /**
   * Verify signup page is loaded
   */
  async isSignupPageLoaded(): Promise<boolean> {
    return await this.isElementVisible(this.pageHeading);
  }
}
