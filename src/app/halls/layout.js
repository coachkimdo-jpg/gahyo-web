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

const REGION_SEO = [
  { region: '서울', desc: '강남구·강서구·송파구 등 서울 전역 장례식장' },
  { region: '경기', desc: '수원·성남·고양·용인·시흥 등 경기도 장례식장' },
  { region: '인천', desc: '남동구·부평구·서구 등 인천광역시 장례식장' },
  { region: '부산', desc: '해운대·사상·동래 등 부산광역시 장례식장' },
  { region: '대구', desc: '수성구·달서구·동구 등 대구광역시 장례식장' },
  { region: '대전', desc: '유성구·서구·동구 등 대전광역시 장례식장' },
  { region: '광주', desc: '북구·서구·광산구 등 광주광역시 장례식장' },
  { region: '울산', desc: '남구·북구·울주군 등 울산광역시 장례식장' },
];

export default function HallsLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}

      {/* 크롤러용 정적 지역 안내 섹션 — SSR 렌더링으로 Googlebot 가시성 보장 */}
      <section aria-label="지역별 장례식장 안내" style={{ background: 'white', padding: '4rem 1.25rem', borderTop: '1px solid #e2e8f0' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '0.5rem', paddingBottom: '0.75rem', borderBottom: '3px solid var(--gold)' }}>
            지역별 장례식장 안내
          </h2>
          <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '2rem' }}>
            가효상조는 전국 500여 개 장례식장과 제휴하고 있습니다. 거주 지역에서 가까운 장례식장을 빠르게 연결해 드립니다. 위 검색창에서 시·도와 구·군을 선택하거나, 아래 지역을 참고하여 24시간 상담(1551-5718)을 이용하세요.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            {REGION_SEO.map(({ region, desc }) => (
              <div key={region} style={{ background: '#f8fafc', borderRadius: '10px', padding: '1.25rem', border: '1px solid #e2e8f0' }}>
                <div style={{ fontWeight: '800', color: 'var(--navy)', fontSize: '1rem', marginBottom: '0.35rem' }}>{region} 장례식장</div>
                <div style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5 }}>{desc}</div>
              </div>
            ))}
          </div>
          <div style={{ background: '#f1f5f9', borderRadius: '10px', padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '0.5rem' }}>가효상조 장례식장 섭외 서비스</h3>
            <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.7, margin: 0 }}>
              원하시는 지역의 장례식장을 직접 찾기 어려우시다면 24시간 전화 상담(1551-5718)으로 문의해 주세요. 국가공인 장례지도사 1급 김도훈이 거주지와 예산에 맞는 장례식장을 즉시 안내해 드립니다. 가입비 없이 100% 후불제로 진행되며, 상품 내 의전 서비스 추가금은 일절 없습니다.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
