# Email Notifications & Cron Jobs

This document explains how the email notification system works and how to set up scheduled jobs.

## Overview

GravMap sends three types of emails:

1. **Deadline Reminders** - Sent 7, 3, and 1 day(s) before a deadline
2. **Daily Digest** - Daily summary of upcoming and overdue deadlines
3. **Client Status Updates** - Manual emails sent to clients with transaction progress

## Email Provider: Resend

We use [Resend](https://resend.com) for email delivery. It's developer-friendly and has a generous free tier.

### Setup

1. Create a Resend account at https://resend.com
2. Get your API key from https://resend.com/api-keys
3. Add to your `.env.local`:
   ```
   RESEND_API_KEY=re_xxxxx
   EMAIL_FROM=notifications@yourdomain.com
   ```
4. Verify your sending domain in Resend dashboard

### Mock Mode

If `RESEND_API_KEY` is not set, the system runs in **mock mode** - emails are logged to console instead of being sent. This is useful for development.

## Cron Jobs

### Vercel Cron (Recommended for Vercel deployments)

Vercel automatically runs cron jobs defined in `vercel.json`. The configuration includes:

- **Deadline reminders**: Every day at 9:00 AM UTC
- **Daily digest**: Every day at 8:00 AM UTC

```json
{
  "crons": [
    {
      "path": "/api/cron/send-reminders?type=reminders&days=7,3,1",
      "schedule": "0 9 * * *"
    },
    {
      "path": "/api/cron/send-reminders?type=digest",
      "schedule": "0 8 * * *"
    }
  ]
}
```

### Manual Testing

Test cron endpoints locally:

```bash
# Test deadline reminders
curl -X POST "http://localhost:3000/api/cron/send-reminders?type=reminders&days=7,3,1"

# Test daily digest
curl -X POST "http://localhost:3000/api/cron/send-reminders?type=digest"

# Health check
curl "http://localhost:3000/api/cron/send-reminders"
```

### External Cron Services

If not using Vercel, use any cron service to call:

```
POST https://your-domain.com/api/cron/send-reminders?type=reminders
POST https://your-domain.com/api/cron/send-reminders?type=digest
```

#### With Authorization (Recommended)

Set `CRON_SECRET` in your environment, then include it:

```bash
curl -X POST \
  -H "Authorization: Bearer your-cron-secret" \
  "https://your-domain.com/api/cron/send-reminders?type=reminders"
```

### Popular Cron Services

- [cron-job.org](https://cron-job.org) - Free
- [EasyCron](https://easycron.com) - Free tier available
- [GitHub Actions](./github-actions-cron.md) - Free with repo
- [AWS EventBridge](https://aws.amazon.com/eventbridge/) - For AWS deployments

## Email Templates

All templates are in `src/lib/email/templates.ts`:

### 1. Deadline Reminder

Sent when a deadline is approaching:
- 7 days before
- 3 days before
- 1 day before
- On the day

Includes:
- Event name and date
- Days remaining
- Transaction details
- Link to transaction

### 2. Daily Digest

Sent daily with:
- Overdue items (highlighted)
- Upcoming items (next 7 days)
- Quick summary counts

### 3. Client Status Update

Manual emails sent to clients with:
- Custom message from agent
- Transaction overview
- Completed milestones
- Upcoming milestones

## Notification Settings

Users can customize their preferences in Settings > Notifications:

- Enable/disable email reminders
- Enable/disable SMS notifications (future)
- Enable/disable weekly digest
- Choose reminder days (default: 7, 3, 1)
- Set digest time

Settings are stored in `users.notification_settings` JSONB column.

## Database Tables

### `notification_logs`

Tracks all sent notifications:

```sql
SELECT * FROM notification_logs
WHERE user_id = 'xxx'
ORDER BY sent_at DESC;
```

### `communications`

Tracks client-facing emails:

```sql
SELECT * FROM communications
WHERE transaction_id = 'xxx'
ORDER BY created_at DESC;
```

## API Endpoints

### Cron Endpoints

- `POST /api/cron/send-reminders?type=reminders` - Send deadline reminders
- `POST /api/cron/send-reminders?type=digest` - Send daily digest
- `GET /api/cron/send-reminders` - Health check

### User Settings

- `GET /api/user/notification-settings` - Get settings
- `PUT /api/user/notification-settings` - Update settings

### Timeline Events

- `PATCH /api/timeline-events/[id]` - Update event status
- `DELETE /api/timeline-events/[id]` - Delete event

### Status Updates

- `POST /api/transactions/[id]/send-status-update` - Send client email

## Troubleshooting

### Emails not sending

1. Check `RESEND_API_KEY` is set
2. Check sender domain is verified in Resend
3. Check logs for errors
4. Test with mock mode first

### Cron not running

1. For Vercel: Check deployment logs
2. For external: Verify endpoint is accessible
3. Check `CRON_SECRET` matches if set

### Reminders already sent

The system tracks sent reminders in `timeline_events.reminder_dates`. To resend:
```sql
UPDATE timeline_events
SET reminder_sent = false, reminder_dates = '[]'
WHERE id = 'event-id';
```
