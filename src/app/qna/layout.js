export const metadata = {
  title: '고객 문의/상담 | 가효상조',
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
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'item': { '@id': 'https://gahyo.co.kr/', 'name': '홈' } },
      { '@type': 'ListItem', 'position': 2, 'item': { '@id': 'https://gahyo.co.kr/qna', 'name': '고객 문의/상담' } }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
