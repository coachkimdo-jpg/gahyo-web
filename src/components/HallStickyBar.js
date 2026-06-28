'use client';

export default function HallStickyBar({ hallName }) {
  return (
    <>
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          borderTop: '2px solid var(--gold)',
          padding: '0.75rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
          boxShadow: '0 -4px 20px rgba(0,0,0,0.25)',
        }}
      >
        {/* 왼쪽: 안내 문구 */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: '600', marginBottom: '0.15rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {hallName ? `${hallName} 장례 준비` : '장례 준비'}
          </div>
          <div style={{ fontSize: '0.85rem', color: 'white', fontWeight: '700', lineHeight: 1.2 }}>
            지금 바로 무료 상담하세요
          </div>
        </div>

        {/* 오른쪽: CTA 버튼들 */}
        <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
          <a
            href="https://pf.kakao.com/_ntRdX/friend"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.65rem 0.9rem',
              background: '#FEE500',
              color: '#000',
              fontWeight: '800',
              fontSize: '0.8rem',
              borderRadius: '8px',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            💬 카카오
          </a>
          <a
            href="tel:1551-5718"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem',
              padding: '0.65rem 1rem',
              background: 'var(--gold)',
              color: '#0f172a',
              fontWeight: '800',
              fontSize: '0.9rem',
              borderRadius: '8px',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            📞 1551-5718
          </a>
        </div>
      </div>

      {/* 하단 바 높이만큼 여백 확보 (컨텐츠가 가려지지 않도록) */}
      <div style={{ height: '72px' }} />
    </>
  );
}
