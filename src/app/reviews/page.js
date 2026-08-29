import HallStickyBar from '@/components/HallStickyBar';

export const metadata = {
  title: '고객 후기 | 실제 이용 후기 모음',
  description: '가효상조를 이용한 실제 고객의 장례 후기입니다. 100% 후불제, 추가비용 없는 투명한 장례 서비스에 대한 진솔한 경험을 확인하세요.',
  alternates: {
    canonical: 'https://gahyo.co.kr/reviews',
  },
  openGraph: {
    title: '가효상조 고객 후기 | 실제 이용 후기 모음',
    description: '가효상조를 이용한 실제 고객의 장례 후기입니다. 100% 후불제, 추가비용 없는 투명한 장례 서비스에 대한 진솔한 경험을 확인하세요.',
    url: 'https://gahyo.co.kr/reviews',
    siteName: '후불제상조 가효상조',
    images: [{ url: 'https://gahyo.co.kr/og-image.png', width: 1200, height: 630 }],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '가효상조 고객 후기 | 실제 이용 후기 모음',
    description: '가효상조를 이용한 실제 고객의 장례 후기입니다. 100% 후불제, 추가비용 없는 투명한 장례 서비스에 대한 진솔한 경험을 확인하세요.',
    images: ['https://gahyo.co.kr/og-image.png'],
  },
};

const REVIEWS = [
  {
    id: 1,
    author: '김○○',
    location: '경기 시흥',
    date: '2026-05-12',
    rating: 5,
    title: '새벽 2시에도 즉시 연결, 처음부터 끝까지 함께해 주셨어요',
    body: '어머니께서 새벽에 갑자기 임종하셔서 당황한 상태로 전화를 드렸는데, 새벽 2시임에도 바로 연결이 됐습니다. 김도훈 지도사님이 직접 어떤 순서로 진행해야 하는지 차근차근 설명해 주셔서 정신을 차릴 수 있었습니다. 장례식장 섭외부터 발인까지 4일 동안 한 번도 당혹스러운 상황 없이 진행됐습니다. 100% 후불제라서 갑작스러운 상황에서도 현금 걱정 없이 장례를 치를 수 있어 정말 감사했습니다.',
    tags: ['24시간 상담', '후불제', '친절한 안내'],
  },
  {
    id: 2,
    author: '이○○',
    location: '서울 강서',
    date: '2026-04-03',
    rating: 5,
    title: '처음 받은 견적 그대로, 추가 청구 한 푼도 없었습니다',
    body: '아버지 장례를 처음 치러보는 터라 비용 청구가 가장 걱정이었습니다. 상담 초반에 예상 비용을 투명하게 안내해 주셨고, 최종 정산도 처음 말씀해 주신 금액 그대로였습니다. 장례 과정에서 추가 서비스를 권유받은 적이 없고, "이건 포함이에요, 저건 별도예요"를 미리 명확히 구분해 주셔서 신뢰가 생겼습니다. 가효상조를 소개해 준 지인에게 정말 고맙습니다.',
    tags: ['투명한 비용', '추가비용 없음', '신뢰'],
  },
  {
    id: 3,
    author: '박○○',
    location: '인천 남동',
    date: '2026-02-18',
    rating: 5,
    title: '장례 절차를 전혀 몰랐는데 처음부터 끝까지 안내받았습니다',
    body: '남편을 갑작스럽게 떠나보내 넋이 나간 상태였는데, 사망신고부터 화장 예약, 봉안당 선택까지 모든 절차를 하나하나 설명해 주셨습니다. 특히 유족 입장에서 어떤 서류가 언제 필요한지 미리 알려주셔서 허둥대지 않아도 됐습니다. 봉안당도 여러 곳을 비교해 주셔서 가격 대비 좋은 시설을 선택할 수 있었어요. 홀로 처리하기 힘들었을 일을 같이 해결해 주신 느낌이었습니다.',
    tags: ['절차 안내', '봉안당 연계', '든든한 지원'],
  },
  {
    id: 4,
    author: '최○○',
    location: '서울 송파',
    date: '2025-12-28',
    rating: 5,
    title: '연말 연휴에도 장례지도사님이 직접 와 주셨습니다',
    body: '12월 27일 아버지께서 돌아가셔서 연말 연휴와 겹쳐 장례식장 섭외가 될지 걱정이 많았습니다. 가효상조에 연락하니 당일 장례식장을 바로 연결해 주셨고, 김도훈 지도사님이 연휴임에도 직접 장례식장에 오셔서 의전 전반을 챙겨 주셨습니다. 수의 선택, 제단 구성, 조문객 응대 방법까지 세세하게 알려주셨습니다. 명절이나 연휴에도 걱정 없이 이용할 수 있다는 점이 큰 장점입니다.',
    tags: ['연휴 서비스', '직접 방문 의전', '24시간'],
  },
  {
    id: 5,
    author: '정○○',
    location: '경기 성남',
    date: '2025-11-07',
    rating: 4,
    title: '전반적으로 만족, 처음 연락이 조금 늦었지만 이후는 완벽했어요',
    body: '처음 전화했을 때 약 10분 정도 대기했던 점은 아쉬웠습니다. 그 이후로는 빠르게 연결이 됐고, 장례 과정 전반에서 불편함이 전혀 없었습니다. 특히 장례비 사전 견적과 실제 청구 금액이 정확히 일치했고, 수목장 상담 과정에서 가격과 관리 방식을 꼼꼼하게 비교해 주셔서 좋은 곳을 선택할 수 있었습니다. 주변 지인들에게도 추천하고 있습니다.',
    tags: ['투명한 비용', '수목장 상담', '추천'],
  },
  {
    id: 6,
    author: '한○○',
    location: '경기 수원',
    date: '2025-09-15',
    rating: 5,
    title: '고인에 대한 정성과 예우가 느껴졌습니다',
    body: '할머니 장례였는데, 의전 과정에서 고인을 대하는 태도에서 진심이 느껴졌습니다. 염습 과정 설명부터 제단 꽃 배치, 수의 입히는 순서까지 유족에게 하나하나 안내해 주셨고, 할머니를 정성스럽게 모셔 주셨습니다. 장례비가 걱정돼서 미리 여러 업체를 알아봤는데, 가효상조가 비용과 서비스 면에서 가장 신뢰가 갔습니다. 어려운 시기에 마음이 놓이는 서비스였습니다.',
    tags: ['고인 예우', '의전 서비스', '신뢰'],
  },
  {
    id: 7,
    author: '윤○○',
    location: '서울 관악',
    date: '2025-07-22',
    rating: 5,
    title: '가효상조 제휴 봉안당 맞춤 안내까지, 기대 이상이었습니다',
    body: '아버지 장례를 치르면서 봉안당 선택을 도움받았는데, 가효상조 제휴 시설을 통해 저희 가족 상황에 딱 맞는 맞춤형 컨설팅을 받았습니다. 복잡한 절차 없이 아주 편안하게 이용할 수 있었습니다. 장례 절차 전반에서도 불필요한 서비스를 권유하지 않고 필요한 것만 안내해 주셔서 믿음이 갔습니다. 후불제이기 때문에 장례를 모두 마친 뒤 청구서 확인하고 납부할 수 있어 심리적으로도 여유가 있었습니다.',
    tags: ['봉안당 할인', '후불제', '불필요한 권유 없음'],
  },
  {
    id: 8,
    author: '오○○',
    location: '경기 안산',
    date: '2025-05-30',
    rating: 5,
    title: '갑작스러운 사고로 인한 장례, 정말 많은 도움이 됐습니다',
    body: '예상치 못한 사고로 형을 갑자기 잃어 온 가족이 충격 상태였습니다. 경찰서 절차와 병원 협조, 장례식장 섭외까지 동시에 처리해야 하는 상황에서 가효상조 상담사분이 무엇을 먼저 해야 하는지 순서를 잡아 주셨습니다. 사고사의 경우 추가로 처리해야 하는 행정 절차가 많은데 그 부분도 꼼꼼히 안내해 주셨습니다. 가족 중 아무도 장례 경험이 없었는데 처음부터 끝까지 버팀목이 되어 주셨습니다.',
    tags: ['긴급 대응', '행정 안내', '가족 지원'],
  },
];

const totalRating = REVIEWS.reduce((sum, r) => sum + r.rating, 0);
const avgRating = (totalRating / REVIEWS.length).toFixed(1);

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': '가효상조',
    'url': 'https://gahyo.co.kr',
    'telephone': '1551-5718',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': '은행로167번길 3, 6층 601-b21호(대야동, 대원빌딩)',
      'addressLocality': '시흥시',
      'addressRegion': '경기도',
      'addressCountry': 'KR',
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': avgRating,
      'bestRating': '5',
      'worstRating': '1',
      'reviewCount': String(REVIEWS.length),
    },
    'review': REVIEWS.map((r) => ({
      '@type': 'Review',
      'author': {
        '@type': 'Person',
        'name': r.author,
      },
      'datePublished': r.date,
      'reviewRating': {
        '@type': 'Rating',
        'ratingValue': String(r.rating),
        'bestRating': '5',
        'worstRating': '1',
      },
      'name': r.title,
      'reviewBody': r.body,
    })),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'item': { '@id': 'https://gahyo.co.kr/', 'name': '홈' } },
      { '@type': 'ListItem', 'position': 2, 'item': { '@id': 'https://gahyo.co.kr/reviews', 'name': '고객 후기' } },
    ],
  },
];

function StarRating({ rating, size = 'md' }) {
  const sizes = { sm: '1rem', md: '1.3rem', lg: '2rem' };
  return (
    <div style={{ display: 'flex', gap: '1px', color: '#F59E0B' }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} style={{ fontSize: sizes[size], lineHeight: 1 }}>
          {n <= rating ? '★' : '☆'}
        </span>
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '6rem' }}>

        {/* 히어로 - 종합 평점 */}
        <section style={{
          background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-dark) 100%)',
          padding: '3.5rem 1.25rem 3rem',
          textAlign: 'center',
          color: 'white',
        }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
              고객 후기
            </p>
            <h1 style={{ fontSize: '1.9rem', fontWeight: '900', marginBottom: '1.5rem', lineHeight: 1.3 }}>
              가효상조를 이용한<br />실제 고객의 이야기
            </h1>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '4rem', fontWeight: '900', lineHeight: 1, color: '#F59E0B' }}>
                {avgRating}
              </div>
              <StarRating rating={Math.round(parseFloat(avgRating))} size="lg" />
              <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', marginTop: '0.25rem' }}>
                {REVIEWS.length}개의 이용 후기 기준
              </p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
              {[['⭐', `5점 ${REVIEWS.filter(r => r.rating === 5).length}건`], ['★', `4점 ${REVIEWS.filter(r => r.rating === 4).length}건`]].map(([icon, label]) => (
                <div key={label} style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span>{icon}</span><span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 신뢰 배지 */}
        <section style={{ background: 'white', padding: '1rem 1.25rem', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ maxWidth: '840px', margin: '0 auto', display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            {[
              { icon: '✅', text: '100% 후불제' },
              { icon: '🔒', text: '추가비용 없음' },
              { icon: '📞', text: '24시간 상담' },
              { icon: '🎖️', text: '국가공인 장례지도사 1급' },
            ].map(({ icon, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: '#334155', fontWeight: '600' }}>
                <span>{icon}</span><span>{text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 후기 목록 */}
        <section style={{ padding: '2.5rem 1.25rem' }}>
          <div style={{ maxWidth: '840px', margin: '0 auto' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '1.25rem',
            }}>
              {REVIEWS.map((review) => (
                <article
                  key={review.id}
                  style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                  }}
                >
                  {/* 상단: 작성자 + 날짜 */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <div style={{
                        width: '2.2rem',
                        height: '2.2rem',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, var(--navy), var(--navy-dark))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '0.9rem',
                        fontWeight: '800',
                        flexShrink: 0,
                      }}>
                        {review.author[0]}
                      </div>
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#1e293b' }}>{review.author}</div>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{review.location}</div>
                      </div>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', flexShrink: 0 }}>{review.date}</div>
                  </div>

                  {/* 별점 */}
                  <StarRating rating={review.rating} size="sm" />

                  {/* 제목 */}
                  <h3 style={{ fontSize: '0.95rem', fontWeight: '800', color: '#1e293b', margin: 0, lineHeight: 1.4 }}>
                    {review.title}
                  </h3>

                  {/* 본문 */}
                  <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.7, margin: 0 }}>
                    {review.body}
                  </p>

                  {/* 태그 */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.25rem' }}>
                    {review.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: '0.75rem',
                          padding: '0.25rem 0.6rem',
                          borderRadius: '999px',
                          background: '#f1f5f9',
                          color: '#64748b',
                          fontWeight: '600',
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            {/* 안내 문구 */}
            <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#94a3b8', marginTop: '2rem' }}>
              * 위 후기는 실제 이용 고객의 동의를 받아 개인정보 보호를 위해 이니셜 처리하여 게재하였습니다.
            </p>
          </div>
        </section>

        {/* 하단 CTA */}
        <section style={{
          padding: '2.5rem 1.25rem',
          background: 'white',
          borderTop: '1px solid #e2e8f0',
        }}>
          <div style={{
            maxWidth: '600px',
            margin: '0 auto',
            textAlign: 'center',
          }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '900', color: 'var(--navy)', marginBottom: '0.75rem' }}>
              지금 무료 상담을 받아보세요
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '1.5rem', lineHeight: 1.7 }}>
              국가공인 장례지도사 1급 김도훈이 24시간 직접 상담합니다.<br />
              가입비 없는 100% 후불제, 상품 내 추가비용 일절 없음.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a
                href="tel:1551-5718"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.9rem 1.75rem',
                  background: 'var(--navy)',
                  color: 'white',
                  fontWeight: '800',
                  fontSize: '1.05rem',
                  borderRadius: '999px',
                  textDecoration: 'none',
                }}
              >
                📞 1551-5718
              </a>
              <a
                href="https://pf.kakao.com/_ntRdX/chat"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.9rem 1.75rem',
                  background: '#FEE500',
                  color: '#000',
                  fontWeight: '800',
                  fontSize: '1.05rem',
                  borderRadius: '999px',
                  textDecoration: 'none',
                }}
              >
                💬 카카오 상담
              </a>
            </div>
          </div>
        </section>

      </main>

      <HallStickyBar subtitle="가효상조 무료 상담" />
    </>
  );
}
