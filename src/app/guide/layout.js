export const metadata = {
  title: '장례 가이드 | 가효상조',
  description: '투명하고 올바른 장례 문화를 위한 가효상조 장례 가이드입니다. 복잡한 절차와 비용, 예절을 전문가가 쉽게 알려드립니다.',
  alternates: {
    canonical: 'https://gahyo.co.kr/guide',
  },
  openGraph: {
    title: '장례 가이드 | 가효상조',
    description: '장례 절차, 비용, 예절을 전문가가 쉽게 설명합니다. 임종 후 해야 할 일부터 장지 선택까지.',
    url: 'https://gahyo.co.kr/guide',
    siteName: '후불제상조 가효상조',
    images: [{ url: 'https://gahyo.co.kr/og-image.png', width: 1200, height: 630 }],
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function GuideLayout({ children }) {
  return <>{children}</>;
}
