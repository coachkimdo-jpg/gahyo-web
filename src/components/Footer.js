import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer style={{
      background: 'linear-gradient(135deg, var(--navy-dark) 0%, var(--navy) 100%)',
      color: 'rgba(255,255,255,0.75)',
      paddingTop: '3.5rem',
      paddingBottom: '2rem',
      marginTop: 'auto',
    }}>
      <div className="container">
        {/* 상단 그리드 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2.5rem',
          paddingBottom: '2.5rem',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}>
          {/* 브랜드 */}
          <div>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1rem' }}>
              <div style={{ width: '42px', height: '42px', overflow: 'hidden', borderRadius: '10px', display: 'flex', alignItems: 'flex-start' }}>
                <Image src="/logo.png" alt="가효상조 심볼" width={42} height={100} style={{ width: '100%', height: 'auto', objectFit: 'contain', objectPosition: 'top' }} />
              </div>
              <div>
                <div style={{ color: 'white', fontWeight: '800', fontSize: '1.125rem' }}>가효상조</div>
                <div style={{ color: 'var(--gold)', fontSize: '0.625rem', letterSpacing: '0.1em' }}>GAHYO SANGJO</div>
              </div>
            </Link>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.75, marginBottom: '1.25rem' }}>
              슬픔을 위로하는 기술,<br />투명함을 더하는 장례 파트너.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {['카카오', '블로그', '유튜브'].map((sns) => (
                <div key={sns} style={{
                  width: '36px', height: '36px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}>{sns[0]}</div>
              ))}
            </div>
          </div>

          {/* 서비스 링크 */}
          <div>
            <div style={{ color: 'var(--gold)', fontWeight: '700', fontSize: '0.875rem', letterSpacing: '0.05em', marginBottom: '1rem' }}>서비스</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {[
                { href: '/estimate', label: 'AI 장례 견적' },
                { href: '/products', label: '후불제상조상품' },
                { href: '/halls', label: '장례식장 찾기' },
                { href: '/cemeteries', label: '모실곳 찾기' },
                { href: '/guide', label: '장례 가이드' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} style={{
                    fontSize: '0.9rem',
                    transition: 'color 0.2s',
                    display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
                  }}>
                    <span style={{ color: 'var(--gold)', fontSize: '0.75rem' }}>›</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 회사 링크 */}
          <div>
            <div style={{ color: 'var(--gold)', fontWeight: '700', fontSize: '0.875rem', letterSpacing: '0.05em', marginBottom: '1rem' }}>회사 정보</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {[
                { label: '회사 소개', href: '/about' },
                { label: '이용약관', href: '/terms' },
                { label: '개인정보처리방침', href: '/privacy' },
                { label: '관리자 페이지', href: '/admin' }
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} style={{ fontSize: '0.9rem', transition: 'color 0.2s' }}>
                    <span style={{ color: 'var(--gold)', fontSize: '0.75rem' }}>›</span> {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 연락처 */}
          <div>
            <div style={{ color: 'var(--gold)', fontWeight: '700', fontSize: '0.875rem', letterSpacing: '0.05em', marginBottom: '1rem' }}>24시간 상담</div>
            <a href="tel:1551-5718" style={{
              display: 'block',
              color: 'white',
              fontWeight: '800',
              fontSize: '1.75rem',
              marginBottom: '0.5rem',
              letterSpacing: '-0.02em',
            }}>1551-5718</a>
            <p style={{ fontSize: '0.8rem', marginBottom: '1.25rem' }}>연중무휴 · 24시간 운영</p>
            <Link href="/estimate" className="btn-primary" style={{ fontSize: '0.875rem', padding: '0.625rem 1.25rem' }}>
              무료 견적 받기
            </Link>
          </div>
        </div>

        {/* 하단 법인 정보 */}
        <div style={{
          paddingTop: '1.75rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}>
          <p style={{ fontSize: '0.8rem', lineHeight: 1.7 }}>
            (주)가효상조 | 사업자등록번호: 733-32-01721 | 고객센터: 1551-5718 | 이메일: gahyofuneral@naver.com
          </p>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
            © 2025 가효상조. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
