const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '홈', item: 'https://gahyo.co.kr' },
        { '@type': 'ListItem', position: 2, name: '전국 장례식장 찾기', item: 'https://gahyo.co.kr/halls' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: '가까운 장례식장을 어떻게 찾을 수 있나요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '가효상조 장례식장 찾기 페이지에서 시/도, 구/군을 선택하거나 이름으로 검색하시면 전국 500여 개 제휴 장례식장 정보를 확인하실 수 있습니다.',
          },
        },
        {
          '@type': 'Question',
          name: '장례식장 예약은 어떻게 하나요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '가효상조 24시간 전화 상담(1551-5718)으로 문의하시면 거주지와 예산에 맞는 장례식장을 즉시 섭외해 드립니다. 가입비 없이 100% 후불제로 진행됩니다.',
          },
        },
        {
          '@type': 'Question',
          name: '장례식장 비용은 얼마인가요?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '장례식장 이용 비용은 규모, 지역, 시설에 따라 다릅니다. 가효상조는 AI 기반 견적 서비스로 투명하게 비용을 안내하며, 사용한 서비스에 대해서만 후불로 비용을 청구합니다.',
          },
        },
      ],
    },
  ],
};

export const metadata = {
  title: {
    absolute: '전국 장례식장 찾기 | 가효상조',
  },
  description: '전국 500여 개 제휴 장례식장 정보, 빈소 현황, 주차 및 이용 요금을 한눈에 확인하세요. 지역별 검색으로 가까운 장례식장을 무료로 찾아보세요.',
  alternates: {
    canonical: 'https://gahyo.co.kr/halls',
  },
  openGraph: {
    title: '전국 장례식장 찾기 | 가효상조',
    description: '전국 500여 개 제휴 장례식장 정보를 지역별로 검색하세요. 24시간 무료 상담 1551-5718.',
    url: 'https://gahyo.co.kr/halls',
    siteName: '후불제상조 가효상조',
    images: [{ url: 'https://gahyo.co.kr/og-image.png', width: 1200, height: 630, alt: '전국 장례식장 찾기 - 가효상조' }],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '전국 장례식장 찾기 | 가효상조',
    description: '전국 500여 개 제휴 장례식장 정보를 지역별로 검색하세요.',
    images: ['https://gahyo.co.kr/og-image.png'],
  },
};

export default function HallsLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
