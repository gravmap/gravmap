import { Resend } from 'resend'

// Check if we have a real API key or should use mock mode
const RESEND_API_KEY = process.env.RESEND_API_KEY
const MOCK_MODE = !RESEND_API_KEY || RESEND_API_KEY === 'your-resend-api-key'

// Create Resend client (will be undefined in mock mode)
const resend = MOCK_MODE ? null : new Resend(RESEND_API_KEY)

export interface EmailOptions {
  to: string | string[]
  subject: string
  html: string
  text?: string
  from?: string
  replyTo?: string
}

export interface EmailResult {
  success: boolean
  messageId?: string
  error?: string
  mock?: boolean
}

/**
 * Send an email using Resend
 * Falls back to mock mode if API key is not configured
 */
export async function sendEmail(options: EmailOptions): Promise<EmailResult> {
  const { to, subject, html, text, from, replyTo } = options

  // Mock mode - log instead of sending
  if (MOCK_MODE || !resend) {
    console.log('\n📧 [MOCK EMAIL] Would send email:')
    console.log('  To:', Array.isArray(to) ? to.join(', ') : to)
    console.log('  From:', from || 'notifications@gravmap.com')
    console.log('  Subject:', subject)
    console.log('  Reply-To:', replyTo || 'N/A')
    console.log('  HTML Length:', html.length, 'chars')
    if (text) {
      console.log('  Text Length:', text.length, 'chars')
    }
    console.log('')
    
    return {
      success: true,
      messageId: `mock-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      mock: true,
    }
  }

  // Real send
  try {
    const { data, error } = await resend.emails.send({
      from: from || 'GravMap <notifications@gravmap.com>',
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      text: text || undefined,
      replyTo: replyTo || undefined,
    })

    if (error) {
      console.error('Resend error:', error)
      return {
        success: false,
        error: error.message || 'Failed to send email',
      }
    }

    return {
      success: true,
      messageId: data?.id,
    }
  } catch (err) {
    console.error('Email send error:', err)
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to send email',
    }
  }
}

/**
 * Check if email service is configured
 */
export function isEmailConfigured(): boolean {
  return !MOCK_MODE
}

/**
 * Get the default sender email
 */
export function getDefaultSender(): string {
  return process.env.EMAIL_FROM || 'notifications@gravmap.com'
}
