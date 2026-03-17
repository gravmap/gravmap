# GravMap API Documentation

**Version:** 1.0.0
**Base URL:** `https://api.gravmap.com/v1`

---

## Overview

GravMap provides a RESTful API for integrating transaction management capabilities into your applications. The API enables you to:

- Create and manage transactions
- Upload and process documents
- Track deadlines
- Set up webhooks for real-time notifications
- Integrate with external systems

### Authentication

All API requests require authentication using Bearer tokens.

```http
Authorization: Bearer YOUR_API_KEY
```

API keys can be generated in your GravMap account settings under **Integrations > API Keys**.

### Rate Limits

| Plan | Requests/min | Requests/day |
|------|--------------|--------------|
| Free | 60 | 1,000 |
| Pro | 300 | 10,000 |
| Team | 1,000 | 50,000 |

Rate limit headers are included in every response:

```http
X-RateLimit-Limit: 300
X-RateLimit-Remaining: 299
X-RateLimit-Reset: 1640000000
```

### Response Format

All responses are in JSON format.

**Success Response:**
```json
{
  "data": { ... },
  "meta": {
    "requestId": "req_abc123"
  }
}
```

**Error Response:**
```json
{
  "error": {
    "code": "validation_error",
    "message": "Invalid request parameters",
    "details": [
      { "field": "property_address", "message": "Property address is required" }
    ]
  },
  "meta": {
    "requestId": "req_abc123"
  }
}
```

---

## Transactions

### List Transactions

```http
GET /transactions
```

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | string | Filter by status: `active`, `completed`, `archived` |
| `type` | string | Filter by type: `buy`, `sell`, `lease` |
| `limit` | integer | Number of results (default: 20, max: 100) |
| `offset` | integer | Pagination offset |
| `sort` | string | Sort field: `created_at`, `closing_date` |
| `order` | string | Sort order: `asc`, `desc` |

**Response:**
```json
{
  "data": [
    {
      "id": "txn_abc123",
      "name": "123 Main St Purchase",
      "type": "buy",
      "status": "active",
      "property_address": "123 Main St, Austin, TX 78701",
      "closing_date": "2024-04-15",
      "estimated_value": 450000,
      "client_name": "John Smith",
      "client_email": "john@example.com",
      "deadlines_count": 12,
      "deadlines_completed": 4,
      "created_at": "2024-03-01T10:00:00Z",
      "updated_at": "2024-03-10T15:30:00Z"
    }
  ],
  "meta": {
    "total": 45,
    "limit": 20,
    "offset": 0,
    "requestId": "req_xyz789"
  }
}
```

### Get Transaction

```http
GET /transactions/{transaction_id}
```

**Response:**
```json
{
  "data": {
    "id": "txn_abc123",
    "name": "123 Main St Purchase",
    "type": "buy",
    "status": "active",
    "property_address": "123 Main St, Austin, TX 78701",
    "closing_date": "2024-04-15",
    "estimated_value": 450000,
    "client_name": "John Smith",
    "client_email": "john@example.com",
    "client_phone": "+1234567890",
    "notes": "Pre-approval confirmed",
    "deadlines": [
      {
        "id": "dlm_xyz456",
        "type": "Inspection Contingency",
        "due_date": "2024-03-20",
        "status": "pending",
        "days_until_due": 5
      }
    ],
    "documents": [
      {
        "id": "doc_123",
        "name": "Purchase Agreement.pdf",
        "size": 245760,
        "uploaded_at": "2024-03-01T10:30:00Z"
      }
    ],
    "created_at": "2024-03-01T10:00:00Z",
    "updated_at": "2024-03-10T15:30:00Z"
  }
}
```

### Create Transaction

```http
POST /transactions
```

**Request Body:**
```json
{
  "name": "123 Main St Purchase",
  "type": "buy",
  "property_address": "123 Main St, Austin, TX 78701",
  "closing_date": "2024-04-15",
  "estimated_value": 450000,
  "client_name": "John Smith",
  "client_email": "john@example.com",
  "client_phone": "+1234567890",
  "notes": "Pre-approval confirmed"
}
```

**Required Fields:**
- `name` - Transaction name/title
- `type` - Transaction type (`buy`, `sell`, `lease`)
- `property_address` - Property address

**Response:** Returns created transaction with `201` status.

### Update Transaction

```http
PATCH /transactions/{transaction_id}
```

**Request Body:**
```json
{
  "closing_date": "2024-04-20",
  "notes": "Closing date extended"
}
```

### Delete Transaction

```http
DELETE /transactions/{transaction_id}
```

Returns `204 No Content` on success.

---

## Deadlines

### List Deadlines

```http
GET /transactions/{transaction_id}/deadlines
```

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `status` | string | Filter by status: `pending`, `completed`, `missed` |
| `type` | string | Filter by deadline type |
| `upcoming` | boolean | Only show upcoming (within 7 days) |
| `overdue` | boolean | Only show overdue deadlines |

**Response:**
```json
{
  "data": [
    {
      "id": "dlm_xyz456",
      "transaction_id": "txn_abc123",
      "type": "Inspection Contingency",
      "description": "Complete home inspection",
      "due_date": "2024-03-20",
      "status": "pending",
      "days_until_due": 5,
      "is_overdue": false,
      "assigned_to": null,
      "completed_at": null,
      "created_at": "2024-03-01T10:00:00Z"
    }
  ],
  "meta": {
    "total": 12,
    "requestId": "req_abc123"
  }
}
```

### Create Deadline

```http
POST /transactions/{transaction_id}/deadlines
```

**Request Body:**
```json
{
  "type": "Appraisal Deadline",
  "description": "Appraisal must be completed",
  "due_date": "2024-03-25",
  "assigned_to": "user_123"
}
```

### Update Deadline

```http
PATCH /transactions/{transaction_id}/deadlines/{deadline_id}
```

**Request Body:**
```json
{
  "due_date": "2024-03-28",
  "description": "Extended deadline"
}
```

### Complete Deadline

```http
POST /transactions/{transaction_id}/deadlines/{deadline_id}/complete
```

**Request Body (optional):**
```json
{
  "notes": "Inspection completed, minor issues found",
  "completed_at": "2024-03-19T14:30:00Z"
}
```

---

## Documents

### Upload Document

```http
POST /transactions/{transaction_id}/documents
Content-Type: multipart/form-data
```

**Form Data:**

| Field | Type | Description |
|-------|------|-------------|
| `file` | file | Document file (PDF, DOC, DOCX, images) |
| `type` | string | Document type: `contract`, `addendum`, `inspection`, `other` |
| `name` | string | Document name (optional) |

**Response:**
```json
{
  "data": {
    "id": "doc_123",
    "name": "Purchase Agreement.pdf",
    "type": "contract",
    "size": 245760,
    "mime_type": "application/pdf",
    "url": "https://storage.gravmap.com/...",
    "uploaded_at": "2024-03-01T10:30:00Z"
  }
}
```

### Extract Dates from Document

```http
POST /documents/{document_id}/extract
```

Triggers AI extraction of dates from the uploaded document.

**Response:**
```json
{
  "data": {
    "extraction_id": "ext_abc123",
    "status": "processing",
    "estimated_time": 30
  }
}
```

### Get Extraction Results

```http
GET /extractions/{extraction_id}
```

**Response:**
```json
{
  "data": {
    "id": "ext_abc123",
    "status": "completed",
    "document_id": "doc_123",
    "dates_extracted": [
      {
        "date": "2024-04-15",
        "type": "Closing Date",
        "context": "Closing is scheduled for April 15, 2024",
        "confidence": 0.95
      },
      {
        "date": "2024-03-20",
        "type": "Inspection Deadline",
        "context": "Inspection contingency expires on March 20, 2024",
        "confidence": 0.92
      }
    ],
    "parties_extracted": [
      {
        "name": "John Smith",
        "role": "Buyer",
        "email": "john@example.com"
      }
    ],
    "created_at": "2024-03-01T10:31:00Z",
    "completed_at": "2024-03-01T10:31:25Z"
  }
}
```

### Download Document

```http
GET /documents/{document_id}/download
```

Returns a redirect to a signed download URL.

---

## Webhooks

Webhooks allow you to receive real-time notifications when events occur in your GravMap account.

### Webhook Events

| Event | Description |
|-------|-------------|
| `transaction.created` | New transaction created |
| `transaction.updated` | Transaction updated |
| `transaction.completed` | Transaction marked as completed |
| `transaction.deleted` | Transaction deleted |
| `deadline.created` | New deadline created |
| `deadline.updated` | Deadline updated |
| `deadline.completed` | Deadline completed |
| `deadline.missed` | Deadline missed (past due) |
| `document.uploaded` | Document uploaded |
| `document.extracted` | AI extraction completed |
| `reminder.sent` | Reminder email sent |

### Webhook Payload

```json
{
  "id": "wh_evt_abc123",
  "type": "deadline.completed",
  "created_at": "2024-03-15T10:30:00Z",
  "data": {
    "deadline": {
      "id": "dlm_xyz456",
      "type": "Inspection Contingency",
      "due_date": "2024-03-15",
      "completed_at": "2024-03-15T10:30:00Z"
    },
    "transaction": {
      "id": "txn_abc123",
      "name": "123 Main St Purchase"
    }
  }
}
```

### Create Webhook

```http
POST /webhooks
```

**Request Body:**
```json
{
  "url": "https://your-app.com/webhooks/gravmap",
  "events": ["transaction.created", "deadline.completed", "deadline.missed"],
  "secret": "your-webhook-secret"
}
```

**Response:**
```json
{
  "data": {
    "id": "wh_abc123",
    "url": "https://your-app.com/webhooks/gravmap",
    "events": ["transaction.created", "deadline.completed", "deadline.missed"],
    "status": "active",
    "created_at": "2024-03-01T10:00:00Z"
  }
}
```

### Webhook Security

Verify webhook authenticity using the signature header:

```javascript
import crypto from 'crypto';

function verifyWebhook(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(JSON.stringify(payload))
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}
```

The signature is sent in the `X-GravMap-Signature` header.

### List Webhooks

```http
GET /webhooks
```

### Delete Webhook

```http
DELETE /webhooks/{webhook_id}
```

---

## Integrations

### Google Calendar

#### Connect Google Calendar

```http
POST /integrations/google-calendar/connect
```

Returns an OAuth URL to redirect the user.

**Response:**
```json
{
  "data": {
    "auth_url": "https://accounts.google.com/o/oauth2/v2/auth?...",
    "state": "state_token"
  }
}
```

#### Get Calendar Status

```http
GET /integrations/google-calendar/status
```

**Response:**
```json
{
  "data": {
    "connected": true,
    "email": "user@gmail.com",
    "calendar_id": "gravmap@group.calendar.google.com",
    "last_sync": "2024-03-15T10:00:00Z",
    "events_synced": 45
  }
}
```

#### Disconnect

```http
DELETE /integrations/google-calendar
```

### Follow Up Boss

#### Connect Follow Up Boss

```http
POST /integrations/follow-up-boss/connect
```

**Request Body:**
```json
{
  "api_key": "your-fub-api-key"
}
```

**Response:**
```json
{
  "data": {
    "connected": true,
    "account_id": "12345",
    "account_name": "ABC Realty"
  }
}
```

#### Sync Contacts

```http
POST /integrations/follow-up-boss/sync
```

Triggers a full contact sync.

---

## Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `authentication_error` | 401 | Invalid or missing API key |
| `authorization_error` | 403 | Insufficient permissions |
| `not_found` | 404 | Resource not found |
| `validation_error` | 400 | Invalid request parameters |
| `rate_limit_exceeded` | 429 | Too many requests |
| `internal_error` | 500 | Internal server error |

---

## SDKs & Client Libraries

### JavaScript/TypeScript

```bash
npm install @gravmap/sdk
```

```typescript
import { GravMap } from '@gravmap/sdk';

const client = new GravMap({
  apiKey: process.env.GRAVMAP_API_KEY
});

// Create a transaction
const transaction = await client.transactions.create({
  name: '123 Main St Purchase',
  type: 'buy',
  property_address: '123 Main St, Austin, TX 78701',
  closing_date: '2024-04-15'
});

// List deadlines
const deadlines = await client.deadlines.list(transaction.id, {
  status: 'pending'
});

// Complete a deadline
await client.deadlines.complete(deadlines.data[0].id);
```

### Python

```bash
pip install gravmap
```

```python
from gravmap import GravMap

client = GravMap(api_key='your-api-key')

# Create a transaction
transaction = client.transactions.create(
    name='123 Main St Purchase',
    type='buy',
    property_address='123 Main St, Austin, TX 78701',
    closing_date='2024-04-15'
)

# List deadlines
deadlines = client.deadlines.list(
    transaction.id,
    status='pending'
)
```

---

## Changelog

### v1.0.0 (March 2024)
- Initial API release
- Transactions CRUD
- Deadlines CRUD
- Document upload and extraction
- Webhooks
- Google Calendar integration
- Follow Up Boss integration

---

## Support

- **Documentation:** https://docs.gravmap.com
- **API Status:** https://status.gravmap.com
- **Email:** api-support@gravmap.com
- **Discord:** https://discord.gg/gravmap

---

*Last Updated: March 2024*
