import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import FreeConsultSection from '@/components/FreeConsultSection';

export const metadata = {
  title: '가효상조 | 100% 후불제 상조 및 투명한 장례 서비스',
  description: '24시간 즉시 출동하는 100% 후불제 가효상조입니다. 무빈소부터 VIP 장례까지 전국 500여 개 제휴 장례식장에서 정성을 다해 모시겠습니다.',
  keywords: ['가효상조', '후불제상조', '장례식장', '장례', '상조회사', '장례비용', '24시간상조'],
  openGraph: {
    title: '가효상조 | 100% 후불제 상조 및 투명한 장례 서비스',
    description: '24시간 즉시 출동하는 100% 후불제 가효상조입니다. 무빈소부터 VIP 장례까지 전국 500여 개 제휴 장례식장에서 정성을 다해 모시겠습니다.',
    url: 'https://gahyo.co.kr',
    siteName: '가효상조',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '가효상조 프리미엄 장례 서비스',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '가효상조 | 100% 후불제 상조 및 투명한 장례 서비스',
    description: '24시간 즉시 출동하는 100% 후불제 가효상조입니다. 무빈소부터 VIP 장례까지 전국 500여 개 제휴 장례식장에서 정성을 다해 모시겠습니다.',
    images: ['https://gahyo.co.kr/og-image.png'],
  },
};

/* ─── 상품 데이터 ─── */
const PRODUCTS = [
  {
    id: 'mubin',
    name: '가효 무빈소 120',
    price: '1,200,000',
    priceShort: '120만원',
    target: '빈소없이 가족끼리 조용히 모시고 싶은 분',
    days: '1~2일장',
    includes: [
      '장례지도사 1명(3일 파견)',
      '입관지도사 1명(염습, 입관 진행)',
      '스프린터 8인승 리무진 1대',
      '상주용품 3종 (완장, 리본, 장갑)',
      '입관용품 16종 (오동나무 화장 규격관 포함)'
    ],
    excludes: ['장례도우미', '수의 / 납골함 / 상복'],
    color: '#4b5563',
    colorLight: '#f3f4f6',
  },
  {
    id: 'g265',
    name: '가효 265',
    price: '2,650,000',
    priceShort: '265만원',
    target: '일반적인 3일장을 원하시는 분',
    days: '3일장',
    includes: [
      '장례지도사 1명(3일 파견 / 염습)',
      '장례도우미 3명(총 30시간)',
      '앰뷸런스 관내 / 버스 200km(왕복)',
      '친환경 전통한지수의',
      '도자기 기본 유골함',
      '오동나무 관 (매장용/화장용 선택)',
      '45인승 장의버스(200km 왕복)',
      '남상복 2복 / 여상복 2복',
      '궁중 한지대렴(국화)'
    ],
    excludes: ['고인전용 리무진'],
    color: '#002C5F',
    colorLight: '#e6eef8',
    popular: true,
  },
  {
    id: 'g334',
    name: '가효 334',
    price: '3,340,000',
    priceShort: '334만원',
    target: '리무진이 포함된 품격 있는 장례',
    days: '3일장',
    includes: [
      '장례지도사 1명(3일 파견 / 염습)',
      '장례도우미 4명(총 40시간)',
      '앰뷸런스 관내',
      '리무진 200km / 버스 200km(왕복)',
      '저마수의',
      '오동나무 화장 규격관 + 도자기봉안함',
      '남상복 3복 / 여상복 3복',
      '궁중 한지대렴(국화)'
    ],
    excludes: [],
    color: '#826221',
    colorLight: '#f7f1e0',
  },
  {
    id: 'g363',
    name: '가효 363',
    price: '3,630,000',
    priceShort: '363만원',
    target: '장거리 이동·VIP 프리미엄 장례',
    days: '3일장',
    includes: [
      '장례지도사 1명(3일 파견 / 염습)',
      '장례도우미 5명(총 50시간)',
      '앰뷸런스 관내',
      '리무진 400km / 버스 400km(왕복)',
      '대마수의',
      '오동나무 화장 규격관 + 도자기봉안함',
      '남상복 4복 / 여상복 4복',
      '궁중 한지대렴(국화)'
    ],
    excludes: [],
    color: '#1d4a3a',
    colorLight: '#e8f2ee',
  },
];

/* ─── 장례 절차 타임라인 ─── */
const STEPS = [
  { step: '01', title: '임종 직후', time: '0~1시간', desc: '가효상조에 전화 한 통. 전담 장례지도사가 즉시 출동 준비합니다.', action: '지금 전화하기', href: 'tel:1551-5718', isPhone: true },
  { step: '02', title: '장례식장 이송', time: '1~3시간', desc: '앰뷸런스로 원하시는 장례식장까지 안전하게 고인을 모십니다.', action: '장례식장 찾기', href: '/halls', isPhone: false },
  { step: '03', title: '빈소 설치', time: '3~6시간', desc: '빈소 꾸밈, 제단 설치, 조문 안내 준비까지 전담 도우미가 처리합니다.', action: '상품별 도우미 확인', href: '/products', isPhone: false },
  { step: '04', title: '입관·염습', time: '2일차', desc: '전통 궁중 한지대렴 방식으로 정성껏 고인을 모십니다.', action: '절차 자세히 보기', href: '/guide', isPhone: false },
  { step: '05', title: '발인·운구', time: '3일차 오전', desc: '리무진 또는 버스로 화장장/장지까지 의전 이동합니다.', action: '차량 옵션 보기', href: '/products', isPhone: false },
  { step: '06', title: '화장·안장', time: '발인 당일', desc: '화장 또는 자연장으로 마지막 여정을 마칩니다. 봉안당·수목장도 안내드립니다.', action: '모실곳 찾기', href: '/cemeteries', isPhone: false },
];

export default function HomePage() {
  const today = new Date().toISOString().split('T')[0];

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': '가효상조',
      'url': 'https://gahyo.co.kr',
      'logo': 'https://gahyo.co.kr/logo.png',
      'contactPoint': {
        '@type': 'ContactPoint',
        'telephone': '1551-5718',
        'contactType': 'customer service',
        'areaServed': 'KR',
        'availableLanguage': 'Korean'
      },
      'sameAs': [
        'https://blog.naver.com/gahyo',
        'https://www.instagram.com/gahyo'
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'name': '후불제상조 가효상조',
      'alternateName': ['가효상조', 'gahyo.co.kr'],
      'url': 'https://gahyo.co.kr/',
      'description': '100% 후불제 상조 및 투명한 장례 서비스'
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': '후불제 상조와 선불제 상조의 가장 큰 차이점은 무엇인가요?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': '가효상조와 같은 후불제 상조는 매월 납입하는 선불금이나 가입비가 전혀 없습니다. 장례가 모두 끝난 발인 날, 실제 사용한 서비스 비용만 결제하므로 경제적이고 투명합니다.'
          }
        },
        {
          '@type': 'Question',
          'name': '한밤중에 임종하셨는데 지금 바로 장례식장 이동이 가능한가요?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': '네, 가능합니다. 가효상조는 24시간 연중무휴로 운영되며, 임종 즉시 1551-5718로 전화 주시면 앰뷸런스를 배차하여 원하시는 장례식장으로 고인을 모십니다.'
          }
        },
        {
          '@type': 'Question',
          'name': '장례식장을 미리 정해두지 않았는데 어떻게 하나요?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': '당황하지 않으셔도 됩니다. 가효상조의 전담 장례지도사가 유가족의 거주지, 예상 조문객 수, 예산 등을 고려하여 최적의 제휴 장례식장(전국 500여 곳)을 실시간으로 섭외해 드립니다.'
          }
        }
      ]
    }
  ];

  return (
    <>
      {/* ── JSON-LD 스키마 주입 ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ══════════════════════════════════════════
          ① HERO — 다크 네이비 캐러셀 + 긴급 연락 카드
         ══════════════════════════════════════════ */}
      <HeroSection today={today} />

      {/* ══════════════════════════════════════════
          ② 빠른 링크 — 상황별 바로가기
         ══════════════════════════════════════════ */}
      <section style={{ background: 'white', padding: '2rem 0', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
            {[
              { icon: '📞', label: '장례 접수', sub: '지금 바로 연결', href: 'tel:1551-5718', accent: true },
              { icon: '📋', label: '장례 절차', sub: '단계별 안내', href: '/guide', accent: false },
              { icon: '💰', label: '비용 확인', sub: '투명한 견적', href: '/estimate', accent: false },
              { icon: '🏥', label: '장례식장', sub: '전국 500+ 제휴', href: '/halls', accent: false },
            ].map(item => (
              <a key={item.label} href={item.href} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                gap: '0.35rem', padding: '1.25rem 0.75rem',
                background: item.accent ? 'var(--navy)' : 'var(--gray-bg)',
                borderRadius: '12px',
                textDecoration: 'none',
                transition: 'opacity 0.15s',
                minHeight: '90px',
              }}>
                <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                <div style={{ fontWeight: '700', fontSize: '0.92rem', color: item.accent ? 'white' : 'var(--navy)', textAlign: 'center' }}>{item.label}</div>
                <div style={{ fontSize: '0.78rem', color: item.accent ? 'rgba(255,255,255,0.7)' : 'var(--text-secondary)', textAlign: 'center' }}>{item.sub}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ③ 무료 상담받기 섹션
         ══════════════════════════════════════════ */}
      <FreeConsultSection />

      {/* ══════════════════════════════════════════
          ④ 상품 카드 — 심플 가격 카드
         ══════════════════════════════════════════ */}
      <section style={{ padding: '4rem 0', background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span className="section-label">후불제상조상품</span>
            <h2 className="section-title" style={{ margin: '0.5rem auto 0.5rem' }}>상황별 장례 상품</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              장례식장·음식·화장장 비용은 별도이며, 상담 시 미리 안내드립니다.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {PRODUCTS.map(p => (
              <div key={p.id} style={{
                borderRadius: '14px',
                border: `2px solid ${p.popular ? p.color : 'var(--border-color)'}`,
                overflow: 'hidden',
                boxShadow: p.popular ? `0 6px 24px ${p.color}25` : 'var(--shadow-sm)',
                display: 'flex', flexDirection: 'column',
              }}>
                {p.popular && (
                  <div style={{ background: p.color, color: 'white', textAlign: 'center', padding: '0.35rem', fontSize: '0.78rem', fontWeight: '700' }}>
                    ⭐ 가장 많이 선택
                  </div>
                )}
                <div style={{ padding: '1.5rem', background: p.colorLight, flex: 1 }}>
                  <div style={{ fontWeight: '800', fontSize: '1.05rem', color: p.color, marginBottom: '0.4rem' }}>{p.name}</div>
                  <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1 }}>
                    {p.priceShort}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.4rem' }}>{p.days}</div>
                  <div style={{ fontSize: '0.85rem', color: '#475569', marginTop: '0.5rem', lineHeight: 1.5 }}>{p.target}</div>
                </div>
                <div style={{ padding: '1rem', background: 'white', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <a href="tel:1551-5718" style={{
                    display: 'block', textAlign: 'center', padding: '0.75rem',
                    background: p.color, color: 'white', borderRadius: '8px',
                    fontWeight: '700', fontSize: '0.9rem', textDecoration: 'none',
                  }}>
                    상담하기
                  </a>
                  <Link href="/products" style={{
                    display: 'block', textAlign: 'center', padding: '0.5rem',
                    color: 'var(--text-secondary)', fontSize: '0.82rem', textDecoration: 'none',
                  }}>
                    상세 내역 보기 →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ⑤ 장례 절차 — 컴팩트 6단계 그리드
         ══════════════════════════════════════════ */}
      <section style={{ padding: '3.5rem 0', background: 'var(--beige)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <span className="section-label">장례 절차 안내</span>
            <h2 className="section-title" style={{ margin: '0.5rem auto 0' }}>임종부터 안장까지</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
            {STEPS.map((s, idx) => (
              <div key={s.step} style={{
                background: 'white', borderRadius: '12px', padding: '1.1rem',
                border: idx === 0 ? '2px solid #c0392b' : '1px solid var(--border-color)',
                textAlign: 'center', boxShadow: 'var(--shadow-sm)',
              }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%', margin: '0 auto 0.5rem',
                  background: idx === 0 ? 'linear-gradient(135deg,#c0392b,#96281b)' : 'var(--navy)',
                  color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: '800', fontSize: '0.82rem',
                }}>{s.step}</div>
                <div style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--navy)' }}>{s.title}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{s.time}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <Link href="/guide" style={{ color: 'var(--navy)', fontWeight: '700', fontSize: '0.9rem', textDecoration: 'none', borderBottom: '2px solid var(--navy-light)', paddingBottom: '0.1rem' }}>
              장례 절차 자세히 보기 →
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ⑥ 신뢰 지표 + 후기
         ══════════════════════════════════════════ */}
      <section style={{ padding: '3.5rem 0', background: 'white' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', textAlign: 'center', marginBottom: '3rem' }}>
            {[
              { num: '500+', label: '장례 지원 건수' },
              { num: '500+', label: '전국 제휴 장례식장' },
              { num: '98%', label: '고객 만족도' },
              { num: '24/7', label: '긴급 출동' },
            ].map(s => (
              <div key={s.label} style={{ padding: '1.25rem 0.5rem', borderRight: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--navy)' }}>{s.num}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{s.label}</div>
              </div>
            ))}
          </div>

          <h2 style={{ fontWeight: '700', color: 'var(--navy)', fontSize: '1.2rem', marginBottom: '1.25rem', textAlign: 'center' }}>실제 이용 고객 후기</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
            {[
              { name: '김○○', region: '서울 강남구', text: '처음부터 끝까지 세심하게 안내해 주셔서 당황하지 않고 장례를 마칠 수 있었습니다.' },
              { name: '이○○', region: '경기 수원시', text: '예상 견적과 실제 비용이 거의 일치해 믿음이 갔어요. 추가비 없이 투명하게 진행됐습니다.' },
              { name: '최○○', region: '인천 연수구', text: '새벽 3시에도 바로 앰뷸런스를 보내주셨어요. 큰 위로가 되었습니다.' },
            ].map(t => (
              <div key={t.name} style={{ background: 'var(--gray-bg)', borderRadius: '12px', padding: '1.5rem', borderLeft: '3px solid var(--gold)' }}>
                <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '0.6rem' }}>
                  {[1,2,3,4,5].map(i => <span key={i} style={{ color: 'var(--gold)', fontSize: '0.9rem' }}>★</span>)}
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '0.75rem', fontStyle: 'italic' }}>"{t.text}"</p>
                <div style={{ fontWeight: '700', color: 'var(--navy)', fontSize: '0.85rem' }}>{t.name} · {t.region}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ⑦ FAQ
         ══════════════════════════════════════════ */}
      <section style={{ padding: '3.5rem 0', background: 'var(--beige)' }}>
        <div className="container" style={{ maxWidth: '720px' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '1.25rem', textAlign: 'center' }}>
            자주 묻는 질문
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { q: '후불제 상조란 무엇인가요?', a: '가입비·월 납입금 없이, 장례 종료 후 실제 이용한 비용만 결제합니다.' },
              { q: '한밤중에도 출동이 가능한가요?', a: '24시간 연중무휴로 운영합니다. 임종 직후 1551-5718로 전화하시면 즉시 앰뷸런스를 배차합니다.' },
              { q: '장례식장을 미리 정하지 않았어도 되나요?', a: '전담 장례지도사가 거주지·예산에 맞는 전국 500여 곳 제휴 장례식장을 즉시 섭외해 드립니다.' },
            ].map((faq, i) => (
              <article key={i} style={{ background: 'white', borderRadius: '10px', padding: '1.25rem 1.5rem', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: '800', color: '#1e293b', marginBottom: '0.4rem', display: 'flex', gap: '0.4rem' }}>
                  <span style={{ color: '#c0392b', flexShrink: 0 }}>Q.</span>{faq.q}
                </h3>
                <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.65, paddingLeft: '1.4rem', margin: 0 }}>
                  {faq.a}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ⑧ 최하단 CTA
         ══════════════════════════════════════════ */}
      <section style={{ padding: '4rem 0', background: 'var(--navy)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-20%', right: '-5%', width: '380px', height: '380px', background: 'radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: '800', color: 'white', marginBottom: '0.75rem' }}>
            지금 바로 전화 한 통으로<br />모든 것이 시작됩니다
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1rem', marginBottom: '2rem' }}>24시간 연중무휴 · 전국 출동 가능 · 선불 없음</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', maxWidth: '600px', margin: '0 auto' }}>
            <a href="tel:1551-5718" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
              padding: '1.1rem 1rem', background: 'linear-gradient(135deg,#c0392b,#96281b)',
              color: 'white', borderRadius: 'var(--radius-sm)', fontWeight: '800',
              fontSize: '1.1rem', textDecoration: 'none', boxShadow: '0 4px 20px rgba(192,57,43,0.45)',
            }}>
              📞 1551-5718 · 지금 전화하기
            </a>
            <Link href="/estimate" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              padding: '1.1rem 1rem', background: 'rgba(255,255,255,0.1)',
              color: 'white', border: '2px solid rgba(255,255,255,0.3)',
              borderRadius: 'var(--radius-sm)', fontWeight: '700', fontSize: '1rem', textDecoration: 'none',
            }}>
              🧮 비용 미리 확인하기
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
