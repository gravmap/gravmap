# Integration Guide

**Complete guide for developers integrating with GravMap**

---

## Getting Started

### Prerequisites
- GravMap Pro or Team account
- API key from account settings
- Basic understanding of REST APIs
- HTTPS endpoint for webhooks (production)

### Quick Start

1. **Generate API Key**
   - Go to Settings > Integrations > API Keys
   - Click "Create API Key"
   - Name your integration
   - Copy the key (shown only once!)

2. **Test Your Connection**
   ```bash
   curl -H "Authorization: Bearer YOUR_API_KEY" \
        https://api.gravmap.com/v1/transactions
   ```

3. **Set Up Webhooks** (optional)
   - Create an endpoint on your server
   - Register the webhook in GravMap
   - Verify webhook signatures

---

## Integration Patterns

### Pattern 1: Transaction Sync

Keep transactions in sync between your system and GravMap.

```typescript
// Your system creates a transaction
async function createTransactionInGravMap(deal: Deal) {
  const response = await fetch('https://api.gravmap.com/v1/transactions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GRAVMAP_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: deal.name,
      type: deal.type, // 'buy', 'sell', 'lease'
      property_address: deal.propertyAddress,
      closing_date: deal.expectedCloseDate,
      client_name: deal.clientName,
      client_email: deal.clientEmail,
      estimated_value: deal.value
    })
  });
  
  const { data } = await response.json();
  
  // Store the GravMap transaction ID for future updates
  await updateDeal(deal.id, { gravmap_id: data.id });
}
```

### Pattern 2: Document Processing

Upload documents to GravMap for AI extraction.

```typescript
async function processDocument(transactionId: string, file: File) {
  // 1. Upload document
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', 'contract');
  
  const uploadResponse = await fetch(
    `https://api.gravmap.com/v1/transactions/${transactionId}/documents`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GRAVMAP_API_KEY}`
      },
      body: formData
    }
  );
  
  const { data: document } = await uploadResponse.json();
  
  // 2. Trigger extraction
  await fetch(
    `https://api.gravmap.com/v1/documents/${document.id}/extract`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GRAVMAP_API_KEY}`
      }
    }
  );
  
  return document.id;
}
```

### Pattern 3: Webhook Handler

Handle real-time updates from GravMap.

```typescript
import express from 'express';
import crypto from 'crypto';

const app = express();
const WEBHOOK_SECRET = process.env.GRAVMAP_WEBHOOK_SECRET;

app.post('/webhooks/gravmap', express.raw({ type: 'application/json' }), 
  async (req, res) => {
    const signature = req.headers['x-gravmap-signature'];
    const payload = req.body;
    
    // Verify signature
    const expectedSignature = crypto
      .createHmac('sha256', WEBHOOK_SECRET)
      .update(payload)
      .digest('hex');
    
    if (signature !== expectedSignature) {
      return res.status(401).send('Invalid signature');
    }
    
    const event = JSON.parse(payload);
    
    // Handle different event types
    switch (event.type) {
      case 'deadline.completed':
        await handleDeadlineCompleted(event.data);
        break;
      case 'deadline.missed':
        await handleDeadlineMissed(event.data);
        break;
      case 'transaction.completed':
        await handleTransactionCompleted(event.data);
        break;
    }
    
    res.status(200).send('OK');
  }
);

async function handleDeadlineCompleted(data: any) {
  // Update your system
  console.log(`Deadline ${data.deadline.type} completed for ${data.transaction.name}`);
}
```

---

## Common Integrations

### CRM Integration (Generic)

```typescript
class CRMIntegration {
  private gravmapClient: GravMapClient;
  private crmClient: CRMClient;
  
  async syncContactToGravMap(contact: CRMContact) {
    // Find existing transactions for this contact
    const transactions = await this.gravmapClient.transactions.list({
      client_email: contact.email
    });
    
    if (transactions.data.length === 0) {
      // No existing transactions
      return;
    }
    
    // Update contact info in GravMap
    for (const transaction of transactions.data) {
      await this.gravmapClient.transactions.update(transaction.id, {
        client_name: `${contact.firstName} ${contact.lastName}`,
        client_phone: contact.phone
      });
    }
  }
  
  async handleGravMapWebhook(event: GravMapEvent) {
    if (event.type === 'transaction.created') {
      // Create corresponding deal in CRM
      await this.crmClient.deals.create({
        name: event.data.transaction.name,
        value: event.data.transaction.estimated_value,
        external_id: event.data.transaction.id
      });
    }
  }
}
```

### Calendar Integration

```typescript
class CalendarSync {
  private gravmapClient: GravMapClient;
  private calendarClient: CalendarClient;
  
  async syncDeadlinesToCalendar(transactionId: string) {
    // Get all deadlines for transaction
    const deadlines = await this.gravmapClient.deadlines.list(transactionId);
    
    for (const deadline of deadlines.data) {
      if (deadline.status === 'completed') continue;
      
      // Create or update calendar event
      await this.calendarClient.events.upsert({
        external_id: `gravmap-${deadline.id}`,
        title: `${deadline.type} - ${deadline.transaction_name}`,
        date: deadline.due_date,
        description: `
          Deadline: ${deadline.type}
          Due: ${deadline.due_date}
          
          View in GravMap: https://app.gravmap.com/transactions/${transactionId}
        `
      });
    }
  }
}
```

---

## Error Handling

### Retry Logic

```typescript
async function gravmapRequest(
  endpoint: string,
  options: RequestInit,
  retries = 3
): Promise<Response> {
  try {
    const response = await fetch(endpoint, options);
    
    if (response.status === 429) {
      // Rate limited - wait and retry
      const resetAfter = response.headers.get('X-RateLimit-Reset');
      const waitTime = resetAfter 
        ? parseInt(resetAfter) * 1000 - Date.now()
        : 60000;
      
      if (retries > 0 && waitTime < 300000) { // Max 5 min wait
        await sleep(waitTime);
        return gravmapRequest(endpoint, options, retries - 1);
      }
    }
    
    if (response.status >= 500 && retries > 0) {
      // Server error - exponential backoff
      await sleep(Math.pow(2, 4 - retries) * 1000);
      return gravmapRequest(endpoint, options, retries - 1);
    }
    
    return response;
  } catch (error) {
    if (retries > 0) {
      await sleep(1000);
      return gravmapRequest(endpoint, options, retries - 1);
    }
    throw error;
  }
}
```

### Error Handling Best Practices

1. **Always check response status**
2. **Implement exponential backoff for retries**
3. **Log errors with request IDs for support**
4. **Handle rate limits gracefully**
5. **Validate data before sending**

---

## Security Best Practices

### API Key Management

```typescript
// ❌ Bad: Hardcoded API key
const apiKey = 'gm_live_abc123...';

// ✅ Good: Environment variable
const apiKey = process.env.GRAVMAP_API_KEY;

// ✅ Better: Secrets manager
const apiKey = await secretsManager.getSecret('GRAVMAP_API_KEY');
```

### Webhook Security

```typescript
// Always verify webhook signatures
function verifyGravMapWebhook(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  // Use timing-safe comparison
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}
```

### Data Privacy

1. Never log API keys or sensitive data
2. Encrypt stored credentials
3. Use environment-specific API keys
4. Rotate keys regularly
5. Revoke keys when no longer needed

---

## Testing

### Test Mode

Use test API keys (starting with `gm_test_`) for development.

```typescript
const isProduction = process.env.NODE_ENV === 'production';
const apiKey = isProduction 
  ? process.env.GRAVMAP_API_KEY 
  : process.env.GRAVMAP_TEST_API_KEY;
```

### Mock Responses

```typescript
// For unit tests
const mockGravMapClient = {
  transactions: {
    create: jest.fn().mockResolvedValue({
      id: 'txn_test123',
      name: 'Test Transaction'
    }),
    list: jest.fn().mockResolvedValue({ data: [] })
  }
};
```

---

## Rate Limiting Strategy

### Client-Side Throttling

```typescript
class RateLimitedClient {
  private queue: Array<() => Promise<any>> = [];
  private processing = false;
  private requestCount = 0;
  private windowStart = Date.now();
  
  constructor(
    private maxRequestsPerMinute: number = 50
  ) {}
  
  async request<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await fn();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
      
      this.processQueue();
    });
  }
  
  private async processQueue() {
    if (this.processing || this.queue.length === 0) return;
    
    this.processing = true;
    
    // Reset window if needed
    const now = Date.now();
    if (now - this.windowStart >= 60000) {
      this.requestCount = 0;
      this.windowStart = now;
    }
    
    // Wait if at limit
    if (this.requestCount >= this.maxRequestsPerMinute) {
      const waitTime = 60000 - (now - this.windowStart);
      await sleep(waitTime);
      this.requestCount = 0;
      this.windowStart = Date.now();
    }
    
    const item = this.queue.shift();
    if (item) {
      this.requestCount++;
      await item();
    }
    
    this.processing = false;
    
    if (this.queue.length > 0) {
      this.processQueue();
    }
  }
}
```

---

## Troubleshooting

### Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| 401 Unauthorized | Invalid API key | Check key format and permissions |
| 403 Forbidden | Insufficient permissions | Check plan limits |
| 404 Not Found | Invalid resource ID | Verify ID exists |
| 429 Too Many Requests | Rate limit exceeded | Implement backoff |
| 500 Internal Error | Server issue | Retry with backoff |

### Debug Mode

Enable debug logging:

```typescript
const client = new GravMapClient({
  apiKey: process.env.GRAVMAP_API_KEY,
  debug: true // Logs all requests
});
```

---

## Support Resources

- **API Documentation:** https://docs.gravmap.com/api
- **SDK Documentation:** https://docs.gravmap.com/sdks
- **Status Page:** https://status.gravmap.com
- **Email Support:** api-support@gravmap.com
- **Community Discord:** https://discord.gg/gravmap

---

*Last Updated: March 2024*
