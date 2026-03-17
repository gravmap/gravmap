# Bug Tracking System

**Project:** GravMap  
**Started:** March 17, 2026  
**Last Updated:** March 17, 2026

---

## Overview

This directory contains all bug reports and issue tracking for the GravMap project. Each bug is documented as a separate markdown file using the standardized template.

---

## Bug Severity & Priority Definitions

### Severity Levels

#### Critical (P0)
**Definition:** System-breaking issues requiring immediate attention

**Examples:**
- Application crash or data loss
- Security vulnerabilities (XSS, SQL injection, auth bypass)
- Payment processing failures
- Complete feature non-functional
- Database corruption
- Authentication failures affecting all users

**Target Resolution:** < 4 hours  
**Escalation:** Immediate notification to entire team

---

#### High (P1)
**Definition:** Major functionality impaired with significant user impact

**Examples:**
- Core feature broken (but workaround exists)
- Document upload failing
- AI extraction consistently failing
- Email notifications not sending
- Billing portal inaccessible
- Timeline not generating
- Multiple users affected

**Target Resolution:** < 24 hours  
**Escalation:** Notify team lead and product owner

---

#### Medium (P2)
**Definition:** Feature partially impaired with moderate user impact

**Examples:**
- Non-critical feature not working
- UI glitches affecting usability
- Performance degradation
- Error messages unclear
- Minor data inconsistencies
- Single user affected (isolated)

**Target Resolution:** < 1 week (next sprint)  
**Escalation:** Add to sprint backlog

---

#### Low (P3)
**Definition:** Minor issues with minimal user impact

**Examples:**
- Cosmetic issues (color, spacing)
- Typographical errors
- Minor UI polish needed
- Enhancement suggestions
- Edge cases rarely encountered
- Performance optimization opportunities

**Target Resolution:** Next release or as time permits  
**Escalation:** Add to backlog, prioritize in planning

---

### Priority Levels

**Urgent:** Block release or critical business function  
**High:** Fix this sprint  
**Medium:** Fix next sprint  
**Low:** Fix when possible

---

## Bug Lifecycle

```
New → Triaged → In Progress → Fixed → In Review → Verified → Closed
  ↓                                                      ↑
  └──────────────── Reopened ←──────────────────────────┘
```

### Status Definitions

| Status | Description | Owner |
|--------|-------------|-------|
| **New** | Bug just reported, not yet reviewed | QA/Tester |
| **Triaged** | Severity and priority assigned, accepted as valid bug | QA Lead |
| **In Progress** | Developer actively working on fix | Developer |
| **Fixed** | Code fix deployed to test environment | Developer |
| **In Review** | QA verifying the fix | QA Tester |
| **Verified** | Fix confirmed working in test environment | QA Tester |
| **Closed** | Fix deployed to production and confirmed | QA Lead |
| **Reopened** | Bug still present after fix | QA Tester |
| **Won't Fix** | Bug accepted but won't be fixed (with justification) | Product Owner |
| **Cannot Reproduce** | Unable to reproduce, needs more info | QA/Developer |

---

## Bug Reporting Process

### For QA/Testers

1. **Identify Bug:** Discover issue during testing
2. **Reproduce:** Confirm bug is reproducible
3. **Document:** Fill out bug template completely
4. **Evidence:** Capture screenshots, videos, logs
5. **Save:** Create file as `bug-YYYY-MM-DD-###.md`
6. **Notify:** Alert team in communication channel

### For Developers

1. **Triage:** Review new bugs daily
2. **Assign:** Claim bug by moving to "In Progress"
3. **Investigate:** Find root cause
4. **Fix:** Implement fix
5. **Test:** Verify fix locally
6. **Deploy:** Push to test environment
7. **Update:** Change status to "Fixed"

### For QA (Verification)

1. **Review:** Check bugs in "Fixed" status
2. **Test:** Reproduce original bug (should be fixed)
3. **Regress:** Test related functionality
4. **Document:** Fill verification section
5. **Update:** Change status to "Verified" or "Reopened"

---

## File Naming Convention

```
bug-YYYY-MM-DD-###.md
```

**Examples:**
- `bug-2026-0317-001.md` - First bug on March 17, 2026
- `bug-2026-0317-002.md` - Second bug on March 17, 2026
- `bug-2026-0320-001.md` - First bug on March 20, 2026

---

## Directory Structure

```
startup/issues/
├── README.md                    # This file
├── bug-template.md              # Template for new bugs
├── active/                      # Open bugs
│   ├── bug-2026-0317-001.md
│   ├── bug-2026-0317-002.md
│   └── ...
├── resolved/                    # Fixed and verified bugs
│   ├── bug-2026-0315-001.md
│   └── ...
└── wont-fix/                    # Bugs that won't be fixed
    └── bug-2026-0310-001.md
```

---

## Bug Metrics to Track

### Weekly Metrics
- Total bugs opened this week
- Total bugs closed this week
- Bugs by severity (P0, P1, P2, P3)
- Average time to resolution by severity
- Bug trend (increasing/decreasing)

### Quality Metrics
- Bug reopen rate (% of bugs that were reopened)
- Bug leakage rate (bugs found in production)
- Defect density (bugs per feature/module)

---

## Escalation Matrix

| Severity | Notify | Response Time | Resolution Time |
|----------|--------|---------------|-----------------|
| Critical | All hands | 30 minutes | 4 hours |
| High | Tech Lead + PO | 2 hours | 24 hours |
| Medium | Team Lead | 1 day | 1 week |
| Low | Weekly standup | 1 week | Backlog |

---

## Integration with Development Workflow

### GitHub Integration (If using GitHub Issues)
1. Create GitHub issue from bug report
2. Link bug file in issue description
3. Add labels: `bug`, `severity: critical/high/medium/low`
4. Add to project board
5. Reference issue in PR

### Sprint Planning
1. Review all P0 and P1 bugs at sprint planning
2. Prioritize bugs over new features
3. Allocate capacity for bug fixes
4. Track bug resolution velocity

---

## Communication Channels

### Bug Reporting
- **Channel:** #bugs (Slack/Discord)
- **Format:** `@here BUG: [Severity] [Brief Description] [Link to bug file]`

### Critical Bug Alert
- **Channel:** #critical-alerts
- **Format:** `@everyone CRITICAL BUG: [Description] - [Link]`
- **Response:** All available team members respond

---

## Best Practices

### DO
✅ Reproduce bug before reporting  
✅ Include all evidence (screenshots, logs, videos)  
✅ Be specific in steps to reproduce  
✅ Test on multiple browsers/devices if relevant  
✅ Check if bug already reported  
✅ Include test account credentials if needed  
✅ Verify fix thoroughly before closing

### DON'T
❌ Report bugs without reproducing  
❌ Use vague descriptions ("it doesn't work")  
❌ Skip the template sections  
❌ Close bugs without verification  
❌ Assume bug is fixed without testing  
❌ Ignore low-severity bugs (they compound)

---

## Templates for Common Scenarios

### Regression Bug
Add to description:
```markdown
## Regression Information
- **Last Working Version:** [version/date]
- **First Broken Version:** [version/date]
- **Suspected Change:** [PR/commit if known]
```

### Performance Bug
Add to description:
```markdown
## Performance Metrics
- **Response Time:** [actual vs expected]
- **Load Time:** [actual vs expected]
- **Page Size:** [actual]
- **Network Requests:** [count]
```

### Security Bug
**⚠️ CONFIDENTIAL - Do not include sensitive details in bug file**  
Report security vulnerabilities privately to security team.  
Create sanitized bug report for tracking.

---

## Questions?

Contact QA Lead: [Name]  
Email: qa@gravmap.com  
Slack: @qalead

---

**Document Version:** 1.0  
**Last Reviewed:** March 17, 2026
