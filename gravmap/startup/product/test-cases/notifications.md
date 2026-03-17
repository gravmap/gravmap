# Email Notifications Test Cases

**Module:** Email Notifications & Reminders  
**Priority:** High  
**Last Updated:** March 17, 2026

---

## TC-NOT-001: Deadline Reminder - 7 Days Before

**Objective:** Verify 7-day reminder email sent  
**Priority:** P0 (Critical)  
**Test Type:** Manual, E2E (with mock)

### Preconditions
- Transaction with deadline 7 days from now
- Email notifications enabled for user
- Email service configured (Resend)

### Test Steps
1. Create/set deadline to 7 days from now
2. Trigger cron job or wait for scheduled run
3. Check email inbox

### Expected Results
- ✅ Email received
- ✅ Subject includes transaction name
- ✅ Body includes deadline details
- ✅ "7 days" mentioned in email
- ✅ Link to transaction included
- ✅ Unsubscribe link present
- ✅ Professional formatting

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-NOT-002: Deadline Reminder - 3 Days Before

**Objective:** Verify 3-day reminder email  
**Priority:** P0 (Critical)  
**Test Type:** Manual

### Test Data
```
Deadline: 3 days from now
```

### Expected Results
- ✅ Email received at 3-day mark
- ✅ Urgency increased in messaging
- ✅ All details accurate
- ✅ Clear call-to-action

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-NOT-003: Deadline Reminder - 1 Day Before

**Objective:** Verify 1-day reminder email  
**Priority:** P0 (Critical)  
**Test Type:** Manual

### Expected Results
- ✅ Email received 1 day before
- ✅ High urgency messaging
- ✅ "Tomorrow" or "1 day" clearly stated
- ✅ Multiple reminders (if configured)

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-NOT-004: Overdue Deadline Notification

**Objective:** Verify overdue notifications  
**Priority:** P1 (High)  
**Test Type:** Manual

### Test Data
```
Deadline: Past date (overdue)
```

### Expected Results
- ✅ Email sent for overdue items
- ✅ "OVERDUE" prominently displayed
- ✅ Days overdue shown
- ✅ Urgency emphasized
- ✅ May repeat daily while overdue

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-NOT-005: Daily Digest Email

**Objective:** Verify daily digest functionality  
**Priority:** P1 (High)  
**Test Type:** Manual

### Preconditions
- Daily digest enabled in user settings
- Multiple upcoming deadlines (7-day window)

### Test Steps
1. Have multiple deadlines in next 7 days
2. Wait for digest (configured time)
3. Check email

### Expected Results
- ✅ Email received at configured time
- ✅ All upcoming events listed
- ✅ Overdue events highlighted
- ✅ Summary counts accurate
- ✅ Links to each transaction
- ✅ Professional formatting

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-NOT-006: Daily Digest - No Events

**Objective:** Verify digest when no upcoming events  
**Priority:** P2 (Medium)  
**Test Type:** Manual

### Preconditions
- No events in next 7 days

### Expected Results
- ✅ Option A: No email sent
- ✅ Option B: Email with "You're all caught up!" message
- ✅ User not spammed with empty digests

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-NOT-007: Client Status Update Email

**Objective:** Verify manual status update emails to clients  
**Priority:** P1 (High)  
**Test Type:** Manual

### Preconditions
- Transaction with client email
- User composes status update

### Test Steps
1. Navigate to transaction
2. Click "Send Update to Client"
3. Compose message
4. Preview email
5. Send

### Expected Results
- ✅ Email sent to client email
- ✅ Professional template
- ✅ Includes timeline summary
- ✅ Reply-to is agent's email
- ✅ Communication logged in database
- ✅ User sees "Email sent" confirmation

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-NOT-008: Notification Preferences - Toggle Off

**Objective:** Verify user can disable notifications  
**Priority:** P1 (High)  
**Test Type:** Manual, E2E

### Test Steps
1. Navigate to Settings > Notifications
2. Uncheck "Email reminders"
3. Save settings
4. Create deadline event
5. Wait for notification time

### Expected Results
- ✅ Settings saved successfully
- ✅ No email sent for reminders
- ✅ Toggle persists across sessions

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-NOT-009: Notification Preferences - Toggle On

**Objective:** Verify user can enable notifications  
**Priority:** P1 (High)  
**Test Type:** Manual

### Test Steps
1. With notifications disabled
2. Enable "Email reminders"
3. Save settings
4. Verify emails resume

### Expected Results
- ✅ Settings saved
- ✅ Emails sent going forward
- ✅ No missed emails recovered (only future)

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-NOT-010: Customize Reminder Days

**Objective:** Verify custom reminder intervals  
**Priority:** P2 (Medium)  
**Test Type:** Manual

### Test Steps
1. Go to Settings > Notifications
2. Change reminder days to [5, 2, 1]
3. Save
4. Create event
5. Verify emails sent at new intervals

### Expected Results
- ✅ Custom days saved
- ✅ Emails sent at 5, 2, 1 days before
- ✅ Default (7, 3, 1) no longer used

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-NOT-011: Customize Digest Time

**Objective:** Verify digest time customization  
**Priority:** P2 (Medium)  
**Test Type:** Manual

### Test Steps
1. Change digest time to 8:00 AM
2. Save settings
3. Wait for 8:00 AM

### Expected Results
- ✅ Digest sent at 8:00 AM
- ✅ Time in user's timezone
- ✅ Setting persists

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-NOT-012: Unsubscribe from Emails

**Objective:** Verify unsubscribe functionality  
**Priority:** P1 (High)  
**Test Type:** Manual

### Test Steps
1. Open reminder email
2. Click "Unsubscribe" link
3. Confirm unsubscribe

### Expected Results
- ✅ Unsubscribe page opens
- ✅ User can confirm unsubscribe
- ✅ Preference saved in database
- ✅ No more emails sent
- ✅ User can re-subscribe in settings

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-NOT-013: Email Template - Branding

**Objective:** Verify email branding and formatting  
**Priority:** P2 (Medium)  
**Test Type:** Manual

### Test Steps
1. Send test email
2. Review in multiple email clients

### Expected Results
- ✅ GravMap logo included
- ✅ Brand colors used
- ✅ Professional layout
- ✅ Works in Gmail, Outlook, Apple Mail
- ✅ Mobile-responsive email

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-NOT-014: Email Delivery Failure

**Objective:** Verify handling of bounced emails  
**Priority:** P2 (Medium)  
**Test Type:** Manual

### Test Data
```
Invalid client email: invalid@nonexistentdomain12345.com
```

### Expected Results
- ✅ Bounce detected
- ✅ User notified of delivery failure
- ✅ Error logged
- ✅ Transaction still functional
- ✅ Can update client email

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-NOT-015: Cron Job Execution

**Objective:** Verify cron job runs correctly  
**Priority:** P0 (Critical)  
**Test Type:** Manual, E2E

### Test Steps
1. Trigger cron endpoint manually
2. Verify emails sent for matching events
3. Check logs

### Expected Results
- ✅ Cron job completes successfully
- ✅ Correct events identified
- ✅ Emails sent without errors
- ✅ Duplicate emails prevented
- ✅ Execution logged

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-NOT-016: Cron Job Authentication

**Objective:** Verify cron endpoint is protected  
**Priority:** P1 (High)  
**Test Type:** Manual

### Test Steps
1. Try to access cron endpoint without secret
2. Try with invalid secret
3. Try with valid secret

### Expected Results
- ✅ Without secret: 401 Unauthorized
- ✅ Invalid secret: 403 Forbidden
- ✅ Valid secret: Job executes

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-NOT-017: Email with Mock Service

**Objective:** Verify email mocking for testing  
**Priority:** P1 (High)  
**Test Type:** Manual

### Preconditions
- Email service in mock mode (Resend not configured or mock flag set)

### Test Steps
1. Trigger email notification
2. Check mock email logs/inbox

### Expected Results
- ✅ Email logged but not sent
- ✅ Can view email content in logs
- ✅ Test assertions possible
- ✅ No actual emails sent

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-NOT-018: Multiple Events Same Day

**Objective:** Verify notifications for multiple same-day events  
**Priority:** P2 (Medium)  
**Test Type:** Manual

### Test Data
```
3 events all due tomorrow
```

### Expected Results
- ✅ Single email with all 3 events
- ✅ OR separate emails for each (based on design)
- ✅ All events clearly listed
- ✅ Links to each transaction

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-NOT-019: Completed Event - No Notification

**Objective:** Verify completed events don't trigger reminders  
**Priority:** P1 (High)  
**Test Type:** Manual

### Test Steps
1. Mark event as completed
2. Event date approaches
3. Check for emails

### Expected Results
- ✅ No reminder email sent
- ✅ Event excluded from notification logic

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-NOT-020: Email Content Accuracy

**Objective:** Verify all email content is accurate  
**Priority:** P1 (High)  
**Test Type:** Manual

### Test Data
```
Transaction: "456 Oak Ave Purchase"
Deadline: Inspection - March 25, 2026
Days: 7 days remaining
```

### Test Steps
1. Trigger email
2. Verify all details

### Expected Results
- ✅ Transaction name matches
- ✅ Event label matches
- ✅ Date formatted correctly
- ✅ Days remaining calculated correctly
- ✅ Links work
- ✅ No placeholder text

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## Test Execution Summary

| Total | Pass | Fail | Blocked | Not Run |
|-------|------|------|---------|---------|
| 20    | 0    | 0    | 0       | 20      |
