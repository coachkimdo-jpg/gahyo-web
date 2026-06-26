'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

const SLIDES = [
  {
    id: 0,
    badge: '국가공인 장례지도사 24시간 직접 출동',
    heading: (
      <>
        꽃, 수의, 제단까지<br />
        유가족이 직접<br />
        <span style={{ color: '#C9A84C' }}>골라 구성합니다.</span>
      </>
    ),
    sub: '내가 직접 고른 마지막이라, 후회가 없습니다.',
    primaryHref: '/custom-package',
    primaryLabel: '🛠️ 상조 상품 직접 구성하기',
    secondaryHref: '/estimate',
    secondaryLabel: '🧮 투명한 장례비용 산출하기',
  },
  {
    id: 1,
    badge: '100% 후불제 · 가입비 없음',
    heading: (
      <>
        전화 한 통으로<br />
        <span style={{ color: '#C9A84C' }}>모든 절차를<br />해결해 드립니다.</span>
      </>
    ),
    sub: '임종 후 당황하지 마세요. 24시간 즉시 출동합니다.',
    primaryHref: 'tel:1551-5718',
    primaryLabel: '📞 지금 바로 전화하기',
    secondaryHref: '/guide',
    secondaryLabel: '📋 장례 절차 안내 보기',
  },
  {
    id: 2,
    badge: '전국 500+ 제휴 장례식장',
    heading: (
      <>
        장례식장 걱정<br />
        <span style={{ color: '#C9A84C' }}>저희가 직접<br />섭외해 드립니다.</span>
      </>
    ),
    sub: '전국 어디서든 최적의 장례식장을 바로 연결해 드립니다.',
    primaryHref: '/halls',
    primaryLabel: '🏥 장례식장 찾기',
    secondaryHref: '/estimate',
    secondaryLabel: '💰 비용 미리 확인하기',
  },
];

const BADGES = ['✅ 24시간 연중무휴', '✅ 전국 즉시 출동', '✅ 내 마음대로 맞춤 구성', '✅ 장례 종료 후 결제'];

export default function HeroSection({ today }) {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback((idx) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setAnimating(false);
    }, 250);
  }, [animating]);

  const next = useCallback(() => goTo((current + 1) % SLIDES.length), [current, goTo]);

  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next]);

  const slide = SLIDES[current];

  return (
    <>
      {/* ──────────────────────────────────────────
          HERO — 다크 네이비 + 골드, 슬라이드 캐러셀
         ────────────────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(160deg, #001224 0%, #002C5F 60%, #00183a 100%)',
        padding: '3.5rem 0 0',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '520px',
      }}>
        {/* 배경 글로우 */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '420px', height: '420px', background: 'radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 65%)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', bottom: '5%', left: '-8%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)', borderRadius: '50%' }} />
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>

          {/* 신뢰 배지 */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
            padding: '0.55rem 1.1rem',
            background: 'rgba(201,168,76,0.15)',
            border: '1px solid rgba(201,168,76,0.4)',
            borderRadius: '999px',
            marginBottom: '2rem',
          }}>
            <span style={{ fontSize: '1rem' }}>🎖️</span>
            <span style={{ fontSize: '0.82rem', fontWeight: '700', color: '#C9A84C', letterSpacing: '0.02em' }}>
              신뢰할 수 있는 전문가
            </span>
            <span style={{ width: '1px', height: '14px', background: 'rgba(201,168,76,0.4)' }} />
            <span style={{ fontSize: '0.82rem', fontWeight: '700', color: 'rgba(255,255,255,0.7)' }}>
              최종 업데이트 {today}
            </span>
          </div>

          {/* 슬라이드 콘텐츠 */}
          <div style={{
            opacity: animating ? 0 : 1,
            transform: animating ? 'translateY(8px)' : 'translateY(0)',
            transition: 'opacity 0.25s ease, transform 0.25s ease',
          }}>
            {/* 슬라이드 배지 */}
            <div style={{
              display: 'inline-block',
              padding: '0.3rem 0.85rem',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '999px',
              fontSize: '0.8rem',
              color: 'rgba(255,255,255,0.65)',
              fontWeight: '600',
              marginBottom: '1.25rem',
              letterSpacing: '0.02em',
            }}>
              {slide.badge}
            </div>

            {/* 헤딩 */}
            <h1 style={{
              fontSize: 'clamp(2rem, 6vw, 3rem)',
              fontWeight: '800',
              color: 'white',
              lineHeight: 1.3,
              marginBottom: '1rem',
              letterSpacing: '-0.02em',
              wordBreak: 'keep-all',
            }}>
              {slide.heading}
            </h1>

            {/* 서브 */}
            <p style={{
              fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
              color: 'rgba(255,255,255,0.65)',
              marginBottom: '2rem',
              lineHeight: 1.65,
              wordBreak: 'keep-all',
            }}>
              {slide.sub}
            </p>

            {/* 신뢰 포인트 배지 */}
            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: '0.5rem',
              marginBottom: '2.25rem',
            }}>
              {BADGES.map(b => (
                <span key={b} style={{
                  padding: '0.35rem 0.85rem',
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '999px',
                  fontSize: 'clamp(0.72rem, 2.5vw, 0.82rem)',
                  color: 'rgba(255,255,255,0.8)',
                  fontWeight: '600',
                  whiteSpace: 'nowrap',
                }}>{b}</span>
              ))}
            </div>

            {/* CTA 버튼 */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2.5rem' }}>
              {slide.id === 1 ? (
                <a href={slide.primaryHref} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  padding: '1rem 2rem', minWidth: '220px',
                  background: 'linear-gradient(135deg, #c0392b, #96281b)',
                  color: 'white', borderRadius: '10px', fontWeight: '800', fontSize: '1.05rem',
                  textDecoration: 'none', boxShadow: '0 6px 20px rgba(192,57,43,0.4)',
                  transition: 'transform 0.15s',
                }}>
                  {slide.primaryLabel}
                </a>
              ) : (
                <Link href={slide.primaryHref} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  padding: '1rem 2rem', minWidth: '220px',
                  background: 'linear-gradient(135deg, #C9A84C, #a07830)',
                  color: 'white', borderRadius: '10px', fontWeight: '800', fontSize: '1.05rem',
                  textDecoration: 'none', boxShadow: '0 6px 20px rgba(201,168,76,0.35)',
                  transition: 'transform 0.15s',
                }}>
                  {slide.primaryLabel}
                </Link>
              )}
              {slide.id === 1 ? (
                <Link href={slide.secondaryHref} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  padding: '1rem 1.75rem',
                  background: 'rgba(255,255,255,0.07)',
                  color: 'rgba(255,255,255,0.85)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '10px', fontWeight: '700', fontSize: '1rem',
                  textDecoration: 'none', transition: 'background 0.15s',
                }}>
                  {slide.secondaryLabel}
                </Link>
              ) : (
                <a href={slide.id === 0 ? 'tel:1551-5718' : slide.secondaryHref} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  padding: '1rem 1.75rem',
                  background: 'rgba(255,255,255,0.07)',
                  color: 'rgba(255,255,255,0.85)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '10px', fontWeight: '700', fontSize: '1rem',
                  textDecoration: 'none', transition: 'background 0.15s',
                }}>
                  {slide.id === 0 ? '📞 24시간 장례 접수·상담' : slide.secondaryLabel}
                </a>
              )}
            </div>
          </div>

          {/* 슬라이드 인디케이터 */}
          <div style={{
            display: 'flex', gap: '0.5rem', alignItems: 'center',
            marginBottom: '2.5rem',
          }}>
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`슬라이드 ${i + 1}`}
                style={{
                  width: '44px',
                  height: '44px',
                  display: 'flex', alignItems: 'center', justifyContent: 'flex-start',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '18px 8px',
                  boxSizing: 'border-box',
                }}
              >
                <span style={{
                  display: 'block',
                  width: '28px',
                  height: '8px',
                  borderRadius: '999px',
                  background: i === current ? '#C9A84C' : 'rgba(255,255,255,0.3)',
                  transform: i === current ? 'scaleX(1)' : 'scaleX(0.29)',
                  transformOrigin: 'left center',
                  transition: 'transform 0.3s ease',
                }} />
              </button>
            ))}
          </div>
        </div>

        {/* 하단 웨이브 구분선 */}
        <div style={{ lineHeight: 0, marginTop: '-1px' }}>
          <svg viewBox="0 0 1440 48" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%' }}>
            <path d="M0,32 C360,60 1080,0 1440,32 L1440,48 L0,48 Z" fill="white" />
          </svg>
        </div>
      </section>
    </>
  );
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       