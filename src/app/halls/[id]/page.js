import Link from 'next/link';
import Image from 'next/image';
import { notFound, permanentRedirect } from 'next/navigation';
import funeralHalls from '@/lib/realData.json';
import { regions } from '@/lib/mockDb';
import { getSlug } from '@/lib/utils';
import HallStickyBar from '@/components/HallStickyBar';

function findHall(decodedSlug) {
  let hall = funeralHalls.find((h) => getSlug(h.address, h.name) === decodedSlug);
  if (hall) return { hall, isLegacy: false };

  let legacyHall = funeralHalls.find((h) => h.id === decodedSlug);
  if (!legacyHall) {
    legacyHall = funeralHalls.find((h) => {
      if (!h.address) return false;
      const addrSlug = h.address.replace(/\s+/g, '-');
      return addrSlug === decodedSlug || h.address === decodedSlug || h.address.includes(decodedSlug.replace(/-/g, ' '));
    });
  }
  if (!legacyHall) {
    const slugNamePart = decodedSlug.split('-').slice(1).join('-');
    if (slugNamePart) {
      legacyHall = funeralHalls.find((h) =>
        h.name.replace(/[\s/\\_]+/g, '') === slugNamePart ||
        h.name.includes(slugNamePart.replace(/-/g, ''))
      );
    }
  }
  return legacyHall ? { hall: legacyHall, isLegacy: true } : { hall: null, isLegacy: false };
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  let decodedSlug = id;
  try { decodedSlug = decodeURIComponent(id); } catch (e) { return { title: '장례식장을 찾을 수 없습니다' }; }

  const { hall } = findHall(decodedSlug);
  if (!hall) return { title: '장례식장을 찾을 수 없습니다' };

  const addressParts = hall.address ? hall.address.split(' ') : [];
  const sido = addressParts[0] || '';
  const sigungu = addressParts[1] || '';

  return {
    title: `${hall.name} 상조 | 후불제 · 필요한 것만 — 가효상조`,
    description: `${hall.name} 장례를 후불제 상조로 준비하세요. 가효상조 전담 장례지도사가 빈소 수배부터 화장장 예약까지 대행하며, 필요한 품목만 직접 구성해 사용한 만큼만 정산합니다. 카카오톡 또는 1551-5718로 무료 상담.`,
    keywords: [
      `${hall.name} 상조`, `${hall.name} 장례`, `${sigungu} 장례식장 상조`, `${sido} 후불제 상조`,
      '후불제상조', '상조회사 추천', '장례 비용', '장례 준비', '가효상조',
    ],
    openGraph: {
      title: `${hall.name} 상조 | 가효상조`,
      description: `${hall.name} 후불제 상조. 필요한 품목만 골라 목돈 없이. 카카오톡 무료 상담.`,
    },
    alternates: {
      canonical: `/halls/${encodeURIComponent(getSlug(hall.address, hall.name))}`,
    },
  };
}

export default async function HallDetailPage({ params }) {
  const { id } = await params;
  let decodedSlug = id;
  try { decodedSlug = decodeURIComponent(id); } catch (e) { notFound(); }

  const { hall, isLegacy } = findHall(decodedSlug);
  if (!hall) notFound();
  if (isLegacy) {
    permanentRedirect(`/halls/${encodeURIComponent(getSlug(hall.address, hall.name))}`);
  }

  const regionLabel = regions.find((r) => r.code === hall.regionCode)?.label || '기타';
  const { facilityInfo, pricingData, photos } = hall;

  const addressParts = hall.address ? hall.address.split(' ') : [];
  const sido = addressParts[0] || '';
  const sigungu = addressParts[1] || '';

  const parkingInfo = facilityInfo.parkingInfo || null;
  const trafficInfo = facilityInfo.parkingAccess || null;
  const hallCount = facilityInfo.hallCount || null;
  const hasPricing = facilityInfo.pricingEnabled && pricingData && pricingData.length > 0;

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      'name': hall.name,
      '@id': `https://gahyo.co.kr/halls/${encodeURIComponent(getSlug(hall.address, hall.name))}`,
      'url': `https://gahyo.co.kr/halls/${encodeURIComponent(getSlug(hall.address, hall.name))}`,
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': hall.address,
        'addressLocality': sigungu,
        'addressRegion': sido,
        'addressCountry': 'KR',
      },
      'description': `${hall.name} 장례식장 — 가효상조 후불제 상조 서비스 안내`,
      ...(photos.length > 0 && { 'image': `https://gahyo.co.kr${photos[0]}` }),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      'headline': `${hall.name} 상조 — 후불제로 필요한 것만`,
      'description': `${hall.name} 장례를 가효상조 후불제 상조로 준비하는 방법`,
      'author': { '@type': 'Organization', 'name': '가효상조', 'url': 'https://gahyo.co.kr' },
      'datePublished': '2025-01-01',
      'publisher': {
        '@type': 'Organization',
        'name': '가효상조',
        'logo': { '@type': 'ImageObject', 'url': 'https://gahyo.co.kr/logo.png' },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': '지금 목돈이 없어도 장례를 진행할 수 있나요?',
          'acceptedAnswer': { '@type': 'Answer', 'text': '네. 가효상조는 100% 후불제로, 장례를 먼저 치르고 이후에 정산합니다. 지금 목돈을 마련하지 않으셔도 됩니다.' },
        },
        {
          '@type': 'Question',
          'name': `${hall.name}에서 새벽에 임종해도 빈소 예약이 가능한가요?`,
          'acceptedAnswer': { '@type': 'Answer', 'text': `네. 가효상조는 24시간 연중무휴로 운영됩니다. 즉시 앰뷸런스를 배차하고 ${hall.name}의 실시간 빈소 현황을 파악해 예약을 대행합니다.` },
        },
        {
          '@type': 'Question',
          'name': '비싼 상조 패키지를 꼭 계약해야 하나요?',
          'acceptedAnswer': { '@type': 'Answer', 'text': '아닙니다. 필요한 품목만 직접 구성하실 수 있으며, 사용한 항목만 청구됩니다.' },
        },
      ],
    },
  ];

  const trustItems = [
    { icon: '🎓', text: '국가공인 장례지도사가 처음부터 끝까지 직접 진행' },
    { icon: '🚫', text: '강매·노잣돈·수고비 요구 원칙적 금지' },
    { icon: '🕐', text: '24시간 연중무휴 — 새벽 임종도 즉시 대응' },
    { icon: '📋', text: '사업자등록번호 733-32-01721' },
  ];

  const faqs = [
    { q: '지금 목돈이 없어도 되나요?', a: '네. 가효상조는 후불제로, 장례를 먼저 치르고 이후에 정산합니다. 지금 목돈을 마련하지 않으셔도 됩니다.' },
    { q: '비싼 패키지를 꼭 계약해야 하나요?', a: '아닙니다. 정해진 패키지 강요 없이 필요한 품목만 직접 골라 구성하실 수 있습니다. 쓰지 않을 품목에 비용을 내실 필요가 없습니다.' },
    { q: '장례용품을 강매당할까 걱정됩니다.', a: '가효상조는 용품 강매, 노잣돈·수고비 요구 같은 관행을 원칙적으로 금지합니다. 사용한 품목만 청구됩니다.' },
    { q: '새벽에 임종하셔도 예약이 되나요?', a: `24시간 연중무휴로 운영됩니다. 즉시 앰뷸런스를 배차하고 ${hall.name}의 실시간 빈소 현황을 파악해 예약을 대행합니다.` },
    { q: '어느 장례식장을 써도 되나요?', a: `가효상조는 ${hall.name}을 포함한 전국 500개 이상 제휴 장례식장 어디서든 동일하게 서비스를 제공합니다.` },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* 빵부스러기 */}
      <div style={{ background: 'var(--gray-bg)', borderBottom: '1px solid var(--border-color)', padding: '0.875rem 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          <Link href="/">홈</Link> <span>›</span>
          <Link href="/halls">장례식장 찾기</Link> <span>›</span>
          {sido && <><span>{sido}</span> <span>›</span></>}
          <span style={{ color: 'var(--navy)', fontWeight: '600' }}>{hall.name}</span>
        </div>
      </div>

      <HallStickyBar hallName={hall.name} subtitle="후불제 상조 안내" />

      <div className="container" style={{ padding: '2.5rem 1.25rem 5rem', maxWidth: '840px' }}>

        {/* ① 히어로 */}
        <header style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span className="badge badge-navy">{regionLabel}</span>
            {(hall.features || []).map((f) => (
              <span key={f} className="badge" style={{ background: 'var(--gold-light)', color: 'var(--gold-dark)' }}>{f}</span>
            ))}
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <Link href="/halls" style={{ color: 'var(--navy)', textDecoration: 'none', fontSize: '0.875rem' }}>← 장례식장 목록으로</Link>
          </div>
          <p style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
            {hall.name} · 후불제 상조 안내
          </p>
          <h1 style={{ fontSize: 'clamp(1.6rem, 5vw, 2.25rem)', fontWeight: '800', color: 'var(--navy)', marginBottom: '1.25rem', letterSpacing: '-0.02em', lineHeight: 1.35 }}>
            {hall.name} 상조,<br />필요한 것만 골라 목돈 없이
          </h1>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#334155', marginBottom: '1.75rem' }}>
            갑작스러운 이별 앞에서 무엇부터 해야 할지 막막하실 겁니다.
            {' '}<strong>{hall.name}</strong>에서의 빈소·차량·용품·인력을 가효상조 전담 장례지도사가 대신 준비하되,
            남이 정해준 패키지가 아니라 <strong>우리 가족에게 꼭 필요한 품목만 직접 고르실 수 있습니다.</strong>{' '}
            후불제라 지금 목돈을 마련하지 않으셔도 됩니다.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <a href="https://pf.kakao.com/_ntRdX/chat" target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.625rem', padding: '1.1rem 1.5rem', background: '#FEE500', color: '#000', fontWeight: '800', fontSize: '1.1rem', borderRadius: '12px', textDecoration: 'none', boxShadow: '0 4px 16px rgba(254,229,0,0.4)' }}>
              💬 카카오톡으로 빈소 현황·예상 비용 받기
            </a>
            <a href="tel:1551-5718"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.9rem 1.5rem', background: 'white', color: 'var(--navy)', fontWeight: '700', fontSize: '1rem', borderRadius: '12px', textDecoration: 'none', border: '2px solid var(--navy)' }}>
              📞 24시간 상담 1551-5718
            </a>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {['후불제', '사용한 품목만 정산', '강매 없음', '연중무휴 24시간'].map((badge) => (
              <span key={badge} style={{ padding: '0.3rem 0.875rem', background: '#f0f4f8', color: '#334155', borderRadius: '999px', fontSize: '0.82rem', fontWeight: '600', border: '1px solid #cbd5e1' }}>{badge}</span>
            ))}
          </div>
        </header>

        {/* ② 가효상조 소개 */}
        <section style={{ marginBottom: '3rem', padding: '1.75rem', background: '#f0f4f8', borderRadius: '12px', borderLeft: '4px solid var(--navy)' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '0.875rem' }}>가효상조는 어떤 회사인가요?</h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#334155', margin: 0 }}>
            가효상조는 <strong>{hall.name}</strong>을 비롯한 전국 장례식장을 유가족 대신 섭외하고, 장례 전 과정을 후불제로 대행하는 상조 서비스입니다.{' '}
            <strong>장례식장과는 별개의 상조 전문 회사</strong>이며, 어느 장례식장을 이용하시든 동일하게 도와드립니다.
          </p>
        </section>

        {/* ③ 직접 vs 가효상조 비교 */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontWeight: '800', color: 'var(--navy)', fontSize: '1.35rem', marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: '2px solid var(--gold)' }}>
            {hall.name}에 직접 연락하는 것과 무엇이 다른가요?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ padding: '1.5rem', background: '#fef2f2', borderRadius: '12px', border: '1px solid #fecaca' }}>
              <p style={{ fontWeight: '800', color: '#c0392b', marginBottom: '1rem', fontSize: '0.95rem' }}>직접 진행하시면</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {['빈소·화장장·차량·용품·인력을 경황없는 중에 각각 알아보고 즉석에서 결정', '항목마다 강매·추가금 부담', '대개 선불 — 짧은 시간에 목돈 필요'].map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.9rem', color: '#7f1d1d', lineHeight: 1.6 }}><span style={{ flexShrink: 0 }}>✗</span> {item}</li>
                ))}
              </ul>
            </div>
            <div style={{ padding: '1.5rem', background: '#f0fdf4', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
              <p style={{ fontWeight: '800', color: '#15803d', marginBottom: '1rem', fontSize: '0.95rem' }}>가효상조를 통하시면</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {['전화 한 통이면 전담 지도사가 위 전부를 대신 진행', '필요한 품목만 직접 구성 — 불필요한 항목 없음', '후불제 — 장례를 먼저 치르고 이후 정산', '사용한 품목만 청구, 강매·노잣돈 요구 차단'].map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.9rem', color: '#14532d', lineHeight: 1.6 }}><span style={{ flexShrink: 0 }}>✓</span> {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ③-b 직접 구성하기 */}
        <section style={{ marginBottom: '3rem', padding: '1.75rem', background: 'linear-gradient(135deg, var(--navy) 0%, #003a7a 100%)', borderRadius: '16px', color: 'white', textAlign: 'center' }}>
          <p style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '0.625rem' }}>비싼 패키지, 이제 그만.</p>
          <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            빈소·상복·차량·도우미·수의·납골함까지, 우리 가족에게 필요한 것만 고르면<br />
            <strong style={{ color: 'var(--gold)' }}>합계가 실시간으로 표시됩니다.</strong>{' '}상담 없이 지금 직접 확인해 보세요.
          </p>
          <Link href="/custom-package" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.9rem 2rem', background: 'var(--gold)', color: '#0f172a', fontWeight: '800', fontSize: '1rem', borderRadius: '999px', textDecoration: 'none' }}>
            내게 맞는 상조 직접 구성하기 →
          </Link>
        </section>

        {/* ④ 상조 반론 FAQ */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontWeight: '800', color: 'var(--navy)', fontSize: '1.35rem', marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: '2px solid var(--gold)' }}>자주 묻는 질문</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqs.map((faq, i) => (
              <article key={i} style={{ background: 'white', padding: '1.375rem 1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '800', color: '#1e293b', marginBottom: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                  <span style={{ color: '#c0392b', flexShrink: 0 }}>Q.</span> {faq.q}
                </h3>
                <p style={{ color: '#475569', fontSize: '0.93rem', lineHeight: 1.7, paddingLeft: '1.75rem', margin: 0 }}>
                  <strong style={{ color: 'var(--gold-dark)', marginRight: '0.3rem' }}>A.</strong>{faq.a}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* ⑤ 장례식장 이용 안내 */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontWeight: '800', color: 'var(--navy)', fontSize: '1.35rem', marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: '2px solid var(--gold)' }}>
            {hall.name}은 이런 곳입니다
          </h2>
          {photos && photos.length > 0 && (
            <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem', scrollSnapType: 'x mandatory' }}>
              {photos.map((photoUrl, idx) => (
                <div key={idx} style={{ minWidth: '300px', height: '200px', position: 'relative', borderRadius: '10px', overflow: 'hidden', scrollSnapAlign: 'start', flexShrink: 0 }}>
                  <Image src={photoUrl} alt={`${hall.name} 장례식장 ${idx === 0 ? '외관 전경' : '내부 시설'} 사진 ${idx + 1}`} fill unoptimized={true} style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 300px" priority={idx === 0} />
                </div>
              ))}
            </div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', padding: '1.5rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '1.1rem', flexShrink: 0, marginTop: '0.1rem' }}>📍</span>
              <div>
                <span style={{ fontWeight: '700', color: 'var(--navy)', fontSize: '0.9rem' }}>위치</span>
                <p style={{ color: '#334155', fontSize: '0.93rem', margin: '0.2rem 0 0' }}>{hall.address}</p>
              </div>
            </div>
            {trafficInfo && (
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.1rem', flexShrink: 0, marginTop: '0.1rem' }}>🚌</span>
                <div>
                  <span style={{ fontWeight: '700', color: 'var(--navy)', fontSize: '0.9rem' }}>교통</span>
                  <p style={{ color: '#334155', fontSize: '0.93rem', margin: '0.2rem 0 0' }}>{trafficInfo}</p>
                </div>
              </div>
            )}
            {parkingInfo && (
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.1rem', flexShrink: 0, marginTop: '0.1rem' }}>🚗</span>
                <div>
                  <span style={{ fontWeight: '700', color: 'var(--navy)', fontSize: '0.9rem' }}>주차</span>
                  <p style={{ color: '#334155', fontSize: '0.93rem', margin: '0.2rem 0 0' }}>{parkingInfo}</p>
                </div>
              </div>
            )}
            {hallCount && (
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.1rem', flexShrink: 0, marginTop: '0.1rem' }}>🏠</span>
                <div>
                  <span style={{ fontWeight: '700', color: 'var(--navy)', fontSize: '0.9rem' }}>빈소</span>
                  <p style={{ color: '#334155', fontSize: '0.93rem', margin: '0.2rem 0 0' }}>규모·예산에 맞는 {hallCount}개 빈소 안내</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ⑥ 요금 안내 */}
        {hasPricing && (
          <section style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontWeight: '800', color: 'var(--navy)', fontSize: '1.35rem', marginBottom: '0.75rem', paddingBottom: '0.5rem', borderBottom: '2px solid var(--gold)' }}>
              {hall.name} 시설 이용료 안내
            </h2>
            <p style={{ fontSize: '0.93rem', color: '#475569', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              아래는 <strong>{hall.name}의 공개 시설 이용료</strong>입니다. 여기에 장례용품·인력·차량 등 상조 서비스가 더해지며, 가효상조가 이 전체를 후불제로 통합해 상담 시 정확한 견적을 안내해 드립니다. <strong>실제 사용한 항목만 청구됩니다.</strong>
            </p>
            <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 2fr 1fr', padding: '0.875rem 1rem', background: 'var(--navy)', color: 'white', fontWeight: '700', fontSize: '0.875rem' }}>
                <span>구분</span><span>상세 항목</span><span style={{ textAlign: 'right' }}>금액</span>
              </div>
              <div style={{ maxHeight: '380px', overflowY: 'auto', background: '#fff' }}>
                {pricingData.map((row, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.5fr 2fr 1fr', padding: '0.875rem 1rem', borderBottom: '1px solid #f1f5f9', background: i % 2 === 0 ? '#fff' : '#f8fafc', alignItems: 'center' }}>
                    <span style={{ color: 'var(--navy)', fontWeight: '600', fontSize: '0.875rem' }}>{row.itemType}</span>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ color: '#334155', fontSize: '0.9rem' }}>{row.itemName}</span>
                      {row.detail && <span style={{ color: '#94a3b8', fontSize: '0.78rem', marginTop: '0.15rem' }}>{row.detail}</span>}
                    </div>
                    <span style={{ fontWeight: '800', color: '#c0392b', fontSize: '0.9rem', textAlign: 'right' }}>{Number(row.price).toLocaleString()}원</span>
                  </div>
                ))}
              </div>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: '0.625rem', lineHeight: 1.6 }}>
              위 금액은 장례식장 자체 요금이며 선택에 따라 달라집니다. 상조 통합 견적은{' '}
              <a href="https://pf.kakao.com/_ntRdX/chat" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--navy)', fontWeight: '600' }}>카카오톡 무료 상담</a>
              {' '}또는{' '}
              <Link href="/custom-package" style={{ color: 'var(--navy)', fontWeight: '600' }}>직접 구성하기</Link>로 확인하세요.
            </p>
          </section>
        )}

        {/* ⑦ 신뢰·보증 */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontWeight: '800', color: 'var(--navy)', fontSize: '1.35rem', marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: '2px solid var(--gold)' }}>
            가효상조를 믿을 수 있는 이유
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
            <img src="/images/banners/strength1.jpg" alt="가효상조 후불제 상조 서비스 강점" style={{ width: '100%', height: 'auto', borderRadius: '12px' }} />
            <img src="/images/banners/strength2.jpg" alt="가효상조 100% 후불제, 사용한 만큼만 정산" style={{ width: '100%', height: 'auto', borderRadius: '12px' }} />
          </div>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: 0, margin: 0, listStyle: 'none' }}>
            {trustItems.map((item, i) => (
              <li key={i} style={{ display: 'flex', gap: '0.875rem', alignItems: 'flex-start', padding: '1rem 1.25rem', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>{item.icon}</span>
                <span style={{ color: '#334155', fontSize: '0.93rem', lineHeight: 1.6, fontWeight: '600' }}>{item.text}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ⑧ 최종 CTA — 상황 분기 */}
        <section style={{ padding: '2.5rem 1.75rem', background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', color: 'white', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: '800', marginBottom: '1.75rem', textAlign: 'center' }}>지금 상황에 맞게 도와드리겠습니다</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
            {[
              { icon: '🚨', title: '지금 임종하셨거나 임박하셨다면', link: 'tel:1551-5718', linkText: '→ 24시간 1551-5718 (즉시 배차·빈소 수배)', linkStyle: { color: 'var(--gold)' } },
              { icon: '📋', title: '미리 알아보고 계신다면', link: 'https://pf.kakao.com/_ntRdX/chat', linkText: '→ 카카오톡으로 예상 비용·절차 안내받기', linkStyle: { color: '#FEE500' }, external: true },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '1rem 1.25rem', background: 'rgba(255,255,255,0.07)', borderRadius: '10px' }}>
                <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <p style={{ fontWeight: '800', color: 'white', marginBottom: '0.3rem', fontSize: '0.95rem' }}>{item.title}</p>
                  <a href={item.link} {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} style={{ fontWeight: '700', fontSize: '0.93rem', textDecoration: 'none', ...item.linkStyle }}>{item.linkText}</a>
                </div>
              </div>
            ))}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '1rem 1.25rem', background: 'rgba(255,255,255,0.07)', borderRadius: '10px' }}>
              <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>🔍</span>
              <div>
                <p style={{ fontWeight: '800', color: 'white', marginBottom: '0.3rem', fontSize: '0.95rem' }}>혼자 먼저 따져보고 싶다면</p>
                <Link href="/custom-package" style={{ color: '#93c5fd', fontWeight: '700', fontSize: '0.93rem', textDecoration: 'none' }}>→ 상조 직접 구성하기 (실시간 합계 확인)</Link>
              </div>
            </div>
          </div>
          <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', marginBottom: '1.75rem' }}>상담만으로는 어떤 비용도 발생하지 않습니다.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '380px', margin: '0 auto' }}>
            <a href="https://pf.kakao.com/_ntRdX/chat" target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '1.1rem', background: '#FEE500', color: '#000', fontWeight: '800', fontSize: '1.05rem', borderRadius: '10px', textDecoration: 'none' }}>
              💬 카카오톡 상담 (주)
            </a>
            <a href="tel:1551-5718"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.9rem', background: 'rgba(255,255,255,0.12)', color: 'white', fontWeight: '700', fontSize: '0.95rem', borderRadius: '10px', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.25)' }}>
              📞 전화 상담 1551-5718
            </a>
            <Link href="/custom-package"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.75rem', color: 'rgba(255,255,255,0.6)', fontWeight: '600', fontSize: '0.875rem', textDecoration: 'none', textAlign: 'center' }}>
              AI 견적·직접 구성하기 →
            </Link>
          </div>
        </section>

        <div style={{ paddingTop: '0.5rem', paddingBottom: '2rem' }}>
          <Link href="/halls" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', color: 'var(--navy)', fontWeight: '600', fontSize: '0.9rem' }}>
            ← 장례식장 목록으로 돌아가기
          </Link>
        </div>
      </div>
    </>
  );
}
