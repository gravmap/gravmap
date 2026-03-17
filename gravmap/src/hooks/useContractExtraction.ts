'use client'

import { useState, useCallback } from 'react'
import type { ContractExtractionResult, ExtractionStatus } from '@/types/extraction'

interface UseContractExtractionOptions {
  documentId: string
  documentUrl: string
  initialStatus?: ExtractionStatus
  initialData?: ContractExtractionResult | null
}

interface UseContractExtractionReturn {
  extractedData: ContractExtractionResult | null
  status: ExtractionStatus
  isExtracting: boolean
  isSaving: boolean
  error: string | null
  extract: () => Promise<void>
  confirmExtraction: (data: ContractExtractionResult) => Promise<void>
  updateField: (fieldPath: string, value: string | number | null) => void
  reset: () => void
}

/**
 * Custom hook for managing contract extraction workflow
 */
export function useContractExtraction({
  documentId,
  documentUrl,
  initialStatus = 'pending',
  initialData = null,
}: UseContractExtractionOptions): UseContractExtractionReturn {
  const [extractedData, setExtractedData] = useState<ContractExtractionResult | null>(initialData)
  const [status, setStatus] = useState<ExtractionStatus>(initialStatus)
  const [isExtracting, setIsExtracting] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /**
   * Trigger extraction API call
   */
  const extract = useCallback(async () => {
    setIsExtracting(true)
    setError(null)
    setStatus('processing')

    try {
      const response = await fetch('/api/extract-contract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          documentId,
          documentUrl,
        }),
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error?.message || 'Extraction failed')
      }

      setExtractedData(data.extractedData)
      setStatus('completed')
    } catch (err) {
      console.error('Extraction error:', err)
      setError(err instanceof Error ? err.message : 'Failed to extract contract data')
      setStatus('failed')
    } finally {
      setIsExtracting(false)
    }
  }, [documentId, documentUrl])

  /**
   * Confirm extraction and save to transaction
   */
  const confirmExtraction = useCallback(
    async (data: ContractExtractionResult) => {
      setIsSaving(true)
      setError(null)

      try {
        // Update transaction with extracted data
        const response = await fetch(`/api/transactions/${documentId}/confirm-extraction`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ extractedData: data }),
        })

        if (!response.ok) {
          throw new Error('Failed to save extraction')
        }

        // Optionally create timeline events here
        // This would be another API call to create timeline events from the dates
      } catch (err) {
        console.error('Confirm error:', err)
        setError(err instanceof Error ? err.message : 'Failed to save confirmed data')
        throw err
      } finally {
        setIsSaving(false)
      }
    },
    [documentId]
  )

  /**
   * Update a specific field in the extracted data
   */
  const updateField = useCallback((fieldPath: string, value: string | number | null) => {
    setExtractedData((prev) => {
      if (!prev) return null

      const updated = { ...prev }
      const keys = fieldPath.split('.')

      if (keys.length === 1) {
        // Top-level field - cast through unknown to avoid TypeScript error
        ;(updated as unknown as Record<string, { value: unknown; confidence: number }>)[keys[0]] = {
          value,
          confidence: 100, // User-edited = 100% confidence
        }
      } else if (keys.length === 2) {
        // Nested field (e.g., contingency_dates.inspection)
        const [parent, child] = keys
        if (parent === 'contingency_dates') {
          updated.contingency_dates[child] = {
            value: value as string,
            confidence: 100,
          }
        }
      }

      return updated
    })
  }, [])

  /**
   * Reset extraction state
   */
  const reset = useCallback(() => {
    setExtractedData(null)
    setStatus('pending')
    setError(null)
    setIsExtracting(false)
    setIsSaving(false)
  }, [])

  return {
    extractedData,
    status,
    isExtracting,
    isSaving,
    error,
    extract,
    confirmExtraction,
    updateField,
    reset,
  }
}
