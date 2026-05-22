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
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': '자연장지(수목장)와 봉안당의 차이는 무엇인가요?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': '자연장지(수목장)는 화장한 골분을 나무, 잔디, 바위 주변에 뿌리거나 묻는 방식으로 자연 친화적인 장법입니다. 봉안당은 실내 또는 실외 봉안함에 골분을 안치하는 형태로, 정기적인 참배가 용이합니다.'
          }
        },
        {
          '@type': 'Question',
          'name': '가효상조를 통해 장지를 이용하면 어떤 혜택이 있나요?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': '가효상조 고객은 제휴 장지 이용 시 할인 혜택, 우선 예약, 장지 동행 서비스를 제공받을 수 있습니다. 전담 장례지도사가 장지 선택부터 안치까지 밀착 지원합니다.'
          }
        }
      ]
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
