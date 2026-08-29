import Link from 'next/link';

export const metadata = {
  title: '지역별 상조 서비스',
  description: '서울, 경기, 인천, 부산, 대구 전지역 24시간 즉시 출동. 가입비·월납입금 0원, 장례 종료 후 결제하는 완전 후불제 상조.',
  keywords: ['지역별상조', '전국상조', '서울상조', '경기상조', '인천상조', '부산상조', '대구상조'],
  alternates: { canonical: 'https://gahyo.co.kr/local' },
  openGraph: {
    title: '지역별 상조 서비스 | 가효상조',
    description: '서울, 경기, 인천, 부산, 대구 전지역 24시간 즉시 출동. 완전 후불제.',
    url: 'https://gahyo.co.kr/local',
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: '홈', item: 'https://gahyo.co.kr' },
    { '@type': 'ListItem', position: 2, name: '지역별 서비스', item: 'https://gahyo.co.kr/local' },
  ],
};

const REGIONS = [
  { slug: 'seoul',    name: '서울',  desc: '서울 25개 자치구 전역 · 강남·강북·강동·강서 즉시 출동', range: '25개 구' },
  { slug: 'gyeonggi', name: '경기도', desc: '수원·성남·고양·용인·부천 등 31개 시·군 전역 출동',      range: '31개 시·군' },
  { slug: 'incheon',  name: '인천',  desc: '남동·연수·부평·서구 등 10개 구·군 전역 출동',            range: '10개 구·군' },
  { slug: 'busan',    name: '부산',  desc: '해운대·수영·남구·동구 등 16개 구·군 전역 출동',           range: '16개 구·군' },
  { slug: 'daegu',    name: '대구',  desc: '중·동·서·남·북·수성·달서구 등 8개 구·군 전역 출동',        range: '8개 구·군' },
];

export default function LocalIndexPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <main style={{ maxWidth: '860px', margin: '0 auto', padding: '3rem 1.25rem 5rem' }}>
        <nav aria-label="breadcrumb" style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          <Link href="/">홈</Link> › 지역별 서비스
        </nav>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 4vw, 2.4rem)', fontWeight: '700', color: 'var(--text-primary)', lineHeight: 1.3, marginBottom: '0.8rem' }}>
          전국 지역별 상조 서비스
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2.5rem' }}>
          가효상조는 서울·경기·인천·부산·대구 전역에 <strong>24시간 즉시 출동</strong>합니다.
          가입비·월납입금 0원, 장례 종료 후 결제하는 완전 후불제입니다.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
          {REGIONS.map(r => (
            <Link key={r.slug} href={`/local/${r.slug}`} style={{ textDecoration: 'none' }}>
              <div style={{ background: 'white', border: '1.5px solid var(--border-color)', borderRadius: '14px', padding: '1.5rem', transition: 'box-shadow 0.2s', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: '700', color: 'var(--navy)' }}>{r.name}</span>
                  <span style={{ fontSize: '0.78rem', background: 'var(--navy-light)', color: 'var(--navy)', padding: '0.2rem 0.6rem', borderRadius: '999px', fontWeight: '700' }}>{r.range}</span>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: '0 0 1rem' }}>{r.desc}</p>
                <span style={{ fontSize: '0.85rem', color: 'var(--gold-dark)', fontWeight: '700' }}>{r.name} 자세히 보기 →</span>
              </div>
            </Link>
          ))}
        </div>

        <section style={{ background: 'var(--navy)', borderRadius: '16px', padding: '2.5rem', textAlign: 'center', color: 'white' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>지역 문의 · 즉시 출동</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '1.5rem' }}>24시간 연결 · 추가비용 없음 · 장례 후 결제</p>
          <a href="tel:1551-5718" style={{ display: 'inline-block', padding: '1rem 2.5rem', background: '#22453A', color: 'white', borderRadius: '12px', fontWeight: '800', fontSize: '1.1rem', textDecoration: 'none' }}>
            📞 1551-5718 지금 전화
          </a>
        </section>
      </main>
    </>
  );
}
