# Performance Testing Plan

**Project:** GravMap  
**Version:** 1.0  
**Date:** March 17, 2026  
**Status:** Active

---

## 1. Introduction

### 1.1 Purpose
This document defines the performance testing strategy, Service Level Agreements (SLAs), and test execution plan for GravMap.

### 1.2 Scope
Performance testing covers:
- Page load performance
- API response times
- Database query performance
- File upload performance
- AI extraction performance
- Concurrent user load
- System scalability

---

## 2. Service Level Agreements (SLAs)

### 2.1 Page Load Times

| Page | Target (p50) | Acceptable (p95) | Critical Threshold |
|------|-------------|------------------|-------------------|
| Landing Page | < 2s | < 3s | > 5s |
| Login Page | < 1s | < 2s | > 4s |
| Dashboard | < 2s | < 3s | > 5s |
| Transaction Detail | < 2s | < 3s | > 5s |
| Settings Page | < 1s | < 2s | > 3s |
| Pricing Page | < 2s | < 3s | > 5s |

**Measurement:** Time to Interactive (TTI) - page is fully loaded and interactive

### 2.2 API Response Times

| Endpoint | Target (p50) | Acceptable (p95) | Critical Threshold |
|----------|-------------|------------------|-------------------|
| Authentication (login/signup) | < 500ms | < 1s | > 2s |
| Transaction CRUD | < 300ms | < 500ms | > 1s |
| Document Upload | < 2s | < 5s | > 10s |
| AI Extraction | < 15s | < 30s | > 60s |
| Timeline Generation | < 500ms | < 1s | > 2s |
| Billing/Checkout | < 1s | < 2s | > 3s |
| Notification Settings | < 300ms | < 500ms | > 1s |

**Note:** AI extraction SLA depends on OpenAI API response time

### 2.3 Core Web Vitals

| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| **LCP** (Largest Contentful Paint) | < 2.5s | 2.5s - 4s | > 4s |
| **FID** (First Input Delay) | < 100ms | 100ms - 300ms | > 300ms |
| **CLS** (Cumulative Layout Shift) | < 0.1 | 0.1 - 0.25 | > 0.25 |

### 2.4 Database Performance

| Operation | Target | Critical |
|-----------|--------|----------|
| Simple SELECT (indexed) | < 50ms | > 200ms |
| Complex JOIN query | < 200ms | > 500ms |
| INSERT/UPDATE | < 100ms | > 300ms |
| Full table scan (avoid) | N/A | > 1s |
| Concurrent connections | 100 | 500 |

### 2.5 Resource Utilization

| Resource | Normal | Warning | Critical |
|----------|--------|---------|----------|
| CPU Usage | < 50% | 50-75% | > 75% |
| Memory Usage | < 70% | 70-85% | > 85% |
| Database Connections | < 50% pool | 50-75% | > 75% |
| Disk I/O | < 50% | 50-75% | > 75% |

---

## 3. Performance Test Types

### 3.1 Load Testing
**Purpose:** Verify system performs under expected load

**Test Scenarios:**
- **Normal Load:** 50 concurrent users
- **Peak Load:** 200 concurrent users
- **Duration:** 15 minutes each

**Success Criteria:**
- All SLAs met under normal load
- No errors under peak load
- Response times within acceptable range

### 3.2 Stress Testing
**Purpose:** Find system breaking points

**Test Scenarios:**
- Ramp up to 500 concurrent users
- Ramp up to 1000 concurrent users
- Spike test: 0 to 500 users in 10 seconds

**Success Criteria:**
- Identify breaking point
- System recovers gracefully
- No data corruption

### 3.3 Endurance Testing
**Purpose:** Verify system stability over time

**Test Scenarios:**
- 100 concurrent users for 4 hours
- Continuous operation for 24 hours

**Success Criteria:**
- No memory leaks
- No performance degradation
- No resource exhaustion

### 3.4 Spike Testing
**Purpose:** Test sudden load increases

**Test Scenarios:**
- 10 → 200 users in 5 seconds
- 200 → 10 users in 5 seconds
- Multiple spikes over 30 minutes

**Success Criteria:**
- System handles spikes
- No timeout errors
- Performance returns to normal

---

## 4. Test Scenarios

### 4.1 Page Load Performance Tests

#### TC-PERF-001: Landing Page Load Time
**Steps:**
1. Clear browser cache
2. Navigate to landing page
3. Measure TTI
4. Repeat 10 times

**Expected:** p50 < 2s, p95 < 3s

#### TC-PERF-002: Dashboard Load Time
**Preconditions:** User logged in, 10 transactions

**Steps:**
1. Navigate to dashboard
2. Measure TTI
3. Repeat with 50 transactions
4. Repeat with 100 transactions

**Expected:** p50 < 2s regardless of transaction count

#### TC-PERF-003: Transaction Detail Load Time
**Preconditions:** Transaction with 20 timeline events

**Steps:**
1. Navigate to transaction detail
2. Measure load time
3. Repeat with 50 events
4. Repeat with 100 events

**Expected:** p50 < 2s, scales linearly

### 4.2 API Performance Tests

#### TC-PERF-004: Transaction List API
**Steps:**
1. Make 100 sequential requests to `/api/transactions`
2. Record response times
3. Calculate p50, p95, p99

**Expected:** p50 < 300ms, p95 < 500ms

#### TC-PERF-005: Document Upload Performance
**Steps:**
1. Upload 1MB PDF
2. Upload 5MB PDF
3. Upload 10MB PDF
4. Measure upload time for each

**Expected:**
- 1MB: < 2s
- 5MB: < 5s
- 10MB: < 10s

#### TC-PERF-006: AI Extraction Performance
**Steps:**
1. Upload standard purchase agreement
2. Trigger extraction
3. Measure time to completion
4. Repeat with various document sizes

**Expected:** < 30s for standard documents

### 4.3 Load Testing Scenarios

#### TC-PERF-007: Normal Load Test
**Tool:** k6 or Artillery

**Script:**
```javascript
// 50 concurrent users
// Mix of actions: login, view dashboard, view transaction
// Duration: 15 minutes

import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '2m', target: 50 },  // Ramp up
    { duration: '11m', target: 50 }, // Stay at 50
    { duration: '2m', target: 0 },   // Ramp down
  ],
};

export default function () {
  // Login
  let loginRes = http.post('https://gravmap.com/api/auth/login', {
    email: 'test@example.com',
    password: 'testpass123',
  });
  
  check(loginRes, {
    'login successful': (r) => r.status === 200,
    'login time < 500ms': (r) => r.timings.duration < 500,
  });
  
  sleep(1);
  
  // View dashboard
  let dashboardRes = http.get('https://gravmap.com/dashboard');
  
  check(dashboardRes, {
    'dashboard loaded': (r) => r.status === 200,
    'dashboard time < 2s': (r) => r.timings.duration < 2000,
  });
  
  sleep(2);
}
```

**Expected:** 0% error rate, all response times within SLA

#### TC-PERF-008: Peak Load Test
**Configuration:** 200 concurrent users  
**Expected:** < 5% error rate, p95 within acceptable range

#### TC-PERF-009: Stress Test
**Configuration:** Ramp to 1000 users  
**Expected:** Identify breaking point, graceful degradation

### 4.4 Database Performance Tests

#### TC-PERF-010: Query Performance Analysis
**Steps:**
1. Enable query logging
2. Execute common queries
3. Analyze with EXPLAIN ANALYZE
4. Identify slow queries

**Queries to Test:**
- Transaction list with filtering
- Timeline events by transaction
- User notification settings
- Overdue events calculation

**Expected:** All queries < 200ms, using indexes

#### TC-PERF-011: N+1 Query Detection
**Steps:**
1. Enable query logging
2. Load transaction list page
3. Count database queries
4. Verify no N+1 patterns

**Expected:** Fixed number of queries regardless of list size

---

## 5. Performance Testing Tools

### 5.1 Recommended Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| **Lighthouse** | Frontend performance | Built into Chrome DevTools |
| **WebPageTest** | Page load analysis | Free online tool |
| **k6** | Load testing | Open source, scriptable |
| **Artillery** | Load testing | Node.js based |
| **Locust** | Load testing | Python based |
| **pgBadger** | Database analysis | PostgreSQL log analyzer |
| **Chrome DevTools** | Profiling | Network, performance tabs |

### 5.2 Monitoring Tools

| Tool | Purpose |
|------|---------|
| **Vercel Analytics** | Real user monitoring |
| **Sentry Performance** | Error + performance tracking |
| **Supabase Dashboard** | Database metrics |
| **Stripe Dashboard** | Payment performance |

---

## 6. Load Testing Infrastructure

### 6.1 Test Environment
- **Environment:** Staging (production-like)
- **Data:** Production clone (anonymized)
- **Network:** Similar to production

### 6.2 Load Generators
- **Location:** Multiple regions (if applicable)
- **Machines:** Cloud instances (AWS/GCP)
- **Network:** Throttled to real-world conditions (optional)

---

## 7. Performance Test Execution

### 7.1 Pre-Test Checklist
- [ ] Test environment ready
- [ ] Test data loaded
- [ ] Monitoring enabled
- [ ] Baseline metrics captured
- [ ] Test scripts validated

### 7.2 Test Execution Steps
1. **Baseline:** Measure current performance
2. **Load Test:** Execute normal load scenario
3. **Peak Test:** Execute peak load scenario
4. **Stress Test:** Push to breaking point
5. **Endurance Test:** Long-duration test
6. **Analysis:** Review results and identify bottlenecks

### 7.3 Post-Test Activities
- Document results
- Compare against SLAs
- Identify performance bottlenecks
- Create optimization recommendations
- Update baseline metrics

---

## 8. Performance Optimization Strategies

### 8.1 Frontend Optimizations
- [ ] Code splitting
- [ ] Image optimization
- [ ] Lazy loading
- [ ] Caching strategies
- [ ] CDN usage
- [ ] Bundle size reduction
- [ ] Font optimization

### 8.2 Backend Optimizations
- [ ] Database indexing
- [ ] Query optimization
- [ ] Connection pooling
- [ ] Caching (Redis)
- [ ] API response compression
- [ ] Pagination
- [ ] Rate limiting

### 8.3 Infrastructure Optimizations
- [ ] Serverless functions optimization
- [ ] Database connection pooling
- [ ] Edge caching
- [ ] Auto-scaling configuration

---

## 9. Reporting

### 9.1 Performance Test Report Template

```markdown
# Performance Test Report

**Date:** [Date]
**Environment:** [Staging/Production]
**Tester:** [Name]

## Executive Summary
- Overall result: [Pass/Fail/Conditional Pass]
- Critical issues: [Count]
- Performance improvements: [Summary]

## Test Results

### Page Load Times
| Page | p50 | p95 | Status |
|------|-----|-----|--------|
| Landing | 1.8s | 2.5s | ✅ Pass |

### API Response Times
| Endpoint | p50 | p95 | Status |
|----------|-----|-----|--------|
| /api/transactions | 250ms | 450ms | ✅ Pass |

### Load Test Results
- Concurrent Users: [Number]
- Error Rate: [Percentage]
- Avg Response Time: [Time]

## Bottlenecks Identified
1. [Description]
2. [Description]

## Recommendations
1. [Recommendation]
2. [Recommendation]
```

---

## 10. Continuous Performance Monitoring

### 10.1 Real User Monitoring (RUM)
- Vercel Analytics enabled
- Core Web Vitals tracked
- Performance budgets enforced

### 10.2 Synthetic Monitoring
- Regular automated tests
- Performance regression detection
- Alerting on SLA breaches

---

## 11. Acceptance Criteria

Performance testing is **PASS** when:
- [ ] All page load SLAs met (p95)
- [ ] All API response SLAs met (p95)
- [ ] Load test passes with < 1% error rate
- [ ] No critical performance bugs
- [ ] Core Web Vitals in "Good" range
- [ ] Database queries optimized with indexes

---

**Document Version:** 1.0  
**Next Review:** After major feature additions
