import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: '장례 가이드 및 정보 | 임종부터 장지까지 완벽 안내 — 가효상조',
  description: '임종 후 처리사항, 부고 보내는 법, 장례 비용 안내, 행정 절차 등 유가족에게 꼭 필요한 실질적인 장례 정보를 전문가의 검수를 거쳐 제공합니다.',
  openGraph: {
    title: '장례 가이드 및 정보 | 가효상조',
    description: '임종부터 장지 선택, 행정 서류까지 장례의 모든 것을 알기 쉽게 안내해 드립니다.',
  }
};

const CATEGORY_COLORS = {
  '임종절차': { bg: '#e6eef8', color: '#002C5F' },
  '행정절차': { bg: '#fff3e0', color: '#e65100' },
  '비용안내': { bg: '#e8f5e9', color: '#1b5e20' },
  '장지정보': { bg: '#f3e5f5', color: '#4a148c' },
  '장례문화': { bg: '#fce4ec', color: '#880e4f' },
};

const CATEGORY_ICONS = {
  '임종절차': '🕊️',
  '행정절차': '📋',
  '비용안내': '💰',
  '장지정보': '🌿',
  '장례문화': '🙏',
};

const getThumbnailUrl = (content) => {
  if (!content || typeof content !== 'string') return null;
  const match = content.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : null;
};

export default async function GuidePage(props) {
  const searchParams = await props.searchParams;
  const selectedCategory = searchParams?.category || null;

  let guideArticles = [];
  try {
    const q = query(collection(db, 'articles'), orderBy('id', 'desc'));
    const snapshot = await getDocs(q);
    guideArticles = snapshot.docs.map(doc => doc.data());
  } catch (err) {
    console.error('Failed to read articles from Firebase:', err);
  }

  if (selectedCategory) {
    guideArticles = guideArticles.filter(a => a.category === selectedCategory);
  }

  const today = new Date().toISOString().split('T')[0];

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'item': { '@id': 'https://gahyo.co.kr/', 'name': '홈' } },
        { '@type': 'ListItem', 'position': 2, 'item': { '@id': 'https://gahyo.co.kr/guide', 'name': '장례 가이드' } }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      'headline': '장례 가이드 및 정보',
      'description': '장례 절차부터 행정 서류, 비용 안내까지 꼭 필요한 정보를 제공합니다.',
      'url': 'https://gahyo.com/guide',
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
          'name': '장례 절차 중 가장 먼저 해야 할 일은 무엇인가요?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': '가장 먼저 고인의 임종을 확인(사망진단서 발급)하고, 장례식장과 상조회사(가효상조 1551-5718)에 연락하여 장례식장 예약 및 운구 조치를 취해야 합니다.'
          }
        },
        {
          '@type': 'Question',
          'name': '사망신고는 언제까지 해야 하나요?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': '사망신고는 사망 사실을 안 날로부터 1개월 이내에 관할 구청, 시청, 읍·면·동 주민센터에 신고해야 합니다.'
          }
        }
      ]
    }
  ];

  const featuredImg = guideArticles[0] ? getThumbnailUrl(guideArticles[0].content) : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <header className="page-hero">
        <div className="container">
          <span className="section-label" style={{ color: 'rgba(201,168,76,0.9)' }}>장례 가이드</span>
          <h1 className="page-hero-title">장례 가이드 및 정보 안내</h1>
          <p className="page-hero-desc">장례 절차부터 행정 서류, 비용 안내까지. 꼭 필요한 정보를 쉽게 확인하세요.</p>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1rem', marginTop: '1.5rem' }}>
            {/* BLUF 핵심 요약 */}
            <div style={{ maxWidth: '680px', padding: '1rem 1.5rem', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.18)', textAlign: 'left' }}>
              <p style={{ color: 'rgba(255,255,255,0.92)', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
                <strong style={{ color: 'var(--gold)' }}>본 가이드는 가효상조 전문 장례지도사들이 실제 사례를 바탕으로 작성했습니다.</strong><br />
                유가족분들이 당황하지 않도록 상황별 대처 방법과 정확한 행정 절차를 꼼꼼하게 정리해 제공합니다.
              </p>
            </div>

            {/* E-E-A-T 신뢰도 배지 */}
            <div style={{ display: 'inline-flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', padding: '0.7rem 1.25rem', background: 'rgba(255,255,255,0.08)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.1rem' }}>🎓</span>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.55)' }}>콘텐츠 작성 및 감수</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'white' }}>가효상조 국가공인 장례지도사</div>
                </div>
              </div>
              <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.2)' }} />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.55)' }}>최종 업데이트</div>
                <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'white' }}>{today}</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container" style={{ padding: '3rem 1.25rem 5rem' }}>
        {/* 카테고리 빠른 이동 */}
        <div style={{ display: 'flex', gap: '0.625rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          <Link href="/guide" style={{ textDecoration: 'none' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', padding: '0.5rem 1rem', borderRadius: '999px', fontSize: '0.875rem', fontWeight: '600', background: !selectedCategory ? 'var(--navy)' : '#f1f5f9', color: !selectedCategory ? 'white' : '#64748b', cursor: 'pointer', transition: 'all 0.2s' }}>
              전체 보기
            </span>
          </Link>
          {Object.entries(CATEGORY_ICONS).map(([cat, icon]) => {
            const style = CATEGORY_COLORS[cat];
            const isSelected = selectedCategory === cat;
            return (
              <Link key={cat} href={`/guide?category=${encodeURIComponent(cat)}`} style={{ textDecoration: 'none' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', padding: '0.5rem 1rem', borderRadius: '999px', fontSize: '0.875rem', fontWeight: '600', background: isSelected ? style.bg : '#f1f5f9', color: isSelected ? style.color : '#64748b', cursor: 'pointer', border: isSelected ? `1px solid ${style.color}` : '1px solid transparent', opacity: selectedCategory && !isSelected ? 0.6 : 1, transition: 'all 0.2s' }}>
                  {icon} {cat}
                </span>
              </Link>
            );
          })}
        </div>

        {/* 추천 가이드 */}
        {guideArticles[0] && (
          <Link href={`/guide/${guideArticles[0].slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="card" style={{ display: 'flex', flexDirection: 'column', marginBottom: '2rem', borderTop: '3px solid var(--gold)', cursor: 'pointer' }}>
              <div style={{ background: featuredImg ? `url(${featuredImg}) center/cover no-repeat` : 'linear-gradient(135deg, var(--navy) 0%, #003a7a 100%)', height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '0.75rem', position: 'relative' }}>
                {!featuredImg && <span style={{ fontSize: '3.5rem' }}>{CATEGORY_ICONS[guideArticles[0].category]}</span>}
                <span style={{ background: featuredImg ? 'rgba(0,0,0,0.6)' : 'rgba(201,168,76,0.2)', color: featuredImg ? 'white' : 'var(--gold)', padding: '0.25rem 0.875rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: '600', border: featuredImg ? '1px solid rgba(255,255,255,0.3)' : '1px solid rgba(201,168,76,0.3)', position: featuredImg ? 'absolute' : 'static', top: featuredImg ? '1rem' : 'auto', right: featuredImg ? '1rem' : 'auto' }}>추천 가이드</span>
              </div>
              <div style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.875rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  <span style={{ ...CATEGORY_COLORS[guideArticles[0].category], padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: '600' }}>{guideArticles[0].category}</span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>⏱ {guideArticles[0].readTime} 읽기</span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{guideArticles[0].publishedAt}</span>
                </div>
                <h2 style={{ fontSize: '1.375rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '0.75rem', lineHeight: 1.3 }}>{guideArticles[0].title}</h2>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, fontSize: '0.9375rem', marginBottom: '1.5rem' }}>{guideArticles[0].summary}</p>
                <div className="btn-primary" style={{ display: 'inline-flex' }}>가이드 읽어보기 →</div>
              </div>
            </div>
          </Link>
        )}

        {/* 카드뉴스 그리드 */}
        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '1.25rem' }}>전체 가이드 목록</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {guideArticles.slice(1).map((article) => {
            const catStyle = CATEGORY_COLORS[article.category] || { bg: 'var(--gray-bg)', color: 'var(--text-secondary)' };
            const catIcon = CATEGORY_ICONS[article.category] || '📄';
            const thumbUrl = getThumbnailUrl(article.content);
            return (
              <Link href={`/guide/${article.slug}`} key={article.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="card" id={`guide-card-${article.id}`} style={{ cursor: 'pointer', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ height: '160px', background: thumbUrl ? `url(${thumbUrl}) center/cover no-repeat` : `linear-gradient(135deg, ${catStyle.bg} 0%, white 100%)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3.5rem', borderBottom: '1px solid #f1f5f9' }}>
                    {!thumbUrl && catIcon}
                  </div>
                  <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.625rem', alignItems: 'center' }}>
                      <span style={{ ...catStyle, padding: '0.2rem 0.625rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '600' }}>{article.category}</span>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>⏱ {article.readTime}</span>
                    </div>
                    <h3 style={{ fontWeight: '700', color: 'var(--navy)', fontSize: '1rem', lineHeight: 1.4, marginBottom: '0.5rem' }}>{article.title}</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '1rem', flex: 1 }}>{article.summary}</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{article.publishedAt}</span>
                      <span style={{ color: 'var(--gold)', fontWeight: '600', fontSize: '0.875rem' }}>자세히 보기 →</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* 정적 FAQ 섹션 (하단) */}
        <section style={{ marginTop: '4rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: '3px solid var(--gold)' }}>
            자주 묻는 질문 (FAQ)
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {[
              {
                q: '장례 절차 중 가장 먼저 해야 할 일은 무엇인가요?',
                a: '가장 먼저 고인의 임종을 확인(사망진단서 발급)하고, 장례식장과 상조회사(가효상조 1551-5718)에 연락하여 장례식장 예약 및 운구 조치를 취해야 합니다.'
              },
              {
                q: '사망신고는 언제까지 해야 하나요?',
                a: '사망신고는 사망 사실을 안 날로부터 1개월 이내에 관할 구청, 시청, 읍·면·동 주민센터에 신고해야 합니다.'
              },
              {
                q: '가효상조는 어떤 도움을 주나요?',
                a: '가효상조는 장례식장 예약부터 임종 후 운구, 빈소 차림, 염습, 발인 및 장지 동행까지 장례의 전 과정을 100% 후불제로 책임지고 진행해 드립니다.'
              }
            ].map((faq, i) => (
              <article key={i} style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#1e293b', marginBottom: '0.75rem', display: 'flex', gap: '0.5rem' }}>
                  <span style={{ color: '#c0392b', flexShrink: 0 }}>Q.</span> {faq.q}
                </h3>
                <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.7, paddingLeft: '1.7rem', margin: 0 }}>
                  <strong style={{ color: 'var(--gold-dark)', marginRight: '0.3rem' }}>A.</strong>{faq.a}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* 추가 상담 CTA */}
        <div style={{ marginTop: '3.5rem', background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-dark) 100%)', borderRadius: 'var(--radius-xl)', padding: '2.5rem', textAlign: 'center', color: 'white' }}>
          <p style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.75rem' }}>더 궁금한 점이 있으신가요?</p>
          <p style={{ opacity: 0.7, marginBottom: '1.5rem', fontSize: '0.9375rem' }}>24시간 전문 상담원이 친절하게 안내해 드립니다.</p>
          <a href="tel:1551-5718" className="btn-primary" style={{ display: 'inline-flex' }}>📞 1551-5718 무료 상담</a>
        </div>
      </div>
    </>
  );
}
