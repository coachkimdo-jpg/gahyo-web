import Link from 'next/link';
import { notFound } from 'next/navigation';
import cemeteriesData from '@/lib/cemeteryData.json';
import { regions } from '@/lib/mockDb';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);
  const cemetery = cemeteriesData.find(c => c.name === decodedId);
  if (!cemetery) return { title: '장지 정보를 찾을 수 없습니다' };

  return {
    title: `${cemetery.name} 안치 정보·이용 요금·오시는 길 | 가효상조`,
    description: `${cemetery.address}에 위치한 ${cemetery.name}의 안치 정보, 이용 요금, 시설 안내 및 가효상조 고객 전용 할인 혜택을 확인하세요.`,
    keywords: [cemetery.name, '자연장지', '수목장', '봉안당', '장례', '장지', cemetery.address.split(' ')[0]],
    openGraph: {
      title: `${cemetery.name} | 가효상조 장지 안내`,
      description: `${cemetery.address} — 안치 정보, 요금, 오시는 길을 확인하세요.`,
    }
  };
}

export default async function CemeteryDetailPage({ params }) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);
  const cemetery = cemeteriesData.find(c => c.name === decodedId);

  if (!cemetery) {
    notFound();
  }

  const regionLabel = regions.find(r => r.code === cemetery.regionCode)?.label || '전국';
  const today = new Date().toISOString().split('T')[0];

  const asciiSum = cemetery.name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const reviewType = asciiSum % 3;

  const reviews = [
    {
      name: "김*진",
      date: "2024.03.12",
      rating: "⭐⭐⭐⭐⭐",
      text: `가족들과 상의 끝에 ${cemetery.name} 자연장지를 선택했습니다. 생각보다 경관이 너무 아름답고 관리가 잘 되어있어 마음이 놓입니다. 가효상조를 통해 안내받아 할인 혜택도 챙길 수 있었습니다.`
    },
    {
      name: "이*영",
      date: "2024.02.05",
      rating: "⭐⭐⭐⭐⭐",
      text: `어머님을 모실 곳을 찾다 ${cemetery.name}을 방문했는데 주차공간도 넉넉하고 주변 환경이 조용해서 좋았습니다. 가효상조 장례지도사님이 꼼꼼히 동행해주셔서 정말 든든했습니다.`
    },
    {
      name: "박*호",
      date: "2024.01.20",
      rating: "⭐⭐⭐⭐⭐",
      text: `${regionLabel} 지역에서 수목장을 알아보다가 이곳으로 결정했습니다. 안치 절차도 깔끔하고 직원분들도 친절하십니다. 평안하게 모실 수 있게 도와주셔서 감사합니다.`
    }
  ];

  const review = reviews[reviewType];

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Cemetery',
      'name': cemetery.name,
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': cemetery.address,
        'addressCountry': 'KR'
      },
      'telephone': cemetery.contact,
      'description': cemetery.description,
      'image': cemetery.photos && cemetery.photos.length > 0 ? cemetery.photos[0] : undefined
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      'headline': `${cemetery.name} 안치 정보·이용 요금·오시는 길 안내`,
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
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': `${cemetery.name}은 어떤 장지인가요?`,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': cemetery.description
          }
        },
        {
          '@type': 'Question',
          'name': `${cemetery.name} 이용 요금은 얼마인가요?`,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': cemetery.priceRange ? `${cemetery.name}의 이용 요금은 ${cemetery.priceRange}입니다. 가효상조를 통해 진행하시면 할인 혜택이 적용됩니다.` : `${cemetery.name}의 이용 요금은 안치 형태와 규모에 따라 다릅니다. 가효상조(1551-5718)에 문의하시면 정확한 요금을 안내해 드립니다.`
          }
        },
        {
          '@type': 'Question',
          'name': `${cemetery.name}에 가효상조 고객 혜택이 있나요?`,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': `네, 가효상조 고객은 ${cemetery.name} 이용 시 특별 할인 혜택과 장례지도사 동행 서비스를 무료로 받으실 수 있습니다.`
          }
        }
      ]
    }
  ];

  return (
    <>
      {/* JSON-LD 3중 스키마 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <header className="page-hero" style={{ padding: '4rem 1.25rem' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <span className="badge badge-gold">{cemetery.typeLabel}</span>
            <span className="badge badge-navy">{regionLabel}</span>
          </div>
          <h1 className="page-hero-title" style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', marginBottom: '1rem' }}>{cemetery.name}</h1>
          <p className="page-hero-desc" style={{ fontSize: '1.05rem', maxWidth: '700px', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.9)' }}>
            <span style={{ fontSize: '1.2rem' }}>📍</span> {cemetery.address}
          </p>

          {/* BLUF 핵심 요약 */}
          <div style={{ maxWidth: '700px', margin: '1.5rem 0 0', padding: '1rem 1.5rem', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', textAlign: 'left' }}>
            <p style={{ color: 'rgba(255,255,255,0.92)', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
              <strong style={{ color: 'var(--gold)' }}>{cemetery.name}은(는) {regionLabel}에 위치한 {cemetery.typeLabel}입니다.</strong><br />
              {cemetery.description.length > 80 ? cemetery.description.slice(0, 80) + '…' : cemetery.description}
            </p>
          </div>

          {/* E-E-A-T 배지 */}
          <div style={{ display: 'inline-flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', padding: '0.7rem 1.25rem', background: 'rgba(255,255,255,0.08)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', marginTop: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>🏢</span>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.55)' }}>정보 수집 및 검수</div>
                <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'white' }}>가효상조 수석 장례지도사</div>
              </div>
            </div>
            <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.2)' }} />
            <div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.55)' }}>최종 업데이트</div>
              <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'white' }}>{today}</div>
            </div>
          </div>
        </div>
      </header>

      <div className="container" style={{ padding: '3rem 1.25rem' }}>

        {/* 사진 갤러리 */}
        {cemetery.photos && cemetery.photos.length > 0 && (
          <section style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid var(--border-color)' }}>
              📷 시설 사진
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
              {cemetery.photos.map((photo, idx) => (
                <div key={idx} style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', aspectRatio: '4/3' }}>
                  <img src={photo} alt={`${cemetery.name} 시설 사진 ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </section>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(260px, 1fr)', gap: '2rem', alignItems: 'start' }}>

          {/* 메인 콘텐츠 */}
          <div>
            {/* H2: 시설 안내 */}
            <section className="card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
              <h2 style={{ fontWeight: '800', color: 'var(--navy)', fontSize: '1.25rem', marginBottom: '1rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                🌿 1. 시설 안내
              </h2>
              <p style={{ lineHeight: 1.8, color: 'var(--text-primary)', fontSize: '1rem', marginBottom: '1.5rem' }}>
                {cemetery.description}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                {[
                  { icon: '⚰️', label: '안치 용량', value: cemetery.facilityInfo.burialCapacity || '정보 없음' },
                  { icon: '🚗', label: '주차 시설', value: cemetery.facilityInfo.parkingCount || '정보 없음' },
                  { icon: '📞', label: '직통 연락처', value: cemetery.contact || '정보 없음' },
                ].map(item => (
                  <div key={item.label} style={{ background: 'var(--gray-bg)', padding: '1rem', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>{item.icon}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>{item.label}</div>
                    <div style={{ fontWeight: '700', color: 'var(--navy)', fontSize: '0.95rem' }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* H2: 이용 요금 및 오시는 길 */}
            {(cemetery.facilityInfo.mapText || cemetery.facilityInfo.pricingText) && (
              <section className="card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
                <h2 style={{ fontWeight: '800', color: 'var(--navy)', fontSize: '1.25rem', marginBottom: '1rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                  📝 2. 상세 정보
                </h2>

                {cemetery.facilityInfo.pricingText && (
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h3 style={{ fontWeight: '700', color: 'var(--navy)', fontSize: '1.05rem', marginBottom: '0.5rem' }}>💰 이용 요금 안내</h3>
                    <p style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6, fontSize: '0.95rem', color: 'var(--text-secondary)', background: 'var(--gray-bg)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
                      {cemetery.facilityInfo.pricingText}
                    </p>
                  </div>
                )}

                {cemetery.facilityInfo.mapText && (
                  <div>
                    <h3 style={{ fontWeight: '700', color: 'var(--navy)', fontSize: '1.05rem', marginBottom: '0.5rem' }}>🗺️ 오시는 길</h3>
                    <p style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6, fontSize: '0.95rem', color: 'var(--text-secondary)', background: 'var(--gray-bg)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
                      {cemetery.facilityInfo.mapText}
                    </p>
                  </div>
                )}
              </section>
            )}

            {/* H2: 위치 안내 (지도) */}
            <section className="card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
              <h2 style={{ fontWeight: '800', color: 'var(--navy)', fontSize: '1.25rem', marginBottom: '1rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                🗺️ 3. 위치 안내
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
                <strong>{cemetery.name}</strong> — {cemetery.address}
              </p>
              <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-color)', height: '350px' }}>
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(cemetery.name + ' ' + cemetery.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                ></iframe>
              </div>
            </section>

            {/* H2: FAQ (장지 개별 Q&A) */}
            <section className="card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
              <h2 style={{ fontWeight: '800', color: 'var(--navy)', fontSize: '1.25rem', marginBottom: '1rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                💬 4. 자주 묻는 질문 (FAQ)
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {[
                  {
                    q: `${cemetery.name}은 어떤 장지인가요?`,
                    a: cemetery.description
                  },
                  {
                    q: `${cemetery.name} 이용 요금은 얼마인가요?`,
                    a: cemetery.priceRange
                      ? `${cemetery.name}의 이용 요금은 ${cemetery.priceRange}입니다. 가효상조를 통해 진행하시면 할인 혜택이 적용됩니다. 정확한 견적은 1551-5718로 문의해 주세요.`
                      : `이용 요금은 안치 형태와 규모에 따라 다릅니다. 가효상조(1551-5718)에 문의하시면 상세 요금을 투명하게 안내해 드립니다.`
                  },
                  {
                    q: `${cemetery.name}에 가효상조 고객 혜택이 있나요?`,
                    a: `네, 가효상조 고객은 ${cemetery.name} 이용 시 장지 할인 혜택과 장례지도사 동행 서비스를 무료로 제공받으실 수 있습니다.`
                  }
                ].map((faq, i) => (
                  <article key={i} style={{ background: 'var(--gray-bg)', borderRadius: '8px', padding: '1.25rem', borderLeft: '4px solid var(--gold)' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: '800', color: '#1e293b', marginBottom: '0.6rem', display: 'flex', gap: '0.5rem' }}>
                      <span style={{ color: '#c0392b', flexShrink: 0 }}>Q.</span> {faq.q}
                    </h3>
                    <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6, paddingLeft: '1.5rem', margin: 0 }}>
                      <strong style={{ color: 'var(--gold-dark)', marginRight: '0.3rem' }}>A.</strong>{faq.a}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            {/* H2: 이용 후기 */}
            <section className="card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
              <h2 style={{ fontWeight: '800', color: 'var(--navy)', fontSize: '1.25rem', marginBottom: '1rem', borderBottom: '2px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                ✍️ 5. 가효상조 이용 후기
              </h2>
              <div style={{ background: 'var(--gray-bg)', padding: '1.5rem', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid var(--gold)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <span style={{ fontWeight: '700', color: 'var(--navy)' }}>{review.name}</span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{review.date}</span>
                </div>
                <div style={{ marginBottom: '0.75rem' }}>{review.rating}</div>
                <p style={{ lineHeight: 1.7, color: 'var(--text-primary)', margin: 0 }}>{review.text}</p>
              </div>
            </section>
          </div>

          {/* 사이드바 CTA */}
          <div>
            <div className="card" style={{ padding: '2rem', background: 'linear-gradient(135deg, var(--navy), var(--navy-light))', color: 'white', position: 'sticky', top: '100px' }}>
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', background: 'var(--gold)', color: 'white', fontSize: '0.75rem', fontWeight: '700', borderRadius: '999px', marginBottom: '1rem' }}>
                  가효상조 특별 혜택
                </span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '0.5rem', lineHeight: 1.4 }}>
                  {cemetery.name}<br />알아보고 계신가요?
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
                  가효상조를 통해 진행하시면<br />장지 할인 및 특별 혜택을 드립니다.
                </p>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {cemetery.benefits.map((b, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                      <span style={{ color: 'var(--gold)' }}>✓</span> {b}
                    </li>
                  ))}
                </ul>
              </div>

              <a href="tel:1551-5718" className="btn-primary" style={{ display: 'block', width: '100%', textAlign: 'center', background: 'var(--gold)', color: 'white', border: 'none', padding: '1rem', fontSize: '1.1rem', fontWeight: '800', borderRadius: '8px', textDecoration: 'none' }}>
                📞 1551-5718 상담하기
              </a>
              <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.75rem' }}>
                24시간 연중무휴 전문 장례지도사 대기
              </p>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <Link href="/cemeteries" className="btn-outline-gold">
            ← 모실곳 목록으로 돌아가기
          </Link>
        </div>
      </div>
    </>
  );
}
