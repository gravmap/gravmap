# GravMap

**AI-Powered Real Estate Transaction Management Platform**

Never miss a deadline again. Upload your contracts and let AI extract all the important dates. Track deadlines, get reminders, and close deals on time.

![GravMap Preview](./preview.png)

## 🚀 Features

- **🤖 AI Contract Extraction** - Upload PDFs and automatically extract dates, parties, and deadlines
- **📅 Smart Timeline Tracking** - Visual timeline of all your transaction deadlines
- **🔔 Intelligent Reminders** - Email reminders at 7, 3, and 1 day before deadlines
- **📊 Dashboard Overview** - See all your transactions and upcoming deadlines at a glance
- **👥 Team Collaboration** - Share transactions with team members (coming soon)
- **📱 Mobile Responsive** - Works great on desktop and mobile devices
- **🌙 Dark Mode** - Easy on the eyes
- **🔒 Secure** - Row-level security, encrypted storage, secure authentication

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, Server Actions
- **Database**: Supabase (PostgreSQL with Row Level Security)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **AI**: OpenAI GPT-4 Vision for document extraction
- **Payments**: Stripe (subscriptions + one-time)
- **Email**: Resend
- **Deployment**: Vercel

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js 18+ and npm
- A Supabase account (free tier works)
- An OpenAI API key
- A Stripe account (test mode for development)
- (Optional) A Resend account for emails

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/gravmap.git
cd gravmap
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your values:

```bash
# Database
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# AI
OPENAI_API_KEY=sk-proj-xxxxx

# Payments
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=your_stripe_key_here
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# Email (Optional)
RESEND_API_KEY=re_xxxxx
EMAIL_FROM=noreply@yourdomain.com

# Cron
CRON_SECRET=your-random-secret-here
```

### 4. Set Up Database

#### Option A: Using Supabase CLI

```bash
npm install -g supabase
supabase login
supabase link --project-ref your-project-ref
supabase db push
```

#### Option B: Manual Migration

1. Go to Supabase Dashboard → SQL Editor
2. Run the SQL from `supabase/migrations/` files

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🌍 Environment Variables

### Required

| Variable | Description | Where to Get |
|----------|-------------|--------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Supabase Dashboard → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key | Supabase Dashboard → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Supabase Dashboard → Settings → API |
| `OPENAI_API_KEY` | OpenAI API key | [platform.openai.com](https://platform.openai.com) |

### Payment (Required for Billing)

| Variable | Description | Where to Get |
|----------|-------------|--------------|
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | Stripe Dashboard → Developers → API Keys |
| `STRIPE_SECRET_KEY` | Stripe secret key | Stripe Dashboard → Developers → API Keys |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret | Stripe Dashboard → Developers → Webhooks |

### Optional

| Variable | Description | Where to Get |
|----------|-------------|--------------|
| `RESEND_API_KEY` | Resend API key for emails | [resend.com](https://resend.com) |
| `EMAIL_FROM` | Sender email address | Your domain email |
| `CRON_SECRET` | Secret for cron job authorization | Generate random string |
| `NEXT_PUBLIC_CRISP_WEBSITE_ID` | Crisp chat website ID | [crisp.chat](https://crisp.chat) |

## 📚 Documentation

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Complete deployment guide for Vercel
- **[SETUP.md](./SETUP.md)** - Detailed setup instructions
- **[STRIPE_SETUP.md](./STRIPE_SETUP.md)** - Stripe integration guide
- **[docs/EMAIL_NOTIFICATIONS.md](./docs/EMAIL_NOTIFICATIONS.md)** - Email setup guide
- **[docs/SUPPORT_INTEGRATION.md](./docs/SUPPORT_INTEGRATION.md)** - Support chat integration

## 🧪 Testing

### Manual Testing Checklist

See [TESTING.md](./TESTING.md) for a comprehensive testing checklist.

### Key Flows to Test

1. **Authentication**
   - [ ] Signup with email
   - [ ] Email verification
   - [ ] Login
   - [ ] Password reset
   - [ ] Logout

2. **Transactions**
   - [ ] Create new transaction
   - [ ] Upload document
   - [ ] AI extraction
   - [ ] Review and confirm
   - [ ] View timeline

3. **Billing**
   - [ ] View pricing page
   - [ ] Checkout (test mode)
   - [ ] Access Pro features
   - [ ] Manage subscription

4. **Notifications**
   - [ ] Email reminders
   - [ ] Daily digest
   - [ ] Notification preferences

## 🚢 Deployment

### Deploy to Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/gravmap)

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

### Manual Deployment

```bash
# Build
npm run build

# Start production server
npm run start
```

## 📁 Project Structure

```
gravmap/
├── src/
│   ├── app/                 # Next.js app router pages
│   │   ├── api/            # API routes
│   │   ├── auth/           # Auth pages (login, signup)
│   │   ├── dashboard/      # Dashboard pages
│   │   ├── help/           # Help center
│   │   ├── onboarding/     # Onboarding flow
│   │   └── pricing/        # Pricing page
│   ├── components/         # React components
│   │   ├── ui/            # UI primitives (shadcn)
│   │   ├── layout/        # Layout components
│   │   └── ...            # Feature components
│   └── lib/               # Utilities and clients
│       ├── auth/          # Auth utilities
│       ├── email/         # Email client and templates
│       └── openai/        # OpenAI client
├── supabase/
│   └── migrations/        # Database migrations
├── docs/                  # Documentation
└── public/               # Static files
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Supabase](https://supabase.com/) - Open Source Firebase Alternative
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI Components
- [OpenAI](https://openai.com/) - AI for document extraction
- [Stripe](https://stripe.com/) - Payments infrastructure
- [Vercel](https://vercel.com/) - Deployment platform

## 📧 Support

- **Documentation**: [gravmap.com/help](https://gravmap.com/help)
- **Email**: support@gravmap.com
- **Issues**: [GitHub Issues](https://github.com/yourusername/gravmap/issues)

---

Built with ❤️ for real estate professionals
