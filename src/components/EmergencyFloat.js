'use client';

export default function EmergencyFloat() {
  return (
    <div className="emergency-float" style={{
      position: 'fixed',
      bottom: '1.5rem',
      right: '1rem',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '0.5rem'
    }}>
      {/* 카카오톡 상담 버튼 */}
      <a
        href="https://pf.kakao.com/_ntRdX/chat"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="카카오톡 상담"
        style={{
          width: '58px',
          height: '58px',
          borderRadius: '50%',
          background: '#FEE500',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(0,0,0,0.22)',
          textDecoration: 'none',
          gap: '1px',
        }}
      >
        <span style={{ fontSize: '1.65rem', lineHeight: 1 }}>💬</span>
        <span style={{ fontSize: '0.6rem', fontWeight: '800', color: '#3A1D1D', lineHeight: 1 }}>카카오</span>
      </a>

      {/* 전화 상담 버튼 */}
      <a
        href="tel:1551-5718"
        aria-label="전화 상담 1551-5718"
        style={{
          borderRadius: '28px',
          background: 'var(--gold)',
          color: '#0f172a',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
          textDecoration: 'none',
          padding: '0.6rem 0.8rem',
          gap: '2px',
        }}
      >
        <span style={{ fontSize: '1.4rem', lineHeight: 1 }}>📞</span>
        <span style={{ fontSize: '0.72rem', fontWeight: '900', color: '#0f172a', lineHeight: 1.2, whiteSpace: 'nowrap' }}>1551-5718</span>
      </a>
    </div>
  );
}
