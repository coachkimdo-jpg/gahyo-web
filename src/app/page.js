import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import FreeConsultSection from '@/components/FreeConsultSection';
import StatsCounter from '@/components/StatsCounter';

export const metadata = {
  title: '가효상조 | 100% 후불제 상조 및 투명한 장례 서비스',
  description: '24시간 즉시 출동하는 100% 후불제 가효상조입니다. 무빈소부터 VIP 장례까지 전국 500여 개 제휴 장례식장에서 정성을 다해 모시겠습니다.',
  keywords: ['가효상조', '후불제상조', '장례식장', '장례', '상조회사', '장례비용', '24시간상조'],
  openGraph: {
    title: '가효상조 | 100% 후불제 상조 및 투명한 장례 서비스',
    description: '24시간 즉시 출동하는 100% 후불제 가효상조입니다. 무빈소부터 VIP 장례까지 전국 500여 개 제휴 장례식장에서 정성을 다해 모시겠습니다.',
    url: 'https://gahyo.co.kr',
    siteName: '가효상조',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: '가효상조 프리미엄 장례 서비스' }],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '가효상조 | 100% 후불제 상조 및 투명한 장례 서비스',
    description: '24시간 즉시 출동하는 100% 후불제 가효상조입니다.',
    images: ['https://gahyo.co.kr/og-image.png'],
  },
};

/* ─── 상품 데이터 (기능 목록 포함) ─── */
const PRODUCTS = [
  {
    id: 'mubin',
    name: '가효 무빈소',
    price: '120만원',
    days: '1~2일장',
    target: '조용한 가족장을 원하는 분',
    features: [
      { label: '장례지도사', value: '1명 파견' },
      { label: '도우미', value: '미포함' },
      { label: '차량', value: '리무진 150km' },
      { label: '수의', value: '미포함' },
      { label: '유골함', value: '기본 목함' },
      { label: '상복', value: '미포함' },
    ],
    color: '#4b5563',
    colorLight: '#f9fafb',
  },
  {
    id: 'g265',
    name: '가효 265',
    price: '265만원',
    days: '3일장',
    target: '일반적인 3일장',
    features: [
      { label: '장례지도사', value: '1명 (3일)' },
      { label: '도우미', value: '3명 / 30시간' },
      { label: '차량', value: '버스 200km' },
      { label: '수의', value: '친환경 한지수의' },
      { label: '유골함', value: '도자기 기본함' },
      { label: '상복', value: '남2벌 · 여2벌' },
    ],
    color: '#002C5F',
    colorLight: '#eff6ff',
    popular: true,
  },
  {
    id: 'g334',
    name: '가효 334',
    price: '334만원',
    days: '3일장',
    target: '리무진 포함 품격 장례',
    features: [
      { label: '장례지도사', value: '1명 (3일)' },
      { label: '도우미', value: '4명 / 40시간' },
      { label: '차량', value: '리무진+버스 200km' },
      { label: '수의', value: '저마수의' },
      { label: '유골함', value: '도자기봉안함' },
      { label: '상복', value: '남3벌 · 여3벌' },
    ],
    color: '#826221',
    colorLight: '#fefce8',
  },
  {
    id: 'g363',
    name: '가효 363',
    price: '363만원',
    days: '3일장',
    target: '장거리 VIP 프리미엄',
    features: [
      { label: '장례지도사', value: '1명 (3일)' },
      { label: '도우미', value: '5명 / 50시간' },
      { label: '차량', value: '리무진+버스 400km' },
      { label: '수의', value: '대마수의' },
      { label: '유골함', value: '도자기봉안함' },
      { label: '상복', value: '남4벌 · 여4벌' },
    ],
    color: '#1d4a3a',
    colorLight: '#f0fdf4',
  },
];

/* ─── 비용 비교 데이터 ─── */
const COMPARE = [
  {
    type: '선불제 상조',
    price: '~500만원+',
    priceNote: '가입비·납입금 총액 포함',
    highlight: false,
    checks: {
      '가입비': '있음',
      '월 납입금': '있음',
      '즉시 출동': '부분적',
      '추가비용': '발생 가능',
      '장례 후 결제': '없음',
    },
  },
  {
    type: '장례식장 직접',
    price: '~380만원+',
    priceNote: '부가서비스 미포함 기준',
    highlight: false,
    checks: {
      '가입비': '없음',
      '월 납입금': '없음',
      '즉시 출동': '없음',
      '추가비용': '발생 가능',
      '장례 후 결제': '없음',
    },
  },
  {
    type: '가효상조',
    price: '120~363만원',
    priceNote: '추가비용 없음 보장',
    highlight: true,
    checks: {
      '가입비': '없음 ✅',
      '월 납입금': '없음 ✅',
      '즉시 출동': '24시간 ✅',
      '추가비용': '없음 ✅',
      '장례 후 결제': '100% ✅',
    },
  },
];

/* ─── 가효 혜택 ─── */
const BENEFITS = [
  { icon: '💰', title: '가입비 0원', desc: '초기 가입비 없이 필요할 때만 이용' },
  { icon: '📅', title: '월 납입금 0원', desc: '매월 내는 부담금 없음, 완전 후불제' },
  { icon: '💳', title: '장례 종료 후 결제', desc: '발인 날 실제 사용한 비용만 정산' },
  { icon: '⏰', title: '24시간 즉시 출동', desc: '새벽·명절 관계없이 전국 어디서나' },
  { icon: '🛡️', title: '추가비용 없음 보장', desc: '견적 = 실결제, 숨은 비용 절대 없음' },
  { icon: '👨‍💼', title: '전담 지도사 1:1 배정', desc: '처음부터 끝까지 한 분이 함께 동행' },
];

/* ─── 장례 절차 ─── */
const STEPS = [
  { step: '01', title: '임종 직후', time: '0~1시간', isFirst: true },
  { step: '02', title: '장례식장 이송', time: '1~3시간', isFirst: false },
  { step: '03', title: '빈소 설치', time: '3~6시간', isFirst: false },
  { step: '04', title: '입관·염습', time: '2일차', isFirst: false },
  { step: '05', title: '발인·운구', time: '3일차 오전', isFirst: false },
  { step: '06', title: '화장·안장', time: '발인 당일', isFirst: false },
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
      'sameAs': ['https://blog.naver.com/gahyo', 'https://www.instagram.com/gahyo']
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
          'acceptedAnswer': { '@type': 'Answer', 'text': '가효상조와 같은 후불제 상조는 매월 납입하는 선불금이나 가입비가 전혀 없습니다. 장례가 모두 끝난 발인 날, 실제 사용한 서비스 비용만 결제하므로 경제적이고 투명합니다.' }
        },
        {
          '@type': 'Question',
          'name': '한밤중에 임종하셨는데 지금 바로 장례식장 이동이 가능한가요?',
          'acceptedAnswer': { '@type': 'Answer', 'text': '네, 가능합니다. 가효상조는 24시간 연중무휴로 운영되며, 임종 즉시 1551-5718로 전화 주시면 앰뷸런스를 배차하여 원하시는 장례식장으로 고인을 모십니다.' }
        },
        {
          '@type': 'Question',
          'name': '장례식장을 미리 정해두지 않았는데 어떻게 하나요?',
          'acceptedAnswer': { '@type': 'Answer', 'text': '당황하지 않으셔도 됩니다. 가효상조의 전담 장례지도사가 유가족의 거주지, 예상 조문객 수, 예산 등을 고려하여 최적의 제휴 장례식장(전국 500여 곳)을 실시간으로 섭외해 드립니다.' }
        }
      ]
    }
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ══ ① HERO ══ */}
      <HeroSection today={today} />

      {/* ══ ② 빠른 링크 ══ */}
      <section style={{ background: 'white', padding: '2rem 0', borderBottom: '1px solid #e2e8f0' }}>
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
                background: item.accent ? '#002C5F' : '#f8fafc',
                borderRadius: '12px', textDecoration: 'none',
                border: item.accent ? 'none' : '1px solid #e2e8f0',
                minHeight: '90px',
              }}>
                <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                <div style={{ fontWeight: '700', fontSize: '0.92rem', color: item.accent ? 'white' : '#1e293b', textAlign: 'center' }}>{item.label}</div>
                <div style={{ fontSize: '0.78rem', color: item.accent ? 'rgba(255,255,255,0.75)' : '#64748b', textAlign: 'center' }}>{item.sub}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ③ 숫자 카운터 ══ */}
      <StatsCounter />

      {/* ══ ④ 무료 상담 ══ */}
      <FreeConsultSection />

      {/* ══ ⑤ 비용 비교 ══ */}
      <section style={{ padding: '4rem 0', background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{
              display: 'inline-block', padding: '0.3rem 0.9rem',
              background: 'rgba(0,44,95,0.08)', borderRadius: '999px',
              fontSize: '0.75rem', fontWeight: '700', color: '#002C5F',
              letterSpacing: '0.06em', marginBottom: '0.75rem',
            }}>비용 비교</span>
            <h2 style={{ fontSize: 'clamp(1.3rem, 3.5vw, 1.75rem)', fontWeight: '800', color: '#1e293b', marginBottom: '0.5rem' }}>
              왜 후불제 상조가 합리적인가요?
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>일반 3일장 기준 타사 대비 가효상조</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', maxWidth: '820px', margin: '0 auto 1.25rem' }}>
            {COMPARE.map((col, i) => (
              <div key={i} style={{
                borderRadius: '16px',
                border: col.highlight ? '2px solid #002C5F' : '1px solid #e2e8f0',
                overflow: 'hidden',
                boxShadow: col.highlight ? '0 8px 32px rgba(0,44,95,0.15)' : '0 2px 8px rgba(0,0,0,0.04)',
              }}>
                <div style={{ padding: '1.25rem 1.25rem 1rem', background: col.highlight ? '#002C5F' : '#f8fafc', textAlign: 'center' }}>
                  {col.highlight && (
                    <div style={{ fontSize: '0.72rem', fontWeight: '700', color: '#C9A84C', marginBottom: '0.3rem', letterSpacing: '0.06em' }}>
                      ✅ 가장 합리적
                    </div>
                  )}
                  <div style={{ fontWeight: '800', fontSize: '1rem', color: col.highlight ? 'white' : '#1e293b', marginBottom: '0.4rem' }}>{col.type}</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '900', color: col.highlight ? '#C9A84C' : '#1e293b', letterSpacing: '-0.02em' }}>{col.price}</div>
                  <div style={{ fontSize: '0.72rem', color: col.highlight ? 'rgba(255,255,255,0.6)' : '#94a3b8', marginTop: '0.2rem' }}>{col.priceNote}</div>
                </div>
                <div style={{ padding: '0.75rem 1.25rem', background: 'white' }}>
                  {Object.entries(col.checks).map(([key, val]) => (
                    <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid #f1f5f9', fontSize: '0.82rem' }}>
                      <span style={{ color: '#64748b' }}>{key}</span>
                      <span style={{ fontWeight: '700', color: val.includes('✅') ? '#166534' : '#1e293b' }}>{val}</span>
                    </div>
                  ))}
                </div>
                {col.highlight && (
                  <div style={{ padding: '0 1.25rem 1.25rem', background: 'white' }}>
                    <a href="tel:1551-5718" style={{
                      display: 'block', textAlign: 'center', padding: '0.85rem',
                      background: 'linear-gradient(135deg, #c0392b, #96281b)',
                      color: 'white', borderRadius: '10px', fontWeight: '800',
                      fontSize: '0.95rem', textDecoration: 'none',
                    }}>
                      📞 지금 바로 상담하기
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', fontSize: '0.73rem', color: '#94a3b8' }}>
            * 업계 평균 기준 추정치이며 실제 비용은 상품 구성에 따라 다를 수 있습니다.
          </p>
        </div>
      </section>

      {/* ══ ⑥ 상품 패키지 ══ */}
      <section style={{ padding: '4rem 0', background: '#f8fafc' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{
              display: 'inline-block', padding: '0.3rem 0.9rem',
              background: 'rgba(0,44,95,0.08)', borderRadius: '999px',
              fontSize: '0.75rem', fontWeight: '700', color: '#002C5F',
              letterSpacing: '0.06em', marginBottom: '0.75rem',
            }}>후불제상조 상품</span>
            <h2 style={{ fontSize: 'clamp(1.3rem, 3.5vw, 1.75rem)', fontWeight: '800', color: '#1e293b', marginBottom: '0.5rem' }}>
              상황별 장례 상품
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>장례식장·음식·화장장 비용은 별도이며, 상담 시 미리 안내드립니다.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1rem' }}>
            {PRODUCTS.map(p => (
              <div key={p.id} style={{
                borderRadius: '16px',
                border: `2px solid ${p.popular ? p.color : '#e2e8f0'}`,
                overflow: 'hidden',
                boxShadow: p.popular ? `0 8px 32px ${p.color}22` : '0 2px 8px rgba(0,0,0,0.04)',
                background: 'white',
                display: 'flex', flexDirection: 'column',
              }}>
                {p.popular && (
                  <div style={{ background: p.color, color: 'white', textAlign: 'center', padding: '0.4rem', fontSize: '0.75rem', fontWeight: '700' }}>
                    ⭐ 가장 많이 선택
                  </div>
                )}
                <div style={{ padding: '1.5rem 1.5rem 1rem', background: p.colorLight }}>
                  <div style={{ fontWeight: '800', fontSize: '0.95rem', color: p.color, marginBottom: '0.3rem' }}>{p.name}</div>
                  <div style={{ fontSize: '2rem', fontWeight: '900', color: '#1e293b', letterSpacing: '-0.03em', lineHeight: 1 }}>{p.price}</div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.3rem' }}>{p.days} · {p.target}</div>
                </div>
                <div style={{ padding: '0.75rem 1.5rem', flex: 1 }}>
                  {p.features.map((f, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: '1px solid #f1f5f9', fontSize: '0.8rem' }}>
                      <span style={{ color: '#94a3b8', fontWeight: '600' }}>{f.label}</span>
                      <span style={{ color: '#1e293b', fontWeight: '700', textAlign: 'right' }}>{f.value}</span>
                    </div>
                  ))}
                </div>
                <div style={{ padding: '1rem 1.5rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem', padding: '0.45rem', background: '#f0fdf4', borderRadius: '7px', fontSize: '0.75rem', color: '#166534', fontWeight: '700' }}>
                    🛡️ 추가비용 없음 보장 · 장례 후 결제
                  </div>
                  <a href="tel:1551-5718" style={{
                    display: 'block', textAlign: 'center', padding: '0.8rem',
                    background: p.color, color: 'white', borderRadius: '8px',
                    fontWeight: '700', fontSize: '0.9rem', textDecoration: 'none',
                  }}>
                    📞 바로 상담하기
                  </a>
                  <Link href="/products" style={{ display: 'block', textAlign: 'center', padding: '0.4rem', color: '#64748b', fontSize: '0.8rem', textDecoration: 'none' }}>
                    상세 내역 보기 →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ⑦ 가효 혜택 ══ */}
      <section style={{ padding: '4rem 0', background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{
              display: 'inline-block', padding: '0.3rem 0.9rem',
              background: 'rgba(192,57,43,0.08)', borderRadius: '999px',
              fontSize: '0.75rem', fontWeight: '700', color: '#c0392b',
              letterSpacing: '0.06em', marginBottom: '0.75rem',
            }}>가효상조만의 혜택</span>
            <h2 style={{ fontSize: 'clamp(1.3rem, 3.5vw, 1.75rem)', fontWeight: '800', color: '#1e293b', marginBottom: '0.5rem' }}>
              부담 없는 장례, 가효상조가 약속합니다
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>가입비·월 납입금 없이, 장례 종료 후 결제</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
            {BENEFITS.map((b, i) => (
              <div key={i} style={{
                padding: '1.75rem 1.5rem',
                background: '#f8fafc',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{b.icon}</div>
                <div style={{ fontWeight: '800', fontSize: '1rem', color: '#1e293b', marginBottom: '0.4rem' }}>{b.title}</div>
                <div style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.6 }}>{b.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <a href="tel:1551-5718" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '1rem 2.5rem',
              background: 'linear-gradient(135deg, #c0392b, #96281b)',
              color: 'white', borderRadius: '10px', fontWeight: '800',
              fontSize: '1.05rem', textDecoration: 'none',
              boxShadow: '0 6px 20px rgba(192,57,43,0.3)',
            }}>
              📞 지금 무료 상담 신청하기
            </a>
          </div>
        </div>
      </section>

      {/* ══ ⑧ 장례 절차 ══ */}
      <section style={{ padding: '3.5rem 0', background: '#f8fafc' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <span style={{
              display: 'inline-block', padding: '0.3rem 0.9rem',
              background: 'rgba(0,44,95,0.08)', borderRadius: '999px',
              fontSize: '0.75rem', fontWeight: '700', color: '#002C5F',
              letterSpacing: '0.06em', marginBottom: '0.75rem',
            }}>장례 절차 안내</span>
            <h2 style={{ fontSize: 'clamp(1.3rem, 3.5vw, 1.75rem)', fontWeight: '800', color: '#1e293b' }}>임종부터 안장까지</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
            {STEPS.map((s, idx) => (
              <div key={s.step} style={{
                background: 'white', borderRadius: '12px', padding: '1.1rem',
                border: idx === 0 ? '2px solid #c0392b' : '1px solid #e2e8f0',
                textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%', margin: '0 auto 0.5rem',
                  background: idx === 0 ? 'linear-gradient(135deg,#c0392b,#96281b)' : '#002C5F',
                  color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: '800', fontSize: '0.82rem',
                }}>{s.step}</div>
                <div style={{ fontWeight: '700', fontSize: '0.9rem', color: '#1e293b' }}>{s.title}</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>{s.time}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <Link href="/guide" style={{ color: '#002C5F', fontWeight: '700', fontSize: '0.9rem', textDecoration: 'none', borderBottom: '2px solid #bfdbfe', paddingBottom: '0.1rem' }}>
              장례 절차 자세히 보기 →
            </Link>
          </div>
        </div>
      </section>

      {/* ══ ⑨ 실제 후기 ══ */}
      <section style={{ padding: '3.5rem 0', background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#1e293b' }}>실제 이용 고객 후기</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
            {[
              { name: '김○○', region: '서울 강남구', text: '처음부터 끝까지 세심하게 안내해 주셔서 당황하지 않고 장례를 마칠 수 있었습니다.' },
              { name: '이○○', region: '경기 수원시', text: '예상 견적과 실제 비용이 거의 일치해 믿음이 갔어요. 추가비 없이 투명하게 진행됐습니다.' },
              { name: '최○○', region: '인천 연수구', text: '새벽 3시에도 바로 앰뷸런스를 보내주셨어요. 큰 위로가 되었습니다.' },
            ].map(t => (
              <div key={t.name} style={{
                background: 'white', borderRadius: '14px', padding: '1.5rem',
                border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}>
                <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '0.6rem' }}>
                  {[1,2,3,4,5].map(i => <span key={i} style={{ color: '#C9A84C', fontSize: '0.9rem' }}>★</span>)}
                </div>
                <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.7, marginBottom: '0.75rem', fontStyle: 'italic' }}>"{t.text}"</p>
                <div style={{ fontWeight: '700', color: '#1e293b', fontSize: '0.85rem' }}>{t.name} · {t.region}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ⑩ FAQ ══ */}
      <section style={{ padding: '3.5rem 0', background: '#f8fafc' }}>
        <div className="container" style={{ maxWidth: '720px' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#1e293b', marginBottom: '1.25rem', textAlign: 'center' }}>자주 묻는 질문</h2>
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
                <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.65, paddingLeft: '1.4rem', margin: 0 }}>{faq.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ⑪ Bottom CTA ══ */}
      <section style={{ padding: '4rem 0', background: '#002C5F', position: 'relative', overflow: 'hidden' }}>
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
              color: 'white', borderRadius: '10px', fontWeight: '800',
              fontSize: '1.1rem', textDecoration: 'none', boxShadow: '0 4px 20px rgba(192,57,43,0.45)',
            }}>
              📞 1551-5718 · 지금 전화하기
            </a>
            <Link href="/estimate" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              padding: '1.1rem 1rem', background: 'rgba(255,255,255,0.1)',
              color: 'white', border: '2px solid rgba(255,255,255,0.3)',
              borderRadius: '10px', fontWeight: '700', fontSize: '1rem', textDecoration: 'none',
            }}>
              🧮 비용 미리 확인하기
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
