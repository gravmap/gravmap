import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { ContractExtractionResult } from '@/types/extraction'

/**
 * POST /api/transactions/[id]/confirm-extraction
 * 
 * Confirms extracted contract data and:
 * 1. Updates transaction with buyer, seller, price, address, closing date
 * 2. Creates timeline events from contingency dates
 * 3. Marks extraction as confirmed
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Authenticate user
    const supabase = await createClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const transactionId = params.id

    // Verify transaction ownership
    const { data: transaction, error: txError } = await supabase
      .from('transactions')
      .select('*')
      .eq('id', transactionId)
      .eq('user_id', user.id)
      .single()

    if (txError || !transaction) {
      return NextResponse.json(
        { success: false, error: 'Transaction not found' },
        { status: 404 }
      )
    }

    // Parse request body
    const body = await request.json()
    const { extractedData } = body as { extractedData: ContractExtractionResult }

    if (!extractedData) {
      return NextResponse.json(
        { success: false, error: 'Extracted data is required' },
        { status: 400 }
      )
    }

    // Update transaction with extracted data
    const transactionUpdate: {
      buyer_name?: string | null
      seller_name?: string | null
      purchase_price?: number | null
      property_address?: string | null
      closing_date?: string | null
    } = {}

    if (extractedData.buyer_name.value) {
      transactionUpdate.buyer_name = extractedData.buyer_name.value
    }
    if (extractedData.seller_name.value) {
      transactionUpdate.seller_name = extractedData.seller_name.value
    }
    if (extractedData.purchase_price.value) {
      transactionUpdate.purchase_price = extractedData.purchase_price.value
    }
    if (extractedData.property_address.value) {
      transactionUpdate.property_address = extractedData.property_address.value
    }
    if (extractedData.closing_date.value) {
      transactionUpdate.closing_date = extractedData.closing_date.value
    }

    const { error: updateError } = await supabase
      .from('transactions')
      .update(transactionUpdate)
      .eq('id', transactionId)

    if (updateError) {
      console.error('Failed to update transaction:', updateError)
      throw updateError
    }

    // Create timeline events from contingency dates
    const timelineEvents: Array<{
      transaction_id: string
      event_name: string
      event_date: string
      event_type: string
      status: string
      description?: string
    }> = []

    // Closing date
    if (extractedData.closing_date.value) {
      timelineEvents.push({
        transaction_id: transactionId,
        event_name: 'Closing Date',
        event_date: extractedData.closing_date.value,
        event_type: 'closing',
        status: 'upcoming',
        description: 'Final closing and transfer of property ownership',
      })
    }

    // Inspection contingency
    if (extractedData.contingency_dates.inspection.value) {
      timelineEvents.push({
        transaction_id: transactionId,
        event_name: 'Inspection Contingency Deadline',
        event_date: extractedData.contingency_dates.inspection.value,
        event_type: 'inspection',
        status: 'upcoming',
        description: 'Deadline to complete property inspection',
      })
    }

    // Financing contingency
    if (extractedData.contingency_dates.financing.value) {
      timelineEvents.push({
        transaction_id: transactionId,
        event_name: 'Financing Contingency Deadline',
        event_date: extractedData.contingency_dates.financing.value,
        event_type: 'financing',
        status: 'upcoming',
        description: 'Deadline to secure financing',
      })
    }

    // Appraisal contingency
    if (extractedData.contingency_dates.appraisal.value) {
      timelineEvents.push({
        transaction_id: transactionId,
        event_name: 'Appraisal Contingency Deadline',
        event_date: extractedData.contingency_dates.appraisal.value,
        event_type: 'appraisal',
        status: 'upcoming',
        description: 'Deadline to complete property appraisal',
      })
    }

    // Additional dates
    if (extractedData.additional_dates && extractedData.additional_dates.length > 0) {
      extractedData.additional_dates.forEach((date) => {
        timelineEvents.push({
          transaction_id: transactionId,
          event_name: date.name,
          event_date: date.date,
          event_type: 'contingency',
          status: 'upcoming',
          description: `Extracted from contract (confidence: ${date.confidence}%)`,
        })
      })
    }

    // Insert timeline events
    if (timelineEvents.length > 0) {
      const { error: timelineError } = await supabase
        .from('timeline_events')
        .insert(timelineEvents)

      if (timelineError) {
        console.error('Failed to create timeline events:', timelineError)
        // Don't throw - transaction is already updated
      }
    }

    return NextResponse.json({
      success: true,
      transaction: transactionUpdate,
      timelineEvents: timelineEvents.length,
    })
  } catch (error) {
    console.error('Confirm extraction error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to confirm extraction',
      },
      { status: 500 }
    )
  }
}
