# Support Escalation Procedures

**Purpose:** Clear guidelines for when and how to escalate customer issues beyond Tier 1 support

**Goal:** Ensure complex issues reach the right people quickly, maintain customer trust, prevent churn

---

## Table of Contents

1. Escalation Tiers
2. When to Escalate
3. How to Escalate
4. Escalation Scripts
5. Post-Escalation Follow-Up
6. Escalation Metrics

---

## 1. Escalation Tiers

### Tier 0: Self-Service
**Handled by:** Help Center, In-App Tooltips, Video Tutorials  
**Time to Resolution:** Immediate  
**Scope:** Basic questions, how-to's, common issues

**Examples:**
- "How do I upload a contract?"
- "Where do I change my password?"
- "What plan am I on?"

---

### Tier 1: Customer Success / Support Team
**Handled by:** Support staff, CS team  
**Time to Resolution:** < 24 hours (12 hours for Professional, 4 hours for Team)  
**Scope:** Most customer issues, troubleshooting, feature questions, minor bugs

**Examples:**
- "My upload failed, help?"
- "Not receiving emails"
- "Billing question"
- "How does X feature work?"
- "Found a small bug"

**Authority:**
- Reset passwords
- Resend emails
- Issue credits up to $50
- Extend trials up to 14 days
- Answer product questions

---

### Tier 2: Product Manager / Founder
**Handled by:** PM or Founder  
**Time to Resolution:** < 4 hours (urgent), < 24 hours (standard)  
**Scope:** Complex issues, strategic customers, feature requests, moderate bugs

**Examples:**
- "AI extraction consistently wrong on my contracts"
- "I need a feature that doesn't exist"
- "I want to upgrade but need custom pricing"
- "Bug affecting multiple users"
- "High-value customer complaint"

**Authority:**
- Offer custom pricing
- Prioritize features
- Refund any amount
- Make product decisions
- Contact engineering directly

---

### Tier 3: Engineering Team
**Handled by:** Lead Engineer  
**Time to Resolution:** < 2 hours (critical), < 24 hours (urgent), < 72 hours (standard)  
**Scope:** Technical bugs, data issues, security incidents, performance problems

**Examples:**
- "System is down"
- "Data loss / corruption"
- "Security breach suspected"
- "API failure affecting multiple users"
- "Database error"

**Authority:**
- Push emergency fixes
- Roll back deployments
- Access production systems
- Make technical decisions

---

### Tier 4: Legal / Compliance / Executive
**Handled by:** Founder, Legal Counsel  
**Time to Resolution:** Immediate  
**Scope:** Legal threats, regulatory issues, PR crises, enterprise customers

**Examples:**
- "I'm suing you"
- "Reporting you to the real estate commission"
- "Data breach affecting 100+ customers"
- "Posting negative reviews everywhere"

**Authority:**
- Make legal decisions
- Offer settlements
- Involve attorneys
- Public statements

---

## 2. When to Escalate

### Immediate Escalation (Don't Wait)

Escalate **immediately** if:

1. **System Down**
   - Multiple users reporting same critical failure
   - Can't access platform
   - Data not loading

2. **Security Incident**
   - User reports unauthorized access to their account
   - Data breach suspected
   - Suspicious activity patterns

3. **Data Loss**
   - User reports missing documents or transactions
   - Data corrupted or incorrect
   - Accidental deletion (try to recover)

4. **Legal Threat**
   - User threatens lawsuit
   - Mentions attorneys, regulators, or legal action
   - Demands that sound legal in nature

5. **PR Crisis**
   - User threatens negative reviews, social media posts
   - Media inquiry
   - Viral complaint

6. **Enterprise / High-Value Customer**
   - Customer paying $500+/month
   - Strategic partner
   - Influencer with large following

---

### Standard Escalation (Within 4 Hours)

Escalate **within 4 hours** if:

1. **Complex Technical Issue**
   - AI extraction failing repeatedly
   - Integration not working
   - Performance issues affecting one user

2. **Feature Request from Active User**
   - Long-term customer requesting feature
   - Multiple customers requesting same feature
   - Request aligns with roadmap

3. **Billing Dispute**
   - Customer disagrees with charge
   - Requests refund > $50
   - Complex billing situation

4. **Product Feedback**
   - User offering detailed, constructive feedback
   - Suggestions for improvement
   - Validated feature ideas

---

### No Escalation Needed

**DO NOT escalate** if:

1. **Basic Question**
   - Answered in Help Center
   - Simple how-to
   - General product info

2. **Feature Complaint**
   - User wants feature that doesn't exist yet
   - But not requesting urgently
   - Not strategic customer

3. **Minor Bug**
   - Cosmetic issue
   - Doesn't affect core functionality
   - Workaround exists

**Action:** Log the issue, inform user it's on the roadmap, thank them.

---

## 3. How to Escalate

### Step 1: Gather Information

**Collect from customer:**
- Account email
- Plan tier
- Description of issue
- Screenshots / videos
- Steps to reproduce (if bug)
- Urgency level (from customer perspective)
- Business impact (how is this affecting them?)

**Log in support tool:**
- Create ticket with all details
- Tag with appropriate labels (bug, feature-request, urgent, etc.)

---

### Step 2: Assess Urgency

**Critical (P0):** System down, data loss, security breach  
**Urgent (P1):** Major feature broken, high-value customer, legal threat  
**High (P2):** Moderate bug, complex issue, feature request  
**Normal (P3):** Standard questions, minor issues

---

### Step 3: Contact Appropriate Tier

#### For Tier 2 (Product Manager / Founder):

**Slack:**
```
@founder @pm [ESCALATION - P1]

Customer: [Name, email]
Plan: [Tier]
Issue: [1-sentence summary]
Impact: [High/Medium/Low]
Business impact: [e.g., "Can't upload contracts, losing deals"]
Ticket: [Link]
```

**If no response in 30 minutes:**
- Text/call directly

---

#### For Tier 3 (Engineering):

**Slack:**
```
@engineering [URGENT - P0/P1]

Issue: [Technical description]
Affected users: [1 or many]
Steps to reproduce: [Numbered steps]
Error messages: [If any]
Urgency: [Why critical]
Ticket: [Link]
```

**If no response in 15 minutes:**
- Text/call lead engineer

---

#### For Tier 4 (Legal / Executive):

**Direct communication:**
- Call founder immediately
- Email with subject: [URGENT LEGAL] or [URGENT PR]
- Don't post in public Slack channels

---

### Step 4: Communicate with Customer

**Standard escalation message:**

> "I've escalated this to our [Product/Engineering] team for specialized help. They're reviewing your case now and will follow up within [timeframe]. In the meantime, I'm here if you have any other questions."

**Urgent escalation message:**

> "This requires immediate attention from our engineering team. I've flagged it as critical and they're investigating right now. I'll personally follow up with you within [2 hours] with an update. Here's my direct email if you need to reach me: [email]"

**Legal escalation message:**

> "I take this very seriously and have escalated it to our leadership team. You'll hear from us within [24 hours] with a formal response. In the meantime, please send any additional details to [legal email]."

---

### Step 5: Track and Follow-Up

**Add to escalation tracker:**
- Spreadsheet or project management tool
- Columns: Date, Customer, Issue, Tier, Owner, Status, Resolution

**Check in daily** on all open escalations

**Update customer** every 24 hours until resolved (even if just "still working on it")

---

## 4. Escalation Scripts

### Script: User Threatening to Cancel

**Situation:** Frustrated customer wants to cancel immediately

**Response:**

> "I completely understand your frustration, [Name]. You're right to expect better, and I apologize we've let you down.
>
> Before you cancel, can I ask: what specifically isn't working? I want to understand so we can fix it - for you and for other customers.
>
> If we can resolve this issue in the next [24 hours], would you be willing to give us another chance? I'll personally oversee your case and ensure it's handled properly.
>
> If not, I can process your cancellation immediately - but I'd hate to lose you over something fixable."

**If they still want to cancel:**
> "I understand. I'll process your cancellation right away. You'll receive a confirmation email shortly. I'm truly sorry we couldn't make this work. Your feedback has been noted and we'll use it to improve."

**Escalate to:** Tier 2 (Founder) if high-value customer

---

### Script: Data Loss / Missing Documents

**Situation:** Customer reports documents disappeared

**Response:**

> "Oh no, I'm so sorry to hear that. Let me investigate immediately.
>
> Can you tell me:
> 1. Which transaction(s) are affected?
> 2. What documents are missing?
> 3. When did you last see them?
>
> I'm checking our backup systems now. Most 'missing' data is actually recoverable - it may have been archived or moved. Give me [30 minutes] to investigate, and I'll get back to you with answers."

**Internal action:**
1. Check database logs
2. Check backup systems
3. Contact engineering if truly missing
4. **Escalate to Tier 3** if data is actually lost

**If recoverable:**
> "Good news! I found your documents. They were [in archive / in a different transaction / etc]. Here's how to access them: [instructions]. Let me know if you need anything else!"

**If not recoverable:**
> "I've thoroughly investigated and I'm afraid the documents are not in our system. I've escalated this to our engineering team to see if we can recover from backups. I'll have an update for you within [4 hours]. In the meantime, do you have local copies you can re-upload?"

---

### Script: Security Concern

**Situation:** User suspects unauthorized access

**Response:**

> "Thank you for reporting this - we take security very seriously. Let me help you secure your account immediately.
>
> First, let's change your password right now: [Link to password reset]
>
> Next, I'm going to:
> 1. Log out all devices from your account
> 2. Review login history for suspicious activity
> 3. Enable additional security measures
>
> Can you tell me what made you suspect unauthorized access? (e.g., strange emails, files moved, unfamiliar logins)"

**Internal action:**
1. Force logout all sessions
2. Check login logs
3. Review activity logs
4. **Escalate to Tier 3** if breach confirmed

---

### Script: Legal Threat

**Situation:** Customer threatens lawsuit or regulatory complaint

**Response:**

> "I understand you're very upset, and I want to take your concerns seriously. I'm escalating this immediately to our leadership team for review.
>
> You'll receive a formal response within [24 hours]. In the meantime, please send any documentation or details to [legal email] so we can investigate thoroughly.
>
> I want to assure you that we're committed to resolving this fairly and professionally."

**Internal action:**
1. **Escalate to Tier 4 immediately**
2. Do not make any promises or admissions
3. Document everything
4. Founder/Legal will handle from here

---

## 5. Post-Escalation Follow-Up

### Within 4 Hours (or promised timeframe):

**Check in with customer:**

> "Hi [Name], just wanted to update you on your case. Our team is [investigating / working on a fix / reviewing]. I expect to have a resolution by [time/date]. I'll keep you updated."

---

### After Resolution:

**Follow-up email:**

> "Hi [Name],
>
> I'm pleased to let you know that your issue has been resolved. [Brief explanation of what was fixed].
>
> As a thank you for your patience, I've [applied a credit to your account / extended your trial / etc.].
>
> Please let me know if you're still experiencing any issues or if there's anything else I can help with.
>
> [Signature]"

---

### 7 Days Later:

**Check-in email:**

> "Hi [Name], just checking in to make sure everything is working smoothly after your recent issue. If you're still experiencing problems, please reply and let me know - I'm here to help."

---

### Root Cause Analysis (Internal):

For all escalations, document:

1. **What happened?** (Issue description)
2. **Why did it happen?** (Root cause)
3. **How did we fix it?** (Resolution)
4. **How do we prevent it?** (Process improvement)

**Review weekly** with product/engineering team

---

## 6. Escalation Metrics

### Track Weekly:

1. **Total Escalations**
   - By tier (Tier 1, 2, 3, 4)
   - By type (bug, feature request, billing, etc.)

2. **Time to Resolution**
   - Average time from escalation to resolution
   - Target: < 24 hours (Tier 1-2), < 4 hours (Tier 3)

3. **First Contact Resolution Rate**
   - % of issues resolved without escalation
   - Target: > 80%

4. **Escalation Rate**
   - % of support tickets that require escalation
   - Lower is better (means Tier 1 is effective)
   - Target: < 15%

5. **Customer Satisfaction Post-Escalation**
   - Survey after resolution
   - Target: > 90% satisfied

6. **Repeat Escalations**
   - % of customers who escalate multiple times
   - High number = systemic issues

---

### Monthly Review:

- **Top escalation causes** - what issues come up repeatedly?
- **Fix the system** - can we prevent these escalations?
- **Update Help Center** - add articles for common issues
- **Product improvements** - share feedback with product team

---

## Appendix: Escalation Decision Tree

```
Customer contacts support
        ↓
Is it a basic question/issue?
    YES → Resolve in Tier 1 → Done
    NO ↓
Is it a known issue with workaround?
    YES → Provide workaround → Done
    NO ↓
Is it affecting multiple users?
    YES → Escalate to Tier 3 (Engineering)
    NO ↓
Is the customer high-value (>$500/mo or strategic)?
    YES → Escalate to Tier 2 (Founder)
    NO ↓
Is there a legal threat or PR risk?
    YES → Escalate to Tier 4 (Legal)
    NO ↓
Can Tier 1 resolve with more time/tools?
    YES → Resolve → Done
    NO ↓
Escalate to Tier 2 (Product Manager)
```

---

## Document Control

- **Last Updated:** [Date]
- **Owner:** Customer Success Lead
- **Review Frequency:** Monthly
- **Next Review:** [Date]
