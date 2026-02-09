# Automation Exercise - End-to-End Testing Framework

A comprehensive end-to-end testing framework built with **Playwright** and **TypeScript** for the Automation Exercise website (https://automationexercise.com/). This framework validates user authentication, account management, and provides cross-browser and mobile testing capabilities.

## 📋 Project Overview

### Purpose
Create a robust E2E testing suite that:
- ✅ Tests signup, login, and logout flows
- ✅ Validates account creation and user registration
- ✅ Covers positive and negative test scenarios
- ✅ Supports cross-browser testing (Chrome, Firefox, Safari)
- ✅ Includes mobile device testing (Android, iOS)
- ✅ Integrates with CI/CD pipelines
- ✅ Generates comprehensive test reports

### Key Features
- **Page Object Model:** Organized page objects for maintainability
- **Cross-Browser Testing:** Runs on Chrome, Firefox, and Safari
- **Mobile Testing:** Pixel 5 (Android) and iPhone 12 (iOS)
- **32+ Test Cases:** Covering positive, negative, and security scenarios
- **Fixtures:** Reusable page objects and test setup
- **Detailed Reports:** HTML reports with screenshots and videos
- **CI/CD Ready:** GitHub Actions workflow included

---

## 🎯 Test Coverage

### Authentication Tests (13 tests)
**Positive Scenarios (5 tests):**
- TC-001: User registration with valid data
- TC-002: Login with valid credentials
- TC-003: User logout
- TC-004: User information persistence
- TC-005: Cross-browser signup

**Negative Scenarios (8 tests):**
- TC-101: Login with non-existent email
- TC-102: Login with wrong password
- TC-103-105: Empty field validations
- TC-106-109: Signup validation errors
- TC-110: Session cleanup after logout
- TC-111-113: Security tests (CSRF, SQL Injection, password masking)

### Account Management Tests (5 tests)
- TC-201: View account details
- TC-202: Delete account
- TC-203: Protected page access control
- TC-204: Session persistence across navigation
- TC-205: Profile information retrieval

### Mobile & Responsive Tests (7 tests)
- TC-301-307: Mobile form responsiveness, navigation, input types, touch targets

### Cross-Browser Tests (3 tests)
- TC-401-403: Browser compatibility, CSS rendering, JavaScript functionality

---

## 🚀 Quick Start

### Prerequisites
- **Node.js 16+** (Download: https://nodejs.org/)
- **npm 8+** (comes with Node.js)
- Git (optional, for version control)

### Installation

1. **Clone or download the project**
```bash
git clone <repository-url>
cd automation-exercise-e2e-tests
```

2. **Install dependencies**
```bash
npm install
```

3. **Install Playwright browsers**
```bash
npx playwright install
```

### Running Tests

```bash
# Run all tests (all browsers, all devices)
npm test

# Run specific browser
npm run test:chrome      # Chrome only
npm run test:firefox     # Firefox only
npm run test:webkit      # Safari only

# Run mobile tests
npm run test:mobile

# Run in interactive UI mode
npm run test:ui

# Run in headed mode (see browser window)
npm run test:headed

# Debug tests step-by-step
npm run test:debug

# View test report
npm run test:report
```

---

## 📁 Project Structure

```
automation-exercise-e2e-tests/
├── tests/
│   ├── specs/                          # Test specifications
│   │   ├── 01-auth-positive.spec.ts   # Positive auth tests
│   │   ├── 02-auth-negative.spec.ts   # Negative auth tests
│   │   ├── 03-account-management.spec.ts  # Account tests
│   │   └── 04-mobile-responsive.spec.ts   # Mobile tests
│   ├── pages/                          # Page objects
│   │   ├── BasePage.ts                # Base page object
│   │   ├── HomePage.ts                # Home page object
│   │   ├── LoginPage.ts               # Login/Signup page object
│   │   └── SignupPage.ts              # Account creation page object
│   ├── fixtures/
│   │   └── pageFixtures.ts            # Test fixtures
│   ├── data/
│   │   └── testData.ts                # Test data and constants
│   └── utils/                          # Utilities
├── docs/
│   ├── TEST_CASES.md                  # Detailed test documentation
│   ├── USER_GUIDE.md                  # Usage guide
│   └── CI_CD_GUIDE.md                 # CI/CD integration guide
├── .github/
│   └── workflows/
│       └── e2e-tests.yml              # GitHub Actions workflow
├── playwright.config.ts               # Playwright configuration
├── package.json                       # Dependencies
├── tsconfig.json                      # TypeScript config
└── README.md                          # This file
```

---

## 🧪 Test Scenarios

### Authentication Flow - Positive Case

```
User → Sign Up Page
     → Enter Name & Email
     → Click Sign Up
     → Enter Account Details (password, DOB, etc.)
     → Fill Address Information
     → Click Create Account
     → Account Created Successfully ✓
```

### Authentication Flow - Negative Case

```
User → Login Page
     → Enter Invalid Credentials
     → Click Login
     → Error Message Displayed ✓
     → Login Prevented ✓
```

### Logout Flow

```
Logged In User
     → Click Logout
     → Session Terminated ✓
     → Redirected to Login Page ✓
     → Cannot Access Protected Pages ✓
```

---

## 🔐 Security Testing

The framework includes security test cases:
- **CSRF Protection:** Verifies tokens in forms
- **SQL Injection:** Tests payload handling
- **XSS Prevention:** Validates input sanitization
- **Password Masking:** Confirms password field type
- **Session Security:** Validates session cleanup

---

## 🌐 Cross-Browser & Mobile Testing

### Browsers Supported
| Browser | Desktop | Mobile |
|---------|---------|--------|
| Chrome (Chromium) | ✅ | ✅ (Pixel 5) |
| Firefox | ✅ | ❌ |
| Safari (WebKit) | ✅ | ✅ (iPhone 12) |

### Mobile Devices
- **Android:** Pixel 5 (1080x2340)
- **iOS:** iPhone 12 (390x844)

### Responsive Features Tested
- Form input accessibility
- Touch target sizing (44x44px minimum)
- Keyboard input types
- Button responsiveness
- Layout adaptation
- Scroll behavior

---

## 📊 Test Reports

After running tests, view the HTML report:

```bash
npm run test:report
```

Reports include:
- ✅ Test pass/fail status
- 📸 Screenshots of failures
- 🎥 Video recordings of failures
- 📈 Timing information
- 🔍 Error details and stack traces
- 📋 Test duration statistics

### Report Location
- `playwright-report/index.html` - Main report
- `test-results/` - Screenshots and videos

---

## 🔄 CI/CD Integration

### GitHub Actions Workflow

The project includes a GitHub Actions workflow that:
- ✅ Runs on every push and pull request
- ✅ Tests all browsers (Chrome, Firefox, Safari)
- ✅ Tests mobile devices
- ✅ Generates HTML reports
- ✅ Uploads artifacts for review
- ✅ Can fail builds on test failures

**Workflow File:** `.github/workflows/e2e-tests.yml`

### Setup GitHub Actions

1. Push project to GitHub repository
2. GitHub Actions will automatically:
   - Install dependencies
   - Install Playwright browsers
   - Run all tests
   - Generate reports
   - Archive results

### View Results
1. Go to repository → Actions tab
2. Click on the workflow run
3. View test results and download artifacts

### CI/CD Configuration Options

See [CI_CD_GUIDE.md](docs/CI_CD_GUIDE.md) for:
- Custom environments
- Credentials management
- Parallel execution
- Custom scripts
- Integration with other tools

---

## 💻 Page Objects

The framework uses Page Object Model pattern for maintainability:

### BasePage
Base class with common methods:
- `fillInput()` - Fill form fields
- `clickElement()` - Click elements
- `isElementVisible()` - Check visibility
- `getElementText()` - Get text content
- `waitForElement()` - Wait for elements
- `takeScreenshot()` - Capture screenshots

### LoginPage
Handles both login and signup:
- `navigateToLogin()` - Go to login page
- `login()` - Perform login
- `fillSignupForm()` - Fill signup form
- `isLoginErrorDisplayed()` - Check for error

### SignupPage
Account creation flow:
- `navigateToSignup()` - Go to signup
- `selectTitle()` - Select Mr/Mrs
- `fillPassword()` - Enter password
- `selectDateOfBirth()` - Pick date
- `fillAddressInfo()` - Enter address
- `completeSignup()` - Full signup process

### HomePage
Home page interactions:
- `navigateToHome()` - Go to home
- `clickSignupLoginLink()` - Click signup
- `clickLogoutLink()` - Log out
- `isUserLoggedIn()` - Check login status

---

## 📝 Writing Custom Tests

### Basic Test Structure

```typescript
import { test, expect } from '../fixtures/pageFixtures';
import { testData } from '../data/testData';

test.describe('Feature Name', () => {
  test('TC-XXX: Test description', async ({ 
    loginPage, 
    page 
  }) => {
    // Arrange
    await loginPage.navigateToLogin();
    
    // Act
    await loginPage.login('user@email.com', 'password');
    
    // Assert
    expect(await page.url()).toContain('/account');
  });
});
```

### Using Test Data

```typescript
const user = testData.validUsers[0];
// {
//   name: 'John Doe',
//   email: 'john.doe.xxx@automation.com',
//   password: 'Test@123456',
//   ...
// }
```

---

## 🐛 Debugging

### Interactive Debug Mode
```bash
npm run test:debug
```
- Step through tests
- Inspect elements
- Try selectors
- Execute commands

### UI Mode (Visual Debugging)
```bash
npm run test:ui
```
- Visual test execution
- Step backwards/forwards
- Inspect DOM
- Watch/log values

### Generate Code (Codegen)
```bash
npm run test:codegen
```
- Record user interactions
- Auto-generate test code
- Learn selectors

---

## 📚 Documentation

- **[TEST_CASES.md](docs/TEST_CASES.md)** - Detailed test case documentation
- **[USER_GUIDE.md](docs/USER_GUIDE.md)** - Complete usage guide
- **[CI_CD_GUIDE.md](docs/CI_CD_GUIDE.md)** - CI/CD integration guide
- **[Playwright Docs](https://playwright.dev/)** - Official Playwright documentation

---

## 🔧 Configuration

### Playwright Config
Edit `playwright.config.ts` to customize:
- Timeout values
- Reporters
- Screenshots/Videos
- Browser options
- Retry policies

### Test Data
Modify `tests/data/testData.ts` to:
- Add test users
- Change test URLs
- Update credentials
- Adjust timeouts

---

## ✅ Checklist Before Committing

- [ ] All tests pass locally
- [ ] No hardcoded credentials
- [ ] Selectors are updated for current website
- [ ] Page objects are documented
- [ ] Test data is unique (no duplicates)
- [ ] Cross-browser tests pass
- [ ] Mobile tests pass
- [ ] HTML report generated successfully
- [ ] No console errors

---

## 🤝 Contributing

To add new tests:

1. Create test file in appropriate spec folder
2. Follow naming convention: `NN-feature.spec.ts`
3. Use unique test IDs (TC-XXX)
4. Document test in [TEST_CASES.md](docs/TEST_CASES.md)
5. Update this README if adding new features
6. Run full test suite before committing

---

## ⚠️ Known Issues

1. **Email Uniqueness:** Each test run should use unique emails
2. **Session Timeouts:** Long test runs may encounter session timeouts
3. **Flaky Tests:** Some tests may be flaky depending on network
4. **Selector Changes:** Selectors need updating if website changes

---

## 🆘 Troubleshooting

### Installation Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npx playwright install
```

### Tests Timing Out
- Increase timeout in `playwright.config.ts`
- Check website accessibility
- Verify network connectivity

### Selectors Not Found
- Use debug mode: `npm run test:debug`
- Check if selector is correct
- Verify element is not in iframe

### CI/CD Failures
- Check GitHub Actions logs
- Ensure all dependencies in package.json
- Verify selectors work in headless mode

---

## 📞 Support

For issues or questions:
1. Check the documentation
2. Review test output and reports
3. Use debug mode to investigate
4. Check Playwright documentation

---

## 📄 License

MIT License - Feel free to use and modify

---

## 🎯 Future Enhancements

- [ ] Performance testing
- [ ] Load testing
- [ ] API testing integration
- [ ] Visual regression testing
- [ ] Custom test reporters
- [ ] Test result trending
- [ ] Multi-environment support

---

**Project Status:** Active  
**Last Updated:** February 9, 2026  
**Version:** 1.0.0  
**Playwright Version:** ^1.40.0  
**TypeScript Version:** ^5.3.0

---

## 🔗 Quick Links

- [Test Cases Documentation](docs/TEST_CASES.md)
- [User Guide](docs/USER_GUIDE.md)
- [CI/CD Guide](docs/CI_CD_GUIDE.md)
- [Playwright Documentation](https://playwright.dev/)
- [Automation Exercise Website](https://automationexercise.com/)
