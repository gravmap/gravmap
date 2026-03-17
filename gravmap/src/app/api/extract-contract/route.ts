import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { openai } from '@/lib/openai/client'
import { buildExtractionRequest } from '@/lib/openai/prompts/contract-extraction'
import type { ContractExtractionResult, ExtractionResponse } from '@/types/extraction'

/**
 * POST /api/extract-contract
 * 
 * Extracts structured data from a real estate contract using GPT-4 Vision
 * 
 * Request body:
 * {
 *   documentId: string
 *   documentUrl: string
 * }
 * 
 * Response:
 * {
 *   success: boolean
 *   extractedData?: ContractExtractionResult
 *   error?: { code: string, message: string }
 * }
 */
export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const supabase = await createClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'UNAUTHORIZED',
            message: 'You must be logged in to extract contract data',
          },
        } as ExtractionResponse,
        { status: 401 }
      )
    }

    // Parse request body
    const body = await request.json()
    const { documentId, documentUrl } = body

    if (!documentId || !documentUrl) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_REQUEST',
            message: 'documentId and documentUrl are required',
          },
        } as ExtractionResponse,
        { status: 400 }
      )
    }

    // Verify document ownership
    const { data: document, error: docError } = await supabase
      .from('documents')
      .select('*, transactions!inner(user_id)')
      .eq('id', documentId)
      .single()

    if (docError || !document) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'DOCUMENT_NOT_FOUND',
            message: 'Document not found',
          },
        } as ExtractionResponse,
        { status: 404 }
      )
    }

    // Type guard: check if transactions is an array or object
    const transactionData = Array.isArray(document.transactions)
      ? document.transactions[0]
      : document.transactions

    if (!transactionData || transactionData.user_id !== user.id) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'FORBIDDEN',
            message: 'You do not have access to this document',
          },
        } as ExtractionResponse,
        { status: 403 }
      )
    }

    // Check if document already has extraction
    if (document.extraction_status === 'completed' && document.extracted_data) {
      return NextResponse.json(
        {
          success: true,
          extractedData: document.extracted_data as ContractExtractionResult,
        } as ExtractionResponse,
        { status: 200 }
      )
    }

    // Update status to processing
    await supabase
      .from('documents')
      .update({ extraction_status: 'processing' })
      .eq('id', documentId)

    // Call GPT-4 Vision API
    let extractionResult: ContractExtractionResult
    
    try {
      const extractionRequest = buildExtractionRequest(documentUrl)
      
      const response = await openai.chat.completions.create(extractionRequest)

      const content = response.choices[0]?.message?.content

      if (!content) {
        throw new Error('No response from GPT-4 Vision')
      }

      // Parse the JSON response
      const parsedData = JSON.parse(content)

      // Add metadata to extraction result
      extractionResult = {
        ...parsedData,
        extraction_timestamp: new Date().toISOString(),
        model_version: response.model || 'gpt-4o',
      }

      // Validate the extraction result has required fields
      if (!extractionResult.closing_date || !extractionResult.property_address) {
        console.warn('Extraction missing critical fields:', extractionResult)
      }
    } catch (parseError) {
      console.error('Failed to parse GPT-4 response:', parseError)
      
      // Update status to failed
      await supabase
        .from('documents')
        .update({
          extraction_status: 'failed',
          extracted_data: {
            error: 'Failed to parse extraction result',
            timestamp: new Date().toISOString(),
          } as unknown as Record<string, unknown>,
        })
        .eq('id', documentId)

      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'EXTRACTION_FAILED',
            message: 'Failed to extract data from document. Please try again.',
            details: parseError instanceof Error ? parseError.message : 'Unknown error',
          },
        } as ExtractionResponse,
        { status: 500 }
      )
    }

    // Store extraction results in database
    const { error: updateError } = await supabase
      .from('documents')
      .update({
        extraction_status: 'completed',
        extracted_data: extractionResult as unknown as Record<string, unknown>,
      })
      .eq('id', documentId)

    if (updateError) {
      console.error('Failed to store extraction results:', updateError)
      // Still return the results even if storage failed
    }

    return NextResponse.json(
      {
        success: true,
        extractedData: extractionResult,
      } as ExtractionResponse,
      { status: 200 }
    )
  } catch (error) {
    console.error('Contract extraction error:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'An unexpected error occurred during extraction',
          details: error instanceof Error ? error.message : 'Unknown error',
        },
      } as ExtractionResponse,
      { status: 500 }
    )
  }
}
