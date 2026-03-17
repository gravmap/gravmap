# Bug Report Template

**Instructions:** Copy this template for each bug found. Save as `bug-YYYY-MM-DD-###.md`

---

# Bug Report

**Bug ID:** BUG-2026-0317-001  
**Date Reported:** March 17, 2026  
**Reporter:** [Name]  
**Environment:** [Dev/Staging/Production]  
**Browser/Device:** [Chrome 122, Safari 17, iPhone 14, etc.]  
**URL/Screen:** [Specific URL or screen name]

---

## Summary
[One-line description of the bug]

## Severity
- [ ] Critical (P0) - System crash, data loss, security issue, payment failure
- [ ] High (P1) - Major feature broken, significant user impact
- [ ] Medium (P2) - Feature partially impaired, workaround exists
- [ ] Low (P3) - Minor issue, cosmetic, minimal impact

## Priority
- [ ] Urgent - Fix immediately (blocks release or critical path)
- [ ] High - Fix this sprint
- [ ] Medium - Fix next sprint
- [ ] Low - Fix when possible

---

## Description
[Detailed description of the bug. What is happening vs what should happen?]

## Steps to Reproduce
1. [Step 1]
2. [Step 2]
3. [Step 3]
4. [Observe the issue]

## Expected Behavior
[What should happen]

## Actual Behavior
[What actually happened]

## Reproducibility
- [ ] Always (100%)
- [ ] Often (>50%)
- [ ] Sometimes (<50%)
- [ ] Rare (once or twice)
- [ ] Unable to reproduce

## Evidence

### Screenshots
[Drag and drop screenshots here or describe]

### Screen Recording
[Link to video if applicable]

### Console Logs
```
[Paste relevant console errors here]
```

### Network Requests
```
[Paste relevant network request/response]
```

---

## Impact Analysis

### User Impact
- [ ] All users affected
- [ ] Subset of users: [describe]
- [ ] Single user

### Functional Impact
- [ ] Complete blocker (cannot proceed)
- [ ] Partial blocker (workaround exists)
- [ ] Minor inconvenience
- [ ] Cosmetic only

### Business Impact
- [ ] Payment/Revenue affected
- [ ] User data at risk
- [ ] User trust/retention impact
- [ ] Brand/reputation impact
- [ ] None

---

## Environment Details

### Browser/Device
- **Browser:** [Chrome 122.0.6261.94]
- **OS:** [Windows 11, macOS 14.3, iOS 17.3]
- **Device:** [Desktop, iPhone 14, etc.]
- **Screen Size:** [1920x1080, mobile viewport, etc.]

### Account/User
- **Email:** [Test account email if specific]
- **Subscription:** [Free/Pro]
- **User Role:** [Standard user, admin, etc.]

### Network
- **Connection:** [WiFi, 4G, 3G, offline]
- **Speed:** [Fast, slow, throttled]

---

## Additional Context

### Related Issues
- [Link to related bugs or issues]

### Recent Changes
[Any recent deployments, changes, or updates that might be related]

### Notes
[Any additional information, observations, or theories]

---

## Resolution

### Root Cause
[To be filled by developer - What caused the bug?]

### Fix Description
[To be filled by developer - How was it fixed?]

### Code Changes
[To be filled by developer - PR link or commit references]

### Fixed In
[Version/Build number where fix was deployed]

---

## Testing

### Fix Verified By
[Name of tester who verified fix]

### Verification Date
[Date]

### Verification Steps
1. [Steps taken to verify fix]
2. [Include regression tests performed]

### Regression Testing
- [ ] Original bug no longer occurs
- [ ] Related features still work
- [ ] No new bugs introduced
- [ ] Edge cases tested

---

## Status Lifecycle

- [ ] **New** - Bug identified and logged
- [ ] **Triaged** - Priority and severity assigned
- [ ] **In Progress** - Developer working on fix
- [ ] **Fixed** - Code fix deployed to test environment
- [ ] **In Review** - QA verifying fix
- [ ] **Verified** - Fix confirmed working
- [ ] **Closed** - Bug verified and deployed to production
- [ ] **Reopened** - Bug still present after fix

---

## Approval

**Reviewed By:** [QA Lead name]  
**Approved By:** [Tech Lead name]  
**Deployment Approved:** [ ] Yes [ ] No

---

## Tags
[Add relevant tags for searching]
`authentication` `billing` `timeline` `ui` `api` `database` `email` `security` `mobile` `performance`

---

**Template Version:** 1.0  
**Last Updated:** March 17, 2026
