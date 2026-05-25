import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import ossuariesData from '@/lib/ossuaries.json';
import { getSlug } from '@/lib/utils';


export async function generateMetadata({ params }) {
  const { id } = await params;
  const decodedSlug = decodeURIComponent(id);
  let ossuary = ossuariesData.find(o => getSlug(o.address, o.name) === decodedSlug);
  
  if (!ossuary) {
    if (/^\d+$/.test(id)) {
      const legacyOssuary = ossuariesData.find((o) => o.id === id);
      if (legacyOssuary) return { title: `가효상조 - ${legacyOssuary.name} 100% 후불제 상조 및 투명한 장례 서비스` };
    }
    return { title: 'Not Found' };
  }
  return {
    title: `가효상조 - ${ossuary.name} 100% 후불제 상조 및 투명한 장례 서비스`,
    description: `${ossuary.address}에 위치한 ${ossuary.name}. 가효상조는 선불 납입금 없이 발인 날 결제하는 100% 후불제 상조입니다. 안치 비용 ${ossuary.priceRange} 안내.`,
  };
}

export default async function OssuaryPage({ params }) {
  const { id } = await params;
  const decodedSlug = decodeURIComponent(id);
  let ossuary = ossuariesData.find(o => getSlug(o.address, o.name) === decodedSlug);
  
  if (!ossuary) {
    if (/^\d+$/.test(id)) {
      const legacyOssuary = ossuariesData.find((o) => o.id === id);
      if (legacyOssuary) {
        permanentRedirect(`/cemeteries/ossuary/${encodeURIComponent(getSlug(legacyOssuary.address, legacyOssuary.name))}`);
      }
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://gahyo.com/#organization',
        name: '가효상조',
        url: 'https://gahyo.com',
        telephone: '1551-5718',
        description: '100% 후불제 상조 서비스'
      },
      {
        '@type': 'LocalBusiness',
        name: ossuary.name,
        image: ossuary.photos?.[0] ? `https://gahyo.com${ossuary.photos[0]}` : undefined,
        address: { '@type': 'PostalAddress', streetAddress: ossuary.address, addressCountry: 'KR' },
        telephone: ossuary.phone,
        description: ossuary.intro || `${ossuary.name} 봉안당 시설 안내`
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `${ossuary.name} 봉안당 가격은 얼마인가요?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `${ossuary.name}의 안치 비용은 ${ossuary.priceRange} 수준입니다. 구역과 단 높이에 따라 다르며, 가효상조(1551-5718)에 문의하시면 정확한 비용과 할인 혜택을 안내해 드립니다.`
            }
          },
          {
            '@type': 'Question',
            name: `${ossuary.name}의 주차 시설은 어떻게 되나요?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `${ossuary.address}에 위치하며 주차 공간은 ${ossuary.parking}입니다.`
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* 히어로 */}
      <div style={{ background: 'linear-gradient(135deg, var(--navy-dark) 0%, var(--navy) 100%)', color: 'white', padding: '3.5rem 1.25rem 2.5rem' }}>
        <div className="container">
          <div style={{ marginBottom: '1.25rem' }}>
            <Link href="/cemeteries" style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none', fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              ← 모실곳 찾기 목록으로
            </Link>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem', alignItems: 'center' }}>
            {/* E-E-A-T 배지 */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.3rem 0.8rem', background: 'rgba(255,255,255,0.1)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.2)', fontSize: '0.8rem' }}>
              🛡️ <strong>국가공인 장례지도사 직접 운영 | 검수 완료</strong>
            </div>

            <div style={{ display: 'inline-flex', alignItems: 'center', background: 'rgba(201,168,76,0.25)', border: '1px solid rgba(201,168,76,0.5)', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem' }}>
              🏛️ 봉안시설
            </div>
          </div>

          <h1 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: '800', lineHeight: 1.35, marginBottom: '1.25rem' }}>
            가효상조 - {ossuary.name} 100% 후불제 상조 및 투명한 장례 서비스
          </h1>

          {/* BLUF 핵심 요약 */}
          <div style={{ background: 'rgba(255,255,255,0.06)', padding: '1.25rem 1.5rem', borderRadius: '10px', border: '1px solid rgba(201,168,76,0.3)', borderLeft: '4px solid var(--gold)' }}>
            <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.9)' }}>
              가효상조는 선불 납입금 없이 발인 날 결제하는 <strong>100% 후불제 상조</strong>입니다.
              전국 500여 개 장례식장과 제휴하여 <strong>{ossuary.name}</strong> 이용 시 투명한 비용을 약속드립니다.
            </p>
          </div>
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

            {/* 소개글 */}
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
              <div style={{ fontWeight: '700', fontSize: '1.1rem', marginBottom: '0.25rem' }}>24시간 무료 상담</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--gold)', marginBottom: '0.75rem' }}>1551-5718</div>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.75)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                100% 후불제 · 선불 납입금 없음<br/>장례지도사 직접 동행 서비스
              </p>
              <a href="tel:1551-5718" style={{ display: 'block', background: 'var(--gold)', color: 'var(--navy-dark)', textDecoration: 'none', padding: '0.9rem', borderRadius: '8px', fontWeight: '800', fontSize: '1rem' }}>
                지금 바로 전화하기
              </a>
              <Link href="/estimate" style={{ display: 'block', marginTop: '0.75rem', color: 'rgba(255,255,255,0.75)', textDecoration: 'none', fontSize: '0.85rem', padding: '0.6rem' }}>
                온라인 비용 견적 받기 →
              </Link>
            </div>
          </section>
        </div>

        {/* 안치 비용 안내 */}
        {Object.keys(groupedPrices).length > 0 && (
          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--navy)', marginBottom: '0.5rem' }}>안치 비용 안내</h2>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.25rem' }}>
              * 아래 금액은 시설 공시 가격이며, 가효상조 고객은 별도 할인 혜택이 적용됩니다.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {Object.entries(groupedPrices).map(([location, items]) => (
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
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        <section style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--navy)', marginBottom: '1.25rem' }}>{ossuary.name} 자주 묻는 질문</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              {
                q: `${ossuary.name} 봉안당 가격은 얼마인가요?`,
                a: `안치 비용은 ${ossuary.priceRange} 수준입니다. 구역과 단 높이(눈높이 4~6단이 인기)에 따라 달라지며, 가효상조에 문의하시면 정확한 비용과 할인 혜택을 안내해 드립니다.`
              },
              {
                q: `가효상조와 함께하면 어떤 혜택이 있나요?`,
                a: `가효상조는 100% 후불제로 선불 납입금이 없습니다. 국가공인 장례지도사가 직접 동행하여 봉안 절차를 안내드리며, 전국 500여 개 제휴 시설 이용 시 특별 할인 혜택을 제공합니다.`
              },
              {
                q: `주차는 가능한가요?`,
                a: `${ossuary.name}의 주차 공간은 ${ossuary.parking}입니다. 성묘 시즌(명절, 한식 등)에는 매우 혼잡할 수 있으니 대중교통 이용을 권장합니다.`
              }
            ].map((faq, i) => (
              <details key={i} style={{ background: 'white', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1rem 1.25rem' }}>
                <summary style={{ fontWeight: '700', cursor: 'pointer', color: 'var(--navy)', fontSize: '0.95rem', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Q. {faq.q}</span>
                  <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>＋</span>
                </summary>
                <p style={{ marginTop: '0.875rem', marginBottom: 0, color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.9rem', borderTop: '1px solid #f1f5f9', paddingTop: '0.875rem' }}>
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}
