# Demo Walkthrough

**Detailed User Flow from Signup to Value**

---

## Purpose

Since we can't deploy yet, this document describes the complete user experience. Use this to:

1. Walk through during customer interviews
2. Identify friction points before building
3. Create clickable prototypes
4. Train team on user journey
5. Test with stakeholders

---

## The Core Promise

**"Upload a contract. AI handles the rest."**

User should see value within 5 minutes:
1. Upload contract (30 seconds)
2. Watch AI extract data (30 seconds)
3. See auto-generated timeline (30 seconds)
4. Understand "This just saved me 30 minutes"

---

## Journey Overview

```
Landing Page → Signup → Onboarding → Upload → Extraction Review → 
Timeline View → Client Update → Dashboard → Daily Use
```

**Critical Moments (where users might drop off):**
1. Landing page (does value prop resonate?)
2. Signup form (is friction too high?)
3. First upload (is it intuitive?)
4. Extraction review (do they trust AI?)
5. First value (is timeline useful?)

---

## Screen-by-Screen Walkthrough

### Screen 1: Landing Page

**URL:** gravmap.com (or similar)

**What User Sees:**

```
┌─────────────────────────────────────────────────────────────────┐
│  🏠 GRAVMAP                        [Login] [Start Free Trial]   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│        Stop Managing Tools.                                     │
│        Start Closing Deals.                                     │
│                                                                 │
│        Your AI Transaction Coordinator.                         │
│        Never miss a deadline again.                             │
│                                                                 │
│        [Start Free Trial - No Credit Card Required]             │
│                                                                 │
│        ┌───────────────────────────────────────────────────┐   │
│        │  [Demo Video: 60-second walkthrough]              │   │
│        │   Shows: Upload → Extract → Timeline → Reminder   │   │
│        └───────────────────────────────────────────────────┘   │
│                                                                 │
│  HOW IT WORKS:                                                  │
│                                                                 │
│  1️⃣ Upload Contract      2️⃣ AI Extracts Data                 │
│     [Drag & drop PDF]      →   [Closing date, contingencies]   │
│                                                                 │
│  3️⃣ Auto Timeline        4️⃣ Smart Reminders                  │
│     [Visual deadline view] →   [Email alerts before due]       │
│                                                                 │
│  🎯 FOR REAL ESTATE TEAMS                                       │
│  "Saved our team 10 hours per week" - Sarah K, Austin TX       │
│                                                                 │
│  PRICING:                                                       │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐           │
│  │ Starter      │ │ Professional │ │ Team         │           │
│  │ $49/mo       │ │ $99/mo       │ │ $199/mo      │           │
│  │ 15 trans     │ │ Unlimited    │ │ Unlimited    │           │
│  │ 1 user       │ │ 3 users      │ │ 10 users     │           │
│  │ [Start]      │ │ [Start]      │ │ [Start]      │           │
│  └──────────────┘ └──────────────┘ └──────────────┘           │
│                                                                 │
│  ✅ 14-day free trial  ✅ No credit card  ✅ Cancel anytime    │
│                                                                 │
│  Footer: Product | Pricing | Blog | Support | Terms            │
└─────────────────────────────────────────────────────────────────┘
```

**User Thoughts:**
- "This looks like it solves my problem"
- "AI transaction coordinator... hmm, interesting"
- "Free trial, no credit card... okay I'll try it"

**Critical Success Factors:**
- Value prop clear in 5 seconds
- Demo video shows the "magic" quickly
- Trust signals (testimonials, pricing transparent)
- Low-friction CTA

**Drop-off Risk: HIGH**
- If headline doesn't resonate, they bounce
- If video is boring, they leave
- If CTA feels risky, they hesitate

**What We're Testing:**
- Can they explain what the product does after 30 seconds?
- Do they click the CTA?
- What questions do they have?

---

### Screen 2: Signup Flow

**Trigger:** Click "Start Free Trial"

**What User Sees:**

```
┌─────────────────────────────────────────────────────────────────┐
│  Create Your Free Account                                       │
│                                                                 │
│  [Google Logo] Continue with Google                             │
│                                                                 │
│  ──────────────── or ─────────────────────                      │
│                                                                 │
│  Email: [                                    ]                  │
│  Password: [                                ]                  │
│                                                                 │
│  [Create Account]                                               │
│                                                                 │
│  By signing up, you agree to our Terms of Service               │
│  and Privacy Policy.                                            │
│                                                                 │
│  Already have an account? [Log in]                              │
│                                                                 │
│  ✅ 14-day free trial                                           │
│  ✅ No credit card required                                     │
│  ✅ Cancel anytime                                              │
└─────────────────────────────────────────────────────────────────┘
```

**After Google OAuth or Email Signup:**

```
┌─────────────────────────────────────────────────────────────────┐
│  Welcome to Gravmap! 🎉                                         │
│                                                                 │
│  Just a few quick questions to personalize your experience:     │
│                                                                 │
│  Your Name: [                                              ]   │
│  Company/Team Name: [                                      ]   │
│  How many transactions do you close per year?                   │
│  ○ <15 (Solo agent)                                             │
│  ○ 15-50 (Producing agent)                                      │
│  ● 50-200 (Team)                                                │
│  ○ 200+ (High-volume team)                                      │
│                                                                 │
│  What's your biggest challenge with transactions?               │
│  ☑ Missed deadlines                                             │
│  ☑ Paperwork overload                                           │
│  □ Client communication                                         │
│  □ Team coordination                                            │
│  □ Other: [                                         ]           │
│                                                                 │
│  [Get Started →]                                                │
└─────────────────────────────────────────────────────────────────┘
```

**User Thoughts:**
- "This is quick, not a huge form"
- "They're asking about my actual problems"
- "Okay, let's see what this does"

**Critical Success Factors:**
- <2 minutes to complete
- Minimal required fields
- Personalization feels relevant, not creepy

**Drop-off Risk: MEDIUM**
- If form is too long, they quit
- If questions feel intrusive, they bail

---

### Screen 3: Onboarding - First Transaction

**Trigger:** Click "Get Started"

**What User Sees:**

```
┌─────────────────────────────────────────────────────────────────┐
│  Let's Add Your First Transaction                    [? Help]   │
│                                                                 │
│  Step 1 of 3: Upload Contract                                   │
│  ──────●─────────────────────────────────────────────────       │
│                                                                 │
│  This is where the magic happens. Upload a contract and         │
│  our AI will automatically extract all the important details.   │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                                                           │ │
│  │        📄 Drag & drop your contract here                 │ │
│  │           or click to browse                             │ │
│  │                                                           │ │
│  │           Supports: PDF (up to 10MB)                     │ │
│  │                                                           │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  💡 Tip: Use a real contract for best results. Your data is     │
│     encrypted and never shared. [Learn more]                    │
│                                                                 │
│  Don't have a contract handy? [Use sample contract]             │
│                                                                 │
│  [Skip for now] [Upload Contract →]                             │
└─────────────────────────────────────────────────────────────────┘
```

**User Uploads Contract:**

```
┌─────────────────────────────────────────────────────────────────┐
│  Step 2 of 3: AI Extraction in Progress...                      │
│  ─────────────●────────────────────────────────────────────     │
│                                                                 │
│  📄 123 Main Street Contract.pdf                                │
│                                                                 │
│  ████████████████████░░░░░░░░░░░░░░░░░░░ 52%                   │
│                                                                 │
│  🔍 Analyzing document structure...                             │
│  ✅ Found closing date                                         │
│  ✅ Found inspection contingency                               │
│  🔄 Extracting buyer/seller info...                            │
│  ⏳ Identifying contingencies...                               │
│                                                                 │
│  This usually takes 10-20 seconds                              │
│                                                                 │
│  💡 While you wait: 83% of agents miss at least one deadline    │
│     per month. Gravmap makes sure you're in the 17%.            │
└─────────────────────────────────────────────────────────────────┘
```

**User Thoughts:**
- "Whoa, it's actually doing something"
- "I can see it finding the dates"
- "This is faster than me reading it"

**Critical Success Factors:**
- Upload is instant (no lag)
- Progress indicator is visible
- Feels like "magic" happening

**Drop-off Risk: LOW** (they're committed now)

---

### Screen 4: Extraction Review

**Trigger:** Extraction complete

**What User Sees:**

```
┌─────────────────────────────────────────────────────────────────┐
│  Step 3 of 3: Review & Confirm                                  │
│  ──────────────────●────────────────────────────────────        │
│                                                                 │
│  Great! I found everything. Please confirm these details:       │
│                                                                 │
│  📍 PROPERTY                                                    │
│  Address: 123 Main Street, Austin, TX 78701                     │
│  Purchase Price: $425,000                          [✓ 98%]     │
│                                                                 │
│  👥 PARTIES                                                     │
│  Buyer: John Smith & Jane Smith                                 │
│  Seller: Robert Johnson                                         │
│  Agent: Sarah Williams (Keller Williams)                        │
│                                                                 │
│  📅 KEY DATES                                                   │
│  Closing Date: April 15, 2026                     [✓ 99%]     │
│  Inspection Contingency: March 25, 2026           [✓ 95%]     │
│  Financing Contingency: April 1, 2026             [✓ 92%]     │
│  Appraisal Contingency: March 28, 2026            [✓ 90%]     │
│                                                                 │
│  [ confidence scores in green checkmarks ]                      │
│                                                                 │
│  ⚠️ 1 item needs attention:                                     │
│  • Earnest Money Amount: $4,250                   [? 75%]      │
│    [Edit]                                                       │
│                                                                 │
│  [← Upload Different] [← Edit All] [Looks Good! Create →]       │
└─────────────────────────────────────────────────────────────────┘
```

**User Clicks "Looks Good":**

```
┌─────────────────────────────────────────────────────────────────┐
│  🎉 Transaction Created!                                        │
│                                                                 │
│  123 Main Street                                                │
│  Closing: April 15, 2026 (28 days away)                        │
│                                                                 │
│  ✓ Timeline generated with 8 key dates                         │
│  ✓ Reminders scheduled for all deadlines                       │
│  ✓ Client email templates ready to send                        │
│                                                                 │
│  [View Timeline Now →]                                          │
└─────────────────────────────────────────────────────────────────┘
```

**User Thoughts:**
- "It got everything right!"
- "This would have taken me 20 minutes"
- "Okay, I'm impressed"

**Critical Success Factors:**
- >90% accuracy on key fields
- Confidence scores visible (builds trust)
- Easy to edit mistakes
- Quick confirmation

**Drop-off Risk: MEDIUM**
- If accuracy is bad, trust broken
- If too many fields to review, fatigue

---

### Screen 5: Timeline View

**Trigger:** Click "View Timeline Now"

**What User Sees:**

```
┌─────────────────────────────────────────────────────────────────┐
│  ← Back to Transactions    123 Main Street                      │
│                                                                 │
│  📊 TIMELINE                           Status: Active           │
│  Closing: April 15, 2026 (28 days)                             │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                                                           │ │
│  │  March 2026              April 2026                       │ │
│  │  S  M  T  W  T  F  S    S  M  T  W  T  F  S               │ │
│  │  1  2  3  4  5  6  7    1  2  3  4 [5] 6  7               │ │
│  │  8  9 10 11 12[13]14    8  9 10 11 12 13[14]              │ │
│  │ [15]16 17 18 19 20 21   [15]← Closing Day                 │ │
│  │ 22 23 24[25]26 27 28                                      │ │
│  │ 29 30[31]                                                 │ │
│  │                                                           │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  UPCOMING DEADLINES:                                            │
│                                                                 │
│  🔴 TODAY: Inspection Contingency - March 25                    │
│     [Mark Complete] [ Snooze ] [ Add to Calendar ]              │
│                                                                 │
│  🟡 3 Days: Appraisal Contingency - March 28                    │
│     [Mark Complete] [ Snooze ] [ Add to Calendar ]              │
│                                                                 │
│  🟡 6 Days: Financing Contingency - April 1                     │
│     [Mark Complete] [ Snooze ] [ Add to Calendar ]              │
│                                                                 │
│  ⚪ 20 Days: CLOSING DAY - April 15                             │
│     [Add to Calendar]                                           │
│                                                                 │
│  ────────────────────────────────────────────────────────────  │
│                                                                 │
│  [📄 Documents] [📧 Client Updates] [⚙ Settings]               │
└─────────────────────────────────────────────────────────────────┘
```

**User Thoughts:**
- "Oh wow, I can see everything at once"
- "Wait, the inspection is TODAY?!"
- "I would have missed that"

**Critical Success Factors:**
- Visual clarity (color coding, urgency)
- Actionable (can mark complete, add to calendar)
- Shows value immediately

**Drop-off Risk: LOW** (value is clear)

---

### Screen 6: Client Communication

**Trigger:** Click "Client Updates"

**What User Sees:**

```
┌─────────────────────────────────────────────────────────────────┐
│  ← Back to Timeline                                             │
│                                                                 │
│  📧 Client Status Update                                        │
│  Transaction: 123 Main Street                                   │
│                                                                 │
│  Send To: [john.smith@email.com]                    [Change]   │
│                                                                 │
│  AI-Generated Message (editable):                               │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ Subject: 123 Main Street Update - Inspection Complete    │ │
│  │                                                           │ │
│  │ Hi John and Jane,                                        │ │
│  │                                                           │ │
│  │ Great news! The inspection contingency has been          │ │
│  │ completed for your new home at 123 Main Street.          │ │
│  │                                                           │ │
│  │ Here's what's coming up next:                            │ │
│  │ • March 28: Appraisal contingency deadline               │ │
│  │ • April 1: Financing contingency deadline                │ │
│  │ • April 15: Closing day! 🎉                              │ │
│  │                                                           │ │
│  │ We're on track and everything is progressing smoothly.   │ │
│  │ Let me know if you have any questions!                   │ │
│  │                                                           │ │
│  │ Best,                                                     │ │
│  │ Sarah                                                     │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  Tone: [Professional ▼] [Warm] [Casual] [Formal]               │
│                                                                 │
│  [✓] Send me a copy                                            │
│  [✓] Track opens and clicks                                    │
│                                                                 │
│  [Preview] [Save Draft] [Send Now →]                            │
└─────────────────────────────────────────────────────────────────┘
```

**User Thoughts:**
- "This would have taken me 10 minutes to write"
- "I could actually send this"
- "The tone is right"

**Critical Success Factors:**
- AI-generated content is high quality
- Easy to customize
- Tone options
- One-click send

**Drop-off Risk: MEDIUM**
- If AI writing is bad, trust lost
- If not customizable, feels robotic

---

### Screen 7: Dashboard (Home)

**Trigger:** Navigate to Dashboard

**What User Sees:**

```
┌─────────────────────────────────────────────────────────────────┐
│  🏠 GRAVMAP              Dashboard    [🔍 Search]    [Profile]  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Good morning, Sarah! Here's your transaction overview:         │
│                                                                 │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐           │
│  │ Active  │  │ Closing │  │ Urgent  │  │ This    │           │
│  │   8     │  │  This   │  │   2     │  │ Week    │           │
│  │ trans   │  │  Month  │  │ deadlns │  │ tasks   │           │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘           │
│                                                                 │
│  🔥 REQUIRES ATTENTION                                          │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ 🔴 123 Main St - Inspection due TODAY                    │ │
│  │ 🟡 456 Oak Ave - Appraisal due in 3 days                 │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  📋 ALL TRANSACTIONS                          [+ New Transaction]│
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ Address            Status    Closing    Next Deadline     │ │
│  ├───────────────────────────────────────────────────────────┤ │
│  │ 123 Main St        Active    Apr 15     TODAY (Insp)      │ │
│  │ 456 Oak Ave        Active    Apr 20     Mar 28 (Appr)     │ │
│  │ 789 Pine Rd        Active    May 1      Apr 10 (Insp)     │ │
│  │ 321 Elm Blvd       Pending   May 10     Contract review   │ │
│  │ ... [+4 more]                                             │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
│  📊 THIS WEEK                                                   │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │ Mon  Tue  Wed  Thu  Fri  Sat  Sun                         │ │
│  │            [3]   [1]   [2]                                │ │
│  │           Weds: 3 deadlines                               │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  [🏠 Dashboard] [📁 Transactions] [📄 Templates] [⚙ Settings]   │
└─────────────────────────────────────────────────────────────────┘
```

**User Thoughts:**
- "I can see everything at a glance"
- "I know exactly what to focus on today"
- "This replaces my spreadsheet/whiteboard"

---

## Critical Drop-off Moments

### 1. Landing Page (50-70% will leave)

**Why they leave:**
- Don't understand value prop
- Not in target market
- Don't trust the brand
- Video doesn't load

**How to fix:**
- Clear, specific headline
- Social proof (testimonials, logos)
- Fast-loading video
- Trust badges

### 2. Signup Form (30-50% will abandon)

**Why they leave:**
- Too many fields
- Password requirements annoying
- Google OAuth fails
- Phone verification feels like too much

**How to fix:**
- Google OAuth as primary
- Minimal required fields
- Progress indicator
- Skip optional fields

### 3. First Upload (20-30% will skip)

**Why they skip:**
- Don't have contract handy
- Unsure if data is safe
- Feels like too much work
- "I'll come back later" (they won't)

**How to fix:**
- Sample contract option
- Security messaging
- Instant feedback
- Make it feel easy

### 4. Extraction Review (10-20% will doubt)

**Why they doubt:**
- Low accuracy on key fields
- No confidence scores
- Too many fields to review
- Feels like manual entry all over again

**How to fix:**
- >90% accuracy target
- Show confidence scores
- Highlight only items needing review
- One-click confirm

### 5. First Value Moment (5-10% will be underwhelmed)

**Why they're underwhelmed:**
- Timeline isn't useful
- Doesn't match their mental model
- Missing features they expected
- Too simple / too complex

**How to fix:**
- Show value immediately
- Match industry conventions
- Progressive disclosure
- Ask what they expected

---

## Time to Value Targets

| Action | Target Time | Max Acceptable |
|--------|-------------|----------------|
| Landing page → understand value | 30 seconds | 1 minute |
| Click CTA → signup complete | 2 minutes | 3 minutes |
| Signup → first upload | 30 seconds | 1 minute |
| Upload → extraction complete | 20 seconds | 45 seconds |
| Extraction → timeline visible | 10 seconds | 20 seconds |
| **Total: Signup → first value** | **< 5 minutes** | **< 8 minutes** |

If it takes longer than 5 minutes to see value, most users won't make it.

---

## What Makes Users Say "Wow"

### The Magic Moments

1. **Upload → Extraction**
   - "Wait, it actually read the contract?"
   - "How did it know all that?"
   - "That would have taken me 20 minutes"

2. **Timeline Auto-Generated**
   - "I can see everything at once"
   - "Oh no, that deadline is coming up fast"
   - "This is better than my spreadsheet"

3. **Client Email Written**
   - "This sounds like me"
   - "I could actually send this"
   - "Saved me from writer's block"

4. **First Reminder**
   - "Good thing you reminded me"
   - "I would have forgotten that"
   - "This paid for itself already"

---

## Demo Script for Interviews

**When showing demo without deployed product:**

```
"Let me walk you through what the product would look like.
I don't have it fully built yet, so bear with me..."

1. LANDING PAGE
   "Imagine you land here. What do you think this product does?"
   [Let them guess - tests value prop clarity]

2. SIGNUP
   "You click here, sign up with Google, takes 10 seconds."
   [Watch for hesitation about auth]

3. UPLOAD
   "Now you see this screen. What would you do?"
   [Do they understand what to do?]

4. EXTRACTION
   "You upload a contract, and boom - all this data appears."
   [Do they seem impressed? skeptical?]

5. TIMELINE
   "Then you see this timeline. What do you think?"
   [Is this useful to them?]

6. CLIENT UPDATE
   "You can also send client updates like this."
   [Would they use this?]

7. PRICING
   "This would cost $99/month. How does that feel?"
   [Watch for gut reaction]

8. FINAL QUESTION
   "If this existed today, would you use it? Be honest."
```

---

## Next Steps

1. **Create clickable prototype** (Figma, Maze)
2. **Test with 10 users** using demo script
3. **Identify friction points** from their behavior
4. **Iterate on design** before coding
5. **Document changes** to this walkthrough

**The goal: Every screen should make users say "yes, this helps me."**

If they pause, hesitate, or look confused at any point, that's a problem to fix.
