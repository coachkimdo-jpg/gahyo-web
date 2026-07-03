import Link from 'next/link';
import HallStickyBar from '@/components/HallStickyBar';

export const metadata = {
  title: '김도훈 장례지도사 | 국가공인 1급 | 가효상조',
  description: '가효상조 대표 김도훈은 보건복지부 국가공인 장례지도사 1급(자격증 제 서울-2026-00016호)으로, 유가족이 경황없는 순간에도 투명하고 정직한 장례를 받을 수 있도록 가효상조를 설립했습니다.',
  alternates: {
    canonical: 'https://gahyo.co.kr/authors/kim-do-hun',
  },
  openGraph: {
    title: '김도훈 장례지도사 | 국가공인 1급 | 가효상조',
    description: '가효상조 대표 / 국가공인 장례지도사 1급 김도훈의 전문가 프로필입니다.',
    url: 'https://gahyo.co.kr/authors/kim-do-hun',
    siteName: '후불제상조 가효상조',
    images: [{ url: 'https://gahyo.co.kr/og-image.png', width: 1200, height: 630 }],
    locale: 'ko_KR',
    type: 'profile',
  },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: '김도훈',
    givenName: '도훈',
    familyName: '김',
    jobTitle: '국가공인 장례지도사 1급 / 가효상조 대표',
    url: 'https://gahyo.co.kr/authors/kim-do-hun',
    worksFor: {
      '@type': 'Organization',
      name: '가효상조',
      url: 'https://gahyo.co.kr',
    },
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      name: '장례지도사 1급',
      credentialCategory: '국가기술자격',
      identifier: '제 서울-2026-00016호',
      recognizedBy: {
        '@type': 'Organization',
        name: '보건복지부',
      },
    },
    knowsAbout: ['장례 절차', '후불제 상조', '사망신고', '장례비용', '장지 선택', '수목장', '봉안당'],
    sameAs: ['https://gahyo.co.kr'],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: 'https://gahyo.co.kr' },
      { '@type': 'ListItem', position: 2, name: '전문가 프로필', item: 'https://gahyo.co.kr/authors/kim-do-hun' },
    ],
  },
];

export default function AuthorKimDoHunPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HallStickyBar subtitle="전문가 직접 상담" />

      <div style={{ background: '#f8f9fa', minHeight: '100vh', paddingBottom: '6rem' }}>

        {/* 프로필 헤더 */}
        <header style={{ background: 'linear-gradient(135deg, var(--navy-dark) 0%, var(--navy) 100%)', padding: '5rem 1rem 4rem', color: 'white' }}>
          <div className="container" style={{ maxWidth: '760px' }}>
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
              {/* 아바타 */}
              <div style={{ width: '96px', height: '96px', borderRadius: '50%', background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', flexShrink: 0, border: '3px solid rgba(255,255,255,0.3)' }}>
                👨‍💼
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', color: 'var(--gold)', fontWeight: '700', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                  전문가 프로필
                </div>
                <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', fontWeight: '900', margin: '0 0 0.5rem', letterSpacing: '-0.02em' }}>
                  김도훈
                </h1>
                <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.85)', margin: 0 }}>
                  가효상조 대표 · 국가공인 장례지도사 1급
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="container" style={{ maxWidth: '760px', padding: '2.5rem 1rem 0' }}>

          {/* 자격증 배지 */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {[
              { icon: '🏅', label: '국가공인 장례지도사 1급', sub: '제 서울-2026-00016호' },
              { icon: '🏢', label: '가효상조 대표', sub: '사업자 733-32-01721' },
              { icon: '📋', label: '관할기관', sub: '보건복지부' },
            ].map((badge) => (
              <div key={badge.label} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '0.85rem 1.1rem', display: 'flex', gap: '0.75rem', alignItems: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
                <span style={{ fontSize: '1.4rem' }}>{badge.icon}</span>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#1e293b' }}>{badge.label}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{badge.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* 소개 */}
          <section style={{ background: 'white', borderRadius: '14px', padding: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '3px solid var(--gold)' }}>
              전문가 소개
            </h2>
            <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#334155', marginBottom: '1rem' }}>
              김도훈은 보건복지부 국가공인 장례지도사 1급 자격을 보유한 장례 전문가로, 가효상조를 설립하여 대표를 맡고 있습니다.
            </p>
            <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#334155', marginBottom: '1rem' }}>
              장례 서비스 현장에서 직접 경험한 부당한 추가 청구, 저질 용품 끼워넣기, 업그레이드 유도 등의 문제를 해결하기 위해 <strong>100% 후불제·완전 확정가</strong> 방식의 가효상조를 만들었습니다.
            </p>
            <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#334155', margin: 0 }}>
              유가족이 가장 어려운 순간에 투명하고 정직한 장례 서비스를 받을 수 있도록 24시간 직접 상담에 임하고 있습니다.
            </p>
          </section>

          {/* 전문 분야 */}
          <section style={{ background: 'white', borderRadius: '14px', padding: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '3px solid var(--gold)' }}>
              전문 분야
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['후불제 장례 서비스', '장례 절차 안내', '장례비용 최적화', '사망신고 행정 지원', '장지 선택 (수목장·봉안당)', '상속 법률 상담 연계', '24시간 긴급 출동'].map((area) => (
                <span key={area} style={{ background: '#f1f5f9', color: '#334155', padding: '0.4rem 0.9rem', borderRadius: '999px', fontSize: '0.875rem', fontWeight: '600' }}>
                  {area}
                </span>
              ))}
            </div>
          </section>

          {/* 작성한 가이드 */}
          <section style={{ background: 'white', borderRadius: '14px', padding: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '3px solid var(--gold)' }}>
              작성·감수한 장례 가이드
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1.25rem' }}>
              본 가이드는 김도훈 장례지도사가 실제 현장 경험과 검증된 행정 절차를 바탕으로 직접 작성·감수했습니다.
            </p>
            <Link href="/guide" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', background: 'var(--navy)', color: 'white', borderRadius: '8px', fontWeight: '700', fontSize: '0.9rem', textDecoration: 'none' }}>
              📚 전체 장례 가이드 보기 →
            </Link>
          </section>

          {/* CTA */}
          <div style={{ background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-dark) 100%)', borderRadius: '14px', padding: '2rem', textAlign: 'center', color: 'white' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '0.5rem' }}>김도훈 대표에게 직접 상담하세요</h2>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)', marginBottom: '1.5rem' }}>24시간 연중무휴 · 전화 즉시 연결</p>
            <a href="tel:1551-5718" style={{ display: 'inline-block', background: '#c0392b', color: 'white', padding: '0.9rem 2.5rem', borderRadius: '999px', fontWeight: '800', fontSize: '1.1rem', textDecoration: 'none', boxShadow: '0 4px 15px rgba(192,57,43,0.4)' }}>
              📞 1551-5718
            </a>
          </div>

        </div>
      </div>
    </>
  );
}
