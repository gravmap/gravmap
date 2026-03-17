# SMS Notifications Feature Specification

**Feature ID:** FEA-001
**Priority:** P0 (Critical)
**Status:** Planned
**Owner:** Product Team

---

## Overview

Enable SMS notifications for critical transaction deadlines, ensuring users never miss important dates even when away from email.

### Problem Statement

Real estate agents are often on the go, showing properties, meeting clients, and handling multiple transactions. Email reminders can get buried or ignored. Missed deadlines can cost deals and damage reputations.

### Proposed Solution

Integrate Twilio to send SMS notifications for deadline reminders at configurable intervals (7 days, 3 days, 1 day, and day-of). Allow users to enable/disable SMS and configure which notifications they receive.

---

## User Stories

### US-1: Enable SMS Notifications
**As a** Pro subscriber
**I want to** enable SMS notifications for my account
**So that** I receive deadline reminders via text message

**Acceptance Criteria:**
- [ ] User can add phone number in settings
- [ ] Phone number is validated via SMS code
- [ ] User can enable/disable SMS globally
- [ ] Phone number is stored securely (encrypted)
- [ ] Settings page shows current phone status

### US-2: Receive Deadline Reminders
**As a** user with SMS enabled
**I want to** receive SMS reminders before deadlines
**So that** I'm alerted even when not checking email

**Acceptance Criteria:**
- [ ] SMS sent at 7 days before deadline
- [ ] SMS sent at 3 days before deadline
- [ ] SMS sent at 1 day before deadline
- [ ] SMS sent at 9 AM on day of deadline
- [ ] SMS includes transaction name and deadline type
- [ ] SMS includes link to transaction details

### US-3: Customize Notification Preferences
**As a** user
**I want to** customize which reminders I receive via SMS
**So that** I'm not overwhelmed with messages

**Acceptance Criteria:**
- [ ] User can toggle each reminder interval (7, 3, 1, 0 days)
- [ ] User can set quiet hours (no SMS during certain times)
- [ ] Changes take effect immediately
- [ ] Preferences persist across sessions

### US-4: Daily Digest SMS
**As a** busy agent
**I want to** receive a daily summary of upcoming deadlines
**So that** I can plan my day effectively

**Acceptance Criteria:**
- [ ] User can enable daily digest SMS
- [ ] Sent at configurable time (default 8 AM)
- [ ] Includes all deadlines for next 7 days
- [ ] Includes count of urgent deadlines (within 24h)
- [ ] Can be disabled independently of individual reminders

### US-5: Transaction-Specific Notifications
**As a** user
**I want to** configure SMS settings per transaction
**So that** critical transactions get extra attention

**Acceptance Criteria:**
- [ ] User can override global SMS settings per transaction
- [ ] "High priority" flag sends additional reminders
- [ ] Can add additional phone numbers (assistant, TC)
- [ ] Transaction-level settings clearly indicated

---

## Technical Approach

### Architecture

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   Cron Job  │────▶│  SMS Worker  │────▶│   Twilio    │
└─────────────┘     └──────────────┘     └─────────────┘
                           │
                           ▼
                    ┌──────────────┐
                    │   Database   │
                    │ (Queue/Log)  │
                    └──────────────┘
```

### Database Schema

```sql
-- Phone numbers table
CREATE TABLE phone_numbers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  verified BOOLEAN DEFAULT FALSE,
  verification_code VARCHAR(6),
  verification_expires TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, phone_number)
);

-- SMS preferences table
CREATE TABLE sms_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users UNIQUE NOT NULL,
  sms_enabled BOOLEAN DEFAULT FALSE,
  reminder_7_days BOOLEAN DEFAULT TRUE,
  reminder_3_days BOOLEAN DEFAULT TRUE,
  reminder_1_day BOOLEAN DEFAULT TRUE,
  reminder_day_of BOOLEAN DEFAULT TRUE,
  daily_digest_enabled BOOLEAN DEFAULT FALSE,
  daily_digest_time TIME DEFAULT '08:00:00',
  quiet_hours_start TIME,
  quiet_hours_end TIME,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- SMS log table
CREATE TABLE sms_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  message TEXT NOT NULL,
  transaction_id UUID REFERENCES transactions,
  deadline_id UUID REFERENCES deadlines,
  status VARCHAR(20) NOT NULL, -- sent, delivered, failed
  twilio_sid VARCHAR(50),
  error_message TEXT,
  sent_at TIMESTAMPTZ DEFAULT NOW()
);

-- Transaction SMS overrides
CREATE TABLE transaction_sms_overrides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id UUID REFERENCES transactions NOT NULL,
  high_priority BOOLEAN DEFAULT FALSE,
  additional_phones JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(transaction_id)
);
```

### API Endpoints

```typescript
// POST /api/sms/verify
// Request phone verification
{
  phoneNumber: string // E.164 format
}

// POST /api/sms/verify/confirm
// Confirm verification code
{
  code: string
}

// GET /api/sms/preferences
// Get user SMS preferences

// PATCH /api/sms/preferences
// Update preferences
{
  smsEnabled?: boolean,
  reminder7Days?: boolean,
  reminder3Days?: boolean,
  reminder1Day?: boolean,
  reminderDayOf?: boolean,
  dailyDigestEnabled?: boolean,
  dailyDigestTime?: string,
  quietHoursStart?: string,
  quietHoursEnd?: string
}

// POST /api/sms/test
// Send test SMS to verified number
```

### Twilio Integration

```typescript
// lib/twilio/client.ts
import Twilio from 'twilio';

const client = new Twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function sendSMS(to: string, message: string) {
  return client.messages.create({
    body: message,
    to: to,
    from: process.env.TWILIO_PHONE_NUMBER
  });
}

export async function verifyPhoneNumber(phoneNumber: string, code: string) {
  return client.verify.v2
    .services(process.env.TWILIO_VERIFY_SERVICE_SID)
    .verificationChecks.create({
      to: phoneNumber,
      code: code
    });
}
```

### Cron Job Implementation

```typescript
// api/cron/sms-reminders/route.ts
export async function GET(request: Request) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  // Get deadlines due in 7, 3, 1 days and today
  const deadlines = await getUpcomingDeadlines([7, 3, 1, 0]);
  
  // Process each deadline
  for (const deadline of deadlines) {
    const user = await getUser(deadline.userId);
    const prefs = await getSmsPreferences(deadline.userId);
    
    // Check if user wants this reminder
    if (!shouldSendSms(deadline, prefs)) continue;
    
    // Check quiet hours
    if (isQuietHours(prefs)) continue;
    
    // Send SMS
    const message = formatReminderMessage(deadline, deadline.transaction);
    await sendSmsWithRetry(user.phone, message, deadline);
  }

  return Response.json({ success: true, sent: deadlines.length });
}
```

### Environment Variables

```bash
# Required for SMS
TWILIO_ACCOUNT_SID=your-account-sid
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_PHONE_NUMBER=+1234567890
TWILIO_VERIFY_SERVICE_SID=your-verify-service-sid

# Feature flag
NEXT_PUBLIC_SMS_ENABLED=true
```

---

## Security Considerations

### Phone Number Storage
- Store phone numbers encrypted at rest
- Use E.164 format for consistency
- Mask phone numbers in UI (show last 4 digits)
- Never log full phone numbers

### Rate Limiting
- Max 5 verification attempts per hour
- Max 10 SMS per user per day
- Max 100 SMS per account per day
- Cooldown period between identical messages (5 min)

### Compliance
- Include opt-out instructions in each SMS
- Honor STOP replies immediately
- Keep opt-out records for compliance
- Follow TCPA guidelines

### Data Privacy
- Allow users to delete phone numbers
- Clear SMS logs after 90 days
- No sensitive transaction details in SMS
- Secure webhook endpoints

---

## Pricing & Packaging

### Feature Tiers

| Tier | SMS Included | Price |
|------|--------------|-------|
| Free | No | $0 |
| Pro | 100 SMS/month | $29/mo |
| Team | 500 SMS/month per seat | $49/seat/mo |
| Enterprise | Unlimited | Custom |

### Overages
- Pro: $0.05 per additional SMS
- Team: $0.03 per additional SMS
- Enterprise: Negotiated

---

## Success Metrics

### Primary Metrics
- SMS opt-in rate: > 40% of Pro users
- SMS deliverability: > 98%
- SMS-related churn reduction: 20%

### Secondary Metrics
- Click-through rate on SMS links: > 15%
- SMS preference configuration rate: > 60%
- Support tickets about missed deadlines: -50%

### Tracking Events
```
sms_enabled
sms_disabled
sms_verification_started
sms_verification_completed
sms_verification_failed
sms_reminder_sent
sms_reminder_clicked
sms_daily_digest_sent
sms_preferences_updated
sms_test_sent
```

---

## Implementation Timeline

### Phase 1: Core (Week 1)
- [ ] Twilio account setup
- [ ] Database schema migration
- [ ] Phone verification flow
- [ ] Basic SMS sending

### Phase 2: Integration (Week 2)
- [ ] Cron job for reminders
- [ ] SMS preferences UI
- [ ] Transaction-level settings
- [ ] Logging and monitoring

### Phase 3: Polish (Week 3)
- [ ] Daily digest feature
- [ ] Rate limiting
- [ ] Quiet hours
- [ ] Opt-out handling
- [ ] Documentation

---

## Dependencies

### External
- Twilio account and phone number
- Twilio Verify service (for phone verification)
- Vercel Cron (or alternative scheduling)

### Internal
- User authentication system
- Transaction and deadline models
- Notification infrastructure
- Settings page UI

---

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Twilio service outage | Low | High | Fallback to email, status page monitoring |
| High SMS costs | Medium | Medium | Usage limits, overage pricing |
| Spam complaints | Low | High | Clear opt-in, easy opt-out, rate limits |
| Phone verification failures | Medium | Medium | Voice call fallback, multiple attempts |
| International numbers | Low | Medium | Start US-only, expand with proper compliance |

---

## Future Enhancements

1. **Two-way SMS** - Reply to get more details
2. **Voice reminders** - Automated phone calls for critical deadlines
3. **WhatsApp integration** - Alternative to SMS
4. **Team SMS routing** - Route to different team members
5. **Smart timing** - Send based on user's typical response patterns

---

*Created: March 2024*
*Target Launch: Month 2, Week 5*
