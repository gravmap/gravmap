# Settings Management Test Cases

**Module:** User Settings & Preferences  
**Priority:** High  
**Last Updated:** March 17, 2026

---

## TC-SET-001: Access Settings Page

**Objective:** Verify settings page is accessible  
**Priority:** P1 (High)  
**Test Type:** Manual, E2E

### Test Steps
1. Login as user
2. Navigate to Settings

### Expected Results
- ✅ Settings page loads
- ✅ All settings sections visible
- ✅ Current values populated
- ✅ Can edit settings

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-SET-002: Update Profile Information

**Objective:** Verify profile update functionality  
**Priority:** P1 (High)  
**Test Type:** Manual

### Test Data
```
Name: John Doe
Email: john.doe@example.com
Phone: +1-555-123-4567
```

### Test Steps
1. Navigate to Profile settings
2. Update name
3. Update phone
4. Click Save

### Expected Results
- ✅ Changes saved successfully
- ✅ Success toast displayed
- ✅ Changes reflected in UI
- ✅ Name updated in navbar
- ✅ Database updated

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-SET-003: Update Email Address

**Objective:** Verify email change flow  
**Priority:** P1 (High)  
**Test Type:** Manual

### Test Steps
1. Navigate to Profile settings
2. Enter new email address
3. Save changes
4. Check for verification email

### Expected Results
- ✅ Email change initiated
- ✅ Verification email sent to new address
- ✅ Old email still active until verified
- ✅ Cannot use already-taken email
- ✅ Confirmation required for security

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-SET-004: Change Password

**Objective:** Verify password change functionality  
**Priority:** P0 (Critical)  
**Test Type:** Manual, E2E

### Test Data
```
Current Password: OldPass123!
New Password: NewSecurePass456!
```

### Test Steps
1. Navigate to Security settings
2. Enter current password
3. Enter new password
4. Confirm new password
5. Save

### Expected Results
- ✅ Password updated successfully
- ✅ User logged out (optional, for security)
- ✅ Can login with new password
- ✅ Old password no longer works
- ✅ Password requirements enforced

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-SET-005: Change Password - Wrong Current Password

**Objective:** Verify current password validation  
**Priority:** P1 (High)  
**Test Type:** Manual

### Test Steps
1. Enter wrong current password
2. Enter new password
3. Submit

### Expected Results
- ✅ Error message: "Current password is incorrect"
- ✅ Password not changed
- ✅ Can retry

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-SET-006: Notification Preferences - Email Reminders

**Objective:** Verify email reminder toggle  
**Priority:** P1 (High)  
**Test Type:** Manual, E2E

### Test Steps
1. Navigate to Notification settings
2. Toggle "Email Reminders" off
3. Save
4. Toggle back on
5. Save

### Expected Results
- ✅ Toggle state saved
- ✅ When off: no reminder emails
- ✅ When on: reminder emails sent
- ✅ State persists across sessions

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-SET-007: Notification Preferences - Daily Digest

**Objective:** Verify daily digest toggle  
**Priority:** P1 (High)  
**Test Type:** Manual

### Test Steps
1. Toggle "Daily Digest" on
2. Save
3. Verify digest received next day

### Expected Results
- ✅ Setting saved
- ✅ Digest sent when enabled
- ✅ No digest when disabled

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-SET-008: Notification Preferences - Weekly Digest

**Objective:** Verify weekly digest toggle  
**Priority:** P2 (Medium)  
**Test Type:** Manual

### Expected Results
- ✅ Weekly digest toggle works
- ✅ Sent on configured day
- ✅ Can disable

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-SET-009: Customize Reminder Days

**Objective:** Verify custom reminder interval  
**Priority:** P2 (Medium)  
**Test Type:** Manual

### Test Data
```
Reminder Days: [10, 5, 2, 1]
```

### Test Steps
1. Navigate to Notifications
2. Modify reminder days
3. Save

### Expected Results
- ✅ Custom days saved
- ✅ Reminders sent at new intervals
- ✅ UI shows selected days
- ✅ Can reset to defaults

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-SET-010: Set Digest Time

**Objective:** Verify digest time customization  
**Priority:** P2 (Medium)  
**Test Type:** Manual

### Test Data
```
Digest Time: 08:00 AM
```

### Test Steps
1. Set digest time to 8:00 AM
2. Save
3. Verify email at 8:00 AM

### Expected Results
- ✅ Time saved
- ✅ Digest sent at configured time
- ✅ Time in user's timezone
- ✅ Can change time

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-SET-011: Dark Mode Toggle

**Objective:** Verify dark mode preference  
**Priority:** P2 (Medium)  
**Test Type:** Manual

### Test Steps
1. Navigate to Appearance settings
2. Toggle Dark Mode on
3. Observe UI
4. Toggle off

### Expected Results
- ✅ Theme changes immediately
- ✅ All pages support dark mode
- ✅ Preference persists
- ✅ System preference respected (optional)

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-SET-012: Delete Account

**Objective:** Verify account deletion flow  
**Priority:** P0 (Critical)  
**Test Type:** Manual, E2E

### Test Steps
1. Navigate to Account settings
2. Click "Delete Account"
3. Confirm deletion (may require password or typing confirmation)
4. Observe behavior

### Expected Results
- ✅ Confirmation modal appears
- ✅ Warning about data loss
- ✅ Must type "DELETE" or similar to confirm
- ✅ Account and all data deleted
- ✅ User logged out
- ✅ Cannot login with old credentials
- ✅ Transactions, documents all removed
- ✅ Subscription cancelled (if applicable)

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-SET-013: Delete Account - Cancel

**Objective:** Verify deletion can be cancelled  
**Priority:** P2 (Medium)  
**Test Type:** Manual

### Test Steps
1. Click "Delete Account"
2. Click "Cancel" in confirmation modal

### Expected Results
- ✅ Modal closes
- ✅ Account not deleted
- ✅ All data intact

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-SET-014: View Current Subscription

**Objective:** Verify subscription status display  
**Priority:** P1 (High)  
**Test Type:** Manual

### Test Steps
1. Navigate to Billing settings
2. View current plan

### Expected Results
- ✅ Current plan shown (Free/Pro)
- ✅ Billing date shown (if Pro)
- ✅ Usage stats shown
- ✅ Upgrade/downgrade options available

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-SET-015: Manage Subscription

**Objective:** Verify subscription management access  
**Priority:** P1 (High)  
**Test Type:** Manual

### Test Steps
1. Click "Manage Subscription"
2. Access Stripe portal

### Expected Results
- ✅ Redirected to Stripe billing portal
- ✅ Can update payment method
- ✅ Can cancel subscription
- ✅ Can view invoices

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-SET-016: Export User Data

**Objective:** Verify data export (if implemented)  
**Priority:** P3 (Low)  
**Test Type:** Manual

### Test Steps
1. Navigate to Privacy/Data settings
2. Request data export
3. Download exported data

### Expected Results
- ✅ Export generated
- ✅ Includes all user data
- ✅ JSON or CSV format
- ✅ Download link provided

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-SET-017: Session Management

**Objective:** Verify active sessions display (if implemented)  
**Priority:** P2 (Medium)  
**Test Type:** Manual

### Test Steps
1. View active sessions
2. Revoke a session

### Expected Results
- ✅ All active sessions listed
- ✅ Can see device, location, time
- ✅ Can revoke individual sessions
- ✅ Revoked session logged out

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-SET-018: Two-Factor Authentication (If Implemented)

**Objective:** Verify 2FA setup  
**Priority:** P1 (High)  
**Test Type:** Manual

### Test Steps
1. Navigate to Security settings
2. Enable 2FA
3. Setup authenticator app
4. Verify 2FA works on login

### Expected Results
- ✅ QR code displayed for setup
- ✅ 2FA enabled successfully
- ✅ Login requires 2FA code
- ✅ Can disable 2FA
- ✅ Backup codes provided

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-SET-019: Settings Persistence

**Objective:** Verify settings persist across sessions  
**Priority:** P1 (High)  
**Test Type:** Manual

### Test Steps
1. Change multiple settings
2. Logout
3. Login again
4. Check settings

### Expected Results
- ✅ All changes persisted
- ✅ Settings unchanged after relogin
- ✅ No values reverted

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-SET-020: Settings Validation

**Objective:** Verify input validation in settings  
**Priority:** P1 (High)  
**Test Type:** Manual

### Test Data
```
Invalid inputs to test:
- Empty name
- Invalid email format
- Invalid phone format
- Future date for birthday
```

### Expected Results
- ✅ Validation errors displayed
- ✅ Invalid data not saved
- ✅ Clear error messages
- ✅ Can correct and retry

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-SET-021: Timezone Selection

**Objective:** Verify timezone setting (if implemented)  
**Priority:** P2 (Medium)  
**Test Type:** Manual

### Test Data
```
Timezone: America/New_York
```

### Test Steps
1. Change timezone
2. Save
3. Check deadline times

### Expected Results
- ✅ Timezone saved
- ✅ Deadlines displayed in selected timezone
- ✅ Emails sent in correct time
- ✅ Digest sent at correct local time

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-SET-022: Language Preference

**Objective:** Verify language setting (if implemented)  
**Priority:** P3 (Low)  
**Test Type:** Manual

### Test Steps
1. Change language
2. Save
3. Check UI

### Expected Results
- ✅ UI language changed
- ✅ All text updated
- ✅ Preference saved

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-SET-023: Connected Accounts

**Objective:** Verify third-party integrations (if implemented)  
**Priority:** P3 (Low)  
**Test Type:** Manual

### Test Steps
1. Navigate to Integrations
2. Connect/disconnect account

### Expected Results
- ✅ Can connect Google, etc.
- ✅ Can disconnect
- ✅ Connection status shown

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-SET-024: Help & Support Link

**Objective:** Verify help link from settings  
**Priority:** P3 (Low)  
**Test Type:** Manual

### Test Steps
1. Click "Help & Support" link
2. Verify destination

### Expected Results
- ✅ Redirected to /help page
- ✅ Support resources accessible

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## Test Execution Summary

| Total | Pass | Fail | Blocked | Not Run |
|-------|------|------|---------|---------|
| 24    | 0    | 0    | 0       | 24      |
