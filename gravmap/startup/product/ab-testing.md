# A/B Testing Framework

**Purpose:** Systematically test hypotheses to improve conversion, engagement, and retention through data-driven experimentation.

---

## Testing Philosophy

### Core Principles
1. **Hypothesis-driven** - Every test starts with a clear hypothesis
2. **Statistical significance** - Only ship changes with confidence
3. **User value first** - Tests should improve user experience
4. **Learn from failures** - Negative results are valuable insights
5. **Iterate rapidly** - Quick cycles, many experiments

### When to A/B Test
- High-traffic pages (landing, pricing, signup)
- Conversion-critical flows (checkout, onboarding)
- Major UI/UX changes
- Copy and messaging changes
- Feature rollouts with adoption uncertainty

### When NOT to A/B Test
- Low traffic (< 1,000 users/month)
- Critical bug fixes
- Legal/compliance changes
- Brand identity updates
- Changes with clear evidence

---

## Testing Framework

### Hypothesis Template

```
HYPOTHESIS: If we [CHANGE], then [METRIC] will [INCREASE/DECREASE] 
by [AMOUNT] because [RATIONALE].

Example:
HYPOTHESIS: If we add a progress bar to the onboarding flow, then 
onboarding completion will increase by 15% because users will have 
clear visibility into how many steps remain.
```

### Test Structure

| Element | Description |
|---------|-------------|
| Test ID | Unique identifier (e.g., TEST-001) |
| Name | Descriptive test name |
| Hypothesis | Clear statement following template |
| Primary Metric | Main success metric |
| Secondary Metrics | Additional metrics to track |
| Audience | Who is included in test |
| Duration | How long to run |
| Traffic Split | Percentage per variant |
| Variants | Control and treatment(s) |

---

## 10 Priority A/B Tests

### Test 1: Landing Page Hero Copy

**ID:** TEST-001
**Priority:** P0
**Hypothesis:** If we emphasize "AI-powered" in the hero copy, then signup conversion will increase by 10% because users will immediately understand our unique value proposition.

**Variants:**
- **Control (A):** "Never miss a deadline again. Upload your contracts and let AI extract all the important dates."
- **Treatment (B):** "AI-powered transaction management. Let AI extract deadlines from your contracts in seconds, so you never miss a critical date."
- **Treatment (C):** "Close deals on time, every time. Our AI reads your contracts and tracks every deadline automatically."

**Metrics:**
- Primary: Signups per landing page view
- Secondary: Time on page, scroll depth

**Audience:** New visitors to landing page
**Duration:** 2 weeks
**Traffic Split:** 33% A / 33% B / 34% C
**Sample Size Needed:** ~5,000 visitors per variant

---

### Test 2: Pricing Display

**ID:** TEST-002
**Priority:** P0
**Hypothesis:** If we show annual pricing with monthly equivalent ($24/mo billed annually), then annual subscriptions will increase by 25% because users perceive higher value.

**Variants:**
- **Control (A):** Show only monthly pricing ($29/mo)
- **Treatment (B):** Show both monthly and annual with savings badge ($29/mo or $24/mo annually - Save 17%)
- **Treatment (C):** Show annual as default with toggle to monthly

**Metrics:**
- Primary: Annual subscription rate
- Secondary: Overall conversion rate, revenue per visitor

**Audience:** Pricing page visitors
**Duration:** 3 weeks
**Traffic Split:** 33% A / 33% B / 34% C

---

### Test 3: Onboarding Flow Length

**ID:** TEST-003
**Priority:** P0
**Hypothesis:** If we reduce onboarding from 5 steps to 3 steps, then completion rate will increase by 20% because users experience less friction before seeing value.

**Variants:**
- **Control (A):** Current 5-step onboarding
- **Treatment (B):** Condensed 3-step onboarding (merge steps 2-3 and 4-5)
- **Treatment (C):** Progressive onboarding (1 step, then show rest in dashboard)

**Metrics:**
- Primary: Onboarding completion rate
- Secondary: Time to first transaction, 7-day retention

**Audience:** New signups
**Duration:** 3 weeks
**Traffic Split:** 33% A / 33% B / 34% C

---

### Test 4: CTA Button Color

**ID:** TEST-004
**Priority:** P1
**Hypothesis:** If we change the primary CTA button from blue to green, then click-through rate will increase by 5% because green is associated with "go" and success.

**Variants:**
- **Control (A):** Blue button (#3B82F6)
- **Treatment (B):** Green button (#22C55E)
- **Treatment (C):** Orange button (#F97316)

**Metrics:**
- Primary: CTA click rate
- Secondary: Downstream conversion

**Audience:** All pages with primary CTAs
**Duration:** 2 weeks
**Traffic Split:** 33% A / 33% B / 34% C

---

### Test 5: Social Proof Placement

**ID:** TEST-005
**Priority:** P1
**Hypothesis:** If we add testimonials above the fold on the landing page, then signup conversion will increase by 8% because social proof reduces anxiety.

**Variants:**
- **Control (A):** Current layout (testimonials below fold)
- **Treatment (B):** Add single testimonial quote below hero
- **Treatment (C):** Add "Trusted by X agents" badge in header

**Metrics:**
- Primary: Signups per page view
- Secondary: Scroll depth, time on page

**Audience:** Landing page visitors
**Duration:** 2 weeks
**Traffic Split:** 33% A / 33% B / 34% C

---

### Test 6: Email Reminder Timing

**ID:** TEST-006
**Priority:** P1
**Hypothesis:** If we send reminder emails at 8 AM instead of 9 AM, then email open rate will increase by 10% because users check email earlier in the morning.

**Variants:**
- **Control (A):** 9:00 AM local time
- **Treatment (B):** 8:00 AM local time
- **Treatment (C):** 7:00 AM local time

**Metrics:**
- Primary: Email open rate
- Secondary: Click rate, deadline completion rate

**Audience:** Users with email reminders enabled
**Duration:** 3 weeks
**Traffic Split:** 33% A / 33% B / 34% C

---

### Test 7: AI Extraction Preview

**ID:** TEST-007
**Priority:** P1
**Hypothesis:** If we show a live preview of extracted data while AI processes, then perceived wait time will decrease and satisfaction will increase by 15%.

**Variants:**
- **Control (A):** Show loading spinner during extraction
- **Treatment (B):** Show skeleton preview with "extracting..." animation
- **Treatment (C):** Show step-by-step progress ("Reading document...", "Finding dates...", etc.)

**Metrics:**
- Primary: User satisfaction (post-extraction survey)
- Secondary: Time waiting, abandonment rate

**Audience:** Users uploading documents
**Duration:** 2 weeks
**Traffic Split:** 33% A / 33% B / 34% C

---

### Test 8: Trial Length

**ID:** TEST-008
**Priority:** P1
**Hypothesis:** If we offer a 14-day trial instead of 7 days, then conversion to paid will increase by 12% because users have more time to experience value.

**Variants:**
- **Control (A):** 7-day trial
- **Treatment (B):** 14-day trial
- **Treatment (C):** 30-day trial

**Metrics:**
- Primary: Trial-to-paid conversion rate
- Secondary: Trial engagement, time to first transaction

**Audience:** New signups (Free plan)
**Duration:** 5 weeks (need full trial cycle)
**Traffic Split:** 33% A / 33% B / 34% C

---

### Test 9: Dashboard Layout

**ID:** TEST-009
**Priority:** P2
**Hypothesis:** If we show upcoming deadlines above transactions on the dashboard, then deadline completion rate will increase by 5% because urgent items are more visible.

**Variants:**
- **Control (A):** Transactions list first, then deadlines
- **Treatment (B):** Deadlines section first, then transactions
- **Treatment (C):** Split view - deadlines on left, transactions on right

**Metrics:**
- Primary: Deadline completion rate
- Secondary: Dashboard engagement, session duration

**Audience:** All dashboard visitors
**Duration:** 3 weeks
**Traffic Split:** 33% A / 33% B / 34% C

---

### Test 10: Upgrade Prompt Timing

**ID:** TEST-010
**Priority:** P2
**Hypothesis:** If we show upgrade prompts after the 3rd transaction instead of immediately, then upgrade rate will increase by 15% because users have experienced value.

**Variants:**
- **Control (A):** Show upgrade prompt in dashboard for free users always
- **Treatment (B):** Show prompt only after 3rd transaction created
- **Treatment (C):** Show prompt only when hitting Free plan limits

**Metrics:**
- Primary: Free-to-paid conversion rate
- Secondary: Feature usage, churn rate

**Audience:** Free plan users
**Duration:** 4 weeks
**Traffic Split:** 33% A / 33% B / 34% C

---

## Implementation Guide

### Technical Setup

```typescript
// lib/experiments/client.ts
interface Experiment {
  id: string;
  variants: string[];
  trafficSplit: number[];
}

const EXPERIMENTS: Record<string, Experiment> = {
  'TEST-001': {
    id: 'TEST-001',
    variants: ['control', 'treatment_b', 'treatment_c'],
    trafficSplit: [0.33, 0.33, 0.34]
  },
  // ... other experiments
};

export function getVariant(experimentId: string, userId: string): string {
  const experiment = EXPERIMENTS[experimentId];
  if (!experiment) return 'control';

  // Deterministic assignment based on user ID
  const hash = hashUserId(userId, experimentId);
  const cumulative = 0;
  
  for (let i = 0; i < experiment.trafficSplit.length; i++) {
    if (hash < cumulative + experiment.trafficSplit[i]) {
      return experiment.variants[i];
    }
    cumulative += experiment.trafficSplit[i];
  }
  
  return experiment.variants[0];
}

function hashUserId(userId: string, experimentId: string): number {
  const str = `${userId}-${experimentId}`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash = hash & hash;
  }
  return (Math.abs(hash) % 100) / 100;
}
```

### Variant Component Pattern

```tsx
// components/Experiment.tsx
'use client';

import { getVariant } from '@/lib/experiments/client';
import { useUser } from '@/hooks/useUser';

interface ExperimentProps {
  experimentId: string;
  variants: Record<string, React.ReactNode>;
  fallback?: React.ReactNode;
}

export function Experiment({ experimentId, variants, fallback }: ExperimentProps) {
  const { user } = useUser();
  
  if (!user) return fallback || null;
  
  const variant = getVariant(experimentId, user.id);
  
  return variants[variant] || fallback || null;
}

// Usage
<Experiment
  experimentId="TEST-001"
  variants={{
    control: <HeroCopyA />,
    treatment_b: <HeroCopyB />,
    treatment_c: <HeroCopyC />
  }}
/>
```

### Tracking Implementation

```typescript
// Track experiment exposure
analytics.track('experiment_viewed', {
  experiment_id: 'TEST-001',
  variant: 'treatment_b',
  user_id: userId
});

// Track conversion events
analytics.track('experiment_conversion', {
  experiment_id: 'TEST-001',
  variant: 'treatment_b',
  conversion_type: 'signup',
  user_id: userId
});
```

---

## Statistical Requirements

### Sample Size Calculator

For 95% confidence and 80% power:

| Baseline Rate | Minimum Detectable Effect | Sample Size per Variant |
|----------------|---------------------------|-------------------------|
| 5% | 20% lift | 3,100 |
| 5% | 10% lift | 12,300 |
| 10% | 20% lift | 1,500 |
| 10% | 10% lift | 6,000 |
| 20% | 20% lift | 650 |
| 20% | 10% lift | 2,600 |

### Significance Testing

```typescript
function calculateSignificance(
  control: { visitors: number; conversions: number },
  treatment: { visitors: number; conversions: number }
): { significant: boolean; pValue: number; lift: number } {
  const controlRate = control.conversions / control.visitors;
  const treatmentRate = treatment.conversions / treatment.visitors;
  
  const pooledP = (control.conversions + treatment.conversions) / 
                  (control.visitors + treatment.visitors);
  
  const se = Math.sqrt(
    pooledP * (1 - pooledP) * 
    (1/control.visitors + 1/treatment.visitors)
  );
  
  const zScore = (treatmentRate - controlRate) / se;
  const pValue = 2 * (1 - normalCDF(Math.abs(zScore)));
  
  return {
    significant: pValue < 0.05,
    pValue,
    lift: ((treatmentRate - controlRate) / controlRate) * 100
  };
}
```

---

## Testing Process

### Pre-Launch Checklist
- [ ] Hypothesis documented and approved
- [ ] Sample size calculated
- [ ] Variants implemented and QA'd
- [ ] Tracking verified
- [ ] Randomization tested
- [ ] Rollout plan documented

### During Test
- [ ] Monitor for bugs or anomalies
- [ ] Check sample ratio mismatch
- [ ] Don't peek at results early
- [ ] Document any external factors

### Post-Test
- [ ] Calculate statistical significance
- [ ] Analyze segment differences
- [ ] Document learnings
- [ ] Make ship/no-ship decision
- [ ] Plan follow-up tests

---

## Test Calendar (First 90 Days)

| Week | Test ID | Focus | Status |
|------|---------|-------|--------|
| 1-2 | TEST-001 | Landing page copy | Planned |
| 2-3 | TEST-004 | CTA button color | Planned |
| 3-5 | TEST-003 | Onboarding flow | Planned |
| 4-6 | TEST-002 | Pricing display | Planned |
| 5-6 | TEST-005 | Social proof | Planned |
| 6-8 | TEST-006 | Email timing | Planned |
| 7-8 | TEST-007 | AI extraction preview | Planned |
| 8-12 | TEST-008 | Trial length | Planned |
| 9-11 | TEST-009 | Dashboard layout | Planned |
| 10-13 | TEST-010 | Upgrade prompt | Planned |

---

## Test Documentation Template

```markdown
# TEST-XXX: [Test Name]

## Status
- [ ] Planned
- [ ] Running
- [ ] Completed
- [ ] Shipped / Rejected

## Hypothesis
If we [CHANGE], then [METRIC] will [INCREASE/DECREASE] by [AMOUNT] 
because [RATIONALE].

## Variants
- **Control (A):** [Description]
- **Treatment (B):** [Description]
- **Treatment (C):** [Description]

## Metrics
- **Primary:** [Metric name]
- **Secondary:** [Metrics]

## Results

| Variant | Visitors | Conversions | Rate | Lift |
|---------|----------|-------------|------|------|
| Control | X | Y | Z% | - |
| Treatment B | X | Y | Z% | +N% |
| Treatment C | X | Y | Z% | +N% |

**Statistical Significance:** p = X.XX

## Decision
- [ ] Ship Treatment B
- [ ] Ship Treatment C
- [ ] Keep Control
- [ ] Iterate and re-test

## Learnings
[What did we learn?]

## Follow-up
[Next steps or follow-up tests]
```

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Tests launched per quarter | 10+ | Test tracker |
| Tests reaching significance | 80% | Analysis |
| Winning tests | 30%+ | Results |
| Impact per winning test | +5% metric lift | Results |
| Test velocity | 2-3 running simultaneously | Dashboard |

---

*Last Updated: March 2024*
*Review Frequency: Weekly during tests*
