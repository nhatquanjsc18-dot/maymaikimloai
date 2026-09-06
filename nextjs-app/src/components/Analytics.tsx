import Script from "next/script";
import { gaId } from "@/lib/site";

/**
 * Google Analytics (GA4). Đổi mã đo ở data/site.json -> analytics.googleId.
 * Rỗng thì không chèn gì cả, không phải sửa code.
 */
export function Analytics() {
  if (!gaId) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){ dataLayer.push(arguments); }
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
    </>
  );
}
