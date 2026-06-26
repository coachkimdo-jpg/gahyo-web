'use client';

import { useState } from 'react';

const REGIONS = ['서울', '경기', '인천', '이 외'];

const SITUATIONS = [
  '선택해 주세요',
  '임종 직후 (즉시 도움 필요)',
  '임종 후 1~3일 내',
  '사전에 미리 알아보는 중',
  '기타',
];

export default function FreeConsultSection() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    region: '서울',
    situation: '',
    agreed: false,
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      setStatus('error');
      setMessage('성함과 연락처를 입력해 주세요.');
      return;
    }
    if (!form.agreed) {
      setStatus('error');
      setMessage('이용약관 및 개인정보 수집에 동의해 주세요.');
      return;
    }
    setStatus('loading');
    try {
      const res = await fetch('/api/free-consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || '오류가 발생했습니다.');
      setStatus('success');
      setMessage(data.message);
      setForm({ name: '', phone: '', region: '서울', situation: '', agreed: false });
    } catch (err) {
      setStatus('error');
      setMessage(err.message);
    }
  };

  return (
    <section style={{
      background: 'linear-gradient(160deg, #001224 0%, #002C5F 100%)',
      padding: '4rem 0',
    }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span style={{
            display: 'inline-block',
            padding: '0.3rem 1rem',
            background: 'rgba(201,168,76,0.2)',
            border: '1px solid rgba(201,168,76,0.5)',
            borderRadius: '999px',
            fontSize: '0.8rem',
            fontWeight: '700',
            color: '#C9A84C',
            letterSpacing: '0.08em',
            marginBottom: '0.9rem',
          }}>
            MEMBERSHIP &amp; CONSULTING
          </span>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1rem', marginBottom: 0 }}>
            가입비도 월 납입도 0원. 쓴 만큼만 후불 결제
          </p>
        </div>

        <div style={{
          maxWidth: '480px',
          margin: '0 auto',
          background: 'white',
          borderRadius: '16px',
          padding: 'clamp(1.5rem, 5vw, 2.5rem)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
        }}>
          {/* 카드 헤더 */}
          <div style={{
            background: 'linear-gradient(135deg, #fff8e8, #fef3cd)',
            border: '1px solid #f0d060',
            borderRadius: '10px',
            padding: '0.75rem 1rem',
            marginBottom: '1.5rem',
          }}>
            <div style={{ fontSize: '0.78rem', fontWeight: '700', color: '#92700a', marginBottom: '0.2rem' }}>
              가입비 0원 · 월 납입 0원
            </div>
            <div style={{ fontSize: '1.35rem', fontWeight: '800', color: '#1e293b' }}>
              1분 무료 상담받기
            </div>
            <div style={{ fontSize: '0.88rem', color: '#64748b', marginTop: '0.3rem' }}>
              한 번 등록으로 전담 장례지도사가 직접 연락드립니다.
            </div>
          </div>

          {status === 'success' ? (
            <div style={{
              textAlign: 'center',
              padding: '2rem 1rem',
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✅</div>
              <div style={{ fontWeight: '800', fontSize: '1.15rem', color: '#002C5F', marginBottom: '0.5rem' }}>
                상담 신청이 완료되었습니다!
              </div>
              <div style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.65 }}>
                {message}<br />
                빠른 시일 내에 연락드리겠습니다.
              </div>
              <button
                onClick={() => setStatus('idle')}
                style={{
                  marginTop: '1.5rem',
                  padding: '0.7rem 1.5rem',
                  background: 'var(--navy)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                }}
              >
                다시 신청하기
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

              {/* 성함 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <label style={{ width: '80px', fontWeight: '700', fontSize: '0.92rem', color: '#1e293b', flexShrink: 0 }}>
                  성함<span style={{ color: '#c0392b' }}>*</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="성함을 입력해주세요."
                  style={{
                    flex: 1, padding: '0.75rem 1rem',
                    border: '1px solid #e2e8f0', borderRadius: '8px',
                    fontSize: '0.92rem', color: '#1e293b',
                    outline: 'none', background: '#f8fafc',
                  }}
                />
              </div>

              {/* 연락처 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <label style={{ width: '80px', fontWeight: '700', fontSize: '0.92rem', color: '#1e293b', flexShrink: 0 }}>
                  연락처<span style={{ color: '#c0392b' }}>*</span>
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  placeholder="연락처를 입력해주세요. (숫자만 입력)"
                  style={{
                    flex: 1, padding: '0.75rem 1rem',
                    border: '1px solid #e2e8f0', borderRadius: '8px',
                    fontSize: '0.92rem', color: '#1e293b',
                    outline: 'none', background: '#f8fafc',
                  }}
                />
              </div>

              {/* 예상 장례지역 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <label style={{ width: '80px', fontWeight: '700', fontSize: '0.92rem', color: '#1e293b', flexShrink: 0 }}>
                  예상<br />장례지역
                </label>
                <div style={{ flex: 1, display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {REGIONS.map(r => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setForm(f => ({ ...f, region: r }))}
                      style={{
                        padding: '0.55rem 1rem',
                        borderRadius: '8px',
                        border: form.region === r ? 'none' : '1px solid #e2e8f0',
                        background: form.region === r ? '#C9A84C' : '#f8fafc',
                        color: form.region === r ? 'white' : '#64748b',
                        fontWeight: form.region === r ? '700' : '500',
                        fontSize: '0.88rem',
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                      }}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* 장례 준비 상황 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <label style={{ width: '80px', fontWeight: '700', fontSize: '0.92rem', color: '#1e293b', flexShrink: 0 }}>
                  장례 준비<br />상황
                </label>
                <select
                  value={form.situation}
                  onChange={e => setForm(f => ({ ...f, situation: e.target.value }))}
                  style={{
                    flex: 1, padding: '0.75rem 1rem',
                    border: '1px solid #e2e8f0', borderRadius: '8px',
                    fontSize: '0.92rem', color: form.situation ? '#1e293b' : '#94a3b8',
                    background: '#f8fafc', outline: 'none',
                    appearance: 'none',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2394a3b8' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 1rem center',
                    cursor: 'pointer',
                  }}
                >
                  {SITUATIONS.map(s => (
                    <option key={s} value={s === '선택해 주세요' ? '' : s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* 약관 동의 */}
              <label style={{
                display: 'flex', alignItems: 'flex-start', gap: '0.6rem',
                cursor: 'pointer', fontSize: '0.85rem', color: '#475569',
                padding: '0.5rem 0',
              }}>
                <div style={{
                  width: '18px', height: '18px', borderRadius: '4px',
                  border: form.agreed ? 'none' : '2px solid #cbd5e1',
                  background: form.agreed ? '#C9A84C' : 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, marginTop: '1px', transition: 'all 0.15s',
                }}>
                  {form.agreed && <span style={{ color: 'white', fontSize: '11px', fontWeight: '800' }}>✓</span>}
                </div>
                <input
                  type="checkbox"
                  checked={form.agreed}
                  onChange={e => setForm(f => ({ ...f, agreed: e.target.checked }))}
                  style={{ display: 'none' }}
                />
                이용약관, 개인정보 수집 및 이용에 모두 동의합니다.
              </label>

              {/* 에러 메시지 */}
              {status === 'error' && (
                <div style={{
                  padding: '0.75rem 1rem',
                  background: '#fef2f2', border: '1px solid #fecaca',
                  borderRadius: '8px', fontSize: '0.88rem', color: '#c0392b',
                  fontWeight: '600',
                }}>
                  ⚠️ {message}
                </div>
              )}

              {/* 제출 버튼 */}
              <button
                type="submit"
                disabled={status === 'loading'}
                style={{
                  marginTop: '0.25rem',
                  padding: '1rem',
                  background: status === 'loading'
                    ? '#94a3b8'
                    : 'linear-gradient(135deg, #C9A84C, #a07830)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: '800',
                  fontSize: '1.05rem',
                  cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  transition: 'opacity 0.15s',
                  letterSpacing: '0.02em',
                }}
              >
                {status === 'loading' ? '신청 중...' : '무료 상담받기'}
              </button>

              <div style={{ textAlign: 'center', fontSize: '0.85rem', color: '#94a3b8', marginTop: '-0.25rem' }}>
                이미 상담을 신청하셨나요?{' '}
                <a href="tel:1551-5718" style={{ color: '#002C5F', fontWeight: '700', textDecoration: 'none' }}>
                  1551-5718
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
