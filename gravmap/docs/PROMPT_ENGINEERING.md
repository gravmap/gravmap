# Prompt Engineering Documentation

## Contract Extraction Prompt v1.0

**Created:** 2026-03-16
**Purpose:** Extract structured data from real estate contracts using GPT-4 Vision
**Model:** gpt-4o (GPT-4 with Vision)

---

## Design Principles

### 1. Role-Based Prompting
We position GPT-4 as a "real estate contract analyst" to establish domain expertise and context.

**Rationale:**
- Improves domain-specific understanding
- Increases accuracy for industry-specific terms
- Sets expectations for professional, precise output

### 2. Structured JSON Output
All extraction requests return strictly formatted JSON with a predefined schema.

**Rationale:**
- Enables programmatic processing
- Reduces parsing errors
- Facilitates type safety in TypeScript
- Allows for schema validation

### 3. Confidence Scoring
Every extracted field includes a confidence score (0-100) indicating extraction reliability.

**Confidence Score Guidelines:**
- **90-100:** Explicitly stated, clearly formatted, no ambiguity
- **70-89:** Stated but may need verification or slightly unclear format
- **50-69:** Inferred from context or unclear format
- **0-49:** Not found or highly uncertain

**Rationale:**
- Builds user trust through transparency
- Enables "trust but verify" workflow
- Identifies fields needing manual review
- Provides feedback loop for prompt improvement

### 4. Explicit Handling of Missing Data
Prompt instructs the model to return `null` for missing/unclear fields rather than guessing.

**Rationale:**
- Prevents hallucination
- Avoids false confidence
- Makes it clear what information was actually found

### 5. Low Temperature (0.1)
We use a very low temperature for extraction tasks.

**Rationale:**
- Contracts require precision, not creativity
- Reduces variability between extractions
- Improves consistency across similar documents

---

## Prompt Components

### System Prompt
Establishes:
- Role and expertise
- Task description
- Output format requirements
- Confidence scoring guidelines
- Date and number formatting rules
- Handling of missing data

### User Prompt
Provides:
- Specific extraction instructions
- JSON schema template
- Examples of confidence scoring
- Emphasis on accuracy over completeness

### Image Input
- High detail mode for document analysis
- Supports PDFs (converted to images) and image files

---

## Schema Design

### Why This Schema?

```
{
  closing_date: ExtractedField<string>,
  contingency_dates: {
    inspection: ExtractedField<string>,
    financing: ExtractedField<string>,
    appraisal: ExtractedField<string>
  },
  buyer_name: ExtractedField<string>,
  seller_name: ExtractedField<string>,
  property_address: ExtractedField<string>,
  purchase_price: ExtractedField<number>,
  additional_dates: Array<{ name, date, confidence }>,
  extraction_notes?: string
}
```

**Design Decisions:**

1. **Nested contingency_dates** - Groups related date types together
2. **additional_dates array** - Flexible for contract variations
3. **ExtractedField wrapper** - Consistent confidence scoring
4. **Separate extraction_notes** - Provides AI's observations

### Type Safety

Each field's type is defined in TypeScript:
- Dates: `string` (ISO 8601 format)
- Price: `number`
- Names/Addresses: `string`
- Confidence: `number` (0-100)

---

## Prompt Optimization Strategies

### Iteration 1 (Current)
- Basic role definition
- JSON schema with confidence scores
- Explicit instructions for missing data
- Low temperature

### Planned Improvements

#### Future: Few-Shot Examples
Add example extractions to the prompt to improve consistency.

```typescript
// Example in prompt:
Example input: "Closing shall occur on or before March 15, 2024"
Example output: { "value": "2024-03-15", "confidence": 95 }
```

**Expected Impact:**
- Better confidence calibration
- Improved date parsing
- More consistent formatting

#### Future: Contract Type Detection
Add step to identify contract type before extraction.

**Benefits:**
- Use specialized prompts for different contract types
- Extract type-specific fields
- Improve accuracy

#### Future: Multi-Page Handling
For long contracts, extract page-by-page and merge results.

**Challenge:**
- Some fields may appear on different pages
- Need deduplication logic
- Context window limits

---

## Error Handling in Prompts

### Current Approach
1. **Missing fields:** Return null with confidence 0
2. **Unclear values:** Return best guess with lower confidence + notes
3. **Parsing errors:** Include extraction_notes explaining issues

### Validation
Post-extraction validation checks:
- Date format validation (ISO 8601)
- Number range checks (price > 0)
- Required field presence

---

## Testing & Evaluation

### Metrics to Track
1. **Extraction success rate:** % of documents successfully processed
2. **Field accuracy:** % of fields confirmed without edits
3. **Average confidence:** Mean confidence across all extractions
4. **Low-confidence fields:** Which fields are most uncertain

### A/B Testing Framework
Test prompt variations:
- With/without examples
- Different temperature values
- Different schema structures

### User Feedback Loop
1. Track which fields users edit
2. Identify patterns in corrections
3. Update prompt to address common errors

---

## Cost Optimization

### Current Costs (GPT-4o)
- Input: ~$0.005 per image
- Output: ~$0.015 per extraction
- **Total:** ~$0.02 per contract

### Optimization Strategies
1. **Cache results:** Don't re-extract completed documents
2. **Batch processing:** Extract multiple documents in one API call
3. **Use smaller model:** Test with GPT-4o-mini for simple contracts
4. **Selective extraction:** Only extract fields user cares about

---

## Security & Privacy

### API Key Management
- OpenAI API key stored server-side only
- Never exposed to client
- Environment variable configuration

### Data Handling
- Document URLs are temporary Supabase storage URLs
- Extraction results stored in database (JSONB)
- User owns their data

### Compliance Considerations
- Real estate contracts contain PII
- Consider data retention policies
- Ensure GDPR/CCPA compliance

---

## Future Enhancements

### 1. Multi-Language Support
- Detect contract language
- Use appropriate extraction prompt
- Return results in original language

### 2. State-Specific Extraction
- Identify contract state/jurisdiction
- Extract state-specific fields
- Apply state-specific date rules

### 3. Template Recognition
- Identify contract template (standard, FHA, VA, etc.)
- Apply template-specific extraction logic
- Extract template-specific fields

### 4. Agent Information Extraction
- Buyer's agent name/contact
- Seller's agent name/contact
- Brokerage information

### 5. Property Details Extraction
- Square footage
- Number of bedrooms/bathrooms
- Lot size
- Year built

---

## Lessons Learned

### What Works Well
1. **Structured output:** JSON schema prevents formatting issues
2. **Confidence scores:** Users trust the system more
3. **Low temperature:** Consistent results across similar documents
4. **Explicit null handling:** Clear when data is missing

### What Needs Improvement
1. **Date format variations:** Still struggles with handwritten dates
2. **Multi-page contracts:** Need better pagination handling
3. **Confidence calibration:** Scores sometimes overconfident
4. **Edge cases:** Non-standard contract formats

### Surprises
1. **GPT-4 Vision quality:** Better than expected at reading scanned documents
2. **User expectations:** Users expect 100% accuracy (need to manage expectations)
3. **Speed:** Extraction is fast (~3-5 seconds)

---

## Maintenance & Updates

### Version Control
All prompt changes are versioned in code.
File: `/src/lib/openai/prompts/contract-extraction.ts`

### Update Process
1. Test new prompt with sample contracts
2. Compare results with previous version
3. Update version number in PROMPT_METADATA
4. Document changes in optimizationHistory

### Rollback Plan
If new prompt performs worse:
1. Revert to previous version in code
2. Re-deploy application
3. Optionally re-extract failed documents

---

## References

- [OpenAI Vision API Documentation](https://platform.openai.com/docs/guides/vision)
- [Prompt Engineering Guide](https://www.promptingguide.ai/)
- [JSON Schema Specification](https://json-schema.org/)
- [GPT-4 Technical Report](https://arxiv.org/abs/2303.08774)
