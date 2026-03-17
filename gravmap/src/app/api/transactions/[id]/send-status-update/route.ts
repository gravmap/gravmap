import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { sendEmail } from '@/lib/email/client'
import { generateClientStatusUpdateEmail } from '@/lib/email/templates'
import type { Transaction, TimelineEvent } from '@/types/database'

/**
 * POST /api/transactions/[id]/send-status-update
 * 
 * Send a status update email to the client.
 * 
 * Body: {
 *   recipientEmail: string
 *   recipientName?: string
 *   customMessage?: string
 * }
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
      .select(`
        *,
        user:users(name, email)
      `)
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
    const { recipientEmail, recipientName, customMessage } = body as {
      recipientEmail: string
      recipientName?: string
      customMessage?: string
    }

    if (!recipientEmail) {
      return NextResponse.json(
        { success: false, error: 'Recipient email is required' },
        { status: 400 }
      )
    }

    // Get timeline events
    const { data: events } = await supabase
      .from('timeline_events')
      .select('*')
      .eq('transaction_id', transactionId)
      .order('event_date', { ascending: true })

    const upcomingEvents = (events || [])
      .filter(e => e.status === 'upcoming')
      .slice(0, 5) as TimelineEvent[]

    const completedEvents = (events || [])
      .filter(e => e.status === 'completed')
      .slice(0, 5) as TimelineEvent[]

    // Get sender name
    const senderName = (transaction.user as { name: string | null })?.name || 'Your Agent'

    // Generate email
    const appUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'
    const { html, text } = generateClientStatusUpdateEmail({
      transaction: transaction as Transaction,
      recipientName,
      recipientEmail,
      senderName,
      customMessage,
      upcomingEvents,
      completedEvents,
      appUrl,
    })

    // Send email
    const emailResult = await sendEmail({
      to: recipientEmail,
      subject: `Update: ${transaction.property_address}`,
      html,
      text,
      replyTo: (transaction.user as { email: string })?.email,
    })

    if (!emailResult.success) {
      return NextResponse.json(
        { success: false, error: emailResult.error || 'Failed to send email' },
        { status: 500 }
      )
    }

    // Log the communication
    await supabase
      .from('communications')
      .insert({
        transaction_id: transactionId,
        recipient_email: recipientEmail,
        recipient_name: recipientName || null,
        subject: `Update: ${transaction.property_address}`,
        body: text,
        email_type: 'status_update',
        sent_at: new Date().toISOString(),
        status: 'sent',
      })

    // Also log to notification_logs if table exists
    try {
      await supabase
        .from('notification_logs')
        .insert({
          user_id: user.id,
          transaction_id: transactionId,
          notification_type: 'status_update',
          recipient_email: recipientEmail,
          subject: `Update: ${transaction.property_address}`,
          status: 'sent',
        })
    } catch {
      // Table might not exist yet, ignore
    }

    return NextResponse.json({
      success: true,
      messageId: emailResult.messageId,
      mock: emailResult.mock,
    })
  } catch (error) {
    console.error('Send status update error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send status update',
      },
      { status: 500 }
    )
  }
}
