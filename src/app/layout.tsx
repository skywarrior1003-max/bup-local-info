import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BUP LOCAL TOOLS | 소방·건설 현장 문서 자동화 & 정부지원금",
  description: "소방·건설 현장 실무자를 위한 무료 행정 문서 자동화 서비스. 사진 한 장으로 현장 공문서를 자동 완성하고, 이번 달 정부지원사업과 지원금·혜택 정보를 실시간으로 확인하세요.",
  openGraph: {
    url: "https://bupplatform.com",
    siteName: "BUP LOCAL TOOLS",
    title: "BUP LOCAL TOOLS | 소방·건설 현장 문서 자동화 & 정부지원금",
    description: "소방·건설 현장 실무자를 위한 무료 행정 문서 자동화 서비스. 사진 한 장으로 현장 공문서를 자동 완성하고, 이번 달 정부지원사업과 지원금·혜택 정보를 실시간으로 확인하세요.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;
  const showAdsense = adsenseId && adsenseId !== "나중에_입력" && adsenseId.trim() !== "";

  // WebSite 구조화 데이터 정의
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "BUP LOCAL TOOLS",
    "url": "https://bupplatform.com",
    "description": "소방·건설 현장 실무자를 위한 무료 행정 문서 자동화 서비스와 정부지원금·혜택 정보 제공"
  };

  // BreadcrumbList 구조화 데이터 정의
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "홈",
        "item": "https://bupplatform.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "블로그",
        "item": "https://bupplatform.com/blog"
      }
    ]
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {showAdsense && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className="min-h-full flex flex-col">
        {/* 공통 구조화 데이터 삽입 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
