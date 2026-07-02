import Link from 'next/link';
import HallStickyBar from '@/components/HallStickyBar';

export const metadata = {
  title: '후불제상조상품 비교 및 가격 안내 | 가효상조',
  description: '투명하고 정직한 가효상조의 4가지 후불제상조상품(무빈소 120, 가효 265, 가효 334, 가효 363)을 비교해 보세요. 전문가가 검증한 합리적인 장례비용입니다.',
  alternates: {
    canonical: 'https://gahyo.co.kr/products',
  },
};

const PRODUCTS = [
  {
    id: '120',
    badge: '실속 장례',
    name: '가효 무빈소 120',
    price: '1,200,000원',
    desc: '빈소 없이, 가족끼리 조용히 모시고 싶은 분을 위한 선택',
    highlight: false,
    rows: [
      { label: '인력 지원', value: '장례지도사 1명 · 입관지도사 1명 · 장례도우미 미지원' },
      { label: '의전 차량', value: '앰뷸런스 필요시 별도 선택 · 장의버스 8인승/150km(왕복) · 전용 리무진 미지원' },
      { label: '고인 용품', value: '오동나무 화장 규격관 · 도자기 봉안함 · 면수의 · 대렴 미지원' },
      { label: '입관 용품', value: '풀세트 포함' },
      { label: '상복', value: '완장·리본·장갑 제공 / 상복 별도 선택' },
      { label: '특화 서비스', value: '장례식장 예약 · 화장장 예약 · 장지 할인 · 유품 정리 할인 · 산재·재산·상속 법률 상담 무료' },
    ],
  },
  {
    id: '265',
    badge: '추천 상품',
    name: '가효 265',
    price: '2,650,000원',
    desc: '부담 없는 비용으로 예를 갖춘 표준 3일장',
    highlight: false,
    rows: [
      { label: '인력 지원', value: '장례지도사 1명 · 입관지도사 1명 · 장례도우미 3명(총 30시간)' },
      { label: '의전 차량', value: '앰뷸런스 지원 · 장의버스 45인승/200km(왕복) · 전용 리무진 미지원' },
      { label: '고인 용품', value: '오동나무 화장 규격관 · 도자기 봉안함 · 친환경 전통한지수의 · 전통 상례 궁중 한지대렴(국화)' },
      { label: '입관 용품', value: '풀세트 포함' },
      { label: '상복', value: '남자상복 2벌 · 여자상복 2벌' },
      { label: '특화 서비스', value: '장례식장 예약 · 화장장 예약 · 장지 할인 · 유품 정리 할인 · 산재·재산·상속 법률 상담 무료' },
    ],
  },
  {
    id: '334',
    badge: '⭐ 가장 많이 찾는 상품',
    name: '가효 334',
    price: '3,340,000원',
    desc: '전용 리무진까지, 격식을 갖춘 3일장의 기준',
    highlight: true,
    rows: [
      { label: '인력 지원', value: '장례지도사 1명 · 입관지도사 1명 · 장례도우미 4명(총 40시간)' },
      { label: '의전 차량', value: '앰뷸런스 지원 · 장의버스 45인승/200km(왕복) · 전용 리무진 200km(왕복) + 종교별 리본' },
      { label: '고인 용품', value: '오동나무 화장 규격관 · 도자기 봉안함 · 저마수의 · 전통 상례 궁중 한지대렴(국화)' },
      { label: '입관 용품', value: '풀세트 포함' },
      { label: '상복', value: '남자상복 3벌 · 여자상복 3벌' },
      { label: '특화 서비스', value: '장례식장 예약 · 화장장 예약 · 장지 할인 · 유품 정리 할인 · 산재·재산·상속 법률 상담 무료' },
    ],
  },
  {
    id: '363',
    badge: '프리미엄 VIP',
    name: '가효 363',
    price: '3,630,000원',
    desc: '장거리 이동과 최고급 의전이 필요한 분을 위한 상품',
    highlight: false,
    rows: [
      { label: '인력 지원', value: '장례지도사 1명 · 입관지도사 1명 · 장례도우미 5명(총 50시간)' },
      { label: '의전 차량', value: '앰뷸런스 지원 · 장의버스 45인승/400km(왕복) · 전용 리무진 400km(왕복) + 종교별 리본' },
      { label: '고인 용품', value: '오동나무 화장 규격관 · 도자기 봉안함 · 대마수의 · 전통 상례 궁중 한지대렴(국화)' },
      { label: '입관 용품', value: '풀세트 포함' },
      { label: '상복', value: '남자상복 4벌 · 여자상복 4벌' },
      { label: '특화 서비스', value: '장례식장 예약 · 화장장 예약 · 장지 할인 · 유품 정리 할인 · 산재·재산·상속 법률 상담 무료' },
    ],
  },
];

const FAQS = [
  {
    q: '미리 가입하지 않아도 되나요?',
    a: '가입비나 월 납입금, 중도 해지 위약금이 일절 없습니다. 임종 발생 시 1551-5718로 전화 한 통만 주시면 바로 출동합니다. 모든 절차가 끝난 발인 날에 약정된 상품 금액만 결제하시면 됩니다.',
  },
  {
    q: '가격이 저렴하면 서비스 품질도 낮은 것 아닌가요?',
    a: '그렇지 않습니다. 가효상조는 전국 500개 제휴 장례식장에서 표준화된 1등급 정품 장례 용품만을 사용하며, 10년 이상 경력의 국가공인 1급 장례지도사가 직접 진행합니다. 저렴한 이유는 불필요한 광고비와 영업 수당을 없앴기 때문입니다.',
  },
  {
    q: '장례 후 추가 비용이 청구되지 않나요?',
    a: '상품 내역에 포함된 의전 서비스(지도사, 도우미, 차량, 고인용품)는 100% 추가 비용 없이 제공됩니다. 단, 장례식장 빈소 대여료·조문객 식대·화장장 이용료는 상조 상품과 무관한 실비이며, 사전 상담 시 분리하여 투명하게 안내합니다.',
  },
  {
    q: '후불제 상조는 왜 선불식보다 저렴한가요?',
    a: '선불식 상조는 막대한 TV 광고비, 영업사원 수당, 결합 가전 비용을 납입금에 포함시킵니다. 가효상조는 장례 서비스 본질에만 집중하므로 동일한 구성이라도 100~200만 원 이상 저렴하게 제공합니다.',
  },
  {
    q: '상품을 고르기가 어려운데 상담으로 도움받을 수 있나요?',
    a: '네, 오히려 상담 후 결정하시는 것을 권장합니다. 상황과 가족 구성, 장례 방식에 따라 맞는 상품이 다릅니다. 전화 한 통으로 24시간 무료 상담을 받으실 수 있습니다.',
  },
];

export default function ProductsPage() {
  return (
    <>
      <HallStickyBar subtitle="상품 무료 상담" />

      {/* ── 섹션 1: 히어로 ── */}
      <header style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', padding: '5rem 1.25rem 4rem', color: 'white', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '720px' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(201,168,76,0.15)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.3)', padding: '0.45rem 1.1rem', borderRadius: '999px', fontSize: '0.85rem', fontWeight: '700', marginBottom: '1.5rem' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#2E6B4F', boxShadow: '0 0 0 3px rgba(46,107,79,0.3)' }} />
            국가공인 장례지도사 · 24시간 직접 출동
          </span>
          <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', fontWeight: '900', lineHeight: 1.3, letterSpacing: '-0.03em', marginBottom: '1.25rem', wordBreak: 'keep-all' }}>
            지금 당장 필요한 것만,<br />
            직접 고르고 <span style={{ color: '#C9A84C' }}>장례 후에 내세요.</span>
          </h1>
          <p style={{ fontSize: '1.05rem', opacity: 0.85, lineHeight: 1.75, marginBottom: '2rem', wordBreak: 'keep-all' }}>
            가입비도, 월 납입금도 없습니다.<br />
            장례가 끝난 뒤 실제 사용한 비용만 정산하는 100% 후불제.<br />
            지금 전화 한 통으로 시작하세요.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center', marginBottom: '2rem' }}>
            <a href="tel:1551-5718" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem', background: '#C9A84C', color: '#0f172a', borderRadius: '10px', fontWeight: '800', fontSize: '1.05rem', textDecoration: 'none' }}>
              📞 1551-5718 · 지금 전화하기
            </a>
            <Link href="/estimate" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 1.75rem', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '10px', fontWeight: '700', fontSize: '1rem', textDecoration: 'none' }}>
              🧮 무료 견적 확인
            </Link>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', fontWeight: '600' }}>
            {['✔ 가입비 0원', '✔ 추가 비용 없음', '✔ 전국 즉시 출동'].map(t => <span key={t}>{t}</span>)}
          </div>
        </div>
      </header>

      {/* ── 섹션 2: 신뢰 지표 바 ── */}
      <section style={{ background: 'white', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container" style={{ maxWidth: '900px', padding: '2.5rem 1.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem' }}>
            {[
              { icon: '👔', title: '국가공인 1급 장례지도사', sub: '10년 이상 경력자만 출동합니다' },
              { icon: '⏰', title: '24시간 연중무휴', sub: '새벽이든, 주말이든, 공휴일이든' },
              { icon: '💸', title: '100% 후불제', sub: '장례 후 실사용 금액만 청구합니다' },
              { icon: '🤝', title: '전국 500개 제휴 장례식장', sub: '어디서나 동일한 품질' },
            ].map(item => (
              <div key={item.title} style={{ textAlign: 'center', padding: '1rem' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{item.icon}</div>
                <div style={{ fontWeight: '800', color: '#1e293b', fontSize: '0.95rem', marginBottom: '0.3rem', wordBreak: 'keep-all' }}>{item.title}</div>
                <div style={{ fontSize: '0.82rem', color: '#64748b', wordBreak: 'keep-all' }}>{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 섹션 3: 가격 앵커링 — 경쟁사 비교 ── */}
      <section style={{ background: '#f8fafc', padding: '4rem 1.25rem' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h2 style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)', fontWeight: '900', color: '#1e293b', textAlign: 'center', marginBottom: '0.75rem', wordBreak: 'keep-all' }}>
            같은 장례, 왜 가효상조가 더 저렴할까요?
          </h2>
          <p style={{ textAlign: 'center', color: '#475569', lineHeight: 1.75, marginBottom: '2.5rem', wordBreak: 'keep-all' }}>
            대형 선불식 상조회사는 TV 광고비, 영업사원 수당, 결합 가전 비용을 납입금에 포함시킵니다.<br />
            가효상조는 그 거품을 모두 빼고 장례 서비스 본질에만 집중합니다.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem', marginBottom: '1.75rem' }}>
            {[
              {
                label: '비교 ① 표준 3일장',
                rows: [
                  { name: 'A사 선불식 상조', price: '3,600,000원', sub: '매월 납입 의무 + 중도 해지 위약금', highlight: false },
                  { name: '가효상조 265', price: '2,650,000원', sub: '→ 약 90만 원 절약', highlight: true },
                ],
              },
              {
                label: '비교 ② 리무진 포함 3일장',
                rows: [
                  { name: 'A·B사 선불식 상조', price: '4,900,000원대', sub: '가입 필수 + 패키지 강요', highlight: false },
                  { name: '가효상조 334', price: '3,340,000원', sub: '→ 약 160만 원 절약', highlight: true },
                ],
              },
            ].map(group => (
              <div key={group.label} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '14px', overflow: 'hidden' }}>
                <div style={{ background: '#1e293b', color: 'white', padding: '0.75rem 1.25rem', fontWeight: '700', fontSize: '0.9rem' }}>{group.label}</div>
                {group.rows.map(row => (
                  <div key={row.name} style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #f1f5f9', background: row.highlight ? '#fffbeb' : 'white' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <span style={{ fontWeight: '700', color: row.highlight ? '#92400e' : '#475569', fontSize: '0.95rem' }}>{row.name}</span>
                      <span style={{ fontWeight: '900', color: row.highlight ? '#C9A84C' : '#94a3b8', fontSize: '1.05rem' }}>{row.price}</span>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: row.highlight ? '#b45309' : '#94a3b8' }}>{row.sub}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', color: '#1e293b', fontWeight: '700', fontSize: '0.95rem', background: 'white', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1rem' }}>
            구성 품질은 같거나 더 우수합니다. 차이는 거품 유무입니다.
          </p>
        </div>
      </section>

      {/* ── 섹션 4: 상품 소개 ── */}
      <section style={{ background: 'white', padding: '4rem 1.25rem' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <h2 style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)', fontWeight: '900', color: '#1e293b', textAlign: 'center', marginBottom: '0.5rem', wordBreak: 'keep-all' }}>
            4가지 상품 중 상황에 맞게 선택하세요
          </h2>
          <p style={{ textAlign: 'center', color: '#475569', marginBottom: '2.5rem', fontSize: '1rem' }}>
            모든 상품은 100% 후불제입니다. 장례가 끝난 뒤, 선택하신 상품 금액만 결제하세요.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {PRODUCTS.map(p => (
              <div key={p.id} style={{
                border: p.highlight ? '2px solid #C9A84C' : '1px solid #e2e8f0',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: p.highlight ? '0 8px 30px rgba(201,168,76,0.18)' : '0 2px 8px rgba(0,0,0,0.06)',
                position: 'relative',
              }}>
                {p.highlight && (
                  <div style={{ background: '#C9A84C', color: '#0f172a', textAlign: 'center', padding: '0.4rem', fontWeight: '800', fontSize: '0.85rem' }}>
                    ⭐ 가장 많이 찾는 상품
                  </div>
                )}
                <div style={{ padding: '1.5rem 1.75rem', borderBottom: '1px solid #f1f5f9' }}>
                  {!p.highlight && (
                    <span style={{ display: 'inline-block', background: '#f1f5f9', color: '#475569', borderRadius: '999px', padding: '0.25rem 0.85rem', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.75rem' }}>
                      {p.badge}
                    </span>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.3rem', fontWeight: '900', color: '#1e293b', margin: '0 0 0.35rem' }}>{p.name}</h3>
                      <p style={{ color: '#475569', fontSize: '0.95rem', margin: 0, wordBreak: 'keep-all' }}>{p.desc}</p>
                    </div>
                    <div style={{ fontSize: '1.6rem', fontWeight: '900', color: p.highlight ? '#C9A84C' : '#1e293b', whiteSpace: 'nowrap' }}>{p.price}</div>
                  </div>
                </div>
                <div style={{ padding: '1.25rem 1.75rem', background: p.highlight ? '#fffdf5' : '#fafafa' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                    <tbody>
                      {p.rows.map(row => (
                        <tr key={row.label} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '0.6rem 0.5rem 0.6rem 0', color: '#64748b', fontWeight: '700', whiteSpace: 'nowrap', verticalAlign: 'top', width: '90px' }}>{row.label}</td>
                          <td style={{ padding: '0.6rem 0 0.6rem 0.5rem', color: '#1e293b', lineHeight: 1.5, wordBreak: 'keep-all' }}>{row.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div style={{ padding: '1.25rem 1.75rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap', background: 'white', borderTop: '1px solid #f1f5f9' }}>
                  <a href="tel:1551-5718" style={{ flex: 1, minWidth: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', padding: '0.85rem 1.25rem', background: p.highlight ? '#C9A84C' : '#1e293b', color: p.highlight ? '#0f172a' : 'white', borderRadius: '9px', fontWeight: '800', fontSize: '0.95rem', textDecoration: 'none' }}>
                    📞 지금 상담하기
                  </a>
                  <Link href="/halls" style={{ flex: 1, minWidth: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', padding: '0.85rem 1.25rem', background: 'white', color: '#1e293b', border: '1.5px solid #e2e8f0', borderRadius: '9px', fontWeight: '700', fontSize: '0.95rem', textDecoration: 'none' }}>
                    🏥 장례식장 찾기
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 섹션 5: 어떤 상품이 맞을지 모르겠다면? ── */}
      <section style={{ background: '#f0fdf4', padding: '3.5rem 1.25rem', borderTop: '1px solid #bbf7d0', borderBottom: '1px solid #bbf7d0' }}>
        <div className="container" style={{ maxWidth: '640px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.2rem, 3.5vw, 1.6rem)', fontWeight: '900', color: '#1e293b', marginBottom: '1rem', wordBreak: 'keep-all', lineHeight: 1.4 }}>
            어떤 상품을 골라야 할지 모르겠다면,<br />전화 한 통으로 물어보세요.
          </h2>
          <p style={{ color: '#475569', lineHeight: 1.8, marginBottom: '1.75rem', wordBreak: 'keep-all' }}>
            경황없는 순간에 혼자 결정하실 필요 없습니다.<br />
            상담사가 상황을 들어보고 가장 적합한 상품을 안내해 드립니다.<br />
            강요도, 추가 설명 없는 세일즈도 없습니다.
          </p>
          <a href="tel:1551-5718" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '1.1rem 2.5rem', background: '#1e293b', color: 'white', borderRadius: '10px', fontWeight: '800', fontSize: '1.05rem', textDecoration: 'none' }}>
            📞 1551-5718 · 24시간 무료 상담
          </a>
        </div>
      </section>

      {/* ── 섹션 6: FAQ ── */}
      <section style={{ background: 'white', padding: '4rem 1.25rem' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <h2 style={{ fontSize: 'clamp(1.4rem, 4vw, 1.9rem)', fontWeight: '900', color: '#1e293b', marginBottom: '2rem', textAlign: 'center' }}>
            결정 전에 확인하세요
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ background: '#f8fafc', padding: '1rem 1.25rem', fontWeight: '800', color: '#1e293b', fontSize: '0.97rem', wordBreak: 'keep-all' }}>
                  Q{i + 1}. {faq.q}
                </div>
                <div style={{ padding: '1rem 1.25rem', color: '#475569', lineHeight: 1.75, fontSize: '0.93rem', wordBreak: 'keep-all' }}>
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 섹션 7: 하단 CTA ── */}
      <section style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', padding: '5rem 1.25rem', textAlign: 'center', color: 'white' }}>
        <div className="container" style={{ maxWidth: '620px' }}>
          <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: '900', marginBottom: '0.75rem', wordBreak: 'keep-all' }}>
            전화 한 통이면 됩니다.
          </h2>
          <p style={{ fontSize: '1.05rem', opacity: 0.85, lineHeight: 1.75, marginBottom: '2rem', wordBreak: 'keep-all' }}>
            지금 이 순간, 혼자 결정하지 않아도 됩니다.<br />
            가효상조가 처음부터 끝까지 함께합니다.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)', fontWeight: '600', marginBottom: '2rem' }}>
            {['✔ 가입비 0원', '✔ 월 납입금 0원', '✔ 100% 후불제', '✔ 24시간 출동'].map(t => <span key={t}>{t}</span>)}
          </div>
          <a href="tel:1551-5718" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', padding: '1.25rem 2.5rem', background: '#C9A84C', color: '#0f172a', borderRadius: '12px', fontWeight: '900', fontSize: '1.2rem', textDecoration: 'none', marginBottom: '1rem' }}>
            📞 1551-5718 · 지금 바로 전화하기
          </a>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
            <a href="https://pf.kakao.com/_ntRdX/chat" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.85rem 1.5rem', background: '#FEE500', color: '#391B1B', borderRadius: '10px', fontWeight: '800', fontSize: '0.95rem', textDecoration: 'none' }}>
              💬 카카오 상담하기
            </a>
            <Link href="/estimate" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.85rem 1.5rem', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '10px', fontWeight: '700', fontSize: '0.95rem', textDecoration: 'none' }}>
              🧮 AI 견적 먼저 받아보기
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
