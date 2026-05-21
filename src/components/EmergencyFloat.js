'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function EmergencyFloat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="emergency-float" style={{ 
      position: 'fixed', 
      bottom: '1.75rem', 
      right: '1.25rem', 
      zIndex: 9999, 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '0.75rem'
    }}>
      {/* 팝업 메뉴 (열렸을 때만 표시) */}
      {isOpen && (
        <div style={{
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 12px 40px rgba(0,0,0,0.18)',
          width: '240px', // 모바일을 위해 살짝 축소
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          animation: 'fadeInUp 0.3s ease'
        }}>
          <div style={{ textAlign: 'center', paddingBottom: '0.25rem' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: '800', color: 'var(--navy)' }}>무엇을 도와드릴까요?</span>
          </div>
          
          {/* 전화 상담 버튼 */}
          <a href="tel:1551-5718" style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            padding: '0.85rem', background: 'linear-gradient(135deg, #c0392b 0%, #96281b 100%)',
            borderRadius: '999px', color: 'white', textDecoration: 'none',
            boxShadow: '0 4px 12px rgba(192, 57, 43, 0.4)',
            transition: 'transform 0.2s, box-shadow 0.2s'
          }}>
            <div style={{ width: '32px', height: '32px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>📞</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: '700' }}>전화 상담하기</span>
              <span style={{ fontSize: '0.7rem', opacity: 0.85 }}>1551-5718 (24시간)</span>
            </div>
          </a>

          {/* 카카오톡 상담 버튼 */}
          <a href="https://pf.kakao.com/_ntRdX/friend" target="_blank" rel="noopener noreferrer" style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            padding: '0.85rem', background: '#FEE500',
            borderRadius: '999px', color: '#000', textDecoration: 'none',
            boxShadow: '0 4px 12px rgba(254, 229, 0, 0.4)',
            transition: 'transform 0.2s, box-shadow 0.2s'
          }}>
            <div style={{ width: '32px', height: '32px', background: '#3A2929', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>💬</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: '800' }}>카카오톡 상담</span>
              <span style={{ fontSize: '0.7rem', color: '#3A2929', opacity: 0.85 }}>실시간 1:1 채팅</span>
            </div>
          </a>
        </div>
      )}

      {/* 토글 플로팅 버튼 */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'var(--gold)',
          color: 'var(--navy-dark)',
          border: 'none',
          boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.75rem',
          cursor: 'pointer',
          transition: 'transform 0.3s ease',
          transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)'
        }}
      >
        {isOpen ? '✕' : '💬'}
      </button>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
