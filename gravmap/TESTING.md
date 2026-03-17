# Testing Checklist

Complete testing checklist for GravMap. Use this before launching and for regular QA.

## 🔐 Authentication Flow

### Signup
- [ ] Can access signup page from landing page
- [ ] Signup form validation works (email format, password strength)
- [ ] Can create account with valid credentials
- [ ] Verification email is sent
- [ ] Can verify email with link
- [ ] Redirected to onboarding after verification
- [ ] Error shown for duplicate email
- [ ] Password requirements are enforced

### Login
- [ ] Can login with correct credentials
- [ ] Redirected to dashboard after login
- [ ] Error shown for invalid credentials
- [ ] "Remember me" persists session
- [ ] Can login with Enter key

### Password Reset
- [ ] Can request password reset
- [ ] Reset email is sent
- [ ] Can reset password with valid token
- [ ] Token expires after use
- [ ] Can login with new password

### Logout
- [ ] Can logout from dashboard
- [ ] Session is cleared
- [ ] Redirected to home page
- [ ] Cannot access protected routes after logout

### Auth Protection
- [ ] Unauthenticated users redirected to login
- [ ] Authenticated users can access dashboard
- [ ] Session persists across page refreshes
- [ ] Session expires appropriately

---

## 📝 Transaction Management

### Create Transaction
- [ ] Can access new transaction page
- [ ] Form validation works (required fields)
- [ ] Can save transaction without document
- [ ] Transaction appears in dashboard list
- [ ] Can edit transaction details

### Document Upload
- [ ] Can upload PDF file
- [ ] Can upload DOCX file
- [ ] Can upload image files (JPG, PNG)
- [ ] File size validation works (max 10MB)
- [ ] Upload progress shown
- [ ] Can see uploaded document
- [ ] Can replace document
- [ ] Can delete document

### AI Extraction
- [ ] Extraction starts after upload
- [ ] Loading state shown during extraction
- [ ] Extraction completes successfully
- [ ] Extracted data is displayed
- [ ] Can edit extracted data
- [ ] Can add missing dates manually
- [ ] Can remove incorrect entries
- [ ] Can confirm extraction
- [ ] Error handling for extraction failure

### Timeline Generation
- [ ] Timeline generates automatically after confirmation
- [ ] All events appear in timeline
- [ ] Event dates are correct
- [ ] Days remaining calculated correctly
- [ ] Status indicators show correctly (upcoming/overdue)
- [ ] Can regenerate timeline
- [ ] Manual edits are preserved on regenerate

### Timeline Management
- [ ] Can mark events as complete
- [ ] Can cancel events
- [ ] Can edit event dates
- [ ] Can add notes to events
- [ ] Can filter by status
- [ ] Status updates correctly at midnight
- [ ] Summary stats are accurate

---

## 📧 Email Notifications

### Deadline Reminders
- [ ] Reminders sent at configured intervals (7, 3, 1 days)
- [ ] Email contains correct transaction details
- [ ] Email contains correct deadline information
- [ ] Links in email work correctly
- [ ] Unsubscribe link works
- [ ] Only enabled users receive emails

### Daily Digest
- [ ] Digest sent at configured time
- [ ] Contains all upcoming events (7 days)
- [ ] Overdue items highlighted
- [ ] Summary counts are accurate
- [ ] "All caught up" message when no events

### Client Status Updates
- [ ] Can compose status update
- [ ] Can preview email before sending
- [ ] Email sent successfully
- [ ] Email contains timeline summary
- [ ] Reply-to is agent's email
- [ ] Communication logged in database

### Notification Preferences
- [ ] Can access notification settings
- [ ] Can toggle email reminders
- [ ] Can toggle daily digest
- [ ] Can toggle weekly digest
- [ ] Can customize reminder days
- [ ] Can set digest time
- [ ] Settings persist after save

---

## 💳 Billing & Payments

### Pricing Page
- [ ] Pricing page loads correctly
- [ ] Free and Pro plans displayed
- [ ] Feature comparison is accurate
- [ ] "Get Started" buttons work

### Stripe Checkout
- [ ] Checkout session created successfully
- [ ] Redirects to Stripe checkout
- [ ] Can complete payment (test card: 4242 4242 4242 4242)
- [ ] Redirected back to success page
- [ ] Subscription status updated in database
- [ ] Pro features unlocked

### Subscription Management
- [ ] Can view current plan
- [ ] Can access billing portal
- [ ] Can update payment method
- [ ] Can cancel subscription
- [ ] Can download invoices

### Webhook Events
- [ ] checkout.session.completed processed
- [ ] customer.subscription.updated processed
- [ ] customer.subscription.deleted processed
- [ ] invoice.payment_failed processed
- [ ] Database updated correctly
- [ ] User notified of status changes

### Access Control
- [ ] Free users limited to 3 transactions
- [ ] Pro users have unlimited transactions
- [ ] Free users see upgrade prompts
- [ ] Pro features are gated correctly

---

## 🎨 UI/UX

### Loading States
- [ ] Loading spinner shown during async operations
- [ ] Skeleton loaders for content
- [ ] Button loading states
- [ ] Overlay loading for critical operations

### Error Handling
- [ ] Error boundaries catch errors gracefully
- [ ] User-friendly error messages
- [ ] Retry options available
- [ ] Error logging works

### Success Feedback
- [ ] Success toasts for completed actions
- [ ] Visual confirmation of saves
- [ ] Clear success states

### Responsive Design
- [ ] Works on mobile (< 640px)
- [ ] Works on tablet (768px)
- [ ] Works on desktop (1024px+)
- [ ] Navigation adapts to screen size
- [ ] Forms are usable on mobile
- [ ] Tables scroll horizontally on mobile
- [ ] Images scale correctly

### Dark Mode
- [ ] Can toggle dark mode
- [ ] All pages support dark mode
- [ ] Colors are readable in dark mode
- [ ] Preference persists

### Accessibility
- [ ] Keyboard navigation works
- [ ] Focus states visible
- [ ] Screen reader friendly (basic)
- [ ] Color contrast is sufficient

---

## 🔍 Search & Filtering

### Transaction Search
- [ ] Can search by transaction name
- [ ] Can search by client name
- [ ] Can search by address
- [ ] Results update in real-time
- [ ] Empty state shown when no results

### Timeline Filtering
- [ ] Can filter by "All"
- [ ] Can filter by "Upcoming"
- [ ] Can filter by "Overdue"
- [ ] Can filter by "Completed"
- [ ] Filter updates immediately
- [ ] Counts update with filters

---

## 🚀 Performance

### Page Load
- [ ] Landing page loads < 3s
- [ ] Dashboard loads < 2s
- [ ] Transaction detail loads < 2s
- [ ] Images optimized

### API Response
- [ ] API responses < 500ms (typical)
- [ ] Large lists paginate
- [ ] Infinite scroll works (if implemented)

### Database
- [ ] Queries use indexes
- [ ] No N+1 queries
- [ ] RLS policies efficient

---

## 🔒 Security

### Authentication
- [ ] Passwords hashed (Supabase handles this)
- [ ] Sessions expire appropriately
- [ ] CSRF protection (Next.js handles this)
- [ ] Rate limiting on auth endpoints

### Authorization
- [ ] Users can only see their own data
- [ ] RLS policies enforced
- [ ] API routes check authentication
- [ ] Service role key not exposed

### Data Protection
- [ ] Sensitive data encrypted at rest
- [ ] HTTPS only
- [ ] Documents stored securely
- [ ] API keys not in client code (except NEXT_PUBLIC_*)

---

## 📱 Mobile Testing

### Browsers
- [ ] Safari (iOS)
- [ ] Chrome (Android)
- [ ] Firefox Mobile

### Scenarios
- [ ] Can sign up on mobile
- [ ] Can upload document on mobile
- [ ] Can view timeline on mobile
- [ ] Can edit transaction on mobile
- [ ] Touch interactions work
- [ ] No horizontal scroll issues
- [ ] Text is readable

---

## 🌐 Browser Testing

### Desktop Browsers
- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Edge (latest)

### Scenarios
- [ ] All features work across browsers
- [ ] No console errors
- [ ] Styles consistent
- [ ] Performance acceptable

---

## 🔄 Integration Testing

### End-to-End Flows

#### Happy Path
1. [ ] Sign up → Verify email → Complete onboarding → Create transaction → Upload document → Extract → Confirm → View timeline

#### Payment Flow
1. [ ] Login → View pricing → Select plan → Checkout → Complete payment → Verify Pro access

#### Notification Flow
1. [ ] Create transaction → Set deadline tomorrow → Wait for cron → Receive email reminder

---

## 🐛 Error Scenarios

### Network Errors
- [ ] Offline state handled gracefully
- [ ] Failed API requests show retry
- [ ] Timeout errors handled
- [ ] No infinite loading states

### Data Errors
- [ ] Invalid data validation
- [ ] Missing required fields
- [ ] Duplicate data handling
- [ ] Corrupt data recovery

### Edge Cases
- [ ] Empty states (no transactions)
- [ ] Very long text (names, addresses)
- [ ] Special characters in inputs
- [ ] Very large files (near 10MB limit)
- [ ] Zero events in timeline
- [ ] All events overdue
- [ ] User with 100+ transactions

---

## 📊 Analytics & Monitoring

### Vercel Analytics
- [ ] Analytics enabled
- [ ] Page views tracked
- [ ] Performance metrics captured

### Error Tracking
- [ ] Error logging configured
- [ ] Errors captured (consider Sentry)
- [ ] User context included

### Uptime
- [ ] Uptime monitoring configured
- [ ] Alerts set up for downtime

---

## 🎯 Pre-Launch Checklist

Before going live:

### Critical
- [ ] All auth flows tested
- [ ] Payment flow works (test mode)
- [ ] No console errors
- [ ] Environment variables set
- [ ] Database migrations run
- [ ] RLS policies verified

### Important
- [ ] Mobile responsive
- [ ] Error handling tested
- [ ] Loading states implemented
- [ ] Success feedback working
- [ ] Email templates reviewed

### Nice to Have
- [ ] Dark mode works
- [ ] Accessibility basics
- [ ] SEO meta tags
- [ ] Analytics configured

---

## 🧪 Test Data

### Test Users
- Create test users with different roles
- Test with Free and Pro accounts

### Test Transactions
- Create sample transactions
- Include various statuses (upcoming, overdue, completed)

### Test Documents
- Sample purchase agreement
- Sample lease agreement
- Scanned document (low quality)
- Digital document (high quality)

### Stripe Test Cards
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Requires auth: `4000 0025 0000 3155`

---

## 📝 Test Log Template

Use this to document test runs:

```markdown
## Test Run: [DATE]

**Tester**: [Name]
**Environment**: [Local/Staging/Production]
**Browser**: [Chrome/Safari/etc]

### Results
- Passed: X
- Failed: Y
- Skipped: Z

### Issues Found
1. [Description]
   - Severity: [Critical/High/Medium/Low]
   - Steps to reproduce:
   - Expected:
   - Actual:

### Notes
[Any additional observations]
```

---

## 🔧 Automated Testing (Future)

Consider adding:

- [ ] Jest for unit tests
- [ ] React Testing Library for component tests
- [ ] Playwright or Cypress for E2E tests
- [ ] GitHub Actions for CI/CD

---

## 📞 Support During Testing

If you encounter issues:
1. Check browser console for errors
2. Check server logs (Vercel dashboard)
3. Review database logs (Supabase)
4. Check Stripe webhook logs
5. Contact: support@gravmap.com
