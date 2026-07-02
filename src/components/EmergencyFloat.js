'use client';

export default function EmergencyFloat() {
  return (
    <div className="emergency-float" style={{
      position: 'fixed',
      bottom: '1.75rem',
      right: '1.25rem',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '0.6rem'
    }}>
      {/* 카카오톡 상담 버튼 */}
      <a
        href="https://pf.kakao.com/_ntRdX/chat"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="카카오톡 상담"
        style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          background: '#FEE500',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
          textDecoration: 'none',
          gap: '2px',
        }}
      >
        <span style={{ fontSize: '2rem', lineHeight: 1 }}>💬</span>
        <span style={{ fontSize: '0.7rem', fontWeight: '800', color: '#3A1D1D', lineHeight: 1 }}>카카오</span>
      </a>

      {/* 전화 상담 버튼 */}
      <a
        href="tel:1551-5718"
        aria-label="전화 상담 1551-5718"
        style={{
          borderRadius: '36px',
          background: '#22453A',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 6px 20px rgba(0,0,0,0.28)',
          textDecoration: 'none',
          padding: '0.85rem 1.1rem',
          gap: '3px',
          minWidth: '80px',
        }}
      >
        <span style={{ fontSize: '1.7rem', lineHeight: 1 }}>📞</span>
        <span style={{ fontSize: '0.85rem', fontWeight: '900', color: 'white', lineHeight: 1.2, whiteSpace: 'nowrap' }}>1551-5718</span>
      </a>
    </div>
  );
}
