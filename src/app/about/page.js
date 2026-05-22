import Link from 'next/link';

export const metadata = {
  title: '가효상조 소개 | 100% 후불제 상조 - 추가금 없는 확정가',
  description: '가효상조는 장례 완료 후 결제하는 100% 후불제 상조입니다. 상품 구성 임의 제외, 저질 용품 끼워넣기, 업그레이드 유도를 일절 하지 않습니다.',
};

export default function AboutPage() {
  const today = new Date().toISOString().split('T')[0];

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'item': { '@id': 'https://gahyo.co.kr/', 'name': '홈' } },
        { '@type': 'ListItem', 'position': 2, 'item': { '@id': 'https://gahyo.co.kr/about', 'name': '회사 소개' } }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      'headline': '가효상조 소개 - 추가금 없는 100% 후불제 상조',
      'author': {
        '@type': 'Organization',
        'name': '가효상조',
        'url': 'https://gahyo.com'
      },
      'dateModified': today,
      'datePublished': '2023-01-01',
      'publisher': {
        '@type': 'Organization',
        'name': '가효상조',
        'logo': { '@type': 'ImageObject', 'url': 'https://gahyo.com/logo.png' }
      },
      'about': {
        '@type': 'Thing',
        'name': '후불제 상조 서비스'
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': '가효상조의 후불제 상조란 무엇인가요?',
          'acceptedAnswer': { '@type': 'Answer', 'text': '가효상조는 장례 절차가 모두 완료된 발인 날에 약정된 상품 금액만 결제하는 100% 후불제 상조입니다. 가입비, 월 납입금, 위약금이 전혀 없습니다.' }
        },
        {
          '@type': 'Question',
          'name': '장례 도중에 추가 비용이 발생하지 않나요?',
          'acceptedAnswer': { '@type': 'Answer', 'text': '상품 내 의전 서비스(장례지도사, 도우미, 차량, 용품)에 대한 추가금은 일절 없습니다. 단, 장례식장 시설 이용료, 조문객 식대, 화장장 이용료는 상조 상품과 별개인 실비로 사전에 투명하게 안내드립니다.' }
        },
        {
          '@type': 'Question',
          'name': '가효상조는 왜 선불식 상조보다 저렴한가요?',
          'acceptedAnswer': { '@type': 'Answer', 'text': '선불식 상조회사는 대규모 TV 광고비, 영업사원 수당, 안마의자 같은 결합 상품 비용을 납입금에 포함시킵니다. 가효상조는 이 거품을 완전히 제거하고 장례 서비스 본질에만 집중합니다.' }
        }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': '가효상조',
      'url': 'https://gahyo.com',
      'contactPoint': {
        '@type': 'ContactPoint',
        'telephone': '1551-5718',
        'contactType': 'customer service',
        'availableLanguage': 'Korean',
        'hoursAvailable': 'Mo-Su 00:00-23:59'
      }
    }
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div style={{ background: '#f8f9fa', minHeight: '100vh', paddingBottom: '6rem' }}>

        {/* ── H1 & BLUF 요약 (최상단 핵심 정의) ── */}
        <header style={{ background: 'linear-gradient(135deg, var(--navy), #001a3a)', paddingTop: '5rem', paddingBottom: '4rem', color: 'white' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <span style={{ display: 'inline-block', background: 'rgba(201,168,76,0.2)', color: 'var(--gold)', padding: '0.4rem 1rem', borderRadius: '999px', fontSize: '0.9rem', fontWeight: '800', marginBottom: '1.25rem' }}>
              대한민국 후불제 상조
            </span>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.75rem)', fontWeight: '900', lineHeight: 1.3, letterSpacing: '-0.03em', marginBottom: '1.75rem', wordBreak: 'keep-all' }}>
              가효상조 — 추가금 없는<br />
              <span style={{ color: 'var(--gold)' }}>100% 후불제 상조</span>입니다.
            </h1>

            {/* BLUF: AI가 인용하기 좋은 핵심 정의 블록 */}
            <div style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.92)', wordBreak: 'keep-all', margin: 0 }}>
                <strong style={{ color: 'var(--gold)' }}>가효상조는 장례 절차가 완료된 발인 날, 약정된 금액만 결제하는 완전 후불제 상조 서비스입니다.</strong><br />
                가입비·월 납입금·위약금이 없으며, 상품 내 포함된 의전 서비스에 대한 추가 청구는 단 1원도 없습니다.
              </p>
            </div>

            {/* 저자 및 업데이트 정보 (E-E-A-T) */}
            <div style={{ display: 'inline-flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', padding: '0.75rem 1.25rem', background: 'rgba(255,255,255,0.08)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.1rem' }}>🏢</span>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.55)' }}>작성 및 관리</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: '700' }}>가효상조 공식 운영팀</div>
                </div>
              </div>
              <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.2)' }} />
              <div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.55)' }}>최종 업데이트</div>
                <div style={{ fontSize: '0.9rem', fontWeight: '700' }}>{today}</div>
              </div>
            </div>
          </div>
        </header>

        {/* ── H2 섹션 1: 가효상조의 3대 원칙 (핵심 차별점) ── */}
        <section style={{ padding: '4rem 1rem' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '0.5rem', paddingBottom: '0.75rem', borderBottom: '3px solid var(--gold)' }}>
              1. 가효상조의 3대 절대 원칙
            </h2>
            <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              가효상조는 아래 세 가지 원칙을 절대 위반하지 않습니다. 이 원칙이 가효상조를 선택하는 유가족이 늘어나는 단 하나의 이유입니다.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { num: '01', icon: '❌', title: '필수 상품 구성 임의 제외 금지', desc: '단가를 낮추기 위해 수의, 관, 도우미 등 장례에 꼭 필요한 구성을 빼지 않습니다. 처음 안내받은 구성 그대로 진행됩니다.' },
                { num: '02', icon: '❌', title: '저질 장례 용품 끼워넣기 금지', desc: '마진을 남기기 위해 저급한 수의나 규격 미달 관을 몰래 사용하지 않습니다. 전 상품은 표준화된 1등급 정품만 사용합니다.' },
                { num: '03', icon: '❌', title: '업그레이드·추가 결제 유도 금지', desc: '장례 도중 경황없는 유가족에게 더 비싼 상품으로의 업그레이드나 추가 결제를 유도하지 않습니다.' },
              ].map(item => (
                <div key={item.num} style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                  <div style={{ background: '#fef2f2', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1.3rem' }}>{item.icon}</div>
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#1e293b', marginBottom: '0.4rem' }}>
                      <span style={{ color: '#c0392b', marginRight: '0.4rem' }}>{item.num}.</span>{item.title}
                    </h3>
                    <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── H2 섹션 2: 후불제란 무엇인가 (정의 및 비교) ── */}
        <section style={{ background: 'white', padding: '4rem 1rem' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '0.5rem', paddingBottom: '0.75rem', borderBottom: '3px solid var(--gold)' }}>
              2. 선불식 vs 후불제 상조 비교
            </h2>
            <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              선불식 상조는 매월 납입금을 내다가 장례가 발생하면 쓰는 방식입니다.<br />
              후불제 상조는 장례가 끝난 뒤에만 비용이 발생합니다.
            </p>

            {/* 비교표 */}
            <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', background: 'var(--navy)', color: 'white', padding: '1rem 1.25rem', fontWeight: '700', fontSize: '0.95rem', gap: '0.5rem' }}>
                <span>비교 항목</span><span style={{ textAlign: 'center' }}>선불식 상조</span><span style={{ textAlign: 'center', color: 'var(--gold)' }}>가효상조 (후불제)</span>
              </div>
              {[
                ['사전 가입·납입', '월 납입 필요', '불필요'],
                ['위약금', '중도 해지 시 발생', '없음'],
                ['추가 비용', '장례 중 수백만 원 요구', '상품 내 의전 0원'],
                ['환급 제도', '있음 (=거품의 반증)', '없음 (=거품 자체가 없음)'],
                ['최종 비용 예측', '어려움', '확정가로 투명'],
              ].map(([label, a, b], i) => (
                <div key={label} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', padding: '1rem 1.25rem', background: i % 2 === 0 ? '#f8fafc' : 'white', borderTop: '1px solid #e2e8f0', gap: '0.5rem', alignItems: 'center' }}>
                  <span style={{ fontWeight: '700', color: '#334155', fontSize: '0.95rem' }}>{label}</span>
                  <span style={{ textAlign: 'center', color: '#ef4444', fontSize: '0.9rem' }}>{a}</span>
                  <span style={{ textAlign: 'center', color: '#16a34a', fontWeight: '700', fontSize: '0.9rem' }}>{b}</span>
                </div>
              ))}
            </div>

            {/* 비용 시뮬레이션 */}
            <div style={{ background: '#1a1a2e', borderRadius: '12px', padding: '2rem', color: 'white', marginBottom: '0' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '1.25rem', color: 'var(--gold)', textAlign: 'center' }}>
                💡 타사 미끼 상품 vs 가효상조 — 최종 비용 비교
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', padding: '1.25rem', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginBottom: '0.5rem' }}>타사 미끼 상품</div>
                  <div style={{ color: '#ef4444', fontSize: '0.9rem', lineHeight: 1.8 }}>초기 150만 원<br />+ 인력 추가 50만<br />+ 수의 강요 150만<br />+ 제단 장식 50만</div>
                  <div style={{ marginTop: '0.75rem', fontSize: '1.35rem', fontWeight: '900', color: '#ef4444' }}>최종 400만 원+</div>
                </div>
                <div style={{ background: 'rgba(201,168,76,0.12)', borderRadius: '8px', padding: '1.25rem', textAlign: 'center', border: '1px solid rgba(201,168,76,0.3)' }}>
                  <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginBottom: '0.5rem' }}>가효상조 270</div>
                  <div style={{ color: '#86efac', fontSize: '0.9rem', lineHeight: 1.8 }}>확정가 270만 원<br />부당 추가금 0원<br />–<br />–</div>
                  <div style={{ marginTop: '0.75rem', fontSize: '1.35rem', fontWeight: '900', color: 'var(--gold)' }}>최종 270만 원</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── H2 섹션 3: 서비스 세부 안내 ── */}
        <section style={{ padding: '4rem 1rem' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '0.5rem', paddingBottom: '0.75rem', borderBottom: '3px solid var(--gold)' }}>
              3. 가효상조 서비스 세부 안내
            </h2>
            <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              가효상조의 장례는 전문 인력의 밀착 지원으로 처음부터 끝까지 체계적으로 진행됩니다.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', borderTop: '4px solid var(--navy)' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '1rem' }}>
                  👥 전문 인력 배치
                </h3>
                <ul style={{ listStyle: 'disc', paddingLeft: '1.25rem', color: '#475569', lineHeight: 1.8, fontSize: '0.95rem' }}>
                  <li>1급 국가공인 장례지도사 1명 (3일 전담)</li>
                  <li>전문 접객 도우미 (상품 기준 최대 6명)</li>
                  <li>염습 전문 상례사 2명 포함</li>
                  <li>성별 선택 가능 (여성 상례사 배정 지원)</li>
                </ul>
              </div>
              <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', borderTop: '4px solid var(--gold)' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#92520a', marginBottom: '1rem' }}>
                  🚗 의전 차량 지원
                </h3>
                <ul style={{ listStyle: 'disc', paddingLeft: '1.25rem', color: '#475569', lineHeight: 1.8, fontSize: '0.95rem' }}>
                  <li>앰뷸런스 관내 지원 (전 상품 동일)</li>
                  <li>유족 전용 버스 (330 이상: 리무진 동시 지원)</li>
                  <li>430 상품: 장거리 400km 왕복 지원</li>
                  <li>종교별 선두 차량 리본 제공</li>
                </ul>
              </div>
            </div>

            {/* 상품별 요약 비교 */}
            <div style={{ background: 'white', borderRadius: '12px', padding: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '1.25rem' }}>
                📦 상품별 한눈에 보기
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
                {[
                  { name: '무빈소 170', price: '170만 원', feature: '가족 소규모 1~2일장', accent: '#4b5563' },
                  { name: '가효 270', price: '270만 원', feature: '표준 3일장 (추천)', accent: '#002c5f' },
                  { name: '가효 330', price: '330만 원', feature: '리무진 포함 품격장', accent: '#92520a' },
                  { name: '가효 430', price: '430만 원', feature: '장거리 VIP 프리미엄', accent: '#1d4a3a' },
                ].map(p => (
                  <div key={p.name} style={{ border: `2px solid ${p.accent}`, borderRadius: '8px', padding: '1rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: '800', color: p.accent, marginBottom: '0.25rem' }}>{p.name}</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: '900', color: '#1e293b', marginBottom: '0.25rem' }}>{p.price}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.4 }}>{p.feature}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
                <Link href="/products" style={{ display: 'inline-block', padding: '0.75rem 2rem', background: 'var(--navy)', color: 'white', borderRadius: '999px', fontWeight: '700', fontSize: '0.95rem', textDecoration: 'none' }}>
                  📋 상품 상세 비교 보기 →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── H2 섹션 4: 장례 후 지원 (법률 상담) ── */}
        <section style={{ background: 'white', padding: '4rem 1rem' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '0.5rem', paddingBottom: '0.75rem', borderBottom: '3px solid var(--gold)' }}>
              4. 장례 이후 가효상조 무료 지원 서비스
            </h2>
            <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              가효상조는 장례가 끝난 이후에도 유가족의 법적·행정적 부담을 줄여드립니다.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { num: '01', title: '상속포기 / 한정승인 안내', desc: '임종 후 3개월 이내 신청하지 않으면 고인의 채무가 자동 승계됩니다. 골든타임 내 법률 상담을 무료로 연결해 드립니다.' },
                { num: '02', title: '안심상속 원스톱 서비스 안내', desc: '금융, 토지, 자동차, 세금 체납까지 고인의 재산과 채무를 한 번에 조회할 수 있도록 절차를 안내합니다.' },
                { num: '03', title: '상속세·취득세 세무 상담 연계', desc: '상속세는 6개월 내 신고가 의무입니다. 기한을 넘기면 가산세가 부과됩니다. 전문 세무사와의 상담을 연계해 드립니다.' },
              ].map(item => (
                <div key={item.num} style={{ background: '#f8fafc', borderRadius: '12px', padding: '1.5rem', display: 'flex', gap: '1.25rem' }}>
                  <div style={{ background: 'var(--navy)', color: 'white', borderRadius: '8px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.85rem', flexShrink: 0 }}>{item.num}</div>
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#1e293b', marginBottom: '0.35rem' }}>{item.title}</h3>
                    <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── H2 섹션 5: FAQ (롱테일 질문형 키워드) ── */}
        <section style={{ padding: '4rem 1rem', background: '#f8fafc' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '0.5rem', paddingBottom: '0.75rem', borderBottom: '3px solid var(--gold)' }}>
              5. 자주 묻는 질문 (FAQ)
            </h2>
            <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              가효상조를 처음 접하시는 분들이 가장 많이 하시는 질문을 모았습니다.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                { q: '가효상조는 언제 전화해도 되나요?', a: '네, 24시간 365일 연중무휴로 운영합니다. 새벽에 임종이 발생하더라도 즉시 장례지도사가 출동하여 안치와 빈소 수배를 도와드립니다. 1551-5718로 연락주세요.' },
                { q: '사전 가입이나 월 납입금이 없어도 장례 서비스를 받을 수 있나요?', a: '맞습니다. 가효상조는 사전 가입 없이도 임종 발생 즉시 서비스를 이용하실 수 있습니다. 월 납입금, 가입비, 해지 위약금이 전혀 없으며, 장례 완료 후에만 약정된 금액을 결제하시면 됩니다.' },
                { q: '장례식장 시설비, 식대, 화장장 비용도 상조 금액에 포함되나요?', a: '아니요. 장례식장 빈소 대여료, 조문객 식대, 화장장 이용료는 어느 상조사를 이용하더라도 유가족이 부담하는 실비입니다. 가효상조는 이 실비 항목을 상담 시 미리 명확히 분리하여 안내해 드리므로, 예상치 못한 청구는 없습니다.' },
                { q: '저렴하면 수의나 관의 품질이 낮지 않나요?', a: '전혀 그렇지 않습니다. 가효상조는 오동나무 관, 친환경 전통한지 수의 등 표준화된 1등급 정품 장례 용품만 사용합니다. 광고비와 영업비를 제거한 것이지, 장례 용품의 품질을 낮춘 것이 아닙니다.' },
              ].map((faq, i) => (
                <article key={i} style={{ background: 'white', borderRadius: '12px', padding: '1.75rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
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

        {/* ── 최종 CTA ── */}
        <section style={{ padding: '5rem 1rem', background: 'white' }}>
          <div className="container" style={{ maxWidth: '600px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#1a1a2e', marginBottom: '1rem', lineHeight: 1.4 }}>
              지금 바로 안심 상담을 받으세요
            </h2>
            <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              정해진 예산 안에서 고인의 마지막을 정직하고 품격 있게 모시고 싶으신 분들을 위해 가효상조가 24시간 대기하고 있습니다.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
              <a href="tel:1551-5718" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem', background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))', color: '#0f172a', padding: '1.25rem 3rem', width: '100%', maxWidth: '400px', borderRadius: '999px', boxShadow: '0 8px 25px rgba(201,168,76,0.3)', textDecoration: 'none', fontWeight: '900', fontSize: '1.3rem' }}>
                📞 1551-5718
                <span style={{ fontSize: '0.9rem', fontWeight: '600', opacity: 0.8 }}>(24시간 무료 안심 상담)</span>
              </a>
              <a href="http://pf.kakao.com/_ntRdX" target="_blank" rel="noopener noreferrer" style={{ display: 'block', background: '#FEE500', color: '#391B1B', fontWeight: '800', fontSize: '1.1rem', padding: '1rem 3rem', width: '100%', maxWidth: '400px', borderRadius: '999px', textAlign: 'center', textDecoration: 'none' }}>
                💬 카카오톡 상담하기
              </a>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
