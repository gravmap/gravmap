/**
 * Type definitions for contract extraction feature
 */

export interface ExtractedField<T = string | number | null> {
  value: T
  confidence: number // 0-100
  notes?: string
}

export interface ContingencyDates {
  inspection: ExtractedField<string | null>
  financing: ExtractedField<string | null>
  appraisal: ExtractedField<string | null>
  [key: string]: ExtractedField<string | null> // Support additional contingencies
}

export interface AdditionalDate {
  name: string
  date: string
  confidence: number
  notes?: string
}

export interface ContractExtractionResult {
  closing_date: ExtractedField<string | null>
  contingency_dates: ContingencyDates
  buyer_name: ExtractedField<string | null>
  seller_name: ExtractedField<string | null>
  property_address: ExtractedField<string | null>
  purchase_price: ExtractedField<number | null>
  additional_dates: AdditionalDate[]
  extraction_notes?: string
  extraction_timestamp: string
  model_version: string
}

export type ExtractionStatus = 'pending' | 'processing' | 'completed' | 'failed'

export interface ExtractionError {
  code: string
  message: string
  details?: unknown
}

export interface ExtractionRequest {
  documentId: string
  documentUrl: string
}

export interface ExtractionResponse {
  success: boolean
  extractedData?: ContractExtractionResult
  error?: ExtractionError
}

export interface ExtractionReviewState {
  extractedData: ContractExtractionResult | null
  editedData: ContractExtractionResult | null
  isExtracting: boolean
  isSaving: boolean
  confirmedFields: Set<string>
  errors: Map<string, string>
}

export type ConfidenceLevel = 'high' | 'medium' | 'low' | 'none'

export function getConfidenceLevel(confidence: number): ConfidenceLevel {
  if (confidence >= 90) return 'high'
  if (confidence >= 70) return 'medium'
  if (confidence >= 50) return 'low'
  return 'none'
}

export function getConfidenceColor(confidence: number): string {
  const level = getConfidenceLevel(confidence)
  switch (level) {
    case 'high':
      return 'green'
    case 'medium':
      return 'yellow'
    case 'low':
      return 'red'
    case 'none':
      return 'gray'
  }
}

export function getConfidenceLabel(confidence: number): string {
  const level = getConfidenceLevel(confidence)
  switch (level) {
    case 'high':
      return 'High confidence (90-100%)'
    case 'medium':
      return 'Medium confidence (70-89%)'
    case 'low':
      return 'Low confidence (50-69%)'
    case 'none':
      return 'Very low confidence (0-49%)'
  }
}
