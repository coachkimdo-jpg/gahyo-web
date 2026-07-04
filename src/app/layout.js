import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EmergencyFloat from '@/components/EmergencyFloat';

import Script from 'next/script';
import { headers } from 'next/headers';
import { Noto_Serif_KR } from 'next/font/google';

// Noto Serif KR — next/font으로 자체 호스팅 (렌더 차단 없음)
const notoSerifKR = Noto_Serif_KR({
  weight: ['600', '700', '900'],
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  preload: false,
});

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
  description: '필요한 것만 골라 직접 구성하는 100% 후불제 상조. 가입비·월납입금 0원. 24시간 출동. 전국 200개 제휴 장례식장.',
  keywords: ['가효상조', '장례', '장례식장', '장례 견적', 'AI 장례', '수목장', '봉안당', '장례 가이드'],
  openGraph: {
    title: '가효상조 | AI 기반 투명한 장례 서비스',
    description: '필요한 것만 골라 직접 구성하는 100% 후불제 상조. 가입비·월납입금 0원. 24시간 출동. 전국 200개 제휴 장례식장.',
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
    description: '필요한 것만 골라 직접 구성하는 100% 후불제 상조. 가입비·월납입금 0원. 24시간 출동. 전국 200개 제휴 장례식장.',
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

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: '가효상조',
  legalName: '주식회사 가효상조',
  url: 'https://gahyo.co.kr',
  logo: 'https://gahyo.co.kr/logo.png',
  telephone: '1551-5718',
  email: 'gahyofuneral@naver.com',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'KR',
    addressRegion: '경기도',
    addressLocality: '시흥시',
    streetAddress: '은행로167번길 3, 6층 601-b21호(대야동, 대원빌딩)',
    postalCode: '15022',
  },
  founder: {
    '@type': 'Person',
    name: '김도훈',
    jobTitle: '대표 / 국가공인 장례지도사 1급',
    url: 'https://gahyo.co.kr/authors/kim-do-hun',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '1551-5718',
    contactType: 'customer service',
    availableLanguage: 'Korean',
    hoursAvailable: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
  },
  sameAs: [
    'https://pf.kakao.com/_ntRdX',
  ],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: '가효상조',
  url: 'https://gahyo.co.kr',
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: 'https://gahyo.co.kr/halls?q={search_term_string}' },
    'query-input': 'required name=search_term_string',
  },
};

export default async function RootLayout({ children }) {
  const headersList = await headers();
  const nonce = headersList.get('x-nonce') || '';

  return (
    <html lang="ko" className={notoSerifKR.variable}>
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Organization + WebSite JSON-LD — E-E-A-T 신뢰도 신호 */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationJsonLd, websiteJsonLd]) }} />
        {/* Pretendard — afterInteractive로 비동기 로딩 (렌더 차단 없음) */}
        <Script
          id="pretendard-font"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `var l=document.createElement('link');l.rel='stylesheet';l.href='https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css';document.head.appendChild(l);`
          }}
        />
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
        {/* NAVER 공통 스크립트 — PV 이벤트 (전환 추적) */}
        <Script
          id="naver-wcs"
          strategy="afterInteractive"
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                var s=document.createElement('script');
                s.type='text/javascript';
                s.src='//wcs.naver.net/wcslog.js';
                s.onload=function(){
                  if(!window.wcs_add) window.wcs_add={};
                  window.wcs_add['wa']='s_4f49c7e0fd2c';
                  if(window.wcs) window.wcs.inflow('gahyo.co.kr');
                  window.wcs_do();
                };
                document.head.appendChild(s);
              })();
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
