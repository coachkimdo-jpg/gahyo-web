export const metadata = {
  title: '고객 문의/상담',
  description: '가효상조 장례 서비스, 후불제 상조 가입, 장례 비용 등에 대해 궁금한 점을 남겨주시면 성심성의껏 답변해 드립니다.',
  alternates: {
    canonical: 'https://gahyo.co.kr/qna',
  },
  openGraph: {
    title: '고객 문의/상담 | 가효상조',
    description: '가효상조 장례 서비스, 후불제 상조 가입 등에 대해 궁금한 점을 문의하세요.',
    url: 'https://gahyo.co.kr/qna',
    siteName: '후불제상조 가효상조',
    images: [{ url: 'https://gahyo.co.kr/og-image.png', width: 1200, height: 630 }],
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function QnaLayout({ children }) {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'item': { '@id': 'https://gahyo.co.kr/', 'name': '홈' } },
        { '@type': 'ListItem', 'position': 2, 'item': { '@id': 'https://gahyo.co.kr/qna', 'name': '고객 문의/상담' } }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': '문의글을 남기면 답변은 얼마나 걸리나요?',
          'acceptedAnswer': { '@type': 'Answer', 'text': '평일 기준 영업일 1일 이내에 답변드리는 것을 원칙으로 하며, 급한 사안은 전화(1551-5718)로 문의하시면 더 빠르게 도움받으실 수 있습니다.' }
        },
        {
          '@type': 'Question',
          'name': '비공개(비밀글)로 작성하면 어떻게 되나요?',
          'acceptedAnswer': { '@type': 'Answer', 'text': '작성 시 설정한 비밀번호를 입력해야만 본인과 답변자만 내용을 열람할 수 있습니다. 연락처나 가족 상황 등 민감한 내용을 남기실 때 이용해 주세요.' }
        },
        {
          '@type': 'Question',
          'name': '전화 상담과 게시판 문의 중 어떤 것이 더 빠른가요?',
          'acceptedAnswer': { '@type': 'Answer', 'text': '가장 빠른 응대는 1551-5718 전화 상담이며, 24시간 연중무휴로 운영됩니다. 게시판은 통화가 어려운 시간대에 기록을 남기고 싶으실 때 이용하시면 좋습니다.' }
        }
      ]
    }
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
