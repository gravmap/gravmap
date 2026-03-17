# Customer Health Scoring

**Purpose:** Proactively identify at-risk customers and opportunities for expansion through systematic health tracking

**Goal:** Reduce churn, increase expansion revenue, improve customer satisfaction

---

## Table of Contents

1. Health Score Methodology
2. Engagement Metrics to Track
3. Churn Risk Indicators
4. Health Score Calculation
5. Usage & Tracking
6. Actions by Health Tier

---

## 1. Health Score Methodology

### Philosophy

Customer health is a **leading indicator** of retention and expansion. By tracking health scores, we can:

- **Proactively intervene** before churn happens
- **Identify expansion opportunities** for healthy customers
- **Understand what drives** customer success
- **Measure impact** of product and CS improvements

### Definition

**Customer Health Score (0-100):** A composite metric that predicts customer likelihood to:
- Retain (renew subscription)
- Expand (upgrade plan, add users)
- Advocate (refer, provide testimonials)

**Score Ranges:**
- 🟢 **80-100:** Healthy (low churn risk, expansion ready)
- 🟡 **50-79:** At Risk (moderate churn risk, needs attention)
- 🔴 **0-49:** Critical (high churn risk, immediate intervention)

---

## 2. Engagement Metrics to Track

### Category 1: Product Usage (40% of score)

#### 2.1.1 Login Frequency
**Metric:** Logins per week
- **Healthy (5 points):** 5+ logins/week
- **Moderate (3 points):** 2-4 logins/week
- **Low (1 point):** < 2 logins/week
- **Inactive (0 points):** 0 logins in 7+ days

**Why:** Daily/weekly usage indicates product is core to workflow

---

#### 2.1.2 Transactions Created
**Metric:** Active transactions in last 30 days
- **Healthy (5 points):** 3+ transactions
- **Moderate (3 points):** 1-2 transactions
- **Low (1 point):** 0 transactions (but logged in)
- **Inactive (0 points):** 0 transactions (and inactive)

**Why:** Core value is transaction management - low usage = low value

---

#### 2.1.3 Contracts Uploaded
**Metric:** Contracts uploaded in last 30 days
- **Healthy (5 points):** 3+ uploads
- **Moderate (3 points):** 1-2 uploads
- **Low (1 point):** 0 uploads

**Why:** AI extraction is key differentiator - low usage = not seeing value

---

#### 2.1.4 Client Emails Sent
**Metric:** Client emails sent in last 30 days
- **Healthy (5 points):** 3+ emails
- **Moderate (3 points):** 1-2 emails
- **Low (1 point):** 0 emails

**Why:** Client communication is major time-saver - low usage = missed opportunity

---

#### 2.1.5 Documents Uploaded
**Metric:** Documents uploaded in last 30 days
- **Healthy (3 points):** 5+ documents
- **Moderate (2 points):** 1-4 documents
- **Low (1 point):** 0 documents

**Why:** Document hub adoption indicates depth of usage

---

### Category 2: Feature Adoption (25% of score)

#### 2.2.1 Core Features Used
**Metric:** % of core features used
- **Core features:**
  - AI extraction ✓/✗
  - Timeline viewed ✓/✗
  - Client emails ✓/✗
  - Document hub ✓/✗
  - Settings customized ✓/✗

**Scoring:**
- **5 points:** 5/5 features used
- **4 points:** 4/5 features used
- **3 points:** 3/5 features used
- **2 points:** 2/5 features used
- **1 point:** 1/5 features used
- **0 points:** 0/5 features used

**Why:** Broad feature adoption = deeper engagement

---

#### 2.2.2 Advanced Features Used (Team Plan)
**Metric:** Advanced features adopted
- **Advanced features:**
  - Google Calendar integration ✓/✗
  - SMS notifications enabled ✓/✗
  - Team members added ✓/✗
  - Custom email templates ✓/✗

**Scoring:**
- **5 points:** 3-4/4 features used
- **3 points:** 1-2/4 features used
- **0 points:** 0/4 features used

**Why:** Advanced features = power user, higher retention

---

### Category 3: Account Health (20% of score)

#### 2.3.1 Days Since Last Login
**Metric:** Recency of last login
- **5 points:** Logged in today/yesterday
- **4 points:** 2-3 days ago
- **3 points:** 4-7 days ago
- **1 point:** 8-14 days ago
- **0 points:** 15+ days ago

**Why:** Recency is strongest predictor of retention

---

#### 2.3.2 Support Tickets (Negative)
**Metric:** Support tickets in last 30 days (negative correlation)
- **5 points:** 0 tickets (no issues)
- **3 points:** 1 ticket (minor issue)
- **1 point:** 2-3 tickets (some issues)
- **0 points:** 4+ tickets (major problems)

**Why:** High support volume = friction, dissatisfaction

---

#### 2.3.3 NPS Score (If Surveyed)
**Metric:** Net Promoter Score from survey
- **5 points:** 9-10 (Promoter)
- **3 points:** 7-8 (Passive)
- **0 points:** 0-6 (Detractor)

**Why:** NPS is direct measure of satisfaction

---

#### 2.3.4 Payment Health
**Metric:** Payment status
- **5 points:** No payment failures
- **0 points:** Payment failed/overdue

**Why:** Payment issues = churn risk

---

### Category 4: Growth Signals (15% of score)

#### 2.4.1 User Expansion (Team Plan)
**Metric:** New team members added in last 90 days
- **5 points:** 2+ users added
- **3 points:** 1 user added
- **0 points:** 0 users added

**Why:** Team growth = increased reliance, lower churn

---

#### 2.4.2 Feature Requests (Engagement Signal)
**Metric:** Feature requests submitted
- **5 points:** 2+ requests (engaged, invested)
- **3 points:** 1 request
- **0 points:** 0 requests

**Why:** Customers who request features are engaged and want product to succeed

---

#### 2.4.3 Referrals
**Metric:** Referrals sent
- **5 points:** 1+ referrals (advocate)
- **0 points:** 0 referrals

**Why:** Referrals = highest satisfaction signal

---

## 3. Churn Risk Indicators

### High-Risk Signals (Immediate Intervention)

🚨 **Critical Risk Indicators:**
1. **No login in 14+ days**
2. **Zero transactions created in 60+ days**
3. **Payment failed + no update in 3+ days**
4. **Submitted cancellation request**
5. **Gave NPS score of 0-3 (Detractor)**
6. **Multiple complaints in support tickets**
7. **Downgrade request**

**Action:** Immediate outreach within 24 hours

---

### Medium-Risk Signals (Proactive Outreach)

⚠️ **Warning Indicators:**
1. **Login frequency dropped 50%+ in last month**
2. **Zero contracts uploaded in 30+ days**
3. **Feature adoption < 40%**
4. **1-2 support tickets unresolved**
5. **NPS score of 4-6 (Detractor)**
6. **Account age < 30 days with low usage**

**Action:** Outreach within 7 days

---

### Low-Risk Signals (Monitor)

ℹ️ **Watch Indicators:**
1. **Login frequency dropped 20-50%**
2. **Only using 1-2 core features**
3. **No client emails sent in 30+ days**
4. **NPS score of 7-8 (Passive)**
5. **No advanced feature adoption (Team Plan)**

**Action:** Include in weekly review, no immediate outreach

---

## 4. Health Score Calculation

### Formula

```
Customer Health Score = (Product Usage × 0.40) + (Feature Adoption × 0.25) + (Account Health × 0.20) + (Growth Signals × 0.15)

Max Score: 100
Min Score: 0
```

### Example Calculation

**Customer:** Sarah, Professional Plan, 3 months tenure

**Product Usage (40% weight):**
- Login frequency: 4 logins/week → **3 points**
- Transactions: 2 in last 30 days → **3 points**
- Contracts uploaded: 2 → **3 points**
- Client emails: 4 → **5 points**
- Documents: 6 → **3 points**
- **Subtotal:** 17/25 = 68% → **27.2 points** (weighted)

**Feature Adoption (25% weight):**
- Core features used: 4/5 → **4 points**
- Advanced features: N/A (Professional Plan)
- **Subtotal:** 4/5 = 80% → **20 points** (weighted)

**Account Health (20% weight):**
- Days since login: 1 day → **5 points**
- Support tickets: 1 ticket → **3 points**
- NPS: Not surveyed → **3 points** (average)
- Payment: No failures → **5 points**
- **Subtotal:** 16/20 = 80% → **16 points** (weighted)

**Growth Signals (15% weight):**
- User expansion: N/A (Professional Plan)
- Feature requests: 1 → **3 points**
- Referrals: 0 → **0 points**
- **Subtotal:** 3/10 = 30% → **4.5 points** (weighted)

**Total Health Score:**
27.2 + 20 + 16 + 4.5 = **67.7** (At Risk - Yellow)

---

### Automated Calculation

**Implementation:**
- Health scores recalculated daily
- Stored in database: `customer_health_scores` table
- Visible in CS dashboard
- Triggers alerts when score drops

---

## 5. Usage & Tracking

### Data Sources

**Product Analytics (PostHog, Mixpanel):**
- Login events
- Feature usage
- Transaction creation
- Email sends

**Database (Supabase):**
- Account info (plan, tenure, payment)
- Transaction count
- Document count

**Support System (Intercom, Zendesk):**
- Ticket count
- Ticket sentiment
- Resolution time

**NPS Tool (Delighted):**
- Survey scores
- Feedback text

---

### Health Score Dashboard

**CS Team View:**

```
┌─────────────────────────────────────────┐
│ Customer Health Dashboard                │
│                                          │
│ Overview:                                │
│ Total Customers: 247                     │
│ 🟢 Healthy (80+): 134 (54%)              │
│ 🟡 At Risk (50-79): 89 (36%)             │
│ 🔴 Critical (<50): 24 (10%)              │
│                                          │
│ Average Score: 71.2                      │
│ Trend: ↑ +2.3 from last month            │
│                                          │
│ 🔔 Alerts:                               │
│ - 3 customers dropped to critical        │
│ - 7 customers inactive 14+ days          │
│ - 5 payment failures                     │
│                                          │
│ [View Details] [Export Report]           │
└─────────────────────────────────────────┘
```

---

### Weekly Health Report

**Sent to:** Founder, CS Lead, Product Manager

**Content:**
1. **Health distribution:** % Healthy/At Risk/Critical
2. **Trend:** Score changes from last week
3. **Critical customers:** List with details
4. **At-risk trends:** What's driving risk?
5. **Success stories:** Customers who improved
6. **Action items:** Who to contact this week

---

## 6. Actions by Health Tier

### 🟢 Healthy (80-100)

**Characteristics:**
- High engagement
- Core features adopted
- Low support volume
- Growth signals present

**Actions:**

1. **Expansion Opportunities:**
   - Offer plan upgrade (if Starter → Professional)
   - Add team members (if Team Plan)
   - Introduce advanced features

2. **Advocacy:**
   - Request testimonial
   - Invite to case study
   - Ask for referral
   - Feature in newsletter

3. **Relationship Building:**
   - Quarterly check-in call
   - Beta access to new features
   - VIP treatment

**Goal:** Turn into advocates, expand revenue

---

### 🟡 At Risk (50-79)

**Characteristics:**
- Moderate engagement
- Inconsistent usage
- Some support tickets
- Passive NPS (7-8)

**Actions:**

1. **Proactive Outreach:**
   - Email within 7 days: "How can we help?"
   - Offer onboarding refresher call
   - Ask for feedback

2. **Troubleshoot:**
   - Review support history
   - Identify friction points
   - Provide solutions

3. **Increase Engagement:**
   - Highlight unused features
   - Send best practices tips
   - Offer training

**Goal:** Prevent churn, move to Healthy

---

### 🔴 Critical (0-49)

**Characteristics:**
- Low/no engagement
- Major issues
- Detractor NPS (0-6)
- Payment failures

**Actions:**

1. **Immediate Intervention:**
   - Phone call within 24 hours
   - Personal email from CS lead
   - Offer remediation (credit, extended trial, etc.)

2. **Root Cause Analysis:**
   - Listen to concerns
   - Identify what went wrong
   - Fix if possible

3. **Win-Back:**
   - Offer incentive to stay
   - Show roadmap improvements
   - Demonstrate commitment

4. **Graceful Exit (If Needed):**
   - If can't save, learn why
   - Churn interview
   - Part on good terms

**Goal:** Save if possible, learn if not

---

## Implementation Plan

### Phase 1: Data Collection (Week 1-2)
- Set up product analytics tracking
- Ensure all metrics captured
- Test data accuracy

### Phase 2: Score Calculation (Week 3)
- Build health score algorithm
- Backfill historical scores
- Validate with manual review

### Phase 3: Dashboard (Week 4)
- Build CS dashboard view
- Add health scores to customer profiles
- Set up alerts

### Phase 4: Workflows (Week 5-6)
- Create outreach sequences by tier
- Train CS team on health scores
- Document playbooks

### Phase 5: Optimization (Ongoing)
- Track correlation with churn
- Adjust weights based on data
- Improve accuracy over time

---

## Success Metrics

**Track monthly:**
- Average health score (target: > 70)
- % Healthy customers (target: > 50%)
- % Critical customers (target: < 10%)
- Health score → churn correlation (validate)
- Improvement from interventions (track outcomes)

---

## Document Control

- **Last Updated:** [Date]
- **Owner:** Customer Success Lead
- **Review Frequency:** Monthly (adjust weights quarterly)
- **Next Review:** [Date]
