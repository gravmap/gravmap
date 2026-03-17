# GravMap Master Test Plan

**Version:** 1.0  
**Date:** March 17, 2026  
**Author:** QA Team  
**Status:** Active

---

## 1. Introduction

### 1.1 Purpose
This document outlines the comprehensive testing strategy for GravMap, an AI-powered real estate transaction management platform. It defines the test approach, categories, environment requirements, and execution strategy.

### 1.2 Scope
Testing covers:
- Authentication and authorization flows
- Transaction CRUD operations
- Document upload and AI extraction
- Timeline management
- Email notifications
- Billing and subscription management
- User settings and preferences
- Performance and security
- Cross-browser and mobile compatibility

### 1.3 Test Objectives
- Ensure all features function as specified
- Verify data integrity and security
- Validate user experience across devices
- Confirm performance meets SLAs
- Identify and document defects
- Ensure production readiness

---

## 2. Test Categories

### 2.1 Unit Testing
**Scope:** Individual functions, components, and utilities  
**Tools:** Jest, React Testing Library  
**Coverage Target:** 70% minimum  
**Responsibility:** Developers

**Focus Areas:**
- Utility functions (date formatting, validation)
- React components (rendering, state, props)
- API route handlers (isolated logic)
- Data transformation functions

### 2.2 Integration Testing
**Scope:** Interactions between components and services  
**Tools:** Jest, React Testing Library, MSW (Mock Service Worker)  
**Coverage Target:** 60% minimum  
**Responsibility:** QA + Developers

**Focus Areas:**
- API route + database interactions
- Component + API integration
- Authentication flow integration
- Payment flow integration
- Email notification triggers

### 2.3 End-to-End (E2E) Testing
**Scope:** Complete user workflows  
**Tools:** Playwright  
**Coverage Target:** Critical paths (20+ scenarios)  
**Responsibility:** QA Team

**Focus Areas:**
- User signup to first transaction
- Document upload to timeline generation
- Subscription purchase flow
- Password reset flow
- Notification preference changes

### 2.4 Manual Testing
**Scope:** Exploratory, usability, edge cases  
**Tools:** Browser DevTools, Manual execution  
**Coverage Target:** 100% of features  
**Responsibility:** QA Team

**Focus Areas:**
- UI/UX validation
- Accessibility testing
- Cross-browser testing
- Mobile device testing
- Error scenario testing
- Edge case discovery

---

## 3. Test Environment Requirements

### 3.1 Development Environment
**Purpose:** Developer testing and debugging

**Requirements:**
- Node.js 18+
- npm or yarn
- Local Supabase instance or dev project
- OpenAI API key (test key)
- Stripe test mode keys
- Resend test API key (optional)

**Configuration:**
```bash
NEXT_PUBLIC_SUPABASE_URL=<dev-project-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<dev-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<dev-service-key>
OPENAI_API_KEY=<test-key>
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<test-pk>
STRIPE_SECRET_KEY=<test-sk>
```

### 3.2 Staging Environment
**Purpose:** Pre-production testing, UAT

**Requirements:**
- Vercel preview deployment
- Separate Supabase project
- Stripe test mode
- Resend test mode
- Test data fixtures

**Configuration:**
- Isolated from production
- Full feature parity with production
- Reset capability for clean testing

### 3.3 Production Environment
**Purpose:** Production monitoring, smoke testing

**Requirements:**
- Live Vercel deployment
- Production Supabase project
- Stripe live mode
- Resend live mode

**Testing Scope:**
- Smoke tests only
- No destructive operations
- Monitoring and alerts

---

## 4. Test Data Strategy

### 4.1 Test Users
Create standardized test accounts:

**Free Tier User:**
- Email: `test-free@gravmap.com`
- Password: `TestPass123!`
- Subscription: Free
- Transactions: 2 sample transactions

**Pro Tier User:**
- Email: `test-pro@gravmap.com`
- Password: `TestPass123!`
- Subscription: Pro (active)
- Transactions: 10 sample transactions

**Edge Case Users:**
- User with 100+ transactions (performance testing)
- User with expired subscription
- User with no transactions (empty state)

### 4.2 Test Documents
Maintain sample documents for testing:

**Valid Documents:**
- `sample-purchase-agreement.pdf` - Standard purchase agreement
- `sample-lease-agreement.pdf` - Lease contract with dates
- `sample-high-quality.pdf` - Digital, clear document
- `sample-low-quality.jpg` - Scanned, lower quality

**Invalid Documents:**
- `invalid-too-large.pdf` - > 10MB file
- `invalid-format.txt` - Unsupported format
- `corrupted.pdf` - Corrupted PDF file

### 4.3 Test Credit Cards (Stripe)
- **Success:** `4242 4242 4242 4242`
- **Decline:** `4000 0000 0000 0002`
- **Requires Auth:** `4000 0025 0000 3155`
- **Insufficient Funds:** `4000 0000 0000 9995`

---

## 5. Test Execution Strategy

### 5.1 Test Phases

**Phase 1: Smoke Testing** (30 min)
- Critical path verification
- Major features functional
- No blocking bugs

**Phase 2: Functional Testing** (4-6 hours)
- All feature testing per test cases
- Bug identification and logging
- Regression after fixes

**Phase 3: Integration Testing** (2-3 hours)
- API integrations
- Third-party services (Stripe, OpenAI, Resend)
- Database operations

**Phase 4: Non-Functional Testing** (3-4 hours)
- Performance testing
- Security testing
- Accessibility testing

**Phase 5: Cross-Platform Testing** (2-3 hours)
- Multiple browsers
- Mobile devices
- Responsive design

**Phase 6: Regression Testing** (2 hours)
- Re-test fixed bugs
- Verify no new issues
- Final validation

### 5.2 Test Schedule

**Daily:** Automated E2E test suite runs  
**Weekly:** Full manual regression test  
**Per Release:** Complete test cycle  
**Continuous:** Production monitoring

### 5.3 Entry Criteria
- Code deployed to test environment
- All environment variables configured
- Test data loaded
- Test accounts created

### 5.4 Exit Criteria
- All critical and high bugs resolved
- Test coverage targets met
- Performance SLAs achieved
- Security checklist completed
- Sign-off from QA lead

---

## 6. Defect Management

### 6.1 Bug Severity Levels

**Critical (P0):**
- System crash or data loss
- Security vulnerability
- Payment processing failure
- Complete feature broken
- **Target Resolution:** < 4 hours

**High (P1):**
- Major feature impaired
- Workaround exists but difficult
- Significant user impact
- **Target Resolution:** < 24 hours

**Medium (P2):**
- Feature partially impaired
- Reasonable workaround exists
- Moderate user impact
- **Target Resolution:** < 1 week

**Low (P3):**
- Minor issue
- Cosmetic or UX improvement
- Minimal user impact
- **Target Resolution:** Next sprint

### 6.2 Bug Reporting Template
See `/startup/issues/bug-template.md`

### 6.3 Bug Lifecycle
1. **New** - Bug identified and logged
2. **Triaged** - Priority and severity assigned
3. **In Progress** - Developer working on fix
4. **Fixed** - Code fix deployed to test environment
5. **In Review** - QA verifying fix
6. **Closed** - Bug verified as fixed
7. **Reopened** - Bug still present after fix

---

## 7. Test Metrics and Reporting

### 7.1 Key Metrics
- **Test Coverage:** % of code/features tested
- **Pass Rate:** % of tests passing
- **Bug Density:** Bugs per feature/module
- **Defect Leakage:** Bugs found in production
- **Test Execution Time:** Duration of test cycles
- **Mean Time to Resolution:** Average bug fix time

### 7.2 Reports
- **Daily:** Automated test results
- **Weekly:** Test progress report
- **Per Release:** Test summary report
- **Monthly:** Quality metrics dashboard

### 7.3 Test Execution Report Template
```markdown
# Test Execution Report - [Date]

## Summary
- Environment: [Dev/Staging/Prod]
- Duration: [X hours]
- Tester: [Name]

## Test Results
- Total Tests: [N]
- Passed: [N]
- Failed: [N]
- Blocked: [N]
- Skipped: [N]

## Coverage
- Features Tested: [List]
- Features Not Tested: [List]

## Defects Found
- Critical: [N]
- High: [N]
- Medium: [N]
- Low: [N]

## Recommendations
- [Ready/Not Ready] for release
- [Blockers if any]
```

---

## 8. Tools and Infrastructure

### 8.1 Testing Tools
- **Playwright:** E2E testing, browser automation
- **Jest:** Unit and integration tests
- **React Testing Library:** Component testing
- **MSW:** API mocking
- **Lighthouse:** Performance auditing
- **OWASP ZAP:** Security scanning (optional)

### 8.2 CI/CD Integration
```yaml
# GitHub Actions workflow
name: Test Suite
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run E2E tests
        run: npm run test:e2e
      - name: Run unit tests
        run: npm run test:unit
```

### 8.3 Test Database Management
- Separate test database
- Automated seeding scripts
- Reset capability between test runs
- Migration testing

---

## 9. Risks and Mitigation

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Test environment instability | High | Medium | Multiple environments, quick restore |
| Third-party API downtime | High | Low | Mock services, fallback testing |
| Test data corruption | Medium | Medium | Automated backups, seed scripts |
| Time constraints | Medium | High | Prioritize critical paths |
| Browser compatibility issues | Medium | Medium | Cross-browser testing early |

---

## 10. Approval and Sign-Off

### 10.1 Test Plan Approval
- [ ] QA Lead
- [ ] Development Lead
- [ ] Product Owner

### 10.2 Release Sign-Off
- [ ] All critical/high bugs resolved
- [ ] Test coverage targets met
- [ ] Performance SLAs achieved
- [ ] Security checklist completed
- [ ] Smoke tests passed in staging

---

## 11. Appendix

### 11.1 Test Case Documents
- `/startup/product/test-cases/authentication.md`
- `/startup/product/test-cases/transactions.md`
- `/startup/product/test-cases/documents.md`
- `/startup/product/test-cases/ai-extraction.md`
- `/startup/product/test-cases/timeline.md`
- `/startup/product/test-cases/notifications.md`
- `/startup/product/test-cases/billing.md`
- `/startup/product/test-cases/settings.md`

### 11.2 Related Documents
- `/startup/product/performance-testing.md`
- `/startup/product/security-testing.md`
- `/startup/issues/bug-template.md`
- `/startup/issues/issue-log.md`

---

**Document History:**
- v1.0 (March 17, 2026) - Initial test plan creation
