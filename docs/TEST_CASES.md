# Test Case Documentation

## Overview
This document provides comprehensive documentation of all test cases for the Automation Exercise E2E Testing Framework.

---

## Test Case Summary

| Test ID | Module | Description | Type | Status |
|---------|--------|-------------|------|--------|
| TC-001 | Auth - Positive | User registration with valid data | Positive | Active |
| TC-002 | Auth - Positive | Login with valid credentials | Positive | Active |
| TC-003 | Auth - Positive | User logout functionality | Positive | Active |
| TC-004 | Auth - Positive | User info persistence after registration | Positive | Active |
| TC-005 | Auth - Positive | Cross-browser signup functionality | Positive | Active |
| TC-101 | Auth - Negative | Login with non-existent email | Negative | Active |
| TC-102 | Auth - Negative | Login with wrong password | Negative | Active |
| TC-103 | Auth - Negative | Login with empty email | Negative | Active |
| TC-104 | Auth - Negative | Login with empty password | Negative | Active |
| TC-105 | Auth - Negative | Login with empty credentials | Negative | Active |
| TC-106 | Auth - Negative | Signup with duplicate email | Negative | Active |
| TC-107 | Auth - Negative | Signup with empty name | Negative | Active |
| TC-108 | Auth - Negative | Signup with empty email | Negative | Active |
| TC-109 | Auth - Negative | Signup with invalid email format | Negative | Active |
| TC-110 | Auth - Negative | Session persistence after logout | Negative | Active |
| TC-111 | Auth - Negative | CSRF protection verification | Negative | Active |
| TC-112 | Auth - Negative | SQL injection prevention | Negative | Active |
| TC-113 | Auth - Negative | Password field masking | Negative | Active |
| TC-201 | Account | View account details | Positive | Active |
| TC-202 | Account | Delete account | Positive | Active |
| TC-203 | Account | Protected page access control | Negative | Active |
| TC-204 | Account | Session persistence across navigation | Positive | Active |
| TC-205 | Account | Profile info retrieval | Positive | Active |
| TC-301 | Mobile | Signup form responsiveness | Positive | Active |
| TC-302 | Mobile | Login form responsiveness | Positive | Active |
| TC-303 | Mobile | Navigation on mobile | Positive | Active |
| TC-304 | Mobile | Keyboard input types | Positive | Active |
| TC-305 | Mobile | Touch target sizing | Positive | Active |
| TC-306 | Mobile | Scroll interaction | Positive | Active |
| TC-307 | Mobile | Layout adaptation | Positive | Active |
| TC-401 | CrossBrowser | Signup on all browsers | Positive | Active |
| TC-402 | CrossBrowser | CSS rendering consistency | Positive | Active |
| TC-403 | CrossBrowser | JavaScript functionality | Positive | Active |

---

## Authentication Tests - Positive Scenarios

### TC-001: User Registration with Valid Data
**Module:** Authentication - Positive Scenarios  
**Priority:** P0 (Critical)  
**Test Type:** Positive  
**Browsers:** Chrome, Firefox, Safari  
**Devices:** Desktop, Mobile  

**Objective:**
Verify that a new user can successfully register with valid information.

**Preconditions:**
- User is not already registered
- Email is unique
- All required fields are available

**Test Steps:**
1. Navigate to the main page
2. Click on "Signup / Login" link
3. Fill in name and email in signup section
4. Click "Signup" button
5. Fill in account information (title, password, DOB)
6. Enable newsletter and special offers checkboxes
7. Fill in address information
8. Click "Create Account" button
9. Verify "Account Created!" message appears

**Expected Results:**
- Account is successfully created
- User is redirected to account details page
- Confirmation message is displayed
- User can login with new credentials

**Actual Results:**
[To be filled during execution]

**Pass/Fail:**
[To be filled during execution]

---

### TC-002: Login with Valid Credentials
**Module:** Authentication - Positive Scenarios  
**Priority:** P0 (Critical)  
**Test Type:** Positive  
**Browsers:** Chrome, Firefox, Safari  
**Devices:** Desktop, Mobile  

**Objective:**
Verify that a registered user can login successfully with valid credentials.

**Preconditions:**
- User account exists
- Email and password are correct
- User is not already logged in

**Test Steps:**
1. Navigate to the login page
2. Enter valid email in "Email" field
3. Enter valid password in "Password" field
4. Click "Login" button
5. Verify navigation to account/home page

**Expected Results:**
- User is successfully authenticated
- User is redirected to account/home page
- Session is created
- Logout option appears in navigation

**Actual Results:**
[To be filled during execution]

**Pass/Fail:**
[To be filled during execution]

---

### TC-003: User Logout Functionality
**Module:** Authentication - Positive Scenarios  
**Priority:** P0 (Critical)  
**Test Type:** Positive  
**Browsers:** Chrome, Firefox, Safari  
**Devices:** Desktop, Mobile  

**Objective:**
Verify that a logged-in user can logout successfully.

**Preconditions:**
- User is logged in
- Logout option is available in navigation

**Test Steps:**
1. Verify user is logged in
2. Navigate to home page
3. Click on "Logout" link
4. Verify redirection to home/login page
5. Verify logout link is no longer visible

**Expected Results:**
- User session is terminated
- User is redirected properly
- User cannot access protected pages without re-login
- Login option reappears in navigation

**Actual Results:**
[To be filled during execution]

**Pass/Fail:**
[To be filled during execution]

---

## Authentication Tests - Negative Scenarios

### TC-101: Login with Non-existent Email
**Module:** Authentication - Negative Scenarios  
**Priority:** P1 (High)  
**Test Type:** Negative  
**Browsers:** Chrome, Firefox, Safari  
**Devices:** Desktop, Mobile  

**Objective:**
Verify that login fails when using a non-existent email address.

**Preconditions:**
- Email does not have a registered account
- Error message is configured

**Test Steps:**
1. Navigate to the login page
2. Enter non-existent email
3. Enter any password
4. Click "Login" button
5. Verify error message is displayed

**Expected Results:**
- Login is rejected
- Error message "Your email or password is incorrect!" is displayed
- User remains on login page
- User is not authenticated

**Actual Results:**
[To be filled during execution]

**Pass/Fail:**
[To be filled during execution]

---

### TC-102: Login with Wrong Password
**Module:** Authentication - Negative Scenarios  
**Priority:** P1 (High)  
**Test Type:** Negative  
**Browsers:** Chrome, Firefox, Safari  
**Devices:** Desktop, Mobile  

**Objective:**
Verify that login fails when using an incorrect password.

**Preconditions:**
- Email exists in system
- Provided password is incorrect

**Test Steps:**
1. Navigate to the login page
2. Enter valid email
3. Enter incorrect password
4. Click "Login" button
5. Verify error message is displayed

**Expected Results:**
- Login is rejected
- Error message is displayed
- User remains on login page
- User is not authenticated

**Actual Results:**
[To be filled during execution]

**Pass/Fail:**
[To be filled during execution]

---

### TC-103: Login with Empty Email
**Module:** Authentication - Negative Scenarios  
**Priority:** P1 (High)  
**Test Type:** Negative  
**Browsers:** Chrome, Firefox, Safari  
**Devices:** Desktop, Mobile  

**Objective:**
Verify that form validation prevents login with empty email field.

**Preconditions:**
- Email field is required
- Form validation is active

**Test Steps:**
1. Navigate to the login page
2. Leave email field empty
3. Enter any password
4. Click "Login" button
5. Verify form validation message or error

**Expected Results:**
- Form submission is prevented
- Validation message is displayed (if applicable)
- User remains on login page

**Actual Results:**
[To be filled during execution]

**Pass/Fail:**
[To be filled during execution]

---

### TC-104: Login with Empty Password
**Module:** Authentication - Negative Scenarios  
**Priority:** P1 (High)  
**Test Type:** Negative  
**Browsers:** Chrome, Firefox, Safari  
**Devices:** Desktop, Mobile  

**Objective:**
Verify that form validation prevents login with empty password field.

**Preconditions:**
- Password field is required
- Form validation is active

**Test Steps:**
1. Navigate to the login page
2. Enter valid email
3. Leave password field empty
4. Click "Login" button
5. Verify form validation

**Expected Results:**
- Form submission is prevented
- Validation message is displayed (if applicable)
- User remains on login page

**Actual Results:**
[To be filled during execution]

**Pass/Fail:**
[To be filled during execution]

---

### TC-105: Login with Empty Email and Password
**Module:** Authentication - Negative Scenarios  
**Priority:** P1 (High)  
**Test Type:** Negative  
**Browsers:** Chrome, Firefox, Safari  
**Devices:** Desktop, Mobile  

**Objective:**
Verify that form validation prevents login when both fields are empty.

**Preconditions:**
- Form validation is active

**Test Steps:**
1. Navigate to the login page
2. Leave both email and password empty
3. Click "Login" button
4. Verify form remains on login page

**Expected Results:**
- Form submission is prevented
- User remains on login page
- Form is still visible and interactable

**Actual Results:**
[To be filled during execution]

**Pass/Fail:**
[To be filled during execution]

---

### TC-111: CSRF Protection
**Module:** Authentication - Negative Scenarios  
**Priority:** P1 (High)  
**Test Type:** Security  
**Browsers:** Chrome  
**Devices:** Desktop  

**Objective:**
Verify that the application implements CSRF (Cross-Site Request Forgery) protection.

**Preconditions:**
- Application is configured with CSRF protection
- Forms should include CSRF tokens

**Test Steps:**
1. Navigate to the login page
2. Inspect form HTML
3. Verify presence of CSRF token or similar protection mechanism
4. Attempt form submission

**Expected Results:**
- Forms contain CSRF protection tokens
- Form submission validates tokens
- Unauthorized requests are rejected

**Actual Results:**
[To be filled during execution]

**Pass/Fail:**
[To be filled during execution]

---

### TC-112: SQL Injection Prevention
**Module:** Authentication - Negative Scenarios  
**Priority:** P1 (High)  
**Test Type:** Security  
**Browsers:** Chrome  
**Devices:** Desktop  

**Objective:**
Verify that the application prevents SQL injection attacks.

**Preconditions:**
- SQL injection payloads should be tested

**Test Steps:**
1. Navigate to the login page
2. Enter SQL injection payload: `admin' --`
3. Enter SQL injection payload in password field
4. Click "Login" button
5. Verify application handles it safely

**Expected Results:**
- Login is rejected
- No database errors are exposed
- Application handles special characters safely
- Security error or generic error is shown

**Actual Results:**
[To be filled during execution]

**Pass/Fail:**
[To be filled during execution]

---

### TC-113: Password Field Masking
**Module:** Authentication - Negative Scenarios  
**Priority:** P1 (High)  
**Test Type:** Security  
**Browsers:** Chrome, Firefox, Safari  
**Devices:** Desktop, Mobile  

**Objective:**
Verify that password fields are properly masked for security.

**Preconditions:**
- Password input field should be of type "password"

**Test Steps:**
1. Navigate to the login page
2. Inspect password input field
3. Verify input type attribute

**Expected Results:**
- Password input field type is "password"
- Entered text is masked/hidden
- Characters appear as dots or asterisks

**Actual Results:**
[To be filled during execution]

**Pass/Fail:**
[To be filled during execution]

---

## Test Execution Guidelines

### Running All Tests
```bash
npm test
```

### Running Specific Browser
```bash
npm run test:chrome
npm run test:firefox
npm run test:webkit
```

### Running Mobile Tests
```bash
npm run test:mobile
```

### Running with UI
```bash
npm run test:ui
```

### Running in Debug Mode
```bash
npm run test:debug
```

### Generating Report
```bash
npm run test:report
```

---

## Test Data Management

### Valid Test Users
- User 1: john.doe@automation.com (registered)
- User 2: jane.smith@automation.com (registered)

### Test Environment
- Base URL: https://automationexercise.com
- Browser Compatibility: Chrome, Firefox, Safari
- Mobile Devices: Pixel 5 (Android), iPhone 12 (iOS)

---

## Known Issues and Limitations

1. **Pre-registered Users:** Some tests require pre-registered accounts
2. **Email Duplication:** Each test run should use unique email addresses to avoid conflicts
3. **Session Timeout:** Tests should be completed within session timeout period
4. **External Dependencies:** Tests depend on website availability

---

## Test Maintenance

### Adding New Tests
1. Create test file in appropriate spec folder
2. Follow naming convention: `NN-feature.spec.ts`
3. Use unique test IDs (TC-XXX)
4. Document in this file

### Updating Tests
1. Update documentation when changing test behavior
2. Ensure backward compatibility
3. Update test data as needed

---

## Contact & Support
For questions about test cases, please contact the QA team.

**Last Updated:** February 9, 2026  
**Version:** 1.0.0
