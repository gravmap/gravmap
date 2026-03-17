import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const articles: Record<string, { title: string; content: string }> = {
  "getting-started": {
    title: "Getting Started with GravMap",
    content: `
## Welcome to GravMap!

GravMap is your intelligent real estate transaction management platform. Here's how to get started:

### 1. Create Your Account
- Sign up with your email address
- Check your email for a confirmation link
- Complete your profile with your name and company info

### 2. Set Up Your Preferences
- Configure your notification settings
- Set your timezone for accurate deadline tracking
- Add your default reminder preferences (7, 3, 1 days before deadlines)

### 3. Create Your First Transaction
- Click "New Transaction" from your dashboard
- Upload your contract document (PDF, DOCX, or images)
- Our AI will extract all the important dates and details

### 4. Review and Confirm
- Review the extracted information
- Make any necessary edits
- Confirm to generate your timeline

### 5. Stay on Track
- View your timeline in the transaction details
- Enable email reminders
- Update event statuses as you complete tasks

That's it! You're ready to start managing your transactions more efficiently.

### Need Help?
- Check out our other help articles
- Contact support at support@gravmap.com
- Use the in-app chat for quick questions
    `,
  },
  "uploading-first-contract": {
    title: "Uploading Your First Contract",
    content: `
## How to Upload Your First Contract

### Step 1: Navigate to New Transaction
1. From your dashboard, click the "New Transaction" button
2. Or navigate to Transactions → New Transaction

### Step 2: Fill in Basic Information
- **Transaction Name**: Give it a descriptive name (e.g., "123 Main St - Smith Purchase")
- **Property Address**: The property address
- **Client Name**: Your client's name
- **Transaction Type**: Purchase, Sale, Lease, etc.

### Step 3: Upload Your Document
- Click the upload area or drag and drop your file
- Supported formats: PDF, DOCX, DOC, Images (JPG, PNG)
- Maximum file size: 10MB
- The document can be digital or scanned

### Step 4: AI Extraction
- Our AI will analyze your document
- It identifies:
  - Important dates (closing, inspection, financing deadlines)
  - Parties involved (buyer, seller, agents)
  - Property details
  - Contingencies and conditions
- This usually takes 10-30 seconds

### Step 5: Review and Confirm
- Carefully review all extracted information
- Edit any fields if needed
- Add any missing dates manually
- Click "Confirm" to save

### Step 6: Timeline Generation
- Your timeline is automatically generated
- All deadlines are calculated
- Status indicators show upcoming, overdue, and completed items

### Tips for Best Results
- Use clear, legible documents
- Ensure the contract is complete (all pages included)
- Standard contract formats work best
- Review extracted data carefully - AI isn't perfect!

### Sample Contract
Want to try without a real contract? Use our sample contract feature to see how it works with mock data.
    `,
  },
  "understanding-ai-extraction": {
    title: "Understanding AI Extraction",
    content: `
## How AI Extraction Works

GravMap uses advanced AI to automatically extract information from your contracts, saving you hours of manual data entry.

### What Gets Extracted

#### Dates and Deadlines
- **Closing Date**: The target closing date
- **Inspection Period**: Deadline for inspections
- **Financing Contingency**: Deadline for securing financing
- **Appraisal Deadline**: When appraisal must be completed
- **Title Search**: Title work deadline
- **Other Contingencies**: Any date-specific conditions

#### Parties
- Buyer names and contact info
- Seller names and contact info
- Listing agent
- Buyer's agent
- Title company
- Lender information

#### Property Details
- Property address
- Legal description
- Parcel number
- Property type

#### Financial Terms
- Purchase price
- Earnest money amount
- Down payment
- Loan amount

### How It Works

1. **Document Analysis**: The AI reads your document, understanding layout and structure
2. **Entity Recognition**: It identifies key information (dates, names, amounts)
3. **Context Understanding**: It understands the context (e.g., "closing" vs "inspection")
4. **Extraction**: Relevant data is extracted and categorized
5. **Validation**: Data is formatted and validated

### Accuracy

- **Standard Contracts**: 95%+ accuracy for common contract formats
- **Custom Contracts**: 85-90% accuracy
- **Scanned Documents**: 80-85% accuracy (depends on scan quality)

### Always Review!

AI is powerful but not perfect. **Always review extracted data carefully** before confirming. You can:
- Edit any field
- Add missing dates
- Remove incorrect entries
- Add notes or comments

### Tips for Better Extraction

1. **Use Clear Documents**
   - High resolution scans (300 DPI+)
   - No shadows or blur
   - All pages included

2. **Standard Formats Work Best**
   - Standard purchase agreements
   - Commonly used contract templates

3. **Complete Documents**
   - Include all pages
   - Include all addendums

4. **Review Carefully**
   - Check all dates
   - Verify party names
   - Confirm amounts

### Privacy & Security

Your documents are:
- Encrypted during upload (HTTPS)
- Encrypted at rest (AES-256)
- Never shared with third parties
- Processed in secure, isolated environments
- Automatically deleted after extraction (optional)
    `,
  },
  "managing-timeline": {
    title: "Managing Your Timeline",
    content: `
## Managing Your Timeline

Your timeline is the heart of GravMap - it shows all your important deadlines in one place.

### Timeline View

The timeline displays:
- **Event Name**: What needs to happen
- **Date**: When it's due
- **Status**: Upcoming, Overdue, Completed, or Cancelled
- **Days Remaining**: How many days until the deadline

### Status Indicators

#### 🔵 Upcoming
- Event is in the future
- Shows days remaining

#### 🔴 Overdue
- Deadline has passed
- Shows days overdue
- Highlighted in red for visibility

#### 🟢 Completed
- Task has been finished
- Marked with a checkmark

#### ⚫ Cancelled
- Event was cancelled
- No longer tracked

### Managing Events

#### Mark as Complete
1. Click on the event
2. Click "Mark as Complete"
3. The status updates and you get a completion badge

#### Edit an Event
1. Click on the event
2. Update the date or name
3. Save changes

#### Cancel an Event
1. Click on the event
2. Click "Cancel Event"
3. Confirm the cancellation

#### Add Notes
- Add notes to any event
- Useful for tracking status or next steps
- Notes are private (not shared with clients)

### Filtering

Use the filter dropdown to view:
- **All Events**: Everything
- **Upcoming**: Only future events
- **Overdue**: Only past-due items
- **Completed**: Only finished tasks

### Refreshing Status

Timeline statuses update automatically:
- Overdue status changes at midnight
- Click the "Refresh" button for immediate updates
- Dashboard shows overdue count in real-time

### Timeline Summary

At the top of your timeline:
- **Total Events**: All events for this transaction
- **Upcoming**: Future events count
- **Overdue**: Past-due count (highlighted if > 0)
- **Completed**: Finished tasks count

### Best Practices

1. **Check Daily**: Review your timeline every morning
2. **Update Promptly**: Mark tasks complete as soon as they're done
3. **Add Notes**: Document important details
4. **Set Reminders**: Enable email notifications
5. **Use Filters**: Focus on what matters (e.g., overdue items)

### Regenerating Timeline

Need to regenerate? 
1. Go to transaction details
2. Click "Regenerate Timeline"
3. All events will be recalculated from extraction data
4. Manual edits will be preserved (optional)

This is useful if you edited extraction data and want to update the timeline.
    `,
  },
  "setting-up-notifications": {
    title: "Setting Up Notifications",
    content: `
## Setting Up Notifications

Never miss a deadline with GravMap's intelligent notification system.

### Email Reminders

#### How They Work
- Automatic reminders for all deadline events
- Sent at configurable intervals before each deadline
- Includes event details and quick links

#### Default Schedule
- **7 Days Before**: Early warning
- **3 Days Before**: Getting close
- **1 Day Before**: Urgent - act now!

#### Customization
You can customize your reminder schedule in Settings:
1. Go to Dashboard → Settings
2. Find "Notification Preferences"
3. Choose which days to receive reminders
4. Options: 14, 7, 5, 3, 2, 1 days before

### Daily Digest

#### What It Includes
- **Overdue Items**: Highlighted at the top
- **Upcoming Items**: Next 7 days
- **Summary Stats**: Quick overview

#### How to Enable
1. Go to Settings
2. Enable "Daily Digest"
3. Set your preferred time (default: 9:00 AM)

### Weekly Summary

A weekly overview of all your transactions:
- Sent every Monday morning
- Shows all upcoming deadlines for the week
- Includes overdue items from last week

### Notification Types

#### Deadline Reminders ✉️
- Individual reminders for each event
- Customizable timing
- Includes transaction and event details

#### Daily Digest 📊
- One email with all upcoming items
- Sent at your preferred time
- Great for daily planning

#### Weekly Summary 📅
- Week overview every Monday
- All transactions combined
- Strategic planning view

#### Product Updates 🆕
- New features and improvements
- Tips and best practices
- Unsubscribe anytime

### Managing Preferences

Go to **Dashboard → Settings → Notifications**:

- **Email Reminders**: On/Off
- **SMS Notifications**: On/Off (coming soon)
- **Daily Digest**: On/Off
- **Weekly Digest**: On/Off
- **Reminder Days**: Select which days
- **Digest Time**: Set your preferred time

### SMS Notifications (Coming Soon)

We're working on SMS notifications for:
- Urgent deadline alerts
- Overdue item warnings
- Same-day reminders

Stay tuned for this feature!

### Best Practices

1. **Enable Daily Digest**: Great for morning routine
2. **Use Multiple Reminder Days**: 7, 3, 1 works well
3. **Check Settings Regularly**: Ensure notifications fit your workflow
4. **Add Mobile Email**: Send to your phone for urgency
5. **Weekly Review**: Use Monday summary to plan your week

### Troubleshooting

#### Not Receiving Emails?
1. Check spam/junk folder
2. Add support@gravmap.com to contacts
3. Verify email address in settings
4. Check notification preferences are enabled

#### Too Many Emails?
1. Reduce reminder days (e.g., just 3 and 1)
2. Disable daily digest
3. Use weekly summary instead
4. Focus on overdue alerts only

#### Want Different Timing?
1. Go to notification settings
2. Customize reminder days
3. Set your preferred digest time
4. Save changes
    `,
  },
  "adding-team-members": {
    title: "Adding Team Members",
    content: `
## Adding Team Members (Coming Soon)

Collaborate with your team on transactions with shared access and real-time updates.

### Team Features (Planned)

#### Shared Transactions
- Invite team members to transactions
- Grant view or edit access
- Real-time collaboration

#### Role-Based Access
- **Admin**: Full access, can manage team
- **Editor**: Can edit transaction details
- **Viewer**: Read-only access

#### Activity Feed
- See who made what changes
- Track updates in real-time
- Comment on events

### Current Workaround

While team features are in development, here are alternatives:

#### Option 1: Share Transaction Link
Each transaction has a unique shareable link:
1. Go to transaction details
2. Click "Share"
3. Copy the link
4. Send to team member

Note: This provides view-only access for now.

#### Option 2: Export Timeline
Export your timeline to share:
1. Go to transaction
2. Click "Export Timeline"
3. Choose PDF or CSV format
4. Share with team

#### Option 3: Client Status Updates
Send updates to clients:
1. Go to transaction
2. Click "Send Status Update"
3. Compose your message
4. Email sent with timeline summary

### Coming Soon

We're actively building team collaboration features:

**Q2 2026**:
- Team invites and roles
- Shared transaction access
- Activity feed

**Q3 2026**:
- Comments and mentions
- Task assignments
- Team calendar view

**Q4 2026**:
- External collaborator access
- Client portal
- White-label options

### Stay Updated

Want to know when team features launch?
1. Enable "Product Updates" in notification settings
2. Follow our changelog
3. Contact support for early access

### Pricing

Team features will be available on:
- **Pro Plan**: Up to 5 team members
- **Enterprise**: Unlimited team members

Current subscribers will get early access at no additional cost.

### Feedback

Have ideas for team features? We'd love to hear them!
- Email: support@gravmap.com
- In-app chat
- Feature request form in settings
    `,
  },
  "billing-subscription": {
    title: "Billing & Subscription",
    content: `
## Billing & Subscription

Manage your GravMap subscription, view invoices, and upgrade your plan.

### Current Plans

#### Free Plan
- **Price**: $0/month
- **Transactions**: 3 active
- **Storage**: 50MB
- **Features**:
  - AI extraction
  - Timeline tracking
  - Email reminders
  - Basic support

#### Pro Plan
- **Price**: $29/month
- **Transactions**: Unlimited
- **Storage**: 10GB
- **Features**:
  - Everything in Free
  - Daily digest emails
  - Priority support
  - Export to PDF/CSV
  - Custom reminder schedules

#### Enterprise (Coming Soon)
- **Price**: Custom
- **Transactions**: Unlimited
- **Storage**: Unlimited
- **Features**:
  - Everything in Pro
  - Team collaboration
  - White-label options
  - API access
  - Dedicated support

### Managing Your Subscription

#### View Current Plan
1. Go to Dashboard → Settings → Billing
2. See your current plan and usage
3. View next billing date

#### Upgrade to Pro
1. Go to Settings → Billing
2. Click "Upgrade to Pro"
3. Enter payment details (Stripe)
4. Instant activation

#### Downgrade
1. Go to Settings → Billing
2. Click "Downgrade"
3. Effective at end of billing period
4. Data retained for 30 days

### Payment Methods

We use **Stripe** for secure payment processing:
- All major credit cards accepted
- Bank transfers (Enterprise)
- Invoices (annual plans)
- PCI compliant
- Your payment info is never stored on our servers

### Invoices

#### View Invoices
1. Go to Settings → Billing
2. Click "View Invoices"
3. Download PDF invoices

#### Update Billing Info
1. Go to Settings → Billing
2. Click "Update Billing Information"
3. Update company name, address, tax ID
4. Future invoices will reflect changes

### Refund Policy

- **Within 7 days**: Full refund, no questions asked
- **Within 30 days**: Prorated refund
- **After 30 days**: No refund (cancel anytime)

Contact support@gravmap.com for refund requests.

### Trial Period

New users get:
- **14-day free trial** of Pro features
- No credit card required
- Automatic downgrade to Free after trial
- All data preserved

### Frequently Asked Questions

#### Can I cancel anytime?
Yes! Cancel anytime from Settings → Billing. You'll retain access until the end of your billing period.

#### What happens to my data if I cancel?
- Free plan: Data retained indefinitely
- Downgraded from Pro: Data retained for 30 days
- Export your data before downgrading

#### Do you offer annual plans?
Coming soon! Annual plans will include a 20% discount.

#### Can I switch plans mid-month?
Yes! Upgrades are instant. Downgrades take effect at the end of your billing period.

#### Is there a non-profit discount?
Yes! Contact support@gravmap.com with your 501(c)(3) documentation for a 50% discount.

### Billing Support

Having billing issues?
- Email: billing@gravmap.com
- In-app chat
- Response time: < 24 hours
    `,
  },
  "troubleshooting": {
    title: "Troubleshooting Common Issues",
    content: `
## Troubleshooting Common Issues

Find solutions to common problems and learn how to get help.

### Login & Account Issues

#### Can't Log In
**Symptoms**: Password doesn't work, "Invalid credentials" error

**Solutions**:
1. Check for typos in email/password
2. Use "Forgot Password" to reset
3. Check email for password reset link
4. Check spam/junk folder
5. Clear browser cache
6. Try a different browser

#### Didn't Receive Verification Email
**Solutions**:
1. Check spam/junk folder
2. Add support@gravmap.com to contacts
3. Click "Resend verification email"
4. Wait 5-10 minutes
5. Contact support if still not received

#### Account Locked
**Symptoms**: "Account locked" message after multiple failed logins

**Solutions**:
1. Wait 30 minutes for automatic unlock
2. Use "Forgot Password" to reset
3. Contact support for immediate unlock

### Upload Issues

#### Upload Fails
**Symptoms**: "Upload failed" error, file doesn't upload

**Solutions**:
1. Check file size (max 10MB)
2. Check file format (PDF, DOCX, JPG, PNG)
3. Try a different browser
4. Clear browser cache
5. Check internet connection
6. Try a smaller file
7. Refresh page and try again

#### Upload Takes Too Long
**Solutions**:
1. Check file size (larger files take longer)
2. Check internet speed
3. Try during off-peak hours
4. Compress PDF if possible
5. Use a wired connection

#### Document Not Displaying
**Solutions**:
1. Refresh the page
2. Clear browser cache
3. Try a different browser
4. Check if file is corrupted
5. Re-upload the document

### Extraction Issues

#### Extraction Fails
**Symptoms**: "Extraction failed" error, no data extracted

**Solutions**:
1. Check document is complete (all pages)
2. Ensure document is legible
3. Try a clearer scan
4. Use a standard contract format
5. Contact support with document sample

#### Wrong Data Extracted
**Symptoms**: Dates or names are incorrect

**Solutions**:
1. **This is normal** - AI isn't perfect!
2. Review and edit extracted data
3. Make corrections before confirming
4. Add missing information manually
5. Report systematic errors to support

#### Missing Information
**Symptoms**: Important dates or details not extracted

**Solutions**:
1. Review document quality
2. Check if information is in document
3. Add missing data manually
4. Future extractions may improve

### Timeline Issues

#### Timeline Not Generated
**Solutions**:
1. Confirm transaction data first
2. Click "Generate Timeline" button
3. Check extraction data is saved
4. Refresh the page
5. Contact support if persists

#### Wrong Dates in Timeline
**Solutions**:
1. Edit the transaction extraction data
2. Regenerate timeline
3. Or edit individual timeline events
4. Save changes

#### Status Not Updating
**Symptoms**: Overdue items still showing as upcoming

**Solutions**:
1. Click "Refresh" button on timeline
2. Wait for daily update (midnight)
3. Hard refresh page (Ctrl+Shift+R)
4. Clear browser cache

### Notification Issues

#### Not Receiving Emails
**Solutions**:
1. Check spam/junk folder
2. Verify email address in settings
3. Check notification preferences are enabled
4. Add support@gravmap.com to contacts
5. Try a different email address
6. Contact support

#### Too Many Emails
**Solutions**:
1. Adjust notification settings
2. Reduce reminder frequency
3. Disable daily digest
4. Use weekly summary only

### Billing Issues

#### Payment Declined
**Solutions**:
1. Check card details are correct
2. Try a different card
3. Contact your bank
4. Use incognito/private browsing mode
5. Try a different browser

#### Can't Access Pro Features
**Solutions**:
1. Verify subscription is active
2. Check billing history
3. Log out and log back in
4. Clear browser cache
5. Contact support

### Performance Issues

#### App Running Slowly
**Solutions**:
1. Check internet connection
2. Clear browser cache
3. Close unnecessary tabs
4. Try a different browser
5. Disable browser extensions
6. Update browser to latest version

#### Page Not Loading
**Solutions**:
1. Check internet connection
2. Try a different browser
3. Clear browser cache
4. Disable ad blockers
5. Check our status page (coming soon)

### Getting Help

#### In-App Chat
- Click the chat bubble in bottom right
- Available 9 AM - 6 PM EST, Mon-Fri
- Response time: < 2 hours

#### Email Support
- support@gravmap.com
- Response time: < 24 hours
- Include screenshots and error messages

#### Knowledge Base
- Check other help articles
- FAQ section
- Video tutorials (coming soon)

#### Before Contacting Support
Please have ready:
1. Your account email
2. Transaction ID (if applicable)
3. Screenshots of the issue
4. Error messages (exact text)
5. Browser and device info
6. Steps to reproduce

This helps us solve your issue faster!

### Known Issues

Check our status page (coming soon) for:
- System outages
- Scheduled maintenance
- Feature degradations
- Resolution timeline
    `,
  },
};

export async function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = articles[params.slug];
  if (!article) return { title: "Article Not Found" };
  
  return {
    title: `${article.title} - GravMap Help`,
  };
}

export default function HelpArticlePage({ params }: { params: { slug: string } }) {
  const article = articles[params.slug];

  if (!article) {
    notFound();
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Link href="/help" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Help Center
          </Link>

          <h1 className="text-4xl font-bold mb-8">{article.title}</h1>

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            {article.content.split('\n').map((line, idx) => {
              if (line.startsWith('## ')) {
                return <h2 key={idx} className="text-2xl font-bold mt-8 mb-4">{line.replace('## ', '')}</h2>;
              } else if (line.startsWith('### ')) {
                return <h3 key={idx} className="text-xl font-semibold mt-6 mb-3">{line.replace('### ', '')}</h3>;
              } else if (line.startsWith('#### ')) {
                return <h4 key={idx} className="text-lg font-medium mt-4 mb-2">{line.replace('#### ', '')}</h4>;
              } else if (line.startsWith('- ')) {
                return <li key={idx} className="ml-6 mb-1">{line.replace('- ', '')}</li>;
              } else if (line.match(/^\d+\.\s/)) {
                return <li key={idx} className="ml-6 mb-1 list-decimal">{line.replace(/^\d+\.\s/, '')}</li>;
              } else if (line.startsWith('**') && line.endsWith('**')) {
                return <p key={idx} className="font-semibold mt-4 mb-2">{line.replace(/\*\*/g, '')}</p>;
              } else if (line.trim() === '') {
                return <br key={idx} />;
              } else {
                return <p key={idx} className="mb-3">{line}</p>;
              }
            })}
          </div>

          <div className="mt-12 pt-8 border-t">
            <h3 className="text-lg font-semibold mb-4">Still Need Help?</h3>
            <div className="flex gap-4">
              <a href="mailto:support@gravmap.com">
                <Button>Contact Support</Button>
              </a>
              <Link href="/help">
                <Button variant="outline">Browse All Articles</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
