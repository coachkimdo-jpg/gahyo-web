import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import naturalBurialsData from '@/lib/naturalBurials.json';
import { getSlug } from '@/lib/utils';


export async function generateMetadata({ params }) {
  const { id } = await params;
  const decodedSlug = decodeURIComponent(id);
  let facility = naturalBurialsData.find(n => getSlug(n.address, n.name) === decodedSlug);
  
  if (!facility) {
    if (/^\d+$/.test(id)) {
      const legacyFacility = naturalBurialsData.find((n) => n.id === id);
      if (legacyFacility) return { title: `가효상조 - ${legacyFacility.name} 100% 후불제 상조 및 투명한 장례 서비스` };
    }
    return { title: 'Not Found' };
  }
  
  return {
    title: `가효상조 - ${facility.name} 100% 후불제 자연장 서비스`,
    description: `가효상조는 선불 납입금 없이 발인 날 결제하는 100% 후불제 상조입니다. ${facility.address}에 위치한 ${facility.name} 이용 시 투명한 비용을 약속드립니다.`,
  };
}

export default async function NaturalBurialPage({ params }) {
  const { id } = await params;
  const decodedSlug = decodeURIComponent(id);
  let facility = naturalBurialsData.find(n => getSlug(n.address, n.name) === decodedSlug);
  
  if (!facility) {
    if (/^\d+$/.test(id)) {
      const legacyFacility = naturalBurialsData.find((n) => n.id === id);
      if (legacyFacility) {
        permanentRedirect(`/cemeteries/natural/${getSlug(legacyFacility.address, legacyFacility.name)}`);
      }
    }
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://gahyo.com/#organization',
        'name': '가효상조',
        'url': 'https://gahyo.com',
        'description': '100% 후불제 상조 서비스'
      },
      {
        '@type': 'LocalBusiness',
        '@id': `https://gahyo.com/cemeteries/natural/${id}#business`,
        'name': facility.name,
        'image': facility.photos?.[0] ? `https://gahyo.com${facility.photos[0]}` : undefined,
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': facility.address,
          'addressCountry': 'KR'
        },
        'telephone': facility.phone,
        'description': facility.intro || `${facility.name} 자연장지 시설 안내`
      },
      {
        '@type': 'FAQPage',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': `${facility.name} 자연장지 가격은 얼마인가요?`,
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `${facility.name}의 이용 요금은 구역과 형태에 따라 다릅니다. 가효상조(1551-5718)에 문의하시면 정확한 최신 가격과 할인 혜택을 안내해 드립니다.`
            }
          },
          {
            '@type': 'Question',
            'name': `${facility.name}은 어디에 위치해 있나요?`,
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `${facility.address}에 위치해 있습니다. 주차 공간은 ${facility.parking}입니다.`
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <div style={{ background: 'linear-gradient(135deg, #1a3d2a 0%, #2d6a4f 100%)', color: 'white', padding: '4rem 1.25rem 3rem' }}>
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
              🌲 자연장지
            </div>
          </div>

          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', lineHeight: 1.4, marginBottom: '1.5rem' }}>
            가효상조 - {facility.name} 100% 후불제 자연장 서비스
          </h1>
          
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(201,168,76,0.3)', borderLeft: '4px solid var(--gold)' }}>
            <p style={{ margin: 0, fontSize: '1.05rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.9)' }}>
              가효상조는 선불 납입금 없이 발인 날 결제하는 <strong>100% 후불제 상조</strong>입니다.
              전국 500여 개 장례식장과 자연장지와 제휴하여 <strong>{facility.name}</strong> 이용 시 투명한 비용을 약속드립니다.
            </p>
          </div>
        </div>
      </div>
      
      <div className="container" style={{ padding: '3rem 1.25rem' }}>
        
        {facility.photos?.length > 0 && (
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.4rem', color: 'var(--navy)', marginBottom: '1rem', fontWeight: '700' }}>시설 갤러리</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
              {facility.photos.map((photo, idx) => (
                <div key={idx} style={{ borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', aspectRatio: '4/3' }}>
                  <img src={photo} alt={`${facility.region} 친환경 자연장지 ${facility.name} 수목장/잔디장 추모목 전경 ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', marginBottom: '3rem' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', color: 'var(--navy)', marginBottom: '1rem', fontWeight: '700' }}>기본 정보</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <li style={{ padding: '1rem', background: 'var(--gray-bg)', borderRadius: '8px' }}>
                <strong style={{ display: 'block', color: 'var(--navy)', marginBottom: '0.2rem' }}>📍 주소</strong>
                <span>{facility.address}</span>
              </li>
              <li style={{ padding: '1rem', background: 'var(--gray-bg)', borderRadius: '8px' }}>
                <strong style={{ display: 'block', color: 'var(--navy)', marginBottom: '0.2rem' }}>📞 전화번호</strong>
                <span>{facility.phone}</span>
              </li>
              <li style={{ padding: '1rem', background: 'var(--gray-bg)', borderRadius: '8px' }}>
                <strong style={{ display: 'block', color: 'var(--navy)', marginBottom: '0.2rem' }}>🚗 주차</strong>
                <span>{facility.parking}</span>
              </li>
              {facility.intro && (
                <li style={{ padding: '1rem', background: 'var(--gray-bg)', borderRadius: '8px' }}>
                  <strong style={{ display: 'block', color: 'var(--navy)', marginBottom: '0.2rem' }}>📖 소개</strong>
                  <span style={{ whiteSpace: 'pre-line' }}>{facility.intro}</span>
                </li>
              )}
            </ul>
          </div>
          
          <div>
            <h2 style={{ fontSize: '1.4rem', color: 'var(--navy)', marginBottom: '1rem', fontWeight: '700' }}>이용 비용 안내</h2>
            <div style={{ padding: '1.5rem', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px' }}>
              <p style={{ margin: '0 0 0.5rem', fontWeight: '700', color: '#166534', fontSize: '1.05rem' }}>
                예상 비용: {facility.priceRange}
              </p>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#16a34a' }}>
                * 정확한 이용 비용은 구역과 형태에 따라 다릅니다. 전화로 실시간 확인해 주세요.
              </p>
              <div style={{ marginTop: '1.5rem' }}>
                <a href="tel:1551-5718" style={{ display: 'block', textAlign: 'center', background: '#166534', color: 'white', textDecoration: 'none', padding: '1rem', borderRadius: '8px', fontWeight: '700', fontSize: '1.1rem' }}>
                  전화로 실시간 비용 문의하기 (1551-5718)
                </a>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.4rem', color: 'var(--navy)', marginBottom: '1.5rem', fontWeight: '700' }}>{facility.name} 자주 묻는 질문 (FAQ)</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <details style={{ background: 'white', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1rem' }}>
              <summary style={{ fontWeight: '700', cursor: 'pointer', color: 'var(--navy)' }}>{facility.name} 자연장지 가격은 얼마인가요?</summary>
              <p style={{ marginTop: '1rem', marginBottom: 0, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                구역과 형태에 따라 다르며, 대략 {facility.priceRange} 수준입니다. 가효상조에 문의하시면 {facility.name}의 정확한 최신 가격과 할인 혜택을 안내해 드립니다.
              </p>
            </details>
            <details style={{ background: 'white', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1rem' }}>
              <summary style={{ fontWeight: '700', cursor: 'pointer', color: 'var(--navy)' }}>자연장지(수목장)란 무엇인가요?</summary>
              <p style={{ marginTop: '1rem', marginBottom: 0, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                자연장지는 화장한 유골의 골분을 잔디, 꽃, 나무 뿌리 부근에 묻는 친환경 장례 방식입니다. 자연으로 돌아가는 의미 있는 방법으로 많은 분들이 선호하고 있습니다. 가효상조는 전국 자연장지에 대한 전문 안내와 장례지도사 동행 서비스를 제공합니다.
              </p>
            </details>
          </div>
        </div>
        
      </div>
    </>
  );
}
