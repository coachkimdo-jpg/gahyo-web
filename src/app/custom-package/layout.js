export const metadata = {
  title: '상조 직접 구성하기 | 나만의 맞춤 상조 | 가효상조',
  description: '상복, 차량, 도우미, 수의, 유골함 등 필요한 상조 옵션만 직접 골라 나만의 맞춤형 장례를 구성하고 예상 견적을 즉시 확인해 보세요.',
  alternates: {
    canonical: 'https://gahyo.co.kr/custom-package',
  },
  openGraph: {
    title: '상조 직접 구성하기 | 나만의 맞춤 상조 | 가효상조',
    description: '상복, 차량, 도우미, 수의, 유골함 등 필요한 상조 옵션만 직접 골라 나만의 맞춤형 장례를 구성하고 예상 견적을 즉시 확인해 보세요.',
    url: 'https://gahyo.co.kr/custom-package',
    siteName: '후불제상조 가효상조',
    images: [{ url: 'https://gahyo.co.kr/og-image.png', width: 1200, height: 630 }],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '상조 직접 구성하기 | 나만의 맞춤 상조 | 가효상조',
    description: '필요한 상조 옵션만 직접 골라 맞춤형 장례를 구성하고 즉시 견적을 확인하세요.',
    images: ['https://gahyo.co.kr/og-image.png'],
  },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: '상조 직접 구성하기 — 가효상조 맞춤 장례',
    provider: { '@type': 'Organization', name: '가효상조', url: 'https://gahyo.co.kr' },
    serviceType: '맞춤형 장례 서비스',
    areaServed: { '@type': 'Country', name: 'KR' },
    description: '장례지도사, 도우미, 차량, 수의, 유골함 등 필요한 항목만 선택해 나만의 맞춤 장례를 구성하고 즉시 견적을 확인하세요.',
    url: 'https://gahyo.co.kr/custom-package',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: 'https://gahyo.co.kr' },
      { '@type': 'ListItem', position: 2, name: '상조 직접 구성하기', item: 'https://gahyo.co.kr/custom-package' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '상조 상품을 직접 구성하면 어떤 점이 좋나요?',
        acceptedAnswer: { '@type': 'Answer', text: '필요한 항목만 선택하므로 불필요한 비용 없이 합리적인 장례가 가능합니다. 도우미 인원, 차량 거리, 수의 종류 등을 직접 결정해 예상 견적을 즉시 확인할 수 있습니다.' },
      },
      {
        '@type': 'Question',
        name: '직접 구성한 상조를 24시간 긴급 출동에도 이용할 수 있나요?',
        acceptedAnswer: { '@type': 'Answer', text: '네. 가효상조는 24시간 연중무휴로 운영하며, 직접 구성한 상품도 임종 즉시 동일한 출동 서비스를 받으실 수 있습니다. 1551-5718로 전화 주시면 됩니다.' },
      },
    ],
  },
];

export default function CustomPackageLayout({ children }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
