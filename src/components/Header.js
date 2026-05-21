'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const mainNavItems = [
  { href: '/about', label: '가효상조 소개' },
  { href: '/estimate', label: 'AI 장례 견적' },
  { href: '/products', label: '후불제상조상품' },
  { href: '/halls', label: '장례식장 찾기' },
  { href: '/cemeteries', label: '모실곳 찾기' },
  { href: '/guide', label: '장례 가이드' },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'all 0.3s ease',
        boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.2)' : 'none',
      }}>
        {/* 1단: 탑 바 (모바일/태블릿에서는 CSS로 숨김 처리) */}
        <div className="top-bar" style={{
          background: 'rgba(0, 16, 38, 0.95)', // 메인 네이비보다 더 어둡게
          color: 'rgba(255,255,255,0.8)',
          fontSize: '0.85rem',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          transition: 'all 0.3s ease',
          height: scrolled ? '0px' : '36px', // 스크롤 내리면 0으로 접힘
          overflow: 'hidden',
          opacity: scrolled ? 0 : 1,
        }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '36px' }}>
            <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.8rem', letterSpacing: '-0.02em' }}>
              <span>경황없는 순간, 가장 든든한 가족이 되어드리겠습니다.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <span style={{ color: 'var(--gold)', fontWeight: '700' }}>📞 24시간 무료 상담 1551-5718</span>
              <Link href="/qna" style={{ color: 'rgba(255,255,255,0.9)', fontWeight: '600', transition: 'color 0.2s', borderLeft: '1px solid rgba(255,255,255,0.2)', paddingLeft: '1.5rem' }}>고객 문의/상담</Link>
            </div>
          </div>
        </div>

        {/* 2단: 메인 네비게이션 */}
        <div style={{
          background: scrolled ? 'rgba(0, 26, 58, 0.98)' : 'rgba(0, 26, 58, 0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: scrolled ? '1px solid rgba(201,168,76,0.2)' : '1px solid transparent',
          height: '76px', // 공간을 넓게 확보
          display: 'flex',
          alignItems: 'center',
          transition: 'all 0.3s ease',
        }}>
          <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            {/* 로고 */}
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexShrink: 0 }}>
              <div style={{ width: '42px', height: '42px', overflow: 'hidden', borderRadius: '8px', display: 'flex', alignItems: 'flex-start' }}>
                <Image src="/logo.png" alt="가효상조 심볼" width={42} height={100} style={{ width: '100%', height: 'auto', objectFit: 'contain', objectPosition: 'top' }} priority />
              </div>
              <div>
                <div style={{ color: 'white', fontWeight: '800', fontSize: '1.3rem', lineHeight: 1.1, letterSpacing: '-0.03em' }}>가효상조</div>
                <div style={{ color: 'rgba(201,168,76,0.9)', fontSize: '0.65rem', letterSpacing: '0.1em', lineHeight: 1, marginTop: '2px' }}>GAHYO SANGJO</div>
              </div>
            </Link>

            {/* 데스크탑 네비게이션 */}
            <nav style={{ display: 'none' }} className="desktop-nav">
              {mainNavItems.map((item) => {
                const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <Link key={item.href} href={item.href} style={{
                    color: active ? 'var(--gold)' : 'rgba(255,255,255,0.92)',
                    fontWeight: active ? '800' : '600',
                    fontSize: '1.05rem',
                    padding: '0.5rem 0',
                    borderBottom: active ? '2px solid var(--gold)' : '2px solid transparent',
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap',
                    letterSpacing: '-0.02em',
                  }}>
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* 우측 CTA 및 모바일 햄버거 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
              <a href="tel:1551-5718" className="btn-primary desktop-cta" style={{ fontSize: '0.95rem', padding: '0.7rem 1.4rem', whiteSpace: 'nowrap', display: 'none', borderRadius: '999px' }}>
                📞 무료 상담받기
              </a>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                id="mobile-menu-toggle"
                aria-label="메뉴 열기"
                style={{
                  width: '40px', height: '40px',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  gap: '6px',
                  borderRadius: '8px',
                  transition: 'background 0.2s',
                }}
              >
                {[0, 1, 2].map((i) => (
                  <span key={i} style={{
                    display: 'block',
                    width: menuOpen ? (i === 1 ? '0' : '22px') : '24px',
                    height: '2px',
                    background: 'white',
                    borderRadius: '2px',
                    transition: 'all 0.3s',
                    transform: menuOpen
                      ? i === 0 ? 'translateY(8px) rotate(45deg)'
                      : i === 2 ? 'translateY(-8px) rotate(-45deg)'
                      : 'scaleX(0)'
                      : 'none',
                  }} />
                ))}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 모바일 오버레이 메뉴 */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999,
        background: 'rgba(0,26,58,0.97)',
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? 'all' : 'none',
        transition: 'opacity 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '90px',
        paddingInline: '1.5rem',
      }}>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {/* 모바일에서는 메인 메뉴와 QnA를 모두 보여줌 */}
          {[...mainNavItems, { href: '/qna', label: '고객 문의/상담' }].map((item, idx) => {
            const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href} style={{
                color: active ? 'var(--gold)' : 'rgba(255,255,255,0.9)',
                fontWeight: active ? '700' : '500',
                fontSize: '1.25rem',
                padding: '1rem 0',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateX(0)' : 'translateX(-20px)',
                transition: `opacity 0.3s ease ${idx * 0.05}s, transform 0.3s ease ${idx * 0.05}s`,
              }}>
                {item.label}
                <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '1rem' }}>›</span>
              </Link>
            );
          })}
        </nav>
        <div style={{ marginTop: '2.5rem' }}>
          <Link href="/estimate" className="btn-primary" style={{ width: '100%', textAlign: 'center', padding: '1rem', borderRadius: '1rem' }}>
            🧮 무료 AI 견적 받기
          </Link>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', textAlign: 'center', marginTop: '1.5rem', fontWeight: '600' }}>
            📞 24시간 안심 상담: 1551-5718
          </p>
        </div>
      </div>

      {/* 헤더 공간 보상용 스페이서 */}
      <div className="header-spacer" />

      <style>{`
        /* 모바일에서는 1단 숨기고 2단(76px) 높이만 유지 */
        .header-spacer {
          height: 76px;
        }
        .top-bar {
          display: none !important;
        }
        
        @media (min-width: 1024px) {
          /* 데스크탑 뷰 */
          .top-bar {
            display: block !important;
          }
          .header-spacer {
            height: 112px; /* 36px + 76px */
          }
          .desktop-nav {
            display: flex !important;
            gap: clamp(1rem, 2.5vw, 2.5rem); /* 모니터 크기에 맞춰 간격 유연하게 조절 */
            margin: 0 auto;
            justify-content: center;
            flex: 1;
            padding: 0 2rem;
          }
          #mobile-menu-toggle {
            display: none !important;
          }
          .desktop-cta {
            display: inline-flex !important;
          }
        }
      `}</style>
    </>
  );
}
