# Testing Protocol

**How to Test the MVP with Real Users**

---

## Testing Philosophy

**The Goal:** Discover truth, not confirm assumptions.

**The Mindset:**
- We're testing hypotheses, not "launching a product"
- Negative results are as valuable as positive ones
- We want to fail fast if the idea doesn't work
- Every user test should change our understanding

**The Rules:**
1. Test with real users, not friends/family
2. Test the actual product, not a pitch
3. Observe behavior, not just collect opinions
4. Measure what they do, not what they say
5. Document everything, especially failures

---

## Pre-Testing Checklist

### Before Testing with Users:

- [ ] MVP deployed and stable (no critical bugs)
- [ ] Test account created for researchers
- [ ] Onboarding flow works end-to-end
- [ ] Sample contract available for testing
- [ ] Screen recording setup (Loom, Zoom, etc.)
- [ ] Note-taking template ready
- [ ] Feedback survey link ready
- [ ] Compensation ready ($25-50 Amazon gift card or similar)

### Test User Criteria:

**MUST have:**
- [ ] Active real estate agent or team lead
- [ ] Closed at least 10 transactions
- [ ] Currently managing active transactions
- [ ] NOT a friend or family member
- [ ] NOT someone who's seen the product before

**IDEALLY:**
- [ ] Team of 3-20 agents
- [ ] Currently uses Dotloop, SkySlope, or similar
- [ ] Has complained about transaction management before
- [ ] Not extremely tech-savvy (want real users, not early adopters)

---

## The 5 Critical User Journeys

### Journey 1: First Impression & Signup (5 minutes)

**What we're testing:**
- Does the value proposition resonate?
- Can they understand what the product does in 30 seconds?
- Is signup frictionless?

**The Flow:**
1. User lands on homepage (no prior context)
2. Read landing page for 30 seconds
3. Attempt to sign up
4. Complete email verification if required

**Success Criteria:**
- ✅ Can explain product in their own words
- ✅ Completes signup in < 2 minutes
- ✅ No confusion about what to do next

**Critical Metrics:**
- Time to understand value proposition
- Signup completion rate
- Where they pause or hesitate

**Watch For:**
- Do they read the headline or skip to images?
- What questions do they ask before signing up?
- Do they hit any errors or confusion points?

---

### Journey 2: First Transaction Upload (10 minutes)

**What we're testing:**
- Can they figure out how to add a transaction?
- Does the upload process feel natural?
- What happens when they encounter AI extraction?

**The Flow:**
1. Log in for first time
2. Navigate to "Add Transaction"
3. Upload a sample contract (provide one if needed)
4. Watch AI extraction happen
5. Review extracted data

**Success Criteria:**
- ✅ Finds upload button without help
- ✅ Uploads contract successfully
- ✅ Understands what AI is doing
- ✅ Reviews/confirms extracted data

**Critical Metrics:**
- Time from login to upload
- Number of clicks to find upload
- Extraction accuracy (manual check)
- Confidence in extracted data

**Watch For:**
- Do they read instructions or just click around?
- What do they expect to happen after upload?
- Are they surprised/impressed by extraction?
- Do they trust the extracted data?

---

### Journey 3: Timeline & Deadline Management (5 minutes)

**What we're testing:**
- Does the timeline make sense?
- Do they understand the deadline reminders?
- Would this replace their current system?

**The Flow:**
1. View auto-generated timeline
2. Review upcoming deadlines
3. Check how reminders work
4. Imagine using this daily

**Success Criteria:**
- ✅ Understands timeline immediately
- ✅ Sees value in deadline tracking
- ✅ Says "I would use this"
- ✅ Identifies missing features constructively

**Critical Metrics:**
- Time to understand timeline
- Comprehension of reminder system
- Stated likelihood to use (1-10 scale)

**Watch For:**
- What do they look at first on timeline?
- Do they ask about features that don't exist?
- What comparisons do they make to current tools?
- What would make them switch from current system?

---

### Journey 4: Client Communication (5 minutes)

**What we're testing:**
- Does AI-drafted communication feel useful?
- Would they actually send these to clients?
- Is the tone appropriate?

**The Flow:**
1. Navigate to client communication section
2. Review AI-generated status update
3. Attempt to customize message
4. Preview how client would receive it

**Success Criteria:**
- ✅ Finds communication feature easily
- ✅ Approves of AI-drafted message quality
- ✅ Says they would send to real clients
- ✅ Suggests only minor improvements

**Critical Metrics:**
- Quality rating of AI draft (1-10)
- Likelihood to use (1-10)
- Changes they want to make

**Watch For:**
- Do they read the whole message or skim?
- What would they change about the tone?
- Do they trust AI to write client communications?
- What's their current process for this?

---

### Journey 5: Full Workflow - End to End (15 minutes)

**What we're testing:**
- Can they complete the full workflow independently?
- Where do they get stuck?
- Would this fit into their daily routine?

**The Flow:**
1. Start fresh (new test account)
2. Sign up
3. Add a transaction (use their real contract if possible)
4. Review timeline
5. Send a test client update
6. Explore any other features
7. Logout

**Success Criteria:**
- ✅ Completes full workflow with minimal help
- ✅ Encounters no blocking issues
- ✅ Expresses interest in continuing
- ✅ Identifies real use case for their team

**Critical Metrics:**
- Total time to complete workflow
- Number of times they ask for help
- Error/bug count
- Feature requests vs complaints

**Watch For:**
- Where do they slow down?
- What confuses them?
- What delights them?
- What would they change?
- Would they recommend this to colleagues?

---

## Testing Methodology

### Session Structure (30-45 minutes total)

**Opening (2 mins):**
```
"Thanks for taking the time to test our product. I'm building an AI tool 
for real estate transaction coordination, but I need to know if it actually 
helps real agents. There are no wrong answers - your honest feedback is 
what matters. I'll ask you to think out loud as you go. Ready?"
```

**Pre-Test Questions (3 mins):**
1. "How many transactions are you currently managing?"
2. "What's your biggest headache with transaction coordination?"
3. "What tools do you use now and how do you feel about them?"

**Testing (30 mins):**
- Give them the URL
- Ask them to think out loud
- Don't help unless they're completely stuck
- Take notes on specific behaviors
- Record the session (with permission)

**Post-Test Questions (5 mins):**
1. "What was your first impression?"
2. "What was confusing?"
3. "What did you like?"
4. "What would you change?"
5. "How does this compare to what you use now?"
6. "Would you actually use this? Why/why not?"
7. "Would you pay $99/month for this? Why/why not?"
8. "Would you recommend this to other agents?"

**Closing (2 mins):**
```
"This is incredibly helpful. One last question: If this product 
disappeared tomorrow, how would you feel? Very disappointed, 
somewhat disappointed, or not disappointed?"
```

---

## Measuring Success

### Quantitative Metrics (Track These)

| Metric | Target | Red Flag |
|--------|--------|----------|
| **Task Completion Rate** | >80% complete all journeys | <50% completion |
| **Time to First Value** | <5 minutes | >15 minutes |
| **Error Rate** | <5% of actions hit errors | >20% error rate |
| **Extraction Accuracy** | >90% correct | <70% accuracy |
| **Net Promoter Score** | >30 | <0 |
| **Willingness to Pay** | >50% say yes | <20% say yes |
| **"Very Disappointed" Score** | >40% | <20% |

### Qualitative Signals (Watch For)

**Positive Signals:**
- ✅ Smiles or excitement during testing
- ✅ Says "wow" or "that's cool"
- ✅ Asks "When can I start using this?"
- ✅ Mentions specific use cases
- ✅ Compares favorably to current tools
- ✅ Asks about pricing without prompting
- ✅ Wants to tell colleagues

**Negative Signals:**
- ❌ Confusion or frustration
- ❌ Long pauses without action
- ❌ Says "I guess this could work"
- ❌ Compares unfavorably to current tools
- ❌ Says "I'm not sure who this is for"
- ❌ Can't articulate the value
- ❌ Asks "Why would I use this instead of X?"

---

## What Must Work for Users to See Value

### Critical Path (If These Don't Work, Nothing Matters)

1. **Contract Upload Must Be Instant**
   - Drag and drop, no complex steps
   - Progress indicator during processing
   - Clear confirmation when done

2. **AI Extraction Must Be Accurate Enough**
   - At least 90% accuracy on key fields
   - Confidence scores visible
   - Easy to correct mistakes

3. **Timeline Must Be Immediately Understandable**
   - Visual clarity (not wall of text)
   - Color coding for urgency
   - One-glance comprehension

4. **Value Must Be Obvious Within 5 Minutes**
   - First upload → first timeline in <5 mins
   - "Aha moment" happens quickly
   - No tutorial required

### If These Don't Work, Stop and Fix Before More Testing:

- Users can't figure out how to upload
- Extraction fails on real contracts
- Timeline is confusing
- Users don't see the point after first use

---

## Testing Scenarios

### Scenario A: The Skeptic (Expected: 20-30% of users)

**Profile:** "I've tried 10 tools, they all suck, why would this be different?"

**How to Handle:**
- Let them complain first
- Don't defend, just observe
- Watch for what would change their mind
- Note specific objections

**What to Learn:**
- What makes tools fail for them?
- What's their minimum viable feature set?
- What would make them switch?

### Scenario B: The Enthusiast (Expected: 10-20% of users)

**Profile:** "This is amazing! I love it!"

**How to Handle:**
- Probe deeper: "What specifically do you like?"
- Ask: "What would make you stop using it?"
- Watch: Are they actually using key features?
- Test: Would they pay TODAY?

**What to Learn:**
- What resonates most?
- Are they just being polite?
- Is their enthusiasm actionable?

### Scenario C: The Confused (Expected: 30-40% of users)

**Profile:** "I don't understand... what does this do?"

**How to Handle:**
- Don't explain yet - watch them struggle
- Note where they get stuck
- Only help when truly blocked
- Ask: "What would make this clearer?"

**What to Learn:**
- Where's the friction?
- What's missing in onboarding?
- What terminology confuses them?

### Scenario D: The Feature Requester (Expected: 20-30% of users)

**Profile:** "This is great, but it needs X, Y, Z..."

**How to Handle:**
- Listen to all requests
- Ask: "Which of these is most important?"
- Ask: "Would you use it without these features?"
- Note: Are these nice-to-have or deal-breakers?

**What to Learn:**
- What's missing from MVP?
- What's essential vs. optional?
- Are requests consistent across users?

---

## Post-Testing Analysis

### After Each Session, Document:

```markdown
## Test Session: [Date] - [User Type]

### User Profile
- Role: 
- Team Size:
- Transactions/Year:
- Current Tools:

### Completion
- [ ] Signed up
- [ ] Uploaded contract
- [ ] Viewed timeline
- [ ] Sent test update
- [ ] Explored other features

### Metrics
- Time to first value: 
- Errors encountered:
- Help needed: (number of times)

### Key Quotes
> ""
> ""
> ""

### Surprises
- 

### Concerns
- 

### Feature Requests
- 

### Willingness to Pay
- [ ] Yes - asked how to pay
- [ ] Yes - when prompted
- [ ] Maybe - needs more features
- [ ] No - not valuable enough

### "Very Disappointed" Score
- [ ] Very disappointed
- [ ] Somewhat disappointed
- [ ] Not disappointed

### Next Steps
- 

### Honest Assessment
Is this person a good fit? Y/N
Did they see real value? Y/N
What did we learn?
```

### After 10 Sessions, Analyze:

1. **Task Completion Rates** - Where's the drop-off?
2. **Common Confusion Points** - What needs fixing?
3. **Consistent Feature Requests** - What's missing?
4. **Pricing Feedback** - Is $99-199 right?
5. **"Very Disappointed" Scores** - Are we tracking toward 40%?

---

## Common Testing Mistakes to Avoid

❌ **Helping too much** - "Let me show you how that works"
✅ Let them struggle (within reason)

❌ **Defending the product** - "Actually, it's designed to..."
✅ Accept all feedback without argument

❌ **Leading questions** - "Don't you think this feature is cool?"
✅ Open questions: "What do you think of this?"

❌ **Testing with friends** - "Hey mom, try my app!"
✅ Real users who owe you nothing

❌ **Only testing enthusiasts** - "I found 10 people who love it!"
✅ Include skeptics and average users

❌ **Rushing to features** - "What features do you want?"
✅ Focus on problems first: "What's hard about your job?"

❌ **Taking feedback personally** - Getting defensive
✅ Feedback is data, not criticism

---

## Next Steps

1. **Recruit 10 test users** (use validation/outreach-templates.md)
2. **Run first 5 tests** (watch for patterns)
3. **Fix critical issues** (don't wait for all 10)
4. **Run remaining 5 tests** (validate fixes)
5. **Analyze results** (brutal honesty)
6. **Decide: Iterate, pivot, or proceed**

**Success = Learning the truth, not validating the hypothesis.**

If 10 users can't figure it out or don't see value, that's valuable data. Use it.
