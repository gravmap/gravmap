# Security Testing Checklist

**Project:** GravMap  
**Version:** 1.0  
**Date:** March 17, 2026  
**Status:** Active

---

## 1. Introduction

### 1.1 Purpose
This document provides a comprehensive security testing checklist based on OWASP Top 10 and additional security best practices for the GravMap application.

### 1.2 Scope
- Application security testing
- API security testing
- Authentication & authorization testing
- Data protection verification
- Infrastructure security review

---

## 2. OWASP Top 10 (2021) Checklist

### A01:2021 - Broken Access Control

**Risk:** High  
**Priority:** Critical

#### Test Cases

- [ ] **SEC-BA-001: Verify Row-Level Security (RLS)**
  - Test: User A cannot access User B's data via direct API calls
  - Test: User A cannot view User B's transactions
  - Test: User A cannot modify User B's timeline events
  - **How:** Use different user sessions, try accessing other users' data via URL manipulation

- [ ] **SEC-BA-002: API Endpoint Authorization**
  - Test: Unauthenticated users cannot access protected endpoints
  - Test: Free users cannot access Pro-only features
  - Test: Users cannot delete other users' data
  - **How:** Use API testing tools (Postman, curl) without/with wrong auth

- [ ] **SEC-BA-003: IDOR (Insecure Direct Object Reference)**
  - Test: Try accessing `/api/transactions/[other_user_id]`
  - Test: Try modifying `/api/timeline-events/[other_event_id]`
  - Test: Try deleting documents belonging to other users
  - **How:** Manipulate IDs in URLs and API calls

- [ ] **SEC-BA-004: Privilege Escalation**
  - Test: Free user cannot upgrade themselves to Pro without payment
  - Test: User cannot modify their subscription status directly
  - Test: User cannot change other users' data
  - **How:** Try modifying request payloads to escalate privileges

- [ ] **SEC-BA-005: CORS Configuration**
  - Test: API only accepts requests from allowed origins
  - Test: Credentials not exposed to unauthorized origins
  - **How:** Make cross-origin requests from different domains

**Result:** [ ] Pass [ ] Fail  
**Issues Found:** [Document any issues]

---

### A02:2021 - Cryptographic Failures

**Risk:** High  
**Priority:** Critical

#### Test Cases

- [ ] **SEC-CF-001: HTTPS Enforcement**
  - Test: Application forces HTTPS redirects
  - Test: No mixed content warnings
  - Test: HSTS header present
  - **How:** Try accessing http://, check browser console

- [ ] **SEC-CF-002: Password Storage**
  - Test: Passwords hashed (Supabase handles this)
  - Test: Strong hashing algorithm used (bcrypt/argon2)
  - Test: Passwords not logged or exposed in errors
  - **How:** Check database (passwords should be hashed), check logs

- [ ] **SEC-CF-003: Sensitive Data Encryption at Rest**
  - Test: Database encryption enabled (Supabase default)
  - Test: File storage encrypted (Supabase default)
  - Test: API keys encrypted in database
  - **How:** Review Supabase configuration, check for plaintext sensitive data

- [ ] **SEC-CF-004: Sensitive Data in Transit**
  - Test: All API calls use HTTPS
  - Test: WebSocket connections secure (wss://)
  - Test: No sensitive data in URL parameters
  - **How:** Check network tab, avoid passwords in URLs

- [ ] **SEC-CF-005: Session Token Security**
  - Test: Session tokens use secure, random values
  - Test: Tokens transmitted securely
  - Test: Tokens expire appropriately
  - **How:** Inspect cookies, check session management

- [ ] **SEC-CF-006: API Key Exposure**
  - Test: Server-side API keys not in client code
  - Test: Only NEXT_PUBLIC_* keys exposed to client
  - Test: Service role key never exposed
  - **How:** View page source, search for API keys

**Result:** [ ] Pass [ ] Fail

---

### A03:2021 - Injection

**Risk:** Critical  
**Priority:** Critical

#### Test Cases

- [ ] **SEC-IN-001: SQL Injection**
  - Test: Input fields sanitize SQL special characters
  - Test: Parameterized queries used (Supabase client does this)
  - Test: No raw SQL with user input
  - **Payloads to test:**
    ```
    ' OR '1'='1
    ' OR '1'='1' -- -
    ' UNION SELECT * FROM users --
    1; DROP TABLE users;
    ```
  - **How:** Enter payloads in search fields, forms, API parameters

- [ ] **SEC-IN-002: NoSQL Injection**
  - Test: JSON payloads sanitized
  - Test: MongoDB operators not injectable (if applicable)
  - **Payloads:**
    ```json
    {"$gt": ""}
    {"$ne": null}
    ```

- [ ] **SEC-IN-003: Command Injection**
  - Test: System commands not executed from user input
  - Test: File operations don't execute arbitrary commands
  - **Payloads:**
    ```
    ; ls -la
    | cat /etc/passwd
    `whoami`
    $(cat /etc/passwd)
    ```

- [ ] **SEC-IN-004: LDAP Injection** (if applicable)
  - Test: LDAP queries parameterized

- [ ] **SEC-IN-005: XPath Injection** (if applicable)
  - Test: XML queries sanitized

**Result:** [ ] Pass [ ] Fail

---

### A04:2021 - Insecure Design

**Risk:** Medium  
**Priority:** High

#### Test Cases

- [ ] **SEC-ID-001: Rate Limiting**
  - Test: Login endpoint rate-limited
  - Test: API endpoints rate-limited
  - Test: Password reset rate-limited
  - **How:** Make rapid requests, verify throttling

- [ ] **SEC-ID-002: Account Lockout**
  - Test: Account locked after failed login attempts
  - Test: Lockout duration reasonable
  - Test: Unlock mechanism secure
  - **How:** Fail login 6+ times, check lockout

- [ ] **SEC-ID-003: Session Management**
  - Test: Sessions expire after inactivity
  - Test: Sessions invalidated on logout
  - Test: Cannot reuse old session tokens
  - **How:** Login, wait, try old session

- [ ] **SEC-ID-004: Password Requirements**
  - Test: Minimum 8 characters enforced
  - Test: Complexity requirements (uppercase, lowercase, number)
  - Test: Common passwords rejected
  - **How:** Try weak passwords during signup

- [ ] **SEC-ID-005: Multi-Tenancy Isolation**
  - Test: User data completely isolated
  - Test: No data leakage between accounts
  - **How:** Verify RLS policies, test cross-account access

**Result:** [ ] Pass [ ] Fail

---

### A05:2021 - Security Misconfiguration

**Risk:** Medium  
**Priority:** High

#### Test Cases

- [ ] **SEC-SM-001: Error Handling**
  - Test: No stack traces in production errors
  - Test: No sensitive data in error messages
  - Test: Generic error messages to users
  - **How:** Trigger errors, check response

- [ ] **SEC-SM-002: Default Credentials**
  - Test: No default admin passwords
  - Test: No default API keys
  - **How:** Try common defaults (admin/admin, etc.)

- [ ] **SEC-SM-003: Directory Listing**
  - Test: Directory listing disabled
  - Test: Hidden files/directories not accessible
  - **How:** Try accessing directories directly

- [ ] **SEC-SM-004: Security Headers**
  - Test: X-Frame-Options header present
  - Test: X-Content-Type-Options: nosniff
  - Test: X-XSS-Protection header
  - Test: Content-Security-Policy header
  - **How:** Check response headers in DevTools

- [ ] **SEC-SM-005: Debug Mode Disabled**
  - Test: Debug mode off in production
  - Test: No verbose logging
  - Test: No development tools exposed
  - **How:** Check for debug endpoints, verbose errors

- [ ] **SEC-SM-006: Unnecessary Features**
  - Test: Unused features disabled
  - Test: Unnecessary ports closed
  - Test: Sample data removed
  - **How:** Review application, check for test/sample data

**Result:** [ ] Pass [ ] Fail

---

### A06:2021 - Vulnerable and Outdated Components

**Risk:** Medium  
**Priority:** High

#### Test Cases

- [ ] **SEC-VC-001: Dependency Audit**
  - Test: Run `npm audit` - no high/critical vulnerabilities
  - Test: Dependencies up to date
  - Test: No deprecated packages
  - **How:** `npm audit`, `npm outdated`

- [ ] **SEC-VC-002: Framework Version**
  - Test: Next.js version current
  - Test: React version current
  - Test: No known vulnerabilities in frameworks
  - **How:** Check package.json, search CVEs

- [ ] **SEC-VC-003: Security Patches**
  - Test: All security patches applied
  - Test: Regular update schedule
  - **How:** Review changelog, update history

**Result:** [ ] Pass [ ] Fail

---

### A07:2021 - Identification and Authentication Failures

**Risk:** Critical  
**Priority:** Critical

#### Test Cases

- [ ] **SEC-IA-001: Weak Password Recovery**
  - Test: Password reset requires email verification
  - Test: Reset tokens expire
  - Test: Reset tokens single-use
  - **How:** Test password reset flow

- [ ] **SEC-IA-002: Credential Stuffing Protection**
  - Test: Rate limiting on login
  - Test: CAPTCHA or similar after failed attempts (optional)
  - Test: Monitoring for credential stuffing
  - **How:** Multiple login attempts with different credentials

- [ ] **SEC-IA-003: Session Fixation**
  - Test: Session ID changes after login
  - Test: Old session invalidated
  - **How:** Check session cookies before/after login

- [ ] **SEC-IA-004: Brute Force Protection**
  - Test: Account lockout after failed attempts
  - Test: Increasing delays between attempts
  - **How:** Multiple failed logins, verify lockout

- [ ] **SEC-IA-005: Email Verification**
  - Test: Email verified before account active (or limited)
  - Test: Cannot access dashboard without verification
  - **How:** Try accessing protected routes unverified

**Result:** [ ] Pass [ ] Fail

---

### A08:2021 - Software and Data Integrity Failures

**Risk:** High  
**Priority:** High

#### Test Cases

- [ ] **SEC-SI-001: CI/CD Pipeline Security**
  - Test: Build process secure
  - Test: No unauthorized code changes
  - Test: Deployment requires approval
  - **How:** Review CI/CD configuration

- [ ] **SEC-SI-002: Auto-Update Security**
  - Test: Updates from trusted sources only
  - Test: Update integrity verified (checksums)
  - **How:** Review update mechanism

- [ ] **SEC-SI-003: Webhook Signature Verification**
  - Test: Stripe webhook signatures validated
  - Test: Invalid signatures rejected
  - **How:** Send webhook with invalid signature

**Result:** [ ] Pass [ ] Fail

---

### A09:2021 - Security Logging and Monitoring Failures

**Risk:** Medium  
**Priority:** Medium

#### Test Cases

- [ ] **SEC-LM-001: Authentication Logging**
  - Test: Failed logins logged
  - Test: Successful logins logged
  - Test: Password resets logged
  - **How:** Perform actions, check logs

- [ ] **SEC-LM-002: Access Logging**
  - Test: API access logged
  - Test: Sensitive operations logged
  - Test: Log includes user ID, timestamp, IP
  - **How:** Perform actions, check logs

- [ ] **SEC-LM-003: Error Logging**
  - Test: Errors logged with context
  - Test: No sensitive data in logs
  - Test: Logs monitored for anomalies
  - **How:** Trigger errors, check logs

- [ ] **SEC-LM-004: Alerting**
  - Test: Alerts configured for security events
  - Test: Failed login threshold alerts
  - Test: Unusual activity alerts
  - **How:** Simulate security events

**Result:** [ ] Pass [ ] Fail

---

### A10:2021 - Server-Side Request Forgery (SSRF)

**Risk:** High  
**Priority:** High

#### Test Cases

- [ ] **SEC-SS-001: URL Validation**
  - Test: User-supplied URLs validated
  - Test: Internal IPs not accessible
  - Test: Cloud metadata endpoints blocked
  - **Payloads:**
    ```
    http://169.254.169.254/latest/meta-data/
    http://localhost/
    http://127.0.0.1/
    http://[::1]/
    http://0.0.0.0/
    ```
  - **How:** Enter malicious URLs in any URL input fields

- [ ] **SEC-SS-002: Redirect Validation**
  - Test: Redirects validated
  - Test: Open redirect vulnerabilities not present
  - **How:** Test redirect parameters

**Result:** [ ] Pass [ ] Fail

---

## 3. Additional Security Tests

### 3.1 Cross-Site Scripting (XSS)

- [ ] **SEC-XSS-001: Reflected XSS**
  - Test: Search parameters sanitized
  - Test: Error messages sanitized
  - **Payloads:**
    ```html
    <script>alert('XSS')</script>
    <img src=x onerror=alert('XSS')>
    <svg onload=alert('XSS')>
    javascript:alert('XSS')
    ```
  - **How:** Enter payloads in all input fields, URL parameters

- [ ] **SEC-XSS-002: Stored XSS**
  - Test: Transaction names sanitized
  - Test: Notes/comments sanitized
  - Test: Client names sanitized
  - **How:** Save payloads, view on different page

- [ ] **SEC-XSS-003: DOM-based XSS**
  - Test: Client-side rendering sanitizes input
  - Test: No eval() or innerHTML with user input
  - **How:** Check source code, test dynamic content

**Result:** [ ] Pass [ ] Fail

---

### 3.2 Cross-Site Request Forgery (CSRF)

- [ ] **SEC-CSRF-001: CSRF Token Validation**
  - Test: State-changing operations require CSRF token
  - Test: Tokens validated server-side
  - Test: Tokens unique per session
  - **Note:** Next.js handles this with same-site cookies
  - **How:** Try submitting forms without tokens (if applicable)

**Result:** [ ] Pass [ ] Fail

---

### 3.3 File Upload Security

- [ ] **SEC-FU-001: File Type Validation**
  - Test: Only allowed file types accepted
  - Test: File type checked by content, not extension
  - Test: Executable files rejected
  - **How:** Try uploading .exe, .php, .sh files

- [ ] **SEC-FU-002: File Size Limits**
  - Test: 10MB limit enforced
  - Test: Large files rejected gracefully
  - **How:** Upload 15MB+ file

- [ ] **SEC-FU-003: Malicious File Content**
  - Test: Uploaded files scanned for malware (optional)
  - Test: Files served with correct Content-Type
  - Test: Files not executed server-side
  - **How:** Check how files are served

- [ ] **SEC-FU-004: Filename Sanitization**
  - Test: Special characters in filenames handled
  - Test: No path traversal in filenames
  - **Payloads:** `../../../etc/passwd`, `file.php.jpg`
  - **How:** Upload files with malicious names

**Result:** [ ] Pass [ ] Fail

---

### 3.4 Payment Security

- [ ] **SEC-PAY-001: Stripe Integration**
  - Test: Using Stripe.js for payment processing
  - Test: Card details never touch server
  - Test: Webhook signatures validated
  - **How:** Review Stripe implementation

- [ ] **SEC-PAY-002: Amount Manipulation**
  - Test: Cannot modify price client-side
  - Test: Price verified server-side
  - **How:** Try modifying price in request

- [ ] **SEC-PAY-003: Test Mode vs Live Mode**
  - Test: Test mode clearly separated
  - Test: No test data in production
  - **How:** Verify Stripe environment

**Result:** [ ] Pass [ ] Fail

---

### 3.5 API Security

- [ ] **SEC-API-001: Authentication Required**
  - Test: All protected endpoints require auth
  - Test: Proper 401/403 responses
  - **How:** Access endpoints without auth

- [ ] **SEC-API-002: Input Validation**
  - Test: All API inputs validated
  - Test: Invalid data rejected with clear errors
  - **How:** Send malformed JSON, invalid data types

- [ ] **SEC-API-003: Rate Limiting**
  - Test: API rate limiting implemented
  - Test: Limits reasonable for legitimate use
  - **How:** Make rapid API requests

- [ ] **SEC-API-004: CORS Policy**
  - Test: CORS policy restrictive
  - Test: Credentials not exposed
  - **How:** Make cross-origin requests

**Result:** [ ] Pass [ ] Fail

---

## 4. Penetration Testing Plan

### 4.1 Scope
- [ ] Application layer testing
- [ ] API testing
- [ ] Authentication testing
- [ ] Authorization testing

### 4.2 Out of Scope
- [ ] DDoS testing
- [ ] Social engineering
- [ ] Physical security

### 4.3 Testing Approach
- **Frequency:** Before major releases, annually
- **Method:** Manual + automated tools
- **Tools:** OWASP ZAP, Burp Suite, manual testing

### 4.4 Reporting
- Document all findings
- Categorize by severity
- Provide remediation steps
- Track to resolution

---

## 5. Security Testing Execution Report

### Test Summary

| Category | Tests | Pass | Fail | Not Tested |
|----------|-------|------|------|------------|
| OWASP A01 - Access Control | 5 | - | - | - |
| OWASP A02 - Crypto Failures | 6 | - | - | - |
| OWASP A03 - Injection | 5 | - | - | - |
| OWASP A04 - Insecure Design | 5 | - | - | - |
| OWASP A05 - Misconfiguration | 6 | - | - | - |
| OWASP A06 - Components | 3 | - | - | - |
| OWASP A07 - Auth Failures | 5 | - | - | - |
| OWASP A08 - Integrity | 3 | - | - | - |
| OWASP A09 - Logging | 4 | - | - | - |
| OWASP A10 - SSRF | 2 | - | - | - |
| XSS | 3 | - | - | - |
| CSRF | 1 | - | - | - |
| File Upload | 4 | - | - | - |
| Payment | 3 | - | - | - |
| API Security | 4 | - | - | - |
| **TOTAL** | **59** | **0** | **0** | **59** |

### Critical Findings
[List any critical security issues]

### Recommendations
[Security improvement recommendations]

---

## 6. Security Sign-Off

### Pre-Launch Checklist
- [ ] All OWASP Top 10 tested
- [ ] No critical or high vulnerabilities
- [ ] Medium vulnerabilities documented with mitigation plan
- [ ] Security headers configured
- [ ] HTTPS enforced
- [ ] Rate limiting active
- [ ] Input validation complete
- [ ] Authentication/authorization verified
- [ ] Payment security confirmed
- [ ] Logging and monitoring active

### Approval
- **Security Tested By:** [Name]
- **Date:** [Date]
- **Approved:** [ ] Yes [ ] No
- **Conditions:** [Any conditions]

---

**Document Version:** 1.0  
**Next Review:** Before production launch
