# AI Extraction Test Cases

**Module:** AI Document Extraction  
**Priority:** Critical  
**Last Updated:** March 17, 2026

---

## TC-AI-001: Extract Dates from Standard Purchase Agreement

**Objective:** Verify AI extracts key dates from purchase contract  
**Priority:** P0 (Critical)  
**Test Type:** Manual, E2E

### Preconditions
- Transaction exists
- Valid purchase agreement PDF uploaded

### Test Document
```
Type: Purchase Agreement
Contains: Closing date, inspection deadline, financing deadline, earnest money deadline
Quality: Digital, clear text
```

### Test Steps
1. Upload purchase agreement
2. Wait for extraction to complete
3. Review extracted dates

### Expected Results
- ✅ Extraction completes within 30 seconds
- ✅ Closing date extracted correctly
- ✅ Inspection deadline extracted
- ✅ Financing deadline extracted
- ✅ All dates accurate (± 0 days)
- ✅ Dates displayed in chronological order
- ✅ Can edit any extracted date
- ✅ Can add missed dates
- ✅ Can remove incorrect extractions

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-AI-002: Extract from Low-Quality Scanned Document

**Objective:** Verify AI handles low-quality scans  
**Priority:** P1 (High)  
**Test Type:** Manual

### Test Document
```
Type: Scanned contract (image)
Quality: Low resolution, slight blur, rotated
Format: JPG
```

### Expected Results
- ✅ OCR performs reasonably well
- ✅ Major dates extracted
- ✅ Confidence may be lower but still usable
- ✅ User can easily correct mistakes
- ✅ Warning if quality too low

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-AI-003: Extract from Handwritten Notes

**Objective:** Verify handling of handwritten documents  
**Priority:** P2 (Low)  
**Test Type:** Manual

### Test Document
```
Type: Contract with handwritten dates
```

### Expected Results
- ✅ AI attempts extraction
- ✅ Results may be less accurate
- ✅ User can easily edit
- ✅ Graceful failure if unreadable

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-AI-004: Extract from Multi-Page Document

**Objective:** Verify extraction from long documents  
**Priority:** P1 (High)  
**Test Type:** Manual

### Test Document
```
Type: Complete purchase packet
Pages: 20+ pages
```

### Expected Results
- ✅ All pages processed
- ✅ Dates from all pages extracted
- ✅ Processing time acceptable (< 60s)
- ✅ No timeout errors

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-AI-005: Extraction with No Dates Found

**Objective:** Verify handling when no dates detected  
**Priority:** P1 (High)  
**Test Type:** Manual

### Test Document
```
Type: Generic letter or contract without dates
```

### Expected Results
- ✅ Extraction completes
- ✅ Message: "No dates found in this document. You can add them manually."
- ✅ UI shows empty extraction state
- ✅ User can add dates manually
- ✅ No error thrown

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-AI-006: Extraction Loading State

**Objective:** Verify loading UX during extraction  
**Priority:** P2 (Medium)  
**Test Type:** Manual

### Test Steps
1. Upload document
2. Observe extraction loading state

### Expected Results
- ✅ Clear loading indicator
- ✅ Message: "Extracting dates from your document..."
- ✅ Estimated time or progress shown
- ✅ Cannot start another extraction simultaneously
- ✅ Can cancel extraction (optional)

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-AI-007: Edit Extracted Dates

**Objective:** Verify user can edit AI results before confirmation  
**Priority:** P0 (Critical)  
**Test Type:** Manual, E2E

### Preconditions
- Extraction completed with dates

### Test Steps
1. Click "Edit" on an extracted date
2. Change date value
3. Change label/description
4. Save changes
5. Repeat for multiple dates

### Expected Results
- ✅ Edit modal opens
- ✅ Date picker available
- ✅ Label text editable
- ✅ Changes saved immediately
- ✅ Changes reflected in preview

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-AI-008: Add Missing Date Manually

**Objective:** Verify user can add dates AI missed  
**Priority:** P0 (Critical)  
**Test Type:** Manual, E2E

### Test Steps
1. After extraction, click "Add Date"
2. Enter date: 2026-04-20
3. Enter label: "Appraisal Deadline"
4. Save

### Expected Results
- ✅ New date added to list
- ✅ Appears in chronological order
- ✅ Included in timeline after confirmation
- ✅ Visually distinguished from AI-extracted dates (optional)

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-AI-009: Remove Incorrect Date

**Objective:** Verify user can remove false positives  
**Priority:** P0 (Critical)  
**Test Type:** Manual

### Test Steps
1. Identify incorrect extracted date
2. Click "Remove" or delete icon
3. Confirm removal

### Expected Results
- ✅ Date removed from list
- ✅ Not included in timeline
- ✅ Can undo removal (optional)
- ✅ List updates immediately

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-AI-010: Confirm Extraction Results

**Objective:** Verify confirmation flow  
**Priority:** P0 (Critical)  
**Test Type:** Manual, E2E

### Preconditions
- Dates extracted and reviewed

### Test Steps
1. Review all extracted dates
2. Make any necessary edits
3. Click "Confirm & Generate Timeline"

### Expected Results
- ✅ Confirmation triggers timeline generation
- ✅ Timeline created with all confirmed dates
- ✅ User redirected to transaction timeline view
- ✅ Success message displayed
- ✅ Extraction marked as "confirmed"

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-AI-011: Re-extract After Document Replacement

**Objective:** Verify re-extraction on document change  
**Priority:** P1 (High)  
**Test Type:** Manual

### Preconditions
- Document uploaded and extracted
- Timeline exists

### Test Steps
1. Replace document with new version
2. Observe extraction behavior

### Expected Results
- ✅ New extraction starts automatically
- ✅ Old extraction results cleared
- ✅ User can confirm new results
- ✅ Option to keep existing timeline (optional)

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-AI-012: Extraction Error Handling

**Objective:** Verify graceful error handling  
**Priority:** P1 (High)  
**Test Type:** Manual

### Test Steps
1. Simulate extraction failure (network error, API error)
2. Observe error handling

### Expected Results
- ✅ Clear error message
- ✅ Message: "Extraction failed. Please try again."
- ✅ Retry button available
- ✅ Document still accessible
- ✅ Can proceed manually without extraction

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-AI-013: Extraction Timeout

**Objective:** Verify timeout handling for long extractions  
**Priority:** P2 (Medium)  
**Test Type:** Manual

### Test Steps
1. Upload very large document
2. Wait for timeout (if applicable)

### Expected Results
- ✅ Timeout after reasonable period (60-90s)
- ✅ Clear timeout message
- ✅ Retry option available
- ✅ User not stuck in loading state

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-AI-014: Extract Party Information

**Objective:** Verify extraction of buyer/seller information  
**Priority:** P1 (High)  
**Test Type:** Manual

### Test Document
```
Contains: Buyer name, seller name, property address, agent info
```

### Expected Results
- ✅ Buyer name extracted (if present)
- ✅ Seller name extracted (if present)
- ✅ Property address extracted
- ✅ Information populated in transaction fields
- ✅ User can edit before confirmation

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-AI-015: Mock Mode Extraction (Testing)

**Objective:** Verify mock extraction for testing without OpenAI  
**Priority:** P2 (Medium)  
**Test Type:** Manual

### Preconditions
- OpenAI API key not configured or mock mode enabled

### Test Steps
1. Upload document
2. Trigger extraction

### Expected Results
- ✅ Mock data returned instead of real extraction
- ✅ Sample dates provided
- ✅ Works offline for testing
- ✅ Clearly indicated as mock data

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-AI-016: Extract with Date Format Variations

**Objective:** Verify AI handles various date formats  
**Priority:** P1 (High)  
**Test Type:** Manual

### Test Document
```
Contains dates in formats:
- April 15, 2026
- 04/15/2026
- 15 April 2026
- 4/15/26
- 2026-04-15
```

### Expected Results
- ✅ All formats recognized
- ✅ Standardized to single format
- ✅ Correct date values preserved
- ✅ No misinterpretation (e.g., 04/05 vs 05/04)

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-AI-017: Extraction Accuracy Metrics

**Objective:** Measure extraction accuracy  
**Priority:** P2 (Medium)  
**Test Type:** Manual

### Test Steps
1. Test with 10 different real contracts
2. Calculate precision and recall

### Expected Results
- ✅ Precision > 90% (extracted dates are correct)
- ✅ Recall > 80% (important dates not missed)
- ✅ Log accuracy metrics
- ✅ Identify common failure patterns

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## Test Execution Summary

| Total | Pass | Fail | Blocked | Not Run |
|-------|------|------|---------|---------|
| 17    | 0    | 0    | 0       | 17      |

### AI Extraction Quality Notes
_Document accuracy observations during testing_
