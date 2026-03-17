import type { Transaction, TimelineEvent } from '@/types/database'

// ============================================================================
// SHARED STYLES AND COMPONENTS
// ============================================================================

const baseStyles = `
  body { 
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    line-height: 1.6;
    color: #1f2937;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9fafb;
  }
  .container {
    background-color: #ffffff;
    border-radius: 8px;
    padding: 32px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  .header {
    text-align: center;
    padding-bottom: 24px;
    border-bottom: 1px solid #e5e7eb;
    margin-bottom: 24px;
  }
  .logo {
    font-size: 24px;
    font-weight: bold;
    color: #2563eb;
  }
  .footer {
    margin-top: 32px;
    padding-top: 24px;
    border-top: 1px solid #e5e7eb;
    text-align: center;
    color: #6b7280;
    font-size: 14px;
  }
  .btn {
    display: inline-block;
    padding: 12px 24px;
    background-color: #2563eb;
    color: #ffffff;
    text-decoration: none;
    border-radius: 6px;
    font-weight: 500;
  }
  .btn:hover {
    background-color: #1d4ed8;
  }
  .alert {
    padding: 16px;
    border-radius: 6px;
    margin-bottom: 16px;
  }
  .alert-warning {
    background-color: #fef3c7;
    border-left: 4px solid #f59e0b;
  }
  .alert-danger {
    background-color: #fee2e2;
    border-left: 4px solid #ef4444;
  }
  .alert-info {
    background-color: #dbeafe;
    border-left: 4px solid #3b82f6;
  }
  .event-item {
    padding: 16px;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    margin-bottom: 12px;
  }
  .event-date {
    font-size: 14px;
    color: #6b7280;
  }
  .event-name {
    font-weight: 600;
    color: #1f2937;
    margin: 4px 0;
  }
  .days-badge {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 600;
  }
  .days-urgent { background-color: #fee2e2; color: #dc2626; }
  .days-soon { background-color: #fef3c7; color: #d97706; }
  .days-normal { background-color: #dbeafe; color: #2563eb; }
`

// ============================================================================
// DEADLINE REMINDER EMAIL
// ============================================================================

export interface DeadlineReminderData {
  transaction: Transaction
  event: TimelineEvent
  daysUntil: number
  recipientName?: string
  appUrl: string
}

export function generateDeadlineReminderEmail(data: DeadlineReminderData): { html: string; text: string } {
  const { transaction, event, daysUntil, recipientName, appUrl } = data

  const urgencyClass = daysUntil <= 1 ? 'days-urgent' : daysUntil <= 3 ? 'days-soon' : 'days-normal'
  const urgencyLabel = daysUntil === 0 ? 'TODAY' : daysUntil === 1 ? 'TOMORROW' : `${daysUntil} DAYS`
  const alertClass = daysUntil <= 1 ? 'alert-danger' : 'alert-warning'

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Deadline Reminder: ${event.event_name}</title>
  <style>${baseStyles}</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">🏠 GravMap</div>
    </div>

    <p>Hi ${recipientName || 'there'},</p>

    <div class="alert ${alertClass}">
      <strong>⏰ Deadline Alert!</strong><br>
      ${event.event_name} is due <strong>${daysUntil === 0 ? 'today' : daysUntil === 1 ? 'tomorrow' : `in ${daysUntil} days`}</strong>.
    </div>

    <h2 style="margin-top: 24px; color: #1f2937;">${event.event_name}</h2>
    
    <div class="event-item">
      <div class="event-date">📅 ${new Date(event.event_date).toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })}</div>
      <div class="event-name">${event.event_name}</div>
      <span class="days-badge ${urgencyClass}">${urgencyLabel}</span>
      ${event.description ? `<p style="margin-top: 8px; color: #4b5563;">${event.description}</p>` : ''}
    </div>

    <h3 style="margin-top: 24px; color: #374151;">Transaction Details</h3>
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 8px 0; color: #6b7280;">Property:</td>
        <td style="padding: 8px 0; font-weight: 500;">${transaction.property_address}</td>
      </tr>
      ${transaction.purchase_price ? `
      <tr>
        <td style="padding: 8px 0; color: #6b7280;">Purchase Price:</td>
        <td style="padding: 8px 0; font-weight: 500;">$${transaction.purchase_price.toLocaleString()}</td>
      </tr>
      ` : ''}
      ${transaction.closing_date ? `
      <tr>
        <td style="padding: 8px 0; color: #6b7280;">Closing Date:</td>
        <td style="padding: 8px 0; font-weight: 500;">${new Date(transaction.closing_date).toLocaleDateString()}</td>
      </tr>
      ` : ''}
    </table>

    <div style="text-align: center; margin-top: 32px;">
      <a href="${appUrl}/dashboard/transactions/${transaction.id}" class="btn">View Transaction</a>
    </div>

    <div class="footer">
      <p>You're receiving this because you have deadline reminders enabled for this transaction.</p>
      <p>
        <a href="${appUrl}/dashboard/settings" style="color: #2563eb;">Manage notification preferences</a>
      </p>
      <p style="margin-top: 16px;">© ${new Date().getFullYear()} GravMap. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `

  const text = `
DEADLINE REMINDER: ${event.event_name}

Hi ${recipientName || 'there'},

This is a reminder that ${event.event_name} is due ${daysUntil === 0 ? 'today' : daysUntil === 1 ? 'tomorrow' : `in ${daysUntil} days`}.

EVENT DETAILS:
- Event: ${event.event_name}
- Date: ${new Date(event.event_date).toLocaleDateString('en-US', { 
  weekday: 'long', 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
})}
${event.description ? `- Notes: ${event.description}` : ''}

TRANSACTION:
- Property: ${transaction.property_address}
${transaction.purchase_price ? `- Purchase Price: $${transaction.purchase_price.toLocaleString()}` : ''}
${transaction.closing_date ? `- Closing Date: ${new Date(transaction.closing_date).toLocaleDateString()}` : ''}

View this transaction: ${appUrl}/dashboard/transactions/${transaction.id}

---
You're receiving this because you have deadline reminders enabled.
Manage preferences: ${appUrl}/dashboard/settings
© ${new Date().getFullYear()} GravMap
  `

  return { html, text }
}

// ============================================================================
// DAILY DIGEST EMAIL
// ============================================================================

export interface DailyDigestData {
  recipientName?: string
  upcomingEvents: Array<{
    transaction: Transaction
    event: TimelineEvent
    daysUntil: number
  }>
  overdueEvents: Array<{
    transaction: Transaction
    event: TimelineEvent
    daysPast: number
  }>
  appUrl: string
}

export function generateDailyDigestEmail(data: DailyDigestData): { html: string; text: string } {
  const { recipientName, upcomingEvents, overdueEvents, appUrl } = data

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Daily Deadline Digest</title>
  <style>${baseStyles}</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">🏠 GravMap</div>
      <p style="color: #6b7280; margin-top: 8px;">Daily Deadline Digest</p>
    </div>

    <p>Hi ${recipientName || 'there'},</p>
    <p>Here's your daily summary of upcoming and overdue deadlines.</p>

    ${overdueEvents.length > 0 ? `
    <h2 style="color: #dc2626; margin-top: 24px;">⚠️ Overdue (${overdueEvents.length})</h2>
    ${overdueEvents.map(({ transaction, event, daysPast }) => `
    <div class="event-item" style="border-left: 4px solid #ef4444;">
      <div class="event-date">📅 ${new Date(event.event_date).toLocaleDateString()}</div>
      <div class="event-name">${event.event_name}</div>
      <span class="days-badge days-urgent">${daysPast} day${daysPast !== 1 ? 's' : ''} overdue</span>
      <p style="color: #6b7280; font-size: 14px; margin-top: 8px;">
        📍 ${transaction.property_address}
      </p>
    </div>
    `).join('')}
    ` : ''}

    ${upcomingEvents.length > 0 ? `
    <h2 style="color: #2563eb; margin-top: 24px;">📅 Upcoming This Week (${upcomingEvents.length})</h2>
    ${upcomingEvents.map(({ transaction, event, daysUntil }) => {
      const urgencyClass = daysUntil <= 1 ? 'days-urgent' : daysUntil <= 3 ? 'days-soon' : 'days-normal'
      return `
    <div class="event-item">
      <div class="event-date">📅 ${new Date(event.event_date).toLocaleDateString()}</div>
      <div class="event-name">${event.event_name}</div>
      <span class="days-badge ${urgencyClass}">
        ${daysUntil === 0 ? 'Today' : daysUntil === 1 ? 'Tomorrow' : `${daysUntil} days`}
      </span>
      <p style="color: #6b7280; font-size: 14px; margin-top: 8px;">
        📍 ${transaction.property_address}
      </p>
    </div>
      `
    }).join('')}
    ` : ''}

    ${upcomingEvents.length === 0 && overdueEvents.length === 0 ? `
    <div class="alert alert-info">
      <strong>✅ All caught up!</strong><br>
      You have no upcoming or overdue deadlines. Great job staying on top of things!
    </div>
    ` : ''}

    <div style="text-align: center; margin-top: 32px;">
      <a href="${appUrl}/dashboard/transactions" class="btn">View All Transactions</a>
    </div>

    <div class="footer">
      <p>You're receiving this daily digest because you have notifications enabled.</p>
      <p>
        <a href="${appUrl}/dashboard/settings" style="color: #2563eb;">Manage notification preferences</a>
      </p>
      <p style="margin-top: 16px;">© ${new Date().getFullYear()} GravMap. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `

  const text = `
DAILY DEADLINE DIGEST

Hi ${recipientName || 'there'},

Here's your daily summary of upcoming and overdue deadlines.

${overdueEvents.length > 0 ? `
OVERDUE (${overdueEvents.length}):
${overdueEvents.map(({ transaction, event, daysPast }) => `
- ${event.event_name}
  Date: ${new Date(event.event_date).toLocaleDateString()}
  Status: ${daysPast} day${daysPast !== 1 ? 's' : ''} overdue
  Property: ${transaction.property_address}
`).join('')}
` : ''}

${upcomingEvents.length > 0 ? `
UPCOMING THIS WEEK (${upcomingEvents.length}):
${upcomingEvents.map(({ transaction, event, daysUntil }) => `
- ${event.event_name}
  Date: ${new Date(event.event_date).toLocaleDateString()}
  Status: ${daysUntil === 0 ? 'Today' : daysUntil === 1 ? 'Tomorrow' : `${daysUntil} days away`}
  Property: ${transaction.property_address}
`).join('')}
` : ''}

${upcomingEvents.length === 0 && overdueEvents.length === 0 ? `
All caught up! You have no upcoming or overdue deadlines.
` : ''}

View all transactions: ${appUrl}/dashboard/transactions

---
You're receiving this daily digest because you have notifications enabled.
Manage preferences: ${appUrl}/dashboard/settings
© ${new Date().getFullYear()} GravMap
  `

  return { html, text }
}

// ============================================================================
// CLIENT STATUS UPDATE EMAIL
// ============================================================================

export interface ClientStatusUpdateData {
  transaction: Transaction
  recipientName?: string
  recipientEmail: string
  senderName: string
  customMessage?: string
  upcomingEvents: TimelineEvent[]
  completedEvents: TimelineEvent[]
  appUrl: string
}

export function generateClientStatusUpdateEmail(data: ClientStatusUpdateData): { html: string; text: string } {
  const { 
    transaction, 
    recipientName, 
    recipientEmail,
    senderName, 
    customMessage,
    upcomingEvents, 
    completedEvents,
    // appUrl is included for future use (e.g., public transaction view links)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    appUrl 
  } = data

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Transaction Update: ${transaction.property_address}</title>
  <style>${baseStyles}</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">🏠 GravMap</div>
    </div>

    <p>Dear ${recipientName || 'Client'},</p>

    ${customMessage ? `
    <div style="background-color: #f3f4f6; padding: 16px; border-radius: 6px; margin: 24px 0;">
      ${customMessage.split('\n').map(line => `<p style="margin: 0 0 8px 0;">${line}</p>`).join('')}
    </div>
    ` : `
    <p>I wanted to provide you with an update on your transaction at ${transaction.property_address}.</p>
    `}

    <h2 style="margin-top: 24px; color: #1f2937;">Transaction Overview</h2>
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 8px 0; color: #6b7280;">Property:</td>
        <td style="padding: 8px 0; font-weight: 500;">${transaction.property_address}</td>
      </tr>
      ${transaction.purchase_price ? `
      <tr>
        <td style="padding: 8px 0; color: #6b7280;">Purchase Price:</td>
        <td style="padding: 8px 0; font-weight: 500;">$${transaction.purchase_price.toLocaleString()}</td>
      </tr>
      ` : ''}
      ${transaction.closing_date ? `
      <tr>
        <td style="padding: 8px 0; color: #6b7280;">Closing Date:</td>
        <td style="padding: 8px 0; font-weight: 500;">${new Date(transaction.closing_date).toLocaleDateString()}</td>
      </tr>
      ` : ''}
      <tr>
        <td style="padding: 8px 0; color: #6b7280;">Status:</td>
        <td style="padding: 8px 0; font-weight: 500; text-transform: capitalize;">${transaction.status}</td>
      </tr>
    </table>

    ${completedEvents.length > 0 ? `
    <h3 style="margin-top: 24px; color: #059669;">✅ Completed Milestones</h3>
    ${completedEvents.map(event => `
    <div class="event-item" style="border-left: 4px solid #10b981; opacity: 0.8;">
      <div class="event-name">${event.event_name}</div>
      <div class="event-date">Completed: ${new Date(event.event_date).toLocaleDateString()}</div>
    </div>
    `).join('')}
    ` : ''}

    ${upcomingEvents.length > 0 ? `
    <h3 style="margin-top: 24px; color: #2563eb;">📅 Upcoming Milestones</h3>
    ${upcomingEvents.map(event => {
      const daysUntil = Math.ceil((new Date(event.event_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
      const urgencyClass = daysUntil <= 3 ? 'days-soon' : 'days-normal'
      return `
    <div class="event-item">
      <div class="event-date">📅 ${new Date(event.event_date).toLocaleDateString()}</div>
      <div class="event-name">${event.event_name}</div>
      ${daysUntil > 0 ? `<span class="days-badge ${urgencyClass}">${daysUntil} days away</span>` : ''}
    </div>
      `
    }).join('')}
    ` : ''}

    <p style="margin-top: 24px; color: #4b5563;">
      If you have any questions or need any additional information, please don't hesitate to reach out.
    </p>

    <p style="margin-top: 16px;">
      Best regards,<br>
      <strong>${senderName}</strong>
    </p>

    <div class="footer">
      <p>This email was sent to ${recipientEmail}</p>
      <p style="margin-top: 16px;">© ${new Date().getFullYear()} GravMap. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `

  const text = `
TRANSACTION UPDATE: ${transaction.property_address}

Dear ${recipientName || 'Client'},

${customMessage || `I wanted to provide you with an update on your transaction at ${transaction.property_address}.`}

TRANSACTION OVERVIEW:
- Property: ${transaction.property_address}
${transaction.purchase_price ? `- Purchase Price: $${transaction.purchase_price.toLocaleString()}` : ''}
${transaction.closing_date ? `- Closing Date: ${new Date(transaction.closing_date).toLocaleDateString()}` : ''}
- Status: ${transaction.status}

${completedEvents.length > 0 ? `
COMPLETED MILESTONES:
${completedEvents.map(event => `- ${event.event_name} (Completed: ${new Date(event.event_date).toLocaleDateString()})`).join('\n')}
` : ''}

${upcomingEvents.length > 0 ? `
UPCOMING MILESTONES:
${upcomingEvents.map(event => {
  const daysUntil = Math.ceil((new Date(event.event_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  return `- ${event.event_name} (${new Date(event.event_date).toLocaleDateString()}${daysUntil > 0 ? ` - ${daysUntil} days away` : ''})`
}).join('\n')}
` : ''}

If you have any questions, please don't hesitate to reach out.

Best regards,
${senderName}

---
This email was sent to ${recipientEmail}
© ${new Date().getFullYear()} GravMap
  `

  return { html, text }
}
