# Follow Up Boss Integration Feature Specification

**Feature ID:** FEA-003
**Priority:** P0 (Critical)
**Status:** Planned
**Owner:** Product Team

---

## Overview

Integrate with Follow Up Boss (FUB), the leading real estate CRM, to sync contacts, transactions, and deadlines, creating a seamless workflow for agents.

### Problem Statement

Most real estate agents use Follow Up Boss as their primary CRM. They manage contacts, leads, and follow-ups there. When transaction data lives in GravMap separately, it creates:
- Double entry of client information
- Fragmented view of client relationships
- Missed opportunities to follow up
- Inefficient workflows

### Proposed Solution

Build a two-way integration that:
1. Syncs contacts between FUB and GravMap
2. Creates GravMap transactions from FUB deals
3. Pushes deadline reminders to FUB as tasks
4. Updates FUB with transaction progress
5. Links activities between systems

---

## User Stories

### US-1: Connect Follow Up Boss
**As a** Pro subscriber using FUB
**I want to** connect my Follow Up Boss account
**So that** my data syncs between systems

**Acceptance Criteria:**
- [ ] Simple API key connection flow
- [ ] Validates API key before saving
- [ ] Shows connection status in settings
- [ ] Easy disconnect with data cleanup
- [ ] Handles multiple FUB accounts

### US-2: Import Contacts from FUB
**As a** user with FUB connected
**I want to** import my contacts into GravMap
**So that** I can create transactions without re-entering data

**Acceptance Criteria:**
- [ ] One-click import all contacts
- [ ] Incremental sync (only new/updated)
- [ ] Match existing contacts by email
- [ ] Preserve FUB tags and categories
- [ ] Show import progress and summary

### US-3: Create Transactions from FUB Deals
**As a** FUB user
**I want to** create GravMap transactions from my FUB deals
**So that** I can track deadlines for my pipeline

**Acceptance Criteria:**
- [ ] "Create in GravMap" action in FUB
- [ ] Automatically pulls property address
- [ ] Links to FUB contact
- [ ] Creates deadlines based on deal stage
- [ ] Shows GravMap link in FUB

### US-4: Push Tasks to FUB
**As a** user
**I want to** see GravMap deadlines as FUB tasks
**So that** I manage everything in one place

**Acceptance Criteria:**
- [ ] Each deadline creates FUB task
- [ ] Task includes deadline details and link
- [ ] Task due date matches deadline date
- [ ] Completing task marks deadline complete
- [ ] Configurable per deadline type

### US-5: Two-Way Activity Sync
**As a** user
**I want to** see GravMap activities in FUB timeline
**So that** I have complete client history

**Acceptance Criteria:**
- [ ] Document uploads appear in FUB
- [ ] Deadline completions logged
- [ ] Transaction status changes tracked
- [ ] Activities linked to contacts
- [ ] Includes links back to GravMap

### US-6: Contact Matching
**As a** user
**I want to** link GravMap transactions to FUB contacts
**So that** everything is connected

**Acceptance Criteria:**
- [ ] Auto-match by email/phone
- [ ] Manual matching UI for conflicts
- [ ] Show FUB contact in transaction view
- [ ] One-click navigate to FUB profile
- [ ] Handle contact merges in FUB

---

## Technical Approach

### Architecture

```
┌─────────────┐     ┌──────────────┐     ┌─────────────────┐
│   GravMap   │◀───▶│  Sync Layer  │◀───▶│ Follow Up Boss  │
│  Database   │     │              │     │      API        │
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
-- FUB Connections
CREATE TABLE fub_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  fub_account_id VARCHAR(50) NOT NULL,
  api_key VARCHAR(255) NOT NULL,
  sync_enabled BOOLEAN DEFAULT TRUE,
  sync_contacts BOOLEAN DEFAULT TRUE,
  sync_deals BOOLEAN DEFAULT TRUE,
  sync_tasks BOOLEAN DEFAULT TRUE,
  last_sync_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, fub_account_id)
);

-- Contact mappings
CREATE TABLE fub_contact_mappings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gravmap_user_id UUID REFERENCES auth.users NOT NULL,
  fub_contact_id VARCHAR(50) NOT NULL,
  gravmap_contact_id UUID REFERENCES contacts,
  email VARCHAR(255),
  phone VARCHAR(50),
  last_synced_at TIMESTAMPTZ DEFAULT NOW(),
  sync_status VARCHAR(20) DEFAULT 'active',
  UNIQUE(fub_contact_id, gravmap_user_id)
);

-- Deal/Transaction mappings
CREATE TABLE fub_deal_mappings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fub_deal_id VARCHAR(50) NOT NULL,
  gravmap_transaction_id UUID REFERENCES transactions NOT NULL,
  connection_id UUID REFERENCES fub_connections NOT NULL,
  last_synced_at TIMESTAMPTZ DEFAULT NOW(),
  sync_status VARCHAR(20) DEFAULT 'active',
  UNIQUE(fub_deal_id, gravmap_transaction_id)
);

-- Task mappings
CREATE TABLE fub_task_mappings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fub_task_id VARCHAR(50) NOT NULL,
  gravmap_deadline_id UUID REFERENCES deadlines NOT NULL,
  connection_id UUID REFERENCES fub_connections NOT NULL,
  last_synced_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(fub_task_id, gravmap_deadline_id)
);

-- Sync log
CREATE TABLE fub_sync_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  connection_id UUID REFERENCES fub_connections NOT NULL,
  entity_type VARCHAR(50) NOT NULL, -- contact, deal, task
  entity_id VARCHAR(50),
  action VARCHAR(50) NOT NULL, -- create, update, delete, sync
  status VARCHAR(20) NOT NULL, -- success, failed, skipped
  error_message TEXT,
  payload JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### API Endpoints

```typescript
// POST /api/integrations/fub/connect
// Connect FUB account
{
  apiKey: string
}

// DELETE /api/integrations/fub/disconnect
// Disconnect and clean up data

// GET /api/integrations/fub/status
// Get connection status and sync stats

// POST /api/integrations/fub/sync/contacts
// Trigger contact sync

// POST /api/integrations/fub/sync/deals
// Trigger deal sync

// POST /api/integrations/fub/webhook
// Handle FUB webhooks

// POST /api/integrations/fub/create-deal
// Create transaction from FUB deal

// GET /api/integrations/fub/search-contacts
// Search FUB contacts for matching
```

### Follow Up Boss API Client

```typescript
// lib/fub/client.ts
const FUB_API_BASE = 'https://api.followupboss.com/v1';

export class FollowUpBossClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${FUB_API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Basic ${btoa(this.apiKey + ':')}`,
        'Content-Type': 'application/json',
        ...options.headers
      }
    });

    if (!response.ok) {
      throw new FUBApiError(response.status, await response.text());
    }

    return response.json();
  }

  // Contacts
  async getContacts(params?: { limit?: number; offset?: number }) {
    return this.request('/contacts?' + new URLSearchParams(params as any));
  }

  async getContact(id: string) {
    return this.request(`/contacts/${id}`);
  }

  async createContact(data: ContactData) {
    return this.request('/contacts', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async updateContact(id: string, data: Partial<ContactData>) {
    return this.request(`/contacts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  // Deals
  async getDeals(params?: { status?: string; limit?: number }) {
    return this.request('/deals?' + new URLSearchParams(params as any));
  }

  async createDeal(data: DealData) {
    return this.request('/deals', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  // Tasks
  async createTask(data: TaskData) {
    return this.request('/tasks', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async updateTask(id: string, data: Partial<TaskData>) {
    return this.request(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  // Events (timeline)
  async createEvent(data: EventData) {
    return this.request('/events', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
}
```

### Sync Logic

```typescript
// lib/fub/sync.ts
export async function syncContacts(connection: FubConnection) {
  const client = new FollowUpBossClient(connection.apiKey);
  let offset = 0;
  const limit = 100;
  let hasMore = true;

  while (hasMore) {
    const { contacts, next } = await client.getContacts({ limit, offset });
    
    for (const fubContact of contacts) {
      // Check if already mapped
      const existing = await findMappingByFubId(fubContact.id);
      
      if (existing) {
        // Update existing contact
        await updateGravmapContact(existing.gravmapContactId, fubContact);
      } else {
        // Try to match by email
        const matched = await findContactByEmail(fubContact.emails?.[0]?.value);
        
        if (matched) {
          // Create mapping
          await createContactMapping(fubContact.id, matched.id);
        } else {
          // Create new contact
          const newContact = await createGravmapContact(fubContact);
          await createContactMapping(fubContact.id, newContact.id);
        }
      }
    }

    hasMore = !!next;
    offset += limit;
  }

  await updateLastSync(connection.id);
}

export async function syncDeadlineToTask(
  deadline: Deadline,
  connection: FubConnection
) {
  const client = new FollowUpBossClient(connection.apiKey);
  
  // Get transaction contact mapping
  const transaction = await getTransaction(deadline.transactionId);
  const contactMapping = await getContactMapping(transaction.contactId);
  
  if (!contactMapping) return;

  // Check for existing task
  const existingTask = await getTaskMapping(deadline.id);

  const taskData = {
    subject: `${deadline.type} - ${transaction.propertyAddress}`,
    dueDate: deadline.dueDate,
    contactId: contactMapping.fubContactId,
    description: `
Deadline: ${deadline.type}
Transaction: ${transaction.name}
Due: ${formatDate(deadline.dueDate)}

View in GravMap: ${getTransactionUrl(transaction.id)}
    `.trim()
  };

  if (existingTask) {
    await client.updateTask(existingTask.fubTaskId, taskData);
  } else {
    const task = await client.createTask(taskData);
    await createTaskMapping(task.id, deadline.id);
  }
}

export async function logActivityToTimeline(
  transaction: Transaction,
  event: ActivityEvent
) {
  const client = new FollowUpBossClient(connection.apiKey);
  const contactMapping = await getContactMapping(transaction.contactId);
  
  if (!contactMapping) return;

  await client.createEvent({
    type: 'Note',
    contactId: contactMapping.fubContactId,
    subject: event.title,
    body: event.description,
    htmlBody: event.htmlDescription
  });
}
```

### Webhook Handler

```typescript
// app/api/integrations/fub/webhook/route.ts
export async function POST(request: Request) {
  const signature = request.headers.get('x-fub-signature');
  const body = await request.text();
  
  // Verify webhook signature
  if (!verifyFubSignature(body, signature)) {
    return new Response('Invalid signature', { status: 401 });
  }

  const payload = JSON.parse(body);
  
  switch (payload.event) {
    case 'contact.created':
    case 'contact.updated':
      await handleContactChange(payload.data);
      break;
    case 'deal.created':
    case 'deal.updated':
      await handleDealChange(payload.data);
      break;
    case 'task.completed':
      await handleTaskCompleted(payload.data);
      break;
  }
  
  return new Response('OK', { status: 200 });
}
```

---

## FUB Integration Points

### From FUB to GravMap

| FUB Entity | GravMap Entity | Sync Direction |
|------------|----------------|----------------|
| Contact | Contact | Bi-directional |
| Deal | Transaction | FUB → GravMap (init) |
| Task | Deadline (read-only) | GravMap → FUB |

### From GravMap to FUB

| GravMap Event | FUB Action |
|---------------|------------|
| Transaction created | Create/update deal |
| Deadline created | Create task |
| Deadline completed | Complete task |
| Document uploaded | Add note to contact |
| Transaction closed | Update deal stage |

---

## Data Mapping

### Contact Fields

| FUB Field | GravMap Field |
|-----------|---------------|
| firstName | firstName |
| lastName | lastName |
| emails[].value | email |
| phones[].value | phone |
| addresses[].street | address |
| addresses[].city | city |
| addresses[].state | state |
| addresses[].code | zip |
| tags | tags |
| stage | status |
| source | source |

### Deal Fields

| FUB Field | GravMap Field |
|-----------|---------------|
| name | Transaction name |
| property.address | Property address |
| property.price | Transaction value |
| stage | Transaction status |
| contactId | Contact reference |
| closeDate | Closing date |

---

## Security Considerations

### API Key Storage
- Encrypt API keys at rest
- Never expose in client-side code
- Rotate keys on compromise
- Audit all API access

### Webhook Security
- Verify FUB signature
- Validate payload structure
- Rate limit processing
- Log all webhooks

### Data Privacy
- Respect FUB data ownership
- Clear mappings on disconnect
- Support data deletion requests
- Don't store unnecessary data

---

## Success Metrics

### Primary Metrics
- FUB connection rate: > 40% of Pro users
- Contacts synced per connection: > 50
- Tasks created per month: > 20 per user

### Secondary Metrics
- Time saved on data entry: 30+ min/week
- Cross-system navigation: Track link clicks
- Support tickets: < 3/week related to integration

### Tracking Events
```
fub_connected
fub_disconnected
fub_sync_completed
fub_sync_failed
fub_contact_created
fub_contact_updated
fub_task_created
fub_task_completed
fub_deal_created
fub_activity_logged
```

---

## Implementation Timeline

### Phase 1: Core (Week 1-2)
- [ ] FUB API research and testing
- [ ] Connection flow
- [ ] Contact sync (read)
- [ ] Basic webhook handling

### Phase 2: Sync (Week 3)
- [ ] Contact write-back
- [ ] Task creation
- [ ] Activity logging
- [ ] Error handling

### Phase 3: Polish (Week 4)
- [ ] Deal integration
- [ ] UI improvements
- [ ] Conflict resolution
- [ ] Documentation

---

## Dependencies

### External
- FUB API access (requires FUB subscription)
- FUB webhook configuration
- API documentation access

### Internal
- Contact model (may need to create)
- Transaction model
- Settings page
- Background job processing

---

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| API changes | Low | High | Version pinning, monitoring |
| Rate limits | Medium | Medium | Batching, queuing |
| Data conflicts | Medium | Low | Clear resolution rules |
| API key revocation | Low | Medium | Reconnection flow |
| Duplicate contacts | High | Low | Matching algorithms, merge UI |

---

## Future Enhancements

1. **Other CRMs** - KVCore, LionDesk, RealGeeks
2. **Smart field mapping** - Auto-detect custom fields
3. **Bulk operations** - Sync multiple contacts at once
4. **Two-way deal sync** - Full bi-directional sync
5. **Pipeline mapping** - Auto-create deadlines based on FUB pipeline stage

---

*Created: March 2024*
*Target Launch: Month 3, Week 9*
