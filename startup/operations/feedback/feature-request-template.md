# Feature Request Template

**Purpose:** Standardized format for capturing, evaluating, and prioritizing feature requests

**Goal:** Ensure all requests are captured consistently, evaluated fairly, and tracked transparently

---

## 1. Feature Request Capture Form

### For Customers

**Where:** In-product feedback widget, email, or support chat

**Form Fields:**

```
┌─────────────────────────────────────────┐
│ ✨ Submit a Feature Request              │
│                                          │
│ 1. What problem are you trying to solve? │
│    [________________________]            │
│    [________________________]            │
│    (Be specific about your pain point)  │
│                                          │
│ 2. What's your proposed solution?        │
│    [________________________]            │
│    [________________________]            │
│    (How do you imagine it working?)     │
│                                          │
│ 3. How important is this to you?         │
│    ○ Critical - I can't use the product without it
│    ○ High - It would significantly improve my workflow
│    ○ Medium - It would be nice to have
│    ○ Low - Minor enhancement             │
│                                          │
│ 4. How often would you use this feature? │
│    ○ Multiple times per day              │
│    ○ Daily                               │
│    ○ Weekly                              │
│    ○ Monthly                             │
│    ○ Rarely                              │
│                                          │
│ 5. Any additional context? (Optional)   │
│    [________________________]            │
│                                          │
│ 6. Would you be willing to discuss this  │
│    with our product team?                │
│    [ ] Yes, contact me for user interview│
│                                          │
│ [Cancel] [Submit Request]                │
└─────────────────────────────────────────┘
```

---

### For Internal Team (Support, CS, Sales)

**When customers request features verbally:**

**Template to Fill:**

```markdown
## Feature Request

**Submitted By:** [Customer Name]
**Email:** [email]
**Plan Tier:** [Starter/Professional/Team]
**Account Age:** [X days/months]
**Date:** [Date]
**Source:** [Support Ticket / Sales Call / Customer Success Call / In-App]

### Problem Statement
[What problem is the customer trying to solve? What pain point?]

### Proposed Solution
[What feature do they want? How do they imagine it working?]

### Importance
- [ ] Critical
- [ ] High
- [ ] Medium
- [ ] Low

### Frequency of Use
[How often would they use it?]

### Customer Quote
"[Direct quote from customer about why this matters]"

### Business Impact
[Does this affect multiple customers? What's the potential revenue impact?]

### Additional Context
[Any other relevant details]
```

---

## 2. Feature Request Evaluation Framework

### Scoring Criteria

Each request is scored on 5 dimensions (1-5 scale):

#### 1. Strategic Alignment (1-5)
**Question:** Does this align with our product vision and roadmap?

- **5:** Core to our value proposition
- **4:** Supports key strategic initiatives
- **3:** Neutral, neither helps nor hurts
- **2:** Tangential to our focus
- **1:** Doesn't align with vision

---

#### 2. Customer Demand (1-5)
**Question:** How many customers want this?

- **5:** 50+ requests or 20%+ of customer base
- **4:** 20-49 requests or 10-20% of customer base
- **3:** 10-19 requests or 5-10% of customer base
- **2:** 2-9 requests
- **1:** 1 request

---

#### 3. Business Impact (1-5)
**Question:** Will this drive revenue, retention, or acquisition?

- **5:** Direct revenue impact (e.g., enterprise feature enabling upgrades)
- **4:** Significant retention impact (prevents churn)
- **3:** Moderate impact on retention or acquisition
- **2:** Minor impact
- **1:** No measurable impact

---

#### 4. Effort Required (1-5)
**Question:** How difficult is this to build? (Inverted scale)

- **5:** Very easy (< 1 week, minimal resources)
- **4:** Easy (1-2 weeks, standard resources)
- **3:** Moderate (2-4 weeks, moderate resources)
- **2:** Difficult (1-2 months, significant resources)
- **1:** Very difficult (2+ months, architectural changes)

**Note:** Higher effort = lower score (it's inverted)

---

#### 5. User Delight (1-5)
**Question:** Will customers love this?

- **5:** "Wow" factor, customers will be thrilled
- **4:** Significant delight, noticeable improvement
- **3:** Nice to have, appreciated
- **2:** Minor improvement
- **1:** Meh, customers won't care much

---

### Priority Score Calculation

```
Priority Score = (Strategic × 0.25) + (Demand × 0.30) + (Business × 0.20) + (Effort × 0.15) + (Delight × 0.10)

Max Score: 5.0
Min Score: 1.0

Weighting rationale:
- Customer demand (30%) - Most important, we build for customers
- Strategic fit (25%) - Must align with vision
- Business impact (20%) - Need to make money
- Effort (15%) - Resources matter
- Delight (10%) - Nice to have, but not primary driver
```

---

### Priority Tiers

**P0 - Must Have (Score 4.5-5.0):**
- Build immediately
- Blocks other work if needed

**P1 - High Priority (Score 3.5-4.4):**
- Plan for next sprint
- Allocate dedicated resources

**P2 - Medium Priority (Score 2.5-3.4):**
- Add to roadmap for next quarter
- Build when capacity allows

**P3 - Low Priority (Score 1.5-2.4):**
- Backlog, review quarterly
- May never build

**P4 - Won't Build (Score < 1.5):**
- Close request
- Explain why to customer

---

## 3. Feature Request Tracker

### Spreadsheet / Database Structure

| ID | Feature Name | Description | Requested By | Date | Plan Tier | Score | Priority | Status | Owner | ETA |
|----|--------------|-------------|--------------|------|-----------|-------|----------|--------|-------|-----|
| FR-001 | SMS Notifications | Send deadline reminders via SMS | 23 customers | 2026-01-15 | Mixed | 4.2 | P1 | In Progress | Engineering | 2026-04-01 |
| FR-002 | Bulk Upload | Upload multiple contracts at once | 12 customers | 2026-02-01 | Team | 3.8 | P2 | Planned | - | Q2 2026 |

---

### Status Definitions

- **New:** Just received, not yet reviewed
- **Under Review:** Being evaluated and scored
- **Approved:** Accepted, added to backlog
- **Planned:** Scheduled for specific release
- **In Progress:** Currently being built
- **Beta:** Released to select customers for testing
- **Launched:** Live for all customers
- **Closed - Built:** Implemented and shipped
- **Closed - Duplicate:** Same as existing request
- **Closed - Won't Build:** Not aligned with product vision

---

## 4. Customer Communication

### Acknowledgment (Within 48 hours)

**Template:**

```
Subject: Re: Feature Request - [Feature Name]

Hi [Name],

Thank you for the feature request! We love hearing from customers about what they need.

**Your request:** [Brief description]

**What happens next:**
1. Our product team reviews all requests weekly
2. We'll evaluate based on customer demand, strategic fit, and resources
3. I'll update you on the status within [X] weeks

**Want to help?**
If we decide to build this, would you be willing to:
- Participate in a 15-minute user interview? (Helps us design it right)
- Beta test the feature before launch?

Just reply "Yes" and I'll add you to the list!

Thanks for helping us improve [Product Name]!

[Signature]
```

---

### Status Update (Monthly)

**Template:**

```
Subject: Update on Your Feature Request - [Feature Name]

Hi [Name],

Quick update on the feature you requested: [Feature Name]

**Status:** [Under Review / Approved / Planned / In Progress / Launched]

[If Planned/In Progress:]
**Timeline:** We expect to launch this in [Month/Quarter]

[If Under Review:]
**Update:** We're still evaluating this feature. I'll let you know when we have a decision.

[If Launched:]
**Great news!** This feature is now live! You can access it by [instructions].

**Your feedback matters:** Thanks for suggesting this - customer input drives our roadmap!

[Signature]
```

---

### If Won't Build

**Template:**

```
Subject: Re: Feature Request - [Feature Name]

Hi [Name],

Thank you for your patience while we reviewed your feature request.

**Your request:** [Feature Name]

**Decision:** After careful consideration, we've decided not to build this feature at this time.

**Why:** [Honest explanation, e.g., "This would require significant architectural changes that don't align with our current roadmap" or "This use case is quite rare and doesn't affect most customers"]

**However:** I've logged this in our backlog, and we'll revisit if customer demand increases.

**Alternative:** [If applicable, suggest workaround or third-party tool]

I know this isn't the answer you were hoping for, and I'm sorry about that. Your feedback is still valuable - it helps us understand what customers need.

If you have other ideas, I'm all ears!

[Signature]
```

---

## 5. Internal Review Process

### Weekly Review Meeting

**Attendees:** Product Manager, Customer Success Lead, 1 Engineer

**Duration:** 30 minutes

**Agenda:**
1. Review new requests from past week (5 min)
2. Score and prioritize top 5 requests (15 min)
3. Update status of in-progress features (5 min)
4. Discuss any blockers (5 min)

---

### Monthly Roadmap Review

**Attendees:** Founder, Product Manager, Engineering Lead, Customer Success Lead

**Duration:** 1 hour

**Agenda:**
1. Review all P1-P2 requests (30 min)
2. Decide which to build next quarter (20 min)
3. Update roadmap and communicate to team (10 min)

---

## 6. Public Roadmap (Future)

### When to Launch

**Timing:** After 100+ customers, when feature request volume becomes unmanageable via email

### Tool Options

- **Canny** ($99/mo) - Best for feature voting
- **UserVoice** ($500+/mo) - Enterprise-grade
- **Productboard** ($100+/mo) - Full product management
- **Trello Public Board** (Free) - DIY

---

### How It Works

1. **Customers submit requests** → Public portal
2. **Other customers upvote** → Crowdsourced prioritization
3. **Product team updates status:**
   - Under Review
   - Planned
   - In Progress
   - Completed
   - Not Planned
4. **Transparency:** Customers see what's being built

---

### Benefits

- Reduces duplicate requests
- Empowers customers to vote
- Shows we're listening
- Provides social proof ("23 people want this")

---

## 7. Feature Request Best Practices

### For Product Team

✅ **DO:**
- Thank every customer who submits a request
- Respond within 48 hours
- Provide honest timelines (don't over-promise)
- Update customers when status changes
- Close the loop when feature launches
- Explain why if you won't build

❌ **DON'T:**
- Ignore requests
- Promise features you can't deliver
- Give vague timelines ("coming soon" forever)
- Build features without validating demand
- Prioritize based on who shouts loudest

---

### For Customer Success Team

✅ **DO:**
- Capture all verbal requests in tracker
- Ask clarifying questions
- Tag customers who request features
- Escalate high-demand requests
- Follow up with customers when features launch

❌ **DON'T:**
- Make promises without product team approval
- Tell customers "we're building it" if it's not approved
- Forget to update customers

---

## 8. Example: Fully Evaluated Feature Request

```markdown
# Feature Request: SMS Notifications

## Metadata
- **ID:** FR-001
- **Requested By:** 23 customers (see list)
- **Date Submitted:** 2026-01-15
- **Last Updated:** 2026-02-20
- **Owner:** Product Manager
- **Status:** In Progress
- **ETA:** 2026-04-01

---

## Problem Statement
Customers miss email reminders because they don't check email frequently enough. They want SMS notifications to ensure they see deadline reminders immediately.

## Proposed Solution
Send SMS notifications for deadline reminders via Twilio integration. Include:
- 7-day, 3-day, 1-day, and day-of reminders
- Customizable by transaction
- Opt-in per user
- Available on Team Plan only (initially)

## Customer Quotes
> "I missed a deadline because I didn't see the email. If I got a text, I'd see it instantly." - Sarah M., Professional Plan

> "I'm on the go all day. I need SMS, not email." - John D., Team Plan

## Scoring

| Dimension | Score | Rationale |
|-----------|-------|-----------|
| Strategic Alignment | 4 | Supports our mission to never miss deadlines |
| Customer Demand | 5 | 23 requests, ~8% of customer base |
| Business Impact | 4 | Differentiator for Team Plan, reduces churn |
| Effort Required | 3 | Moderate: Twilio integration, 2-3 weeks |
| User Delight | 5 | Customers will love this |

**Priority Score:** (4×0.25) + (5×0.30) + (4×0.20) + (3×0.15) + (5×0.10) = **4.2**

**Priority:** P1 - High Priority

---

## Implementation Plan
- **Week 1-2:** Twilio integration, backend setup
- **Week 3:** UI for SMS settings
- **Week 4:** Testing, beta release to 5 customers
- **Week 5:** Full launch

## Success Metrics
- Adoption rate: Target 50% of Team Plan users enable SMS
- Churn reduction: Measure impact on Team Plan retention
- NPS: Survey users who enable SMS

## Risks
- Cost: SMS costs ~$0.01-0.02 per message
- Mitigation: Limit to Team Plan, set monthly caps

---

## Communication Plan
- Email all Team Plan users when feature launches
- Update all 23 requesters personally
- Add to "You Spoke, We Built It" newsletter
```

---

## Document Control

- **Last Updated:** [Date]
- **Owner:** Product Manager + Customer Success Lead
- **Review Frequency:** Weekly (review new requests)
- **Next Review:** [Date]
