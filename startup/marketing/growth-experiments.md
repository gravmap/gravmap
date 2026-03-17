# Growth Experiments

**Created:** March 17, 2026  
**Experiment Framework:** ICE (Impact, Confidence, Ease)  
**Goal:** Identify scalable growth channels and optimize conversion

---

## Growth Experiment Framework

### ICE Scoring (1-10 Scale)

| Score | Impact | Confidence | Ease |
|-------|--------|------------|------|
| 1-3 | Minimal impact | Highly uncertain | Very difficult |
| 4-6 | Moderate impact | Somewhat certain | Moderate effort |
| 7-10 | High impact | Highly certain | Easy to implement |

**ICE Score = (Impact × Confidence × Ease) / 10**

**Priority:** Run experiments with ICE score 5+ first

### Experiment Process

1. **Hypothesis** - "If we [action], then [outcome] because [reason]"
2. **Design** - Define success metrics, timeline, resources
3. **Execute** - Run experiment for minimum viable duration
4. **Analyze** - Review results vs hypothesis
5. **Decide** - Double down, iterate, or kill
6. **Document** - Record learnings for future reference

### Success Criteria

| Outcome | Action |
|---------|--------|
| Success (100%+ of target) | Scale immediately |
| Partial success (50-99%) | Iterate and re-test |
| Failure (< 50%) | Kill or pivot |

---

## Experiment #1: Referral Program

### Hypothesis
**If** we offer a compelling referral incentive (1 month free per referral), **then** customers will refer at least 1 friend within 30 days **because** real estate agents have strong peer networks.

### Experiment Design

**Type:** Viral/Growth Loop  
**Duration:** 30 days  
**Resources:** 10 hours (dev + design)

**Implementation:**
1. Add referral dashboard to user settings
2. Generate unique referral links for each user
3. Track referrals via URL parameters
4. Automatically credit account when referral converts
5. Send email notifications for successful referrals

**Incentive Structure (Test):**
- Version A: Give 1 month free, get 1 month free
- Version B: Give 25% off, get 1 month free
- Version C: Give $25 Amazon gift card per referral

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Referral Participation Rate | 20%+ | % of users who share link |
| Referrals Per Referrer | 1+ | Average referrals per active referrer |
| Referral Conversion Rate | 15%+ | % of referred trials that convert |
| Referral Revenue | $500+ | Revenue from referral signups |

### Tracking

```
Event: referral_link_shared
Event: referral_signup (with referrer_id)
Event: referral_conversion (with referrer_id)

Dashboard: Referrals by user, conversion rate, revenue
```

### ICE Score
- Impact: 8 (high potential for word-of-mouth)
- Confidence: 7 (common in SaaS)
- Ease: 7 (straightforward to build)
- **ICE Score: 5.6**

---

## Experiment #2: Transaction Coordinator Lead Magnet

### Hypothesis
**If** we create a free "Transaction Coordinator Cost Calculator" tool, **then** we will capture 50+ leads per month **because** agents are uncertain about TC costs and want to make data-driven decisions.

### Experiment Design

**Type:** Lead Generation  
**Duration:** 30 days  
**Resources:** 15 hours (dev + content)

**Implementation:**
1. Build interactive calculator:
   - Input: Transaction volume, average commission, current tools spend
   - Output: TC cost comparison (hire vs. AI vs. DIY)
   - ROI calculator showing potential savings
2. Gate results with email capture
3. Email follow-up sequence after capture
4. Promote via social, SEO, paid

**Calculator Features:**
- Comparison: Full-time TC vs Part-time vs AI
- Monthly/Annual cost breakdown
- ROI timeline
- PDF report download

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Calculator Visitors | 500+ | Page views |
| Lead Capture Rate | 30%+ | % who provide email |
| Leads Generated | 150+ | Emails captured |
| Lead-to-Trial Conversion | 10%+ | % who start trial |
| Cost Per Lead | <$5 | Calculated |

### Tracking

```
Event: calculator_started
Event: calculator_completed
Event: email_captured
Event: pdf_downloaded

Conversion: calculator_completed → trial_started
```

### ICE Score
- Impact: 7 (high-intent leads)
- Confidence: 8 (lead magnets work)
- Ease: 6 (requires dev work)
- **ICE Score: 4.8**

---

## Experiment #3: Real Estate Facebook Group Value Posting

### Hypothesis
**If** we consistently provide value in real estate Facebook groups (answering questions, sharing tips), **then** we will generate 20+ trial signups per month **because** agents trust helpful community members.

### Experiment Design

**Type:** Community/Inbound  
**Duration:** 30 days  
**Resources:** 5 hours/week (ongoing)

**Implementation:**
1. Join 10 active RE agent Facebook groups
2. Post schedule:
   - Daily: Answer 3-5 questions
   - 3x/week: Share helpful tips (not promotional)
   - 1x/week: Share relevant blog content
   - 1x/week: Subtle product mention (when relevant)
3. Track attribution with UTM parameters
4. Build relationships with top contributors

**Content Types:**
- Transaction checklists
- Deadline management tips
- Client communication templates
- Tool comparisons (objective)
- Success stories (others, not just ours)

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Posts/Comments | 100+ | Total engagement |
| Referral Traffic | 300+ visits | UTM tracking |
| Trial Signups | 20+ | Attribution |
| Trial Conversion | 20%+ | Signups to paid |
| Community Sentiment | Positive | Qualitative |

### Tracking

```
UTM: ?utm_source=facebook&utm_medium=community&utm_campaign=[group_name]

Weekly log: Group name, posts, comments, clicks, signups
```

### ICE Score
- Impact: 6 (sustainable organic growth)
- Confidence: 7 (proven in similar products)
- Ease: 8 (time, not money)
- **ICE Score: 4.8**

---

## Experiment #4: Cold LinkedIn Outreach to Team Leaders

### Hypothesis
**If** we send personalized LinkedIn messages to 50 real estate team leaders offering a free demo, **then** we will schedule 10+ demos and close 3+ customers **because** team leaders have budget authority and urgent pain.

### Experiment Design

**Type:** Direct Sales/Outbound  
**Duration:** 14 days  
**Resources:** 10 hours (outreach + demos)

**Implementation:**
1. Identify 100 target team leaders (3-10 agents, target markets)
2. Send personalized connection requests:
   - Reference their team size, market
   - Mention specific pain point
   - Offer value (free consultation, not sales pitch)
3. Follow-up sequence (3 messages max)
4. Offer free 15-min demo or consultation
5. Track response rates and conversions

**Message Template:**
```
Hi [Name], I noticed your team is crushing it in [Market]! 

Quick question: How are you handling transaction management as you scale?

I'm building an AI tool that helps teams like yours automate deadline tracking. Would love to show you how it works (15 min).

Open to a quick chat?
```

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Connection Acceptance | 40%+ | 40+ connections |
| Reply Rate | 20%+ | 10+ replies |
| Demo Bookings | 10+ | Scheduled calls |
| Demo Completion | 80%+ | Completed demos |
| Close Rate | 30%+ | Customers from demos |
| CAC | <$100 | Total time / customers |

### Tracking

```
Spreadsheet: Name, market, team size, sent, accepted, replied, demo booked, demo completed, closed

CAC calculation: (Hours × hourly rate) / customers
```

### ICE Score
- Impact: 8 (high-value customers)
- Confidence: 6 (proven outbound model)
- Ease: 8 (no dev, just time)
- **ICE Score: 5.8**

---

## Experiment #5: Competitor Comparison Landing Page

### Hypothesis
**If** we create a dedicated "Dotloop Alternative" landing page, **then** we will capture 30+ trial signups per month from high-intent search traffic **because** agents actively search for alternatives when frustrated.

### Experiment Design

**Type:** SEO/Conversion  
**Duration:** 30 days  
**Resources:** 8 hours (content + design)

**Implementation:**
1. Create landing page: `/dotloop-alternative`
2. Content structure:
   - Honest comparison table
   - Feature-by-feature breakdown
   - Pricing comparison
   - Customer testimonials (switchers)
   - Clear CTA: "Try the AI Alternative"
3. Optimize for SEO:
   - Target "dotloop alternative" keywords
   - Schema markup for comparison
   - Internal links from blog posts
4. Promote via social and email

**Key Messaging:**
- "What Dotloop does well" (be fair)
- "Where Dotloop falls short" (honest)
- "Why agents are switching" (social proof)
- "Try the AI-native alternative" (CTA)

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Organic Traffic | 300+ visits | GA4 |
| Ranking | Top 10 for "dotloop alternative" | Ahrefs |
| Trial Signups | 30+ | Conversion tracking |
| Conversion Rate | 10%+ | Visits to signups |
| Bounce Rate | <60% | GA4 |

### Tracking

```
Landing page: /dotloop-alternative
Events: page_view, scroll_depth, trial_started
Attribution: First touch, last touch
```

### ICE Score
- Impact: 7 (high-intent traffic)
- Confidence: 8 (comparison pages convert)
- Ease: 7 (straightforward content)
- **ICE Score: 5.6**

---

## Experiment #6: Free Transaction Coordinator Training

### Hypothesis
**If** we offer free "Transaction Coordinator Training" (email course), **then** we will build trust and convert 15% of participants to paying customers **because** we provide value before asking for payment.

### Experiment Design

**Type:** Nurture/Trust Building  
**Duration:** 7-day course  
**Resources:** 15 hours (content creation)

**Implementation:**
1. Create 7-day email course:
   - Day 1: Transaction Coordinator Fundamentals
   - Day 2: Deadline Management Mastery
   - Day 3: Client Communication Templates
   - Day 4: Document Organization System
   - Day 5: Tools and Technology Stack
   - Day 6: Scaling Your TC Practice
   - Day 7: AI-Powered Transaction Management (soft sell)
2. Promote via social, website, partnerships
3. Track open rates and clicks
4. Convert to trial at end of course

**Email Structure:**
- Short, actionable content
- 1-2 tips per email
- Downloadable resources
- Soft sell in P.S.

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Enrollments | 200+ | Email signups |
| Completion Rate | 50%+ | All 7 emails opened |
| Trial Signups | 30+ | From course CTA |
| Conversion Rate | 15%+ | Enrollees to trial |
| Course NPS | 40+ | Post-course survey |

### Tracking

```
Email platform tracking: Opens, clicks, unsubscribes
Conversion: course_enrolled → trial_started → paid
Cohort analysis: Course vs non-course signups
```

### ICE Score
- Impact: 6 (nurture channel)
- Confidence: 7 (email courses work)
- Ease: 5 (content-heavy)
- **ICE Score: 4.2**

---

## Experiment #7: Influencer Affiliate Program

### Hypothesis
**If** we offer real estate influencers 30% recurring commission, **then** we will partner with 5+ influencers who generate 20+ customers each **because** they have audience trust and motivation.

### Experiment Design

**Type:** Partnership/Revenue Share  
**Duration:** 90 days  
**Resources:** 10 hours (outreach + setup)

**Implementation:**
1. Define affiliate program:
   - 30% recurring commission (12 months)
   - Unique tracking links
   - Co-branded landing pages
   - Monthly payouts
2. Identify 20 target influencers:
   - Real estate coaches
   - YouTubers
   - Podcasters
   - Bloggers
3. Outreach with clear value prop
4. Provide promotional assets
5. Track performance by influencer

**Target Influencers:**
- Micro-influencers (5K-50K followers)
- High engagement rate (>3%)
- Audience matches ICP
- Previous brand partnerships

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Influencers Signed | 5+ | Partnerships |
| Referral Traffic | 1,000+ visits | UTM tracking |
| Trial Signups | 100+ | From affiliate links |
| Conversion Rate | 20%+ | Signups to paid |
| Revenue Share | <$1,000/month | Commission paid |

### Tracking

```
Affiliate platform: Unique links, clicks, signups, revenue
Dashboard: By influencer (traffic, signups, revenue, commission)
Payout tracking: Monthly
```

### ICE Score
- Impact: 9 (leveraged growth)
- Confidence: 5 (depends on influencer quality)
- Ease: 6 (outreach + tracking)
- **ICE Score: 5.4**

---

## Experiment #8: Demo Video A/B Test

### Hypothesis
**If** we test different demo video styles on our landing page, **then** we will identify a version that increases trial signups by 20%+ **because** different messaging resonates with different visitors.

### Experiment Design

**Type:** Conversion Rate Optimization  
**Duration:** 14 days  
**Resources:** 10 hours (video + testing)

**Implementation:**
1. Create 3 video versions:
   - Version A: Feature-focused (show product)
   - Version B: Problem/solution (emotional)
   - Version C: Customer testimonial (social proof)
2. Split test on landing page (equal traffic)
3. Measure trial signup rate
4. Declare winner, iterate on winner

**Video Specs:**
- 60-90 seconds
- Autoplay (muted) on desktop
- Click-to-play on mobile
- Clear CTA at end

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Video Plays | 1,000+ | Per version |
| Watch Rate | 50%+ | Complete views |
| Trial Rate (A) | Baseline | % signups |
| Trial Rate (B) | +10% vs A | % signups |
| Trial Rate (C) | +10% vs A | % signups |
| Winner Improvement | +20%+ | vs control |

### Tracking

```
A/B test tool: Vercel Analytics, PostHog, or Google Optimize
Events: video_play, video_complete, trial_started
Statistical significance: 95%+
```

### ICE Score
- Impact: 6 (conversion improvement)
- Confidence: 7 (A/B testing works)
- Ease: 7 (straightforward test)
- **ICE Score: 4.9**

---

## Experiment #9: Pricing Page Redesign

### Hypothesis
**If** we simplify our pricing page and add social proof near pricing tiers, **then** we will increase pricing page to trial conversion by 25%+ **because** reduced cognitive load and increased trust.

### Experiment Design

**Type:** Conversion Rate Optimization  
**Duration:** 14 days  
**Resources:** 8 hours (design + dev)

**Implementation:**
1. Current state analysis (baseline metrics)
2. Design changes:
   - Simplify to 3 clear tiers
   - Highlight "Most Popular" tier
   - Add testimonials near pricing
   - Add comparison table
   - Clear CTA on each tier
   - Annual discount clearly shown
3. A/B test: Current vs New
4. Measure conversion impact

**Design Principles:**
- Reduce visual clutter
- Use anchoring (show highest price first)
- Add urgency (limited founder pricing)
- Answer FAQs below pricing

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Pricing Page Views | 1,000+ | Total |
| Baseline Conversion | Measure | Current rate |
| New Conversion | +25% | vs baseline |
| Bounce Rate | -10% | vs baseline |
| Time on Page | Measure | Engagement |

### Tracking

```
A/B test: Control vs Variant
Funnel: pricing_view → trial_started → payment_added
Heatmap: Hotjar or similar
```

### ICE Score
- Impact: 7 (pricing page critical)
- Confidence: 8 (proven CRO tactic)
- Ease: 6 (design + dev)
- **ICE Score: 5.6**

---

## Experiment #10: Onboarding Concierge Call Offer

### Hypothesis
**If** we offer a free 15-minute onboarding call to every trial signup, **then** we will increase trial-to-paid conversion by 30%+ **because** users who get help achieve value faster.

### Experiment Design

**Type:** Activation/Retention  
**Duration:** 30 days  
**Resources:** 5 hours/week (calls)

**Implementation:**
1. Add Calendly link to trial welcome email
2. Offer: "Free 15-min setup call with our team"
3. During call:
   - Help upload first contract
   - Show key features
   - Answer questions
   - Set up first timeline
4. Track: Call vs no-call conversion rates
5. Analyze impact on retention

**Call Script:**
- 2 min: Intro, learn about their business
- 5 min: Help upload first contract
- 5 min: Walk through timeline/reminders
- 3 min: Answer questions, next steps

### Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Call Booking Rate | 30%+ | % of trials who book |
| Call Completion Rate | 80%+ | % who show up |
| Activation Rate (call) | 80%+ | Upload first contract |
| Trial-to-Paid (call) | 50%+ | Conversion |
| Trial-to-Paid (no call) | 20%+ | Conversion |
| Time to Value | <10 min | First contract uploaded |

### Tracking

```
Event: onboarding_call_booked
Event: onboarding_call_completed
Cohort: call vs no-call
Metrics: Activation rate, conversion rate, time to value
```

### ICE Score
- Impact: 9 (major conversion lift)
- Confidence: 8 (proven in SaaS)
- Ease: 7 (time investment)
- **ICE Score: 6.3**

---

## Experiment Prioritization (by ICE Score)

| Rank | Experiment | ICE Score | Timeline |
|------|------------|-----------|----------|
| 1 | Onboarding Concierge Call | 6.3 | Week 1-4 |
| 2 | LinkedIn Outreach to Team Leaders | 5.8 | Week 1-2 |
| 3 | Referral Program | 5.6 | Week 2-6 |
| 4 | Competitor Comparison Page | 5.6 | Week 2-4 |
| 5 | Pricing Page Redesign | 5.6 | Week 3-5 |
| 6 | Influencer Affiliate Program | 5.4 | Week 4-16 |
| 7 | Demo Video A/B Test | 4.9 | Week 3-5 |
| 8 | Transaction Calculator Lead Magnet | 4.8 | Week 2-6 |
| 9 | Facebook Group Value Posting | 4.8 | Ongoing |
| 10 | Free TC Training Course | 4.2 | Week 4-8 |

---

## Tracking Framework

### Experiment Dashboard (Notion/Spreadsheet)

| Field | Description |
|-------|-------------|
| Experiment ID | Unique identifier |
| Name | Experiment name |
| Hypothesis | Full hypothesis statement |
| ICE Score | Calculated score |
| Status | Planning / Running / Complete / Killed |
| Start Date | When started |
| End Date | When ended |
| Results | Key metrics |
| Outcome | Success / Partial / Failure |
| Learnings | What was learned |
| Next Steps | Action based on results |

### Weekly Experiment Review

**Review Template:**
```
Experiment: [Name]
Week: [Number]
Status: [On track / Behind / Complete]

Metrics This Week:
- [Metric 1]: [Actual] / [Target]
- [Metric 2]: [Actual] / [Target]
- [Metric 3]: [Actual] / [Target]

Learnings:
- [What we learned]

Next Steps:
- [Action items]
```

### Monthly Growth Report

**Report Structure:**
1. Running Experiments Summary
2. Completed Experiments Results
3. Key Learnings
4. Next Month's Priorities
5. Resource Needs
6. CAC and LTV Impact

---

## Success Criteria Summary

### Minimum Viable Success (30 Days)

| Metric | Target |
|--------|--------|
| Experiments Launched | 5+ |
| Experiments with Positive Results | 2+ |
| Customers from Experiments | 20+ |
| Learnings Documented | 10+ |
| CAC Improvement | 10%+ |

### Success (90 Days)

| Metric | Target |
|--------|--------|
| Experiments Launched | 10+ |
| Scalable Channels Identified | 2+ |
| Customers from Experiments | 100+ |
| CAC | <$100 |
| Repeatable Playbooks | 3+ |

---

**Document Version:** 1.0  
**Last Updated:** March 17, 2026  
**Owner:** Marketing
