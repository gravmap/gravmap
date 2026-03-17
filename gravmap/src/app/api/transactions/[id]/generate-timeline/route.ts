import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { ContractExtractionResult } from '@/types/extraction'
import type { TimelineEventInsert, EventType, EventStatus } from '@/types/database'

/**
 * POST /api/transactions/[id]/generate-timeline
 * 
 * Generates timeline events from confirmed extraction data.
 * Can be used to regenerate timeline after data changes.
 * 
 * Body: { extractedData: ContractExtractionResult, clearExisting?: boolean }
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
    const { extractedData, clearExisting = false } = body as { 
      extractedData: ContractExtractionResult
      clearExisting?: boolean 
    }

    if (!extractedData) {
      return NextResponse.json(
        { success: false, error: 'Extracted data is required' },
        { status: 400 }
      )
    }

    // Helper function to calculate event status based on date
    const calculateStatus = (dateString: string): EventStatus => {
      const eventDate = new Date(dateString)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      eventDate.setHours(0, 0, 0, 0)
      
      if (eventDate < today) {
        return 'overdue'
      }
      return 'upcoming'
    }

    // Helper function to calculate days until event
    const getDaysUntil = (dateString: string): number => {
      const eventDate = new Date(dateString)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      eventDate.setHours(0, 0, 0, 0)
      
      const diffTime = eventDate.getTime() - today.getTime()
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    }

    // Build timeline events from extraction data
    const timelineEvents: TimelineEventInsert[] = []

    // Closing date
    if (extractedData.closing_date.value) {
      timelineEvents.push({
        transaction_id: transactionId,
        event_name: 'Closing Date',
        event_date: extractedData.closing_date.value,
        event_type: 'closing' as EventType,
        status: calculateStatus(extractedData.closing_date.value),
        description: 'Final closing and transfer of property ownership',
        reminder_sent: false,
        reminder_dates: [],
      })
    }

    // Inspection contingency
    if (extractedData.contingency_dates.inspection.value) {
      const date = extractedData.contingency_dates.inspection.value
      const days = getDaysUntil(date)
      timelineEvents.push({
        transaction_id: transactionId,
        event_name: 'Inspection Contingency Deadline',
        event_date: date,
        event_type: 'inspection' as EventType,
        status: calculateStatus(date),
        description: `Deadline to complete property inspection. ${days > 0 ? `${days} days remaining.` : `${Math.abs(days)} days overdue.`}`,
        reminder_sent: false,
        reminder_dates: [],
      })
    }

    // Financing contingency
    if (extractedData.contingency_dates.financing.value) {
      const date = extractedData.contingency_dates.financing.value
      const days = getDaysUntil(date)
      timelineEvents.push({
        transaction_id: transactionId,
        event_name: 'Financing Contingency Deadline',
        event_date: date,
        event_type: 'financing' as EventType,
        status: calculateStatus(date),
        description: `Deadline to secure financing. ${days > 0 ? `${days} days remaining.` : `${Math.abs(days)} days overdue.`}`,
        reminder_sent: false,
        reminder_dates: [],
      })
    }

    // Appraisal contingency
    if (extractedData.contingency_dates.appraisal.value) {
      const date = extractedData.contingency_dates.appraisal.value
      const days = getDaysUntil(date)
      timelineEvents.push({
        transaction_id: transactionId,
        event_name: 'Appraisal Contingency Deadline',
        event_date: date,
        event_type: 'appraisal' as EventType,
        status: calculateStatus(date),
        description: `Deadline to complete property appraisal. ${days > 0 ? `${days} days remaining.` : `${Math.abs(days)} days overdue.`}`,
        reminder_sent: false,
        reminder_dates: [],
      })
    }

    // Additional dates
    if (extractedData.additional_dates && extractedData.additional_dates.length > 0) {
      extractedData.additional_dates.forEach((date) => {
        const days = getDaysUntil(date.date)
        timelineEvents.push({
          transaction_id: transactionId,
          event_name: date.name,
          event_date: date.date,
          event_type: 'contingency' as EventType,
          status: calculateStatus(date.date),
          description: `${date.notes || 'Extracted from contract'} (confidence: ${date.confidence}%). ${days > 0 ? `${days} days remaining.` : `${Math.abs(days)} days overdue.`}`,
          reminder_sent: false,
          reminder_dates: [],
        })
      })
    }

    // Sort events by date
    timelineEvents.sort((a, b) => 
      new Date(a.event_date).getTime() - new Date(b.event_date).getTime()
    )

    // Optionally clear existing timeline events
    if (clearExisting) {
      const { error: deleteError } = await supabase
        .from('timeline_events')
        .delete()
        .eq('transaction_id', transactionId)

      if (deleteError) {
        console.error('Failed to clear existing timeline events:', deleteError)
        // Continue anyway
      }
    }

    // Insert timeline events
    let insertedEvents = []
    if (timelineEvents.length > 0) {
      const { data, error: insertError } = await supabase
        .from('timeline_events')
        .insert(timelineEvents)
        .select()

      if (insertError) {
        console.error('Failed to create timeline events:', insertError)
        return NextResponse.json(
          { success: false, error: 'Failed to create timeline events' },
          { status: 500 }
        )
      }
      insertedEvents = data
    }

    return NextResponse.json({
      success: true,
      eventsCreated: insertedEvents.length,
      events: insertedEvents,
    })
  } catch (error) {
    console.error('Generate timeline error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate timeline',
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/transactions/[id]/generate-timeline
 * 
 * Regenerates timeline from existing confirmed data (from documents).
 * Useful for updating status after time passes.
 */
export async function GET(
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

    // Get existing timeline events
    const { data: existingEvents, error: eventsError } = await supabase
      .from('timeline_events')
      .select('*')
      .eq('transaction_id', transactionId)
      .order('event_date', { ascending: true })

    if (eventsError) {
      console.error('Failed to fetch timeline events:', eventsError)
      return NextResponse.json(
        { success: false, error: 'Failed to fetch timeline events' },
        { status: 500 }
      )
    }

    // Helper function to calculate event status based on date
    const calculateStatus = (dateString: string): EventStatus => {
      const eventDate = new Date(dateString)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      eventDate.setHours(0, 0, 0, 0)
      
      if (eventDate < today) {
        return 'overdue'
      }
      return 'upcoming'
    }

    // Update status of any events that may have changed
    const updates = []
    for (const event of existingEvents || []) {
      if (event.status === 'upcoming' || event.status === 'overdue') {
        const newStatus = calculateStatus(event.event_date)
        if (newStatus !== event.status) {
          const { error: updateError } = await supabase
            .from('timeline_events')
            .update({ status: newStatus })
            .eq('id', event.id)
          
          if (!updateError) {
            updates.push({ id: event.id, oldStatus: event.status, newStatus })
          }
        }
      }
    }

    // Fetch updated events
    const { data: updatedEvents } = await supabase
      .from('timeline_events')
      .select('*')
      .eq('transaction_id', transactionId)
      .order('event_date', { ascending: true })

    return NextResponse.json({
      success: true,
      events: updatedEvents,
      statusUpdates: updates,
    })
  } catch (error) {
    console.error('Refresh timeline error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to refresh timeline',
      },
      { status: 500 }
    )
  }
}
