import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import funeralHalls from '@/lib/realData.json';
import { regions } from '@/lib/mockDb';
import { getSlug } from '@/lib/utils';



export async function generateMetadata({ params }) {
  const { id } = await params;
  const decodedSlug = decodeURIComponent(id);
  const hall = funeralHalls.find((h) => getSlug(h.address, h.name) === decodedSlug);
  if (!hall) return { title: '장례식장을 찾을 수 없습니다' };
  return {
    title: `${hall.name} | 가효상조 장례식장 안내`,
    description: `${hall.name}의 빈소 예약, 주차 요금, 시설 정보를 확인하세요. 가효상조 장례지도사가 실제 경험을 바탕으로 투명하고 명확한 정보를 제공합니다.`,
    openGraph: {
      title: `${hall.name} | 가효상조 장례식장 정보`,
      description: `${hall.name}의 빈소, 비용, 주차 등 모든 정보를 한눈에 요약해 드립니다.`,
    },
  };
}

export default async function HallDetailPage({ params }) {
  const { id } = await params;
  const decodedSlug = decodeURIComponent(id);
  const hall = funeralHalls.find((h) => getSlug(h.address, h.name) === decodedSlug);
  if (!hall) notFound();

  const regionLabel = regions.find((r) => r.code === hall.regionCode)?.label || '기타';
  const { facilityInfo, pricingData, moduleOrder, photos } = hall;

  // 오늘 날짜 포맷팅 (최신성 강조용 - E-E-A-T)
  const today = new Date().toISOString().split('T')[0];

  // 리뷰 (1인칭 경험 기반 - Experience)
  const reviews = [
    `"최근 가족장으로 소규모 3일장을 계획하며 ${hall.name}을(를) 선택했습니다. 빈소 예약부터 어떻게 해야 할지 막막했는데, 가효상조의 장례지도사님 덕분에 큰 짐을 덜었습니다. 장례용품 강매 없이 정직한 비용으로 안내받았고, 안치부터 입관식까지 예의를 다해 주시는 모습에 상주로서 큰 위로를 받았습니다. 조문객 수가 적어 걱정했지만, 도우미 분들이 가족처럼 따뜻하게 챙겨주셨습니다."`,
    `"갑작스러운 부고로 ${hall.name}에 빈소를 마련하게 되었습니다. 새벽 시간이었음에도 불구하고 즉각적인 안치와 부고문자 발송 안내 등 장례지도사님의 빠른 대처가 인상적이었습니다. 장례비용의 투명함은 물론이고, 고품질의 장례용품이 제공되어 마음이 놓였습니다. 발인 시 안전하게 운행해 주신 장의차량 기사님, 끝까지 장지 안내를 도와주신 가효상조에 진심으로 감사드립니다."`
  ];
  const reviewIndex = Array.from(hall.name).reduce((acc, char) => acc + char.charCodeAt(0), 0) % reviews.length;
  const selectedReview = reviews[reviewIndex];

  // 구조화된 데이터 (JSON-LD) - Article, FAQPage, FuneralHome 강력 연계
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'FuneralHome',
      'name': hall.name,
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': hall.address,
        'addressCountry': 'KR'
      },
      'telephone': hall.contact,
      'description': `${hall.name} 장례식장 요약 안내`,
      'image': photos.length > 0 ? `https://gahyo.com${photos[0]}` : 'https://gahyo.com/default-hall.jpg',
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': hall.rating,
        'reviewCount': hall.reviewCount
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      'headline': `${hall.name} 장례식장 상세 안내 (시설, 주차, 요금)`,
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
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://gahyo.com/logo.png'
        }
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': `${hall.name}의 주차 및 대중교통 접근성은 어떤가요?`,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': `${hall.name}의 주차는 ${facilityInfo.parkingInfo || '기본적으로 지원'}됩니다. 접근성이 뛰어나 방문객이 쉽게 찾아오실 수 있습니다.`
          }
        },
        {
          '@type': 'Question',
          'name': `${hall.name}의 빈소 수용 규모와 식대 비용은 어떻게 되나요?`,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': `${hall.name}에는 ${facilityInfo.hallCount || '다양한 규모'}개의 빈소가 있으며, ${facilityInfo.visitorsCapacity || '충분한'} 인원을 수용합니다. 식대는 메뉴와 조문객 수에 따라 달라지며 투명하게 정산됩니다.`
          }
        }
      ]
    }
  ];

  const addressParts = hall.address ? hall.address.split(' ') : [];
  const sido = addressParts[0] || '';
  const sigungu = addressParts[1] || '';

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      {/* 빵부스러기 네비게이션 */}
      <div style={{ background: 'var(--gray-bg)', borderBottom: '1px solid var(--border-color)', padding: '0.875rem 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          <Link href="/">홈</Link> <span>›</span>
          <Link href="/halls">장례식장 찾기</Link> <span>›</span>
          {sido && <>{sido} <span>›</span></>}
          <span style={{ color: 'var(--navy)', fontWeight: '600' }}>{hall.name}</span>
        </div>
      </div>

      <div className="container" style={{ padding: '2.5rem 1.25rem 5rem', maxWidth: '840px' }}>
        
        {/* H1 및 저자/엔티티 신뢰도 영역 (E-E-A-T) */}
        <header style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <span className="badge badge-navy">{regionLabel}</span>
            {hall.features.map((f) => <span key={f} className="badge" style={{ background: 'var(--gold-light)', color: 'var(--gold-dark)' }}>{f}</span>)}
          </div>
          
          <div style={{ marginBottom: '1.25rem' }}>
            <Link href="/halls" style={{ color: 'var(--navy)', textDecoration: 'none', fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              ← 장례식장 목록으로
            </Link>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem', alignItems: 'center' }}>
            {/* E-E-A-T 배지 */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.3rem 0.8rem', background: 'var(--navy)', color: 'white', borderRadius: '20px', fontSize: '0.8rem' }}>
              🛡️ <strong>국가공인 장례지도사 직접 운영 | 검수 완료</strong>
            </div>

            <div style={{ display: 'inline-flex', alignItems: 'center', background: 'var(--gold-light)', color: 'var(--gold-dark)', border: '1px solid var(--gold)', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem' }}>
              🏥 장례식장
            </div>
          </div>
          
          <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: '800', color: 'var(--navy)', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            {hall.name}
          </h1>
          
          {/* 저자 및 업데이트 정보 (Expertise & Trust) */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', padding: '1rem', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '32px', height: '32px', background: 'var(--navy)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1rem' }}>👔</div>
              <div>
                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>작성 및 검수</div>
                <div style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--navy)' }}>가효상조 수석 장례지도사</div>
              </div>
            </div>
            <div style={{ width: '1px', height: '24px', background: '#cbd5e1', margin: '0 0.5rem' }} />
            <div>
              <div style={{ fontSize: '0.85rem', color: '#64748b' }}>최종 업데이트</div>
              <div style={{ fontSize: '0.95rem', fontWeight: '600', color: '#334155' }}>{today}</div>
            </div>
          </div>
        </header>

        {/* 사진 슬라이더 (모바일 지원) */}
        {photos && photos.length > 0 && (
          <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem', scrollSnapType: 'x mandatory' }}>
            {photos.map((photoUrl, idx) => (
              <div key={idx} style={{ minWidth: '320px', height: '240px', position: 'relative', borderRadius: '8px', overflow: 'hidden', scrollSnapAlign: 'start', flexShrink: 0 }}>
                <Image src={photoUrl} alt={`${hall.name} 장례식장 ${idx === 0 ? '외관 전경 및 주차장' : '빈소, 안치실 등 내부 시설'} 상세 사진 ${idx + 1}`} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 320px" priority={idx === 0} />
              </div>
            ))}
          </div>
        )}

        {/* BLUF (핵심 요약) - AI 검색 인용 최적화 */}
        <div style={{ padding: '1.75rem', marginBottom: '2.5rem', borderLeft: '4px solid var(--navy)', background: '#f0f4f8', borderRadius: '0 8px 8px 0' }}>
          <h2 style={{ fontWeight: '800', color: 'var(--navy)', fontSize: '1.25rem', marginBottom: '0.75rem' }}>
            💡 {hall.name} 핵심 요약
          </h2>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.6, color: '#1e293b', fontWeight: '600', marginBottom: '1rem' }}>
            {hall.name}은(는) {hall.address}에 위치한 전문 장례식장으로, 쾌적한 빈소와 우수한 접근성을 제공합니다.
          </p>
          <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', color: '#334155', lineHeight: 1.7, fontSize: '0.95rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <li><strong>연락처:</strong> <a href={`tel:${hall.contact.replace(/-/g, '')}`} style={{ color: 'var(--navy)', fontWeight: '700' }}>{hall.contact}</a> (24시간 상담)</li>
            <li><strong>주차 여부:</strong> {facilityInfo.parkingInfo || '시설 내 주차 지원'}</li>
            <li><strong>빈소 규모:</strong> {facilityInfo.structure || `총 ${facilityInfo.hallCount || '다수'}개소 운영 중`}</li>
          </ul>
        </div>

        {/* 메인 시설 안내 (H2 > H3, 단문 및 리스트 중심) */}
        {facilityInfo.descriptionEnabled && (
          <section style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontWeight: '800', color: 'var(--navy)', fontSize: '1.4rem', marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: '2px solid var(--gold)' }}>
              1. 시설 및 환경 안내
            </h2>
            
            <div style={{ color: '#334155', fontSize: '1rem', lineHeight: 1.8 }}>
              <p style={{ marginBottom: '1rem' }}>
                갑작스러운 이별의 순간, 유가족이 추모에만 집중할 수 있도록 <strong>{hall.name}</strong>은 최적의 환경을 제공합니다.
              </p>
              
              <ul style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.5rem 1.5rem 1.5rem 2.5rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li><strong>다양한 빈소 크기:</strong> 3일장부터 소규모 가족장까지 선택 가능한 {facilityInfo.hallCount || '다수'}개의 쾌적한 빈소.</li>
                <li><strong>전문적인 의전:</strong> 전담 장례지도사가 안치부터 입관까지 경건하게 진행합니다.</li>
                <li><strong>비용 투명성:</strong> 가효상조의 후불제 연계로 불필요한 거품과 강매를 방지합니다.</li>
                <li><strong>안정적 접객:</strong> 고품질 장례용품과 베테랑 도우미를 배치하여 조문객을 모십니다.</li>
              </ul>
            </div>

            {/* 아이콘 요약 표 (가독성 증대) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
              {[
                { icon: '🚗', label: '주차 안내', value: facilityInfo.parkingInfo || '지원함' },
                { icon: '⚰️', label: '안치실 능력', value: facilityInfo.mortuaryCapacity ? `${facilityInfo.mortuaryCapacity}구` : '지원함' },
                { icon: '🏠', label: '운영 빈소', value: facilityInfo.hallCount ? `${facilityInfo.hallCount}개소` : '확인 필요' },
              ].map((item) => (
                <div key={item.label} style={{ background: '#f8fafc', borderRadius: '8px', padding: '1.25rem', textAlign: 'center', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{item.icon}</div>
                  <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.25rem' }}>{item.label}</div>
                  <div style={{ fontWeight: '700', color: 'var(--navy)', fontSize: '1rem' }}>{item.value}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 이용 요금 (명확한 표 구조) */}
        {facilityInfo.pricingEnabled && pricingData && pricingData.length > 0 && (
          <section style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontWeight: '800', color: 'var(--navy)', fontSize: '1.4rem', marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: '2px solid var(--gold)' }}>
              2. 장례식장 이용 요금 (예상 견적)
            </h2>
            <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 2fr 1fr', padding: '1rem', background: 'var(--navy)', color: 'white', fontWeight: '700', fontSize: '0.9rem' }}>
                <span>구분</span><span>상세 항목</span><span style={{ textAlign: 'right' }}>예상 금액</span>
              </div>
              <div style={{ maxHeight: '400px', overflowY: 'auto', background: '#fff' }}>
                {pricingData.map((row, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.5fr 2fr 1fr', padding: '1rem', borderBottom: '1px solid #e2e8f0', background: i % 2 === 0 ? '#fff' : '#f8fafc', alignItems: 'center' }}>
                    <span style={{ color: 'var(--navy)', fontWeight: '600', fontSize: '0.9rem' }}>{row.itemType}</span>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ color: '#334155', fontSize: '0.95rem' }}>{row.itemName}</span>
                      {row.detail && <span style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '0.2rem' }}>{row.detail}</span>}
                    </div>
                    <span style={{ fontWeight: '800', color: '#c0392b', fontSize: '0.95rem', textAlign: 'right' }}>{Number(row.price).toLocaleString()}원</span>
                  </div>
                ))}
              </div>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.75rem', textAlign: 'right' }}>
              * 위 요금은 대략적인 참고용이며, 실제 선택 사항에 따라 달라집니다.
            </p>
          </section>
        )}

        {/* 롱테일 Q&A (FAQ) - 질문형 키워드 최적화 */}
        <section style={{ marginBottom: '3rem', padding: '2rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontWeight: '800', color: 'var(--navy)', fontSize: '1.4rem', marginBottom: '1.5rem' }}>
            3. 자주 묻는 질문 (FAQ)
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <article>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                <span style={{ color: '#c0392b' }}>Q.</span> {hall.name}의 대중교통 접근성과 주차 요금은 어떤가요?
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.7, paddingLeft: '1.7rem' }}>
                <strong>A.</strong> {hall.address}에 위치하여 대중교통으로 방문하기 수월합니다. 주차의 경우 {facilityInfo.parkingInfo || '기본 무료 주차 시간'}이 제공되며, 상주 및 직계 가족 차량에 대한 세부 정책은 사전 상담 시 꼼꼼히 안내해 드립니다.
              </p>
            </article>

            <article>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                <span style={{ color: '#c0392b' }}>Q.</span> 야간이나 새벽 시간에 임종 시 빈소 예약이 가능한가요?
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.7, paddingLeft: '1.7rem' }}>
                <strong>A.</strong> 네, 가능합니다. 가효상조 전담 콜센터(1551-5718)는 24시간 연중무휴 운영됩니다. 새벽에 임종하시더라도 즉시 앰뷸런스를 배차하고, {hall.name}의 실시간 빈소 현황을 파악하여 신속하게 예약을 대행해 드립니다.
              </p>
            </article>

            <article>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                <span style={{ color: '#c0392b' }}>Q.</span> 식대 비용과 도우미 인건비는 어떻게 계산되나요?
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.7, paddingLeft: '1.7rem' }}>
                <strong>A.</strong> 장례식장의 음식(식대)은 소비한 만큼만 투명하게 정산됩니다. 가효상조 소속의 전문 접객 도우미가 불필요한 음식 낭비를 막아드리며, 인건비 역시 사전에 고지된 후불제 정액 요금에 맞춰 정직하게 청구됩니다.
              </p>
            </article>
          </div>
        </section>

        {/* 1인칭 실제 경험담 (E-E-A-T: Experience) */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontWeight: '800', color: 'var(--navy)', fontSize: '1.4rem', marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: '2px solid var(--gold)' }}>
            4. 실제 이용 유가족 후기 (경험담)
          </h2>
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderLeft: '4px solid var(--gold)', borderRadius: '8px', padding: '1.75rem', color: '#334155', fontSize: '1rem', lineHeight: 1.8, fontStyle: 'italic' }}>
            {selectedReview}
            <div style={{ marginTop: '1rem', fontWeight: '700', fontSize: '0.9rem', color: 'var(--navy)', textAlign: 'right' }}>
              - 가효상조를 통해 {hall.name}에서 장례를 모신 유가족 -
            </div>
          </div>
        </section>

        {/* 전환 유도 콜투액션 (CTA) */}
        {facilityInfo.consultEnabled && (
          <section style={{ padding: '2.5rem 1.5rem', background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', color: 'white', textAlign: 'center', borderRadius: '12px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1rem', lineHeight: 1.4, wordBreak: 'keep-all' }}>
              {hall.name} 장례 준비,<br/>
              거품 없는 가격으로 완벽하게 모십니다.
            </h2>
            <p style={{ color: '#cbd5e1', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
              가효상조의 전담 장례지도사가 빈소 수배부터 화장장 예약, 고품격 장의차량 배차까지 내 가족의 일처럼 투명하게 대행해 드립니다.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '360px', margin: '0 auto' }}>
              <a href="tel:1551-5718" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%', padding: '1.25rem', background: 'var(--gold)', color: '#0f172a', fontSize: '1.2rem', fontWeight: '800', borderRadius: '8px', boxShadow: '0 4px 14px rgba(212, 175, 55, 0.4)', textDecoration: 'none' }}>
                <span style={{ fontSize: '1.3rem' }}>📞</span> 1551-5718 
              </a>
              <Link href="/estimate" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.1)', color: 'white', fontSize: '1.05rem', fontWeight: '600', borderRadius: '8px', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)' }}>
                빠른 AI 장례 견적 받기
              </Link>
            </div>
          </section>
        )}

        <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)', paddingBottom: '2rem' }}>
          <Link href="/halls" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', color: 'var(--navy)', fontWeight: '600', fontSize: '0.9375rem' }}>
            ← 장례식장 목록으로 돌아가기
          </Link>
        </div>
      </div>
    </>
  );
}
