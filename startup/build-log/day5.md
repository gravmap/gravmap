# Day 5: AI Contract Extraction - Build Log

**Date:** 2026-03-16
**Focus:** Core Feature - GPT-4 Vision Contract Extraction
**Status:** In Progress

---

## Objective

Build the core AI extraction feature that powers GravMap's value proposition:
- Extract structured data from real estate contracts using GPT-4 Vision
- Provide confidence scores for each extracted field
- Allow user review and confirmation
- Auto-create timeline events from extracted dates

---

## Architecture Overview

```
Document Upload → Supabase Storage → Extraction API (GPT-4 Vision) 
                                             ↓
                                    Structured Data + Confidence
                                             ↓
                                    Review UI (User Confirms)
                                             ↓
                        ┌──────────────────────┴──────────────────────┐
                        ↓                                             ↓
                Update Transaction                          Create Timeline Events
                (buyer, seller, price, etc.)               (closing, contingencies, etc.)
```

---

## Implementation Steps

### 1. OpenAI Integration Setup

**Package:** `openai` npm package installed
**Configuration:** Server-side client with API key from environment

**Environment Variable:**
```bash
OPENAI_API_KEY=sk-proj-xxxxx
```

**Files Created:**
- `/src/lib/openai/client.ts` - OpenAI client configuration
- Updated `.env.local.example` with OPENAI_API_KEY

---

### 2. Contract Extraction Prompt Engineering

**Design Decisions:**

#### Prompt Strategy
- **Role-based approach:** Position GPT-4 as a real estate expert
- **Structured output:** Request JSON with specific schema
- **Confidence scores:** 0-100 scale for each field
- **Date handling:** Multiple date formats and contingency types
- **Error handling:** Explicit instructions for missing/unclear data

#### Key Prompt Elements

1. **Context Setting:**
   - "You are a real estate contract expert"
   - "Extract key information from real estate purchase contracts"

2. **Data Extraction Schema:**
   ```typescript
   {
     closing_date: { value: string | null, confidence: number },
     contingency_dates: {
       inspection: { value: string | null, confidence: number },
       financing: { value: string | null, confidence: number },
       appraisal: { value: string | null, confidence: number }
     },
     buyer_name: { value: string | null, confidence: number },
     seller_name: { value: string | null, confidence: number },
     property_address: { value: string | null, confidence: number },
     purchase_price: { value: number | null, confidence: number },
     additional_dates: Array<{ name: string, date: string, confidence: number }>
   }
   ```

3. **Confidence Scoring Guidelines:**
   - 90-100: Explicitly stated, clearly formatted
   - 70-89: Stated but may need verification
   - 50-69: Inferred or unclear format
   - 0-49: Not found or highly uncertain

4. **Error Handling Instructions:**
   - Return null if field not found
   - Provide confidence score even for nulls (0 if not found)
   - Include extraction notes for ambiguous cases

#### Prompt Version Control
- **Version:** 1.0
- **Model:** gpt-4-vision-preview
- **Max Tokens:** 2000
- **Temperature:** 0.1 (low for consistency)

**Why This Prompt Design:**

1. **Structured JSON Output:** Enables programmatic processing
2. **Confidence Scores:** Users trust but verify - essential for legal documents
3. **Granular Dates:** Different contingency types matter for timelines
4. **Additional Dates Field:** Flexible for contract variations
5. **Extraction Notes:** Transparency when AI is uncertain
6. **Low Temperature:** Contracts need precision, not creativity

---

### 3. API Route: /api/extract-contract

**Endpoint:** `POST /api/extract-contract`

**Request:**
```typescript
{
  documentId: string,
  documentUrl: string
}
```

**Response:**
```typescript
{
  success: boolean,
  extractedData: ContractExtractionResult,
  error?: string
}
```

**Flow:**
1. Validate request & authenticate user
2. Verify document ownership
3. Update document status to 'processing'
4. Fetch document from URL (Supabase storage)
5. Send to GPT-4 Vision with extraction prompt
6. Parse structured response
7. Store extracted_data in documents table
8. Update extraction_status to 'completed' or 'failed'
9. Return results

**Error Handling:**
- Invalid document URL → 400 error
- GPT-4 API failure → Update status to 'failed', return error
- Parsing failure → Store raw response in notes, return error
- Authentication failure → 401 error

**Rate Limiting:**
- Built into OpenAI account
- Consider adding per-user limits (future enhancement)

---

### 4. Extraction Review UI

**Component:** `<ExtractionReviewPanel />`

**Features:**
1. **Field-by-field display** with confidence indicators:
   - 🟢 Green: 90-100% confidence
   - 🟡 Yellow: 70-89% confidence
   - 🔴 Red: 50-69% confidence
   - ⚪ Gray: 0-49% confidence or null

2. **Inline editing:**
   - Click any field to edit
   - Save changes before confirming
   - "Re-extract" button if major issues

3. **Bulk actions:**
   - "Confirm All High Confidence" (fields > 90%)
   - "Save Draft" (save edits without confirming)
   - "Confirm & Create Timeline" (final submission)

4. **Visual feedback:**
   - Loading spinner during extraction
   - Progress indicator for API call
   - Success/error toasts

**State Management:**
```typescript
interface ExtractionReviewState {
  extractedData: ContractExtractionResult | null
  editedData: ContractExtractionResult | null
  isExtracting: boolean
  isSaving: boolean
  confirmedFields: Set<string>
  errors: Map<string, string>
}
```

---

### 5. Transaction Detail Enhancements

**Added to `/dashboard/transactions/[id]` page:**

1. **Extraction Status Card:**
   - Show extraction_status badge
   - Display extracted fields count
   - "View Extraction" button

2. **Extracted Data Section:**
   - Collapsible panel showing extracted data
   - Confidence indicators
   - Edit capabilities

3. **Timeline Integration:**
   - After confirmation, create timeline events
   - Link extraction to timeline creation
   - Show which events were AI-generated

4. **Re-extraction Option:**
   - Button to trigger new extraction
   - Warn about overwriting confirmed data
   - Store extraction history (future feature)

---

### 6. Loading States & Error Handling

**Loading States:**
1. **Initial extraction:**
   - Full-screen overlay with progress steps
   - "Analyzing contract..." with animation

2. **Re-extraction:**
   - Inline spinner on extraction panel
   - Keep previous data visible until new results

3. **Saving confirmation:**
   - Disable confirm button
   - Show "Saving..." text

**Error Handling:**

1. **API Errors:**
   - Display user-friendly message
   - "Retry" button
   - Link to support if persistent

2. **Parsing Errors:**
   - Show raw GPT response in debug mode
   - Allow manual entry
   - Report error for prompt improvement

3. **Network Errors:**
   - Retry with exponential backoff
   - Offline mode indicator (future feature)

4. **Timeout Handling:**
   - 60-second timeout on extraction
   - Clear error message
   - Retry option

---

## Testing Strategy

### Manual Testing
1. Upload sample real estate contract (PDF)
2. Trigger extraction
3. Verify confidence scores make sense
4. Edit fields and confirm
5. Check timeline events created correctly

### Edge Cases to Test
- Missing closing date
- Handwritten contract
- Multiple buyers/sellers
- Non-standard contingency dates
- Very long contracts (page limits?)
- Blurry/scanned documents

### Future Improvements
1. Support multi-page contracts
2. Add contract type detection
3. Extract property description
4. Extract agent information
5. Support state-specific contract variations

---

## Database Schema Updates

**Existing schema supports extraction:**
- `documents.extracted_data` (JSONB) - stores extraction results
- `documents.extraction_status` (ENUM) - tracks extraction state

**No migration needed** - schema already designed for this feature!

---

## API Endpoints Created

### POST /api/extract-contract
Extract data from uploaded contract document

**Request Body:**
```json
{
  "documentId": "uuid",
  "documentUrl": "https://..."
}
```

**Response:**
```json
{
  "success": true,
  "extractedData": {
    "closing_date": { "value": "2024-03-15", "confidence": 95 },
    "contingency_dates": {
      "inspection": { "value": "2024-02-15", "confidence": 88 },
      "financing": { "value": "2024-02-28", "confidence": 92 }
    },
    "buyer_name": { "value": "John Doe", "confidence": 97 },
    "seller_name": { "value": "Jane Smith", "confidence": 97 },
    "property_address": { "value": "123 Main St, City, ST 12345", "confidence": 99 },
    "purchase_price": { "value": 450000, "confidence": 99 },
    "additional_dates": [],
    "extraction_notes": "Standard purchase agreement clearly formatted."
  }
}
```

---

## Components Created

1. **`/src/lib/openai/client.ts`** - OpenAI client wrapper
2. **`/src/lib/openai/prompts/contract-extraction.ts`** - Prompt definitions
3. **`/src/app/api/extract-contract/route.ts`** - API endpoint
4. **`/src/components/extraction/ExtractionReviewPanel.tsx`** - Review UI
5. **`/src/components/extraction/ExtractedField.tsx`** - Individual field display
6. **`/src/components/extraction/ConfidenceIndicator.tsx`** - Visual confidence badge
7. **`/src/hooks/useContractExtraction.ts`** - Extraction logic hook
8. **`/src/types/extraction.ts`** - TypeScript types for extraction

---

## Files Modified

1. **`.env.local.example`** - Added OPENAI_API_KEY
2. **`package.json`** - Added openai dependency
3. **`/src/app/dashboard/transactions/[id]/page.tsx`** - Added extraction panel

---

## Deployment Checklist

- [ ] Add OPENAI_API_KEY to Vercel environment variables
- [ ] Test extraction on production deployment
- [ ] Monitor OpenAI API usage and costs
- [ ] Set up error tracking for extraction failures
- [ ] Create user documentation for extraction feature

---

## Metrics to Track

1. **Extraction Success Rate:** % of documents successfully extracted
2. **Average Confidence Score:** Across all fields
3. **Field Accuracy:** % of fields confirmed without edits
4. **Time Saved:** Manual entry vs. extraction time
5. **API Costs:** Per extraction cost tracking

---

## Lessons Learned

### Prompt Engineering Insights
1. **Be explicit about date formats** - ISO 8601 is safest
2. **Confidence calibration requires examples** - Added to prompt
3. **Structured output > narrative** - JSON schema critical
4. **Handle missing data gracefully** - null values better than guesses
5. **Model temperature matters** - Low temp for factual extraction

### Technical Decisions
1. **Server-side extraction** - Protect API key, enable caching
2. **Store raw extraction** - Enable debugging and reprocessing
3. **Status tracking** - Essential for async operations
4. **Confidence visualization** - Build user trust through transparency

---

## Next Steps (Post-MVP)

1. **Batch extraction** - Process multiple documents
2. **Extraction history** - Track changes over time
3. **Template matching** - Recognize contract types
4. **Custom fields** - User-defined extraction targets
5. **Model fine-tuning** - Improve accuracy with user corrections
6. **Multi-language support** - Contracts in other languages

---

## Completion Status

- [x] OpenAI integration setup
- [x] Contract extraction API route
- [x] Extraction prompt engineering
- [x] Extraction review UI components
- [x] Transaction detail enhancements
- [x] Loading states and error handling
- [x] Testing and documentation
- [x] Mock data for testing
- [x] Prompt engineering documentation
- [x] Feature documentation

**Last Updated:** 2026-03-16 20:15 GMT
**Status:** ✅ COMPLETE
