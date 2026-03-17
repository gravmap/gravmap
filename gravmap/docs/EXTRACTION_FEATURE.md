# AI Contract Extraction Feature

## Overview

GravMap's AI contract extraction uses GPT-4 Vision to automatically extract key information from real estate contracts, eliminating manual data entry and reducing errors.

---

## How It Works

### 1. Upload Contract
Users upload a real estate contract (PDF or image) to a transaction.

### 2. Trigger Extraction
From the "AI Extraction" tab, users select a contract document and click "Extract".

### 3. AI Analysis
GPT-4 Vision analyzes the document and extracts:
- Closing date
- Contingency dates (inspection, financing, appraisal)
- Buyer and seller names
- Property address
- Purchase price
- Any additional critical dates

### 4. Review & Confirm
Users review extracted data with confidence indicators:
- 🟢 Green: High confidence (90-100%)
- 🟡 Yellow: Medium confidence (70-89%)
- 🔴 Red: Low confidence (50-69%)
- ⚪ Gray: Not found (0-49%)

Users can edit any field before confirming.

### 5. Timeline Generation
Upon confirmation:
- Transaction details are updated
- Timeline events are automatically created
- Users are redirected to see their new timeline

---

## Features

### Confidence Scoring
Every extracted field includes a confidence score, helping users identify which data needs verification.

### Inline Editing
Click any field to edit before confirming. Edited fields are marked as 100% confidence.

### Extraction Notes
The AI provides notes about the extraction, highlighting any ambiguities or concerns.

### Re-Extraction
Not happy with results? Click "Re-extract" to try again.

### Timeline Integration
Extracted dates automatically become timeline events with proper event types.

---

## Technical Architecture

### Components

1. **OpenAI Client** (`/src/lib/openai/client.ts`)
   - Server-side OpenAI client configuration
   - Model and temperature settings

2. **Extraction Prompt** (`/src/lib/openai/prompts/contract-extraction.ts`)
   - System and user prompts
   - JSON schema definition
   - Confidence scoring guidelines

3. **API Routes**
   - `/api/extract-contract` - Triggers GPT-4 Vision extraction
   - `/api/transactions/[id]/confirm-extraction` - Saves confirmed data

4. **UI Components**
   - `ExtractionReviewPanel` - Main review interface
   - `ExtractedField` - Individual field display with edit
   - `ConfidenceIndicator` - Visual confidence badges

5. **Custom Hook**
   - `useContractExtraction` - Manages extraction state and workflow

### Database Schema

```sql
-- Documents table already has extraction support
CREATE TABLE documents (
  id UUID PRIMARY KEY,
  extracted_data JSONB, -- Stores extraction results
  extraction_status TEXT -- 'pending', 'processing', 'completed', 'failed'
);
```

### Data Flow

```
User selects document
  ↓
Frontend calls /api/extract-contract
  ↓
API verifies ownership & updates status to 'processing'
  ↓
GPT-4 Vision analyzes document
  ↓
Results parsed and stored in documents.extracted_data
  ↓
Status updated to 'completed'
  ↓
Frontend displays ExtractionReviewPanel
  ↓
User reviews and confirms
  ↓
Frontend calls /api/transactions/[id]/confirm-extraction
  ↓
Transaction updated with extracted data
  ↓
Timeline events created from dates
```

---

## Setup

### 1. Install Dependencies
```bash
npm install openai
```

### 2. Add Environment Variable
```bash
# .env.local
OPENAI_API_KEY=sk-proj-xxxxx
```

### 3. Get API Key
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create an API key
3. Add to `.env.local`

### 4. Deploy
Add `OPENAI_API_KEY` to your Vercel environment variables.

---

## Usage Examples

### Basic Extraction

```typescript
import { useContractExtraction } from '@/hooks/useContractExtraction'

function MyComponent() {
  const { extract, extractedData, isExtracting } = useContractExtraction({
    documentId: 'doc-123',
    documentUrl: 'https://...',
  })

  const handleExtract = async () => {
    await extract()
  }

  return (
    <div>
      <button onClick={handleExtract} disabled={isExtracting}>
        {isExtracting ? 'Extracting...' : 'Extract Data'}
      </button>
      {extractedData && (
        <pre>{JSON.stringify(extractedData, null, 2)}</pre>
      )}
    </div>
  )
}
```

### Manual API Call

```typescript
const response = await fetch('/api/extract-contract', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    documentId: 'doc-123',
    documentUrl: 'https://...',
  }),
})

const { success, extractedData, error } = await response.json()
```

---

## Error Handling

### Common Errors

1. **"OPENAI_API_KEY is not set"**
   - Add API key to `.env.local`
   - Restart development server

2. **"Document not found"**
   - Verify document exists
   - Check user has access

3. **"Failed to parse GPT-4 response"**
   - Model returned invalid JSON
   - Check extraction notes for details
   - Try re-extraction

4. **"Extraction failed"**
   - Network error or API issue
   - Check OpenAI status
   - Retry extraction

### Error States

All errors are displayed to users with:
- User-friendly message
- Retry button
- Link to support if persistent

---

## Performance

### Speed
- Initial extraction: 3-5 seconds
- Cached retrieval: < 100ms

### Cost
- ~$0.02 per contract (GPT-4o)
- ~$0.002 per contract (GPT-4o-mini, future)

### Optimization
- Results are cached in database
- No re-extraction for completed documents
- Batch processing planned

---

## Testing

### Manual Testing
1. Upload a sample real estate contract
2. Navigate to "AI Extraction" tab
3. Select document and extract
4. Verify confidence scores make sense
5. Edit fields and confirm
6. Check timeline events created

### Edge Cases to Test
- Missing closing date
- Handwritten contract
- Multiple buyers/sellers
- Non-standard contingencies
- Blurry or scanned documents
- Very long contracts

---

## Future Enhancements

### Phase 2
- [ ] Batch extraction (multiple documents)
- [ ] Extraction history and audit trail
- [ ] Contract type detection
- [ ] Property details extraction
- [ ] Agent information extraction

### Phase 3
- [ ] Multi-language support
- [ ] State-specific extraction
- [ ] Custom field extraction
- [ ] Model fine-tuning
- [ ] Confidence calibration improvements

---

## Metrics & Monitoring

### Track These
- Extraction success rate
- Average confidence score
- Field edit rate (which fields need manual correction)
- API error rate
- Average extraction time

### Alert On
- Success rate < 90%
- API errors > 5%
- Extraction time > 10s

---

## Security

### API Key
- Stored server-side only
- Never exposed to client
- Rotated periodically

### Data Privacy
- Documents stored in Supabase (user owns data)
- Extraction results stored in database
- No data shared with third parties (except OpenAI API)

### Access Control
- Users can only extract their own documents
- Row-level security in Supabase
- API routes verify ownership

---

## Support

### For Developers
- See `/docs/PROMPT_ENGINEERING.md` for prompt details
- Check `/src/types/extraction.ts` for type definitions
- Review API routes for implementation details

### For Users
- Confidence scores help identify what to verify
- Edit capability for corrections
- Re-extract if major issues
- Contact support for persistent problems

---

## Changelog

### v1.0 (2026-03-16)
- Initial release
- GPT-4o integration
- Confidence scoring
- Extraction review UI
- Timeline integration
- Error handling

---

## License

Proprietary - GravMap

---

## Contact

For questions or issues:
- GitHub Issues: [gravmap/issues](https://github.com/gravmap/issues)
- Email: support@gravmap.com
