# Competitive Intelligence System

**Purpose:** Systematically monitor, analyze, and respond to competitive threats and opportunities in the real estate transaction management market.

---

## Competitor Tracking List

### Tier 1: Direct Competitors (Monitor Weekly)

| Competitor | Focus | Pricing | Threat Level | Notes |
|------------|-------|---------|--------------|-------|
| **Dotloop** | Transaction management, e-signatures | $29-99/mo | HIGH | Market leader, owned by Zillow |
| **SkySlope** | Transaction coordination | $15-50/mo | HIGH | Strong in enterprise brokerages |
| **Brokermint** | Back-office management | $99-399/mo | MEDIUM | More back-office focused |
| **Paperless Pipeline** | Document management | $75-200/mo | MEDIUM | Older product, loyal base |
| **RealtyBackOffice** | Transaction + back-office | $49-149/mo | MEDIUM | Growing presence |

### Tier 2: Adjacent Competitors (Monitor Monthly)

| Competitor | Category | Overlap | Notes |
|------------|----------|---------|-------|
| **DocuSign** | E-signatures | Deadline reminders | Partnership opportunity |
| **Follow Up Boss** | CRM | Contact management | Integration partner |
| **kvCORE** | CRM + leads | Transaction tracking | Compete + integrate |
| **Placester** | Websites | Some overlap | Different focus |
| **BoomTown** | Lead gen + CRM | Minor overlap | Different market |

### Tier 3: Emerging/Regional (Monitor Quarterly)

| Competitor | Region | Notes |
|------------|--------|-------|
| **ZipLogix** | US | Traditional, being displaced |
| ** Lone Wolf** | US/Canada | Enterprise focus |
| **Reapit** | UK | International expansion threat |
| **Agentbox** | Australia | Regional player |

---

## Monitoring Dashboard Specification

### Data Sources

1. **Pricing Intelligence**
   - Competitor pricing pages (scraped weekly)
   - G2/Capterra pricing info
   - Sales call intel from prospects

2. **Feature Tracking**
   - Product updates (blogs, changelogs)
   - Help center/documentation updates
   - Customer reviews mentioning features

3. **Market Position**
   - G2 ratings and reviews
   - Capterra rankings
   - App store ratings
   - Social media sentiment

4. **Business Metrics**
   - Estimated revenue (Owler, Crunchbase)
   - Employee count (LinkedIn)
   - Funding rounds (Crunchbase)
   - Key hires/departures

### Dashboard Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│                    COMPETITIVE INTELLIGENCE DASHBOARD               │
├─────────────────────────────────────────────────────────────────────┤
│  Market Overview                    │  Recent Activity              │
│  ─────────────────                 │  ──────────────────           │
│  Total Market Size: $2.5B          │  • Dotloop released API v3    │
│  YoY Growth: 12%                   │  • SkySlope raised Series B   │
│  Our Market Share: 0.01%           │  • Brokermint lowered pricing │
├─────────────────────────────────────────────────────────────────────┤
│  Competitor Comparison Matrix                                       │
│  ─────────────────────────────────────────────────────────────────  │
│  Feature          │ Dotloop │ SkySlope │ Brokermint │ GravMap     │
│  AI Extraction    │    ❌   │    ❌    │     ❌     │    ✅       │
│  Auto Reminders   │    ✅   │    ✅    │     ✅     │    ✅       │
│  Calendar Sync    │    ✅   │    ❌    │     ❌     │    ✅       │
│  CRM Integration  │    ✅   │    ✅    │     ✅     │    🔜       │
│  Mobile App       │    ✅   │    ✅    │     ✅     │    ❌       │
│  Team Features    │    ✅   │    ✅    │     ✅     │    🔜       │
│  Price (Pro)      │   $99   │   $50    │    $149    │   $29       │
│  G2 Rating        │   4.2   │   4.4    │    4.0     │   N/A       │
├─────────────────────────────────────────────────────────────────────┤
│  Pricing Trends                    │  Review Sentiment              │
│  ───────────────                   │  ─────────────────             │
│  [Line chart: competitor prices]   │  [Pie: positive/neutral/neg]  │
├─────────────────────────────────────────────────────────────────────┤
│  Weekly Highlights                                                  │
│  ──────────────────────────────────────────────────────────────────│
│  1. Dotloop announced partnership with Keller Williams (Mar 12)    │
│  2. SkySlope launched mobile app redesign with positive reception  │
│  3. Brokermint running 20% off promotion through March             │
│  4. Common complaint in Dotloop reviews: "slow customer support"   │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Weekly Competitive Intel Report Template

### Report Structure

```markdown
# Competitive Intelligence Report
**Week of:** [DATE]
**Prepared by:** [NAME]
**Distribution:** Product Team, Leadership

---

## Executive Summary
[2-3 sentences on most important developments]

## Key Developments This Week

### [Competitor Name]
- **What happened:** [Description]
- **Impact assessment:** [High/Medium/Low]
- **Recommended action:** [What we should do]
- **Source:** [Link]

### [Competitor Name]
- ...

---

## Feature Updates Spotted
| Competitor | Feature | Launch Date | Our Response |
|------------|---------|-------------|--------------|
| ... | ... | ... | ... |

---

## Pricing Changes
| Competitor | Old Price | New Price | Change % |
|------------|-----------|-----------|----------|
| ... | ... | ... | ... |

---

## Review Highlights

### Positive Reviews (Competitors)
> "Great product but expensive for solo agents"
> — [Source], [Date]

### Negative Reviews (Competitors)
> "Customer support takes days to respond"
> — [Source], [Date]

### Feature Requests from Reviews
- "I wish it had AI document extraction" (5 mentions)
- "Calendar integration would save me hours" (3 mentions)

---

## Win/Loss Analysis

### Wins This Week
- Prospect chose GravMap over [Competitor] because: [reason]

### Losses This Week
- Prospect chose [Competitor] over GravMap because: [reason]

---

## Action Items
- [ ] [Action] - [Owner] - [Due Date]
- [ ] ...

---

## Next Week Focus
[Areas to watch in upcoming week]

---

## Appendix
- Full review excerpts
- Screenshots of competitor updates
- Raw data tables
```

---

## Data Collection Methods

### Automated Sources

1. **Web Scraping (Weekly)**
   - Pricing pages
   - Feature pages
   - Help documentation
   - Career pages (hiring signals)

2. **API Monitoring**
   - G2 API for reviews
   - ProductHunt API for launches
   - Crunchbase API for funding

3. **Social Listening**
   - Twitter mentions
   - LinkedIn posts
   - Facebook groups (manual sampling)
   - Reddit r/realtors, r/realestate

4. **Review Aggregation**
   - G2.com
   - Capterra
   - Software Advice
   - TrustRadius
   - App Store/Play Store

### Manual Sources

1. **Customer Intel**
   - Sales calls (competitor mentions)
   - Support tickets (switching from)
   - Churn surveys (switching to)

2. **Industry Events**
   - Inman Connect
   - NAR conferences
   - Local RE meetups

3. **Industry Reports**
   - Inman News
   - HousingWire
   - Real Trends

---

## Competitor Profile Template

```markdown
# Competitor Profile: [Name]

## Company Overview
- **Founded:** [Year]
- **Headquarters:** [Location]
- **Employees:** [Count]
- **Funding:** [Total raised, latest round]
- **Ownership:** [Independent/Venture/Acquired]

## Product
- **Core Value Prop:** [One sentence]
- **Target Customer:** [ICP]
- **Key Features:** [Top 5]
- **Unique Features:** [What makes them different]
- **Weaknesses:** [Known gaps]

## Pricing
| Tier | Price | Features |
|------|-------|----------|
| ... | ... | ... |

## Market Position
- **Estimated Revenue:** [Range]
- **Estimated Customers:** [Range]
- **Key Partnerships:** [List]
- **Key Customers:** [Named accounts]

## Competitive Positioning
### vs GravMap
- **Their Advantages:**
  - ...
- **Our Advantages:**
  - ...
- **Differentiation Strategy:**
  - ...

## Recent Activity (Last 90 Days)
- [Date]: [Event]
- ...

## Win/Loss Record
- **Wins against them:** X
- **Losses to them:** Y
- **Common win reasons:** ...
- **Common loss reasons:** ...

## Action Items
- [ ] Monitor: [What to watch]
- [ ] Counter: [What to build/say]
- [ ] Research: [What to learn more about]
```

---

## Alert Triggers

### Immediate Alerts (Same Day)
- New product launch from Tier 1 competitor
- Major price change (>20%)
- Acquisition announcement
- Key partnership announcement
- Significant funding round

### Weekly Alerts
- Feature updates
- Minor pricing changes
- Leadership changes
- New integration announcements

### Monthly Alerts
- Review volume changes
- Market share shifts
- Strategic pivots
- Employee growth/decline

---

## Tools & Resources

### Recommended Tools
1. **Visualping** - Monitor website changes
2. **Owler** - Company intelligence
3. **Crunchbase** - Funding data
4. **G2 Track** - Review monitoring
5. **SparkToro** - Social listening

### Internal Tools
- Competitive intel database (Notion/Airtable)
- Slack channel: #competitive-intel
- Weekly sync meeting
- Quarterly deep-dive presentation

---

## Success Metrics

| Metric | Target | Frequency |
|--------|--------|-----------|
| Competitor updates tracked | 10+/week | Weekly |
| Win/loss interviews | 5+/month | Monthly |
| Feature gaps identified | 3+/quarter | Quarterly |
| Competitive content created | 2+/month | Monthly |
| Battle cards updated | All Tier 1 | Quarterly |

---

## Quarterly Review Agenda

1. **Market Landscape Update**
   - New entrants
   - Exits/acquisitions
   - Market size changes

2. **Competitor Deep-Dive**
   - One Tier 1 competitor per quarter
   - Full product audit
   - Customer interviews

3. **Positioning Review**
   - Are we still differentiated?
   - Any positioning shifts needed?
   - Messaging updates required?

4. **Action Planning**
   - Priority competitive responses
   - Feature roadmap impacts
   - Marketing/sales enablement needs

---

*Last Updated: March 2024*
*Review Frequency: Weekly*
*Next Review: [DATE]*
