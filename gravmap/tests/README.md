# GravMap E2E Test Suite

Automated end-to-end tests using Playwright.

## Setup

### Prerequisites
- Node.js 18+ installed
- GravMap application running locally or accessible via URL

### Installation

```bash
# Install Playwright
npm install --save-dev @playwright/test

# Install Playwright browsers
npx playwright install
```

### Configuration

1. Copy the example environment file:
```bash
cp .env.test.example .env.test
```

2. Update `.env.test` with test credentials:
```env
TEST_USER_EMAIL=test@example.com
TEST_USER_PASSWORD=TestPass123!
TEST_FREE_USER_EMAIL=free@example.com
TEST_FREE_USER_PASSWORD=TestPass123!
TEST_PRO_USER_EMAIL=pro@example.com
TEST_PRO_USER_PASSWORD=TestPass123!
BASE_URL=http://localhost:3000
```

## Running Tests

### Run all tests
```bash
npm run test:e2e
```

### Run specific test file
```bash
npx playwright tests/e2e/auth.spec.ts
```

### Run in headed mode (see browser)
```bash
npx playwright test --headed
```

### Run specific browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Debug mode
```bash
npx playwright test --debug
```

### View test report
```bash
npx playwright show-report
```

## Test Structure

```
tests/
├── e2e/
│   ├── auth.spec.ts              # Authentication tests
│   ├── transactions.spec.ts      # Transaction CRUD tests
│   ├── documents.spec.ts         # Document upload & extraction
│   ├── billing.spec.ts           # Billing & subscriptions
│   └── timeline-dashboard.spec.ts # Timeline & dashboard
├── fixtures/                     # Test data files
│   └── sample-contract.pdf
└── README.md                     # This file
```

## Test Categories

### Authentication Tests (auth.spec.ts)
- TC-E2E-001: User can sign up
- TC-E2E-002: Signup validation
- TC-E2E-003: User can login
- TC-E2E-004: Login with invalid credentials
- TC-E2E-005: User can logout
- TC-E2E-006: Password reset flow
- TC-E2E-007: Protected route access

### Transaction Tests (transactions.spec.ts)
- TC-E2E-008: Create new transaction
- TC-E2E-009: View transaction list
- TC-E2E-010: Edit transaction
- TC-E2E-011: Search transactions
- TC-E2E-012: Form validation

### Document Tests (documents.spec.ts)
- TC-E2E-013: Upload PDF document
- TC-E2E-014: File type validation
- TC-E2E-015: File size validation
- TC-E2E-016: AI extraction
- TC-E2E-017: Edit extracted dates
- TC-E2E-018: Confirm & generate timeline

### Billing Tests (billing.spec.ts)
- TC-E2E-019: Pricing page display
- TC-E2E-020: Upgrade to Pro
- TC-E2E-021: Free tier limit
- TC-E2E-022: Billing portal access
- TC-E2E-023: Subscription display
- TC-E2E-024: Usage stats

### Timeline & Dashboard Tests (timeline-dashboard.spec.ts)
- TC-E2E-025: Timeline display
- TC-E2E-026: Event status indicators
- TC-E2E-027: Mark event complete
- TC-E2E-028: Timeline filtering
- TC-E2E-029: Add manual event
- TC-E2E-030: Dashboard summary
- TC-E2E-031: Upcoming deadlines
- TC-E2E-032: Quick actions
- TC-E2E-033: Settings access
- TC-E2E-034: Notification preferences
- TC-E2E-035: View current plan

## Writing New Tests

### Basic Test Structure

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    // Setup: login, navigate, etc.
  });

  test('Test description', async ({ page }) => {
    // Arrange: set up test data
    
    // Act: perform actions
    await page.goto('/');
    await page.click('button');
    
    // Assert: verify results
    await expect(page.locator('text=Success')).toBeVisible();
  });
});
```

### Best Practices

1. **Use data-testid attributes** for reliable selectors
2. **Avoid brittle selectors** like nth-child or complex CSS
3. **Wait for elements** using `waitFor` or `expect`
4. **Use meaningful test names** that describe the scenario
5. **Keep tests independent** - each test should run alone
6. **Clean up test data** in afterEach hooks if needed

### Selectors Priority

1. `data-testid` attributes (best)
2. Role-based: `page.getByRole('button', { name: 'Submit' })`
3. Text content: `page.getByText('Welcome')`
4. Label: `page.getByLabel('Email')`
5. Placeholder: `page.getByPlaceholder('Enter email')`
6. CSS selectors (last resort)

## Test Data

### Test Fixtures

Place test files in `tests/fixtures/`:
- `sample-contract.pdf` - Standard purchase agreement
- `sample-lease.pdf` - Lease agreement
- `large-file.pdf` - File > 10MB for size testing

### Test Users

Create test accounts in your test environment:

| User Type | Email | Purpose |
|-----------|-------|---------|
| Standard | test@example.com | General testing |
| Free Tier | free@example.com | Free tier limit testing |
| Pro Tier | pro@example.com | Pro feature testing |
| New User | new@example.com | Onboarding testing |

## CI/CD Integration

### GitHub Actions

```yaml
name: E2E Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run test:e2e
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

## Troubleshooting

### Tests failing with timeout
- Increase timeout: `test('...', async ({ page }) => {}, { timeout: 30000 })`
- Check if element selector is correct
- Ensure application is running

### Browser not launching
- Run `npx playwright install`
- Check system dependencies

### Authentication issues
- Verify test credentials in `.env.test`
- Check if test users exist in database

### Flaky tests
- Add explicit waits where needed
- Avoid relying on timing assumptions
- Use `waitForLoadState('networkidle')`

## Test Reports

### HTML Report
```bash
npx playwright show-report
```

### JSON Report
```bash
npx playwright test --reporter=json > test-results.json
```

### Screenshots & Videos

On failure, Playwright automatically captures:
- Screenshots in `test-results/`
- Videos in `test-results/`
- Traces for debugging

## Performance Testing

For performance metrics, add to test:
```typescript
test('Page load performance', async ({ page }) => {
  const startTime = Date.now();
  await page.goto('/');
  const loadTime = Date.now() - startTime;
  
  expect(loadTime).toBeLessThan(3000); // 3 seconds
});
```

## Visual Regression (Optional)

Install and configure for visual testing:
```bash
npm install --save-dev @playwright/test-playwright-visual-regression
```

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [API Reference](https://playwright.dev/docs/api/class-page)
