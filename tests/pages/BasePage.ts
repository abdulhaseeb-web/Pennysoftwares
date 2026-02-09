import { Page, expect } from '@playwright/test';

/**
 * BasePage - Base class for all page objects
 * Contains common methods and utilities used across all pages
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a specific path
   */
  async goto(path: string = ''): Promise<void> {
    await this.page.goto(path);
  }

  /**
   * Wait for a specific element to be visible
   */
  async waitForElement(selector: string, timeout: number = 5000): Promise<void> {
    try {
      await this.page.locator(selector).waitFor({ state: 'visible', timeout });
    } catch (err) {
      throw new Error(`Timeout waiting for element ${selector} after ${timeout}ms`);
    }
  }

  /**
   * Fill input field with text
   */
  async fillInput(selector: string, text: string): Promise<void> {
    const inputField = this.page.locator(selector);
    // Ensure the field is ready and clear it before filling
    await inputField.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    await inputField.fill('');
    await inputField.fill(text);
  }

  /**
   * Click an element
   */
  async clickElement(selector: string): Promise<void> {
    const el = this.page.locator(selector);
    await el.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    try {
      await el.click({ timeout: 5000 });
    } catch (err) {
      // fallback to JS click if normal click fails (e.g., overlay or disabled state)
      await this.page.evaluate((s: string) => {
        const e = document.querySelector(s) as HTMLElement | null;
        if (e) e.click();
      }, selector);
    }
  }

  /**
   * Get text content of an element
   */
  async getElementText(selector: string): Promise<string | null> {
    return await this.page.locator(selector).textContent();
  }

  /**
   * Check if element is visible
   */
  async isElementVisible(selector: string): Promise<boolean> {
    try {
      await this.waitForElement(selector, 3000);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get attribute value
   */
  async getAttribute(selector: string, attribute: string): Promise<string | null> {
    return await this.page.getAttribute(selector, attribute);
  }

  /**
   * Wait for navigation
   */
  async waitForNavigation(): Promise<void> {
    await this.page.waitForURL(/.*/, { timeout: 10000 });
  }

  /**
   * Get current URL
   */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * Verify element is enabled
   */
  async isElementEnabled(selector: string): Promise<boolean> {
    return await this.page.locator(selector).isEnabled();
  }

  /**
   * Wait and expect element to be visible
   */
  async expectElementVisible(selector: string): Promise<void> {
    await expect(this.page.locator(selector)).toBeVisible();
  }

  /**
   * Wait and expect element text
   */
  async expectElementText(selector: string, text: string): Promise<void> {
    await expect(this.page.locator(selector)).toContainText(text);
  }

  /**
   * Take screenshot
   */
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
  }

  /**
   * Close the page
   */
  async closePage(): Promise<void> {
    await this.page.close();
  }
}
