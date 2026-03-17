# Google Calendar Integration Feature Specification

**Feature ID:** FEA-002
**Priority:** P0 (Critical)
**Status:** Planned
**Owner:** Product Team

---

## Overview

Enable two-way sync between GravMap deadlines and Google Calendar, allowing agents to see all deadlines in their existing calendar workflow.

### Problem Statement

Real estate agents live in their calendars. They check Google Calendar dozens of times daily. When GravMap deadlines exist only in our system, they become "out of sight, out of mind." Users want a unified view of all their commitments.

### Proposed Solution

Integrate with Google Calendar API to:
1. Push GravMap deadlines to a dedicated "GravMap" calendar
2. Allow users to edit deadline dates in Google Calendar (syncs back)
3. Show transaction details when clicking calendar events
4. Support multiple calendars (personal, work, team)

---

## User Stories

### US-1: Connect Google Calendar
**As a** Pro subscriber
**I want to** connect my Google Calendar account
**So that** my deadlines appear in my calendar

**Acceptance Criteria:**
- [ ] One-click OAuth connection flow
- [ ] Shows clear permission request explanation
- [ ] Handles multiple Google accounts
- [ ] Shows connection status in settings
- [ ] Easy disconnect option

### US-2: Automatic Calendar Events
**As a** user with Google Calendar connected
**I want to** see my GravMap deadlines as calendar events
**So that** I can view them alongside other commitments

**Acceptance Criteria:**
- [ ] Each deadline creates a calendar event
- [ ] Events appear in dedicated "GravMap" calendar
- [ ] Event includes deadline type, transaction name
- [ ] Event description links back to GravMap
- [ ] Events include relevant notes/details
- [ ] Color-coded by deadline type

### US-3: Two-Way Sync
**As a** user
**I want to** edit deadline dates in Google Calendar
**So that** I can manage everything in one place

**Acceptance Criteria:**
- [ ] Dragging event in Google Calendar updates GravMap
- [ ] Editing event date/time updates GravMap
- [ ] Changes sync within 5 minutes
- [ ] Sync conflicts show clear resolution UI
- [ ] Audit log of changes

### US-4: Calendar Event Details
**As a** user
**I want to** see relevant details in the calendar event
**So that** I have context without opening GravMap

**Acceptance Criteria:**
- [ ] Event title: "[Type] - Transaction Address"
- [ ] Event description includes:
  - Property address
  - Client names
  - Notes
  - Link to GravMap transaction
  - Other deadlines in same transaction
- [ ] Shows countdown ("3 days until deadline")

### US-5: Multiple Calendars
**As a** team lead
**I want to** sync deadlines to team calendars
**So that** my team can see upcoming deadlines

**Acceptance Criteria:**
- [ ] Can select which Google Calendar to sync to
- [ ] Can create new calendar from GravMap
- [ ] Can sync to multiple calendars
- [ ] Can configure per transaction
- [ ] Team members see shared calendar events

---

## Technical Approach

### Architecture

```
┌─────────────┐     ┌──────────────┐     ┌─────────────────┐
│  GravMap    │────▶│  Sync Engine │────▶│ Google Calendar │
│  Deadline   │     │              │     │      API        │
└─────────────┘     └──────────────┘     └─────────────────┘
                           │
                           ▼
                    ┌──────────────┐
                    │  Webhook     │
                    │  Handler     │
                    └──────────────┘
```

### Database Schema

```sql
-- Google Calendar connections
CREATE TABLE google_calendar_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  google_email VARCHAR(255) NOT NULL,
  access_token TEXT NOT NULL,
  refresh_token TEXT NOT NULL,
  token_expires_at TIMESTAMPTZ NOT NULL,
  calendar_id VARCHAR(255),
  calendar_name VARCHAR(255),
  sync_enabled BOOLEAN DEFAULT TRUE,
  last_sync_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, google_email)
);

-- Calendar event mapping
CREATE TABLE calendar_event_mappings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deadline_id UUID REFERENCES deadlines NOT NULL,
  calendar_connection_id UUID REFERENCES google_calendar_connections NOT NULL,
  google_event_id VARCHAR(255) NOT NULL,
  last_synced_at TIMESTAMPTZ DEFAULT NOW(),
  sync_status VARCHAR(20) DEFAULT 'active', -- active, paused, error
  etag VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(deadline_id, calendar_connection_id)
);

-- Sync log
CREATE TABLE calendar_sync_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  connection_id UUID REFERENCES google_calendar_connections NOT NULL,
  action VARCHAR(50) NOT NULL, -- create, update, delete
  deadline_id UUID REFERENCES deadlines,
  google_event_id VARCHAR(255),
  status VARCHAR(20) NOT NULL, -- success, failed, conflict
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### API Endpoints

```typescript
// GET /api/integrations/google-calendar/connect
// Initiate OAuth flow
// Returns: OAuth URL

// GET /api/integrations/google-calendar/callback
// Handle OAuth callback
// Exchange code for tokens

// DELETE /api/integrations/google-calendar/disconnect
// Revoke tokens and remove connection

// GET /api/integrations/google-calendar/status
// Get connection status and calendars

// POST /api/integrations/google-calendar/sync
// Trigger manual sync

// POST /api/integrations/google-calendar/webhook
// Handle Google push notifications

// GET /api/integrations/google-calendar/calendars
// List user's Google Calendars

// PATCH /api/integrations/google-calendar/settings
// Update calendar selection, sync settings
```

### Google Calendar API Integration

```typescript
// lib/google-calendar/client.ts
import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.NEXT_PUBLIC_APP_URL}/api/integrations/google-calendar/callback`
);

export async function createCalendarEvent(
  accessToken: string,
  deadline: Deadline,
  transaction: Transaction
) {
  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
  oauth2Client.setCredentials({ access_token: accessToken });

  const event = {
    summary: `${deadline.type} - ${transaction.propertyAddress}`,
    description: formatEventDescription(deadline, transaction),
    start: { date: deadline.dueDate },
    end: { date: deadline.dueDate },
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 7 * 24 * 60 },
        { method: 'popup', minutes: 3 * 24 * 60 },
        { method: 'popup', minutes: 24 * 60 },
      ]
    },
    extendedProperties: {
      private: {
        gravmapDeadlineId: deadline.id,
        gravmapTransactionId: transaction.id
      }
    }
  };

  return calendar.events.insert({
    calendarId: 'primary',
    requestBody: event
  });
}

export async function watchCalendarChanges(
  calendarId: string,
  webhookUrl: string
) {
  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
  
  return calendar.events.watch({
    calendarId,
    requestBody: {
      id: uuidv4(),
      type: 'web_hook',
      address: webhookUrl
    }
  });
}
```

### Sync Engine

```typescript
// lib/google-calendar/sync.ts
export async function syncDeadlineToCalendar(
  deadline: Deadline,
  connection: GoogleCalendarConnection
) {
  // Refresh token if expired
  if (isTokenExpired(connection)) {
    await refreshAccessToken(connection);
  }

  // Get or create event mapping
  const mapping = await getEventMapping(deadline.id, connection.id);
  
  if (mapping) {
    // Update existing event
    await updateCalendarEvent(mapping.googleEventId, deadline);
  } else {
    // Create new event
    const event = await createCalendarEvent(deadline);
    await createEventMapping(deadline.id, connection.id, event.id);
  }
  
  await logSync(connection.id, 'sync', deadline.id, 'success');
}

export async function handleCalendarWebhook(payload: WebhookPayload) {
  // Get changed events
  const changes = await getCalendarChanges(payload.calendarId);
  
  for (const change of changes) {
    // Find corresponding deadline
    const mapping = await getMappingByGoogleEventId(change.id);
    if (!mapping) continue;
    
    // Check if date changed
    if (change.start.date !== mapping.deadline.dueDate) {
      // Update GravMap deadline
      await updateDeadline(mapping.deadlineId, {
        dueDate: change.start.date,
        source: 'google_calendar'
      });
      
      await logSync(connection.id, 'update', mapping.deadlineId, 'success');
    }
  }
}
```

### Webhook Handler

```typescript
// app/api/integrations/google-calendar/webhook/route.ts
export async function POST(request: Request) {
  // Verify webhook authenticity
  const channelToken = request.headers.get('x-goog-channel-token');
  if (channelToken !== process.env.GOOGLE_WEBHOOK_TOKEN) {
    return new Response('Unauthorized', { status: 401 });
  }

  const payload = await request.json();
  
  // Process webhook asynchronously
  await enqueueWebhookProcessing(payload);
  
  return new Response('OK', { status: 200 });
}
```

### Environment Variables

```bash
# Google OAuth
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret

# Webhook
GOOGLE_WEBHOOK_TOKEN=your-random-webhook-token

# Feature flag
NEXT_PUBLIC_GOOGLE_CALENDAR_ENABLED=true
```

---

## Event Formatting

### Event Title Format
```
[Deadline Type] - [Property Address]
Example: "Inspection Contingency - 123 Main St, Austin TX"
```

### Event Description Template
```
📋 Transaction: [Transaction Name]
📍 Property: [Address]
👥 Clients: [Buyer/Seller Names]
📅 Deadline: [Type] - [Days] days

📝 Notes:
[Transaction notes]

🔗 View in GravMap: [Link]

Other Deadlines for this Transaction:
• [Other deadline 1] - [Date]
• [Other deadline 2] - [Date]
```

### Color Coding
| Deadline Type | Color | Hex |
|--------------|-------|-----|
| Contingency | Yellow | #FFB300 |
| Inspection | Orange | #E67C00 |
| Financing | Red | #D50000 |
| Closing | Green | #0B8043 |
| Other | Blue | #039BE5 |

---

## Security Considerations

### OAuth Scopes
Request minimum required scopes:
- `https://www.googleapis.com/auth/calendar.events` - Manage events
- `https://www.googleapis.com/auth/calendar.readonly` - Read calendars (for selection)

### Token Storage
- Encrypt tokens at rest
- Use secure refresh token rotation
- Store tokens in separate table with RLS

### Webhook Security
- Verify `x-goog-channel-token` header
- Validate `x-goog-resource-id`
- Rate limit webhook processing
- Log all webhook attempts

### Data Privacy
- Don't store unnecessary calendar data
- Clear tokens on disconnect
- Provide data export on request
- Honor right to deletion

---

## Error Handling

### Common Errors

| Error | Handling |
|-------|----------|
| Token expired | Auto-refresh, retry |
| Revoked access | Prompt reconnection |
| Calendar deleted | Create new calendar |
| Event deleted externally | Recreate event |
| Rate limit exceeded | Exponential backoff, queue |
| Network timeout | Retry with backoff |

### Sync Conflict Resolution

When same deadline edited in both systems:
1. Compare timestamps
2. Most recent edit wins
3. Log conflict for audit
4. Notify user of resolution

---

## Success Metrics

### Primary Metrics
- Calendar connection rate: > 50% of Pro users
- Events synced per user per month: > 20
- Two-way sync usage: > 30% of connected users

### Secondary Metrics
- Time saved per user: Estimate 30 min/week
- Calendar app opens with GravMap visible: Track via event views
- Support tickets about sync: < 5/week

### Tracking Events
```
google_calendar_connected
google_calendar_disconnected
google_calendar_sync_triggered
google_calendar_event_created
google_calendar_event_updated
google_calendar_event_deleted
google_calendar_two_way_sync
google_calendar_error
```

---

## Implementation Timeline

### Phase 1: Core (Week 1-2)
- [ ] Google Cloud project setup
- [ ] OAuth flow implementation
- [ ] Basic event creation
- [ ] Connection management UI

### Phase 2: Sync (Week 3)
- [ ] Event update/delete handling
- [ ] Webhook setup
- [ ] Two-way sync logic
- [ ] Error handling and retry

### Phase 3: Polish (Week 4)
- [ ] Multiple calendar support
- [ ] Custom calendar selection
- [ ] Color coding
- [ ] Enhanced event descriptions
- [ ] Sync status indicators

---

## Dependencies

### External
- Google Cloud project with Calendar API enabled
- OAuth consent screen configured
- SSL certificate for webhooks (production)

### Internal
- User authentication
- Transaction and deadline models
- Settings page
- Notification system (for sync errors)

---

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| API quota limits | Low | Medium | Batch operations, monitor usage |
| OAuth policy changes | Low | High | Follow best practices, stay updated |
| Sync conflicts | Medium | Low | Clear resolution logic, logging |
| Token revocation | Medium | Medium | Clear reconnection flow, notifications |
| Google service outage | Low | High | Graceful degradation, email fallback |

---

## Future Enhancements

1. **Outlook Calendar** - Microsoft Graph API integration
2. **Apple Calendar** - CalDAV support
3. **Smart scheduling** - Suggest optimal times for deadlines
4. **Calendar analytics** - Show scheduling patterns
5. **Team calendar views** - See all team deadlines

---

*Created: March 2024*
*Target Launch: Month 2, Week 5*
