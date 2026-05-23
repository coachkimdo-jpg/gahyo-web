import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EmergencyFloat from '@/components/EmergencyFloat';
import { GoogleAnalytics } from '@next/third-parties/google';
import localFont from 'next/font/local';

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
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
  verification: {
    google: 'CJBXE0jA-ox9kHs8ipsak4jPMu6k03NuLP-IX3i0PDA',
    other: {
      'naver-site-verification': [
        '74a731071fccb2f8a7e9ca1ac21f6ed2ac8645f5', // https://gahyo.co.kr
        '0e63c406b4c061891409f2ec1c6ba6b642f521b2', // http://www.gahyo.co.kr
      ],
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <head>
      </head>
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main style={{ flex: 1 }}>
          {children}
        </main>
        <Footer />
        <EmergencyFloat />
      </body>
      <GoogleAnalytics gaId="G-4QVQ5GFTLV" />
    </html>
  );
}
