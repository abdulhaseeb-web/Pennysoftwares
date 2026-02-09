/**
 * Test data for Automation Exercise E2E tests
 */

export const testData = {
  // Valid user data for registration
  validUsers: [
    {
      name: 'John Doe',
      email: `john.doe.${Date.now()}@automation.com`,
      password: 'Test@123456',
      title: 'Mr' as const,
      firstName: 'John',
      lastName: 'Doe',
      company: 'Tech Corp',
      address: '123 Main Street',
      address2: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      zipcode: '10001',
      mobileNumber: '2125551234',
      country: 'Canada',
      day: '15',
      month: '5',
      year: '1990',
    },
    {
      name: 'Jane Smith',
      email: `jane.smith.${Date.now()}@automation.com`,
      password: 'SecurePass@123',
      title: 'Mrs' as const,
      firstName: 'Jane',
      lastName: 'Smith',
      company: 'Design Studio',
      address: '456 Oak Avenue',
      address2: '',
      city: 'Vancouver',
      state: 'BC',
      zipcode: 'V6B 1Z8',
      mobileNumber: '6045551234',
      country: 'Canada',
      day: '20',
      month: '8',
      year: '1985',
    },
  ],

  // Invalid credentials for negative testing
  invalidCredentials: [
    {
      email: 'nonexistent@test.com',
      password: 'password123',
      expectedError: 'Your email or password is incorrect!',
    },
    {
      email: 'test@test.com',
      password: 'wrongpassword',
      expectedError: 'Your email or password is incorrect!',
    },
    {
      email: '',
      password: 'password123',
      expectedError: 'Email address required',
    },
    {
      email: 'test@test.com',
      password: '',
      expectedError: 'Password required',
    },
  ],

  // Invalid signup data
  invalidSignupData: [
    {
      name: '',
      email: 'test@test.com',
      expectedError: 'Name is required',
    },
    {
      name: 'Test User',
      email: '',
      expectedError: 'Email is required',
    },
    {
      name: 'Test User',
      email: 'invalid-email',
      expectedError: 'Email format is invalid',
    },
  ],

  // Edge cases
  edgeCases: {
    specialCharactersEmail: `test+special${Date.now()}@automation.com`,
    longName: 'A'.repeat(100),
    longPassword: 'P@ssw0rd'.repeat(10),
    specialCharactersPassword: 'P@$$w0rd!#%&*',
  },
};

export const testUrls = {
  baseUrl: 'https://automationexercise.com',
  loginPage: 'https://automationexercise.com/login',
  signupPage: 'https://automationexercise.com/signup',
  homePage: 'https://automationexercise.com/',
  accountPage: 'https://automationexercise.com/account',
  accountDeletedPage: 'https://automationexercise.com/account_deleted',
};

export const testTimeouts = {
  pageLoad: 10000,
  element: 5000,
  navigation: 8000,
  implicit: 3000,
};
