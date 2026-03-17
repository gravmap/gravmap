# Authentication Test Cases

**Module:** Authentication & Authorization  
**Priority:** Critical  
**Last Updated:** March 17, 2026

---

## TC-AUTH-001: User Signup with Valid Credentials

**Objective:** Verify user can create account with valid email and password  
**Priority:** P0 (Critical)  
**Test Type:** Manual, E2E

### Preconditions
- Application is accessible
- User does not have existing account

### Test Data
```
Email: newuser@test.com
Password: SecurePass123!
```

### Test Steps
1. Navigate to landing page
2. Click "Sign Up" button
3. Enter email: `newuser@test.com`
4. Enter password: `SecurePass123!`
5. Click "Create Account" button

### Expected Results
- ✅ Account created successfully
- ✅ Success message displayed
- ✅ Verification email sent to provided email
- ✅ User redirected to email verification page
- ✅ User cannot access dashboard until verified

### Actual Results
_Placeholder for test execution_

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-AUTH-002: Signup Form Validation - Invalid Email

**Objective:** Verify signup rejects invalid email format  
**Priority:** P1 (High)  
**Test Type:** Manual

### Preconditions
- On signup page

### Test Data
```
Invalid Emails: "notanemail", "missing@domain", "@nodomain.com", "spaces in@email.com"
```

### Test Steps
1. Enter invalid email format
2. Enter valid password
3. Click "Create Account"

### Expected Results
- ✅ Form validation error displayed
- ✅ Error message: "Please enter a valid email address"
- ✅ Form not submitted
- ✅ User remains on signup page

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-AUTH-003: Signup Form Validation - Weak Password

**Objective:** Verify password requirements are enforced  
**Priority:** P1 (High)  
**Test Type:** Manual

### Preconditions
- On signup page

### Test Data
```
Weak Passwords: "123", "password", "abc123", "noNumbers", "noupper123"
```

### Test Steps
1. Enter valid email
2. Enter weak password
3. Click "Create Account"

### Expected Results
- ✅ Password strength indicator shows weak
- ✅ Validation error displayed
- ✅ Requirements listed (min 8 chars, uppercase, lowercase, number)
- ✅ Form not submitted

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-AUTH-004: Signup with Duplicate Email

**Objective:** Verify duplicate email handling  
**Priority:** P1 (High)  
**Test Type:** Manual, E2E

### Preconditions
- User account already exists with email `existing@test.com`

### Test Data
```
Email: existing@test.com
Password: AnyPassword123!
```

### Test Steps
1. Navigate to signup page
2. Enter existing email
3. Enter any password
4. Click "Create Account"

### Expected Results
- ✅ Error message displayed
- ✅ Message: "An account with this email already exists"
- ✅ Option to login instead
- ✅ No new account created

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-AUTH-005: Email Verification Flow

**Objective:** Verify email verification completes signup  
**Priority:** P0 (Critical)  
**Test Type:** Manual, E2E

### Preconditions
- User created account but not yet verified
- Verification email sent

### Test Steps
1. Open email inbox for registered email
2. Find verification email from GravMap
3. Click verification link in email
4. Observe browser behavior

### Expected Results
- ✅ Email received within 5 minutes
- ✅ Email contains user's name
- ✅ Verification link is clickable
- ✅ Link redirects to onboarding page
- ✅ User is automatically logged in
- ✅ Success toast: "Email verified successfully"
- ✅ Can now access dashboard

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-AUTH-006: Login with Valid Credentials

**Objective:** Verify user can login successfully  
**Priority:** P0 (Critical)  
**Test Type:** Manual, E2E

### Preconditions
- User account exists and is verified
- User is logged out

### Test Data
```
Email: testuser@gravmap.com
Password: TestPass123!
```

### Test Steps
1. Navigate to login page
2. Enter email
3. Enter password
4. Click "Sign In" button

### Expected Results
- ✅ Login successful
- ✅ User redirected to dashboard
- ✅ User name displayed in navbar
- ✅ Session token created
- ✅ Can access protected routes

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-AUTH-007: Login with Invalid Password

**Objective:** Verify login fails with wrong password  
**Priority:** P1 (High)  
**Test Type:** Manual, E2E

### Preconditions
- User account exists
- User is logged out

### Test Data
```
Email: testuser@gravmap.com
Password: WrongPassword123!
```

### Test Steps
1. Navigate to login page
2. Enter valid email
3. Enter incorrect password
4. Click "Sign In"

### Expected Results
- ✅ Error message displayed
- ✅ Message: "Invalid email or password"
- ✅ User remains on login page
- ✅ Password field cleared
- ✅ No redirect to dashboard
- ✅ Rate limiting after 5 failed attempts

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-AUTH-008: Login with Non-Existent Email

**Objective:** Verify login fails for non-existent account  
**Priority:** P1 (High)  
**Test Type:** Manual

### Preconditions
- No account exists with test email

### Test Data
```
Email: nonexistent@test.com
Password: AnyPassword123!
```

### Test Steps
1. Navigate to login page
2. Enter non-existent email
3. Enter any password
4. Click "Sign In"

### Expected Results
- ✅ Error message: "Invalid email or password" (don't reveal which)
- ✅ No indication if email exists or not (security)
- ✅ User remains on login page

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-AUTH-009: Login with Unverified Email

**Objective:** Verify unverified users cannot access dashboard  
**Priority:** P1 (High)  
**Test Type:** Manual

### Preconditions
- User created account but did not verify email

### Test Data
```
Email: unverified@test.com
Password: TestPass123!
```

### Test Steps
1. Navigate to login page
2. Enter unverified user credentials
3. Click "Sign In"

### Expected Results
- ✅ Error or warning message displayed
- ✅ Message: "Please verify your email before logging in"
- ✅ Option to resend verification email
- ✅ User not redirected to dashboard
- ✅ Redirected to verification reminder page

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-AUTH-010: Logout Functionality

**Objective:** Verify user can logout successfully  
**Priority:** P0 (Critical)  
**Test Type:** Manual, E2E

### Preconditions
- User is logged in
- On dashboard or any protected page

### Test Steps
1. Click user menu/avatar in navbar
2. Click "Sign Out" option
3. Observe behavior

### Expected Results
- ✅ Session destroyed
- ✅ Auth tokens cleared
- ✅ User redirected to landing page
- ✅ Cannot access protected routes (verify by trying /dashboard)
- ✅ Navbar shows "Sign In" instead of user name

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-AUTH-011: Session Persistence

**Objective:** Verify session persists across browser refresh  
**Priority:** P1 (High)  
**Test Type:** Manual

### Preconditions
- User is logged in
- On dashboard page

### Test Steps
1. Refresh browser (F5 or Cmd+R)
2. Observe page state

### Expected Results
- ✅ User remains logged in
- ✅ Dashboard loads with user data
- ✅ No redirect to login
- ✅ Session token still valid

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-AUTH-012: Session Expiry

**Objective:** Verify session expires appropriately  
**Priority:** P2 (Medium)  
**Test Type:** Manual

### Preconditions
- User is logged in
- Session timeout configured

### Test Steps
1. Login to application
2. Wait for session timeout period (or manually expire)
3. Try to access protected route or perform action

### Expected Results
- ✅ After timeout, user is logged out
- ✅ Redirected to login page
- ✅ Message: "Your session has expired. Please log in again."
- ✅ Cannot perform authenticated actions

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-AUTH-013: Password Reset Request

**Objective:** Verify user can request password reset  
**Priority:** P1 (High)  
**Test Type:** Manual, E2E

### Preconditions
- User account exists
- On login page

### Test Data
```
Email: existing@test.com
```

### Test Steps
1. Click "Forgot Password?" link
2. Enter registered email
3. Click "Send Reset Link"

### Expected Results
- ✅ Success message displayed
- ✅ Message: "Check your email for reset link"
- ✅ Reset email sent to user
- ✅ User redirected to login or confirmation page

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-AUTH-014: Password Reset with Valid Token

**Objective:** Verify user can reset password with valid token  
**Priority:** P1 (High)  
**Test Type:** Manual, E2E

### Preconditions
- Password reset email sent
- Token is valid (not expired)

### Test Data
```
New Password: NewSecurePass456!
```

### Test Steps
1. Open password reset email
2. Click reset link
3. Enter new password
4. Confirm new password
5. Click "Reset Password"

### Expected Results
- ✅ Reset page loads
- ✅ Form accepts new password
- ✅ Password validation enforced
- ✅ Success message: "Password updated successfully"
- ✅ User can login with new password
- ✅ Old password no longer works
- ✅ Token invalidated after use

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-AUTH-015: Password Reset with Expired Token

**Objective:** Verify expired reset tokens are rejected  
**Priority:** P2 (Medium)  
**Test Type:** Manual

### Preconditions
- Password reset token has expired (usually 24h)

### Test Steps
1. Click expired reset link
2. Observe behavior

### Expected Results
- ✅ Error message: "This reset link has expired"
- ✅ Option to request new reset link
- ✅ Cannot change password
- ✅ User redirected to forgot password page

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-AUTH-016: Protected Route Access - Unauthenticated

**Objective:** Verify unauthenticated users cannot access protected routes  
**Priority:** P0 (Critical)  
**Test Type:** Manual, E2E

### Preconditions
- User is not logged in

### Test Steps
1. Try to access `/dashboard` directly via URL
2. Try to access `/dashboard/transactions/new` directly
3. Try to access `/dashboard/settings` directly

### Expected Results
- ✅ User redirected to login page
- ✅ Intended URL saved for redirect after login
- ✅ Message: "Please log in to access this page"
- ✅ No dashboard content visible

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-AUTH-017: Remember Me Functionality

**Objective:** Verify "Remember Me" extends session  
**Priority:** P2 (Medium)  
**Test Type:** Manual

### Preconditions
- On login page

### Test Steps
1. Enter credentials
2. Check "Remember Me" checkbox
3. Login
4. Close browser completely
5. Reopen browser and navigate to app

### Expected Results
- ✅ User still logged in after browser close
- ✅ Session persists for extended period (e.g., 30 days)
- ✅ Dashboard accessible without re-login

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-AUTH-018: Concurrent Session Handling

**Objective:** Verify behavior with multiple simultaneous logins  
**Priority:** P2 (Medium)  
**Test Type:** Manual

### Preconditions
- User account exists

### Test Steps
1. Login on Browser A
2. Login on Browser B with same account
3. Perform actions on both browsers

### Expected Results
- ✅ Both sessions active (or one invalidated based on policy)
- ✅ Actions on one browser reflected on other (data consistency)
- ✅ If policy limits sessions, older session logged out with message

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-AUTH-019: OAuth Login (If Implemented)

**Objective:** Verify social login functionality  
**Priority:** P2 (Medium)  
**Test Type:** Manual

### Preconditions
- OAuth provider configured (Google, GitHub, etc.)

### Test Steps
1. Click "Sign in with [Provider]" button
2. Authorize on provider's page
3. Return to application

### Expected Results
- ✅ Redirected to OAuth provider
- ✅ After authorization, redirected back to app
- ✅ User logged in automatically
- ✅ Account created if first time
- ✅ Profile data populated from OAuth

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-AUTH-020: Rate Limiting on Auth Endpoints

**Objective:** Verify rate limiting prevents brute force attacks  
**Priority:** P1 (High)  
**Test Type:** Manual

### Preconditions
- On login page

### Test Steps
1. Attempt login with wrong credentials 6 times rapidly
2. Observe behavior after limit reached

### Expected Results
- ✅ After 5 failed attempts, rate limit triggered
- ✅ Error message: "Too many attempts. Please try again later."
- ✅ Cannot attempt login for cooldown period (e.g., 15 minutes)
- ✅ Legitimate users can still login after cooldown

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## Test Execution Summary

| Total | Pass | Fail | Blocked | Not Run |
|-------|------|------|---------|---------|
| 20    | 0    | 0    | 0       | 20      |

### Bugs Found
_Link to bugs logged during execution_

---

**Notes:**
- All critical (P0) tests must pass before release
- Failed tests require bug report in `/startup/issues/`
- Blocked tests should document blocker reason
