import Link from 'next/link';

export const metadata = {
  title: '경기도 상조 | 가효상조 — 수원·성남·용인·고양 24시간 출동',
  description: '경기도 전지역 24시간 즉시 출동. 수원·성남·용인·고양·부천·안양 등 전 시·군 출동 가능. 가입비·월납입금 0원, 장례 후 결제.',
  keywords: ['경기도상조', '경기장례', '수원상조', '성남장례', '용인상조', '경기후불제상조'],
  alternates: { canonical: 'https://gahyo.co.kr/local/gyeonggi' },
  openGraph: {
    title: '경기도 상조 | 가효상조',
    description: '경기도 전지역 24시간 즉시 출동. 가입비·월납입금 0원, 장례 후 결제.',
    url: 'https://gahyo.co.kr/local/gyeonggi',
  },
};

const localJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: '가효상조 경기도',
  description: '경기도 전지역 24시간 즉시 출동 후불제 장례 서비스',
  url: 'https://gahyo.co.kr/local/gyeonggi',
  telephone: '1551-5718',
  areaServed: { '@type': 'State', name: '경기도' },
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
    { '@type': 'ListItem', position: 3, name: '경기도 상조', item: 'https://gahyo.co.kr/local/gyeonggi' },
  ],
};

const CITIES = ['수원시', '성남시', '용인시', '고양시', '부천시', '안양시', '남양주시', '화성시', '평택시', '의정부시', '시흥시', '파주시'];

export default function GyeonggiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([localJsonLd, breadcrumbJsonLd]) }} />

      <main style={{ maxWidth: '860px', margin: '0 auto', padding: '3rem 1.25rem 5rem' }}>
        <nav aria-label="breadcrumb" style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          <Link href="/">홈</Link> › <Link href="/local">지역별 서비스</Link> › 경기도 상조
        </nav>

        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: '700', color: 'var(--text-primary)', lineHeight: 1.3, marginBottom: '0.8rem' }}>
          경기도 상조 — 가효상조
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem' }}>
          경기도 31개 시·군 전역에 24시간 즉시 출동합니다. 수원·성남·용인·고양 등 어디서나 임종 직후 연락 주시면 앰뷸런스를 즉시 배차합니다. <strong>가입비·월납입금 0원, 장례 종료 후 결제</strong>하는 완전 후불제 상조입니다.
        </p>

        <section style={{ background: 'var(--navy-light)', borderRadius: '16px', padding: '2rem', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--navy)' }}>경기도 출동 서비스 안내</h2>
          <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', listStyle: 'none', margin: 0, padding: 0 }}>
            {[
              ['출동 범위', '경기도 31개 시·군'],
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

        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '1rem' }}>경기도 주요 출동 지역</h2>
          <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', listStyle: 'none', padding: 0, margin: 0 }}>
            {CITIES.map(city => (
              <li key={city}>
                <Link href={`/halls?q=${encodeURIComponent('경기 ' + city)}`} style={{ display: 'inline-block', padding: '0.5rem 1rem', background: 'var(--gray-bg)', borderRadius: '999px', fontSize: '0.88rem', color: 'var(--text-primary)', textDecoration: 'none', fontWeight: '600' }}>
                  경기 {city}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section style={{ background: 'var(--navy)', borderRadius: '16px', padding: '2.5rem', textAlign: 'center', color: 'white' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>경기도 장례, 지금 바로 연락하세요</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '1.5rem' }}>24시간 즉시 연결 · 상담 후 출동 결정 · 추가비용 없음</p>
          <a href="tel:1551-5718" style={{ display: 'inline-block', padding: '1rem 2.5rem', background: '#22453A', color: 'white', borderRadius: '12px', fontWeight: '800', fontSize: '1.1rem', textDecoration: 'none' }}>
            📞 1551-5718 지금 전화
          </a>
        </section>
      </main>
    </>
  );
}
