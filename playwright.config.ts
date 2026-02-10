import { defineConfig, devices } from '@playwright/test';
import process from 'process';

/**
 * Playwright Configuration for Automation Exercise E2E Tests
 * Supports multiple browsers, devices, and comprehensive reporting
 */
export default defineConfig({
  testDir: './tests/specs',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['html'],
    ['junit', { outputFile: 'junit.xml' }],
    ['list'],
  ],

  use: {
    /* Base URL for the application */
    baseURL: 'https://automationexercise.com',
    /* Collect trace for debugging */
    trace: 'on-first-retry',
    /* Screenshot on failure */
    screenshot: 'only-on-failure',
    /* Video on failure */
    video: 'retain-on-failure',
  },

  /* Configure projects for all browsers and devices */
  projects: [
    // Desktop Browsers
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // Mobile Browsers
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  /* Global timeout */
  timeout: 60000,

  /* Global test timeout */
  expect: {
    timeout: 10000,
  },
});
