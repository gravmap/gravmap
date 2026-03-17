/**
 * Contract Extraction Prompts
 * 
 * Prompt engineering for real estate contract analysis
 * Version: 1.0
 */

import { VISION_CONFIG } from '../client'

/**
 * System prompt for contract extraction
 * 
 * This prompt establishes:
 * 1. Role: Real estate expert
 * 2. Task: Extract structured data
 * 3. Output format: JSON with confidence scores
 * 4. Handling of missing/unclear data
 */
export const CONTRACT_EXTRACTION_SYSTEM_PROMPT = `You are an expert real estate contract analyst with extensive experience in purchase agreements, closing documents, and real estate transactions.

Your task is to extract key information from real estate contracts and documents with high precision. You must provide confidence scores for every extracted field.

IMPORTANT INSTRUCTIONS:
1. Extract ALL available information from the document
2. Provide a confidence score (0-100) for each field:
   - 90-100: Explicitly stated, clearly formatted, no ambiguity
   - 70-89: Stated but may need verification or slightly unclear format
   - 50-69: Inferred from context or unclear format
   - 0-49: Not found or highly uncertain (return null value)

3. Date format: Always return dates in ISO 8601 format (YYYY-MM-DD)
4. Monetary values: Return as numbers without currency symbols
5. Names: Return full names as they appear in the document
6. If a field is not found or illegible, return null with confidence 0
7. Include extraction_notes if you have important observations

8. ADDITIONAL DATES: Extract ANY other important dates mentioned in the contract, including:
   - Earnest money deadline
   - Title search completion
   - Insurance deadline
   - Possession date
   - Any state-specific deadlines
   - Any contingency deadlines not already categorized

9. CONFIDENCE SCORING EXAMPLES:
   - Closing date explicitly stated as "March 15, 2024" → confidence: 95-100
   - Closing date mentioned but handwritten → confidence: 70-80
   - Closing date inferred from "30 days after acceptance" → confidence: 60-70
   - Closing date not mentioned → confidence: 0, value: null

You MUST respond with valid JSON matching the exact schema provided.`

/**
 * User prompt template for contract extraction
 */
export const CONTRACT_EXTRACTION_USER_PROMPT = `Analyze this real estate contract document and extract the key information.

Return a JSON object with this EXACT structure:

{
  "closing_date": {
    "value": "YYYY-MM-DD or null",
    "confidence": 0-100,
    "notes": "optional notes"
  },
  "contingency_dates": {
    "inspection": {
      "value": "YYYY-MM-DD or null",
      "confidence": 0-100
    },
    "financing": {
      "value": "YYYY-MM-DD or null",
      "confidence": 0-100
    },
    "appraisal": {
      "value": "YYYY-MM-DD or null",
      "confidence": 0-100
    }
  },
  "buyer_name": {
    "value": "Full name or null",
    "confidence": 0-100
  },
  "seller_name": {
    "value": "Full name or null",
    "confidence": 0-100
  },
  "property_address": {
    "value": "Full address or null",
    "confidence": 0-100
  },
  "purchase_price": {
    "value": number or null,
    "confidence": 0-100
  },
  "additional_dates": [
    {
      "name": "Date description (e.g., 'Earnest Money Deadline')",
      "date": "YYYY-MM-DD",
      "confidence": 0-100
    }
  ],
  "extraction_notes": "Any important observations about the document or extraction quality"
}

Focus on accuracy over completeness. If information is unclear, note it in extraction_notes and provide a lower confidence score.`

/**
 * Build the complete extraction request for OpenAI
 */
export function buildExtractionRequest(imageUrl: string) {
  return {
    model: VISION_CONFIG.model,
    messages: [
      {
        role: 'system' as const,
        content: CONTRACT_EXTRACTION_SYSTEM_PROMPT,
      },
      {
        role: 'user' as const,
        content: [
          {
            type: 'text' as const,
            text: CONTRACT_EXTRACTION_USER_PROMPT,
          },
          {
            type: 'image_url' as const,
            image_url: {
              url: imageUrl,
              detail: VISION_CONFIG.detail,
            },
          },
        ],
      },
    ],
    max_tokens: VISION_CONFIG.maxTokens,
    temperature: VISION_CONFIG.temperature,
    response_format: { type: 'json_object' as const },
  }
}

/**
 * Prompt version metadata
 */
export const PROMPT_METADATA = {
  version: '1.0',
  lastUpdated: '2026-03-16',
  model: VISION_CONFIG.model,
  author: 'GravMap Team',
  purpose: 'Extract structured data from real estate contracts with confidence scoring',
  optimizationHistory: [
    {
      version: '1.0',
      date: '2026-03-16',
      changes: 'Initial prompt design with confidence scoring',
      performance: 'Not yet tested',
    },
  ],
}

/**
 * Future: Add specialized prompts for different contract types
 * 
 * Potential contract types:
 * - Standard purchase agreement
 * - FHA/VA loan contracts
 * - Commercial real estate
 * - Land contracts
 * - Lease-to-own agreements
 */
