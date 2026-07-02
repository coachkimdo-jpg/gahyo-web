import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import ossuariesData from '@/lib/ossuaries.json';
import { getSlug } from '@/lib/utils';
import HallStickyBar from '@/components/HallStickyBar';


export async function generateMetadata({ params }) {
  const { id } = await params;
  let decodedSlug = id;
  try { decodedSlug = decodeURIComponent(id); } catch(e) { return { title: 'Not Found' }; }
  
  let ossuary = ossuariesData.find(g => getSlug(g.address, g.name) === decodedSlug);
  
  if (!ossuary) {
    let legacyOssuary = ossuariesData.find((g) => g.id === id || g.id === decodedSlug);
    if (!legacyOssuary) {
      legacyOssuary = ossuariesData.find((g) => {
        if (!g.address) return false;
        const addrSlug = g.address.replace(/\s+/g, '-');
        return addrSlug === decodedSlug || g.address === decodedSlug || g.address.includes(decodedSlug.replace(/-/g, ' '));
      });
    }
    if (!legacyOssuary) {
      const slugNamePart = decodedSlug.split('-').slice(1).join('-');
      if (slugNamePart) {
        legacyOssuary = ossuariesData.find((g) => g.name.replace(/[\s/\\_]+/g, '') === slugNamePart || g.name.includes(slugNamePart.replace(/-/g, '')));
      }
    }
    if (legacyOssuary) ossuary = legacyOssuary;
    if (!ossuary) return { title: 'Not Found' };
  }
  return {
    title: `가효상조 - ${ossuary.name} 100% 후불제 상조 및 투명한 장례 서비스`,
    description: `${ossuary.address}에 위치한 ${ossuary.name}. 선불금 없는 100% 후불제 가효상조와 함께 준비하세요. 봉안당(납골당) 안치단별 사용료 ${ossuary.priceRange} 수준 안내.`,
    alternates: {
      canonical: `/cemeteries/ossuary/${getSlug(ossuary.address, ossuary.name)}`,
    },
  };
}

export default async function OssuaryPage({ params }) {
  const { id } = await params;
  let decodedSlug = id;
  try { decodedSlug = decodeURIComponent(id); } catch(e) { notFound(); }
  
  let ossuary = ossuariesData.find(g => getSlug(g.address, g.name) === decodedSlug);
  
  if (!ossuary) {
    let legacyOssuary = ossuariesData.find((g) => g.id === id || g.id === decodedSlug);
    if (!legacyOssuary) {
      legacyOssuary = ossuariesData.find((g) => {
        if (!g.address) return false;
        const addrSlug = g.address.replace(/\s+/g, '-');
        return addrSlug === decodedSlug || g.address === decodedSlug || g.address.includes(decodedSlug.replace(/-/g, ' '));
      });
    }
    if (!legacyOssuary) {
      const slugNamePart = decodedSlug.split('-').slice(1).join('-');
      if (slugNamePart) {
        legacyOssuary = ossuariesData.find((g) => g.name.replace(/[\s/\\_]+/g, '') === slugNamePart || g.name.includes(slugNamePart.replace(/-/g, '')));
      }
    }
    if (legacyOssuary) {
      permanentRedirect(`/cemeteries/ossuary/${encodeURIComponent(getSlug(legacyOssuary.address, legacyOssuary.name))}`);
    }
    notFound();
  }

  // 가격 아이템을 location(구역)별로 그룹핑
  const groupedPrices = (ossuary.priceItems || []).reduce((acc, item) => {
    const key = item.location || '기타';
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  const totalPriceRows = ossuary.priceItems?.length || 0;
  const groupEntries = Object.entries(groupedPrices);
  const midPoint = Math.ceil(groupEntries.length / 2);
  const prices = (ossuary.priceItems || []).map(i => i.price).filter(p => typeof p === 'number' && p > 0);
  const minPrice = prices.length ? Math.min(...prices) : null;
  const maxPrice = prices.length ? Math.max(...prices) : null;
  const formatKRW = (p) => p ? p.toLocaleString('ko-KR') + '원' : '문의';

  const faqItems = [
    {
      q: `가효상조를 통하면 ${ossuary.name} 공시 가격보다 얼마나 저렴한가요?`,
      a: `가효상조 고객에게는 제휴 장지 이용 시 별도 할인 혜택이 적용됩니다. 할인 금액은 시설 및 구역에 따라 다르며, 정확한 금액은 상담 시 안내해 드립니다. 전화 한 통으로 바로 확인 가능합니다.`
    },
    {
      q: `어떤 구역을 선택해야 할지 모르겠습니다. 상담이 가능한가요?`,
      a: `네, 오히려 상담 후 결정하시는 것을 권장합니다. 예산, 종교, 가족 수, 거주지 거리 등을 고려해 최적의 구역을 추천해 드립니다. 24시간 무료 상담이 가능합니다.`
    },
    {
      q: `장례 당일 바로 이용할 수 있나요? 사전 예약이 필요한가요?`,
      a: `긴급 상황에서도 가능합니다. 임종 발생 시 1551-5718로 연락 주시면, 장례지도사가 즉시 출동해 장지 예약 및 안치까지 동행합니다. 사전 예약 없이 이용 가능합니다.`
    },
    {
      q: `${ossuary.name}은 종교에 관계없이 이용할 수 있나요?`,
      a: `네, 봉안당은 종교와 무관하게 모든 분이 이용 가능합니다. 불교·기독교·무종교 등 어떤 신앙을 가지셔도 안치에 제한이 없으며, 종교별 안치 절차나 의식에 대해 궁금하신 점은 가효상조 장례지도사가 자세히 안내해 드립니다.`
    },
    {
      q: `${ossuary.name} 봉안 계약 기간과 만료 후 처리는 어떻게 되나요?`,
      a: `봉안당 계약 기간은 시설에 따라 15년·30년 등 다양하게 운영됩니다. 계약 기간 만료 시 연장 또는 자연장으로 이전할 수 있으며, 가효상조 상담 시 계약 조건과 관리비 포함 전체 비용을 투명하게 안내해 드립니다.`
    },
  ];

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': 'https://gahyo.co.kr/#organization',
      name: '가효상조',
      url: 'https://gahyo.co.kr',
      telephone: '1551-5718',
      description: '100% 후불제 상조 서비스'
    },
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
        name: ossuary.name,
        image: ossuary.photos?.[0] ? `https://gahyo.co.kr${ossuary.photos[0]}` : undefined,
        address: { '@type': 'PostalAddress', streetAddress: ossuary.address, addressCountry: 'KR' },
        telephone: ossuary.phone,
        description: ossuary.intro || `${ossuary.name} 봉안당 시설 안내`
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map(faq => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a }
      }))
    }
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HallStickyBar hallName={ossuary.name} subtitle="봉안당 상담" />

      {/* 히어로 */}
      <div style={{ background: 'linear-gradient(135deg, var(--navy-dark) 0%, var(--navy) 100%)', color: 'white', padding: '3.5rem 1.25rem 2.5rem' }}>
        <div className="container">
          <div style={{ marginBottom: '1.25rem' }}>
            <Link href="/cemeteries" style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none', fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              ← 모실곳 찾기 목록으로
            </Link>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem', alignItems: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.3rem 0.8rem', background: 'rgba(255,255,255,0.1)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.2)', fontSize: '0.8rem' }}>
              🛡️ <strong>국가공인 장례지도사 직접 운영 | 검수 완료</strong>
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', background: 'rgba(201,168,76,0.25)', border: '1px solid rgba(201,168,76,0.5)', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem' }}>
              🏛️ 봉안시설
            </div>
          </div>

          <h1 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: '800', lineHeight: 1.4, marginBottom: '1.25rem' }}>
            {ossuary.name}에 모시고 싶으신가요?<br />
            <span style={{ fontSize: '0.75em', fontWeight: '700', opacity: 0.9 }}>가효상조를 통하면 공시가보다 저렴하게, 장례지도사 동행으로 안심하게.</span>
          </h1>

          <div style={{ background: 'rgba(255,255,255,0.06)', padding: '1.25rem 1.5rem', borderRadius: '10px', border: '1px solid rgba(201,168,76,0.3)', borderLeft: '4px solid var(--gold)' }}>
            <p style={{ margin: '0 0 0.5rem', fontSize: '1.05rem', fontWeight: '700', color: 'white', wordBreak: 'keep-all' }}>
              {ossuary.name}, 가효상조를 통하면 더 저렴하게 모실 수 있습니다.
            </p>
            <p style={{ margin: '0 0 0.5rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.85)' }}>
              공시 가격에서 할인 혜택 적용 · 장례지도사 동행 서비스 무료
            </p>
            <p style={{ margin: 0, fontSize: '0.88rem', color: 'rgba(255,255,255,0.75)', wordBreak: 'keep-all' }}>
              어떤 구역이 맞는지 모르셔도 됩니다. 전화 한 통으로 안내해 드립니다.
            </p>
          </div>
        </div>
      </div>

      {/* 신뢰 배지 바 */}
      <div style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', padding: '1rem 1.25rem' }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          {[
            { icon: '👔', title: '국가공인 1급 장례지도사', desc: '10년 이상 경력자만 동행합니다' },
            { icon: '⏰', title: '24시간 연중무휴', desc: '새벽이든, 주말이든, 공휴일이든' },
            { icon: '💸', title: '100% 후불제', desc: '장례 후 실사용 금액만 청구합니다' },
            { icon: '🤝', title: '전국 500개 제휴 장례식장', desc: '어디서나 동일한 품질' },
          ].map((badge) => (
            <div key={badge.title} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.5rem 1rem', background: 'white', borderRadius: '8px', border: '1px solid #e2e8f0', minWidth: '200px', flex: '1 1 200px', maxWidth: '260px' }}>
              <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{badge.icon}</span>
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--navy)' }}>{badge.title}</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{badge.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container" style={{ padding: '2.5rem 1.25rem 5rem' }}>

        {/* 사진 갤러리 */}
        {ossuary.photos?.length > 0 && (
          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--navy)', marginBottom: '1rem' }}>시설 갤러리</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
              {ossuary.photos.map((photo, idx) => (
                <div key={idx} style={{ borderRadius: '8px', overflow: 'hidden', aspectRatio: '4/3', boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}>
                  <img src={photo} alt={`${ossuary.region} 추모시설 ${ossuary.name} 납골당(봉안당) 안치단 및 제례실 시설 사진 ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </section>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>

          {/* 기본 정보 */}
          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--navy)', marginBottom: '1rem' }}>기본 정보</h2>
            <div style={{ background: 'white', borderRadius: '12px', border: '1px solid var(--border-color)', overflow: 'hidden', boxShadow: '0 2px 6px rgba(0,0,0,0.05)' }}>
              {[
                { icon: '📍', label: '주소', value: ossuary.address },
                { icon: '📞', label: '전화번호', value: ossuary.phone || '정보 없음' },
                { icon: '📠', label: '팩스', value: ossuary.fax || '정보 없음' },
                { icon: '🚗', label: '주차', value: ossuary.parking },
              ].map((row, i) => (
                <div key={i} style={{ display: 'flex', padding: '0.875rem 1.25rem', borderBottom: i < 3 ? '1px solid #f1f5f9' : 'none', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1rem', flexShrink: 0, marginTop: '2px' }}>{row.icon}</span>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '600', marginBottom: '0.15rem' }}>{row.label}</div>
                    <div style={{ fontSize: '0.95rem', color: 'var(--text)', lineHeight: 1.5 }}>{row.value}</div>
                  </div>
                </div>
              ))}
            </div>
            {ossuary.intro && (
              <div style={{ marginTop: '1rem', padding: '1.25rem', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '600', marginBottom: '0.5rem' }}>📖 시설 소개</div>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.75, whiteSpace: 'pre-line' }}>
                  {ossuary.intro}
                </p>
              </div>
            )}
          </section>

          {/* 상담 CTA */}
          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--navy)', marginBottom: '1rem' }}>가효상조 상담</h2>
            <div style={{ background: 'linear-gradient(135deg, var(--navy-dark), var(--navy))', borderRadius: '12px', padding: '1.75rem', color: 'white', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📞</div>
              <div style={{ fontWeight: '700', fontSize: '1rem', marginBottom: '0.25rem', color: 'rgba(255,255,255,0.85)' }}>지금 바로 연결하세요. 24시간 무료 상담</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--gold)', marginBottom: '0.75rem' }}>1551-5718</div>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.75)', marginBottom: '1.25rem', lineHeight: 1.6, wordBreak: 'keep-all' }}>
                가효상조 고객 전용 할인 적용<br/>장례지도사 현장 동행 무료
              </p>
              <a href="tel:1551-5718" style={{ display: 'block', background: 'var(--gold)', color: 'var(--navy-dark)', textDecoration: 'none', padding: '0.9rem', borderRadius: '8px', fontWeight: '800', fontSize: '1rem' }}>
                지금 바로 전화하기
              </a>
              <Link href="/estimate" style={{ display: 'block', marginTop: '0.75rem', color: 'rgba(255,255,255,0.75)', textDecoration: 'none', fontSize: '0.85rem', padding: '0.6rem' }}>
                온라인 견적 받기 →
              </Link>
            </div>
          </section>
        </div>

        {/* 안치 비용 안내 */}
        {groupEntries.length > 0 && (
          <section style={{ marginBottom: '2.5rem' }}>
            {(minPrice && maxPrice) && (
            <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '10px', padding: '1.25rem 1.5rem', marginBottom: '1.25rem' }}>
              <div style={{ fontWeight: '700', fontSize: '0.88rem', color: '#0369a1', marginBottom: '0.5rem' }}>📋 안치 비용 요약</div>
              <div style={{ fontWeight: '800', fontSize: '1.05rem', color: 'var(--navy)', marginBottom: '0.5rem' }}>
                최저 {formatKRW(minPrice)} ~ 최고 {formatKRW(maxPrice)}{' '}
                <span style={{ fontSize: '0.82rem', fontWeight: '500', color: '#64748b' }}>(관리비 별도)</span>
              </div>
              <p style={{ margin: '0 0 0.875rem', fontSize: '0.88rem', color: '#475569', wordBreak: 'keep-all' }}>
                구역이 너무 많아서 고르기 어려우신가요?<br />예산과 상황을 말씀해 주시면 적합한 구역을 바로 추천해 드립니다.
              </p>
              <a href="tel:1551-5718" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.55rem 1.1rem', background: 'var(--navy)', color: 'white', borderRadius: '6px', fontWeight: '700', fontSize: '0.88rem', textDecoration: 'none' }}>
                📞 1551-5718 · 지금 무료 상담
              </a>
            </div>
          )}
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--navy)', marginBottom: '0.5rem' }}>안치 비용 안내</h2>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.25rem' }}>
              * 아래 금액은 시설 공시 가격이며, 가효상조 고객은 별도 할인 혜택이 적용됩니다.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {groupEntries.map(([location, items], groupIdx) => (
                <>
                  {/* 가격 테이블 중간 CTA — 10행 이상이고 절반 지점 */}
                  {totalPriceRows >= 10 && groupIdx === midPoint && (
                    <div key="mid-cta" style={{ gridColumn: '1 / -1', background: 'linear-gradient(135deg, #1e293b, #334155)', borderRadius: '12px', padding: '1.5rem 2rem', textAlign: 'center', border: '1px solid rgba(201,168,76,0.3)' }}>
                      <p style={{ margin: '0 0 0.5rem', fontWeight: '700', fontSize: '1.05rem', color: 'white', wordBreak: 'keep-all' }}>
                        아직 구역을 못 고르셨나요?
                      </p>
                      <p style={{ margin: '0 0 1.25rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', wordBreak: 'keep-all' }}>
                        {groupEntries.length}개 구역 중 우리 가족에게 맞는 곳, 장례지도사가 직접 골라드립니다.
                      </p>
                      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a href="tel:1551-5718" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.7rem 1.4rem', background: 'var(--gold)', color: '#0f172a', borderRadius: '8px', fontWeight: '800', fontSize: '0.95rem', textDecoration: 'none' }}>
                          📞 1551-5718 · 24시간 상담 가능
                        </a>
                        <a href="https://open.kakao.com/o/s6oRdRhg" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.7rem 1.4rem', background: '#FEE500', color: '#000', borderRadius: '8px', fontWeight: '800', fontSize: '0.95rem', textDecoration: 'none' }}>
                          💬 카카오로 문의하기
                        </a>
                      </div>
                    </div>
                  )}
                  <div key={location} style={{ background: 'white', borderRadius: '10px', border: '1px solid var(--border-color)', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                    <div style={{ background: 'var(--navy)', color: 'white', padding: '0.6rem 1rem', fontWeight: '700', fontSize: '0.9rem' }}>
                      🏛️ {location}
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                      <thead>
                        <tr style={{ background: '#f8fafc' }}>
                          <th style={{ padding: '0.5rem 1rem', textAlign: 'left', color: '#64748b', fontWeight: '600', borderBottom: '1px solid #e2e8f0' }}>구역/단</th>
                          <th style={{ padding: '0.5rem 1rem', textAlign: 'right', color: '#64748b', fontWeight: '600', borderBottom: '1px solid #e2e8f0' }}>금액</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item, idx) => (
                          <tr key={idx} style={{ borderBottom: idx < items.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                            <td style={{ padding: '0.6rem 1rem', color: 'var(--text)' }}>{item.detail || '-'}</td>
                            <td style={{ padding: '0.6rem 1rem', textAlign: 'right', color: 'var(--navy)', fontWeight: '600' }}>{item.priceFormatted}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--navy)', marginBottom: '1.25rem' }}>{ossuary.name} 자주 묻는 질문</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {faqItems.map((faq, i) => (
              <details key={i} style={{ background: 'white', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1rem 1.25rem' }}>
                <summary style={{ fontWeight: '700', cursor: 'pointer', color: 'var(--navy)', fontSize: '0.95rem', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Q. {faq.q}</span>
                  <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>＋</span>
                </summary>
                <p style={{ marginTop: '0.875rem', marginBottom: 0, color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.9rem', borderTop: '1px solid #f1f5f9', paddingTop: '0.875rem', wordBreak: 'keep-all' }}>
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* 하단 CTA */}
        <section style={{ background: 'linear-gradient(135deg, var(--navy-dark), var(--navy))', borderRadius: '16px', padding: '2.5rem 2rem', textAlign: 'center', color: 'white' }}>
          <h2 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', fontWeight: '800', marginBottom: '0.75rem', wordBreak: 'keep-all' }}>
            {ossuary.name}, 오늘 바로 예약할 수 있습니다.
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)', marginBottom: '0.4rem', wordBreak: 'keep-all' }}>
            할인 금액 확인 · 구역 추천 · 현장 동행 — 모두 무료
          </p>
          <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', marginBottom: '1.5rem', wordBreak: 'keep-all' }}>
            가효상조가 처음부터 끝까지 함께합니다.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
            {['가입비 0원', '월 납입금 0원', '100% 후불제', '24시간 출동'].map((t) => (
              <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.35rem 0.9rem', background: 'rgba(255,255,255,0.1)', borderRadius: '999px', fontSize: '0.82rem', color: 'rgba(255,255,255,0.9)', border: '1px solid rgba(255,255,255,0.2)' }}>
                ✔ {t}
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="tel:1551-5718" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '1rem 1.75rem', background: 'var(--gold)', color: '#0f172a', borderRadius: '10px', fontWeight: '800', fontSize: '1rem', textDecoration: 'none', boxShadow: '0 4px 14px rgba(201,168,76,0.4)' }}>
              📞 1551-5718 · 24시간 전화 가능
            </a>
            <a href="https://open.kakao.com/o/s6oRdRhg" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '1rem 1.75rem', background: '#FEE500', color: '#000', borderRadius: '10px', fontWeight: '800', fontSize: '1rem', textDecoration: 'none' }}>
              💬 카카오로 편하게 문의하기
            </a>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <Link href="/custom-package" style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.85rem', textDecoration: 'none' }}>
              🧮 AI 견적 먼저 받아보기 →
            </Link>
          </div>
        </section>

      </div>
    </>
  );
}
