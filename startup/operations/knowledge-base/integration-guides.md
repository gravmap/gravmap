# Integration Guides (Future)

**Status:** These integrations are planned for future development

**Purpose:** Documentation for third-party integrations when they launch

---

## Integration Roadmap

### Phase 1: Q2 2026
- ✅ Google Calendar (Team Plan)

### Phase 2: Q3 2026
- ✅ Follow Up Boss (CRM)
- ✅ Zapier (Automation platform)

### Phase 3: Q4 2026
- ✅ Salesforce (Enterprise CRM)
- ✅ Dotloop (Transaction management)

---

## Guide 1: Google Calendar Integration

**Status:** Coming April 2026

**Availability:** Team Plan ($199/month)

---

### Overview

Sync all transaction deadlines with Google Calendar for unified scheduling.

**What syncs:**
- Closing dates
- Contingency deadlines
- Custom events
- Final walkthrough
- Any timeline event

**Direction:** Two-way sync
- Changes in [Product Name] → Google Calendar
- Changes in Google Calendar → [Product Name]

---

### Setup Instructions

**Step 1: Access Integrations**
1. Log in to [Product Name]
2. Go to Settings → Integrations
3. Click "Google Calendar"
4. Click "Connect"

**Step 2: Authorize Google**
1. Sign in to Google account
2. Grant permissions:
   - View calendars
   - Edit calendars
3. Click "Allow"

**Step 3: Configure Sync**
1. Select Google calendar to sync:
   - Primary calendar (recommended)
   - Work calendar
   - Create new "Real Estate" calendar
2. Choose what to sync:
   - All transactions
   - Select transactions only
3. Set sync preferences:
   - Include reminders (yes/no)
   - Event color coding
4. Click "Save"

**Step 4: Verify Sync**
1. Open Google Calendar
2. Check for transaction events
3. Confirm dates match [Product Name]

---

### How It Works

**Automatic Sync:**
- New transaction created → Events added to calendar
- Deadline date changes → Calendar event updates
- Transaction archived → Events removed (optional)

**Real-Time Updates:**
- Changes sync within seconds
- No manual refresh needed

**Calendar Event Details:**
- Event title: "[123 Main St] Inspection Deadline"
- Description: Link to transaction, details
- Reminders: Based on your settings

---

### Troubleshooting

**Problem: Events not appearing**

**Solutions:**
1. Check correct calendar selected
2. Refresh Google Calendar
3. Disconnect and reconnect
4. Contact support

---

**Problem: Duplicate events**

**Solutions:**
1. Delete duplicates in Google Calendar
2. Check for multiple syncs (disconnect extra)
3. Contact support

---

### Disconnect Integration

**Instructions:**
1. Settings → Integrations → Google Calendar
2. Click "Disconnect"
3. Confirm
4. Events removed from Google Calendar (optional)

**Note:** Data in [Product Name] is unaffected

---

## Guide 2: Follow Up Boss Integration

**Status:** Coming Q3 2026

**Availability:** All plans

---

### Overview

Sync contacts and activities between [Product Name] and Follow Up Boss CRM.

**What syncs:**
- New contacts (both directions)
- Transaction status updates
- Activity logging
- Client communication history

**Use Cases:**
- Keep CRM updated with transaction progress
- Trigger action plans when transactions created
- Unified contact database

---

### Setup Instructions

**Step 1: Get API Key from Follow Up Boss**
1. Log in to Follow Up Boss
2. Go to Settings → API
3. Generate new API key
4. Copy key

**Step 2: Connect in [Product Name]**
1. Log in to [Product Name]
2. Settings → Integrations → Follow Up Boss
3. Paste API key
4. Click "Connect"

**Step 3: Configure Sync**
1. Choose sync direction:
   - Two-way (recommended)
   - [Product Name] → Follow Up Boss only
   - Follow Up Boss → [Product Name] only
2. Select what to sync:
   - Contacts
   - Transactions
   - Activities
3. Map custom fields (if needed)
4. Save

**Step 4: Test Sync**
1. Create test contact
2. Verify appears in both systems
3. Confirm data accuracy

---

### How It Works

**Contact Sync:**
- New contact in Follow Up Boss → Creates in [Product Name]
- New contact in [Product Name] → Creates in Follow Up Boss
- Updates sync bidirectionally

**Transaction Tracking:**
- New transaction → Logged in Follow Up Boss
- Status changes → Updates in Follow Up Boss
- Transaction closed → Marked in Follow Up Boss

**Activity Logging:**
- Client emails sent → Logged in Follow Up Boss
- Deadlines approached → Logged
- Documents uploaded → Logged

---

### Best Practices

1. **Use consistent naming:** Same client name in both systems
2. **Map fields correctly:** Ensure data goes to right place
3. **Regular audits:** Monthly check for sync issues
4. **One system of record:** Use Follow Up Boss for contacts, [Product Name] for transactions

---

## Guide 3: Zapier Integration

**Status:** Coming Q3 2026

**Availability:** All plans (Zapier account required)

---

### Overview

Connect [Product Name] to 5,000+ apps via Zapier automation platform.

**Use Cases:**
- New transaction → Create Google Drive folder
- Deadline approaching → Send Slack notification
- Transaction closed → Update Airtable database
- Client email sent → Log in CRM

---

### Setup Instructions

**Step 1: Create Zapier Account**
1. Go to zapier.com
2. Sign up (free tier available)
3. Verify email

**Step 2: Connect [Product Name]**
1. In Zapier, click "Make a Zap"
2. Search for "[Product Name]"
3. Click "Connect"
4. Enter API key (from Settings → API)
5. Authorize

**Step 3: Create Automation (Zap)**
1. Choose trigger:
   - New transaction created
   - Deadline approaching
   - Transaction status changed
   - Client email sent
2. Choose action:
   - Create folder in Google Drive
   - Send Slack message
   - Add row to Google Sheets
   - Create task in Asana
3. Map fields
4. Test zap
5. Turn on

---

### Example Automations

**Automation 1: New Transaction → Google Drive Folder**

**Trigger:** New transaction created in [Product Name]

**Action:** Create folder in Google Drive
- Folder name: "123 Main St - Smith"
- Subfolders: "Contracts", "Inspections", "Appraisal"

**Why:** Automatic organization

---

**Automation 2: Deadline Approaching → Slack Notification**

**Trigger:** Deadline in 3 days

**Action:** Send Slack message to #transactions channel
- Message: "⚠️ Inspection deadline for 123 Main St in 3 days"

**Why:** Team awareness

---

**Automation 3: Transaction Closed → Airtable Database**

**Trigger:** Transaction status = "Closed"

**Action:** Add row to Airtable
- Columns: Address, Close Date, Price, Client Name

**Why:** Track production metrics

---

### Best Practices

1. **Start simple:** One zap at a time
2. **Test thoroughly:** Before turning on
3. **Monitor:** Check zap history weekly
4. **Document:** Keep list of active zaps

---

## Guide 4: Salesforce Integration (Enterprise)

**Status:** Coming Q4 2026

**Availability:** Enterprise plans (custom pricing)

---

### Overview

Deep integration with Salesforce CRM for enterprise teams.

**What syncs:**
- Contacts and leads
- Opportunities/transactions
- Activities and timeline
- Documents and notes

**Use Cases:**
- Unified enterprise workflow
- Reporting and analytics
- Team collaboration at scale

---

### Setup

**Contact:** enterprise@[domain].com for setup assistance

**Requirements:**
- Salesforce license
- Enterprise [Product Name] plan
- Technical setup (1-2 hours)

---

## Integration Support

### General Troubleshooting

**Sync Issues:**
1. Check API connection status
2. Disconnect and reconnect
3. Review field mappings
4. Contact support

**Data Mismatches:**
1. Check field mapping
2. Verify data in both systems
3. Manual correction if needed

---

### Contact Support

**Email:** integrations@[domain].com

**Response time:**
- Standard: 24 hours
- Urgent: 4 hours

**Provide:**
- Integration name
- Issue description
- Screenshots
- Error messages

---

## Document Control

- **Last Updated:** [Date]
- **Status:** Planning documents (integrations not yet built)
- **Owner:** Product Team
- **Review Frequency:** Quarterly
