import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { TimelineEventUpdate } from '@/types/database'

/**
 * PATCH /api/timeline-events/[id]
 * 
 * Update a timeline event (e.g., mark as completed)
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
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

    const eventId = params.id

    // Verify event ownership through transaction
    const { data: event, error: eventError } = await supabase
      .from('timeline_events')
      .select('*, transaction:transactions(user_id)')
      .eq('id', eventId)
      .single()

    if (eventError || !event) {
      return NextResponse.json(
        { success: false, error: 'Event not found' },
        { status: 404 }
      )
    }

    const transaction = event.transaction as { user_id: string }
    if (transaction.user_id !== user.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 403 }
      )
    }

    // Parse updates
    const updates = (await request.json()) as TimelineEventUpdate

    // Validate status
    if (updates.status && !['upcoming', 'completed', 'overdue', 'cancelled'].includes(updates.status)) {
      return NextResponse.json(
        { success: false, error: 'Invalid status' },
        { status: 400 }
      )
    }

    // Update event
    const { data, error: updateError } = await supabase
      .from('timeline_events')
      .update(updates)
      .eq('id', eventId)
      .select()
      .single()

    if (updateError) {
      console.error('Failed to update event:', updateError)
      return NextResponse.json(
        { success: false, error: 'Failed to update event' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      event: data,
    })
  } catch (error) {
    console.error('Update timeline event error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update event' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/timeline-events/[id]
 * 
 * Delete a timeline event
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
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

    const eventId = params.id

    // Verify event ownership through transaction
    const { data: event, error: eventError } = await supabase
      .from('timeline_events')
      .select('*, transaction:transactions(user_id)')
      .eq('id', eventId)
      .single()

    if (eventError || !event) {
      return NextResponse.json(
        { success: false, error: 'Event not found' },
        { status: 404 }
      )
    }

    const transaction = event.transaction as { user_id: string }
    if (transaction.user_id !== user.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 403 }
      )
    }

    // Delete event
    const { error: deleteError } = await supabase
      .from('timeline_events')
      .delete()
      .eq('id', eventId)

    if (deleteError) {
      console.error('Failed to delete event:', deleteError)
      return NextResponse.json(
        { success: false, error: 'Failed to delete event' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error('Delete timeline event error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete event' },
      { status: 500 }
    )
  }
}
