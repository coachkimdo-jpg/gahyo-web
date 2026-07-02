import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EmergencyFloat from '@/components/EmergencyFloat';

import Script from 'next/script';
import { headers } from 'next/headers';

export const metadata = {
  metadataBase: new URL('https://gahyo.co.kr'),
  icons: {
    icon: 'https://gahyo.co.kr/favicon.ico',
    shortcut: 'https://gahyo.co.kr/favicon.ico',
    apple: 'https://gahyo.co.kr/favicon.ico',
  },
  title: {
    default: '가효상조 | 슬픔을 위로하는 기술, 투명한 장례 파트너',
    template: '%s | 가효상조',
  },
  description: 'AI 기반 장례 견적부터 전국 장례식장 검색, 장지 안내까지. 가효상조와 함께 품격 있는 작별을 준비하세요.',
  keywords: ['가효상조', '장례', '장례식장', '장례 견적', 'AI 장례', '수목장', '봉안당', '장례 가이드'],
  openGraph: {
    title: '가효상조 | AI 기반 투명한 장례 서비스',
    description: 'AI 기반 장례 견적부터 전국 장례식장 검색, 장지 안내까지. 가효상조와 함께 품격 있는 작별을 준비하세요.',
    url: 'https://gahyo.co.kr',
    siteName: '후불제상조 가효상조',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '가효상조 프리미엄 장례 서비스',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  alternates: {
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
  robots: {
    index: true,
    follow: true,
    imagePreview: 'large',
  },
  twitter: {
    card: 'summary_large_image',
    title: '가효상조 | AI 기반 투명한 장례 서비스',
    description: 'AI 기반 장례 견적부터 전국 장례식장 검색, 장지 안내까지. 가효상조와 함께 품격 있는 작별을 준비하세요.',
    images: ['https://gahyo.co.kr/og-image.png'],
  },
  verification: {
    google: 'CJBXE0jA-ox9kHs8ipsak4jPMu6k03NuLP-IX3i0PDA',
    other: {
      'naver-site-verification': [
        '74a731071fccb2f8a7e9ca1ac21f6ed2ac8645f5',
        '0e63c406b4c061891409f2ec1c6ba6b642f521b2',
      ],
    },
  },
};

export default async function RootLayout({ children }) {
  const headersList = await headers();
  const nonce = headersList.get('x-nonce') || '';

  return (
    <html lang="ko">
      <head>
        {/* 폰트 preconnect — DNS 미리 연결 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />

        {/* Pretendard 동적 서브셋 — 비동기 로딩 (렌더링 비차단) */}
        <link
          rel="stylesheet"
          as="style"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
          onLoad="this.onload=null;this.rel='stylesheet'"
        />
        <noscript>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" />
        </noscript>

        {/* Noto Serif KR — 비동기 로딩 */}
        <link
          rel="stylesheet"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@600;700;900&display=swap"
          onLoad="this.onload=null;this.rel='stylesheet'"
        />
        <noscript>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@600;700;900&display=swap" />
        </noscript>
      </head>
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Trusted Types Default Policy to allow React hydration */}
        <script nonce={nonce} dangerouslySetInnerHTML={{
          __html: `
            if (typeof window !== 'undefined' && window.trustedTypes && window.trustedTypes.createPolicy) {
              try {
                window.trustedTypes.createPolicy('default', {
                  createHTML: function(s) { return s; },
                  createScript: function(s) { return s; },
                  createScriptURL: function(s) { return s; }
                });
              } catch (e) {}
            }
          `
        }} />
        {/* Google Ads & Analytics — afterInteractive: 페이지 인터랙티브 후 로드 */}
        <Script
          id="gtag-script"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=AW-11204427788"
          nonce={nonce}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-11204427788', { send_page_view: true });
              gtag('config', 'G-4QVQ5GFTLV', { send_page_view: true });
            `,
          }}
        />
        <Header />
        <main role="main" style={{ flex: 1 }}>
          {children}
        </main>
        <Footer />
        <EmergencyFloat />

      </body>
    </html>
  );
}
