# Billing & Subscription Test Cases

**Module:** Billing, Payments & Subscriptions  
**Priority:** Critical  
**Last Updated:** March 17, 2026

---

## TC-BIL-001: View Pricing Page

**Objective:** Verify pricing page displays correctly  
**Priority:** P0 (Critical)  
**Test Type:** Manual, E2E

### Test Steps
1. Navigate to /pricing
2. Review pricing information

### Expected Results
- ✅ Free tier details displayed
- ✅ Pro tier details displayed ($29/month)
- ✅ Feature comparison visible
- ✅ "Get Started" buttons work
- ✅ Responsive design
- ✅ Clear value proposition

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-BIL-002: Initiate Pro Upgrade - Free User

**Objective:** Verify upgrade flow starts for free user  
**Priority:** P0 (Critical)  
**Test Type:** Manual, E2E

### Preconditions
- User on Free tier
- User logged in

### Test Steps
1. Click "Upgrade to Pro" button
2. Observe behavior

### Expected Results
- ✅ Checkout session created
- ✅ Redirected to Stripe Checkout
- ✅ Pro plan displayed in checkout
- ✅ $29/month price shown
- ✅ User's email pre-filled

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-BIL-003: Complete Stripe Checkout - Success

**Objective:** Verify successful payment flow  
**Priority:** P0 (Critical)  
**Test Type:** Manual, E2E

### Preconditions
- User on Free tier
- Stripe test mode active

### Test Data
```
Card: 4242 4242 4242 4242
Expiry: Any future date
CVC: Any 3 digits
```

### Test Steps
1. Initiate upgrade
2. Enter test card details
3. Complete checkout
4. Observe redirect

### Expected Results
- ✅ Payment successful
- ✅ Redirected to success page
- ✅ Subscription status updated in database
- ✅ User now on Pro tier
- ✅ Pro features unlocked
- ✅ Confirmation email sent (optional)

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-BIL-004: Stripe Checkout - Declined Card

**Objective:** Verify declined card handling  
**Priority:** P1 (High)  
**Test Type:** Manual

### Test Data
```
Card: 4000 0000 0000 0002 (decline test card)
```

### Test Steps
1. Enter declined card
2. Submit payment

### Expected Results
- ✅ Payment declined
- ✅ Clear error message from Stripe
- ✅ User can retry with different card
- ✅ No subscription created
- ✅ User remains on Free tier

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-BIL-005: Stripe Checkout - Requires Authentication

**Objective:** Verify 3D Secure handling  
**Priority:** P1 (High)  
**Test Type:** Manual

### Test Data
```
Card: 4000 0025 0000 3155 (requires auth)
```

### Expected Results
- ✅ Authentication modal appears
- ✅ User can complete or fail auth
- ✅ Payment completes after auth
- ✅ Subscription created on success

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-BIL-006: Access Stripe Billing Portal

**Objective:** Verify billing portal access  
**Priority:** P1 (High)  
**Test Type:** Manual

### Preconditions
- User has active subscription (Pro)

### Test Steps
1. Navigate to Settings
2. Click "Manage Subscription" or "Billing Portal"

### Expected Results
- ✅ Redirected to Stripe billing portal
- ✅ Current plan displayed
- ✅ Can update payment method
- ✅ Can view invoices
- ✅ Can cancel subscription

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-BIL-007: Cancel Subscription

**Objective:** Verify subscription cancellation  
**Priority:** P1 (High)  
**Test Type:** Manual

### Preconditions
- User on Pro tier

### Test Steps
1. Access billing portal
2. Click "Cancel Subscription"
3. Confirm cancellation

### Expected Results
- ✅ Subscription cancelled
- ✅ Access continues until billing period ends
- ✅ User downgraded to Free at period end
- ✅ Confirmation email sent
- ✅ Can re-subscribe

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-BIL-008: Update Payment Method

**Objective:** Verify payment method update  
**Priority:** P1 (High)  
**Test Type:** Manual

### Test Steps
1. Access billing portal
2. Update payment method
3. Save changes

### Expected Results
- ✅ New card accepted
- ✅ Future charges use new card
- ✅ Confirmation shown

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-BIL-009: Download Invoice

**Objective:** Verify invoice download  
**Priority:** P2 (Medium)  
**Test Type:** Manual

### Preconditions
- User has at least one paid invoice

### Test Steps
1. Access billing portal
2. View invoice history
3. Download invoice PDF

### Expected Results
- ✅ Invoice list displayed
- ✅ PDF downloads successfully
- ✅ Invoice contains correct details
- ✅ Professional formatting

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-BIL-010: Webhook - checkout.session.completed

**Objective:** Verify webhook handling for successful checkout  
**Priority:** P0 (Critical)  
**Test Type:** Manual, E2E

### Preconditions
- Stripe webhook configured
- Webhook secret set

### Test Steps
1. Complete Stripe checkout
2. Verify webhook received
3. Check database

### Expected Results
- ✅ Webhook received by endpoint
- ✅ Signature validated
- ✅ User subscription_status updated to "active"
- ✅ Stripe customer ID saved
- ✅ Subscription ID saved
- ✅ Database transaction atomic

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-BIL-011: Webhook - customer.subscription.updated

**Objective:** Verify subscription update webhook  
**Priority:** P1 (High)  
**Test Type:** Manual

### Test Steps
1. Update subscription in Stripe (e.g., change plan)
2. Verify webhook processed

### Expected Results
- ✅ Webhook received
- ✅ User status updated
- ✅ Changes reflected in app

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-BIL-012: Webhook - customer.subscription.deleted

**Objective:** Verify subscription deletion webhook  
**Priority:** P1 (High)  
**Test Type:** Manual

### Test Steps
1. Cancel subscription
2. Verify webhook at period end (or immediate)
3. Check database

### Expected Results
- ✅ Webhook received
- ✅ User downgraded to Free
- ✅ subscription_status = "inactive"
- ✅ Access restricted appropriately

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-BIL-013: Webhook - invoice.payment_failed

**Objective:** Verify payment failure webhook  
**Priority:** P1 (High)  
**Test Type:** Manual

### Test Steps
1. Simulate payment failure (Stripe test)
2. Verify webhook processed

### Expected Results
- ✅ Webhook received
- ✅ User notified of payment failure
- ✅ Grace period applied (optional)
- ✅ Retry logic handled by Stripe

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-BIL-014: Webhook Security - Invalid Signature

**Objective:** Verify webhook signature validation  
**Priority:** P0 (Critical)  
**Test Type:** Manual

### Test Steps
1. Send webhook with invalid signature
2. Observe response

### Expected Results
- ✅ Request rejected (400/401)
- ✅ No database changes
- ✅ Error logged

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-BIL-015: Free Tier Transaction Limit Enforcement

**Objective:** Verify 3-transaction limit for free users  
**Priority:** P0 (Critical)  
**Test Type:** Manual, E2E

### Preconditions
- User on Free tier
- User has 2 transactions

### Test Steps
1. Create 3rd transaction (should succeed)
2. Attempt to create 4th transaction

### Expected Results
- ✅ 3rd transaction created successfully
- ✅ 4th transaction blocked
- ✅ Upgrade prompt displayed
- ✅ Message: "Free tier limited to 3 transactions"
- ✅ Cannot create more until upgrade

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-BIL-016: Pro Tier Unlimited Transactions

**Objective:** Verify unlimited transactions for Pro users  
**Priority:** P1 (High)  
**Test Type:** Manual

### Preconditions
- User on Pro tier

### Test Steps
1. Create multiple transactions (10+)
2. Verify no limit

### Expected Results
- ✅ All transactions created successfully
- ✅ No upgrade prompts
- ✅ No transaction limit errors

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-BIL-017: Feature Gating - Pro Only

**Objective:** Verify Pro-only features are gated  
**Priority:** P1 (High)  
**Test Type:** Manual

### Test Steps (if applicable)
1. As Free user, try to access Pro feature
2. Observe gating

### Expected Results
- ✅ Pro feature not accessible
- ✅ Upgrade prompt shown
- ✅ Clear messaging about Pro requirement

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-BIL-018: Upgrade Prompt Placement

**Objective:** Verify upgrade prompts appear appropriately  
**Priority:** P2 (Medium)  
**Test Type:** Manual

### Test Steps
1. As Free user, use application
2. Note upgrade prompt locations

### Expected Results
- ✅ Prompt on transaction limit reached
- ✅ Prompt in settings
- ✅ Prompt in navbar (optional badge)
- ✅ Not overly aggressive/spammy

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-BIL-019: Subscription Status Display

**Objective:** Verify subscription status shown in UI  
**Priority:** P2 (Medium)  
**Test Type:** Manual

### Test Steps
1. As Pro user, check settings
2. As Free user, check settings

### Expected Results
- ✅ Current plan clearly displayed
- ✅ "Pro" badge for Pro users
- ✅ "Free" label for Free users
- ✅ Next billing date (Pro)
- ✅ Transaction usage (Free)

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-BIL-020: Refund Handling (Manual)

**Objective:** Verify app handles manual refunds correctly  
**Priority:** P2 (Medium)  
**Test Type:** Manual

### Test Steps
1. Admin issues refund via Stripe dashboard
2. Check user status

### Expected Results
- ✅ Subscription cancelled or adjusted
- ✅ User status updated
- ✅ User notified (optional)

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-BIL-021: Downgrade at Period End

**Objective:** Verify graceful downgrade  
**Priority:** P1 (High)  
**Test Type:** Manual

### Preconditions
- User cancelled subscription
- Period not yet ended

### Test Steps
1. Cancel subscription
2. Continue using Pro features until period end
3. Check access after period ends

### Expected Results
- ✅ Pro features work until period end
- ✅ Access downgraded at period end
- ✅ Transaction limit enforced (keep oldest 3 or block new)
- ✅ User notified of downgrade

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-BIL-022: Stripe Test Mode vs Live Mode

**Objective:** Verify test mode works independently  
**Priority:** P1 (High)  
**Test Type:** Manual

### Test Steps
1. Use test mode keys
2. Complete test checkout
3. Verify no real charges

### Expected Results
- ✅ Test charges not real
- ✅ Test data isolated
- ✅ Can switch to live mode cleanly
- ✅ Environment variable toggle works

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## Test Execution Summary

| Total | Pass | Fail | Blocked | Not Run |
|-------|------|------|---------|---------|
| 22    | 0    | 0    | 0       | 22      |

### Stripe Test Cards Reference
- Success: 4242 4242 4242 4242
- Decline: 4000 0000 0000 0002
- Auth required: 4000 0025 0000 3155
- Insufficient funds: 4000 0000 0000 9995
