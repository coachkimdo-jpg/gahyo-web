import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EmergencyFloat from '@/components/EmergencyFloat';
import { GoogleAnalytics } from '@next/third-parties/google';
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
        {/* Google Ads Tag (AW-11204427788) */}
        <Script id="gtag-script" strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=AW-11204427788" nonce={nonce} />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-11204427788');
              gtag('event', 'conversion', {'send_to': 'AW-11204427788/CSo8CLaSwLscENX_194p'});
            `,
          }}
        />
        {/* 
          폰트 관련 모든 외부 요청 제거 - 시스템 폰트 사용으로 완전 전환
          Google Analytics는 afterInteractive 전략으로 렌더링 완료 후 로드 
        */}
      </head>
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main style={{ flex: 1 }}>
          {children}
        </main>
        <Footer />
        <EmergencyFloat />
        {/* Google Analytics - 브라우저 유휴 시간에 지연 로드 (성능 최적화) */}
        <GoogleAnalytics gaId="G-4QVQ5GFTLV" nonce={nonce} />
      </body>
    </html>
  );
}
