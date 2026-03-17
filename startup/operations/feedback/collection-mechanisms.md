# Feedback Collection Mechanisms

**Purpose:** Multi-channel strategy for gathering customer feedback at key moments

**Goal:** Make it easy for customers to share feedback, capture both solicited and unsolicited input

---

## 1. In-Product Feedback Widget

### Design & Placement

**Location:** Bottom right corner, floating button
**Style:** Non-intrusive, always accessible
**Icon:** 💬 or "Feedback" text

**Behavior:**
- Click → Opens small modal
- Stay out of way during workflows
- Mobile-responsive (same placement)

---

### Widget Content

**Initial Modal:**

```
┌─────────────────────────────────┐
│ 💬 Share Your Feedback           │
│                                  │
│ What's on your mind?             │
│                                  │
│ [Bug Report]    [Feature Request]│
│ [General Feedback]               │
│                                  │
│ [Cancel]                         │
└─────────────────────────────────┘
```

**After Selection:**

```
┌─────────────────────────────────┐
│ 🐛 Report a Bug                  │
│                                  │
│ What happened?                   │
│ [________________________]       │
│ [________________________]       │
│ [________________________]       │
│                                  │
│ Attach screenshot (optional)     │
│ [Choose File]                    │
│                                  │
│ [Cancel]  [Submit Feedback]      │
└─────────────────────────────────┘
```

---

### Feedback Categories

1. **Bug Report 🐛**
   - Something broken
   - Not working as expected
   - Error messages

2. **Feature Request ✨**
   - New feature idea
   - Enhancement to existing feature
   - Integration request

3. **General Feedback 💡**
   - Praise/compliments
   - Constructive criticism
   - General thoughts
   - Testimonial

4. **Question ❓**
   - How-to questions
   - Clarifications
   - Redirect to support

---

### Post-Submission

**Thank You Message:**

```
┌─────────────────────────────────┐
│ ✅ Thank You!                    │
│                                  │
│ Your feedback has been received. │
│ We read every message.           │
│                                  │
│ Want a response?                 │
│ [ ] Yes, please follow up        │
│                                  │
│ [Close]                          │
└─────────────────────────────────┘
```

**If they check "follow up":**
- Collect email (auto-filled if logged in)
- Ticket created in support system
- Response within SLA

---

### Analytics Tracking

Track in product analytics:

- Feedback submissions per day/week
- By category (bug, feature, general)
- By page/feature (where were they when they submitted?)
- Response rate (what % request follow-up?)
- User details (plan tier, tenure, activity level)

---

## 2. Contextual Surveys

### Trigger Points

Show micro-surveys at key moments:

**After First Transaction Created (Day 1-3):**
```
🎯 Quick question:
How easy was it to create your first transaction?

[Very Easy] [Easy] [Neutral] [Difficult] [Very Difficult]

[Skip] [Submit]
```

**After First Client Email Sent:**
```
📧 How satisfied are you with the AI-drafted email?

[★★★★★] [★★★★☆] [★★★☆☆] [★★☆☆☆] [★☆☆☆☆]

[Skip] [Submit]
```

**After 7 Days of Use:**
```
🤔 What's the ONE thing we could do to improve [Product Name]?

[________________________]
[________________________]

[Skip] [Submit]
```

**After 30 Days:**
```
📈 How has [Product Name] impacted your productivity?

[Significantly increased] [Somewhat increased] [No change] [Decreased]

[Skip] [Submit]
```

---

### Survey Best Practices

1. **Keep it short:** 1-2 questions max
2. **Show sparingly:** Max 1 survey per week per user
3. **Make it skippable:** Don't force responses
4. **Close the loop:** If they give feedback, acknowledge it

---

## 3. Email-Based Feedback

### Dedicated Feedback Email

**Address:** feedback@[domain].com

**Auto-Response:**

```
Subject: We received your feedback - Thank you! 🙏

Hi [Name],

Thank you for taking the time to share your feedback! We read every message that comes through this inbox.

What happens next:
1. We'll review your feedback within [X] business days
2. If we have questions, we'll follow up
3. If it's actionable, we'll add it to our backlog
4. We'll update you if we implement your suggestion

In the meantime, thanks for helping us make [Product Name] better!

Best,
[Customer Success Team]

P.S. If this is urgent, please contact support@[domain].com instead.
```

---

### Periodic Email Surveys

**Quarterly NPS Survey:** See separate NPS document

**Monthly Pulse Check (Optional):**

Send to random 10% of active users each month:

```
Subject: Quick question about [Product Name]

Hi [Name],

We're always looking to improve. Got 30 seconds?

**What's working well for you?**
[________________________]

**What's NOT working well?**
[________________________]

[Submit Feedback]

Thanks for your help!
[Signature]
```

---

## 4. Support Ticket Feedback

### Tagging System

**When support agents receive feedback:**
- Tag ticket with: "feedback", "feature-request", "bug", "praise", "complaint"
- Add details in ticket notes
- Route to product team if needed

### Weekly Review

**Every Friday:**
- CS lead reviews all feedback-tagged tickets
- Extract themes and patterns
- Share with product team
- Update feedback tracker

---

## 5. Onboarding/Offboarding Calls

### During Onboarding Calls (Day 1-7):

**Ask:**
- "What made you sign up for [Product Name]?"
- "What problem are you hoping we'll solve?"
- "Have you used similar tools before? What did you like/dislike?"

### During Success Calls (Day 14+):

**Ask:**
- "What's your favorite feature so far?"
- "What's been frustrating or confusing?"
- "What's missing that would make this a 10/10 for you?"

### During Offboarding Calls (Churn):

See separate Churn Interview Script

---

## 6. Community & Public Channels (Future)

### Public Roadmap

**Tool:** Canny, UserVoice, or Productboard

**How it works:**
1. Customers submit feature requests
2. Other customers upvote
3. Product team responds with status:
   - Under Review
   - Planned
   - In Progress
   - Completed
   - Not Planned (with explanation)

**Benefits:**
- Transparency
- Crowd-sourced prioritization
- Reduces duplicate requests

---

### User Research Sessions

**Monthly user interviews (5-10 customers):**

**Format:**
- 30-minute video call
- Ask about workflow, pain points, product usage
- Observe them using the product
- Record (with permission)

**Recruit:**
- In-product prompt: "Want to help shape the future of [Product Name]?"
- Offer: $50 Amazon gift card or 1 month free

---

## 7. Social Media & Review Monitoring

### Channels to Monitor

- Twitter/X: @mentions, hashtags
- LinkedIn: Company page comments
- Facebook: Groups where customers discuss
- G2, Capterra: Review sites
- Google: Search for product name + "review"

### Response Protocol

**Positive:**
- Like/retweet/share
- Thank them publicly
- Ask permission to use as testimonial

**Negative:**
- Acknowledge publicly
- Move to private channel (DM, email)
- Resolve issue
- Follow up publicly if appropriate

**Neutral/Questions:**
- Respond helpfully
- Point to resources
- Offer direct support

---

## 8. Feedback Tracking System

### Centralized Repository

**Tool Options:**
- Notion, Airtable, or spreadsheet
- Integrated with support system (e.g., Intercom, Zendesk)
- Product management tool (Linear, Jira)

### Data Structure

**Fields:**

```
- ID: Auto-generated
- Date: Date received
- Source: Widget, Email, Support, Interview, Social
- Type: Bug, Feature Request, General Feedback, Complaint, Praise
- Customer: Name, email, plan tier
- Summary: 1-2 sentence description
- Details: Full feedback text
- Priority: P0, P1, P2, P3 (if bug)
- Status: New, Triaged, In Progress, Resolved, Closed
- Action Taken: What we did (if anything)
- Customer Notified: Yes/No
- Link: Link to ticket or relevant doc
```

---

### Weekly Analysis

**Every Monday:**

1. **Review all feedback from last week**
   - Categorize and tag
   - Identify patterns

2. **Extract themes:**
   - Top 5 feature requests
   - Top 5 pain points
   - Positive themes
   - Urgent bugs

3. **Share with team:**
   - Slack summary to product team
   - Include direct quotes
   - Highlight trends

4. **Update tracker:**
   - Mark duplicates
   - Update status
   - Note action taken

---

### Monthly Report

**At end of each month:**

**Feedback Volume:**
- Total feedback received
- By channel
- By type
- By plan tier

**Top Themes:**
- Most requested features (with vote counts)
- Most common complaints
- Most positive aspects

**Action Taken:**
- How many features implemented based on feedback?
- How many bugs fixed?
- Response rate to customers

**Impact:**
- Correlation between feedback response and retention?
- NPS trends?

---

## 9. Closing the Feedback Loop

### The "You Spoke, We Listened" Email

**When:** Monthly or when major features launch

**Subject:** You Asked, We Built It! 🎉

**Content:**

```
Hi [Name],

Last month, you and other [Product Name] customers shared some great ideas. We listened!

Here's what we built based on your feedback:

✨ [Feature 1] - Requested by 23 customers
   [Brief description]

✨ [Feature 2] - Requested by 18 customers
   [Brief description]

🐛 Fixed: [Bug 1] - Thanks for reporting!
🐛 Fixed: [Bug 2] - We heard you!

Coming Soon:
- [Feature 3] - In development now!

Thank you for helping us improve. Your feedback matters!

Keep sharing your ideas: [Feedback Link]

Best,
[Signature]

P.S. Have more ideas? We're all ears: feedback@[domain].com
```

---

### Individual Follow-Up

**When a customer's specific request is implemented:**

**Email:**

```
Subject: 🎉 Good News - We Built [Feature]!

Hi [Name],

Remember when you suggested [feature]? We built it!

You can now [description of what they can do].

It's live in your account now - try it out!

Thanks for the great idea. Keep 'em coming!

[Signature]
```

---

## 10. Feedback Incentives (Optional)

### Rewards for Quality Feedback

**Options:**

1. **Extended Free Trial:**
   - Provide detailed feedback → Get 30 extra days free

2. **Feature Priority:**
   - Top contributors get early access to new features

3. **Swag:**
   - Send branded merch to customers who give exceptional feedback

4. **Recognition:**
   - Feature their name/logo on website (with permission)
   - "Contributed by [Name]" in release notes

5. **Discounts:**
   - 10% off next month for detailed feature requests

---

### Be Careful With:

- Don't incentivize QUANTITY over QUALITY
- Don't create expectation of payment for feedback
- Keep it genuine and appreciative

---

## Best Practices Summary

✅ **DO:**
- Make feedback easy to give (always accessible)
- Respond to every piece of feedback
- Close the loop (tell them what happened)
- Thank customers genuinely
- Prioritize transparently
- Share feedback with the whole team
- Act on feedback quickly when possible

❌ **DON'T:**
- Ignore feedback
- Let it pile up unreviewed
- Promise features you can't deliver
- Argue with negative feedback
- Over-survey (don't annoy customers)
- Hoard feedback in silos

---

## Document Control

- **Last Updated:** [Date]
- **Owner:** Customer Success Lead + Product Team
- **Review Frequency:** Quarterly
- **Next Review:** [Date]
