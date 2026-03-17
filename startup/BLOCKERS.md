# Blockers Log

## Critical Blockers (Cannot Proceed Without)

### B001: Supabase Credentials
- **What:** Need Supabase project URL and anon key
- **Why:** Database, auth, and storage all depend on this
- **Impact:** Cannot deploy, cannot test auth flows, cannot store data
- **Workaround:** Local SQLite for testing, mock auth in development
- **Status:** BLOCKED - Need Haz to create account
- **Created:** 2026-03-16 21:00 GMT
- **Owner:** Haz

### B002: OpenAI API Key
- **What:** Need OpenAI API key with GPT-4 Vision access
- **Why:** Core feature (contract extraction) requires this
- **Impact:** No AI extraction, product doesn't work
- **Workaround:** Mock extraction with sample data for testing
- **Status:** BLOCKED - Need Haz to create account
- **Created:** 2026-03-16 21:00 GMT
- **Owner:** Haz

### B003: Stripe Account
- **What:** Need Stripe account with products created
- **Why:** Billing system requires Stripe keys and product IDs
- **Impact:** Cannot accept payments, no revenue
- **Workaround:** Test mode with mock checkout
- **Status:** BLOCKED - Need Haz to create account
- **Created:** 2026-03-16 21:00 GMT
- **Owner:** Haz

### B004: Resend API Key
- **What:** Need Resend API key
- **Why:** Email notifications require this
- **Impact:** No automated emails, reminders don't send
- **Workaround:** Mock email sending (logs to console)
- **Status:** BLOCKED - Need Haz to create account
- **Created:** 2026-03-16 21:00 GMT
- **Owner:** Haz

### B005: Vercel Account
- **What:** Need Vercel account linked to GitHub
- **Why:** Deployment platform
- **Impact:** Cannot deploy to production
- **Workaround:** Local build and testing
- **Status:** BLOCKED - Need Haz to create account
- **Created:** 2026-03-16 21:00 GMT
- **Owner:** Haz

### B006: Domain DNS Access
- **What:** Need access to gravmap.co DNS settings
- **Why:** Point domain to Vercel deployment
- **Impact:** Site lives on .vercel.app subdomain
- **Workaround:** Use subdomain initially
- **Status:** BLOCKED - Need Haz to provide access
- **Created:** 2026-03-16 21:00 GMT
- **Owner:** Haz

## High Priority Blockers (Slows Progress)

### B013: Customer Validation Execution
- **What:** Need manual outreach to real estate agents
- **Why:** Subagents cannot send external messages
- **Impact:** Building without validation, high risk of failure
- **Workaround:** Framework complete, Haz needs to execute
- **Status:** BLOCKED - Need Haz to talk to 10 agents
- **Created:** 2026-03-17 00:57 GMT
- **Owner:** Haz
- **Time Required:** 2 hours
- **Files:** `/startup/validation/execution-plan.md`

## High Priority Blockers (Slows Progress)

### B007: Social Media Accounts
- **What:** Twitter, LinkedIn, Facebook business accounts
- **Why:** Marketing and distribution
- **Impact:** Cannot execute social media strategy
- **Workaround:** Create content, schedule for when accounts ready
- **Status:** BLOCKED - Need Haz to create accounts
- **Created:** 2026-03-16 21:00 GMT
- **Owner:** Haz

### B008: Google Analytics
- **What:** GA4 tracking ID
- **Why:** User behavior tracking, conversion optimization
- **Impact:** Flying blind on user behavior
- **Workaround:** Use Vercel Analytics initially
- **Status:** BLOCKED - Need Haz to create account
- **Created:** 2026-03-16 21:00 GMT
- **Owner:** Haz

### B009: Email Marketing Service
- **What:** ConvertKit, Mailchimp, or similar
- **Why:** nurture campaigns, newsletters
- **Impact:** Cannot build email list
- **Workaround:** Collect emails in database, export later
- **Status:** BLOCKED - Need Haz to choose and create account
- **Created:** 2026-03-16 21:00 GMT
- **Owner:** Haz

## Medium Priority Blockers (Nice to Have)

### B010: Help Scout / Intercom
- **What:** Customer support platform
- **Why:** Ticket management, live chat
- **Impact:** Support via email only
- **Workaround:** Email + Crisp free tier
- **Status:** BLOCKED - Need Haz to create account
- **Created:** 2026-03-16 21:00 GMT
- **Owner:** Haz

### B011: Task Management
- **What:** Linear, Jira, or Notion
- **Why:** Team coordination, sprint planning
- **Impact:** Using local files for tracking
- **Workaround:** Local markdown files in `/startup/issues/`
- **Status:** BLOCKED - Need Haz to create account
- **Created:** 2026-03-16 21:00 GMT
- **Owner:** Haz

### B012: Figma Team
- **What:** Figma team account
- **Why:** Design collaboration
- **Impact:** Design work in code only
- **Workaround:** Use free individual account
- **Status:** BLOCKED - Need Haz to create account
- **Created:** 2026-03-16 21:00 GMT
- **Owner:** Haz

## Resolved Blockers

(none yet)

---

## Summary

- **Critical:** 6 blockers (prevents deployment)
- **High:** 3 blockers (slows marketing)
- **Medium:** 3 blockers (operational efficiency)
- **Total:** 12 blockers

**Next Review:** When Haz wakes up (2026-03-17 ~07:00 GMT)
