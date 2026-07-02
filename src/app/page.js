import Link from 'next/link';
import dynamic from 'next/dynamic';
import HeroSection from '@/components/HeroSection';

// 폴드 아래 클라이언트 컴포넌트 — JS 청크를 별도로 분리해 초기 번들 크기 절감
const StatsCounter = dynamic(() => import('@/components/StatsCounter'));
const FreeConsultSection = dynamic(() => import('@/components/FreeConsultSection'));

export const metadata = {
  title: '가효상조 | 100% 후불제 상조 및 투명한 장례 서비스',
  description: '가입비·월납입 0원. 장례 종료 후 결제하는 100% 후불제 상조입니다. 24시간 즉시 출동, 전국 200곳 제휴 장례식장. 지금 바로 무료 상담받으세요.',
  keywords: ['가효상조', '후불제상조', '장례식장', '장례', '상조회사', '장례비용', '24시간상조'],
  alternates: { canonical: 'https://gahyo.co.kr' },
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

/* ─── 라인 아이콘 ─── */
const Svg = ({ d, ...p }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...p}>{d}</svg>
);
const IcCheck = (p) => <Svg d={<path d="M20 6 9 17l-5-5" />} strokeWidth="2" {...p} />;
const IcPhone = (p) => <Svg d={<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />} {...p} />;
const IcDoc = (p) => <Svg d={<><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M9 7h6M9 11h6M9 15h4" /></>} {...p} />;
const IcWon = (p) => <Svg d={<path d="M4 6l3 8 3-8 3 8 3-8M3 9h18M3 13h18" />} {...p} />;
const IcHall = (p) => <Svg d={<path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-5h6v5" />} {...p} />;
const IcCal = (p) => <Svg d={<><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M3 10h18M8 2v4M16 2v4" /></>} {...p} />;
const IcCard = (p) => <Svg d={<><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></>} {...p} />;
const IcClock = (p) => <Svg d={<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>} {...p} />;
const IcShield = (p) => <Svg d={<><path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z" /><path d="M9 12l2 2 4-4" /></>} {...p} />;
const IcUser = (p) => <Svg d={<><circle cx="12" cy="8" r="4" /><path d="M4 21v-1a7 7 0 0 1 14 0v1" /></>} {...p} />;

const IcMap = { won: IcWon, cal: IcCal, card: IcCard, clock: IcClock, shield: IcShield, user: IcUser };

/* ─── 데이터 ─── */
const QUICK = [
  { ic: IcPhone, label: '장례 접수', sub: '지금 바로 연결', href: 'tel:1551-5718', accent: true },
  { ic: IcDoc, label: '장례 절차', sub: '단계별 안내', href: '/guide' },
  { ic: IcWon, label: '비용 확인', sub: '투명한 견적', href: '/estimate' },
  { ic: IcHall, label: '장례식장', sub: '전국 200+ 제휴', href: '/halls' },
];

const PRODUCTS = [
  { id: 'mubin', name: '가효 무빈소', price: '120만원', meta: '1~2일장 · 조용한 가족장',
    features: [['장례지도사', '1명 파견'], ['도우미', '미포함'], ['차량', '장의버스(8인승) 150km'], ['수의', '미포함'], ['유골함', '기본 목함']] },
  { id: 'g265', name: '가효 265', price: '265만원', meta: '3일장 · 일반적인 장례', popular: true,
    features: [['장례지도사', '1명 (3일)'], ['도우미', '3명 / 30시간'], ['차량', '버스 200km'], ['수의', '친환경 한지수의'], ['유골함', '도자기 기본함']] },
  { id: 'g334', name: '가효 334', price: '334만원', meta: '3일장 · 리무진 포함',
    features: [['장례지도사', '1명 (3일)'], ['도우미', '4명 / 40시간'], ['차량', '리무진+버스 200km'], ['수의', '저마수의'], ['유골함', '도자기봉안함']] },
  { id: 'g363', name: '가효 363', price: '363만원', meta: '3일장 · 장거리 VIP',
    features: [['장례지도사', '1명 (3일)'], ['도우미', '5명 / 50시간'], ['차량', '리무진+버스 400km'], ['수의', '대마수의'], ['유골함', '도자기봉안함']] },
];

const COMPARE = [
  { type: '선불제 상조', price: '~500만원+', note: '가입비·납입금 총액 포함',
    checks: [['가입비', '있음'], ['월 납입금', '있음'], ['즉시 출동', '부분적'], ['추가비용', '발생 가능'], ['장례 후 결제', '없음']] },
  { type: '장례식장 직접', price: '~380만원+', note: '부가서비스 미포함',
    checks: [['가입비', '없음'], ['월 납입금', '없음'], ['즉시 출동', '없음'], ['추가비용', '발생 가능'], ['장례 후 결제', '없음']] },
  { type: '가장 합리적', price: '120~363만원', note: '추가비용 없음 보장', highlight: true,
    checks: [['가입비', '없음'], ['월 납입금', '없음'], ['즉시 출동', '24시간'], ['추가비용', '없음'], ['장례 후 결제', '100%']] },
];

const BENEFITS = [
  ['won', '가입비 0원', '초기 가입비 없이 필요할 때만 이용합니다.'],
  ['cal', '월 납입금 0원', '매월 내는 부담금 없는 완전 후불제.'],
  ['card', '장례 종료 후 결제', '발인 날 실제 사용한 비용만 정산합니다.'],
  ['clock', '24시간 즉시 출동', '새벽·명절 관계없이 전국 어디서나.'],
  ['shield', '추가비용 없음 보장', '견적이 곧 실결제, 숨은 비용 없습니다.'],
  ['user', '전담 지도사 1:1', '처음부터 끝까지 한 분이 동행합니다.'],
];

const STEPS = [
  ['01', '임종 직후', '0~1시간', true], ['02', '장례식장 이송', '1~3시간'], ['03', '빈소 설치', '3~6시간'],
  ['04', '입관·염습', '2일차'], ['05', '발인·운구', '3일차 오전'], ['06', '화장·안장', '발인 당일'],
];

const REVIEWS = [
  { who: '김○○ · 서울 강남구', text: '처음부터 끝까지 세심하게 안내해 주셔서 당황하지 않고 장례를 마칠 수 있었습니다.' },
  { who: '이○○ · 경기 수원시', text: '예상 견적과 실제 비용이 거의 일치해 믿음이 갔어요. 추가비 없이 투명하게 진행됐습니다.' },
  { who: '최○○ · 인천 연수구', text: '새벽 3시에도 바로 앰뷸런스를 보내주셨어요. 큰 위로가 되었습니다.' },
];

const FAQS = [
  ['후불제 상조란 무엇인가요?', '가입비·월 납입금 없이, 장례 종료 후 실제 이용한 비용만 결제합니다.'],
  ['한밤중에도 출동이 가능한가요?', '24시간 연중무휴로 운영합니다. 임종 직후 1551-5718로 전화하시면 즉시 앰뷸런스를 배차합니다.'],
  ['장례식장을 미리 정하지 않았어도 되나요?', '전담 장례지도사가 거주지·예산에 맞는 전국 500여 곳 제휴 장례식장을 즉시 섭외해 드립니다.'],
];

/* ─── 공용 스타일 조각 ─── */
const eyebrow = { display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', fontWeight: '700', letterSpacing: '0.14em', color: 'var(--gold-dark)', textTransform: 'uppercase' };
const hSec = { fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.7rem, 3.6vw, 2.5rem)', fontWeight: '700', color: 'var(--text-primary)', lineHeight: 1.32, marginTop: '0.7rem' };
const subSec = { color: 'var(--text-secondary)', fontSize: '1.02rem', marginTop: '0.8rem', maxWidth: '560px', marginLeft: 'auto', marginRight: 'auto', wordBreak: 'keep-all' };

export default function HomePage() {
  const today = new Date().toISOString().split('T')[0];

  const jsonLd = [
    { '@context': 'https://schema.org', '@type': 'Organization', '@id': 'https://gahyo.co.kr', 'name': '가효상조', 'url': 'https://gahyo.co.kr', 'logo': 'https://gahyo.co.kr/logo.png', 'contactPoint': { '@type': 'ContactPoint', 'telephone': '1551-5718', 'contactType': 'customer service', 'areaServed': 'KR', 'availableLanguage': 'Korean' }, 'sameAs': ['https://blog.naver.com/gahyo', 'https://www.instagram.com/gahyo'] },
    { '@context': 'https://schema.org', '@type': 'WebSite', 'name': '후불제상조 가효상조', 'alternateName': ['가효상조', 'gahyo.co.kr'], 'url': 'https://gahyo.co.kr/', 'description': '100% 후불제 상조 및 투명한 장례 서비스' },
    { '@context': 'https://schema.org', '@type': 'FAQPage', 'mainEntity': [
      { '@type': 'Question', 'name': '후불제 상조와 선불제 상조의 가장 큰 차이점은 무엇인가요?', 'acceptedAnswer': { '@type': 'Answer', 'text': '가효상조와 같은 후불제 상조는 매월 납입하는 선불금이나 가입비가 전혀 없습니다. 장례가 모두 끝난 발인 날, 실제 사용한 서비스 비용만 결제하므로 경제적이고 투명합니다.' } },
      { '@type': 'Question', 'name': '한밤중에 임종하셨는데 지금 바로 장례식장 이동이 가능한가요?', 'acceptedAnswer': { '@type': 'Answer', 'text': '네, 가능합니다. 가효상조는 24시간 연중무휴로 운영되며, 임종 즉시 1551-5718로 전화 주시면 앰뷸런스를 배차하여 원하시는 장례식장으로 고인을 모십니다.' } },
      { '@type': 'Question', 'name': '장례식장을 미리 정해두지 않았는데 어떻게 하나요?', 'acceptedAnswer': { '@type': 'Answer', 'text': '당황하지 않으셔도 됩니다. 가효상조의 전담 장례지도사가 유가족의 거주지, 예상 조문객 수, 예산 등을 고려하여 최적의 제휴 장례식장(전국 500여 곳)을 실시간으로 섭외해 드립니다.' } },
    ] },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ① HERO */}
      <HeroSection today={today} />

      {/* ② 숫자 카운터 */}
      <StatsCounter />

      {/* ③ 빠른 링크 */}
      <section style={{ background: 'white', padding: '2rem 0', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
            {QUICK.map((item) => {
              const Ic = item.ic;
              return (
                <a key={item.label} href={item.href} style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  gap: '0.5rem', padding: '1.35rem 0.75rem',
                  background: item.accent ? 'var(--navy)' : 'var(--gray-bg)',
                  borderRadius: '14px', textDecoration: 'none',
                  border: item.accent ? 'none' : '1px solid var(--border-color)', minHeight: '96px',
                }}>
                  <Ic width="1.5rem" height="1.5rem" style={{ color: item.accent ? '#fff' : 'var(--gold-dark)' }} />
                  <div style={{ fontWeight: '700', fontSize: '0.95rem', color: item.accent ? 'white' : 'var(--text-primary)' }}>{item.label}</div>
                  <div style={{ fontSize: '0.78rem', color: item.accent ? 'rgba(255,255,255,0.75)' : 'var(--text-secondary)' }}>{item.sub}</div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ④ 무료 상담 */}
      <FreeConsultSection />

      {/* ⑤ 비용 비교 */}
      <section style={{ padding: '4.5rem 0', background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.8rem' }}>
            <span style={eyebrow}>비용 비교</span>
            <h2 style={hSec}>왜 후불제 상조가<br />더 합리적일까요?</h2>
            <p style={subSec}>일반 3일장 기준, 타사와 가효상조를 나란히 비교했습니다.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', maxWidth: '880px', margin: '0 auto' }}>
            {COMPARE.map((col, i) => (
              <div key={i} style={{
                border: col.highlight ? '1.5px solid var(--gold)' : '1px solid var(--border-color)',
                borderRadius: '18px', overflow: 'hidden', background: 'white',
                boxShadow: col.highlight ? '0 24px 48px -24px rgba(133,90,28,0.45)' : 'none',
              }}>
                <div style={{ padding: '1.5rem 1.4rem 1.3rem', textAlign: 'center', background: col.highlight ? 'var(--gold)' : 'var(--gray-bg)', borderBottom: col.highlight ? 'none' : '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: '700', color: col.highlight ? 'rgba(255,255,255,0.85)' : 'var(--text-secondary)' }}>{col.type}</div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.7rem', fontWeight: '700', color: col.highlight ? '#fff' : 'var(--text-primary)', marginTop: '0.5rem', letterSpacing: '-0.02em' }}>{col.price}</div>
                  <div style={{ fontSize: '0.74rem', color: col.highlight ? 'rgba(255,255,255,0.75)' : 'var(--text-secondary)', marginTop: '0.2rem' }}>{col.note}</div>
                </div>
                <div style={{ padding: '0.6rem 1.4rem 1rem' }}>
                  {col.checks.map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.62rem 0', borderBottom: '1px solid var(--border-color)', fontSize: '0.9rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>{k}</span>
                      <span style={{ fontWeight: '700', color: col.highlight ? '#2E6B4F' : 'var(--text-primary)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                        {col.highlight && <IcCheck width="1em" height="1em" />}{v}
                      </span>
                    </div>
                  ))}
                </div>
                {col.highlight && (
                  <div style={{ padding: '0 1.4rem 1.4rem' }}>
                    <a href="tel:1551-5718" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.95rem', background: 'var(--gold)', color: '#fff', borderRadius: '12px', fontWeight: '700', fontSize: '0.98rem', textDecoration: 'none' }}>
                      <IcPhone width="1.1em" height="1.1em" />지금 바로 상담하기
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: '1.3rem', opacity: 0.8 }}>
            * 업계 평균 기준 추정치이며 실제 비용은 상품 구성에 따라 다를 수 있습니다.
          </p>
        </div>
      </section>

      {/* ⑥ 상품 패키지 */}
      <section style={{ padding: '4.5rem 0', background: 'var(--navy-light)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.8rem' }}>
            <span style={eyebrow}>후불제 상조 상품</span>
            <h2 style={hSec}>상황에 맞는 장례 상품</h2>
            <p style={subSec}>장례식장·음식·화장장 비용은 별도이며, 상담 시 미리 투명하게 안내드립니다.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1.1rem' }}>
            {PRODUCTS.map((p) => (
              <div key={p.id} style={{ background: 'white', border: p.popular ? '1.5px solid var(--navy)' : '1px solid var(--border-color)', borderRadius: '18px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                {p.popular && <div style={{ background: 'var(--navy)', color: '#fff', textAlign: 'center', fontSize: '0.76rem', fontWeight: '700', padding: '0.45rem' }}>가장 많이 선택</div>}
                <div style={{ padding: '1.5rem 1.5rem 1.2rem', borderBottom: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '0.92rem', fontWeight: '700', color: 'var(--gold-dark)' }}>{p.name}</div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: '700', color: 'var(--text-primary)', lineHeight: 1, marginTop: '0.35rem', letterSpacing: '-0.02em' }}>{p.price}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>{p.meta}</div>
                </div>
                <div style={{ padding: '0.8rem 1.5rem', flex: 1 }}>
                  {p.features.map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem', padding: '0.42rem 0', borderBottom: '1px solid var(--border-color)', fontSize: '0.82rem' }}>
                      <span style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>{k}</span>
                      <span style={{ color: 'var(--text-primary)', fontWeight: '700', textAlign: 'right' }}>{v}</span>
                    </div>
                  ))}
                </div>
                <div style={{ padding: '1rem 1.5rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', padding: '0.5rem', background: '#E6F0EA', color: '#2E6B4F', borderRadius: '8px', fontSize: '0.76rem', fontWeight: '700' }}>
                    <IcCheck width="1em" height="1em" />추가비용 없음 · 장례 후 결제
                  </div>
                  <a href="tel:1551-5718" style={{ display: 'block', textAlign: 'center', padding: '0.85rem', background: 'var(--navy)', color: '#fff', borderRadius: '10px', fontWeight: '700', fontSize: '0.95rem', textDecoration: 'none' }}>바로 상담하기</a>
                  <Link href="/products" style={{ display: 'block', textAlign: 'center', padding: '0.2rem', color: 'var(--text-secondary)', fontSize: '0.82rem', fontWeight: '600', textDecoration: 'none' }}>상세 내역 보기 →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ⑦ 가효 혜택 */}
      <section style={{ padding: '4.5rem 0', background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.8rem' }}>
            <span style={eyebrow}>가효상조의 약속</span>
            <h2 style={hSec}>부담 없는 장례,<br />가효상조가 약속합니다</h2>
          </div>
          <div className="benefits-grid">
            {BENEFITS.map(([ic, title, desc]) => {
              const Ic = IcMap[ic];
              return (
                <div key={title} style={{ background: 'white', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '1.8rem 1.5rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--gold-light)', color: 'var(--gold-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.1rem' }}>
                    <Ic width="1.5rem" height="1.5rem" strokeWidth="1.6" />
                  </div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>{title}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{desc}</p>
                </div>
              );
            })}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.6rem' }}>
            <a href="tel:1551-5718" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.55rem', padding: '1.05rem 2.4rem', background: 'var(--gold)', color: '#fff', borderRadius: '12px', fontWeight: '700', fontSize: '1.05rem', textDecoration: 'none', boxShadow: '0 8px 22px -8px rgba(133,90,28,0.7)' }}>
              <IcPhone width="1.15em" height="1.15em" />지금 무료 상담 신청하기
            </a>
          </div>
        </div>
      </section>

      {/* ⑧ 장례 절차 */}
      <section style={{ padding: '4.5rem 0', background: 'var(--navy-light)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={eyebrow}>장례 절차 안내</span>
            <h2 style={hSec}>임종부터 안장까지</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.8rem' }}>
            {STEPS.map(([n, t, tm, first]) => (
              <div key={n} style={{ background: 'white', border: first ? '1px solid var(--gold)' : '1px solid var(--border-color)', borderRadius: '14px', padding: '1.3rem 1rem', textAlign: 'center' }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: first ? 'var(--gold)' : 'var(--navy)', color: '#fff', fontFamily: 'var(--font-serif)', fontWeight: '700', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.6rem' }}>{n}</div>
                <div style={{ fontSize: '0.92rem', fontWeight: '700', color: 'var(--text-primary)' }}>{t}</div>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{tm}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link href="/guide" style={{ color: 'var(--gold-dark)', fontWeight: '700', borderBottom: '2px solid var(--gold)', paddingBottom: '2px', textDecoration: 'none' }}>장례 절차 자세히 보기 →</Link>
          </div>
        </div>
      </section>

      {/* ⑨ 후기 */}
      <section style={{ padding: '4.5rem 0', background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}><h2 style={hSec}>실제 이용 고객 후기</h2></div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.1rem' }}>
            {REVIEWS.map((r) => (
              <div key={r.who} style={{ background: 'white', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '1.6rem' }}>
                <div style={{ color: 'var(--gold)', letterSpacing: '0.12em', fontSize: '0.9rem', marginBottom: '0.7rem' }}>★★★★★</div>
                <p style={{ fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '1rem' }}>&ldquo;{r.text}&rdquo;</p>
                <div style={{ fontWeight: '700', fontSize: '0.86rem', color: 'var(--text-primary)' }}>{r.who}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ⑩ FAQ */}
      <section style={{ padding: '4.5rem 0', background: 'var(--navy-light)' }}>
        <div className="container" style={{ maxWidth: '740px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}><h2 style={hSec}>자주 묻는 질문</h2></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
            {FAQS.map(([q, a], i) => (
              <article key={i} style={{ background: 'white', borderRadius: '12px', padding: '1.3rem 1.5rem', border: '1px solid var(--border-color)' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--gold-dark)', flexShrink: 0 }}>Q.</span>{q}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.7, paddingLeft: '1.5rem', margin: 0 }}>{a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ⑪ Bottom CTA */}
      <section style={{ padding: '5rem 0', background: 'var(--navy)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-30%', right: '-8%', width: '420px', height: '420px', background: 'radial-gradient(circle, rgba(169,119,47,0.28) 0%, transparent 68%)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: '700', color: 'white', lineHeight: 1.35, marginBottom: '0.9rem' }}>
            전화 한 통이면 됩니다.<br />나머지는 저희가 합니다.
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.68)', fontSize: '1.05rem', marginBottom: '1.6rem' }}>24시간 연중무휴 · 전국 출동 가능 · 선불 없음</p>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: '700', color: '#fff', marginBottom: '1.6rem', letterSpacing: '0.02em' }}>1551-5718</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.9rem', justifyContent: 'center' }}>
            <a href="tel:1551-5718" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.55rem', padding: '1rem 2rem', background: 'var(--gold)', color: '#fff', borderRadius: '12px', fontWeight: '700', fontSize: '1.05rem', textDecoration: 'none' }}>
              <IcPhone width="1.15em" height="1.15em" />지금 전화하기
            </a>
            <Link href="/estimate" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem', background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.3)', borderRadius: '12px', fontWeight: '700', fontSize: '1rem', textDecoration: 'none' }}>
              비용 미리 확인하기
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
