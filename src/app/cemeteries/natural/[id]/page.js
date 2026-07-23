import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import naturalBurialsData from '@/lib/naturalBurials.json';
import { getSlug } from '@/lib/utils';
import HallStickyBar from '@/components/HallStickyBar';


export async function generateMetadata({ params }) {
  const { id } = await params;
  let decodedSlug = id;
  try { decodedSlug = decodeURIComponent(id); } catch(e) { return { title: 'Not Found' }; }
  
  let burial = naturalBurialsData.find(g => getSlug(g.address, g.name) === decodedSlug);
  
  if (!burial) {
    // 숫자 facilitycd로 매칭 (예전 URL: /cemeteries/natural/7000002012)
    let legacyBurial = null;
    if (/^\d+$/.test(decodedSlug)) {
      legacyBurial = naturalBurialsData.find((g) => String(g.id) === decodedSlug);
    }
    if (!legacyBurial) {
      legacyBurial = naturalBurialsData.find((g) => String(g.id) === id || String(g.id) === decodedSlug);
    }
    if (!legacyBurial) {
      legacyBurial = naturalBurialsData.find((g) => {
        if (!g.address) return false;
        const addrSlug = g.address.replace(/\s+/g, '-');
        return addrSlug === decodedSlug || g.address === decodedSlug || g.address.includes(decodedSlug.replace(/-/g, ' '));
      });
    }
    if (!legacyBurial) {
      const slugNamePart = decodedSlug.split('-').slice(1).join('-');
      if (slugNamePart) {
        legacyBurial = naturalBurialsData.find((g) => g.name.replace(/[\s/\\_]+/g, '') === slugNamePart || g.name.includes(slugNamePart.replace(/-/g, '')));
      }
    }
    if (legacyBurial) burial = legacyBurial;
    if (!burial) return { title: 'Not Found' };
  }
  return {
    title: `가효상조 - ${burial.name} 100% 후불제 상조 및 투명한 장례 서비스`,
    description: `${burial.address}에 위치한 자연장지(수목장/잔디장) ${burial.name}. 선불금 없는 100% 후불제 가효상조와 함께 준비하세요. 관리비 ${burial.priceRange} 수준 안내.`,
    alternates: {
      canonical: `/cemeteries/natural/${getSlug(burial.address, burial.name)}`,
    },
  };
}

export default async function NaturalBurialPage({ params }) {
  const { id } = await params;
  let decodedSlug = id;
  try { decodedSlug = decodeURIComponent(id); } catch(e) { notFound(); }
  
  let burial = naturalBurialsData.find(g => getSlug(g.address, g.name) === decodedSlug);
  
  if (!burial) {
    // 숫자 facilitycd로 매칭 (예전 URL: /cemeteries/natural/7000002012)
    let legacyBurial = null;
    if (/^\d+$/.test(decodedSlug)) {
      legacyBurial = naturalBurialsData.find((g) => String(g.id) === decodedSlug);
    }
    if (!legacyBurial) {
      legacyBurial = naturalBurialsData.find((g) => String(g.id) === id || String(g.id) === decodedSlug);
    }
    if (!legacyBurial) {
      legacyBurial = naturalBurialsData.find((g) => {
        if (!g.address) return false;
        const addrSlug = g.address.replace(/\s+/g, '-');
        return addrSlug === decodedSlug || g.address === decodedSlug || g.address.includes(decodedSlug.replace(/-/g, ' '));
      });
    }
    if (!legacyBurial) {
      const slugNamePart = decodedSlug.split('-').slice(1).join('-');
      if (slugNamePart) {
        legacyBurial = naturalBurialsData.find((g) => g.name.replace(/[\s/\\_]+/g, '') === slugNamePart || g.name.includes(slugNamePart.replace(/-/g, '')));
      }
    }
    if (legacyBurial) {
      permanentRedirect(`/cemeteries/natural/${encodeURIComponent(getSlug(legacyBurial.address, legacyBurial.name))}`);
    }
    notFound();
  }

  const facility = burial;

  const faqItems = [
    {
      q: `가효상조를 통하면 ${facility.name} 공시 가격보다 얼마나 저렴한가요?`,
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
      q: `${facility.name}의 자연장 형태는 어떤 종류가 있나요?`,
      a: `자연장 방식은 수목장, 잔디장, 화초장 등 다양하게 운영됩니다. 시설마다 제공하는 형태가 다르므로, 가효상조 장례지도사와 상담하시면 가족의 상황에 맞는 최적의 자연장 방식을 추천받으실 수 있습니다.`
    },
    {
      q: `자연장 후 고인을 찾아뵐 수 있나요? 관리 체계가 궁금합니다.`,
      a: `네, 자연장 후에도 표지판 또는 나무 번호로 위치를 확인하고 참배하실 수 있습니다. 시설 관리팀이 정기적으로 부지를 관리하며, 구체적인 방문 방법과 제례 절차는 가효상조 상담 시 안내해 드립니다.`
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
      '@id': `https://gahyo.co.kr/cemeteries/natural/${id}#business`,
      name: facility.name,
      image: facility.photos?.[0] ? `https://gahyo.co.kr${facility.photos[0]}` : undefined,
      address: { '@type': 'PostalAddress', streetAddress: facility.address, addressCountry: 'KR' },
      telephone: facility.phone,
      description: facility.intro || `${facility.name} 자연장지 시설 안내`
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
      <HallStickyBar hallName={facility.name} subtitle="자연장지 상담" />

      {/* 히어로 */}
      <div style={{ background: 'linear-gradient(135deg, #1a3d2a 0%, #2d6a4f 100%)', color: 'white', padding: '4rem 1.25rem 3rem' }}>
        <div className="container">
          <div style={{ marginBottom: '1.25rem' }}>
            <Link href="/cemeteries" style={{ color: 'rgba(255,255,255,0.9)', textDecoration: 'none', fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              ← 모실곳 찾기 목록으로
            </Link>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem', alignItems: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.3rem 0.8rem', background: 'rgba(255,255,255,0.1)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.2)', fontSize: '0.8rem' }}>
              🛡️ <strong>국가공인 장례지도사 직접 운영 | 검수 완료</strong>
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', background: 'rgba(201,168,76,0.25)', border: '1px solid rgba(201,168,76,0.5)', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem' }}>
              🌲 자연장지
            </div>
          </div>

          <h1 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: '800', lineHeight: 1.4, marginBottom: '1.25rem' }}>
            {facility.name}에 모시고 싶으신가요?<br />
            <span style={{ fontSize: '0.75em', fontWeight: '700', opacity: 0.9 }}>가효상조의 전문적인 장지 컨설팅, 장례지도사 동행으로 안심하게.</span>
          </h1>

          <div style={{ background: 'rgba(255,255,255,0.06)', padding: '1.25rem 1.5rem', borderRadius: '10px', border: '1px solid rgba(201,168,76,0.3)', borderLeft: '4px solid var(--gold)', marginBottom: '1.5rem' }}>
            <p style={{ margin: '0 0 0.5rem', fontSize: '1.05rem', fontWeight: '700', color: 'white', wordBreak: 'keep-all' }}>
              {facility.name}, 가효상조와 함께라면 더욱 편안하고 정확하게 모실 수 있습니다.
            </p>
            <p style={{ margin: '0 0 0.5rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.85)' }}>
              전문 장례지도사의 <strong style={{ color: '#fbbf24' }}>1:1 맞춤 컨설팅</strong> · 장지 동행 서비스 무료 지원
            </p>
            <p style={{ margin: 0, fontSize: '0.88rem', color: 'rgba(255,255,255,0.92)', wordBreak: 'keep-all' }}>
              어떤 구역이 맞는지 모르셔도 됩니다. 전화 한 통으로 안내해 드립니다.
            </p>
          </div>

          {/* B안: 방문자 상황 선택지 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div style={{ background: 'rgba(239,68,68,0.15)', border: '2px solid rgba(239,68,68,0.65)', borderRadius: '14px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              <p style={{ fontSize: '0.82rem', fontWeight: '800', color: '#fca5a5', lineHeight: 1.35, margin: 0 }}>🚨 지금 임종·장례 상황이신가요?</p>
              <a href="tel:1551-5718"
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0.875rem 0.5rem', background: '#c0392b', color: 'white', fontWeight: '800', fontSize: '1rem', borderRadius: '10px', textDecoration: 'none', boxShadow: '0 4px 12px rgba(192,57,43,0.4)', textAlign: 'center', lineHeight: 1.35 }}>
                <span>📞 1551-5718</span>
                <span style={{ fontSize: '0.72rem', fontWeight: '600', opacity: 0.9, marginTop: '0.15rem' }}>즉시 전화 · 30분 내 출동</span>
              </a>
            </div>
            <div style={{ background: 'rgba(251,191,36,0.12)', border: '2px solid rgba(251,191,36,0.45)', borderRadius: '14px', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              <p style={{ fontSize: '0.82rem', fontWeight: '800', color: '#fde68a', lineHeight: 1.35, margin: 0 }}>📋 미리 알아보고 계신가요?</p>
              <a href="https://pf.kakao.com/_ntRdX/chat" target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0.875rem 0.5rem', background: '#FEE500', color: '#000', fontWeight: '800', fontSize: '1rem', borderRadius: '10px', textDecoration: 'none', textAlign: 'center', lineHeight: 1.35 }}>
                <span>💬 카카오 상담</span>
                <span style={{ fontSize: '0.72rem', fontWeight: '600', opacity: 0.7, marginTop: '0.15rem' }}>비용·절차 무료 안내</span>
              </a>
            </div>
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

        {/* 실제 이용 후기 */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontWeight: '700', color: 'var(--navy)', fontSize: '1.1rem', marginBottom: '1rem' }}>실제 이용 후기</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {[
              { name: 'ㅈ○○', location: '경기 고양', text: '수목장에 대해 아무것도 몰라서 막막했는데, 가효상조 지도사님이 구역별 차이부터 비용까지 하나씩 설명해주셔서 안심하고 결정할 수 있었습니다. 든든한 동행 덕분에 장지까지 무사히 모셨습니다.', date: '2025년 4월' },
              { name: 'ㄴ○○', location: '서울 마포', text: '어머니 수목장을 미리 알아볼 때 연락했는데, 급하게 서두르지 않고 차분하게 안내해주셔서 좋았습니다. 나중에 실제로 진행할 때도 가효상조를 통했습니다.', date: '2025년 5월' },
              { name: 'ㅇ○○', location: '인천 남동', text: '혼자 시설에 연락하니 가격도 잘 모르고 어떻게 해야 할지 몰랐는데, 가효상조를 통하니 장례지도사가 직접 동행해 구역 선택부터 절차까지 전부 도와주셨습니다.', date: '2025년 6월' },
            ].map((review, i) => (
              <div key={i} style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderLeft: '4px solid #16a34a', borderRadius: '10px', padding: '1rem 1.25rem' }}>
                <p style={{ fontSize: '0.92rem', color: '#334155', lineHeight: 1.75, marginBottom: '0.5rem', fontStyle: 'italic' }}>"{review.text}"</p>
                <p style={{ fontSize: '0.82rem', color: '#4b5563', margin: 0 }}>⭐⭐⭐⭐⭐&nbsp;&nbsp;{review.name} · {review.location} · {review.date}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 사진 갤러리 */}
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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          {/* 기본 정보 */}
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

          {/* 상담 CTA */}
          <div>
            <h2 style={{ fontSize: '1.4rem', color: 'var(--navy)', marginBottom: '1rem', fontWeight: '700' }}>가효상조 상담</h2>
            <div style={{ background: 'linear-gradient(135deg, var(--navy-dark), var(--navy))', borderRadius: '12px', padding: '1.75rem', color: 'white', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📞</div>
              <div style={{ fontWeight: '700', fontSize: '1rem', marginBottom: '0.25rem', color: 'rgba(255,255,255,0.85)' }}>지금 바로 연결하세요. 24시간 무료 상담</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--gold)', marginBottom: '0.75rem' }}>1551-5718</div>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.92)', marginBottom: '1.25rem', lineHeight: 1.6, wordBreak: 'keep-all' }}>
                가효상조 맞춤 장지 컨설팅 지원<br/>장례지도사 현장 동행 무료
              </p>
              <a href="tel:1551-5718" style={{ display: 'block', background: '#22453A', color: 'white', textDecoration: 'none', padding: '0.9rem', borderRadius: '8px', fontWeight: '800', fontSize: '1rem' }}>
                지금 바로 전화하기
              </a>
              <Link href="/estimate" style={{ display: 'block', marginTop: '0.75rem', color: 'rgba(255,255,255,0.92)', textDecoration: 'none', fontSize: '0.85rem', padding: '0.6rem' }}>
                온라인 견적 받기 →
              </Link>
            </div>
          </div>
        </div>

        {/* 이용 비용 안내 */}
        <div style={{ marginBottom: '3rem' }}>
          {facility.priceRange && (
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '1.25rem 1.5rem', marginBottom: '1.25rem' }}>
              <div style={{ fontWeight: '700', fontSize: '0.88rem', color: '#166534', marginBottom: '0.5rem' }}>📋 이용 비용 요약</div>
              <div style={{ fontWeight: '800', fontSize: '1.05rem', color: '#166534', marginBottom: '0.5rem' }}>
                예상 비용: {facility.priceRange}{' '}
                <span style={{ fontSize: '0.82rem', fontWeight: '500', color: '#64748b' }}>(관리비 별도)</span>
              </div>
              <p style={{ margin: '0 0 0.875rem', fontSize: '0.88rem', color: '#475569', wordBreak: 'keep-all' }}>
                구역이 너무 많아서 고르기 어려우신가요?<br />예산과 상황을 말씀해 주시면 적합한 구역을 바로 추천해 드립니다.
              </p>
              <a href="tel:1551-5718" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.55rem 1.1rem', background: '#166534', color: 'white', borderRadius: '6px', fontWeight: '700', fontSize: '0.88rem', textDecoration: 'none' }}>
                📞 1551-5718 · 지금 무료 상담
              </a>
            </div>
          )}
          <h2 style={{ fontSize: '1.4rem', color: 'var(--navy)', marginBottom: '1rem', fontWeight: '700' }}>이용 비용 안내</h2>
          <div style={{ padding: '1.5rem', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px' }}>
            <p style={{ margin: '0 0 0.5rem', fontWeight: '700', color: '#166534', fontSize: '1.05rem' }}>
              예상 비용: {facility.priceRange}
            </p>
            <p style={{ margin: '0 0 1.25rem', fontSize: '0.9rem', color: '#16a34a' }}>
              * 정확한 이용 비용은 구역과 형태에 따라 다릅니다. 가효상조 고객에게는 별도 할인 혜택이 적용됩니다.
            </p>
            <a href="tel:1551-5718" style={{ display: 'block', textAlign: 'center', background: '#166534', color: 'white', textDecoration: 'none', padding: '1rem', borderRadius: '8px', fontWeight: '700', fontSize: '1.1rem' }}>
              전화로 실시간 비용 문의하기 (1551-5718)
            </a>
          </div>
        </div>

        {/* FAQ */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.4rem', color: 'var(--navy)', marginBottom: '1.5rem', fontWeight: '700' }}>{facility.name} 자주 묻는 질문</h2>
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
        </div>

        {/* 하단 CTA */}
        <section style={{ background: 'linear-gradient(135deg, #1a3d2a, #2d6a4f)', borderRadius: '16px', padding: '2.5rem 2rem', textAlign: 'center', color: 'white' }}>
          <h2 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', fontWeight: '800', marginBottom: '0.75rem', wordBreak: 'keep-all' }}>
            {facility.name}, 오늘 바로 예약할 수 있습니다.
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
            <a href="tel:1551-5718" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.9rem 2rem', background: 'white', color: 'var(--navy)', borderRadius: '12px', fontWeight: '800', fontSize: '1rem', textDecoration: 'none' }}>
              📞 1551-5718 · 24시간 전화 가능
            </a>
            <a href="https://open.kakao.com/o/s6oRdRhg" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.9rem 2rem', background: '#FEE500', color: '#000', borderRadius: '12px', fontWeight: '800', fontSize: '1rem', textDecoration: 'none' }}>
              💬 카카오로 편하게 문의하기
            </a>
          </div>
        </section>
      </div>
  </>
  );
}