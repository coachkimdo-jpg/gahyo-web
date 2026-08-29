import Link from 'next/link';

export const metadata = {
  title: '서울 상조 | 서울 전지역 24시간 즉시 출동',
  description: '서울 전지역 24시간 즉시 출동. 가입비·월납입금 0원, 장례 후 결제. 강남·강북·마포·송파 등 전 구 출동 가능. 국가공인 장례지도사 1:1 전담.',
  keywords: ['서울상조', '서울장례', '서울장례식장', '서울후불제상조', '24시간상조서울'],
  alternates: { canonical: 'https://gahyo.co.kr/local/seoul' },
  openGraph: {
    title: '서울 상조 | 가효상조',
    description: '서울 전지역 24시간 즉시 출동. 가입비·월납입금 0원, 장례 후 결제.',
    url: 'https://gahyo.co.kr/local/seoul',
  },
};

const localJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: '가효상조 서울',
  description: '서울 전지역 24시간 즉시 출동 후불제 장례 서비스',
  url: 'https://gahyo.co.kr/local/seoul',
  telephone: '1551-5718',
  areaServed: { '@type': 'City', name: '서울특별시' },
  openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
  priceRange: '120만원~363만원',
  sameAs: 'https://gahyo.co.kr',
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: '홈', item: 'https://gahyo.co.kr' },
    { '@type': 'ListItem', position: 2, name: '지역별 서비스', item: 'https://gahyo.co.kr/local' },
    { '@type': 'ListItem', position: 3, name: '서울 상조', item: 'https://gahyo.co.kr/local/seoul' },
  ],
};

const HALLS = [
  '서울아산병원장례식장', '서울대학교병원장례식장', '삼성서울병원장례식장',
  '세브란스병원장례식장', '고려대학교안암병원장례식장', '서울성모병원장례식장',
  '국립중앙의료원장례식장', '강동성심병원장례식장',
];

export default function SeoulPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([localJsonLd, breadcrumbJsonLd]) }} />

      <main style={{ maxWidth: '860px', margin: '0 auto', padding: '3rem 1.25rem 5rem' }}>
        {/* 브레드크럼 */}
        <nav aria-label="breadcrumb" style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          <Link href="/">홈</Link> › <Link href="/local">지역별 서비스</Link> › 서울 상조
        </nav>

        {/* 헤더 */}
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: '700', color: 'var(--text-primary)', lineHeight: 1.3, marginBottom: '0.8rem' }}>
          서울 상조 — 가효상조
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem' }}>
          서울 25개 구 전역에 24시간 즉시 출동합니다. 가입비·월납입금 없이 장례가 끝난 뒤 실제 사용한 비용만 결제하는 <strong>100% 후불제 상조</strong>입니다. 국가공인 장례지도사 1급이 임종 직후부터 안장까지 1:1로 전담합니다.
        </p>

        {/* 핵심 정보 */}
        <section style={{ background: 'var(--navy-light)', borderRadius: '16px', padding: '2rem', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--navy)' }}>서울 출동 서비스 안내</h2>
          <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', listStyle: 'none', margin: 0, padding: 0 }}>
            {[
              ['출동 범위', '서울 25개 구 전역'],
              ['출동 시간', '24시간 · 연중무휴'],
              ['가입비', '0원'],
              ['월 납입금', '0원'],
              ['결제 방식', '장례 종료 후 100% 후불'],
              ['담당 지도사', '국가공인 1급 1:1 전담'],
            ].map(([k, v]) => (
              <li key={k} style={{ background: 'white', borderRadius: '10px', padding: '0.85rem 1rem', display: 'flex', justifyContent: 'space-between', gap: '0.5rem', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>{k}</span>
                <span style={{ color: 'var(--navy)', fontWeight: '700' }}>{v}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 주요 제휴 장례식장 */}
        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '1rem' }}>서울 주요 제휴 장례식장</h2>
          <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.5rem', listStyle: 'none', padding: 0, margin: 0 }}>
            {HALLS.map(h => (
              <li key={h}>
                <Link href={`/halls?q=${encodeURIComponent(h)}`} style={{ display: 'block', padding: '0.7rem 1rem', background: 'var(--gray-bg)', borderRadius: '8px', fontSize: '0.88rem', color: 'var(--text-primary)', textDecoration: 'none', fontWeight: '600' }}>
                  {h}
                </Link>
              </li>
            ))}
          </ul>
          <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            그 외 서울 전역 병원·공설 장례식장 모두 이용 가능합니다.{' '}
            <Link href="/halls" style={{ color: 'var(--gold-dark)', fontWeight: '700' }}>장례식장 전체 보기 →</Link>
          </p>
        </section>

        {/* CTA */}
        <section style={{ background: 'var(--navy)', borderRadius: '16px', padding: '2.5rem', textAlign: 'center', color: 'white' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>서울 장례, 지금 바로 연락하세요</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '1.5rem' }}>24시간 즉시 연결 · 상담 후 출동 결정 · 추가비용 없음</p>
          <a href="tel:1551-5718" style={{ display: 'inline-block', padding: '1rem 2.5rem', background: '#22453A', color: 'white', borderRadius: '12px', fontWeight: '800', fontSize: '1.1rem', textDecoration: 'none' }}>
            📞 1551-5718 지금 전화
          </a>
        </section>
      </main>
    </>
  );
}
