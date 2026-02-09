# CI/CD Integration Guide

## Overview

This guide explains how to integrate the Automation Exercise E2E Testing Framework with CI/CD pipelines, specifically GitHub Actions.

---

## GitHub Actions Integration

### What is GitHub Actions?

GitHub Actions is a continuous integration and continuous delivery (CI/CD) service that automatically runs tests, builds, and deploys code when you push to a GitHub repository.

### How It Works for This Project

1. **Trigger:** Every push to the repository triggers the workflow
2. **Setup:** GitHub Actions sets up a runner with Node.js
3. **Installation:** Dependencies and Playwright browsers are installed
4. **Test Execution:** All tests run across all browsers and mobile devices
5. **Reporting:** Results are published as artifacts
6. **Notification:** You're notified of pass/fail status

---

## Setup Instructions

### Step 1: Create GitHub Repository

1. Create a new repository on GitHub
2. Clone locally or push existing code
3. Repository structure should match project layout

```bash
git init
git add .
git commit -m "Initial commit: E2E testing framework"
git remote add origin https://github.com/YOUR_USERNAME/automation-exercise-e2e-tests.git
git branch -M main
git push -u origin main
```

### Step 2: Create Workflow File

Create `.github/workflows/e2e-tests.yml`:

```yaml
name: E2E Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    
    strategy:
      fail-fast: false
      matrix:
        browser: [chromium, firefox, webkit]
        
    name: Test on ${{ matrix.browser }}

    steps:
      - uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps

      - name: Run tests on ${{ matrix.browser }}
        run: npm run test:${{ matrix.browser }}

      - name: Upload test results
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: test-results-${{ matrix.browser }}
          path: playwright-report/
          retention-days: 30

      - name: Upload test videos
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: test-videos-${{ matrix.browser }}
          path: test-results/
          retention-days: 7

  mobile-test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    name: Mobile Tests

    steps:
      - uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Install Playwright browsers
        run: npx playwright install --with-deps

      - name: Run mobile tests
        run: npm run test:mobile

      - name: Upload mobile test results
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: test-results-mobile
          path: playwright-report/
          retention-days: 30
```

### Step 3: Push to GitHub

```bash
git add .github/workflows/e2e-tests.yml
git commit -m "Add GitHub Actions E2E test workflow"
git push
```

---

## Workflow File Explanation

### Triggers (on)
```yaml
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]
```
- Runs on every push to main/develop
- Runs on every pull request to main/develop
- Can be customized to run on schedule

### Matrix Strategy
```yaml
strategy:
  fail-fast: false
  matrix:
    browser: [chromium, firefox, webkit]
```
- Runs tests on multiple browsers in parallel
- `fail-fast: false` means all browsers test even if one fails
- Saves time by running in parallel

### Artifacts
```yaml
- uses: actions/upload-artifact@v3
  with:
    name: test-results-${{ matrix.browser }}
    path: playwright-report/
    retention-days: 30
```
- Uploads test reports for later review
- Keeps artifacts for 30 days
- Downloadable from GitHub Actions interface

---

## Advanced Configurations

### Running on Schedule (Nightly Builds)

```yaml
on:
  schedule:
    # Run tests every night at 2 AM UTC
    - cron: '0 2 * * *'
```

### Multiple Node Versions

```yaml
strategy:
  matrix:
    node-version: [16, 18, 20]
    browser: [chromium, firefox, webkit]
```

### Run Only on Specific Conditions

```yaml
on:
  push:
    branches: [main]
    paths:
      - 'tests/**'
      - 'playwright.config.ts'
      - 'package.json'
```

### Fail if Tests Don't Pass

```yaml
- name: Run tests
  run: npm test
  
- name: Fail if tests failed
  if: failure()
  run: exit 1
```

### Send Notifications

```yaml
- name: Send Slack Notification
  if: always()
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    text: 'E2E Tests: ${{ job.status }}'
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

---

## Managing Secrets

### Adding GitHub Secrets

1. Go to Repository Settings → Secrets
2. Click "New repository secret"
3. Add secret name and value

### Using Secrets in Workflow

```yaml
env:
  DATABASE_URL: ${{ secrets.DATABASE_URL }}
  API_KEY: ${{ secrets.API_KEY }}
```

### Common Secrets for Testing

- `TEST_USER_EMAIL` - Test account email
- `TEST_USER_PASSWORD` - Test account password
- `SLACK_WEBHOOK` - For Slack notifications
- `GITHUB_TOKEN` - For GitHub operations

---

## Monitoring and Debugging

### View Workflow Results

1. Go to repository → Actions tab
2. Click on the workflow run
3. View detailed logs and artifacts

### Debug a Failed Workflow

1. Check the workflow logs for error messages
2. Look at test reports (playwright-report/)
3. Review videos of failed tests
4. Check screenshots of failures

### Re-run Failed Workflows

1. Go to failed workflow run
2. Click "Re-run jobs"
3. Select "Re-run failed jobs"

### View Live Logs

Logs are updated in real-time as the workflow runs.

---

## Best Practices

### 1. Use Consistent Environment
```yaml
runs-on: ubuntu-latest
```
- Consistent OS and browser versions
- Prevents environment-specific issues

### 2. Cache Dependencies
```yaml
- uses: actions/setup-node@v4
  with:
    node-version: '18'
    cache: 'npm'
```
- Speeds up workflow execution
- Reduces build time significantly

### 3. Separate Concerns
```yaml
jobs:
  test:
    # Tests
  lint:
    # Linting
  report:
    # Reporting
```

### 4. Use Matrix for Parallel Testing
Speeds up execution from serial to parallel:
- Without matrix: All tests run sequentially (60+ minutes)
- With matrix: All browsers tested in parallel (20 minutes)

### 5. Archive Artifacts
```yaml
- uses: actions/upload-artifact@v3
  if: always()
```
- Keep all artifacts for debugging
- Use `if: always()` to archive even on failure

---

## Integration with Other Tools

### Slack Notifications

```yaml
- name: Notify Slack
  uses: slackapi/slack-github-action@v1
  with:
    payload: |
      {
        "text": "E2E Tests: ${{ job.status }}",
        "blocks": [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "E2E Test Results\nStatus: ${{ job.status }}"
            }
          }
        ]
      }
  env:
    SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}
```

### Email Notifications

Use third-party action:
```yaml
- name: Send Email
  uses: dawidd6/action-send-mail@v3
  with:
    server_address: ${{ secrets.EMAIL_SERVER }}
    server_port: ${{ secrets.EMAIL_PORT }}
    username: ${{ secrets.EMAIL_USERNAME }}
    password: ${{ secrets.EMAIL_PASSWORD }}
    subject: E2E Tests - ${{ job.status }}
    to: team@example.com
    from: ci@example.com
    body: Test results are ready
```

### Jira Integration

```yaml
- name: Create Jira Issue on Failure
  if: failure()
  uses: atlassian/gajira-create@v3
  with:
    project: QA
    issuetype: Bug
    summary: E2E Tests Failed
    description: Tests failed in workflow run
```

---

## Performance Optimization

### Parallel Execution

```yaml
strategy:
  matrix:
    browser: [chromium, firefox, webkit]
    os: [ubuntu-latest]
```

**Results:**
- Instead of: 60 min (sequential)
- With matrix: 20 min (parallel on 3 browsers)

### Timeout Configuration

```yaml
timeout-minutes: 60
```
- Set appropriate timeout for your tests
- Prevents hanging workflows
- Ubuntu runners: timeout-minutes 360 max

### Skip Unnecessary Tests

```yaml
- name: Run full tests
  if: github.event_name == 'pull_request'
  run: npm test

- name: Run quick smoke tests
  if: github.event_name == 'push'
  run: npm test -- --grep "@smoke"
```

---

## Cost Optimization

### GitHub Actions Pricing

- Free tier: 2,000 minutes/month
- Paid: $0.008 per minute after free tier
- Private repos: Same free tier

### Cost Reduction Strategies

1. **Run tests only on relevant branches**
   ```yaml
   on:
     push:
       branches: [main]
   ```

2. **Use schedule triggers**
   ```yaml
   on:
     schedule:
       - cron: '0 2 * * *'
   ```

3. **Cache dependencies**
   ```yaml
   cache: 'npm'
   ```

4. **Selective test runs**
   ```yaml
   if: contains(github.event.head_commit.modified, 'tests/')
   ```

---

## Example Workflows

### Minimal Setup
```yaml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm test
```

### Full Featured
```yaml
name: E2E Tests
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]
  schedule:
    - cron: '0 2 * * *'

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    strategy:
      matrix:
        browser: [chromium, firefox, webkit]
    
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run test:${{ matrix.browser }}
      
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: results-${{ matrix.browser }}
          path: playwright-report/
```

---

## Environment Variables

### GitHub Context Variables

```yaml
env:
  CI: true
  BRANCH: ${{ github.ref }}
  COMMIT: ${{ github.sha }}
  RUN_ID: ${{ github.run_id }}
```

### Using in Tests

```typescript
const baseUrl = process.env.BASE_URL || 'https://automationexercise.com';
const isCI = process.env.CI === 'true';
```

---

## Troubleshooting

### Common Issues

**Tests hang/timeout**
- Increase timeout-minutes
- Check for blocking operations
- Verify website accessibility

**Browsers not found**
- Ensure `npx playwright install --with-deps` runs
- Check Ubuntu dependencies

**Memory issues**
- Reduce parallel jobs
- Use ubuntu-latest (more resources)

**Flaky tests**
- Add retries in config
- Increase wait times
- Check for timing issues

---

## Local Testing as CI Would

Test your workflow locally before pushing:

```bash
# Simulate CI environment
CI=true npm test

# Run single browser (like CI matrix)
npm run test:chrome
npm run test:firefox
npm run test:webkit
```

---

## Advanced: Custom Scripts

Create custom test scripts in `package.json`:

```json
{
  "scripts": {
    "test:ci": "npm run test:chrome && npm run test:firefox && npm run test:webkit && npm run test:mobile",
    "test:smoke": "npm test -- --grep '@smoke'",
    "test:regression": "npm test -- --grep '@regression'"
  }
}
```

Use in workflow:
```yaml
- run: npm run test:ci
```

---

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Playwright in CI/CD](https://playwright.dev/docs/ci)
- [GitHub Actions Marketplace](https://github.com/marketplace?type=actions)
- [Actions Best Practices](https://docs.github.com/en/actions/learn-github-actions/workflow-syntax-for-github-actions)

---

**Last Updated:** February 9, 2026  
**Version:** 1.0.0
