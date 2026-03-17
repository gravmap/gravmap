# Webhook Documentation

**Real-time event notifications for your integrations**

---

## Overview

Webhooks allow GravMap to push real-time notifications to your application when specific events occur. Instead of polling the API, you can react immediately to changes.

### How Webhooks Work

1. You register a webhook URL with GravMap
2. When an event occurs, we send an HTTP POST request to your URL
3. Your server processes the event and responds with 200 OK
4. We retry failed deliveries automatically

---

## Getting Started

### 1. Create a Webhook Endpoint

Create an HTTPS endpoint on your server that accepts POST requests:

```javascript
// Express.js example
app.post('/webhooks/gravmap', (req, res) => {
  const event = req.body;
  
  // Process the event
  console.log('Received event:', event.type);
  
  // Respond quickly (within 10 seconds)
  res.status(200).send('OK');
});
```

### 2. Register the Webhook

Via API:
```bash
curl -X POST https://api.gravmap.com/v1/webhooks \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://your-app.com/webhooks/gravmap",
    "events": ["transaction.created", "deadline.completed"],
    "secret": "your-webhook-secret"
  }'
```

Or via UI:
1. Go to Settings > Integrations > Webhooks
2. Click "Add Webhook"
3. Enter your endpoint URL
4. Select events to subscribe to
5. Optionally set a secret for signature verification

### 3. Verify Webhook Signatures (Recommended)

```javascript
import crypto from 'crypto';

function verifySignature(payload, signature, secret) {
  if (!signature || !secret) return false;
  
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

app.post('/webhooks/gravmap', (req, res) => {
  const signature = req.headers['x-gravmap-signature'];
  const payload = JSON.stringify(req.body);
  
  if (!verifySignature(payload, signature, WEBHOOK_SECRET)) {
    return res.status(401).send('Invalid signature');
  }
  
  // Process verified webhook
  // ...
  
  res.status(200).send('OK');
});
```

---

## Available Events

### Transaction Events

#### transaction.created

Triggered when a new transaction is created.

```json
{
  "id": "wh_evt_abc123",
  "type": "transaction.created",
  "created_at": "2024-03-15T10:30:00Z",
  "data": {
    "transaction": {
      "id": "txn_xyz789",
      "name": "123 Main St Purchase",
      "type": "buy",
      "status": "active",
      "property_address": "123 Main St, Austin, TX 78701",
      "closing_date": "2024-04-15",
      "estimated_value": 450000,
      "client_name": "John Smith",
      "client_email": "john@example.com",
      "created_at": "2024-03-15T10:30:00Z"
    }
  }
}
```

#### transaction.updated

Triggered when a transaction is modified.

```json
{
  "id": "wh_evt_abc124",
  "type": "transaction.updated",
  "created_at": "2024-03-15T11:00:00Z",
  "data": {
    "transaction": {
      "id": "txn_xyz789",
      "name": "123 Main St Purchase",
      "status": "active",
      "closing_date": "2024-04-20"
    },
    "changes": {
      "closing_date": {
        "old": "2024-04-15",
        "new": "2024-04-20"
      }
    }
  }
}
```

#### transaction.completed

Triggered when a transaction is marked as completed (closed).

```json
{
  "id": "wh_evt_abc125",
  "type": "transaction.completed",
  "created_at": "2024-04-20T16:00:00Z",
  "data": {
    "transaction": {
      "id": "txn_xyz789",
      "name": "123 Main St Purchase",
      "status": "completed",
      "completed_at": "2024-04-20T16:00:00Z",
      "total_deadlines": 12,
      "completed_deadlines": 12,
      "missed_deadlines": 0
    }
  }
}
```

#### transaction.archived

Triggered when a transaction is archived.

```json
{
  "id": "wh_evt_abc126",
  "type": "transaction.archived",
  "created_at": "2024-04-21T10:00:00Z",
  "data": {
    "transaction": {
      "id": "txn_xyz789",
      "name": "123 Main St Purchase",
      "status": "archived",
      "archived_at": "2024-04-21T10:00:00Z"
    }
  }
}
```

#### transaction.deleted

Triggered when a transaction is deleted.

```json
{
  "id": "wh_evt_abc127",
  "type": "transaction.deleted",
  "created_at": "2024-04-22T09:00:00Z",
  "data": {
    "transaction": {
      "id": "txn_xyz789",
      "deleted_at": "2024-04-22T09:00:00Z"
    }
  }
}
```

---

### Deadline Events

#### deadline.created

Triggered when a new deadline is created.

```json
{
  "id": "wh_evt_def456",
  "type": "deadline.created",
  "created_at": "2024-03-15T10:35:00Z",
  "data": {
    "deadline": {
      "id": "dlm_abc123",
      "transaction_id": "txn_xyz789",
      "type": "Inspection Contingency",
      "description": "Complete home inspection",
      "due_date": "2024-03-25",
      "status": "pending",
      "days_until_due": 10
    },
    "transaction": {
      "id": "txn_xyz789",
      "name": "123 Main St Purchase"
    }
  }
}
```

#### deadline.updated

Triggered when a deadline is modified.

```json
{
  "id": "wh_evt_def457",
  "type": "deadline.updated",
  "created_at": "2024-03-16T09:00:00Z",
  "data": {
    "deadline": {
      "id": "dlm_abc123",
      "transaction_id": "txn_xyz789",
      "type": "Inspection Contingency",
      "due_date": "2024-03-28",
      "status": "pending"
    },
    "changes": {
      "due_date": {
        "old": "2024-03-25",
        "new": "2024-03-28"
      }
    }
  }
}
```

#### deadline.completed

Triggered when a deadline is marked as completed.

```json
{
  "id": "wh_evt_def458",
  "type": "deadline.completed",
  "created_at": "2024-03-27T14:30:00Z",
  "data": {
    "deadline": {
      "id": "dlm_abc123",
      "transaction_id": "txn_xyz789",
      "type": "Inspection Contingency",
      "due_date": "2024-03-28",
      "completed_at": "2024-03-27T14:30:00Z",
      "days_early": 1,
      "completed_by": "user_123"
    },
    "transaction": {
      "id": "txn_xyz789",
      "name": "123 Main St Purchase"
    }
  }
}
```

#### deadline.missed

Triggered when a deadline passes without being completed.

```json
{
  "id": "wh_evt_def459",
  "type": "deadline.missed",
  "created_at": "2024-03-29T00:00:00Z",
  "data": {
    "deadline": {
      "id": "dlm_abc123",
      "transaction_id": "txn_xyz789",
      "type": "Inspection Contingency",
      "due_date": "2024-03-28",
      "status": "missed",
      "days_late": 1
    },
    "transaction": {
      "id": "txn_xyz789",
      "name": "123 Main St Purchase"
    }
  }
}
```

---

### Document Events

#### document.uploaded

Triggered when a document is uploaded to a transaction.

```json
{
  "id": "wh_evt_doc123",
  "type": "document.uploaded",
  "created_at": "2024-03-15T11:00:00Z",
  "data": {
    "document": {
      "id": "doc_xyz789",
      "name": "Purchase Agreement.pdf",
      "type": "contract",
      "size": 245760,
      "mime_type": "application/pdf"
    },
    "transaction": {
      "id": "txn_xyz789",
      "name": "123 Main St Purchase"
    }
  }
}
```

#### document.extracted

Triggered when AI extraction completes on a document.

```json
{
  "id": "wh_evt_doc124",
  "type": "document.extracted",
  "created_at": "2024-03-15T11:02:30Z",
  "data": {
    "document": {
      "id": "doc_xyz789",
      "name": "Purchase Agreement.pdf"
    },
    "extraction": {
      "id": "ext_abc123",
      "status": "completed",
      "dates_found": 5,
      "parties_found": 2,
      "confidence_score": 0.94
    },
    "transaction": {
      "id": "txn_xyz789",
      "name": "123 Main St Purchase"
    }
  }
}
```

---

### Reminder Events

#### reminder.sent

Triggered when a reminder email is sent.

```json
{
  "id": "wh_evt_rem123",
  "type": "reminder.sent",
  "created_at": "2024-03-22T09:00:00Z",
  "data": {
    "reminder": {
      "id": "rem_xyz789",
      "type": "email",
      "days_before": 3,
      "sent_at": "2024-03-22T09:00:00Z"
    },
    "deadline": {
      "id": "dlm_abc123",
      "type": "Inspection Contingency",
      "due_date": "2024-03-25"
    },
    "transaction": {
      "id": "txn_xyz789",
      "name": "123 Main St Purchase"
    }
  }
}
```

---

## Delivery & Retries

### Delivery Expectations

- Webhooks are sent within seconds of the event
- Your endpoint must respond within 10 seconds
- Response must be HTTP 200-299 to be considered successful

### Retry Schedule

Failed webhooks are retried with exponential backoff:

| Attempt | Delay |
|---------|-------|
| 1 | Immediate |
| 2 | 1 minute |
| 3 | 5 minutes |
| 4 | 15 minutes |
| 5 | 1 hour |
| 6 | 6 hours |
| 7 | 24 hours |

After 7 failed attempts, the webhook is disabled.

### Handling Retries

Ensure your endpoint is idempotent - it should handle duplicate events gracefully:

```javascript
const processedEvents = new Set();

app.post('/webhooks/gravmap', async (req, res) => {
  const event = req.body;
  
  // Check if already processed
  if (processedEvents.has(event.id)) {
    return res.status(200).send('Already processed');
  }
  
  // Process event
  await processEvent(event);
  
  // Mark as processed
  processedEvents.add(event.id);
  
  res.status(200).send('OK');
});
```

For production, use a persistent store (database, Redis) instead of an in-memory set.

---

## Testing

### Test Webhook

Send a test event to verify your endpoint:

```bash
curl -X POST https://api.gravmap.com/v1/webhooks/{webhook_id}/test \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Using ngrok for Local Development

```bash
# Start ngrok
ngrok http 3000

# Use the ngrok URL for your webhook
# https://abc123.ngrok.io/webhooks/gravmap
```

### Test Payload

```json
{
  "id": "wh_evt_test123",
  "type": "test",
  "created_at": "2024-03-15T10:00:00Z",
  "data": {
    "message": "This is a test webhook"
  }
}
```

---

## Monitoring

### Webhook Logs

View webhook delivery status in Settings > Integrations > Webhooks:

- Green checkmark: Delivered successfully
- Red X: Failed
- Yellow clock: Pending retry

### Webhook Health

Check webhook health via API:

```bash
curl https://api.gravmap.com/v1/webhooks/{webhook_id}/health \
  -H "Authorization: Bearer YOUR_API_KEY"
```

Response:
```json
{
  "data": {
    "status": "healthy",
    "success_rate": 0.98,
    "last_success": "2024-03-15T10:30:00Z",
    "recent_failures": 0
  }
}
```

---

## Security

### Best Practices

1. **Always verify signatures** - Prevents forged webhooks
2. **Use HTTPS** - Encrypts webhook payloads
3. **Keep secrets secure** - Never log or expose webhook secrets
4. **Validate event types** - Ignore unknown events
5. **Rate limit** - Protect against webhook floods

### IP Whitelisting

GravMap sends webhooks from these IP ranges:
- `34.102.0.0/20`
- `35.244.0.0/14`

---

## Event Ordering

Events are typically delivered in order, but you should not rely on this. Use timestamps to determine sequence:

```javascript
app.post('/webhooks/gravmap', (req, res) => {
  const event = req.body;
  
  // Check if this is a newer event than what we've processed
  const lastProcessed = await getLastEventTimestamp(event.data.transaction.id);
  
  if (new Date(event.created_at) > new Date(lastProcessed)) {
    await processEvent(event);
    await updateLastEventTimestamp(event.data.transaction.id, event.created_at);
  }
  
  res.status(200).send('OK');
});
```

---

## Troubleshooting

### Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| 401 errors | Invalid signature | Verify secret matches |
| Timeouts | Slow processing | Respond first, process async |
| Missing events | Wrong events selected | Check webhook configuration |
| Duplicate events | Retries | Implement idempotency |

### Debug Tips

1. Log all incoming webhooks with full body
2. Check webhook logs in GravMap dashboard
3. Verify URL is publicly accessible
4. Ensure HTTPS certificate is valid
5. Test with curl to isolate issues

---

## Limits

| Limit | Value |
|-------|-------|
| Max webhooks per account | 10 |
| Max event types per webhook | All |
| Max payload size | 256 KB |
| Timeout | 10 seconds |
| Max retries | 7 |

---

## SDK Support

### JavaScript/TypeScript

```typescript
import { GravMapWebhooks } from '@gravmap/sdk';

const webhooks = new GravMapWebhooks({
  secret: process.env.GRAVMAP_WEBHOOK_SECRET
});

// Express middleware
app.post('/webhooks/gravmap', 
  webhooks.middleware(),
  (req, res) => {
    const event = req.webhookEvent;
    
    switch (event.type) {
      case 'transaction.created':
        // Handle event
        break;
    }
    
    res.status(200).send('OK');
  }
);
```

---

## Support

- **Documentation:** https://docs.gravmap.com/webhooks
- **Email:** api-support@gravmap.com
- **Discord:** https://discord.gg/gravmap

---

*Last Updated: March 2024*
