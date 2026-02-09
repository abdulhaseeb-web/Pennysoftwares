# E2E Testing Framework - User Guide

## Quick Start

### Prerequisites
- Node.js 16+ installed
- npm or yarn installed

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd automation-exercise-e2e-tests
```

2. Install dependencies
```bash
npm install
```

3. Install Playwright browsers
```bash
npx playwright install
```

### Running Tests

#### Run all tests across all browsers
```bash
npm test
```

#### Run tests for specific browser
```bash
npm run test:chrome      # Chromium only
npm run test:firefox     # Firefox only
npm run test:webkit      # Safari only
```

#### Run mobile tests
```bash
npm run test:mobile
```

#### Run tests in UI mode (interactive)
```bash
npm run test:ui
```

#### Run tests in headed mode (see browser)
```bash
npm run test:headed
```

#### Debug tests
```bash
npm run test:debug
```

#### View test report
```bash
npm run test:report
```

---

## Test Organization

```
tests/
├── specs/
│   ├── 01-auth-positive.spec.ts    # Positive authentication tests
│   ├── 02-auth-negative.spec.ts    # Negative authentication tests
│   ├── 03-account-management.spec.ts # Account management tests
│   └── 04-mobile-responsive.spec.ts # Mobile and responsive tests
├── pages/
│   ├── BasePage.ts                 # Base page object
│   ├── HomePage.ts                 # Home page object
│   ├── LoginPage.ts                # Login/Signup page object
│   └── SignupPage.ts               # Account creation page object
├── fixtures/
│   └── pageFixtures.ts             # Test fixtures and page objects
├── data/
│   └── testData.ts                 # Test data and constants
└── utils/
    └── (utilities for tests)
```

---

## Test Scenarios Covered

### Authentication (Positive)
- ✅ User registration with valid data
- ✅ User login with valid credentials
- ✅ User logout
- ✅ Session persistence after registration
- ✅ Cross-browser signup

### Authentication (Negative)
- ✅ Login with non-existent email
- ✅ Login with wrong password
- ✅ Login with empty email
- ✅ Login with empty password
- ✅ Signup with duplicate email
- ✅ Signup with empty name
- ✅ Signup with invalid email format
- ✅ SQL injection prevention
- ✅ CSRF protection
- ✅ Password field masking

### Account Management
- ✅ View account details
- ✅ Delete account
- ✅ Protected page access control
- ✅ Session persistence across navigation
- ✅ Profile information retrieval

### Mobile & Responsive
- ✅ Signup form responsiveness
- ✅ Login form responsiveness
- ✅ Mobile navigation
- ✅ Keyboard input types
- ✅ Touch target sizing
- ✅ Layout adaptation

---

## Writing and Running Custom Tests

### Test Structure

```typescript
import { test, expect } from '../fixtures/pageFixtures';
import { testData } from '../data/testData';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    // Setup code
  });

  test('TC-XXX: Test description', async ({ 
    loginPage, 
    homePage, 
    page 
  }) => {
    // Test steps
    await loginPage.navigateToLogin();
    
    // Assertions
    expect(await loginPage.isLoginPageLoaded()).toBeTruthy();
  });
});
```

### Using Page Objects

```typescript
// Navigate
await loginPage.navigateToLogin();

// Interact
await loginPage.fillInput(selector, 'value');
await loginPage.clickElement(selector);

// Verify
expect(await loginPage.isElementVisible(selector)).toBeTruthy();
expect(await loginPage.getElementText(selector)).toContain('text');
```

---

## Configuration

### Browser Configuration

Edit `playwright.config.ts` to modify:
- Base URL
- Timeout values
- Screenshot/Video options
- Reporters
- Browser-specific options

### Example: Run only on Chrome
```typescript
projects: [
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] },
  },
]
```

### Example: Run only on mobile
```typescript
projects: [
  {
    name: 'Mobile Chrome',
    use: { ...devices['Pixel 5'] },
  },
  {
    name: 'Mobile Safari',
    use: { ...devices['iPhone 12'] },
  },
]
```

---

## Test Data

Test data is managed in `tests/data/testData.ts`:

```typescript
// Valid users
testData.validUsers[0]
// {
//   name: 'John Doe',
//   email: 'john.doe.xxx@automation.com',
//   password: 'Test@123456',
//   ...
// }

// Invalid credentials
testData.invalidCredentials[0]
// {
//   email: 'nonexistent@test.com',
//   password: 'password123',
//   expectedError: 'Your email or password is incorrect!'
// }
```

---

## Viewing Test Results

### HTML Report
```bash
npm run test:report
```

### Test Report Locations
- HTML: `playwright-report/index.html`
- Videos: `test-results/` (if failures)
- Screenshots: Test results folder

---

## CI/CD Integration

### GitHub Actions
The project includes a GitHub Actions workflow for automated testing:
- Runs on every push and pull request
- Tests all browsers and mobile devices
- Generates reports and artifacts
- Can fail builds on test failures

### Running Tests Locally (as CI would)
```bash
# Sets CI environment variable
CI=true npm test
```

---

## Troubleshooting

### Tests Timing Out
- Increase timeout in `playwright.config.ts`
- Check if the website is accessible
- Verify network connectivity

### Element Not Found Errors
- Verify selectors in page objects match current website
- Use `--debug` mode to investigate
- Check if element is inside iframe

### Mobile Tests Not Running
```bash
npm run test:mobile
```

### Generate Trace for Failed Test
Traces are automatically captured on first retry. View with:
```bash
npx playwright show-trace trace.zip
```

---

## Best Practices

### Before Writing Tests
1. Analyze the feature thoroughly
2. Identify all positive and negative scenarios
3. Determine test data requirements
4. Plan mobile/desktop specific behavior

### Writing Tests
1. Use descriptive test names
2. Follow AAA pattern (Arrange, Act, Assert)
3. Use page objects for selectors
4. Keep tests independent
5. Use unique test data per run

### Maintaining Tests
1. Update selectors when UI changes
2. Add comments for complex logic
3. Remove obsolete tests
4. Refactor duplicated code
5. Keep test data current

---

## Advanced Features

### Codegen - Generate Tests
```bash
npm run test:codegen
```
Playwright will record your interactions and generate test code.

### UI Mode
```bash
npm run test:ui
```
Interactive test runner with step-by-step execution.

### Debug Mode
```bash
npm run test:debug
```
Step through tests with Playwright Inspector.

---

## Performance Optimization

### Parallel Execution
- Tests run in parallel by default
- Configure workers in `playwright.config.ts`

### Selective Test Running
```bash
# Run specific file
npx playwright test 01-auth-positive.spec.ts

# Run tests matching pattern
npx playwright test --grep "login"

# Run specific test
npx playwright test 01-auth-positive.spec.ts:3
```

---

## Documentation

- Full test cases: See `docs/TEST_CASES.md`
- API Reference: See Playwright docs
- Page objects: Documented inline in code

---

## Support

For issues or questions:
1. Check test report for error details
2. Review test logs in console
3. Consult documentation
4. Check Playwright documentation

---

## Version Info
- Playwright: ^1.40.0
- TypeScript: ^5.3.0
- Node.js: 16+

**Last Updated:** February 9, 2026
