# Support Chat Integration Guide

This guide explains how to integrate live chat support into GravMap.

## Option 1: Crisp (Recommended)

### Why Crisp?
- Free tier available
- Easy integration
- Modern UI
- Email fallback when offline
- Multi-platform support

### Setup Steps

#### 1. Create Crisp Account
1. Go to [crisp.chat](https://crisp.chat)
2. Sign up for a free account
3. Create a new website workspace
4. Note your **Website ID** (found in Settings → Website Settings)

#### 2. Add Crisp to Your App

Add this to your `.env.local`:
```bash
NEXT_PUBLIC_CRISP_WEBSITE_ID=your-website-id-here
```

Create `src/components/support/CrispChat.tsx`:

```tsx
"use client";

import { useEffect } from "react";

export function CrispChat() {
  useEffect(() => {
    // Only load in production
    if (process.env.NODE_ENV !== "production") return;
    if (!process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID) return;

    // Add Crisp script
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID;

    const script = document.createElement("script");
    script.src = "https://client.crisp.chat/l.js";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup if needed
      const crispScript = document.querySelector('script[src="https://client.crisp.chat/l.js"]');
      if (crispScript) {
        crispScript.remove();
      }
    };
  }, []);

  return null;
}
```

#### 3. Add to Layout

Add `<CrispChat />` to your root layout:

```tsx
// src/app/layout.tsx
import { CrispChat } from "@/components/support/CrispChat";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CrispChat />
      </body>
    </html>
  );
}
```

#### 4. Configure Crisp Settings

In Crisp Dashboard:
- **Availability**: Set your hours (e.g., 9 AM - 6 PM EST)
- **Automessages**: Create welcome message
- **Triggers**: Show chat after 30 seconds on page
- **Offline Form**: Enable email collection when offline

### Advanced Configuration

#### User Identification
Identify logged-in users in Crisp:

```tsx
// In your auth context or after login
if (window.$crisp && user) {
  $crisp.push(["set", "user:email", [user.email]]);
  $crisp.push(["set", "user:nickname", [user.name]]);
  $crisp.push(["set", "user:avatar", [user.avatar_url]]);
}
```

#### Custom Triggers
Show chat on specific pages:

```tsx
// Show on transaction pages
if (window.$crisp && router.pathname.includes("/transactions/")) {
  $crisp.push(["do", "chat:open"]);
}
```

---

## Option 2: Intercom

### Why Intercom?
- Feature-rich
- Great analytics
- Integration ecosystem
- Team inbox

### Setup Steps

#### 1. Create Intercom Account
1. Go to [intercom.com](https://intercom.com)
2. Sign up (they have a 14-day trial)
3. Note your **App ID** (in Settings → Installation)

#### 2. Add Intercom to Your App

Add to `.env.local`:
```bash
NEXT_PUBLIC_INTERCOM_APP_ID=your-app-id-here
```

Create `src/components/support/IntercomChat.tsx`:

```tsx
"use client";

import { useEffect } from "react";

export function IntercomChat() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!process.env.NEXT_PUBLIC_INTERCOM_APP_ID) return;

    const APP_ID = process.env.NEXT_PUBLIC_INTERCOM_APP_ID;

    window.Intercom("boot", {
      app_id: APP_ID,
    });

    return () => {
      window.Intercom("shutdown");
    };
  }, []);

  return null;
}
```

Add Intercom script to `src/app/layout.tsx` in the `<head>`:

```tsx
<script
  dangerouslySetInnerHTML={{
    __html: `
      (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/${process.env.NEXT_PUBLIC_INTERCOM_APP_ID}';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
    `,
  }}
/>
```

#### 3. Configure Intercom

In Intercom Dashboard:
- Set up **Operator** (bot) for initial responses
- Create **Auto Messages** for common questions
- Configure **Away Mode** for offline hours
- Set up **Team Inbox** for managing conversations

---

## Option 3: Custom Support Email

If you don't want live chat, use email support.

### Setup

1. **Create Support Email**
   - Use `support@gravmap.com`
   - Or use your existing email with forwarding

2. **Email Forwarding**
   - Forward to multiple team members
   - Use email groups (Google Groups, etc.)

3. **Help Scout (Email Management)**
   - Create [Help Scout](https://helpscout.com) account
   - Connect your support email
   - Team inbox for managing tickets

4. **Add to Your App**

```tsx
// Simple support button
<a href="mailto:support@gravmap.com">
  <Button>Contact Support</Button>
</a>
```

---

## Recommended Setup for GravMap

**For MVP/Early Stage:**
1. Use **Crisp Free Tier**
2. Enable email fallback when offline
3. Set availability: 9 AM - 6 PM EST
4. Add welcome auto-message

**For Growth Stage:**
1. Upgrade to **Crisp Pro** or **Intercom**
2. Add knowledge base integration
3. Set up chat triggers
4. Enable user identification
5. Use chat for onboarding

**For Enterprise:**
1. Use **Intercom** with full suite
2. Integrate with CRM (Salesforce, HubSpot)
3. Set up SLA alerts
4. Use custom bots for common questions
5. Advanced analytics and reporting

---

## Support Workflow

### Best Practices

1. **Response Time**
   - Aim for < 2 hours during business hours
   - Set expectations in auto-reply

2. **Canned Responses**
   - Create templates for common questions
   - Include links to help articles

3. **Escalation**
   - Define when to escalate to engineering
   - Create bug report template

4. **Metrics**
   - Track response time
   - Track resolution time
   - Monitor customer satisfaction

5. **Availability**
   - Be transparent about hours
   - Use away mode outside hours
   - Always provide email fallback

---

## Support Email Template

Use this for your support email auto-reply:

```
Subject: We received your message - GravMap Support

Hi there,

Thanks for reaching out to GravMap support! We've received your message and will get back to you within 2 hours during business hours (9 AM - 6 PM EST).

In the meantime, you might find your answer in our Help Center:
https://gravmap.com/help

If this is urgent, please call us at [PHONE NUMBER].

Best,
The GravMap Team
```

---

## Troubleshooting

### Crisp Not Loading
- Check `NEXT_PUBLIC_CRISP_WEBSITE_ID` is set
- Verify script is loaded in browser console
- Check for ad blockers
- Ensure you're in production mode

### Intercom Not Loading
- Check `NEXT_PUBLIC_INTERCOM_APP_ID` is set
- Verify script is in `<head>`
- Check browser console for errors
- Ensure proper initialization

### Chat Not Working on Mobile
- Test on actual devices
- Check responsive settings in Crisp/Intercom
- Verify no CSS conflicts

---

## Cost Comparison

| Service | Free Tier | Paid Tier | Best For |
|---------|-----------|-----------|----------|
| Crisp | Yes (2 agents) | $25/mo | Small teams |
| Intercom | 14-day trial | $74/mo | Growing teams |
| Help Scout | No | $20/mo | Email support |
| Zendesk | No | $55/mo | Enterprise |

**Recommendation**: Start with Crisp Free, upgrade as needed.
