export const metadata = {
  title: '전국 장지(자연장지·봉안당·묘지) 찾기 | 가효상조 모실곳 안내',
  description: '수목장, 자연장지, 봉안당, 평장 묘지까지 전국 장지 정보를 지역별로 무료 검색하세요. 가효상조를 통하면 할인 및 특별 혜택이 제공됩니다.',
  openGraph: {
    title: '전국 자연장지·봉안당·묘지 찾기 | 가효상조',
    description: '가효상조 고객 전용 할인 혜택이 적용되는 전국 장지 정보를 지역별로 검색하세요.',
  }
};

export default function CemeteriesLayout({ children }) {
  const today = new Date().toISOString().split('T')[0];

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'item': { '@id': 'https://gahyo.co.kr/', 'name': '홈' } },
        { '@type': 'ListItem', 'position': 2, 'item': { '@id': 'https://gahyo.co.kr/cemeteries', 'name': '장지 안내' } }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      'headline': '전국 자연장지·봉안당·묘지 찾기 — 지역별 장지 정보 안내',
      'author': {
        '@type': 'Organization',
        'name': '가효상조',
        'url': 'https://gahyo.com'
      },
      'dateModified': today,
      'datePublished': '2023-01-01',
      'publisher': {
        '@type': 'Organization',
        'name': '가효상조',
        'logo': { '@type': 'ImageObject', 'url': 'https://gahyo.com/logo.png' }
      }
    }
  ];

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
