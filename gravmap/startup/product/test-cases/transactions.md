# Transaction CRUD Test Cases

**Module:** Transaction Management  
**Priority:** Critical  
**Last Updated:** March 17, 2026

---

## TC-TRX-001: Create New Transaction - All Fields

**Objective:** Verify transaction creation with complete data  
**Priority:** P0 (Critical)  
**Test Type:** Manual, E2E

### Preconditions
- User is logged in
- User has available transaction slots (Free: < 3, Pro: unlimited)

### Test Data
```
Transaction Name: 123 Main Street Purchase
Client Name: John Smith
Client Email: john.smith@email.com
Property Address: 123 Main Street, Austin, TX 78701
Transaction Type: Purchase
Closing Date: 2026-04-15
Notes: Cash buyer, quick close requested
```

### Test Steps
1. Navigate to Dashboard
2. Click "New Transaction" button
3. Fill in all fields with test data
4. Click "Create Transaction"

### Expected Results
- ✅ Transaction created successfully
- ✅ Success toast displayed
- ✅ Redirected to transaction detail page
- ✅ All data saved correctly
- ✅ Transaction appears in dashboard list
- ✅ Transaction count updated

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-TRX-002: Create Transaction - Required Fields Only

**Objective:** Verify transaction creation with minimal required data  
**Priority:** P1 (High)  
**Test Type:** Manual

### Preconditions
- User is logged in

### Test Data
```
Transaction Name: Minimal Transaction
(All other fields empty)
```

### Test Steps
1. Navigate to new transaction page
2. Enter only transaction name
3. Click "Create Transaction"

### Expected Results
- ✅ Transaction created
- ✅ Only name field populated
- ✅ Other fields null/empty
- ✅ Can edit and add more data later

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-TRX-003: Create Transaction - Validation Errors

**Objective:** Verify form validation on transaction creation  
**Priority:** P1 (High)  
**Test Type:** Manual

### Preconditions
- User is logged in

### Test Data
```
Transaction Name: [Empty]
Closing Date: [Invalid date in past]
Client Email: invalid-email
```

### Test Steps
1. Navigate to new transaction page
2. Leave name empty
3. Enter invalid data
4. Click "Create Transaction"

### Expected Results
- ✅ Form not submitted
- ✅ Validation errors displayed for each invalid field
- ✅ Error messages clear and specific
- ✅ User can correct and resubmit

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-TRX-004: Create Transaction - Free Tier Limit

**Objective:** Verify free tier transaction limit enforcement  
**Priority:** P1 (High)  
**Test Type:** Manual, E2E

### Preconditions
- User is on Free tier
- User has 3 transactions (limit reached)

### Test Steps
1. Navigate to dashboard
2. Click "New Transaction"
3. Attempt to create 4th transaction

### Expected Results
- ✅ Upgrade prompt displayed
- ✅ Message: "You've reached your transaction limit. Upgrade to Pro for unlimited transactions."
- ✅ Cannot create new transaction
- ✅ Option to upgrade shown
- ✅ Existing transactions still accessible

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-TRX-005: View Transaction List

**Objective:** Verify transaction list displays correctly  
**Priority:** P0 (Critical)  
**Test Type:** Manual, E2E

### Preconditions
- User has at least 3 transactions

### Test Steps
1. Navigate to dashboard
2. Observe transaction list

### Expected Results
- ✅ All transactions displayed
- ✅ Each transaction shows: name, client, status, closing date
- ✅ Transactions sorted by closing date (soonest first)
- ✅ Clickable to view details
- ✅ Status indicators correct (active, completed, overdue)

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-TRX-006: Search Transactions

**Objective:** Verify transaction search functionality  
**Priority:** P1 (High)  
**Test Type:** Manual

### Preconditions
- User has multiple transactions with varied names/addresses

### Test Data
```
Search terms: "Main Street", "John Smith", "Austin"
```

### Test Steps
1. Navigate to dashboard
2. Enter search term in search box
3. Observe results

### Expected Results
- ✅ Results filter in real-time
- ✅ Matches on transaction name, client name, address
- ✅ Partial matches shown
- ✅ Case-insensitive search
- ✅ No results message if no matches

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-TRX-007: View Transaction Details

**Objective:** Verify transaction detail page displays all information  
**Priority:** P0 (Critical)  
**Test Type:** Manual, E2E

### Preconditions
- Transaction exists with complete data and timeline

### Test Steps
1. Click on transaction from list
2. Review transaction detail page

### Expected Results
- ✅ All transaction data displayed
- ✅ Client information visible
- ✅ Property address shown
- ✅ Timeline visible and complete
- ✅ Documents section visible
- ✅ Edit and delete options available
- ✅ Status updates visible

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-TRX-008: Edit Transaction - Update All Fields

**Objective:** Verify transaction can be fully updated  
**Priority:** P1 (High)  
**Test Type:** Manual

### Preconditions
- Transaction exists

### Test Data
```
Updated Name: 456 Oak Avenue Purchase
Updated Client: Jane Doe
Updated Closing Date: 2026-05-01
```

### Test Steps
1. Navigate to transaction detail
2. Click "Edit" button
3. Update all fields with new data
4. Click "Save Changes"

### Expected Results
- ✅ Changes saved successfully
- ✅ Success toast displayed
- ✅ Transaction detail page shows updated data
- ✅ Dashboard list reflects changes
- ✅ Update timestamp recorded

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-TRX-009: Edit Transaction - Partial Update

**Objective:** Verify individual field updates  
**Priority:** P2 (Medium)  
**Test Type:** Manual

### Preconditions
- Transaction exists

### Test Steps
1. Navigate to transaction detail
2. Edit just the closing date
3. Save changes

### Expected Results
- ✅ Only closing date updated
- ✅ Other fields unchanged
- ✅ Changes persisted
- ✅ Timeline recalculated (if applicable)

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-TRX-010: Delete Transaction - With Confirmation

**Objective:** Verify transaction deletion with confirmation  
**Priority:** P1 (High)  
**Test Type:** Manual, E2E

### Preconditions
- Transaction exists
- Transaction has associated timeline events and documents

### Test Steps
1. Navigate to transaction detail
2. Click "Delete" button
3. Confirm deletion in modal

### Expected Results
- ✅ Confirmation modal appears
- ✅ Warning message about data loss
- ✅ User must type transaction name or click confirm
- ✅ After confirmation, transaction deleted
- ✅ Redirected to dashboard
- ✅ Transaction no longer in list
- ✅ Related data (timeline, documents) also deleted

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-TRX-011: Delete Transaction - Cancel

**Objective:** Verify deletion can be cancelled  
**Priority:** P2 (Medium)  
**Test Type:** Manual

### Preconditions
- Transaction exists

### Test Steps
1. Click "Delete" button
2. In confirmation modal, click "Cancel"

### Expected Results
- ✅ Modal closes
- ✅ Transaction not deleted
- ✅ All data intact
- ✅ User remains on transaction detail page

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-TRX-012: Transaction Status - Active to Completed

**Objective:** Verify transaction status update to completed  
**Priority:** P1 (High)  
**Test Type:** Manual

### Preconditions
- Transaction has active status
- All timeline events completed

### Test Steps
1. Complete all timeline events
2. Observe transaction status

### Expected Results
- ✅ Transaction status automatically updates to "Completed"
- ✅ Completion date recorded
- ✅ Status badge updated in dashboard
- ✅ Transaction moved to "Completed" section

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-TRX-013: Empty State - No Transactions

**Objective:** Verify empty state for new users  
**Priority:** P2 (Medium)  
**Test Type:** Manual, E2E

### Preconditions
- User has zero transactions

### Test Steps
1. Navigate to dashboard

### Expected Results
- ✅ Empty state message displayed
- ✅ Message: "No transactions yet. Create your first transaction to get started."
- ✅ Clear call-to-action button
- ✅ Helpful onboarding hints
- ✅ Professional illustration or icon

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-TRX-014: Transaction with Special Characters

**Objective:** Verify handling of special characters in fields  
**Priority:** P2 (Medium)  
**Test Type:** Manual

### Preconditions
- User is logged in

### Test Data
```
Name: O'Brien & Smith's "Dream Home"
Address: 123 Main St., Apt #4-B (Unit 2)
Notes: Buyer's agent: Mary Johnson <mary@realty.com>
```

### Test Steps
1. Create transaction with special characters
2. Save transaction
3. View transaction
4. Edit transaction

### Expected Results
- ✅ Special characters accepted and stored
- ✅ Characters render correctly on display
- ✅ No XSS vulnerabilities (characters encoded)
- ✅ Can edit and save again
- ✅ Search works with special characters

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-TRX-015: Transaction with Long Text

**Objective:** Verify handling of long text values  
**Priority:** P2 (Medium)  
**Test Type:** Manual

### Test Data
```
Name: Extremely Long Transaction Name That Goes On And On And Should Be Truncated Or Wrapped Properly In The UI To Prevent Layout Issues
Notes: [500+ character notes field]
```

### Test Steps
1. Create transaction with very long text fields
2. View in list
3. View in detail

### Expected Results
- ✅ Long text stored without truncation
- ✅ UI handles gracefully (truncate with ellipsis or wrap)
- ✅ Full text visible on hover or in detail view
- ✅ No horizontal scrolling
- ✅ Layout not broken

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## Test Execution Summary

| Total | Pass | Fail | Blocked | Not Run |
|-------|------|------|---------|---------|
| 15    | 0    | 0    | 0       | 15      |

### Bugs Found
_Link to bugs logged during execution_
