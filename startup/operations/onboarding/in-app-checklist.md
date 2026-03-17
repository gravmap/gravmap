# In-App Onboarding Checklist

**Type:** Interactive progress tracker  
**Location:** Dashboard sidebar or header  
**Visibility:** New users only (first 7 days or until completed)

---

## UX/UI Specification

### Visual Design

```
┌─────────────────────────────────────┐
│ Getting Started                      │
│                                      │
│ ✓ Create your account           100% │
│ ✓ Upload your first contract    100% │
│ ○ Review AI extraction           0%  │
│ ○ Explore your timeline          0%  │
│ ○ Send a client update           0%  │
│                                      │
│ Progress: ████████░░░░ 40%          │
│                                      │
│ [Hide Checklist]                     │
└─────────────────────────────────────┘
```

**Design Notes:**
- Compact, doesn't dominate the screen
- Always visible but collapsible
- Clear progress indicator
- Clickable items lead to the feature
- Celebrate completion with confetti or checkmark animation

---

## Checklist Items

### 1. Create Your Account ✓ (Auto-complete)
**Status:** Auto-completed on signup  
**Value:** User feels immediate progress  
**Technical:** Mark complete when `user.created_at` exists

---

### 2. Upload Your First Contract
**Status:** Incomplete until first upload  
**Action:** Links to transaction creation page  
**Value:** Core value proposition - see AI in action  
**Technical:** Mark complete when `transactions.count >= 1`

**Helper Text:** "Drag & drop a contract PDF or use our sample contract to see how it works"

**Smart Behavior:**
- If user hasn't uploaded after 2 minutes, show tooltip: "Start here! Upload any contract to see the magic."
- Offer sample contract for users who don't have one ready

---

### 3. Review AI Extraction
**Status:** Incomplete until user reviews extraction  
**Action:** Links to transaction detail page after upload  
**Value:** See AI accuracy, build trust  
**Technical:** Mark complete when `extraction.reviewed_at` is not null

**Helper Text:** "Our AI extracted key dates. Confirm they're correct - you can edit if needed."

**Smart Behavior:**
- Only appears after contract upload
- If extraction confidence is high, pre-fill and just ask for confirmation

---

### 4. Explore Your Timeline
**Status:** Incomplete until user views timeline  
**Action:** Links to timeline view  
**Value:** Visualize all deadlines, understand protection  
**Technical:** Mark complete when `timeline.viewed_at` is not null

**Helper Text:** "All your deadlines in one place. Click any date to see details."

**Smart Behavior:**
- Only appears after extraction review
- Auto-scroll to timeline on first transaction

---

### 5. Send a Client Update
**Status:** Incomplete until first email sent  
**Action:** Links to client communication feature  
**Value:** See AI-drafted email quality, save time  
**Technical:** Mark complete when `communications.count >= 1`

**Helper Text:** "Let AI write your client update. Just review and send!"

**Smart Behavior:**
- Only appears after timeline exploration
- Pre-fill with AI-drafted email based on transaction stage

---

## Completion Celebration

When all items complete:

```
┌─────────────────────────────────────┐
│ 🎉 You're All Set!                   │
│                                      │
│ You've mastered the basics.          │
│                                      │
│ What's next?                         │
│ → Upload more contracts              │
│ → Customize email templates          │
│ → Add team members (Team Plan)       │
│                                      │
│ [Dismiss Forever]                    │
└─────────────────────────────────────┘
```

**Behavior:**
- Show confetti animation
- Trigger "You're all set!" email (onboarding email #4 or #5)
- Hide checklist permanently (or move to "Tips" section)
- Offer next-step suggestions

---

## Smart Behaviors

### Progress Persistence
- Save progress to database (`user.onboarding_progress`)
- Resume where user left off across sessions
- Don't reset if user logs out

### Context-Aware Display
- Show checklist on dashboard until 100% complete
- Allow "Hide for now" but keep accessible in Help menu
- Show "You're X% done!" on login

### Guidance Tooltips
- If user hovers over incomplete item, show "Why this matters"
- If user clicks item, take them directly to that feature
- If user gets stuck, show "Need help?" link to support

### Skip Option
- Allow users to skip items (mark as "not now")
- After 7 days or 3 sessions, offer "Skip all" option
- Don't penalize users who skip - some learn differently

---

## Conditional Items (Future)

### For Team Plan Users:
- "Add a team member"
- "Set team permissions"
- "Share a transaction"

### For Power Users:
- "Connect Google Calendar" (Team Plan)
- "Customize email template"
- "Set up SMS notifications"

---

## A/B Test Variants

### Variant A: Linear Checklist
- Must complete in order
- Each item unlocks the next

### Variant B: Flexible Checklist
- Complete in any order
- Encourages exploration

### Variant C: Gamified
- Points for each item
- Badge/achievement at completion
- Leaderboard (optional)

**Recommendation:** Start with Variant A (linear) for simplicity, test B later.

---

## Analytics Tracking

Track these events:

1. `onboarding_started` - User sees checklist
2. `onboarding_step_completed` - User completes a step (which step?)
3. `onboarding_step_skipped` - User skips a step
4. `onboarding_completed` - User reaches 100%
5. `onboarding_dismissed` - User hides checklist
6. `onboarding_time_to_complete` - Time from start to finish
7. `onboarding_abandoned_at` - Where do users drop off?

**Key Metrics:**
- Completion rate: Target > 85%
- Time to complete: Target < 10 minutes
- Drop-off point: Where do users stop?
- Correlation with retention: Do users who complete onboarding churn less?

---

## Implementation Notes

### Frontend (Next.js):
```typescript
// Store in user metadata or dedicated table
interface OnboardingProgress {
  account_created: boolean;
  first_upload: boolean;
  extraction_reviewed: boolean;
  timeline_viewed: boolean;
  client_update_sent: boolean;
  completed_at?: Date;
}

// Show component conditionally
{user.days_since_signup <= 7 && !user.onboarding_completed && (
  <OnboardingChecklist progress={user.onboarding_progress} />
)}
```

### Backend (Supabase):
```sql
-- Add to users table or create separate table
ALTER TABLE users ADD COLUMN onboarding_progress JSONB DEFAULT '{
  "account_created": true,
  "first_upload": false,
  "extraction_reviewed": false,
  "timeline_viewed": false,
  "client_update_sent": false
}';

-- Index for analytics
CREATE INDEX idx_onboarding_progress ON users ((onboarding_progress->>'completed_at'));
```

---

## User Research Questions

Before finalizing, answer these:

1. Do users prefer linear or flexible onboarding?
2. Is 5 steps too many? Should we reduce to 3?
3. Should we offer a "guided tour" mode vs "self-serve"?
4. What's the optimal time to show the checklist? (Immediately vs after welcome screen)
5. Should we email users who abandon onboarding?

---

## Post-Onboarding

After checklist completion:

1. **Show "What's Next" suggestions:**
   - "Add more transactions"
   - "Customize settings"
   - "Invite team members"

2. **Prompt for feedback:**
   - "How was your onboarding experience? 1-5 stars"
   - Use to improve process

3. **Connect to support:**
   - "Questions? Book a 15-min call with our team"
   - Link to calendar booking

4. **Introduce community:**
   - "Join 500+ agents in our Facebook group"
   - Link to community
