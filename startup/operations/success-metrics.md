# Customer Success Metrics & Reporting

**Purpose:** Define KPIs, create tracking dashboard, and establish reporting cadence for customer success

**Goal:** Measure and improve customer health, retention, and lifetime value

---

## Table of Contents

1. Customer Success KPIs
2. Tracking Dashboard Specification
3. Reporting Templates
4. Data Collection & Tools
5. Actionable Insights

---

## 1. Customer Success KPIs

### Tier 1: North Star Metrics (Most Important)

#### 1.1 Monthly Recurring Revenue (MRR)
**Definition:** Total revenue from active subscriptions per month

**Formula:** `MRR = Σ (Customer Monthly Subscription Amount)`

**Target:**
- Month 3: $2.5K
- Month 6: $10K
- Month 12: $50K

**Why Important:** Core business health metric

---

#### 1.2 Net Revenue Retention (NRR)
**Definition:** Revenue retained from existing customers, including expansion and contraction

**Formula:**
```
NRR = [(Starting MRR + Expansion - Contraction - Churn) / Starting MRR] × 100

Example:
Starting MRR: $10,000
Expansion: $1,500 (upgrades)
Contraction: $500 (downgrades)
Churn: $1,000 (cancellations)

NRR = [(10,000 + 1,500 - 500 - 1,000) / 10,000] × 100 = 100%
```

**Target:** > 100% (means existing customers growing)

**Why Important:** Shows health of existing customer base

---

#### 1.3 Customer Churn Rate
**Definition:** % of customers who cancel in a given period

**Formula:**
```
Monthly Churn Rate = (Customers Lost / Customers at Start of Month) × 100

Example:
Start of month: 100 customers
Lost: 8 customers

Churn Rate = (8 / 100) × 100 = 8%
```

**Target:**
- Month 1-3: < 15%
- Month 4-6: < 10%
- Month 7+: < 6%

**Why Important:** Lower churn = sustainable growth

---

#### 1.4 Net Promoter Score (NPS)
**Definition:** Customer loyalty score from survey (0-10 scale)

**Formula:**
```
NPS = % Promoters (9-10) - % Detractors (0-6)
```

**Target:**
- Month 1-3: > 30
- Month 4-6: > 50
- Month 7+: > 70

**Why Important:** Direct measure of customer satisfaction and loyalty

---

### Tier 2: Leading Indicators (Predict Future Health)

#### 2.1 Customer Health Score
**Definition:** Composite score (0-100) predicting retention likelihood

**Target:**
- Average: > 70
- % Healthy (80+): > 50%
- % Critical (<50): < 10%

**Why Important:** Early warning system for churn

---

#### 2.2 Activation Rate
**Definition:** % of new customers who complete onboarding

**Formula:**
```
Activation Rate = (Customers with 1+ transactions in first 7 days / Total Signups) × 100
```

**Target:** > 70%

**Why Important:** Activated customers churn less

---

#### 2.3 Feature Adoption Rate
**Definition:** % of customers using core features

**Formula:**
```
Feature Adoption = (Customers using feature / Total customers) × 100
```

**Target:**
- AI extraction: > 90%
- Timeline: > 85%
- Client emails: > 60%
- Document hub: > 50%

**Why Important:** More adoption = more value = retention

---

#### 2.4 Time to First Value (TTFV)
**Definition:** Time from signup to first transaction created

**Target:** < 5 minutes

**Why Important:** Fast TTFV = better activation

---

### Tier 3: Operational Metrics (Team Performance)

#### 3.1 First Contact Resolution (FCR)
**Definition:** % of support issues resolved in first response

**Formula:**
```
FCR = (Issues resolved in 1 response / Total issues) × 100
```

**Target:** > 80%

**Why Important:** Efficient support = happy customers

---

#### 3.2 Average Response Time
**Definition:** Time to first meaningful support response

**Target:**
- Starter Plan: < 24 hours
- Professional: < 12 hours
- Team Plan: < 4 hours

**Why Important:** Fast support = customer satisfaction

---

#### 3.3 Onboarding Call Completion Rate
**Definition:** % of new customers who complete onboarding call

**Target:** > 50% (of those offered)

**Why Important:** Guided onboarding = better outcomes

---

### Tier 4: Expansion & Advocacy Metrics

#### 4.1 Customer Lifetime Value (LTV)
**Definition:** Total revenue expected from a customer over relationship

**Formula:**
```
LTV = Average Revenue per Customer × Average Customer Lifespan

Example:
ARPU: $99/month
Average Lifespan: 18 months

LTV = 99 × 18 = $1,782
```

**Target:** > $600 (6+ months average retention)

**Why Important:** Guides CAC and growth decisions

---

#### 4.2 Customer Acquisition Cost (CAC)
**Definition:** Cost to acquire one paying customer

**Formula:**
```
CAC = (Sales + Marketing Costs) / # New Customers

Example:
Marketing spend: $500
Sales time: 10 hours × $50/hour = $500
New customers: 10

CAC = ($500 + $500) / 10 = $100
```

**Target:** < $100 (early stage), < LTV/3 (long-term)

**Why Important:** Sustainable growth metric

---

#### 4.3 LTV:CAC Ratio
**Definition:** Relationship between customer value and acquisition cost

**Formula:**
```
LTV:CAC = Customer Lifetime Value / Customer Acquisition Cost

Example:
LTV: $1,782
CAC: $100

LTV:CAC = 17.8:1
```

**Target:** > 3:1 (healthy), > 5:1 (excellent)

**Why Important:** Profitability indicator

---

#### 4.4 Referral Rate
**Definition:** % of new customers from referrals

**Formula:**
```
Referral Rate = (New Customers from Referrals / Total New Customers) × 100
```

**Target:** > 30%

**Why Important:** Organic growth = low CAC

---

## 2. Tracking Dashboard Specification

### Dashboard Overview

**Tool:** Retool, Metabase, or Google Data Studio

**Data Sources:**
- Stripe (billing, MRR)
- Supabase (user data, transactions)
- PostHog (product analytics)
- Intercom/Zendesk (support tickets)
- Delighted (NPS)

---

### Dashboard Layout

```
┌─────────────────────────────────────────────────────────┐
│ CUSTOMER SUCCESS DASHBOARD - [Date]                     │
├─────────────────────────────────────────────────────────┤
│                                                          │
│ NORTH STAR METRICS                                       │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐     │
│ │ MRR          │ │ NRR          │ │ Churn Rate   │     │
│ │ $10,247      │ │ 105%         │ │ 7.2%         │     │
│ │ ↑ $1,234     │ │ ↑ 3%         │ │ ↓ 0.8%       │     │
│ │ from last mo │ │ from last mo │ │ from last mo │     │
│ └──────────────┘ └──────────────┘ └──────────────┘     │
│                                                          │
│ ┌──────────────┐                                        │
│ │ NPS          │                                        │
│ │ 52           │                                        │
│ │ ↑ 5 pts      │                                        │
│ └──────────────┘                                        │
│                                                          │
├─────────────────────────────────────────────────────────┤
│ CUSTOMER HEALTH DISTRIBUTION                            │
│                                                          │
│ 🟢 Healthy (80+)    134 (54%) ████░░░░░░                │
│ 🟡 At Risk (50-79)   89 (36%) ███░░░░░░░                │
│ 🔴 Critical (<50)    24 (10%) █░░░░░░░░░                │
│                                                          │
│ Avg Health Score: 71.2 ↑ +2.3                          │
│                                                          │
├─────────────────────────────────────────────────────────┤
│ ACTIVATION & ADOPTION                                   │
│                                                          │
│ Activation Rate:      72% ↑ +5%                         │
│ Time to First Value:  4.2 min ↓ -0.8                    │
│                                                          │
│ Feature Adoption:                                        │
│ AI Extraction:  92% ████████░░                           │
│ Timeline:       88% ████████░░                           │
│ Client Emails:  63% ██████░░░░                           │
│ Documents:      51% █████░░░░░                           │
│                                                          │
├─────────────────────────────────────────────────────────┤
│ SUPPORT PERFORMANCE                                      │
│                                                          │
│ First Contact Resolution: 82% ✓                          │
│ Avg Response Time:        6.2 hours ✓                    │
│ Open Tickets:              12                             │
│ Critical Tickets:          2 ⚠️                          │
│                                                          │
├─────────────────────────────────────────────────────────┤
│ EXPANSION & GROWTH                                       │
│                                                          │
│ LTV: $1,247                                              │
│ CAC: $89                                                  │
│ LTV:CAC: 14:1 ✓                                           │
│                                                          │
│ Referral Rate: 34% ✓                                     │
│ Upgrades this month: 8 (+$792 MRR)                       │
│ Downgrades this month: 3 (-$150 MRR)                     │
│                                                          │
├─────────────────────────────────────────────────────────┤
│ ALERTS & ACTION ITEMS                                    │
│                                                          │
│ 🔴 3 customers dropped to critical (view list)          │
│ 🔴 2 payment failures pending                            │
│ 🟡 7 customers inactive 14+ days                         │
│ 🟡 15 customers haven't completed onboarding            │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

### Dashboard Filters

**By Plan:**
- All Plans
- Starter
- Professional
- Team

**By Time Period:**
- Last 7 days
- Last 30 days
- Last 90 days
- Year to date
- Custom range

**By Cohort:**
- Signup month
- Plan tier
- Customer segment

---

## 3. Reporting Templates

### Weekly Report (Every Monday)

**To:** Founder, CS Team, Product Manager

**Subject:** CS Weekly Report - [Date]

**Format:**

```markdown
# Customer Success Weekly Report - [Date]

## Executive Summary
- **MRR:** $X (↑/↓ from last week)
- **New customers:** X
- **Churned customers:** X
- **Net change:** +X customers

## Key Metrics
| Metric | This Week | Last Week | Change |
|--------|-----------|-----------|--------|
| MRR | $X | $X | ↑ X% |
| NRR | X% | X% | ↑ X% |
| Churn Rate | X% | X% | ↓ X% |
| NPS | X | X | ↑ X |
| Health Score (avg) | X | X | ↑ X |

## Health Distribution
- 🟢 Healthy: X (X%)
- 🟡 At Risk: X (X%)
- 🔴 Critical: X (X%)

## Critical Customers (Needs Attention)
1. [Name] - [Issue] - [Action needed]
2. [Name] - [Issue] - [Action needed]
3. [Name] - [Issue] - [Action needed]

## Wins This Week
- [Customer name] upgraded to [Plan] (+$X MRR)
- [Customer name] referred [X] new customers
- [Customer name] provided testimonial

## Churned Customers (This Week)
1. [Name] - [Reason] - [Days active]
2. [Name] - [Reason] - [Days active]

## Support Summary
- Tickets opened: X
- Tickets resolved: X
- Avg response time: X hours
- FCR rate: X%

## Action Items for This Week
- [ ] [Action 1] (Owner: Name)
- [ ] [Action 2] (Owner: Name)
- [ ] [Action 3] (Owner: Name)

## Notes & Observations
[Any trends, insights, or concerns]
```

---

### Monthly Report (1st of each month)

**To:** Founder, Leadership Team, Board (if applicable)

**Subject:** CS Monthly Report - [Month Year]

**Format:**

```markdown
# Customer Success Monthly Report - [Month Year]

## Executive Summary
[2-3 sentences on overall health]

## Key Metrics Dashboard

### Revenue Metrics
- **MRR:** $X (↑/↓ X% from last month)
- **ARR:** $X
- **NRR:** X% (↑/↓ X%)
- **Expansion MRR:** $X
- **Contraction MRR:** $X
- **Churned MRR:** $X

### Customer Metrics
- **Total Customers:** X
- **New Customers:** X
- **Churned Customers:** X
- **Net Customer Growth:** +X
- **Churn Rate:** X%

### Satisfaction Metrics
- **NPS:** X (↑/↓ X)
- **Promoters:** X%
- **Passives:** X%
- **Detractors:** X%
- **CSAT (if tracked):** X%

### Health Metrics
- **Avg Health Score:** X
- **% Healthy:** X%
- **% At Risk:** X%
- **% Critical:** X%

### Adoption Metrics
- **Activation Rate:** X%
- **Avg TTFV:** X minutes
- **Feature Adoption:** [List top features]

### Support Metrics
- **Total Tickets:** X
- **FCR Rate:** X%
- **Avg Response Time:** X hours
- **CSAT:** X%

## Cohort Analysis
[Table showing retention by signup month]

## Top Wins This Month
1. [Win 1]
2. [Win 2]
3. [Win 3]

## Top Challenges This Month
1. [Challenge 1]
2. [Challenge 2]
3. [Challenge 3]

## Churn Analysis
- **Total Churn:** X customers ($X MRR)
- **Top Reasons:**
  1. [Reason 1]: X%
  2. [Reason 2]: X%
  3. [Reason 3]: X%
- **Avg Tenure:** X months

## Customer Highlights
- **Case Study:** [Customer name] - [Brief story]
- **Testimonial:** "[Quote]" - [Customer name]

## Product Feedback Summary
- **Top 5 Feature Requests:** [List]
- **Top 5 Pain Points:** [List]

## Next Month Goals
1. [Goal 1]
2. [Goal 2]
3. [Goal 3]

## Action Items
- [ ] [Action 1] (Owner: Name, Due: Date)
- [ ] [Action 2] (Owner: Name, Due: Date)
```

---

## 4. Data Collection & Tools

### Required Tools

**Product Analytics:**
- **PostHog** (recommended) or **Mixpanel**
- Tracks: Logins, feature usage, events

**Billing & Revenue:**
- **Stripe** (already in use)
- Tracks: MRR, subscriptions, payments

**Database:**
- **Supabase** (already in use)
- Stores: User data, transactions, documents

**Support:**
- **Intercom** or **Zendesk**
- Tracks: Tickets, response times, CSAT

**NPS/Surveys:**
- **Delighted** or **Typeform**
- Tracks: NPS scores, feedback

**Dashboard:**
- **Retool**, **Metabase**, or **Google Data Studio**
- Visualizes: All metrics in one place

---

### Data Collection Checklist

**Daily:**
- ✅ Product usage events (logins, transactions, emails)
- ✅ Support ticket volume
- ✅ Health scores recalculated

**Weekly:**
- ✅ NRR calculation
- ✅ Churn analysis
- ✅ Feature adoption rates

**Monthly:**
- ✅ NPS survey sent
- ✅ Cohort analysis
- ✅ LTV:CAC calculation

---

## 5. Actionable Insights

### Using Metrics to Drive Decisions

#### If Churn Rate Increasing:
**Look at:**
1. **Health scores:** Are customers dropping before churn?
2. **Support tickets:** Are there recurring issues?
3. **Feature adoption:** Are customers using core features?
4. **NPS:** What are detractors saying?

**Actions:**
- Fix root causes identified
- Proactive outreach to at-risk customers
- Improve onboarding
- Add requested features

---

#### If NRR < 100%:
**Look at:**
1. **Contraction:** Why are customers downgrading?
2. **Churn:** Why are they leaving?
3. **Expansion:** Why aren't they upgrading?

**Actions:**
- Add value to justify upgrades
- Introduce expansion features
- Create upgrade incentives
- Fix pain points causing downgrades

---

#### If NPS Declining:
**Look at:**
1. **Detractor feedback:** What are they saying?
2. **Product issues:** Recent bugs or outages?
3. **Support quality:** Response times, resolution rates?

**Actions:**
- Address common complaints
- Improve support quality
- Communicate improvements to detractors
- Follow up personally with unhappy customers

---

#### If Health Scores Dropping:
**Look at:**
1. **Usage patterns:** What changed?
2. **Login frequency:** Are they less engaged?
3. **Feature usage:** Did they stop using key features?

**Actions:**
- Proactive outreach
- Re-onboarding or training
- Highlight underutilized features
- Offer incentives to re-engage

---

## Implementation Roadmap

### Week 1: Data Collection Setup
- Configure product analytics
- Set up data pipelines
- Test data accuracy

### Week 2: Dashboard Build
- Connect data sources
- Build dashboard views
- Set up alerts

### Week 3: Report Templates
- Create weekly report template
- Create monthly report template
- Automate where possible

### Week 4: Team Training
- Train CS team on metrics
- Document definitions
- Establish reporting cadence

### Week 5+: Optimization
- Refine metrics based on learnings
- Add new metrics as needed
- Correlate metrics with outcomes

---

## Success Metrics Summary

**Track These Daily:**
- MRR
- Customer count
- Health scores
- Support tickets

**Track These Weekly:**
- NRR
- Churn rate
- Activation rate
- Feature adoption

**Track These Monthly:**
- NPS
- LTV:CAC
- Cohort retention
- Churn reasons

---

## Document Control

- **Last Updated:** [Date]
- **Owner:** Customer Success Lead
- **Review Frequency:** Monthly
- **Next Review:** [Date]
