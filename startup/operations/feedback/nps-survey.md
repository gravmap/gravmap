# Net Promoter Score (NPS) Survey

**Purpose:** Measure customer loyalty and satisfaction through standardized NPS methodology

**Goal:** Track customer sentiment over time, identify promoters/detractors, improve product

---

## What Is NPS?

**Net Promoter Score** measures customer loyalty with one question:

> "How likely are you to recommend [Product Name] to a friend or colleague?"

**Scale:** 0-10

**Categories:**
- **Promoters (9-10):** Loyal enthusiasts, will recommend
- **Passives (7-8):** Satisfied but not enthusiastic, vulnerable to competitors
- **Detractors (0-6):** Unhappy customers, may damage brand through negative word-of-mouth

**NPS Calculation:**
```
NPS = % Promoters - % Detractors
```

**Score Range:** -100 to +100

**Benchmarks:**
- **Negative (< 0):** Needs improvement
- **0-30:** Good
- **30-70:** Great
- **70+:** Excellent (world-class)

---

## Survey Design

### Primary Question

**Question:** "How likely are you to recommend [Product Name] to a friend or colleague?"

**Format:** 0-10 scale (radio buttons or slider)

```
0  1  2  3  4  5  6  7  8  9  10
Not likely                 Very likely
```

---

### Follow-Up Questions

**If Promoter (9-10):**

```
Thanks! What do you love most about [Product Name]?

[________________________]
[________________________]

[Skip] [Submit]
```

**If Passive (7-8):**

```
Thanks for your feedback! What would make [Product Name] a 10 for you?

[________________________]
[________________________]

[Skip] [Submit]
```

**If Detractor (0-6):**

```
We're sorry to hear that. What could we do better?

[________________________]
[________________________]

[Skip] [Submit]
```

---

## Survey Timing

### When to Send

**Option 1: Relationship NPS (Quarterly)**
- Send to all active customers every 90 days
- Measures overall relationship health
- Good for long-term tracking

**Option 2: Transactional NPS (After Key Events)**
- After first transaction created (7 days later)
- After first month of use
- After support ticket resolved
- Measures specific touchpoints

**Recommendation:** Start with quarterly relationship NPS, add transactional later

---

### Survey Schedule

**Quarterly Schedule:**
- **Q1:** March 1-7
- **Q2:** June 1-7
- **Q3:** September 1-7
- **Q4:** December 1-7

**Send on:** Tuesday or Wednesday morning (10 AM local time)

**Don't send:**
- During holidays
- During major product outages
- Immediately after price increase

---

## Survey Distribution

### Email Survey

**Tool Options:**
- Typeform, SurveyMonkey, Delighted, Ask Nicely
- In-app survey tools (Intercom, Pendo)

**Email Template:**

```
Subject: Quick question about [Product Name] (30 seconds)

Hi [Name],

You've been using [Product Name] for [X] months now - we'd love to know how it's going.

**How likely are you to recommend [Product Name] to a friend or colleague?**

[0] [1] [2] [3] [4] [5] [6] [7] [8] [9] [10]
Not at all likely                                          Extremely likely

[Click a number to vote]

This takes 30 seconds and helps us improve.

Thank you!
[Signature]

P.S. If you have any specific feedback, just reply to this email - I read every one.
```

---

### In-App Survey

**Trigger:**
- After user has been active for 30+ days
- Show once per quarter
- Display in modal or slide-in

**Design:**
- Non-intrusive
- Easy to dismiss
- Don't block workflow

```
┌─────────────────────────────────┐
│ Quick Question 💭                │
│                                  │
│ How likely are you to recommend  │
│ [Product Name]?                  │
│                                  │
│ 0  1  2  3  4  5  6  7  8  9  10│
│ ○  ○  ○  ○  ○  ○  ○  ○  ○  ○  ○ │
│                                  │
│ [Remind Me Later] [Submit]       │
└─────────────────────────────────┘
```

---

## Response Collection

### Tracking Responses

**Data Structure:**

```
- Customer ID
- Customer Name
- Email
- Plan Tier
- Account Age (days)
- NPS Score (0-10)
- Category (Promoter/Passive/Detractor)
- Feedback Text
- Survey Date
- Response Channel (Email/In-App)
```

---

### Response Rate Tracking

**Target Response Rate:** > 30%

**If response rate is low:**
- Improve email subject line
- Shorten survey
- Offer incentive (e.g., "Complete for 10% off next month")
- Try different timing

---

## Analysis & Reporting

### Calculate NPS

**Formula:**
```
NPS = % Promoters - % Detractors

Example:
- 100 responses
- 60 Promoters (60%)
- 30 Passives (30%)
- 10 Detractors (10%)

NPS = 60 - 10 = 50
```

---

### Segmented Analysis

**Break down by:**

1. **Plan Tier:**
   - NPS by Starter, Professional, Team
   - Identify which plans are happiest

2. **Account Age:**
   - < 30 days
   - 30-90 days
   - 90+ days
   - Spot onboarding issues

3. **Activity Level:**
   - Power users (daily login)
   - Regular users (weekly login)
   - Low engagement (< monthly login)

4. **Feature Usage:**
   - Uses AI extraction?
   - Uses client emails?
   - Uses timeline?

5. **Support Interaction:**
   - Has contacted support
   - Has NOT contacted support
   - Support quality impact

---

### Trend Analysis

**Track over time:**
- NPS by quarter
- % Promoters trend
- % Detractors trend
- Response volume

**Visualize:**
```
NPS Score Trend
70 |                 ●
   |              ●
50 |           ●                 ← Target
   |        ●
30 |     ●
   |  ●
10 | ●
   |________________________________
    Q1   Q2   Q3   Q4   Q1   Q2
```

---

### Qualitative Analysis

**Review open-ended responses:**

1. **Promoters:** What do they love? (Quotes for marketing)
2. **Passives:** What's missing? (Feature requests)
3. **Detractors:** What's wrong? (Pain points, bugs, churn risk)

**Extract themes:**
- Tag responses with keywords
- Identify top 3 praise themes
- Identify top 3 complaint themes

---

## Acting on NPS Data

### For Promoters (9-10)

**Action:**
1. **Thank them:**
   - Send personal email
   - Offer small gift (e.g., 1 month free)

2. **Ask for referral:**
   - "Would you be willing to refer a colleague?"
   - Provide referral link

3. **Request testimonial:**
   - "Can we feature your feedback?"
   - Get permission for marketing use

4. **Case study:**
   - Invite to be featured in case study
   - Offer incentive ($50 gift card)

5. **Beta access:**
   - Invite to test new features early
   - Make them feel special

---

### For Passives (7-8)

**Action:**
1. **Learn from them:**
   - What would make it a 10?
   - They're close to being promoters!

2. **Address their feedback:**
   - If they mention specific issues, fix them
   - Follow up when fixed

3. **Increase engagement:**
   - They might not be using all features
   - Offer training or onboarding call

4. **Monitor closely:**
   - They're vulnerable to competitors
   - Don't let them become detractors

---

### For Detractors (0-6)

**Action:**
1. **Immediate outreach:**
   - Personal email or phone call
   - "I saw your feedback and want to help"

2. **Diagnose the problem:**
   - What's not working?
   - Is it product, support, or something else?

3. **Fix if possible:**
   - Resolve their issue quickly
   - Show you care

4. **Offer remedy:**
   - Free month
   - Plan upgrade
   - Dedicated support

5. **Churn prevention:**
   - They're at high risk of leaving
   - Intensive support may save them

6. **Learn and improve:**
   - Their feedback is gold
   - Fix systemic issues they identify

---

## Closing the Loop

### Follow-Up Email Templates

**For Promoters:**

```
Subject: Thank you for your kind words! 💙

Hi [Name],

Wow - thank you for the [9/10] rating! It means the world to us.

I loved reading your feedback: "[Quote]"

Would you be open to:
1. Sharing your experience with others? (We'd feature you on our website)
2. Referring a colleague who might benefit from [Product Name]?

If yes, just reply to this email.

Thank you for being an amazing customer!

[Signature]
```

---

**For Passives:**

```
Subject: Thanks for the feedback - we want to do better

Hi [Name],

Thank you for rating us [7/8] - we appreciate the honest feedback.

You mentioned: "[Quote]"

I'd love to understand how we can turn that into a 10. Got 10 minutes for a quick call?

[Book a time]

Or just reply to this email - I'm here to help.

[Signature]
```

---

**For Detractors:**

```
Subject: I'm sorry we let you down - let me make it right

Hi [Name],

I saw your feedback and I want to personally apologize that we didn't meet your expectations.

You mentioned: "[Quote]"

I take this seriously. Can we schedule a call to discuss what went wrong and how I can fix it?

[Book a time]

In the meantime, I've [applied a credit / escalated your issue / etc.].

I'm committed to turning this around.

[Signature]
[Phone number - personal touch]
```

---

## NPS Goals & Targets

### Startup Phase (0-6 months)

**Target NPS:** > 30

**Why:** Early customers should be happy. If not, product-market fit is questionable.

**Focus:** Fix major issues, validate value proposition

---

### Growth Phase (6-18 months)

**Target NPS:** > 50

**Why:** Good product-market fit, happy customers

**Focus:** Improve user experience, add requested features

---

### Scale Phase (18+ months)

**Target NPS:** > 70

**Why:** World-class product, loyal customers

**Focus:** Delight customers, build advocacy

---

## Common Mistakes to Avoid

❌ **Surveying too frequently:** Don't send NPS more than quarterly (annoying)

❌ **Not following up:** Ignoring feedback breaks trust

❌ **Only focusing on score:** The qualitative feedback is more valuable

❌ **Not segmenting:** Aggregate NPS hides problems in specific segments

❌ **Comparing to wrong benchmarks:** Compare to similar companies, not Apple or Amazon

❌ **Not acting on data:** If you don't improve based on feedback, why ask?

---

## NPS Dashboard

**Display in team workspace:**

```
┌─────────────────────────────────┐
│ NPS Dashboard (Q1 2026)          │
│                                  │
│ Current Score: 52                │
│ Target: 50                       │
│ Status: ✅ On Track              │
│                                  │
│ Breakdown:                       │
│ Promoters: 62% ████████░░        │
│ Passives:   28% ███░░░░░░░       │
│ Detractors: 10% █░░░░░░░░░       │
│                                  │
│ Trend: ↑ +5 from last quarter    │
│                                  │
│ Response Rate: 38% (Target: 30%)│
│                                  │
│ [View Detailed Report]           │
└─────────────────────────────────┘
```

---

## Tools & Resources

### NPS Survey Tools

**Recommended:**
- **Delighted** ($49/mo) - Simple, integrates with Slack
- **Ask Nicely** ($99/mo) - Workflow automation
- **Typeform** ($29/mo) - DIY, flexible

**Budget Option:**
- Google Forms (Free)
- Manual tracking in spreadsheet

---

### Further Reading

- "The Ultimate Question 2.0" by Fred Reichheld (NPS creator)
- "Net Promoter Score: What It Is and Why You Should Use It" (HubSpot)
- NPS Benchmarks by Industry: [npsbenchmarks.com](https://npsbenchmarks.com)

---

## Document Control

- **Last Updated:** [Date]
- **Owner:** Customer Success Lead
- **Review Frequency:** Quarterly (with survey cycle)
- **Next Survey Date:** [Date]
