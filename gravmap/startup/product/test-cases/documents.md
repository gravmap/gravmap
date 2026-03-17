# Document Upload Test Cases

**Module:** Document Management  
**Priority:** Critical  
**Last Updated:** March 17, 2026

---

## TC-DOC-001: Upload Valid PDF Document

**Objective:** Verify PDF upload functionality  
**Priority:** P0 (Critical)  
**Test Type:** Manual, E2E

### Preconditions
- Transaction exists
- User on transaction detail page

### Test Data
```
File: sample-purchase-agreement.pdf
Size: 1.2 MB
Format: PDF
```

### Test Steps
1. Click "Upload Document" button
2. Select PDF file from file system
3. Wait for upload to complete

### Expected Results
- ✅ File upload begins immediately
- ✅ Upload progress bar displayed
- ✅ File uploaded successfully
- ✅ Document appears in documents section
- ✅ File name and size displayed
- ✅ AI extraction starts automatically

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-DOC-002: Upload Valid Image File (JPG)

**Objective:** Verify image upload functionality  
**Priority:** P1 (High)  
**Test Type:** Manual

### Preconditions
- Transaction exists

### Test Data
```
File: scanned-contract.jpg
Size: 2.5 MB
Format: JPEG
```

### Test Steps
1. Click "Upload Document"
2. Select JPG file
3. Wait for upload

### Expected Results
- ✅ Image uploaded successfully
- ✅ Thumbnail generated
- ✅ Can view image in browser
- ✅ AI extraction works with image

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-DOC-003: Upload Valid Image File (PNG)

**Objective:** Verify PNG upload functionality  
**Priority:** P1 (High)  
**Test Type:** Manual

### Test Data
```
File: contract-screenshot.png
Size: 3 MB
Format: PNG
```

### Expected Results
- ✅ PNG uploaded successfully
- ✅ Transparency preserved
- ✅ Quality maintained
- ✅ Extractable by AI

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-DOC-004: Upload DOCX File

**Objective:** Verify DOCX upload functionality  
**Priority:** P1 (High)  
**Test Type:** Manual

### Test Data
```
File: purchase-agreement.docx
Size: 500 KB
Format: DOCX
```

### Expected Results
- ✅ DOCX uploaded successfully
- ✅ File recognized correctly
- ✅ Can be extracted by AI

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-DOC-005: Upload File Exceeding Size Limit

**Objective:** Verify size limit enforcement (10MB)  
**Priority:** P1 (High)  
**Test Type:** Manual

### Test Data
```
File: large-contract.pdf
Size: 15 MB (exceeds 10MB limit)
```

### Test Steps
1. Attempt to upload large file
2. Observe error handling

### Expected Results
- ✅ Upload rejected immediately
- ✅ Clear error message: "File size must be less than 10MB"
- ✅ User guided to compress or choose smaller file
- ✅ No partial upload

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-DOC-006: Upload Unsupported File Type

**Objective:** Verify file type validation  
**Priority:** P1 (High)  
**Test Type:** Manual

### Test Data
```
Files: document.txt, spreadsheet.xlsx, video.mp4, executable.exe
```

### Test Steps
1. Attempt to upload unsupported file type
2. Observe error handling

### Expected Results
- ✅ File rejected
- ✅ Error message: "File type not supported. Please upload PDF, DOCX, JPG, or PNG"
- ✅ File chooser filters supported types
- ✅ No upload attempt made

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-DOC-007: Upload Corrupted File

**Objective:** Verify handling of corrupted files  
**Priority:** P2 (Medium)  
**Test Type:** Manual

### Test Data
```
File: corrupted.pdf (invalid PDF structure)
```

### Expected Results
- ✅ Upload may succeed but processing fails
- ✅ Error message displayed
- ✅ User can retry with valid file
- ✅ Corrupted file doesn't crash application

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-DOC-008: Replace Existing Document

**Objective:** Verify document replacement  
**Priority:** P1 (High)  
**Test Type:** Manual

### Preconditions
- Document already uploaded to transaction

### Test Steps
1. Click "Replace Document" button
2. Select new file
3. Confirm replacement

### Expected Results
- ✅ Old document removed from storage
- ✅ New document uploaded
- ✅ Previous extraction results cleared
- ✅ New extraction starts automatically
- ✅ Success message displayed

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-DOC-009: Delete Document

**Objective:** Verify document deletion  
**Priority:** P1 (High)  
**Test Type:** Manual

### Preconditions
- Document exists

### Test Steps
1. Click "Delete" on document
2. Confirm deletion in modal
3. Verify removal

### Expected Results
- ✅ Confirmation modal appears
- ✅ Document deleted from storage
- ✅ Document removed from UI
- ✅ Extraction results preserved (or cleared based on design)
- ✅ Transaction still exists

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-DOC-010: View/Download Document

**Objective:** Verify document viewing and downloading  
**Priority:** P1 (High)  
**Test Type:** Manual

### Preconditions
- Document uploaded

### Test Steps
1. Click "View" or document name
2. Test download option

### Expected Results
- ✅ Document opens in new tab or viewer
- ✅ Download initiates when clicked
- ✅ Downloaded file matches original
- ✅ File name preserved
- ✅ PDF viewable in browser

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-DOC-011: Upload Progress Indicator

**Objective:** Verify upload progress feedback  
**Priority:** P2 (Medium)  
**Test Type:** Manual

### Test Data
```
File: medium-sized.pdf (5 MB)
Network: Throttled to 3G speeds
```

### Test Steps
1. Upload file on slow connection
2. Observe progress indicator

### Expected Results
- ✅ Progress bar shows percentage
- ✅ Progress updates smoothly
- ✅ Cancel option available during upload
- ✅ Upload speed shown (optional)
- ✅ Time remaining estimate (optional)

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-DOC-012: Multiple Document Upload

**Objective:** Verify handling of multiple documents  
**Priority:** P2 (Medium)  
**Test Type:** Manual

### Test Steps
1. Select multiple files (3-5) in file chooser
2. Upload all at once

### Expected Results
- ✅ All files upload (if supported)
- ✅ OR clear message that only one document allowed
- ✅ If multiple allowed, all appear in list
- ✅ Extraction runs on all (or selected primary)

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-DOC-013: Document Security

**Objective:** Verify document access control  
**Priority:** P0 (Critical)  
**Test Type:** Manual

### Preconditions
- User A has uploaded document
- User B is different user

### Test Steps
1. User B tries to access User A's document URL directly

### Expected Results
- ✅ Access denied
- ✅ User B cannot view/download User A's documents
- ✅ Row-level security enforced
- ✅ Signed URLs expire appropriately

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-DOC-014: Drag and Drop Upload

**Objective:** Verify drag-and-drop file upload  
**Priority:** P2 (Medium)  
**Test Type:** Manual

### Test Steps
1. Drag PDF file from desktop
2. Drop onto upload area
3. Observe upload

### Expected Results
- ✅ Drop zone highlighted on dragover
- ✅ File uploaded on drop
- ✅ Same validation as button upload
- ✅ Visual feedback during drag

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## TC-DOC-015: Upload with Special Characters in Filename

**Objective:** Verify handling of special filenames  
**Priority:** P2 (Medium)  
**Test Type:** Manual

### Test Data
```
Filenames: 
- "Contract (Final) [v2].pdf"
- "O'Brien's Purchase.pdf"
- "Contract & Agreement.pdf"
- "中文合同.pdf"
```

### Expected Results
- ✅ File uploads successfully
- ✅ Filename preserved in display
- ✅ No encoding issues
- ✅ Can download with original name

### Status: [ ] Pass [ ] Fail [ ] Blocked

---

## Test Execution Summary

| Total | Pass | Fail | Blocked | Not Run |
|-------|------|------|---------|---------|
| 15    | 0    | 0    | 0       | 15      |
