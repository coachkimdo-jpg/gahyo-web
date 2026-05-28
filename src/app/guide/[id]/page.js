import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Image from 'next/image';
import parse, { attributesToProps, domToReact } from 'html-react-parser';

export const dynamic = 'force-dynamic';

const CATEGORY_COLORS = {
  '임종절차': { bg: '#e6eef8', color: '#002C5F' },
  '행정절차': { bg: '#fff3e0', color: '#e65100' },
  '비용안내': { bg: '#e8f5e9', color: '#1b5e20' },
  '장지정보': { bg: '#f3e5f5', color: '#4a148c' },
  '장례문화': { bg: '#fce4ec', color: '#880e4f' },
};

async function getArticleBySlug(slugParam) {
  if (!slugParam) return null;
  try {
    let decoded = slugParam;
    try { decoded = decodeURIComponent(decoded); } catch(e){}
    try { decoded = decodeURIComponent(decoded); } catch(e){}
    
    // id로 접근했을 경우도 대비 (이전 숫자 형태 URL 호환)
    if (!isNaN(decoded)) {
      const numericId = parseInt(decoded, 10);
      const qId = query(collection(db, 'articles'), where('id', '==', numericId));
      const snapshotId = await getDocs(qId);
      if (!snapshotId.empty) return snapshotId.docs[0].data();
    }
    
    const qSlug = query(collection(db, 'articles'), where('slug', '==', decoded));
    const snapshotSlug = await getDocs(qSlug);
    if (!snapshotSlug.empty) return snapshotSlug.docs[0].data();
    
    return null;
  } catch (err) {
    console.error('Error fetching article by slug:', err);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const p = await params;
  const slug = p.slug || p.id;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: '가이드를 찾을 수 없습니다' };

  return {
    title: `${article.title} | 가효상조 장례 가이드`,
    description: article.summary,
    keywords: [article.category, '장례가이드', '가효상조', ...article.title.split(' ')],
    openGraph: {
      title: `${article.title} | 가효상조 장례 가이드`,
      description: article.summary,
    }
  };
}

export default async function GuideDetailPage({ params }) {
  const p = await params;
  const slug = p.slug || p.id;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const catStyle = CATEGORY_COLORS[article.category] || { bg: 'var(--gray-bg)', color: 'var(--text-secondary)' };
  const today = new Date().toISOString().split('T')[0];

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      'headline': article.title,
      'description': article.summary,
      'author': {
        '@type': 'Organization',
        'name': '가효상조',
        'url': 'https://gahyo.com'
      },
      'datePublished': article.publishedAt,
      'dateModified': today,
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
          'name': `${article.category} 관련 문의는 어디로 하나요?`,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': '장례 절차 및 행정 서류에 대한 전문적인 도움이 필요하시다면 가효상조 1551-5718로 24시간 언제든 문의하실 수 있습니다.'
          }
        },
        {
          '@type': 'Question',
          'name': '가효상조 장례 가이드는 믿을 수 있나요?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': '네, 본 가이드는 가효상조 소속 국가공인 장례지도사들이 실제 사례와 검증된 행정 절차를 바탕으로 직접 작성하고 감수한 정확한 정보입니다.'
          }
        }
      ]
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Hero Section */}
      <header className="page-hero" style={{ padding: '4rem 1.25rem 3rem' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ ...catStyle, padding: '0.3rem 0.8rem', borderRadius: '999px', fontSize: '0.85rem', fontWeight: '700' }}>{article.category}</span>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>⏱ {article.readTime} 읽기</span>
          </div>
          
          <h1 className="page-hero-title" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginBottom: '1.5rem', lineHeight: 1.4 }}>
            {article.title}
          </h1>

          {/* BLUF 요약 */}
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)', textAlign: 'left', marginBottom: '2rem' }}>
            <p style={{ color: 'rgba(255,255,255,0.95)', fontSize: '1.05rem', lineHeight: 1.7, margin: 0 }}>
              <strong style={{ color: 'var(--gold)' }}>핵심 요약:</strong> {article.summary}
            </p>
          </div>

          {/* E-E-A-T 배지 */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', color: 'white' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '40px', height: '40px', background: 'var(--gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>👨‍💼</div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>작성 및 감수</div>
                <div style={{ fontSize: '0.95rem', fontWeight: '700' }}>가효상조 수석 장례지도사</div>
              </div>
            </div>
            <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.2)' }} />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>게시일</div>
              <div style={{ fontSize: '0.95rem', fontWeight: '700' }}>{article.publishedAt}</div>
            </div>
          </div>
        </div>
      </header>

      <div className="container" style={{ padding: '3rem 1.25rem 5rem', maxWidth: '800px' }}>
        
        {/* 본문 콘텐츠 (피라미드 구조) */}
        <article style={{ background: 'white', borderRadius: '16px', padding: '3rem 2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid var(--border-color)', marginBottom: '3rem' }}>
          
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '3px solid var(--gold)' }}>
            1. {article.category} 필수 가이드
          </h2>
          
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--text-primary)', marginBottom: '2rem' }}>
            장례를 준비하거나 진행 중인 유가족 분들이 가장 많이 묻고 궁금해하시는 <strong>'{article.category}'</strong>에 대한 정확한 절차와 지침을 안내해 드립니다.
          </p>

          {article.content && article.content.length > 0 ? (
            typeof article.content === 'string' ? (
              <div 
                className="article-html-content"
                style={{ lineHeight: 1.8, fontSize: '1.05rem', color: '#334155' }}
              >
                {parse(article.content, {
                  replace: (domNode) => {
                    if (domNode.name === 'script') {
                      return <></>; // Prevent duplicate JSON-LD schemas embedded by the API
                    }
                    if (domNode.name === 'h1') {
                      const props = attributesToProps(domNode.attribs);
                      return (
                        <h2 {...props} style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--navy)', marginTop: '2rem', marginBottom: '1rem', ...props.style }}>
                          {domToReact(domNode.children)}
                        </h2>
                      );
                    }
                    if (domNode.name === 'img') {
                      const props = attributesToProps(domNode.attribs);
                      const { src, alt, width, height, 'data-priority': priority } = props;
                      const numWidth = width ? parseInt(width, 10) : 800;
                      const numHeight = height ? parseInt(height, 10) : 400;

                      return (
                        <Image
                          src={src || 'https://placehold.co/800x400/webp?text=placeholder'}
                          alt={alt ? `${alt} - 가효상조 장례 가이드 ${article.title}` : `${article.title} - 가효상조 장례 가이드 및 필수 상식`}
                          width={numWidth}
                          height={numHeight}
                          priority={priority === 'true'}
                          style={{ maxWidth: '100%', height: 'auto', borderRadius: '12px', margin: '2.5rem auto', display: 'block' }}
                        />
                      );
                    }
                  }
                })}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
                {Array.isArray(article.content) && article.content.map((step) => (
                  <div key={step.step}>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ width: '28px', height: '28px', background: 'var(--gold)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>{step.step}</span>
                      {step.title}
                    </h3>
                    <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.95rem', paddingLeft: '2.5rem', margin: 0 }}>
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            )
          ) : (
            <div style={{ background: 'var(--gray-bg)', padding: '2rem', borderRadius: '12px', textAlign: 'center', marginBottom: '2rem' }}>
              <span style={{ fontSize: '2rem', marginBottom: '1rem', display: 'block' }}>📝</span>
              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                상세 가이드 내용이 곧 업데이트될 예정입니다.<br />
                궁금한 사항은 <strong>1551-5718</strong>로 문의하시면 즉시 답변해 드립니다.
              </p>
            </div>
          )}

          <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid var(--navy)', marginTop: '2rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '0.5rem' }}>💡 장례지도사의 팁</h3>
            <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>
              {article.category} 진행 시 가장 주의해야 할 점은 정확한 서류 준비와 사전 확인입니다. 혼자 고민하지 마시고 가효상조의 전문적인 도움을 받으시길 권장합니다.
            </p>
          </div>
        </article>

        {/* FAQ 섹션 */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: '3px solid var(--gold)' }}>
            2. 관련 자주 묻는 질문 (FAQ)
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              {
                q: `${article.category} 관련 문의는 어디로 하나요?`,
                a: '장례 절차 및 행정 서류에 대한 전문적인 도움이 필요하시다면 가효상조 1551-5718로 24시간 언제든 문의하실 수 있습니다.'
              },
              {
                q: '가효상조 장례 가이드는 믿을 수 있나요?',
                a: '네, 본 가이드는 가효상조 소속 국가공인 장례지도사들이 실제 사례와 검증된 행정 절차를 바탕으로 직접 작성하고 감수한 정확한 정보입니다.'
              }
            ].map((faq, i) => (
              <div key={i} style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#1e293b', marginBottom: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                  <span style={{ color: '#c0392b' }}>Q.</span> {faq.q}
                </h3>
                <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6, paddingLeft: '1.7rem', margin: 0 }}>
                  <strong style={{ color: 'var(--gold-dark)', marginRight: '0.3rem' }}>A.</strong>{faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div style={{ background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-dark) 100%)', borderRadius: '16px', padding: '2.5rem', textAlign: 'center', color: 'white', boxShadow: '0 10px 30px rgba(0,44,95,0.15)' }}>
          <span style={{ fontSize: '2rem', display: 'block', marginBottom: '1rem' }}>💬</span>
          <h2 style={{ fontSize: '1.35rem', fontWeight: '800', marginBottom: '0.75rem' }}>전문가의 도움이 필요하신가요?</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
            당황스러운 순간, 가효상조가 곁에서 힘이 되어 드리겠습니다.<br />
            24시간 언제든 연락해 주세요.
          </p>
          <a href="tel:1551-5718" className="btn-primary" style={{ display: 'inline-block', background: 'var(--gold)', color: 'white', border: 'none', padding: '1rem 2.5rem', fontSize: '1.1rem', fontWeight: '800', borderRadius: '999px', textDecoration: 'none' }}>
            📞 1551-5718 긴급 전화상담
          </a>
        </div>

        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <Link href="/guide" className="btn-outline-gold" style={{ display: 'inline-block', padding: '0.75rem 2rem', borderRadius: '999px', textDecoration: 'none' }}>
            ← 다른 가이드 보기
          </Link>
        </div>
      </div>
    </>
  );
}
