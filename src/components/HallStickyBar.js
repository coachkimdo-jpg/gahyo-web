'use client';

export default function HallStickyBar({ hallName, subtitle = '장례 준비' }) {
  return (
    <>
      {/* 바깥 래퍼: 풀 너비 배경 */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: 'linear-gradient(135deg, #9b1c1c 0%, #c0392b 100%)',
        borderTop: '3px solid #fbbf24',
        boxShadow: '0 -4px 20px rgba(192,57,43,0.5)',
      }}>
        {/* 안쪽 컨테이너: 최대 너비 + 중앙 정렬 */}
        <div style={{
          maxWidth: '840px',
          margin: '0 auto',
          padding: '0.75rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
        }}>
          {/* 왼쪽: 안내 문구 */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.75)', fontWeight: '600', marginBottom: '0.15rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {hallName ? `${hallName} ${subtitle}` : subtitle}
            </div>
            <div style={{ fontSize: '0.92rem', color: 'white', fontWeight: '800', lineHeight: 1.3 }}>
              📞 지금 전화하면 30분 내 출동
            </div>
          </div>

          {/* 오른쪽: CTA 버튼들 */}
          <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
            <a
              href="https://pf.kakao.com/_ntRdX/chat"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.7rem 0.85rem',
                background: '#FEE500',
                color: '#000',
                fontWeight: '800',
                fontSize: '0.95rem',
                borderRadius: '10px',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                lineHeight: 1.2,
                minWidth: '68px',
              }}
            >
              <span style={{ fontSize: '1.3rem', lineHeight: 1 }}>💬</span>
              <span style={{ fontSize: '0.8rem', marginTop: '0.2rem' }}>카카오</span>
            </a>
            <a
              href="tel:1551-5718"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.15rem',
                padding: '0.7rem 1rem',
                background: 'white',
                color: '#c0392b',
                fontWeight: '800',
                borderRadius: '10px',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                lineHeight: 1.2,
                minWidth: '110px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              }}
            >
              <span style={{ fontSize: '1.3rem', lineHeight: 1 }}>📞</span>
              <span style={{ fontSize: '1.05rem', fontWeight: '900', letterSpacing: '0.01em' }}>1551-5718</span>
            </a>
          </div>
        </div>
      </div>

      {/* 하단 바 높이만큼 여백 확보 (컨텐츠가 가려지지 않도록) */}
      <div style={{ height: '88px' }} />

      {/* Hall 상세 페이지에서는 EmergencyFloat 숨김 (스티키 바가 동일 역할) */}
      <style>{`.emergency-float { display: none !important; }`}</style>
    </>
  );
}
