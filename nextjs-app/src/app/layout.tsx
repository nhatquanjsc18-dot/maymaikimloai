import type { Metadata } from "next";
import { Exo, Public_Sans } from "next/font/google";
import "./globals.css";
import { Header, TopBar } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { company, SITE_NAME, SITE_URL, absUrl } from "@/lib/site";

const exo = Exo({
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-exo",
  display: "swap",
});

const publicSans = Public_Sans({
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-public",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Máy Mài Kim Loại — Dụng cụ khí nén công nghiệp Dynabrade chính hãng USA",
    template: "%s | Máy Mài Kim Loại",
  },
  description:
    "Máy mài kim loại khí nén công nghiệp Dynabrade — Made in USA. 860 model máy mài góc, mài thẳng, mài bút, cắt đá, mài băng nhám. Tư vấn kỹ thuật, demo tại xưởng, bảo hành 12 tháng.",
  keywords: [
    "máy mài kim loại",
    "máy mài kim loại khí nén",
    "máy mài góc khí nén",
    "máy mài bút",
    "máy mài băng nhám",
    "máy cắt kim loại",
    "Dynabrade",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Máy Mài Kim Loại — Dụng cụ khí nén công nghiệp Dynabrade",
    description:
      "860 model máy mài kim loại khí nén Dynabrade. Lọc theo dải vòng quay, xem đủ bảng thông số, nhận báo giá trong 2 giờ.",
  },
  robots: { index: true, follow: true },
};

const orgLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.name,
  alternateName: SITE_NAME,
  url: SITE_URL,
  telephone: company.phones,
  email: company.emails[0],
  address: {
    "@type": "PostalAddress",
    streetAddress: company.address,
    addressLocality: "TP. Hồ Chí Minh",
    addressCountry: "VN",
  },
  sameAs: [company.website],
};

const siteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "vi-VN",
  potentialAction: {
    "@type": "SearchAction",
    target: absUrl("/san-pham/?q={search_term_string}"),
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${exo.variable} ${publicSans.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([orgLd, siteLd]) }}
        />
        <TopBar />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
