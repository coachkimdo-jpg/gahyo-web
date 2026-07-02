import Image from 'next/image';
import Link from 'next/link';

/* ──────────────────────────────────────────────
   HERO — 송백(담녹+황동) 라이트 미니멀
   국가공인 장례지도사 · 24시간 · 100% 후불제
   단일 핵심 메시지 + 명확한 전화 CTA (전환 강화)
   ────────────────────────────────────────────── */

const PhoneIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const CheckIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
const DocIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="4" y="3" width="16" height="18" rx="2" /><path d="M9 7h6M9 11h6M9 15h4" />
  </svg>
);
const ClockIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
  </svg>
);
const HallIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-5h6v5" />
  </svg>
);

export default function HeroSection({ today }) {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', background: 'var(--white)' }}>
      <div
        className="container"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1.05fr) minmax(0,0.95fr)',
          gap: '3.5rem',
          alignItems: 'center',
          padding: '3.25rem 1.25rem 3.75rem',
        }}
      >
        {/* 왼쪽 — 카피 & CTA */}
        <div style={{ minWidth: 0 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'var(--white)', border: '1px solid var(--border-color)',
            padding: '0.5rem 1rem', borderRadius: '999px',
            fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-secondary)',
            boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
          }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#2E6B4F', boxShadow: '0 0 0 3px #E6F0EA' }} />
            가입비 0원 · 월 납입금 0원 · 100% 후불제
          </span>

          <h1 style={{
            fontFamily: 'var(--font-serif)', fontWeight: '700',
            fontSize: 'clamp(2rem, 5vw, 3.3rem)', lineHeight: 1.28,
            letterSpacing: '-0.02em', color: 'var(--text-primary)',
            margin: '1.4rem 0 1.1rem', wordBreak: 'keep-all',
          }}>
            필요한 것만 골라서,<br />
            직접 구성하는 <span style={{ color: 'var(--gold-dark)' }}>장례</span>
          </h1>

          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '480px', marginBottom: '1.9rem', wordBreak: 'keep-all' }}>
            정해진 패키지는 없습니다. 원하는 서비스만 선택하고, 장례 후 쓴 만큼만 내세요.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.6rem' }}>
            <a href="tel:1551-5718" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.55rem',
              padding: '1.05rem 2rem', background: 'var(--gold)', color: '#fff',
              borderRadius: '12px', fontWeight: '700', fontSize: '1.08rem', textDecoration: 'none',
              boxShadow: '0 8px 22px -8px rgba(133,90,28,0.7)',
            }}>
              <PhoneIcon width="1.15em" height="1.15em" />
              1551-5718 · 지금 전화하기
            </a>
            <Link href="/custom-package" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              padding: '1.05rem 2rem', background: 'transparent', color: 'var(--text-primary)',
              border: '1.5px solid var(--border-color)', borderRadius: '12px',
              fontWeight: '700', fontSize: '1.08rem', textDecoration: 'none',
            }}>
              <DocIcon width="1.15em" height="1.15em" />
              상조 직접 구성하기
            </Link>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.4rem', paddingTop: '1.4rem', borderTop: '1px solid var(--border-color)' }}>
            {['가입비 0원', '추가비용 없음', '전국 즉시 출동'].map((t) => (
              <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.92rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
                <CheckIcon width="1.15em" height="1.15em" style={{ color: 'var(--gold-dark)' }} />
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* 오른쪽 — 서예 인장 카드 */}
        <div className="hero-visual" style={{ position: 'relative', minWidth: 0 }}>
          <div style={{
            position: 'relative', background: 'var(--white)', border: '1px solid var(--border-color)',
            borderRadius: '24px', padding: '2.5rem', textAlign: 'center',
            boxShadow: '0 30px 60px -30px rgba(30,40,30,0.28)',
          }}>
            <div style={{ background: 'var(--navy-light)', borderRadius: '16px', padding: '2rem 1.5rem' }}>
              <Image src="/logo.png" alt="가효 서예 인장" width={824} height={1088} style={{ width: 'min(230px, 60%)', height: 'auto', margin: '0 auto' }} priority unoptimized />
            </div>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: 'var(--text-primary)', marginTop: '1.4rem', lineHeight: 1.6 }}>
              슬픔은 정성으로,<br /><span style={{ color: 'var(--gold-dark)' }}>절차는 투명하게.</span>
            </p>
          </div>

          <div className="float-card" style={{
            position: 'absolute', top: '-18px', left: '-14px',
            background: 'var(--white)', border: '1px solid var(--border-color)',
            borderRadius: '14px', padding: '0.85rem 1.1rem',
            boxShadow: '0 16px 34px -18px rgba(30,40,30,0.35)',
            display: 'flex', alignItems: 'center', gap: '0.6rem',
          }}>
            <ClockIcon width="1.5rem" height="1.5rem" style={{ color: 'var(--gold-dark)' }} />
            <div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: '700', color: 'var(--text-primary)', lineHeight: 1 }}>5분</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: '600' }}>평균 연결 시간</div>
            </div>
          </div>

          <div className="float-card" style={{
            position: 'absolute', bottom: '-18px', right: '-10px',
            background: 'var(--white)', border: '1px solid var(--border-color)',
            borderRadius: '14px', padding: '0.85rem 1.1rem',
            boxShadow: '0 16px 34px -18px rgba(30,40,30,0.35)',
            display: 'flex', alignItems: 'center', gap: '0.6rem',
          }}>
            <HallIcon width="1.5rem" height="1.5rem" style={{ color: 'var(--gold-dark)' }} />
            <div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: '700', color: 'var(--text-primary)', lineHeight: 1 }}>500+</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: '600' }}>제휴 장례식장</div>
            </div>
          </div>
        </div>
      </div>

      <p style={{ position: 'absolute', top: '1rem', right: '1.25rem', fontSize: '0.72rem', color: 'var(--text-secondary)', opacity: 0.7, margin: 0, whiteSpace: 'nowrap' }} className="hero-date">
        최종 업데이트 {today}
      </p>

      {/* 반응형: 모바일에서 1단 + 플로팅 카드 숨김 */}
      <style>{`
        @media (max-width: 919px){
          section > .container{ grid-template-columns: 1fr !important; gap: 2.5rem !important; padding-top: 2.5rem !important; }
          .hero-visual .float-card{ display: none !important; }
          .hero-date{ display: none !important; }
        }
      `}</style>
    </section>
  );
}
