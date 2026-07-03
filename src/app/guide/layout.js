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

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: '장례 가이드 | 가효상조',
    url: 'https://gahyo.co.kr/guide',
    description: '투명하고 올바른 장례 문화를 위한 가효상조 장례 가이드. 복잡한 절차와 비용, 예절을 전문가가 쉽게 설명합니다.',
    publisher: { '@type': 'Organization', name: '가효상조', url: 'https://gahyo.co.kr' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: 'https://gahyo.co.kr' },
      { '@type': 'ListItem', position: 2, name: '장례 가이드', item: 'https://gahyo.co.kr/guide' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '임종 직후 가장 먼저 해야 할 일은 무엇인가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '임종 직후에는 담당 의사에게 사망 확인을 받고 사망진단서를 발급받아야 합니다. 그 후 장례식장을 선택하고 발인 일정을 잡은 뒤, 가족과 지인에게 부고를 전달합니다. 가효상조 1551-5718로 연락하시면 24시간 안내해 드립니다.',
        },
      },
      {
        '@type': 'Question',
        name: '장례비용은 얼마나 드나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '장례비용은 장례 규모와 선택 항목에 따라 다르지만 가효상조 후불제 상조 상품은 120만 원(무빈소)부터 363만 원까지 다양합니다. 별도 비용 없이 필요한 항목만 선택할 수 있으며, 가입 없이 후불제로 이용 가능합니다.',
        },
      },
      {
        '@type': 'Question',
        name: '사망신고는 어디서 하나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '사망신고는 사망한 날로부터 1개월 이내에 주민센터(주소지 또는 사망지)에 사망진단서와 신고인 신분증을 지참하여 방문하거나 정부24 온라인 서비스를 통해 신고할 수 있습니다.',
        },
      },
    ],
  },
];

export default function GuideLayout({ children }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
