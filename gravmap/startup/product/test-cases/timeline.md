# Timeline Management Test Cases

**Module:** Timeline & Deadline Tracking  
**Priority:** Critical  
**Last Updated:** March 17, 2026

---

## TC-TL-001: View Generated Timeline

**Objective:** Verify timeline displays correctly after generation  
**Priority:** P0 (Critical)  
**Test Type:** Manual, E2E

### Preconditions
- Transaction exists
- Timeline generated with 5+ events

### Test Steps
1. Navigate to transaction detail
2. View timeline section

### Expected Results
- ✅ All events displayed
- ✅ Events in chronological order
- ✅ Each event shows: date, label, days remaining
- ✅ Status indicators (upcoming, overdue, completed)
- ✅ Visual timeline or list format
- ✅ Color coding by status

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-TL-002: Timeline Event Status - Upcoming

**Objective:** Verify upcoming event display  
**Priority:** P1 (High)  
**Test Type:** Manual

### Test Data
```
Event date: 7 days from today
```

### Expected Results
- ✅ Event shows as "Upcoming"
- ✅ "7 days remaining" displayed
- ✅ Green or neutral color
- ✅ Not marked as overdue

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-TL-003: Timeline Event Status - Overdue

**Objective:** Verify overdue event handling  
**Priority:** P0 (Critical)  
**Test Type:** Manual

### Test Data
```
Event date: 3 days ago (past)
```

### Expected Results
- ✅ Event shows as "Overdue"
- ✅ "3 days overdue" displayed
- ✅ Red or warning color
- ✅ Warning icon
- ✅ Prominent display
- ✅ Email notification sent (if enabled)

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-TL-004: Mark Event as Complete

**Objective:** Verify event completion  
**Priority:** P0 (Critical)  
**Test Type:** Manual, E2E

### Preconditions
- Event exists with upcoming status

### Test Steps
1. Click "Complete" button on event
2. Confirm completion

### Expected Results
- ✅ Event status changes to "Completed"
- ✅ Completion date recorded
- ✅ Visual change (checkmark, strikethrough, etc.)
- ✅ No longer triggers reminders
- ✅ Can un-complete if needed

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-TL-005: Mark Event as Cancelled

**Objective:** Verify event cancellation  
**Priority:** P1 (High)  
**Test Type:** Manual

### Test Steps
1. Click "Cancel" on event
2. Confirm cancellation

### Expected Results
- ✅ Event marked as "Cancelled"
- ✅ Removed from active timeline view
- ✅ Still visible in transaction history
- ✅ No notifications for cancelled events

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-TL-006: Edit Event Date

**Objective:** Verify event date modification  
**Priority:** P1 (High)  
**Test Type:** Manual

### Preconditions
- Event exists

### Test Steps
1. Click "Edit" on event
2. Change date to new value
3. Save changes

### Expected Results
- ✅ Date updated successfully
- ✅ Days remaining recalculated
- ✅ Event re-sorted chronologically
- ✅ Status updated (may become overdue/upcoming)
- ✅ Success toast displayed

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-TL-007: Add Note to Event

**Objective:** Verify event notes functionality  
**Priority:** P2 (Medium)  
**Test Type:** Manual

### Test Steps
1. Click "Add Note" on event
2. Enter note text
3. Save

### Expected Results
- ✅ Note saved to event
- ✅ Note visible on hover or in detail
- ✅ Can edit note later
- ✅ Can delete note

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-TL-008: Filter Timeline by Status

**Objective:** Verify timeline filtering  
**Priority:** P1 (High)  
**Test Type:** Manual

### Preconditions
- Timeline has events with different statuses

### Test Steps
1. Select "Upcoming" filter
2. Observe filtered results
3. Select "Overdue" filter
4. Select "Completed" filter
5. Select "All" filter

### Expected Results
- ✅ Only matching events shown
- ✅ Filter updates immediately
- ✅ Event counts update
- ✅ Clear indicator of active filter
- ✅ "All" shows everything

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-TL-009: Days Remaining Calculation

**Objective:** Verify accurate days remaining calculation  
**Priority:** P0 (Critical)  
**Test Type:** Manual

### Test Data
```
Test with dates:
- Tomorrow (1 day)
- In 3 days
- In 7 days
- In 30 days
- Yesterday (-1 day)
```

### Expected Results
- ✅ Tomorrow shows "1 day remaining"
- ✅ Past dates show "X days overdue"
- ✅ Correct singular/plural ("day" vs "days")
- ✅ Calculation accounts for today
- ✅ Updates at midnight

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-TL-010: Add Manual Event to Timeline

**Objective:** Verify manual event addition  
**Priority:** P1 (High)  
**Test Type:** Manual

### Test Steps
1. Click "Add Event" button
2. Enter date: 2026-05-15
3. Enter label: "Final Walkthrough"
4. Save

### Expected Results
- ✅ Event added to timeline
- ✅ Appears in chronological position
- ✅ All timeline features work (complete, edit, etc.)
- ✅ Notifications work for manual events

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-TL-011: Delete Event from Timeline

**Objective:** Verify event deletion  
**Priority:** P1 (High)  
**Test Type:** Manual

### Test Steps
1. Click "Delete" on event
2. Confirm deletion

### Expected Results
- ✅ Event removed from timeline
- ✅ Confirmation shown
- ✅ Cannot undo (or clear undo message)
- ✅ Timeline updates immediately

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-TL-012: Regenerate Timeline

**Objective:** Verify timeline regeneration  
**Priority:** P2 (Medium)  
**Test Type:** Manual

### Preconditions
- Timeline exists
- Document re-uploaded or data changed

### Test Steps
1. Click "Regenerate Timeline"
2. Confirm action

### Expected Results
- ✅ New timeline generated from extraction
- ✅ Warning about losing manual changes
- ✅ Option to merge or replace
- ✅ Completed events preserved (optional)

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-TL-013: Timeline Summary Stats

**Objective:** Verify timeline statistics  
**Priority:** P2 (Medium)  
**Test Type:** Manual

### Test Steps
1. View transaction detail
2. Check summary section

### Expected Results
- ✅ Total events count
- ✅ Upcoming events count
- ✅ Overdue events count
- ✅ Completed events count
- ✅ Counts accurate

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-TL-014: Timeline with Zero Events

**Objective:** Verify empty timeline state  
**Priority:** P2 (Medium)  
**Test Type:** Manual

### Test Steps
1. Create transaction without extraction
2. Don't add manual events
3. View timeline

### Expected Results
- ✅ Empty state message
- ✅ Message: "No events in timeline. Add events manually or upload a document."
- ✅ Clear call-to-action
- ✅ Professional UI

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-TL-015: Timeline Status Update at Midnight

**Objective:** Verify automatic status updates  
**Priority:** P1 (High)  
**Test Type:** Manual (Monitor)

### Test Steps
1. Note event status before midnight
2. Wait for midnight (or simulate)
3. Check event status after midnight

### Expected Results
- ✅ Days remaining decrements
- ✅ Events become overdue when date passes
- ✅ Status indicators update
- ✅ No manual refresh needed (if using real-time)

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-TL-016: Timeline on Mobile Device

**Objective:** Verify mobile timeline view  
**Priority:** P1 (High)  
**Test Type:** Manual

### Test Steps
1. View timeline on mobile device (< 640px)
2. Test interactions

### Expected Results
- ✅ Timeline readable on small screen
- ✅ Horizontal scroll if needed
- ✅ Touch interactions work
- ✅ All features accessible
- ✅ No layout issues

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-TL-017: Timeline Event with Same Day

**Objective:** Verify multiple events on same day  
**Priority:** P2 (Medium)  
**Test Type:** Manual

### Test Data
```
3 events all on same date
```

### Expected Results
- ✅ All events displayed
- ✅ Clear grouping or listing
- ✅ No visual confusion
- ✅ Can complete individually

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-TL-018: Print/Export Timeline

**Objective:** Verify timeline export functionality  
**Priority:** P3 (Low)  
**Test Type:** Manual

### Test Steps
1. Click "Print" or "Export" button
2. Generate PDF or print

### Expected Results
- ✅ Clean print layout
- ✅ All events visible
- ✅ Professional formatting
- ✅ Includes transaction info

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## Test Execution Summary

| Total | Pass | Fail | Blocked | Not Run |
|-------|------|------|---------|---------|
| 18    | 0    | 0    | 0       | 18      |
