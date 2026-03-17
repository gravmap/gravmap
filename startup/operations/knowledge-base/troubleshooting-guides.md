# Troubleshooting Guides

**Purpose:** Step-by-step solutions to common technical issues

**Format:** Problem → Diagnosis → Solution → Prevention

---

## Guide 1: Upload Issues

### Problem: "Upload Failed" Error

**Symptoms:**
- Red error message after attempting upload
- File doesn't appear in transaction
- "Upload failed, please try again" message

---

#### Step 1: Check File Format

**Question:** Is your file a PDF?

- ✅ **Yes:** Continue to Step 2
- ❌ **No:** Convert to PDF first
  - Word: File → Save As → PDF
  - Images: Use online converter
  - **Then retry upload**

---

#### Step 2: Check File Size

**Question:** Is your file under 10MB?

**How to check:**
- Windows: Right-click file → Properties
- Mac: Right-click file → Get Info

- ✅ **Under 10MB:** Continue to Step 3
- ❌ **Over 10MB:** Compress the PDF
  - Free tool: [Link to PDF compressor]
  - Or remove unnecessary pages
  - **Then retry upload**

---

#### Step 3: Check Internet Connection

**Question:** Is your internet stable?

**Test:** Visit fast.com - should show > 5 Mbps

- ✅ **Fast/stable:** Continue to Step 4
- ❌ **Slow/unstable:**
  - Reset router
  - Move closer to WiFi
  - Try different network
  - **Then retry upload**

---

#### Step 4: Try Different Browser

**Question:** Are you using Chrome, Firefox, Safari, or Edge?

- ✅ **Yes:** Continue to Step 5
- ❌ **No (using Internet Explorer):**
  - Switch to Chrome or Firefox
  - **Then retry upload**

---

#### Step 5: Clear Browser Cache

**Instructions:**
1. Chrome: Settings → Privacy → Clear browsing data
2. Select "Cached images and files"
3. Click "Clear data"
4. Refresh page
5. **Retry upload**

---

#### Step 6: Try Incognito/Private Mode

**Instructions:**
1. Chrome: Ctrl+Shift+N (Windows) / Cmd+Shift+N (Mac)
2. Log in to [Product Name]
3. **Retry upload**

- ✅ **Works in incognito:** Browser extension issue
  - Disable extensions one by one to find culprit
- ❌ **Still fails:** Continue to Step 7

---

#### Step 7: Contact Support

**Provide:**
- Screenshot of error message
- File type and size
- Browser and version
- Operating system (Windows/Mac)

**Contact:**
- Email: support@[domain].com
- In-app chat: Click ? icon

---

### Problem: Upload Stuck at "Processing"

**Symptoms:**
- Progress bar doesn't move
- "Processing" message for > 60 seconds
- No error message

---

#### Solution:

1. **Wait 60 seconds** (large files take longer)

2. **If still stuck:**
   - Refresh page
   - Retry upload

3. **If persists:**
   - Try smaller file
   - Check internet speed
   - Contact support

---

### Problem: "Unsupported File Type" Error

**Symptoms:**
- Error says file format not supported

**Solution:**
- Convert to PDF first
- Use online converter: [Link]
- Retry upload

---

## Guide 2: AI Extraction Issues

### Problem: AI Extraction Failed

**Symptoms:**
- "Extraction failed" error message
- No data appears after upload
- Asked to enter data manually

---

#### Cause 1: Handwritten Contract

**Diagnosis:** Is your contract handwritten or partially handwritten?

- ✅ **Yes:**
  - AI cannot read handwriting reliably
  - **Solution:** Enter data manually
  - Takes 2-3 minutes

- ❌ **No:** Continue to Cause 2

---

#### Cause 2: Poor Scan Quality

**Diagnosis:** Is the PDF blurry, faint, or hard to read?

- ✅ **Yes:**
  - Re-scan at higher resolution (300+ DPI)
  - Ensure good lighting/contrast
  - **Retry upload**

- ❌ **No:** Continue to Cause 3

---

#### Cause 3: Non-Standard Format

**Diagnosis:** Is this a standard residential purchase agreement?

- ✅ **Yes:** Contact support (may be bug)
- ❌ **No (commercial, unusual format):**
  - AI optimized for standard residential contracts
  - **Solution:** Enter data manually
  - **Or:** Report to help us improve

---

### Problem: Wrong Data Extracted

**Symptoms:**
- Dates are incorrect
- Parties are wrong
- Any field shows wrong information

---

#### Solution:

1. **Click field to edit**
   - Update with correct information
   - Click "Confirm"

2. **Report to help us improve:**
   - Email: support@[domain].com
   - Include: What was wrong, what should it be
   - We use this to train AI

---

### Problem: Missing Fields

**Symptoms:**
- Expected field shows as blank
- AI didn't extract certain information

---

#### Solution:

1. **Check if in contract:**
   - Open contract PDF
   - Verify information is present

2. **If in contract:**
   - Enter manually
   - Report to support

3. **If not in contract:**
   - Normal - AI can only extract what's there
   - Enter manually

---

## Guide 3: Notification Issues

### Problem: Not Receiving Email Reminders

**Symptoms:**
- No reminder emails for deadlines
- Emails used to come, but stopped

---

#### Step 1: Check Notification Settings

**Instructions:**
1. Log in → Settings → Notifications
2. Is "Email Reminders" checked?
   - ✅ **Yes:** Continue to Step 2
   - ❌ **No:** Check the box → Save → Done

---

#### Step 2: Check Spam Folder

**Instructions:**
1. Check spam/junk folder
2. Look for emails from: noreply@[domain].com

- ✅ **Found in spam:**
  - Mark as "Not Spam"
  - Add sender to contacts
  - Whitelist @[domain].com
  - **Done**

- ❌ **Not in spam:** Continue to Step 3

---

#### Step 3: Check Gmail Tabs

**If using Gmail:**
1. Check "Promotions" tab
2. Check "Updates" tab

- ✅ **Found there:**
  - Drag to "Primary" tab
  - Gmail will learn for next time
  - **Done**

- ❌ **Not there:** Continue to Step 4

---

#### Step 4: Check Email Address

**Instructions:**
1. Settings → Profile
2. Is email address correct?

- ✅ **Yes:** Continue to Step 5
- ❌ **No:** Update email → Save → Done

---

#### Step 5: Send Test Notification

**Instructions:**
1. Settings → Notifications
2. Click "Send Test Notification"
3. Check inbox

- ✅ **Test arrived:** Reminders working now
- ❌ **Test didn't arrive:** Continue to Step 6

---

#### Step 6: Contact Support

**Provide:**
- Email provider (Gmail, Outlook, Yahoo, etc.)
- Whether test notification arrived
- Screenshot of notification settings

**Contact:**
- Email: support@[domain].com
- In-app chat: Click ? icon

---

### Problem: Receiving Too Many Emails

**Symptoms:**
- Overwhelmed by notification frequency
- Want fewer emails

---

#### Solution:

1. **Turn off Daily Digest:**
   - Settings → Notifications
   - Uncheck "Daily Digest"
   - Keep "Deadline Reminders"

2. **Reduce reminder frequency:**
   - Settings → Notifications → Reminder Schedule
   - Choose "Minimal" (1 day only)
   - Or customize

3. **Unsubscribe from marketing:**
   - Scroll to bottom of marketing email
   - Click "Unsubscribe"

---

### Problem: SMS Notifications Not Working

**Symptoms:**
- Not receiving text messages (Team Plan)
- SMS used to work, now doesn't

---

#### Solution:

1. **Check plan:**
   - SMS only on Team Plan ($199/month)
   - Upgrade if on Professional/Starter

2. **Check phone number:**
   - Settings → Notifications → SMS
   - Is phone number correct?

3. **Re-verify:**
   - Click "Resend Verification Code"
   - Enter code
   - Save

4. **Contact support** if still not working

---

## Guide 4: Login Issues

### Problem: "Invalid Email or Password"

**Symptoms:**
- Can't log in
- Error says credentials are wrong

---

#### Solution 1: Check Caps Lock

- Is Caps Lock on?
- Passwords are case-sensitive
- **Turn off Caps Lock → Retry**

---

#### Solution 2: Check Email Address

- Are you using the right email?
- Check for typos
- **Correct email → Retry**

---

#### Solution 3: Reset Password

1. Click "Forgot Password"
2. Enter email
3. Check inbox for reset link
4. Create new password
5. Log in with new password

---

### Problem: "Account Locked"

**Symptoms:**
- Message says account locked
- Due to too many failed login attempts

---

#### Solution:

1. **Wait 15 minutes**
   - Account auto-unlocks
   - Don't keep trying (resets timer)

2. **After 15 minutes:**
   - Retry login
   - If forgot password, reset it

3. **Still locked?**
   - Contact support
   - We'll unlock manually

---

### Problem: Password Reset Email Not Arriving

**Symptoms:**
- Requested password reset
- Email never arrives

---

#### Solution:

1. **Check spam folder**
2. **Check all email tabs** (Gmail: Promotions, Updates)
3. **Wait 5 minutes** (sometimes delayed)
4. **Check correct email** - did you enter the right one?

5. **Still not there?** Contact support
   - We can manually reset

---

### Problem: Google OAuth Not Working

**Symptoms:**
- Signed up with Google
- Can't log in with email/password

---

#### Solution:

1. **Use Google login:**
   - Click "Continue with Google" button
   - Not email/password

2. **If Google email changed:**
   - Contact support
   - We'll update your email

---

## Guide 5: Performance Issues

### Problem: Product Running Slow

**Symptoms:**
- Pages take long to load
- Actions are laggy
- General slowness

---

#### Solution 1: Refresh Page

- Press F5 or Ctrl+R (Windows)
- Press Cmd+R (Mac)
- **Often fixes temporary issues**

---

#### Solution 2: Clear Browser Cache

**Chrome:**
1. Settings → Privacy → Clear browsing data
2. Select "Cached images and files"
3. Clear data
4. Refresh page

---

#### Solution 3: Close Other Tabs

- Too many tabs slow browser
- Close unnecessary tabs
- **Refresh [Product Name]**

---

#### Solution 4: Check Internet Speed

**Test:** Visit fast.com

- ✅ **> 5 Mbps:** Continue to Solution 5
- ❌ **< 5 Mbps:**
  - Reset router
  - Try different network
  - Contact ISP if persistent

---

#### Solution 5: Try Different Browser

- Chrome usually fastest
- Try Firefox or Edge
- **Avoid Internet Explorer**

---

#### Solution 6: Disable Browser Extensions

**Test in incognito:**
- If faster in incognito, extension is cause
- Disable extensions one by one
- Find culprit

---

#### Solution 7: Contact Support

**Provide:**
- Browser and version
- Operating system
- Internet speed
- Specific pages that are slow

**Contact:**
- Email: support@[domain].com
- In-app chat: Click ? icon

---

## Guide 6: Billing Issues

### Problem: Payment Failed

**Symptoms:**
- Email says payment failed
- Can't access account

---

#### Solution:

1. **Check card details:**
   - Expired?
   - Wrong number?
   - Insufficient funds?

2. **Update payment:**
   - Settings → Billing → Payment Method
   - Enter correct card details
   - Save

3. **Retry payment:**
   - Click "Retry Payment"
   - Access restored immediately

---

### Problem: Charged Twice

**Symptoms:**
- Two charges in same month
- Double billing

---

#### Solution:

1. **Check Invoice History:**
   - Settings → Billing → Invoice History
   - Review charges

2. **Possible causes:**
   - Plan upgrade (proration looks like double charge)
   - Actual error

3. **If error:**
   - Email: billing@[domain].com
   - Include charge dates and amounts
   - We'll refund within 5-7 days

---

### Problem: Can't Cancel

**Symptoms:**
- Cancel button doesn't work
- Still getting charged after canceling

---

#### Solution:

1. **Clear cache and retry**
2. **Try different browser**
3. **Contact support:**
   - Email: support@[domain].com
   - Subject: "Can't cancel subscription"
   - We'll cancel manually

---

## Prevention Tips

### To Avoid Future Issues:

✅ **Regular maintenance:**
- Clear browser cache monthly
- Keep browser updated
- Use strong, unique password

✅ **Best practices:**
- Use Chrome browser
- Keep files under 10MB
- Check spam folder before panicking
- Bookmark login page

✅ **Stay informed:**
- Read product update emails
- Check status page: status.[domain].com
- Follow us on social media

---

## Document Control

- **Last Updated:** [Date]
- **Owner:** Customer Success Team
- **Review Frequency:** Monthly
- **Next Review:** [Date]
