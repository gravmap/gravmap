import { NextRequest, NextResponse } from 'next/server'
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { sendEmail, isEmailConfigured } from '@/lib/email/client'
import { 
  generateDeadlineReminderEmail, 
  generateDailyDigestEmail 
} from '@/lib/email/templates'
import type { Transaction, TimelineEvent, User } from '@/types/database'

// Type for events with joined transaction and user data
interface EventWithTransaction extends TimelineEvent {
  transaction: (Transaction & { user: User }) | null
}

// Generic Supabase client type for service role operations
type ServiceClient = SupabaseClient

/**
 * POST /api/cron/send-reminders
 * 
 * Cron job endpoint to send deadline reminders.
 * Should be called by Vercel Cron or external scheduler.
 * 
 * Query params:
 * - type: 'reminders' | 'digest' (default: 'reminders')
 * - days: number of days ahead to check (default: 7,3,1)
 * 
 * Headers:
 * - Authorization: Bearer <CRON_SECRET> (optional, recommended for production)
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    // Optional: Verify cron secret for security
    const cronSecret = process.env.CRON_SECRET
    const authHeader = request.headers.get('authorization')
    
    if (cronSecret) {
      const token = authHeader?.replace('Bearer ', '')
      if (token !== cronSecret) {
        return NextResponse.json(
          { success: false, error: 'Unauthorized' },
          { status: 401 }
        )
      }
    }

    // Get query params
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'reminders'
    const daysParam = searchParams.get('days')

    // Create service role client to bypass RLS for cron jobs
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
    
    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { success: false, error: 'Server configuration error' },
        { status: 500 }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }) as ServiceClient

    const appUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'

    if (type === 'digest') {
      return await sendDailyDigest(supabase, appUrl)
    } else {
      const reminderDays = daysParam 
        ? daysParam.split(',').map(d => parseInt(d.trim())).filter(d => !isNaN(d))
        : [7, 3, 1]
      return await sendDeadlineReminders(supabase, appUrl, reminderDays)
    }

  } catch (error) {
    console.error('Cron job error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Cron job failed',
        duration: Date.now() - startTime,
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/cron/send-reminders
 * 
 * Health check endpoint for the cron job
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  return NextResponse.json({
    success: true,
    message: 'Cron endpoint is operational',
    emailConfigured: isEmailConfigured(),
    timestamp: new Date().toISOString(),
  })
}

// ============================================================================
// DEADLINE REMINDERS
// ============================================================================

async function sendDeadlineReminders(
  supabase: ServiceClient,
  appUrl: string,
  reminderDays: number[]
): Promise<NextResponse> {
  const results = {
    checked: 0,
    sent: 0,
    skipped: 0,
    errors: [] as string[],
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Calculate target dates
  const targetDates = reminderDays.map(days => {
    const date = new Date(today)
    date.setDate(date.getDate() + days)
    return date.toISOString().split('T')[0]
  })

  // Get all timeline events that match our target dates and haven't had reminders sent
  const { data: events, error: eventsError } = await supabase
    .from('timeline_events')
    .select(`
      *,
      transaction:transactions(
        *,
        user:users(*)
      )
    `)
    .in('event_date', targetDates)
    .in('status', ['upcoming', 'overdue'])
    .eq('reminder_sent', false)

  if (eventsError) {
    console.error('Failed to fetch events:', eventsError)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch events', results },
      { status: 500 }
    )
  }

  results.checked = events?.length || 0

  // Process each event
  const typedEvents = (events || []) as unknown as EventWithTransaction[]
  for (const event of typedEvents) {
    try {
      const transaction = event.transaction
      const user = event.transaction?.user

      if (!transaction || !user) {
        results.skipped++
        continue
      }

      // Calculate days until event
      const eventDate = new Date(event.event_date)
      eventDate.setHours(0, 0, 0, 0)
      const daysUntil = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

      // Generate email
      const { html, text } = generateDeadlineReminderEmail({
        transaction,
        event: event as TimelineEvent,
        daysUntil,
        recipientName: user.name || undefined,
        appUrl,
      })

      // Send email
      const daysText = daysUntil === 0 ? 'today' : daysUntil === 1 ? 'tomorrow' : `in ${daysUntil} days`
      const emailResult = await sendEmail({
        to: user.email,
        subject: `⏰ Reminder: ${event.event_name} is ${daysText}`,
        html,
        text,
      })

      if (emailResult.success) {
        // Mark reminder as sent
        await supabase
          .from('timeline_events')
          .update({
            reminder_sent: true,
            reminder_dates: [...(event.reminder_dates || []), new Date().toISOString()],
          })
          .eq('id', event.id)

        results.sent++
        console.log(`Sent reminder for event ${event.id} to ${user.email}`)
      } else {
        results.errors.push(`Failed to send to ${user.email}: ${emailResult.error}`)
        results.skipped++
      }

    } catch (err) {
      console.error(`Error processing event ${event.id}:`, err)
      results.errors.push(`Error processing event ${event.id}: ${err}`)
      results.skipped++
    }
  }

  return NextResponse.json({
    success: true,
    type: 'reminders',
    reminderDays,
    results,
    duration: Date.now() - startTime,
  })
}

// Need to track start time
const startTime = Date.now()

// ============================================================================
// DAILY DIGEST
// ============================================================================

async function sendDailyDigest(
  supabase: ServiceClient,
  appUrl: string
): Promise<NextResponse> {
  const results = {
    usersProcessed: 0,
    emailsSent: 0,
    errors: [] as string[],
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const weekFromNow = new Date(today)
  weekFromNow.setDate(weekFromNow.getDate() + 7)

  // Get all users who have digest notifications enabled (we'll add this to user settings later)
  // For now, get all users with active transactions
  const { data: users, error: usersError } = await supabase
    .from('users')
    .select('*')

  if (usersError) {
    console.error('Failed to fetch users:', usersError)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch users', results },
      { status: 500 }
    )
  }

  // Process each user
  for (const user of users || []) {
    try {
      // Get user's transactions
      const { data: transactions } = await supabase
        .from('transactions')
        .select('id')
        .eq('user_id', user.id)
        .in('status', ['active', 'pending'])

      if (!transactions || transactions.length === 0) {
        continue
      }

      const transactionIds = transactions.map(t => t.id)

      // Get upcoming events (within 7 days)
      const { data: upcomingEventsData } = await supabase
        .from('timeline_events')
        .select(`
          *,
          transaction:transactions(*)
        `)
        .in('transaction_id', transactionIds)
        .eq('status', 'upcoming')
        .gte('event_date', today.toISOString().split('T')[0])
        .lte('event_date', weekFromNow.toISOString().split('T')[0])
        .order('event_date', { ascending: true })

      // Get overdue events
      const { data: overdueEventsData } = await supabase
        .from('timeline_events')
        .select(`
          *,
          transaction:transactions(*)
        `)
        .in('transaction_id', transactionIds)
        .eq('status', 'overdue')
        .order('event_date', { ascending: true })

      const upcomingEvents = (upcomingEventsData || []).map(e => {
        const event = e as unknown as EventWithTransaction
        return {
          transaction: event.transaction as Transaction,
          event: event as TimelineEvent,
          daysUntil: Math.ceil((new Date(event.event_date).getTime() - today.getTime()) / (1000 * 60 * 60 * 24)),
        }
      })

      const overdueEvents = (overdueEventsData || []).map(e => {
        const event = e as unknown as EventWithTransaction
        return {
          transaction: event.transaction as Transaction,
          event: event as TimelineEvent,
          daysPast: Math.ceil((today.getTime() - new Date(event.event_date).getTime()) / (1000 * 60 * 60 * 24)),
        }
      })

      // Skip if no events
      if (upcomingEvents.length === 0 && overdueEvents.length === 0) {
        continue
      }

      // Generate and send digest
      const { html, text } = generateDailyDigestEmail({
        recipientName: user.name || undefined,
        upcomingEvents,
        overdueEvents,
        appUrl,
      })

      const emailResult = await sendEmail({
        to: user.email,
        subject: `📊 Daily Digest: ${upcomingEvents.length} upcoming, ${overdueEvents.length} overdue`,
        html,
        text,
      })

      if (emailResult.success) {
        results.emailsSent++
      } else {
        results.errors.push(`Failed to send digest to ${user.email}: ${emailResult.error}`)
      }

      results.usersProcessed++

    } catch (err) {
      console.error(`Error processing user ${user.id}:`, err)
      results.errors.push(`Error processing user ${user.id}: ${err}`)
    }
  }

  return NextResponse.json({
    success: true,
    type: 'digest',
    results,
    duration: Date.now() - startTime,
  })
}
