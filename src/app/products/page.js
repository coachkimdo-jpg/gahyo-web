import Link from 'next/link';

export const metadata = {
  title: '후불제상조상품 비교 및 가격 안내 | 가효상조',
  description: '투명하고 정직한 가효상조의 4가지 후불제상조상품(무빈소 170, 가효 270, 가효 330, 가효 430)을 비교해 보세요. 전문가가 검증한 합리적인 장례비용입니다.',
};

const PRODUCTS = [
  {
    id: '170',
    name: '가효 무빈소 170',
    price: '1,700,000',
    badge: '실속 장례',
    desc: '빈소 없이 가족끼리 조용히 모시는 1~2일장',
    accent: '#4b5563',
    accentLight: '#f3f4f6',
    borderColor: '#d1d5db',
    rows: [
      { icon: '👥', label: '인력 지원', value: '장례지도사 1명 / 3일 파견 / 장례예식 총괄 진행 / 장지동행 / 염습(2명)\n장례도우미 미지원' },
      { icon: '🚗', label: '의전 차량', value: '[앰뷸런스] 관내(요청 시 행정구역 기준) 제공\n[유족전용 버스] 총 200km 이내 제공 (1km 추가시 2000원)' },
      { icon: '⚰️', label: '고인 용품', value: '[관] 오동나무 1.5치(매장) 또는 1치+기본봉안함(화장)\n[수의] 면 100%(기계직) 및 수의 재질과 동일한 요/이불/염포\n[대렴] 전통 상례에 따른 궁중 한지대렴(국화) 제공' },
      { icon: '🌸', label: '입관 용품', value: '[규격품] 명정, 관보, 결관바, 연출꽃 등 제공\n[궁중대렴] 국화꽃 모양의 한지고깔 제공\n[위생용품] 베게, 습신, 수시포, 한지, 예단, 다라니경, 탈지면, 알코올 등' },
      { icon: '👔', label: '상복 제공', value: '남상복 2벌 (Y셔츠, 넥타이 포함) / 여상복 2벌\n완정, 두건, 행전, 상장, 근조리본 필요량 제공' },
      { icon: '✨', label: '특화 서비스', value: '[특별서비스] 유가족 장례편의용품 1BOX, 꽃침대 연출 등\n[안내서비스] 화장예약, 제례, 장례행정, 유품정리, 장지 안내' },
    ],
  },
  {
    id: '270',
    name: '가효 270',
    price: '2,700,000',
    badge: '추천 상품',
    desc: '합리적인 비용으로 치르는 표준 3일장',
    accent: '#002C5F',
    accentLight: '#e6eef8',
    borderColor: '#93b3d8',
    rows: [
      { icon: '👥', label: '인력 지원', value: '장례지도사 1명 / 3일 파견 / 장례예식 총괄 진행 / 장지동행 / 염습(2명)\n장례도우미 4명(10시간 기준) 지원 / 조문객 접대' },
      { icon: '🚗', label: '의전 차량', value: '[앰뷸런스] 관내(요청 시 행정구역 기준) 제공\n[유족전용 버스] 200Km(왕복) 이내 제공 (화장장 기준)' },
      { icon: '⚰️', label: '고인 용품', value: '[관] 오동나무 1.5치(매장) 또는 1치+기본봉안함(화장)\n[수의] 종이수의 및 수의 재질과 동일한 요/이불/염포\n[대렴] 전통 상례에 따른 궁중 한지대렴(국화) 제공' },
      { icon: '🌸', label: '입관 용품', value: '[규격품] 명정, 관보, 결관바, 연출꽃 등 제공\n[궁중대렴] 국화꽃 모양의 한지고깔 제공\n[위생용품] 베게, 습신, 수시포, 한지, 예단, 다라니경, 탈지면, 알코올 등' },
      { icon: '👔', label: '상복 제공', value: '남상복 3벌 (Y셔츠, 넥타이 포함) / 여상복 5벌\n완정, 두건, 행전, 상장, 근조리본 필요량 제공' },
      { icon: '✨', label: '특화 서비스', value: '[특별서비스] 유가족 장례편의용품 1BOX, 꽃침대 연출 등\n[기타서비스] 방명록, 부의록, 축문, 흰장갑, 향, 양초 등 제공\n[안내서비스] 화장예약, 제례, 장례행정, 유품정리, 장지 안내' },
    ],
  },
  {
    id: '330',
    name: '가효 330',
    price: '3,300,000',
    badge: '가장 많이 찾는',
    desc: '리무진이 포함된 품격 있는 3일장',
    accent: '#92520a',
    accentLight: '#fdf3e0',
    borderColor: '#d4a843',
    popular: true,
    rows: [
      { icon: '👥', label: '인력 지원', value: '장례지도사 1명 / 3일 파견 / 장례예식 총괄 진행 / 장지동행 / 염습(2명)\n장례도우미 5명(10시간 기준) 지원 / 조문객 접대' },
      { icon: '🚗', label: '의전 차량', value: '[앰뷸런스] 관내(요청 시 행정구역 기준) 제공\n[고인전용 리무진] 200Km(왕복) 이내 제공\n[유족전용 버스] 200Km(왕복) 이내 제공\n* 선두 차량용 종교별 리본 제공' },
      { icon: '⚰️', label: '고인 용품', value: '[관] 오동나무 1.5치(매장) 또는 1치+기본봉안함(화장)\n[수의] 저마수의(저마 100%, 기계직) 및 동일 재질 요/이불/염포\n[대렴] 전통 상례에 따른 궁중 한지대렴(국화) 제공' },
      { icon: '🌸', label: '입관 용품', value: '[규격품] 명정, 관보, 결관바, 연출꽃 등 제공\n[궁중대렴] 국화꽃 모양의 한지고깔 제공\n[위생용품] 베게, 습신, 수시포, 한지, 예단, 다라니경, 탈지면, 알코올 등' },
      { icon: '👔', label: '상복 제공', value: '남상복 5벌 (Y셔츠, 넥타이 포함) / 여상복 7벌\n완정, 두건, 행전, 상장, 근조리본 필요량 제공' },
      { icon: '✨', label: '특화 서비스', value: '[특별서비스] 유가족 장례편의용품 1BOX, 꽃침대 연출 등\n[기타서비스] 방명록, 부의록, 축문, 흰장갑, 향, 양초 등 제공\n[안내서비스] 화장예약, 제례, 장례행정, 유품정리, 장지 안내' },
    ],
  },
  {
    id: '430',
    name: '가효 430',
    price: '4,300,000',
    badge: '프리미엄 VIP',
    desc: '장거리 이동이 가능한 최고급 프리미엄 장례',
    accent: '#1d4a3a',
    accentLight: '#e8f2ee',
    borderColor: '#5a9e80',
    rows: [
      { icon: '👥', label: '인력 지원', value: '장례지도사 1명 / 3일 파견 / 장례예식 총괄 진행 / 장지동행 / 염습(2명)\n장례도우미 6명(10시간 기준) 지원 / 조문객 접대' },
      { icon: '🚗', label: '의전 차량', value: '[앰뷸런스] 관내(요청 시 행정구역 기준) 제공\n[고인전용 리무진] 400Km(왕복) 이내 제공 (화장장 기준)\n[유족전용 버스] 400Km(왕복) 이내 제공\n* 선두 차량용 종교별 리본 제공' },
      { icon: '⚰️', label: '고인 용품', value: '[관] 오동나무 1.5치(매장) 또는 1치+기본봉안함(화장)\n[수의] 대마수의(대마 100%, 기계직) 및 동일 재질 요/이불/염포\n[대렴] 전통 상례에 따른 궁중 한지대렴(국화) 제공' },
      { icon: '🌸', label: '입관 용품', value: '[규격품] 명정, 관보, 결관바, 연출꽃 등 제공\n[궁중대렴] 국화꽃 모양의 한지고깔 제공\n[위생용품] 베게, 습신, 수시포, 한지, 예단, 다라니경, 탈지면, 알코올 등' },
      { icon: '👔', label: '상복 제공', value: '남상복 7벌 (Y셔츠, 넥타이 포함) / 여상복 9벌\n완정, 두건, 행전, 상장, 근조리본 필요량 제공' },
      { icon: '✨', label: '특화 서비스', value: '[특별서비스] 유가족 장례편의용품 1BOX, 꽃침대 연출 등\n[기타서비스] 방명록, 부의록, 축문, 흰장갑, 향, 양초 등 제공\n[안내서비스] 화장예약, 제례, 장례행정, 유품정리, 장지 안내' },
    ],
  },
];

export default function ProductsPage() {
  const today = new Date().toISOString().split('T')[0];

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'item': { '@id': 'https://gahyo.co.kr/', 'name': '홈' } },
        { '@type': 'ListItem', 'position': 2, 'item': { '@id': 'https://gahyo.co.kr/products', 'name': '장례 상품 안내' } }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      'headline': '거품 없는 100% 후불제상조상품 비교 가이드',
      'author': {
        '@type': 'Person',
        'name': '가효상조 수석 장례지도사',
        'url': 'https://gahyo.com/about'
      },
      'dateModified': today,
      'datePublished': '2023-01-01',
      'publisher': {
        '@type': 'Organization',
        'name': '가효상조',
        'logo': { '@type': 'ImageObject', 'url': 'https://gahyo.com/logo.png' }
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': '후불제 상조는 왜 선불식 상조보다 저렴한가요?',
          'acceptedAnswer': { '@type': 'Answer', 'text': '선불식 상조회사의 막대한 영업비와 광고비를 모두 빼고 장례 서비스 본질에만 집중하기 때문에 동일 구성이라도 100~200만 원 이상 저렴합니다.' }
        },
        {
          '@type': 'Question',
          'name': '가격이 싸면 장례 용품의 품질이 안 좋나요?',
          'acceptedAnswer': { '@type': 'Answer', 'text': '가효상조는 전국 500여 제휴 장례식장에서 표준화된 1등급 장례 용품(오동나무 관, 전통한지 수의 등)만을 100% 투명하게 사용합니다.' }
        }
      ]
    },
    ...PRODUCTS.map(p => ({
      '@context': 'https://schema.org',
      '@type': 'Product',
      'name': p.name,
      'description': p.desc,
      'brand': { '@type': 'Brand', 'name': '가효상조' },
      'offers': {
        '@type': 'Offer',
        'price': p.price.replace(/,/g, ''),
        'priceCurrency': 'KRW',
        'url': 'https://gahyo.com/products'
      }
    }))
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero 영역 (H1은 하나만 유지) */}
      <header className="page-hero" style={{ background: 'linear-gradient(135deg, var(--navy), var(--navy-light))', padding: '5rem 0', color: 'white', textAlign: 'center' }}>
        <div className="container">
          <span style={{ display: 'inline-block', background: 'rgba(201,168,76,0.2)', color: 'var(--gold)', padding: '0.4rem 1rem', borderRadius: '999px', fontSize: '0.9rem', fontWeight: '800', marginBottom: '1rem' }}>
            거품 없는 정직한 상조
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '900', marginBottom: '1rem', letterSpacing: '-0.03em' }}>
            투명한 후불제상조상품 비교
          </h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.9, lineHeight: 1.6, maxWidth: '600px', margin: '0 auto' }}>
            미리 돈을 내실 필요가 전혀 없습니다.<br />장례가 모두 끝난 후, 선택하신 상품 금액만 결제하세요.
          </p>

          {/* E-E-A-T 저자 및 신뢰도 블록 */}
          <div style={{ display: 'inline-flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '1rem', padding: '0.8rem 1.5rem', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', marginTop: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.2rem' }}>👔</span>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>작성 및 검수</div>
                <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'white' }}>가효상조 수석 장례지도사</div>
              </div>
            </div>
            <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.2)' }} />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>최종 요금 업데이트</div>
              <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'white' }}>{today}</div>
            </div>
          </div>
        </div>
      </header>

      <div className="container" style={{ padding: '3rem 1.25rem 4rem' }}>
        
        {/* BLUF (핵심 요약) - AI 검색 친화적 문장 배치 */}
        <section style={{ marginBottom: '3rem', padding: '1.75rem', background: '#f8fafc', borderLeft: '4px solid var(--gold)', borderRadius: '0 8px 8px 0' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '0.75rem' }}>
            💡 상조 상품, 핵심만 요약해 드립니다.
          </h2>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.6, color: '#334155', fontWeight: '600' }}>
            가효상조의 상조 상품은 선불식 상조 대비 <strong>약 100~200만 원 이상 저렴한 100% 후불제 상품</strong>입니다.
          </p>
          <ul style={{ marginTop: '0.75rem', paddingLeft: '1.25rem', color: '#475569', fontSize: '0.95rem', lineHeight: 1.7 }}>
            <li>월 납입금, 가입비, 중간 해지 위약금이 전혀 없습니다.</li>
            <li>투명하게 공개된 4가지 패키지(무빈소 170 ~ VIP 430) 중 상황에 맞게 선택할 수 있습니다.</li>
            <li>상품 금액에는 장례지도사, 수의, 관, 리무진, 입관 용품 등 핵심 의전 서비스가 모두 포함되어 있습니다.</li>
          </ul>
        </section>

        {/* H2: 상품 안내 섹션 */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--navy)', textAlign: 'center', marginBottom: '2.5rem' }}>
            1. 맞춤형 장례 상품 안내
          </h2>

          {/* ── 모바일/태블릿 세로 카드 ── */}
          <div className="products-mobile-view">
            {PRODUCTS.map((p) => (
              <article
                key={p.id}
                style={{
                  borderRadius: '1.25rem', overflow: 'hidden', border: `2px solid ${p.borderColor}`,
                  boxShadow: p.popular ? `0 8px 40px ${p.accent}30` : '0 4px 20px rgba(0,0,0,0.07)',
                  marginBottom: '2.5rem', background: 'white'
                }}
              >
                <div style={{ background: `linear-gradient(135deg, ${p.accent} 0%, ${p.accent}cc 100%)`, padding: '1.5rem 1.75rem' }}>
                  <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.22)', color: 'white', borderRadius: '999px', padding: '0.25rem 0.85rem', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                    {p.popular && '⭐ '}{p.badge}
                  </div>
                  <h3 style={{ color: 'white', fontWeight: '900', fontSize: '1.65rem', margin: 0 }}>{p.name}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: '0.9rem', marginTop: '0.3rem' }}>{p.desc}</p>
                </div>
                <div style={{ background: p.accentLight, padding: '1.25rem 1.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${p.borderColor}40` }}>
                  <span style={{ fontSize: '0.9rem', color: '#4b5563', fontWeight: '600' }}>상품 확정가</span>
                  <span style={{ fontSize: '1.85rem', fontWeight: '900', color: p.accent }}>{p.price}<span style={{ fontSize: '1rem', fontWeight: '700', marginLeft: '0.2rem' }}>원</span></span>
                </div>
                <div style={{ padding: '0.5rem 0' }}>
                  {p.rows.map((row, idx) => (
                    <div key={row.label} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '0.95rem 1.75rem', borderBottom: idx < p.rows.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
                      <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: p.accentLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.15rem', flexShrink: 0 }}>{row.icon}</div>
                      <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#9ca3af', marginBottom: '0.2rem' }}>{row.label}</div>
                        <div style={{ fontSize: '0.95rem', color: '#1a1a2e', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{row.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>

          {/* ── 데스크탑 비교 테이블 ── */}
          <div className="products-desktop-view">
            <div style={{ overflowX: 'auto', borderRadius: '1.25rem', boxShadow: '0 8px 40px rgba(0,44,95,0.12)', border: '1px solid var(--border-color)', background: 'white' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed', minWidth: '720px' }}>
                <thead>
                  <tr>
                    <th style={{ background: '#1a1a2e', color: 'rgba(255,255,255,0.55)', padding: '1.25rem 1.5rem', width: '14%', textAlign: 'left', fontSize: '0.85rem', fontWeight: '600' }}>구분</th>
                    {PRODUCTS.map(p => (
                      <th key={p.id} style={{ background: `linear-gradient(160deg, ${p.accent} 0%, ${p.accent}dd 100%)`, color: 'white', padding: '1.5rem 1.25rem', textAlign: 'center', borderLeft: '1px solid rgba(255,255,255,0.15)', position: 'relative' }}>
                        {p.popular && <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', background: '#f59e0b', color: 'white', fontSize: '0.72rem', fontWeight: '800', padding: '0.2rem 0.75rem', borderRadius: '0 0 8px 8px', whiteSpace: 'nowrap' }}>⭐ 가장 많이 선택</div>}
                        <div style={{ fontSize: '0.75rem', opacity: 0.75, marginBottom: '0.3rem', marginTop: p.popular ? '0.75rem' : 0, fontWeight: '600' }}>{p.badge}</div>
                        <h3 style={{ fontSize: '1.35rem', fontWeight: '900', letterSpacing: '-0.02em', margin: 0 }}>{p.name}</h3>
                      </th>
                    ))}
                  </tr>
                  <tr>
                    <td style={{ background: '#f9fafb', padding: '1rem 1.5rem', fontWeight: '700', color: '#374151', fontSize: '0.9rem', borderBottom: '2px solid var(--border-color)' }}>가격</td>
                    {PRODUCTS.map(p => (
                      <td key={`price-${p.id}`} style={{ background: p.accentLight, padding: '1rem 1.25rem', textAlign: 'center', borderLeft: `1px solid ${p.borderColor}40`, borderBottom: `2px solid ${p.borderColor}` }}>
                        <span style={{ fontSize: '1.6rem', fontWeight: '900', color: p.accent }}>{p.price}</span><span style={{ fontSize: '0.9rem', color: '#374151', marginLeft: '0.2rem' }}>원</span>
                      </td>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {['인력 지원', '의전 차량', '고인 용품', '입관 용품', '상복 제공', '특화 서비스'].map((label, rowIdx) => (
                    <tr key={label} style={{ background: rowIdx % 2 === 0 ? 'white' : '#fafafa' }}>
                      <td style={{ padding: '1.1rem 1.5rem', fontWeight: '700', color: '#374151', fontSize: '0.9rem', borderBottom: '1px solid var(--border-color)', borderRight: '1px solid var(--border-color)', verticalAlign: 'middle' }}>
                        {PRODUCTS[0].rows[rowIdx].icon} {label}
                      </td>
                      {PRODUCTS.map(p => (
                        <td key={`${p.id}-${label}`} style={{ padding: '1.1rem 1.25rem', fontSize: '0.92rem', color: '#1a1a2e', lineHeight: 1.6, borderBottom: '1px solid var(--border-color)', borderLeft: `1px solid ${p.borderColor}30`, whiteSpace: 'pre-line', verticalAlign: 'middle' }}>
                          {p.rows[rowIdx].value}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td style={{ padding: '1.25rem 1.5rem', fontWeight: '700', color: '#374151', fontSize: '0.9rem', borderRight: '1px solid var(--border-color)' }}>빠른 상담</td>
                    {PRODUCTS.map(p => (
                      <td key={`cta-${p.id}`} style={{ padding: '1.25rem', borderLeft: `1px solid ${p.borderColor}30`, background: p.accentLight }}>
                        <a href="tel:1551-5718" style={{ display: 'block', textAlign: 'center', padding: '0.75rem', background: p.accent, color: 'white', borderRadius: '0.6rem', fontWeight: '800', fontSize: '0.95rem', textDecoration: 'none', marginBottom: '0.5rem' }}>📞 상담하기</a>
                        <Link href="/halls" style={{ display: 'block', textAlign: 'center', padding: '0.7rem', background: 'white', color: p.accent, border: `2px solid ${p.borderColor}`, borderRadius: '0.6rem', fontWeight: '700', fontSize: '0.9rem', textDecoration: 'none' }}>🏥 장례식장 찾기</Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* H2: 선불식 vs 후불제 비교 (표 및 가독성 개선) */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontWeight: '800', color: 'var(--navy)', fontSize: '1.6rem', marginBottom: '1.5rem', textAlign: 'center' }}>
            2. 유명 선불식 상조와 비교해 보세요
          </h2>
          <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.6, textAlign: 'center', marginBottom: '2.5rem' }}>
            국내 대형 선불 상조업체(A사, B사)의 상품과 <strong>구성은 같거나 더 우수하지만, 발생 비용은 훨씬 저렴</strong>합니다.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
              <div style={{ background: '#f8fafc', padding: '1.25rem', textAlign: 'center', borderBottom: '1px solid #e2e8f0' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '800', color: '#1e293b' }}>표준 3일장 구성 비교</h3>
              </div>
              <div style={{ display: 'flex' }}>
                <div style={{ flex: 1, padding: '1.5rem', textAlign: 'center', borderRight: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.5rem' }}>A사 선불식 상조</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#94a3b8', textDecoration: 'line-through' }}>3,600,000원</div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.75rem' }}>매월 납입 의무</div>
                </div>
                <div style={{ flex: 1, padding: '1.5rem', textAlign: 'center', background: '#e6eef8' }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--navy)', fontWeight: '700', marginBottom: '0.5rem' }}>가효상조 270</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: '900', color: '#c0392b' }}>2,700,000원</div>
                  <div style={{ fontSize: '0.85rem', color: '#c0392b', fontWeight: '800', marginTop: '0.75rem', background: 'white', padding: '0.25rem 0', borderRadius: '4px' }}>90만원 절약</div>
                </div>
              </div>
            </div>
            
            <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
              <div style={{ background: '#f8fafc', padding: '1.25rem', textAlign: 'center', borderBottom: '1px solid #e2e8f0' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '800', color: '#1e293b' }}>리무진 포함 구성 비교</h3>
              </div>
              <div style={{ display: 'flex' }}>
                <div style={{ flex: 1, padding: '1.5rem', textAlign: 'center', borderRight: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.5rem' }}>A·B사 선불식 상조</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#94a3b8', textDecoration: 'line-through' }}>4,900,000원 대</div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.75rem' }}>중도 해지 위약금</div>
                </div>
                <div style={{ flex: 1, padding: '1.5rem', textAlign: 'center', background: '#fdf3e0' }}>
                  <div style={{ fontSize: '0.85rem', color: '#92520a', fontWeight: '700', marginBottom: '0.5rem' }}>가효상조 330</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: '900', color: '#c0392b' }}>3,300,000원</div>
                  <div style={{ fontSize: '0.85rem', color: '#c0392b', fontWeight: '800', marginTop: '0.75rem', background: 'white', padding: '0.25rem 0', borderRadius: '4px' }}>약 160만원 절약</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* H2/H3: 롱테일 질문형 고객 Q&A 섹션 (SEO 최적화) */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontWeight: '800', color: 'var(--navy)', fontSize: '1.6rem', marginBottom: '2rem', textAlign: 'center' }}>
            3. 후불제 상조, 자주 묻는 질문 (FAQ)
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <article style={{ background: 'white', borderRadius: '12px', padding: '1.75rem', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#1e293b', marginBottom: '0.75rem', display: 'flex', gap: '0.5rem' }}>
                <span style={{ color: '#c0392b' }}>Q.</span> 후불제 상조는 왜 선불식 상조보다 저렴한가요?
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.7, paddingLeft: '1.7rem', margin: 0 }}>
                <strong style={{ color: 'var(--gold-dark)', fontSize: '1.1rem', marginRight: '0.3rem' }}>A.</strong> 
                선불식 상조회사는 막대한 TV 광고비, 영업사원 수당, 결합 가전제품 비용을 납입금에 포함시킵니다. 가효상조는 이런 거품을 모두 빼고 장례 서비스 본질에만 집중하므로 동일한 구성이라도 100~200만 원 이상 저렴하게 제공할 수 있습니다.
              </p>
            </article>

            <article style={{ background: 'white', borderRadius: '12px', padding: '1.75rem', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#1e293b', marginBottom: '0.75rem', display: 'flex', gap: '0.5rem' }}>
                <span style={{ color: '#c0392b' }}>Q.</span> 가격이 싸면 서비스나 장례 용품의 품질이 안 좋은 것 아닌가요?
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.7, paddingLeft: '1.7rem', margin: 0 }}>
                <strong style={{ color: 'var(--gold-dark)', fontSize: '1.1rem', marginRight: '0.3rem' }}>A.</strong> 
                절대 그렇지 않습니다. 가효상조는 전국 500개 제휴 장례식장에서 표준화된 1등급 정품 장례 용품(오동나무 관, 친환경 수의 등)만을 사용하며, 10년 이상 경력의 1급 장례지도사가 책임지고 진행합니다.
              </p>
            </article>

            <article style={{ background: 'white', borderRadius: '12px', padding: '1.75rem', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#1e293b', marginBottom: '0.75rem', display: 'flex', gap: '0.5rem' }}>
                <span style={{ color: '#c0392b' }}>Q.</span> 정말 장례가 끝난 후에 추가 비용을 요구하지 않나요?
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.7, paddingLeft: '1.7rem', margin: 0 }}>
                <strong style={{ color: 'var(--gold-dark)', fontSize: '1.1rem', marginRight: '0.3rem' }}>A.</strong> 
                가효상조 상품 내역에 포함된 의전 서비스(지도사, 도우미, 차량, 고인용품 등)에 대해서는 100% 추가 비용이 발생하지 않습니다. 단, [장례식장 빈소 대여료], [조문객 식대], [화장장 이용료]는 상조 상품과 무관한 실비이며 사전 상담 시 투명하게 분리하여 안내해 드립니다.
              </p>
            </article>

            <article style={{ background: 'white', borderRadius: '12px', padding: '1.75rem', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#1e293b', marginBottom: '0.75rem', display: 'flex', gap: '0.5rem' }}>
                <span style={{ color: '#c0392b' }}>Q.</span> 미리 가입하거나 매월 돈을 내야 상조 혜택을 받나요?
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.7, paddingLeft: '1.7rem', margin: 0 }}>
                <strong style={{ color: 'var(--gold-dark)', fontSize: '1.1rem', marginRight: '0.3rem' }}>A.</strong> 
                가입비나 월 납입금, 중도 해지 위약금이 일절 없습니다. 임종 발생 시 언제든 1551-5718로 전화 한 통만 주시면 바로 출동하며, 모든 절차가 끝난 발인 날에 약정된 상품 금액만 안전하게 결제하시면 됩니다.
              </p>
            </article>
          </div>
        </section>

        {/* Info Banner (결론/CTA) */}
        <section style={{ background: 'var(--navy)', borderRadius: '12px', padding: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem', color: 'white', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)' }}>
          <div style={{ fontSize: '2.5rem' }}>✨</div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', margin: 0 }}>안심하고 맡길 수 있는 가효상조</h2>
          <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: 1.75, maxWidth: '600px', margin: 0 }}>
            가효상조는 사전 결제를 유도하지 않는 <strong style={{ color: 'var(--gold)' }}>100% 후불제 상조</strong>입니다.<br />
            모든 상품에는 입관 수시용품과 장례편의용품 1BOX가 기본 제공됩니다.
          </p>
          <a href="tel:1551-5718" style={{
            display: 'inline-block', background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))',
            color: '#0f172a', padding: '1rem 2.5rem', borderRadius: '999px',
            fontWeight: '900', fontSize: '1.15rem', textDecoration: 'none',
            boxShadow: '0 4px 20px rgba(201,168,76,0.4)', marginTop: '0.5rem'
          }}>
            📞 1551-5718 무료 상세 상담받기
          </a>
        </section>
      </div>

      <style>{`
        .products-mobile-view { display: block; }
        .products-desktop-view { display: none; }
        @media (min-width: 992px) {
          .products-mobile-view { display: none; }
          .products-desktop-view { display: block; }
        }
      `}</style>
    </>
  );
}
