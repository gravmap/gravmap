"use client";

import Script from "next/script";

export function SupportChat() {
  const crispWebsiteId = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID;

  // Only load in production with valid ID
  if (!crispWebsiteId || process.env.NODE_ENV !== "production") {
    return null;
  }

  return (
    <>
      <Script
        id="crisp-widget"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            window.$crisp=[];
            window.CRISP_WEBSITE_ID="${crispWebsiteId}";
            (function(){
              d=document;
              s=d.createElement("script");
              s.src="https://client.crisp.chat/l.js";
              s.async=1;
              d.getElementsByTagName("head")[0].appendChild(s);
            })();
          `,
        }}
      />
    </>
  );
}

// Note: To enable Crisp chat:
// 1. Sign up at https://crisp.chat
// 2. Get your Website ID from Settings → Website Settings
// 3. Add NEXT_PUBLIC_CRISP_WEBSITE_ID=your-id to .env.local
// 4. Uncomment and use this component in layout.tsx
