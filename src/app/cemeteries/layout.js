export const metadata = {
  title: '전국 장지(자연장지·봉안당·묘지) 찾기 | 모실곳 안내',
  description: '수목장, 자연장지, 봉안당, 평장 묘지까지 전국 장지 정보를 지역별로 무료 검색하세요. 가효상조를 통하면 할인 및 특별 혜택이 제공됩니다.',
  openGraph: {
    title: '전국 자연장지·봉안당·묘지 찾기 | 가효상조',
    description: '전국 장지 정보를 지역별로 검색하고, 가효상조의 맞춤 장지 컨설팅을 받아보세요.',
    url: 'https://gahyo.co.kr/cemeteries',
    siteName: '후불제상조 가효상조',
    images: [{ url: 'https://gahyo.co.kr/og-image.png', width: 1200, height: 630 }],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '전국 자연장지·봉안당·묘지 찾기 | 가효상조',
    description: '수목장, 봉안당, 평장 묘지까지 전국 장지 정보를 지역별로 무료 검색하세요.',
    images: ['https://gahyo.co.kr/og-image.png'],
  },
  alternates: {
    canonical: 'https://gahyo.co.kr/cemeteries',
  },
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
        '@type': 'Person',
        'name': '김도훈',
        'jobTitle': '국가공인 장례지도사 1급',
        'url': 'https://gahyo.co.kr/authors/kim-do-hun',
        'worksFor': { '@type': 'Organization', 'name': '가효상조', 'url': 'https://gahyo.co.kr' }
      },
      'dateModified': today,
      'datePublished': '2023-01-01',
      'publisher': {
        '@type': 'Organization',
        'name': '가효상조',
        'logo': { '@type': 'ImageObject', 'url': 'https://gahyo.co.kr/logo.png' }
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

      {/* 크롤러용 정적 장지 유형 상세 안내 — SSR로 Googlebot 가시성 보장 */}
      <section aria-label="장지 유형별 상세 안내" style={{ background: 'white', padding: '4rem 1.25rem', borderTop: '1px solid #e2e8f0' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '0.5rem', paddingBottom: '0.75rem', borderBottom: '3px solid var(--gold)' }}>
            장지 유형별 완벽 가이드
          </h2>
          <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '2rem' }}>
            고인을 모실 장지는 크게 자연장지(수목장), 봉안당(납골당), 평장 묘지로 나뉩니다. 국가공인 장례지도사 1급 김도훈이 각 유형의 차이와 비용, 절차를 상세히 안내합니다.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
            {[
              {
                icon: '🌲',
                title: '자연장지 (수목장)',
                desc: '화장한 골분(분골)을 나무·잔디·바위 기점에 안치하는 친환경 장법입니다. 별도의 묘비 없이 자연과 하나 되는 안치 방식으로, 사후 자연으로 돌아가고자 하는 분들이 많이 선택합니다. 반드시 화장을 진행한 후 이용할 수 있으며, 시설에 따라 0.25평~0.5평 단위로 안치 공간이 달라집니다. 가격은 50만 원~수천만 원까지 시설마다 다르며 사전 상담이 필수입니다.',
              },
              {
                icon: '🏛️',
                title: '봉안당 (납골당)',
                desc: '화장한 골분을 봉안함(유골함)에 담아 실내·실외 봉안 시설에 안치하는 방식입니다. 정기적인 참배와 제례를 드리기 쉬운 것이 장점입니다. 공설 봉안당(구청·시청 운영)과 사설 봉안당이 있으며, 공설은 저렴하지만 대기 기간이 있습니다. 안치 기간은 보통 15년~60년 단위로 계약하며, 연장도 가능합니다.',
              },
              {
                icon: '⛰️',
                title: '평장 묘지 (전통 매장)',
                desc: '전통적인 매장 방식으로 고인을 지하에 안치하는 형태입니다. 공설묘지와 사설묘지가 있으며, 관할 지자체의 허가를 받아야 합니다. 매장 후에도 묘지 관리와 이전 문제가 생길 수 있어 사전에 충분한 검토가 필요합니다. 최근에는 화장 후 매장(화매장) 방식도 선택이 가능합니다.',
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{ background: '#f8fafc', borderRadius: '12px', padding: '1.75rem', border: '1px solid #e2e8f0', display: 'flex', gap: '1.25rem' }}>
                <div style={{ fontSize: '2rem', flexShrink: 0 }}>{icon}</div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '0.5rem' }}>{title}</h3>
                  <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.7, margin: 0 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: 'linear-gradient(135deg, var(--navy), var(--navy-dark))', borderRadius: '12px', padding: '1.75rem', color: 'white', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '0.5rem' }}>장지 선택이 어려우신가요?</h3>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', marginBottom: '1.25rem' }}>
              국가공인 장례지도사 1급 김도훈이 고인의 종교·예산·유족 선호에 맞는 장지를 직접 안내합니다.
            </p>
            <a href="tel:1551-5718" style={{ display: 'inline-block', background: '#c0392b', color: 'white', padding: '0.8rem 2rem', borderRadius: '999px', fontWeight: '800', fontSize: '1rem', textDecoration: 'none' }}>
              📞 1551-5718 무료 상담
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
