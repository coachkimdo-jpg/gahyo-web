export const metadata = {
  title: 'AI 장례 견적 계산기 | 지역별 장례비용 무료 조회 — 가효상조',
  description: '지역, 장례식장, 조문객 수를 선택하면 즉시 장례비용 예상 견적을 무료로 산출해 드립니다. 빈소 대여료·식대·제단비까지 항목별 상세 내역을 투명하게 확인하세요.',
  openGraph: {
    title: 'AI 장례 견적 계산기 | 가효상조',
    description: '지역과 장례식장을 선택하면 즉시 맞춤형 장례비용 견적을 무료로 확인할 수 있습니다.',
  }
};

export default function EstimateLayout({ children }) {
  const today = new Date().toISOString().split('T')[0];

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'item': { '@id': 'https://gahyo.co.kr/', 'name': '홈' } },
        { '@type': 'ListItem', 'position': 2, 'item': { '@id': 'https://gahyo.co.kr/estimate', 'name': '무료 장례 견적' } }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      'name': '가효상조 AI 장례 견적 계산기',
      'url': 'https://gahyo.com/estimate',
      'description': '지역, 장례식장, 조문객 수를 입력하면 맞춤형 장례비용 예상 견적을 무료로 즉시 계산합니다.',
      'applicationCategory': 'LifestyleApplication',
      'operatingSystem': 'All',
      'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'KRW' },
      'provider': {
        '@type': 'Organization',
        'name': '가효상조',
        'url': 'https://gahyo.com',
        'telephone': '1551-5718'
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      'headline': 'AI 장례 견적 계산기 — 지역별 장례비용 투명 조회',
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
      '@type': 'HowTo',
      'name': '가효상조 AI 장례 견적 계산기 사용 방법',
      'description': '4단계로 맞춤형 장례비용 견적을 무료로 계산하는 방법',
      'step': [
        { '@type': 'HowToStep', 'position': 1, 'name': '지역(시/도) 선택', 'text': '장례를 치를 시/도를 선택합니다.' },
        { '@type': 'HowToStep', 'position': 2, 'name': '시/군/구 선택', 'text': '해당 지역의 시/군/구를 선택합니다.' },
        { '@type': 'HowToStep', 'position': 3, 'name': '장례식장 선택', 'text': '원하는 장례식장을 선택합니다.' },
        { '@type': 'HowToStep', 'position': 4, 'name': '조문객 수 선택', 'text': '예상 조문객 수를 선택하면 맞춤 견적이 즉시 산출됩니다.' }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': '장례비용 견적에 가효상조 상품 금액도 포함되나요?',
          'acceptedAnswer': { '@type': 'Answer', 'text': '아니요. 이 견적 계산기는 장례식장 시설 사용료, 식대, 제단 비용 등 현장 실비만 계산합니다. 가효상조의 의전 서비스(장례지도사, 수의, 차량 등)는 별도 상품가로 투명하게 안내됩니다.' }
        },
        {
          '@type': 'Question',
          'name': '장례비용 견적은 실제 비용과 얼마나 차이가 나나요?',
          'acceptedAnswer': { '@type': 'Answer', 'text': '이 계산기는 장례식장 실제 고지 요금과 평균 식대를 기반으로 산출된 예상값입니다. 선택하는 빈소 등급, 제단 장식, 조문객 실제 수에 따라 ±20% 내외의 차이가 발생할 수 있습니다. 정확한 견적은 가효상조 1:1 상담을 통해 확인하세요.' }
        },
        {
          '@type': 'Question',
          'name': '화장장 이용료와 납골당 비용은 왜 포함되지 않나요?',
          'acceptedAnswer': { '@type': 'Answer', 'text': '화장장 이용료는 지자체별로 다르며, 납골당(봉안당)·자연장지 등 장지 비용은 선택에 따라 편차가 매우 크기 때문에 별도 상담으로 정확한 내역을 안내해 드립니다.' }
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
