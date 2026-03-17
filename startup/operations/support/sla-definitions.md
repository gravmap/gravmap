# Service Level Agreement (SLA) Definitions

**Purpose:** Define clear expectations for support response times, resolution times, and service quality across all plan tiers

**Scope:** Applies to all customer support interactions

---

## Table of Contents

1. Response Time SLAs
2. Resolution Time Targets
3. Support Channel Availability
4. Issue Severity Definitions
5. SLA Measurement & Reporting
6. SLA Breach Remedies
7. Support Scope & Exclusions

---

## 1. Response Time SLAs

### Definition
**Response Time:** Time from when customer submits a support request to when they receive the first meaningful response from a human agent (not auto-acknowledgment)

### By Plan Tier

| Plan | Initial Response | Target | Maximum |
|------|------------------|--------|---------|
| **Starter** | 24 hours | 18 hours | 36 hours |
| **Professional** | 12 hours | 8 hours | 24 hours |
| **Team** | 4 hours | 2 hours | 8 hours |
| **Enterprise (Future)** | 1 hour | 30 minutes | 2 hours |

### By Issue Severity

| Severity | Starter | Professional | Team |
|----------|---------|--------------|------|
| **Critical** (System down, data loss) | 8 hours | 4 hours | 2 hours |
| **High** (Major feature broken) | 16 hours | 8 hours | 4 hours |
| **Standard** (General questions) | 24 hours | 12 hours | 4 hours |
| **Low** (Feature requests, minor issues) | 48 hours | 24 hours | 8 hours |

### Business Hours

- **Support Hours:** 9 AM - 6 PM local time (customer's timezone)
- **Weekend/Holiday:** Response times may be extended by 24 hours
- **Critical Issues (Team Plan):** 24/7 support via emergency email

---

## 2. Resolution Time Targets

### Definition
**Resolution Time:** Time from when customer submits a request to when the issue is fully resolved and confirmed by the customer

### Targets by Issue Type

| Issue Type | Target Resolution |
|------------|-------------------|
| **Simple Questions** (how-to, account info) | First contact (80%) |
| **Configuration Issues** (settings, notifications) | < 4 hours |
| **Minor Bugs** (cosmetic, workaround exists) | < 72 hours |
| **Major Bugs** (core feature broken) | < 48 hours |
| **Critical Bugs** (system down, data loss) | < 24 hours |
| **Feature Requests** | Logged, no SLA |
| **Billing Issues** | < 24 hours |

### Resolution Quality Standards

Every resolution must:
1. ✅ Fully address the customer's issue
2. ✅ Provide clear, actionable next steps
3. ✅ Prevent recurrence when possible
4. ✅ Confirm customer is satisfied (implicit or explicit)

---

## 3. Support Channel Availability

### By Plan Tier

| Channel | Starter | Professional | Team |
|---------|---------|--------------|------|
| **Email Support** | ✅ 24/7 | ✅ 24/7 | ✅ 24/7 |
| **In-App Chat** | ✅ Business hours | ✅ Business hours | ✅ Business hours |
| **Phone Support** | ❌ | ❌ | ✅ Business hours |
| **Emergency Line** | ❌ | ❌ | ✅ 24/7 (Critical only) |
| **Dedicated Account Manager** | ❌ | ❌ | Coming soon |

### Channel Definitions

**Email Support:**
- Email: support@[domain].com
- Tracked in help desk system
- Auto-acknowledgment within 5 minutes
- Human response per SLA above

**In-App Chat:**
- Chat widget in bottom right corner
- Available during business hours
- Response time: < 2 hours (Team Plan), < 8 hours (Professional)
- Outside hours: Messages converted to email tickets

**Phone Support (Team Plan only):**
- Phone: [Number]
- Available: Monday-Friday, 9 AM - 6 PM (customer's timezone)
- For urgent issues only
- Voicemail triggers email ticket if outside hours

**Emergency Line (Team Plan only):**
- For critical issues: System down, data loss, security breach
- Email: urgent@[domain].com
- Response time: < 2 hours (24/7)
- Use only for genuine emergencies

---

## 4. Issue Severity Definitions

### P0 - Critical 🔴

**Definition:** Complete service outage or data loss affecting customer's ability to conduct business

**Examples:**
- Cannot access platform
- Data deleted or corrupted
- Security breach confirmed
- All users affected by critical bug

**Response Time:** Immediate (within 2 hours for Team, 4 hours for Professional, 8 hours for Starter)

**Escalation:** Immediately to Tier 3 (Engineering)

**Resolution Target:** < 24 hours

---

### P1 - High 🟠

**Definition:** Major feature broken, significant business impact, but workaround exists or partial functionality available

**Examples:**
- Contract upload failing
- AI extraction consistently inaccurate
- Notifications not sending
- Integration broken
- Performance severely degraded

**Response Time:** Half of standard SLA (e.g., 6 hours for Professional instead of 12)

**Escalation:** To Tier 2 (Product Manager) if not resolved in 24 hours

**Resolution Target:** < 48 hours

---

### P2 - Standard 🟡

**Definition:** General questions, minor issues, or feature requests with no immediate business impact

**Examples:**
- How-to questions
- Configuration assistance
- Minor bugs with workarounds
- Feature requests
- General feedback

**Response Time:** Per plan tier SLA (24h / 12h / 4h)

**Escalation:** Only if customer escalates or issue persists

**Resolution Target:** < 72 hours (or first contact for simple questions)

---

### P3 - Low 🟢

**Definition:** Minor issues, cosmetic bugs, or non-urgent requests

**Examples:**
- Cosmetic UI issues
- Minor typos
- Non-critical feature requests
- General feedback
- Documentation improvements

**Response Time:** Standard SLA + 24 hours

**Escalation:** Unlikely to escalate

**Resolution Target:** Next product release cycle

---

## 5. SLA Measurement & Reporting

### How We Measure

**Clock Starts:**
- When ticket is created (email received, chat initiated, form submitted)
- Timestamped in help desk system

**Clock Pauses:**
- When waiting for customer response
- Example: We ask for more info → Clock pauses until they reply

**Clock Stops:**
- When agent sends response that addresses the issue
- Or when agent marks ticket as "Pending" (waiting on customer)
- Timestamped in help desk system

### Tracking Metrics

**Daily Tracking:**
- Total tickets received
- Average response time
- % of tickets within SLA
- Oldest unresponded ticket

**Weekly Reporting:**
- SLA compliance by plan tier
- SLA compliance by severity
- Average response time trends
- Tickets breached SLA (with reasons)

**Monthly Analysis:**
- Overall SLA performance
- Improvement/degradation trends
- Root causes of breaches
- Action items for improvement

### SLA Dashboard (Internal)

Real-time dashboard showing:
- 🔴 Red: Tickets outside SLA
- 🟡 Yellow: Tickets at risk (< 1 hour before breach)
- 🟢 Green: Tickets within SLA
- Total open tickets by tier
- Average response time today

---

## 6. SLA Breach Remedies

### When SLA Is Breached

**Automatic Actions:**
1. Alert to support team lead
2. Ticket flagged as "SLA Breach"
3. Prioritized immediately
4. Personal apology to customer

**Remedies by Plan Tier:**

| Plan | Remedy for Breach |
|------|-------------------|
| **Starter** | 10% credit on next month's bill (max $4.90) |
| **Professional** | 15% credit on next month's bill (max $14.85) |
| **Team** | 20% credit on next month's bill (max $39.80) |

**How to Claim:**
- Credit applied automatically within 5 business days
- Customer notified via email
- Applied to next invoice

**Limits:**
- Maximum 1 credit per month per customer
- Does not apply if breach caused by customer delay
- Does not apply to free trial users

### Repeated Breaches

**If SLA breached 3+ times in 30 days:**
1. Executive review of account
2. Root cause analysis
3. Action plan to prevent future breaches
4. Potential offer: Free month, plan upgrade, dedicated support

---

## 7. Support Scope & Exclusions

### What's Included

✅ **Product Support:**
- How to use features
- Troubleshooting bugs
- Configuration assistance
- Best practices guidance

✅ **Account Support:**
- Password resets
- Email changes
- Plan upgrades/downgrades
- Billing questions

✅ **Technical Support:**
- Upload/extraction issues
- Notification problems
- Integration assistance
- Performance issues

✅ **Feedback & Requests:**
- Feature requests
- Product feedback
- Bug reports
- Improvement suggestions

---

### What's NOT Included

❌ **Not Covered:**

1. **Third-Party Applications:**
   - Issues with CRM, MLS, or other tools
   - We can help with integrations, but not the third-party app itself

2. **Training & Consulting:**
   - General real estate business advice
   - How to run your business
   - Transaction coordination best practices beyond our product

3. **Custom Development:**
   - Building custom features for individual customers
   - Writing custom integrations (unless on Enterprise plan)

4. **Legal/Financial Advice:**
   - Contract interpretation
   - Real estate law questions
   - Tax or accounting advice

5. **Data Recovery (Customer-Caused):**
   - If customer accidentally deletes data, we'll try to recover
   - No guarantee of recovery
   - No SLA applies

6. **Unsupported Browsers/Devices:**
   - Internet Explorer issues
   - Very old devices/browsers
   - Unsupported file formats

7. **Outage Due to Force Majeure:**
   - Acts of God, natural disasters
   - Third-party provider outages (AWS, Stripe, etc.)
   - Government actions

---

### Reasonable Use Policy

**To maintain quality for all customers, we reserve the right to:**

- Limit support interactions to a reasonable number per month
- Refer excessive support users to documentation or paid consulting
- Adjust SLA for customers who abuse the support system

**What's "excessive"?**
- > 50 support tickets per month
- Repeated questions already answered in Help Center
- Demands for immediate response on non-urgent issues

**Our Commitment:**
We'll always communicate clearly if we need to adjust support levels.

---

## 8. Scheduled Maintenance

### Maintenance Windows

**Regular Maintenance:**
- Sundays, 2 AM - 4 AM EST
- Duration: Usually < 1 hour
- Advance notice: 48 hours via email and in-app banner

**Emergency Maintenance:**
- As needed for critical security patches
- Advance notice: Best effort (may be immediate for critical issues)
- Duration: Usually < 30 minutes

**Impact:**
- Platform may be temporarily unavailable
- No SLA applies during scheduled maintenance
- We work to minimize downtime

### Status Page

Real-time status available at: status.[domain].com

Shows:
- ✅ All systems operational
- 🟡 Degraded performance
- 🔴 Partial outage
- ⛔ Major outage
- 🔧 Maintenance in progress

Subscribe for updates:
- Email notifications
- SMS alerts (Team Plan)
- Webhook (Enterprise)

---

## 9. Customer Responsibilities

### To Help Us Meet SLA

**Please:**

1. **Provide complete information:**
   - Clear description of issue
   - Steps to reproduce (if bug)
   - Screenshots/error messages
   - Your account email

2. **Respond promptly:**
   - If we ask for more info, reply quickly
   - SLA clock pauses while we wait for you

3. **Use appropriate channel:**
   - Simple question → In-app chat
   - Complex issue → Email
   - Critical emergency → Phone/Emergency line (Team Plan)

4. **Check Help Center first:**
   - Many common questions already answered
   - Faster than waiting for support

5. **Report bugs constructively:**
   - Describe what happened
   - What you expected to happen
   - Steps to reproduce

---

## 10. SLA Review & Updates

### Review Schedule

- **Quarterly Review:** Assess SLA performance, adjust targets if needed
- **Annual Review:** Comprehensive review of all SLA terms
- **As Needed:** Adjust based on customer feedback or business changes

### Changes to SLA

**If we change SLA terms:**
- 30 days advance notice via email
- Posted on our website: [domain]/sla
- Changes apply to new support requests after effective date
- Existing tickets governed by old SLA

---

## Appendix: SLA Quick Reference Card

### For Support Team

**Response Time Cheat Sheet:**

```
Starter Plan:
  - Standard: 24 hours
  - High: 16 hours
  - Critical: 8 hours

Professional Plan:
  - Standard: 12 hours
  - High: 8 hours
  - Critical: 4 hours

Team Plan:
  - Standard: 4 hours
  - High: 4 hours
  - Critical: 2 hours (24/7)
```

**Severity Quick Check:**

```
P0 Critical: Can't access platform, data lost
P1 High: Major feature broken, work blocked
P2 Standard: Question, minor issue, workaround exists
P3 Low: Cosmetic, nice-to-have, feedback
```

**When SLA is at risk:**
1. Alert team lead immediately
2. Prioritize this ticket
3. Send "working on it" update if needed
4. Document reason if breach is unavoidable

---

## Document Control

- **Version:** 1.0
- **Last Updated:** [Date]
- **Owner:** Customer Success Lead
- **Approved By:** [Founder Name]
- **Review Frequency:** Quarterly
- **Next Review:** [Date]

---

**Questions about this SLA?** Contact: support@[domain].com
