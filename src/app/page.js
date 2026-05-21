import Link from 'next/link';

export const metadata = {
  title: '가효상조 | 100% 후불제 상조 및 투명한 장례 서비스',
  description: '전화 한 통으로 즉시 24시간 장례 접수. 선불금 없는 100% 후불제 상조. 전국 500여 개 장례식장 제휴 및 무빈소장부터 VIP 프리미엄 장례까지.',
  keywords: ['가효상조', '후불제상조', '장례식장', '장례', '상조회사', '장례비용', '24시간상조'],
  openGraph: {
    title: '가효상조 | 100% 후불제 상조 및 투명한 장례 서비스',
    description: '전화 한 통으로 즉시 장례 접수. 무빈소 170만원부터 일반 430만원까지. 추가비 없는 후불제 상조.',
    url: 'https://gahyo.com',
    siteName: '가효상조',
    locale: 'ko_KR',
    type: 'website',
  },
};

/* ─── 상품 데이터 ─── */
const PRODUCTS = [
  {
    id: 'mubin',
    name: '가효 무빈소 170',
    price: '1,700,000',
    priceShort: '170만원',
    target: '가족끼리 조용히 모시고 싶은 분',
    days: '1~2일장',
    includes: [
      '장례지도사 1명(3일 파견 / 염습)',
      '앰뷸런스 관내 제공',
      '유족전용 버스 총 200km',
      '면 수의 100%',
      '오동나무 관 (매장용/화장용 선택)',
      '남상복 2벌 / 여상복 2벌',
      '궁중 한지대렴(국화)'
    ],
    excludes: ['장례도우미', '고인전용 리무진'],
    color: '#6b7280',
    colorLight: '#f3f4f6',
  },
  {
    id: 'g270',
    name: '가효 270',
    price: '2,700,000',
    priceShort: '270만원',
    target: '일반적인 3일장을 원하시는 분',
    days: '3일장',
    includes: [
      '장례지도사 1명(3일 파견 / 염습)',
      '장례도우미 4명(10시간)',
      '앰뷸런스 관내 / 버스 200km(왕복)',
      '종이수의',
      '오동나무 관 (매장용/화장용 선택)',
      '남상복 3벌 / 여상복 5벌',
      '궁중 한지대렴(국화)'
    ],
    excludes: ['고인전용 리무진'],
    color: '#002C5F',
    colorLight: '#e6eef8',
  },
  {
    id: 'g330',
    name: '가효 330',
    price: '3,300,000',
    priceShort: '330만원',
    target: '리무진이 포함된 품격 있는 장례',
    days: '3일장',
    includes: [
      '장례지도사 1명(3일 파견 / 염습)',
      '장례도우미 5명(10시간)',
      '앰뷸런스 관내',
      '리무진 200km / 버스 200km(왕복)',
      '저마수의(저마 100%)',
      '오동나무 관 (매장용/화장용 선택)',
      '남상복 5벌 / 여상복 7벌',
      '궁중 한지대렴(국화)'
    ],
    excludes: [],
    color: '#a07830',
    colorLight: '#f7f1e0',
    popular: true,
  },
  {
    id: 'g430',
    name: '가효 430',
    price: '4,300,000',
    priceShort: '430만원',
    target: '장거리 이동·VIP 프리미엄 장례',
    days: '3일장',
    includes: [
      '장례지도사 1명(3일 파견 / 염습)',
      '장례도우미 6명(10시간)',
      '앰뷸런스 관내',
      '리무진 400km / 버스 400km(왕복)',
      '대마수의(대마 100%)',
      '오동나무 관 (매장용/화장용 선택)',
      '남상복 7벌 / 여상복 9벌',
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
      'url': 'https://gahyo.com',
      'logo': 'https://gahyo.com/logo.png',
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
      'name': '가효상조',
      'url': 'https://gahyo.com',
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
          ① HERO — 단순하고 즉각적인 첫 화면 + E-E-A-T + BLUF
         ══════════════════════════════════════════ */}
      <section style={{
        background: 'linear-gradient(170deg, #001830 0%, #002C5F 60%, #1d4a3a 100%)',
        padding: '5rem 0 4rem',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '-15%', right: '-8%', width: '480px', height: '480px', background: 'radial-gradient(circle, rgba(201,168,76,0.09) 0%, transparent 70%)', borderRadius: '50%' }} />
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          
          {/* E-E-A-T 신뢰도 배지 */}
          <div style={{ display: 'inline-flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', padding: '0.7rem 1.25rem', background: 'rgba(255,255,255,0.08)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>🎖️</span>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.55)' }}>신뢰할 수 있는 전문가</div>
                <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'white' }}>국가공인 장례지도사 24시간 직접 출동</div>
              </div>
            </div>
            <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.2)' }} />
            <div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.55)' }}>최종 업데이트</div>
              <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'white' }}>{today}</div>
            </div>
          </div>

          <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.7rem)', fontWeight: '800', color: 'white', lineHeight: 1.25, marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
            가효상조 — 100% 후불제 상조 및<br />
            <span style={{ color: 'var(--gold)' }}>투명한 장례 서비스</span>
          </h1>
          
          {/* BLUF(핵심 요약) 영역 */}
          <div style={{ maxWidth: '720px', marginBottom: '2rem' }}>
            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, marginBottom: 0 }}>
              <strong>가효상조는 매월 납입하는 선불금이나 가입비가 전혀 없는 100% 후불제 상조입니다.</strong> 전화 한 통이면 전국 500여 개 제휴 장례식장에서 즉시 장례를 치르실 수 있습니다. 무빈소 장례부터 일반 3일장까지, 숨겨진 추가 비용 없이 발인 날 결제하는 투명한 서비스를 제공합니다.
            </p>
          </div>

          {/* 신뢰 포인트 */}
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {['✅ 24시간 연중무휴', '✅ 전국 즉시 출동', '✅ 장례 종료 후 결제'].map(b => (
              <span key={b} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.9)', borderRadius: '999px', padding: '0.3rem 0.9rem', fontSize: '0.85rem', fontWeight: '600' }}>{b}</span>
            ))}
          </div>

          {/* 가격대 요약 */}
          <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {[
              { label: '무빈소', price: '170만원' },
              { label: '일반 3일장', price: '270만원' },
              { label: '리무진 포함', price: '330만원' },
              { label: 'VIP 프리미엄', price: '430만원' },
            ].map(p => (
              <div key={p.label} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 'var(--radius-sm)', padding: '0.5rem 1rem', textAlign: 'center' }}>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.78rem' }}>{p.label}</div>
                <div style={{ color: 'var(--gold)', fontWeight: '800', fontSize: '1.05rem' }}>{p.price}</div>
              </div>
            ))}
          </div>

          {/* CTA 버튼 */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="tel:1551-5718" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
              padding: '1.1rem 2rem', fontSize: '1.1rem', fontWeight: '800',
              background: 'linear-gradient(135deg, #c0392b, #96281b)',
              color: 'white', borderRadius: 'var(--radius-sm)',
              boxShadow: '0 4px 20px rgba(192,57,43,0.5)', textDecoration: 'none',
            }} id="hero-call-btn">
              📞 24시간 장례 접수·상담
            </a>
            <Link href="/estimate" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
              padding: '1.1rem 2rem', fontSize: '1.05rem', fontWeight: '700',
              background: 'rgba(255,255,255,0.1)', color: 'white',
              border: '2px solid rgba(255,255,255,0.3)', borderRadius: 'var(--radius-sm)', textDecoration: 'none',
            }} id="hero-estimate-btn">
              🧮 투명한 장례비용 산출하기
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ② 지금 이 상황인가요? — 빠른 상황 분기
         ══════════════════════════════════════════ */}
      <section style={{ background: 'var(--beige)', padding: '2.5rem 0' }}>
        <div className="container">
          <p style={{ fontWeight: '700', color: 'var(--navy)', fontSize: '1.05rem', marginBottom: '1.25rem', textAlign: 'center' }}>지금 어떤 상황이신가요?</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
            {[
              { icon: '🚨', label: '방금 임종하셨나요?', sub: '지금 바로 전화주세요', href: 'tel:1551-5718', bg: '#c0392b', isEm: true },
              { icon: '📋', label: '장례 절차가 궁금해요', sub: '단계별 안내 확인', href: '/guide', bg: 'var(--navy)', isEm: false },
              { icon: '💰', label: '비용이 얼마인지 궁금해요', sub: 'AI 견적 즉시 산출', href: '/estimate', bg: 'var(--deep-green)', isEm: false },
            ].map(item => (
              <a key={item.label} href={item.href} style={{
                display: 'flex', alignItems: 'center', gap: '1rem',
                padding: '1.1rem 1.25rem',
                background: item.isEm ? `linear-gradient(135deg, ${item.bg}, #96281b)` : 'white',
                border: item.isEm ? 'none' : '2px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                textDecoration: 'none',
                boxShadow: item.isEm ? '0 4px 16px rgba(192,57,43,0.3)' : 'var(--shadow-sm)',
                transition: 'var(--transition)',
              }}>
                <span style={{ fontSize: '1.75rem' }}>{item.icon}</span>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '1rem', color: item.isEm ? 'white' : 'var(--navy)' }}>{item.label}</div>
                  <div style={{ fontSize: '0.85rem', color: item.isEm ? 'rgba(255,255,255,0.8)' : 'var(--text-secondary)', marginTop: '0.15rem' }}>{item.sub}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ③ 상품 카드 — 가격 + 포함 항목 투명 공개
         ══════════════════════════════════════════ */}
      <section style={{ padding: '5rem 0', background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.75rem' }}>
            <span className="section-label">후불제상조상품</span>
            <h2 className="section-title" style={{ margin: '0.5rem auto 0.75rem' }}>정찰제 · 포함 항목 투명 공개</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7 }}>
              아래 금액이 전부입니다. 장례식장 비용·음식비·화장장 이용료는 별도이며, 미리 안내해드립니다.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            {PRODUCTS.map(p => (
              <div key={p.id} style={{
                borderRadius: 'var(--radius-lg)',
                border: `2px solid ${p.popular ? p.color : 'var(--border-color)'}`,
                overflow: 'hidden', position: 'relative',
                boxShadow: p.popular ? `0 8px 32px ${p.color}30` : 'var(--shadow-sm)',
                display: 'flex', flexDirection: 'column'
              }}>
                {p.popular && (
                  <div style={{ background: p.color, color: 'white', textAlign: 'center', padding: '0.4rem', fontSize: '0.82rem', fontWeight: '700' }}>
                    ⭐ 가장 많이 선택하는 상품
                  </div>
                )}
                <div style={{ padding: '1.75rem', background: p.colorLight }}>
                  <div style={{ fontWeight: '800', fontSize: '1.3rem', color: p.color, marginBottom: '0.25rem' }}>{p.name}</div>
                  <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                    {p.priceShort}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{p.days} · {p.target}</div>
                </div>
                <div style={{ padding: '1.5rem', background: 'white', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ fontWeight: '700', fontSize: '0.85rem', color: 'var(--navy)', marginBottom: '0.75rem', letterSpacing: '0.04em' }}>✅ 포함 항목</div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: p.excludes.length > 0 ? '1rem' : '1.5rem' }}>
                    {p.includes.map(item => (
                      <li key={item} style={{ fontSize: '0.9rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                        <span style={{ color: p.color, fontWeight: '700', flexShrink: 0, marginTop: '0.05rem' }}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  {p.excludes.length > 0 && (
                    <>
                      <div style={{ fontWeight: '700', fontSize: '0.85rem', color: '#6b7280', marginBottom: '0.5rem', letterSpacing: '0.04em' }}>➖ 미포함</div>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.3rem', marginBottom: '1.5rem' }}>
                        {p.excludes.map(item => (
                           <li key={item} style={{ fontSize: '0.88rem', color: '#9ca3af', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                             <span>✕</span> {item}
                           </li>
                        ))}
                      </ul>
                    </>
                  )}
                  <a href="tel:1551-5718" style={{
                    display: 'block', textAlign: 'center', padding: '0.85rem',
                    background: p.color, color: 'white', borderRadius: 'var(--radius-sm)',
                    fontWeight: '700', fontSize: '1rem', textDecoration: 'none',
                    marginTop: 'auto'
                  }}>
                    이 상품으로 상담하기
                  </a>
                </div>
              </div>
            ))}
          </div>
          <Link href="/products" style={{ display: 'block', textAlign: 'center', marginTop: '2rem', color: 'var(--navy)', fontWeight: '700', fontSize: '1rem', textDecoration: 'underline' }}>
            전체 항목 비교표 보기 →
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ④ 투명한 비용 안내 — 추가 비용 솔직하게
         ══════════════════════════════════════════ */}
      <section style={{ padding: '4rem 0', background: 'var(--beige)' }}>
        <div className="container">
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <h2 style={{ fontWeight: '800', color: 'var(--navy)', fontSize: 'clamp(1.3rem, 3vw, 1.75rem)', marginBottom: '0.5rem' }}>
              💡 추가 비용이 생기는 경우, 미리 알려드립니다
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.75rem', fontSize: '1rem', lineHeight: 1.7 }}>
              가효상조 상품 가격은 <strong style={{ color: 'var(--text-primary)' }}>장례 의전 비용</strong>입니다. 아래 항목은 선택 사항이며 별도로 발생합니다. 상담 시 미리 예상 금액을 안내해 드립니다.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              {[
                { icon: '🏥', title: '장례식장 시설 이용료', desc: '빈소·안치실·염습실 사용료 (장례식장별 상이)' },
                { icon: '🍱', title: '음식·식음료비', desc: '조문객 식사 및 음료 (인원·메뉴에 따라 다름)' },
                { icon: '🔥', title: '화장장 이용료', desc: '지역·시설에 따라 다름 (시립 화장장 우선 안내)' },
                { icon: '⚱️', title: '봉안당·수목장비', desc: '선택 시 해당 시설 이용료 별도 (안내 무료)' },
              ].map(item => (
                <div key={item.title} style={{ background: 'white', borderRadius: 'var(--radius-md)', padding: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{item.icon}</div>
                  <div style={{ fontWeight: '700', color: 'var(--navy)', fontSize: '0.95rem', marginBottom: '0.35rem' }}>{item.title}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>{item.desc}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '1.5rem', background: 'white', borderLeft: '4px solid var(--gold)', borderRadius: '0 var(--radius-md) var(--radius-md) 0', padding: '1rem 1.25rem', fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: 1.7 }}>
              📞 상담 시 원하시는 장례식장과 예상 조문객 수를 말씀해 주시면, <strong>총 예상 비용을 전화로 즉시 안내</strong>해 드립니다.
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ⑤ 장례 절차 타임라인
         ══════════════════════════════════════════ */}
      <section style={{ padding: '5rem 0', background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-label">장례 절차 안내</span>
            <h2 className="section-title" style={{ margin: '0.5rem auto 0.75rem' }}>임종부터 안장까지 6단계</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>처음 장례를 치르시는 분들을 위해 절차를 단계별로 안내합니다.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {STEPS.map((s, idx) => (
              <div key={s.step} style={{ display: 'flex', gap: '1.25rem', position: 'relative', paddingBottom: idx < STEPS.length - 1 ? '0' : '0' }}>
                {/* 타임라인 선 */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '50%',
                    background: idx === 0 ? 'linear-gradient(135deg,#c0392b,#96281b)' : 'var(--navy)',
                    color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: '800', fontSize: '0.9rem', flexShrink: 0, zIndex: 1,
                  }}>{s.step}</div>
                  {idx < STEPS.length - 1 && (
                    <div style={{ width: '2px', background: 'var(--border-color)', flex: 1, minHeight: '32px' }} />
                  )}
                </div>
                {/* 콘텐츠 */}
                <div style={{ paddingBottom: idx < STEPS.length - 1 ? '2rem' : '0', paddingTop: '0.6rem', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
                    <h3 style={{ fontWeight: '800', fontSize: '1.1rem', color: 'var(--navy)' }}>{s.title}</h3>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', background: 'var(--gray-bg)', padding: '0.15rem 0.6rem', borderRadius: '999px' }}>{s.time}</span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.65, marginBottom: '0.75rem' }}>{s.desc}</p>
                  <a href={s.href} style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                    fontSize: '0.9rem', fontWeight: '700',
                    color: idx === 0 ? '#c0392b' : 'var(--navy)',
                    textDecoration: 'none', borderBottom: `2px solid ${idx === 0 ? '#c0392b30' : 'var(--navy-light)'}`,
                    paddingBottom: '0.1rem',
                  }}>{s.action} →</a>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
            <Link href="/guide" className="btn-secondary" style={{ padding: '0.9rem 2rem', fontSize: '1rem' }}>
              장례 가이드 전체 보기
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ⑥ 신뢰 요소 — 제휴 장례식장 + 사업자 정보
         ══════════════════════════════════════════ */}
      <section style={{ padding: '4rem 0', background: 'var(--gray-bg)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', textAlign: 'center' }}>
            {[
              { num: '15,000+', label: '장례 지원 건수', sub: '2010년부터' },
              { num: '500+', label: '전국 제휴 장례식장', sub: '전국 어디서든' },
              { num: '98%', label: '고객 만족도', sub: '실제 이용 고객 기준' },
              { num: '24/7', label: '긴급 출동 가능', sub: '연중무휴' },
            ].map(s => (
              <div key={s.label} style={{ padding: '1.5rem', background: 'white', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--navy)' }}>{s.num}</div>
                <div style={{ fontWeight: '700', color: 'var(--text-primary)', marginTop: '0.25rem' }}>{s.label}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* 고객 후기 */}
          <div style={{ marginTop: '3.5rem' }}>
            <h2 style={{ fontWeight: '700', color: 'var(--navy)', fontSize: '1.35rem', marginBottom: '1.5rem', textAlign: 'center' }}>실제 이용 고객 후기</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '1.25rem' }}>
              {[
                { name: '김○○ 고객님', region: '서울 강남구', text: '갑작스러운 부모님 임종에 당황했는데, 상담원이 처음부터 끝까지 세심하게 안내해 주셨어요. AI 견적 덕분에 비용도 미리 파악할 수 있었습니다.' },
                { name: '이○○ 고객님', region: '경기 수원시', text: '예상 견적과 실제 비용이 거의 일치해서 믿음이 갔어요. 추가비가 생기는 부분도 미리 안내해 주셔서 불안하지 않았습니다.' },
                { name: '박○○ 고객님', region: '대구 수성구', text: '처음 장례를 치르는 거라 막막했는데, 단계별로 친절하게 설명해 주시고 직접 움직여 주셔서 정말 감사했습니다.' },
              ].map(t => (
                <div key={t.name} style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '1.75rem', boxShadow: 'var(--shadow-sm)', borderLeft: '4px solid var(--gold)' }}>
                  <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '0.9rem' }}>
                    {[1,2,3,4,5].map(i => <span key={i} style={{ color: 'var(--gold)', fontSize: '1rem' }}>★</span>)}
                  </div>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '1.1rem', fontStyle: 'italic' }}>"{t.text}"</p>
                  <div style={{ fontWeight: '700', color: 'var(--navy)', fontSize: '0.9rem' }}>{t.name}</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{t.region}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ⑦ 자주 묻는 질문 (FAQ) — SEO 및 롱테일 키워드 대응
         ══════════════════════════════════════════ */}
      <section style={{ padding: '5rem 0', background: 'white' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '1.5rem', textAlign: 'center' }}>
            자주 묻는 질문 (FAQ)
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              {
                q: '후불제 상조와 선불제 상조의 가장 큰 차이점은 무엇인가요?',
                a: '가효상조와 같은 후불제 상조는 매월 납입하는 선불금이나 가입비가 전혀 없습니다. 장례가 모두 끝난 발인 날, 실제 사용한 서비스 비용만 결제하므로 경제적이고 투명합니다.'
              },
              {
                q: '한밤중에 임종하셨는데 지금 바로 장례식장 이동이 가능한가요?',
                a: '네, 가능합니다. 가효상조는 24시간 연중무휴로 운영되며, 임종 즉시 1551-5718로 전화 주시면 앰뷸런스를 배차하여 원하시는 장례식장으로 고인을 모십니다.'
              },
              {
                q: '장례식장을 미리 정해두지 않았는데 어떻게 하나요?',
                a: '당황하지 않으셔도 됩니다. 가효상조의 전담 장례지도사가 유가족의 거주지, 예상 조문객 수, 예산 등을 고려하여 최적의 제휴 장례식장(전국 500여 곳)을 실시간으로 섭외해 드립니다.'
              }
            ].map((faq, i) => (
              <article key={i} style={{ background: 'var(--gray-bg)', borderRadius: '12px', padding: '1.5rem', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#1e293b', marginBottom: '0.75rem', display: 'flex', gap: '0.5rem' }}>
                  <span style={{ color: '#c0392b', flexShrink: 0 }}>Q.</span> {faq.q}
                </h3>
                <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.7, paddingLeft: '1.7rem', margin: 0 }}>
                  <strong style={{ color: 'var(--gold-dark)', marginRight: '0.3rem' }}>A.</strong>{faq.a}
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
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="tel:1551-5718" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
              padding: '1.1rem 2.25rem', background: 'linear-gradient(135deg,#c0392b,#96281b)',
              color: 'white', borderRadius: 'var(--radius-sm)', fontWeight: '800',
              fontSize: '1.1rem', textDecoration: 'none', boxShadow: '0 4px 20px rgba(192,57,43,0.45)',
            }}>
              📞 1551-5718 · 지금 전화하기
            </a>
            <Link href="/estimate" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '1.1rem 2rem', background: 'rgba(255,255,255,0.1)',
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
