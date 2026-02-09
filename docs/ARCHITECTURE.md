# Implementation Architecture Guide

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│         GitHub Actions CI/CD Pipeline                       │
│  (Scheduled daily, on push, on PR)                           │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ├─ Matrix Strategy
                       │  ├─ Chromium Tests
                       │  ├─ Firefox Tests
                       │  ├─ WebKit Tests
                       │  └─ Mobile Tests (parallel)
                       │
┌──────────────────────▼──────────────────────────────────────┐
│          Playwright Test Execution                          │
│                                                              │
│  1. Load Configuration (playwright.config.ts)               │
│  2. Initialize Fixtures (pageFixtures.ts)                   │
│  3. Execute Test Specs (01-04.spec.ts)                      │
│  4. Generate Reports & Artifacts                            │
└──────────────────────┬──────────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
    ┌────────┐   ┌──────────┐   ┌──────────┐
    │ Tests  │   │ Page     │   │ Test     │
    │        │──▶│ Objects  │◀──│ Data     │
    └────────┘   │          │   │          │
                 └──────────┘   └──────────┘
                       │
        ┌──────────────┴──────────────┐
        │                             │
        ▼                             ▼
   ┌─────────────┐           ┌────────────────┐
   │ Reports     │           │ Artifacts      │
   │ - HTML      │           │ - Screenshots  │
   │ - JUnit XML │           │ - Videos       │
   └─────────────┘           │ - Traces       │
                             └────────────────┘
```

---

## Component Interaction Flow

### 1. Test Execution Flow

```
Start Test
    │
    ├─► Load Fixture (pageFixtures.ts)
    │   └─► Inject Page Objects
    │
    ├─► Setup (beforeEach)
    │   └─► Clear Cookies & Storage
    │
    ├─► Arrange
    │   └─► Navigate to page
    │
    ├─► Act
    │   └─► Interact with elements
    │       (using page objects)
    │
    ├─► Assert
    │   └─► Verify expectations
    │
    ├─► Teardown (afterEach)
    │   └─► Cleanup resources
    │
    ├─► Report
    │   └─► Screenshot/Video on failure
    │
    └─► End Test
```

### 2. Page Object Interaction

```
Test Case
    │
    └─► Page Object (LoginPage)
        │
        ├─ Locators (selectors)
        │  └─► .loginEmailInput
        │  └─► .loginButton
        │  └─► etc.
        │
        ├─ Methods
        │  └─► navigateToLogin()
        │  │   └─► BasePage.goto()
        │  │
        │  └─► login(email, password)
        │      └─► fillInput() → clickElement()
        │          └─► BasePage methods
        │
        └─ Return to Test
```

### 3. Test Data Flow

```
Test Execution
    │
    └─► Import testData from testData.ts
        │
        ├─ validUsers[]
        │  └─► Unique user data per test run
        │
        ├─ invalidCredentials[]
        │  └─► Known invalid data
        │
        ├─ testUrls
        │  └─► Base URL and endpoints
        │
        └─ testTimeouts
           └─► Wait durations
```

---

## File Dependencies Map

```
playwright.config.ts (Configuration)
    │
    ├─► package.json (Dependencies)
    │   └─► @playwright/test
    │   └─► typescript
    │
    ├─► tests/specs/*.spec.ts (Test Cases)
    │   │
    │   ├─► fixtures/pageFixtures.ts
    │   │   └─► pages/*.ts (Page Objects)
    │   │       └─► BasePage.ts
    │   │
    │   ├─► data/testData.ts
    │   │   └─► Test data constants
    │   │
    │   └─► utils/ (Helper functions)
    │
    └─► .github/workflows/e2e-tests.yml (CI/CD)
        └─► On trigger → Run tests
            └─► Generate reports
```

---

## Page Object Class Hierarchy

```
BasePage
    │
    ├─── Common Methods
    │    ├─ goto()
    │    ├─ fillInput()
    │    ├─ clickElement()
    │    ├─ getElementText()
    │    ├─ isElementVisible()
    │    ├─ waitForElement()
    │    └─ etc.
    │
    ├──► HomePage extends BasePage
    │    ├─ signupLoginLink
    │    ├─ logoutLink
    │    ├─ clickSignupLoginLink()
    │    ├─ isUserLoggedIn()
    │    └─ etc.
    │
    ├──► LoginPage extends BasePage
    │    ├─ loginEmailInput
    │    ├─ signupNameInput
    │    ├─ login()
    │    ├─ fillSignupForm()
    │    └─ etc.
    │
    └──► SignupPage extends BasePage
         ├─ passwordInput
         ├─ countrySelect
         ├─ fillPassword()
         ├─ selectDateOfBirth()
         ├─ completeSignup()
         └─ etc.
```

---

## Test Suite Organization

```
Authentication Tests
    │
    ├─► Positive (01-auth-positive.spec.ts)
    │   ├─ TC-001: Register with valid data
    │   ├─ TC-002: Login with valid credentials
    │   ├─ TC-003: Logout
    │   ├─ TC-004: User info persistence
    │   └─ TC-005: Cross-browser signup
    │
    └─► Negative (02-auth-negative.spec.ts)
        ├─ TC-101: Login with non-existent email
        ├─ TC-102: Login with wrong password
        ├─ TC-103-105: Empty field validations
        ├─ TC-106-109: Signup validations
        ├─ TC-110: Session security
        ├─ TC-111: CSRF protection
        ├─ TC-112: SQL injection prevention
        └─ TC-113: Password field masking

Account Management Tests (03-account-management.spec.ts)
    ├─ TC-201: View account details
    ├─ TC-202: Delete account
    ├─ TC-203: Protected page access
    ├─ TC-204: Session persistence
    └─ TC-205: Profile info retrieval

Mobile & Responsive Tests (04-mobile-responsive.spec.ts)
    ├─ TC-301-307: Mobile form responsiveness
    ├─ TC-401-403: Cross-browser compatibility
    └─ Mobile Device Coverage
        ├─ Pixel 5 (Android)
        └─ iPhone 12 (iOS)
```

---

## Playwright Configuration Layers

```
playwright.config.ts
    │
    ├─► Global Settings
    │   ├─ testDir: './tests'
    │   ├─ timeout: 30000
    │   ├─ retries: 2 (CI only)
    │   └─ workers: 4
    │
    ├─► Reporters
    │   ├─ HTML reporter
    │   └─ JUnit XML export
    │
    ├─► Projects (Browsers)
    │   │
    │   ├─ chromium
    │   │  └─ Browser config
    │   │
    │   ├─ firefox
    │   │  └─ Browser config
    │   │
    │   ├─ webkit
    │   │  └─ Browser config
    │   │
    │   ├─ Mobile Chrome
    │   │  └─ Device: Pixel 5
    │   │
    │   └─ Mobile Safari
    │      └─ Device: iPhone 12
    │
    └─► Global Use Options
        ├─ baseURL (https://automationexercise.com)
        ├─ trace: 'on-first-retry'
        ├─ screenshot: 'only-on-failure'
        └─ video: 'retain-on-failure'
```

---

## CI/CD Pipeline Stages

```
Trigger Event
(push, PR, schedule)
    │
    ├─► 1. Checkout Code
    │   └─► Clone repository
    │
    ├─► 2. Setup Environment
    │   ├─ Install Node.js
    │   └─ Cache npm dependencies
    │
    ├─► 3. Install Dependencies
    │   ├─ npm ci
    │   └─ npm install
    │
    ├─► 4. Install Browsers
    │   └─ npx playwright install
    │
    ├─► 5. Run Tests (Matrix Strategy)
    │   ├─ Chrome Tests (parallel job)
    │   ├─ Firefox Tests (parallel job)
    │   ├─ Safari Tests (parallel job)
    │   └─ Mobile Tests (parallel job)
    │
    ├─► 6. Generate Reports
    │   ├─ HTML reports
    │   ├─ JUnit XML
    │   ├─ Screenshots
    │   └─ Videos
    │
    ├─► 7. Upload Artifacts
    │   ├─ Playwright reports (30 days)
    │   ├─ Test videos (7 days)
    │   └─ JUnit results (30 days)
    │
    ├─► 8. Test Summary
    │   └─ Publish results
    │
    └─► 9. Notification (if failed)
        └─ Notify team
```

---

## Data Flow Diagram

```
                    ┌─────────────────┐
                    │  Test Execution │
                    └────────┬────────┘
                             │
                ┌────────────┼────────────┐
                │            │            │
                ▼            ▼            ▼
           ┌─────────┐  ┌──────────┐  ┌──────────┐
           │ Fixtures│  │Page Objs │  │Test Data │
           │         │  │          │  │          │
           │Page     │  │BasePage  │  │validUsers│
           │Objects  │  │LoginPage │  │invalid.. │
           │Injection│  │SignupPage│  │testUrls  │
           └────┬────┘  │HomePage  │  │timeouts  │
                │       └──────────┘  └──────────┘
                │            │            │
                └────────────┼────────────┘
                             │
                             ▼
                       ┌──────────────┐
                       │Playwright    │
                       │Execution     │
                       │Engine        │
                       └────┬─────────┘
                            │
           ┌────────────────┬┴─────────────────┐
           │                │                  │
           ▼                ▼                  ▼
      ┌─────────┐      ┌────────┐        ┌─────────┐
      │Browser  │      │Reports │        │Artifacts│
      │Control  │      │Assembly│        │Storage  │
      │         │      │        │        │         │
      │Execute  │      │ HTML   │        │Screen.. │
      │Actions  │      │ JUnit  │        │Videos   │
      │Verify   │      │ List   │        │Traces   │
      └─────────┘      └────────┘        └─────────┘
```

---

## Test Execution Timeline

```
Test Start
    │
    ├─ 0-5s: Navigate & Wait for Page
    ├─ 5-10s: Fill Form / Input Data
    ├─ 10-15s: Click Button / Submit
    ├─ 15-20s: Wait for Navigation
    ├─ 20-30s: Verify Results / Assert
    │
    ├─ If Passed:
    │   └─ End test, clean resources
    │
    ├─ If Failed:
    │   ├─ Take screenshot
    │   ├─ Record video
    │   ├─ Save trace
    │   └─ Log error details
    │
    └─ Test End (~30-120s per test)
```

---

## Configuration Precedence

```
1. playwright.config.ts (Highest Priority)
   └─ Global settings

2. Test File Configuration
   └─ test.describe(), test.beforeEach()

3. CLI Arguments
   └─ npm run test:chrome

4. Environment Variables
   └─ DEFAULT Values (Lowest Priority)
```

---

## Error Handling Flow

```
Error Occurs
    │
    ├─► Test Assertion Fails
    │   └─► Capture Screenshot
    │       ├─► Save to test-results/
    │       └─► Reference in report
    │
    ├─► Element Not Found
    │   ├─► Retry with wait
    │   ├─► Timeout after 30s
    │   └─► Log selector error
    │
    ├─► Navigation Timeout
    │   └─► Mark as flaky
    │       └─► Retry (CI only)
    │
    └─► Browser Crash
        └─► Restart browser
            └─► Retry test
```

---

## Reporting Architecture

```
Test Execution
    │
    ├─► Event Tracking
    │   ├─ Start event
    │   ├─ Step events
    │   ├─ Assertion events
    │   └─ End event
    │
    ├─► Artifact Collection
    │   ├─ Screenshots
    │   ├─ Video frames
    │   ├─ Trace data
    │   └─ Console logs
    │
    ├─► Reporters Process Events
    │   ├─ HTML Reporter
    │   │  └─ Generate HTML
    │   │
    │   └─ JUnit Report
    │      └─ Generate XML
    │
    └─► Artifacts Upload
        └─ GitHub Actions
            └─ Archive reports
```

---

## Parallel Execution Strategy

```
Job Start
    │
    ├─► Browser 1: Chromium
    │   ├─ Test 1-8 (parallel)
    │   └─ Duration: ~5 min
    │
    ├─► Browser 2: Firefox
    │   ├─ Test 1-8 (parallel)
    │   └─ Duration: ~5 min
    │
    ├─► Browser 3: WebKit
    │   ├─ Test 1-8 (parallel)
    │   └─ Duration: ~5 min
    │
    └─► Mobile Tests
        ├─ Mobile Chrome
        ├─ Mobile Safari
        └─ Duration: ~5 min
        
Total Time: ~5 minutes (parallel)
vs Sequential: ~20 minutes
Speedup: 4x faster
```

---

## Security Testing Flow

```
Security Tests
    │
    ├─► CSRF Test (TC-111)
    │   └─► Inspect form for tokens
    │
    ├─► SQL Injection Test (TC-112)
    │   └─► Submit: "admin' --"
    │       └─► Verify safe handling
    │
    ├─► Password Masking (TC-113)
    │   └─► Check input type="password"
    │
    └─► Session Test (TC-110)
        └─► Logout → Try protected page
            └─► Verify redirect/error
```

---

**Architecture Version:** 1.0.0  
**Last Updated:** February 9, 2026  
**Status:** ✅ Complete
