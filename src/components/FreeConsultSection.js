'use client';

import { useState } from 'react';

const REGIONS = ['서울', '경기', '인천', '이 외'];

const SITUATIONS = [
  '',
  '임종 직후 (즉시 도움 필요)',
  '임종 후 1~3일 내',
  '사전에 미리 알아보는 중',
  '기타',
];

const inputStyle = {
  width: '100%',
  padding: '0.8rem 1rem',
  border: '1.5px solid #e2e8f0',
  borderRadius: '8px',
  fontSize: '0.92rem',
  color: '#1e293b',
  background: '#f8fafc',
  outline: 'none',
  boxSizing: 'border-box',
};

const labelStyle = {
  display: 'block',
  fontWeight: '700',
  fontSize: '0.85rem',
  color: '#475569',
  marginBottom: '0.4rem',
};

export default function FreeConsultSection() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    region: '서울',
    situation: '',
    agreed: false,
  });
  const [status, setStatus] = useState('idle');
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
      background: '#f8f4ee',
      padding: '4.5rem 0',
      borderTop: '1px solid #ede8df',
      borderBottom: '1px solid #ede8df',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem',
          alignItems: 'center',
          maxWidth: '900px',
          margin: '0 auto',
        }}>

          {/* 왼쪽 — 설명 텍스트 */}
          <div>
            <span style={{
              display: 'inline-block',
              padding: '0.3rem 0.9rem',
              background: 'rgba(201,168,76,0.15)',
              border: '1px solid rgba(201,168,76,0.4)',
              borderRadius: '999px',
              fontSize: '0.75rem',
              fontWeight: '700',
              color: '#92700a',
              letterSpacing: '0.08em',
              marginBottom: '1rem',
            }}>
              MEMBERSHIP &amp; CONSULTING
            </span>
            <h2 style={{
              fontSize: 'clamp(1.6rem, 4vw, 2.1rem)',
              fontWeight: '800',
              color: '#1e293b',
              lineHeight: 1.35,
              marginBottom: '0.75rem',
              wordBreak: 'keep-all',
            }}>
              가입비도 월 납입도 0원.<br />
              <span style={{ color: '#7a5910' }}>쓴 만큼만 후불 결제</span>
            </h2>
            <p style={{
              fontSize: '0.95rem',
              color: '#64748b',
              lineHeight: 1.75,
              marginBottom: '1.5rem',
              wordBreak: 'keep-all',
            }}>
              한 번 등록으로 전담 장례지도사가 직접 연락드립니다.<br />
              24시간 언제든지 무료로 상담받으세요.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {['✅ 24시간 연중무휴 상담', '✅ 장례 종료 후 결제 (후불제)', '✅ 추가 비용 사전 공지'].map(t => (
                <div key={t} style={{ fontSize: '0.9rem', color: '#334155', fontWeight: '600' }}>{t}</div>
              ))}
            </div>
          </div>

          {/* 오른쪽 — 폼 카드 */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
            border: '1px solid #e8e0d4',
          }}>
            {status === 'success' ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✅</div>
                <div style={{ fontWeight: '800', fontSize: '1.1rem', color: '#002C5F', marginBottom: '0.5rem' }}>
                  상담 신청 완료!
                </div>
                <div style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                  빠른 시일 내에 연락드리겠습니다.
                </div>
                <button
                  onClick={() => setStatus('idle')}
                  style={{
                    padding: '0.65rem 1.5rem',
                    background: '#002C5F', color: 'white',
                    border: 'none', borderRadius: '8px',
                    fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem',
                  }}
                >
                  다시 신청하기
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>

                <div style={{
                  background: 'linear-gradient(135deg, #fff8e8, #fef3cd)',
                  border: '1px solid #f0d060',
                  borderRadius: '10px',
                  padding: '0.9rem 1rem',
                  marginBottom: '0.25rem',
                }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#92700a' }}>가입비 0원 · 월 납입 0원</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', marginTop: '0.1rem' }}>1분 무료 상담받기</div>
                </div>

                {/* 성함 */}
                <div>
                  <label htmlFor="consult-name" style={labelStyle}>성함 <span style={{ color: '#c0392b' }}>*</span></label>
                  <input
                    id="consult-name"
                    type="text"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="성함을 입력해주세요."
                    style={inputStyle}
                  />
                </div>

                {/* 연락처 */}
                <div>
                  <label htmlFor="consult-phone" style={labelStyle}>연락처 <span style={{ color: '#c0392b' }}>*</span></label>
                  <input
                    id="consult-phone"
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    placeholder="숫자만 입력해주세요."
                    style={inputStyle}
                  />
                </div>

                {/* 예상 장례지역 */}
                <div>
                  <label style={labelStyle}>예상 장례지역</label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {REGIONS.map(r => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setForm(f => ({ ...f, region: r }))}
                        style={{
                          flex: 1,
                          padding: '0.65rem 0.25rem',
                          borderRadius: '8px',
                          border: form.region === r ? 'none' : '1.5px solid #e2e8f0',
                          background: form.region === r ? '#7a5910' : '#f8fafc',
                          color: form.region === r ? 'white' : '#334155',
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
                <div>
                  <label htmlFor="consult-situation" style={labelStyle}>장례 준비 상황</label>
                  <select
                    id="consult-situation"
                    value={form.situation}
                    onChange={e => setForm(f => ({ ...f, situation: e.target.value }))}
                    style={{
                      ...inputStyle,
                      appearance: 'none',
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2394a3b8' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 1rem center',
                      cursor: 'pointer',
                      color: form.situation ? '#1e293b' : '#94a3b8',
                    }}
                  >
                    <option value="">선택해 주세요</option>
                    {SITUATIONS.filter(s => s).map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* 약관 동의 */}
                <label style={{
                  display: 'flex', alignItems: 'center', gap: '0.6rem',
                  cursor: 'pointer', fontSize: '0.83rem', color: '#475569',
                }}>
                  <span
                    onClick={() => setForm(f => ({ ...f, agreed: !f.agreed }))}
                    style={{
                      width: '18px', height: '18px', borderRadius: '4px', flexShrink: 0,
                      border: form.agreed ? 'none' : '2px solid #cbd5e1',
                      background: form.agreed ? '#C9A84C' : 'white',
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.15s', cursor: 'pointer',
                    }}
                  >
                    {form.agreed && <span style={{ color: 'white', fontSize: '11px', fontWeight: '800', lineHeight: 1 }}>✓</span>}
                  </span>
                  이용약관, 개인정보 수집 및 이용에 모두 동의합니다.
                </label>

                {status === 'error' && (
                  <div style={{
                    padding: '0.7rem 1rem',
                    background: '#fef2f2', border: '1px solid #fecaca',
                    borderRadius: '8px', fontSize: '0.85rem', color: '#c0392b', fontWeight: '600',
                  }}>
                    ⚠️ {message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  style={{
                    padding: '1rem',
                    background: status === 'loading' ? '#64748b' : 'linear-gradient(135deg, #7a5910, #5c4010)',
                    color: 'white', border: 'none', borderRadius: '10px',
                    fontWeight: '800', fontSize: '1rem', cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                    transition: 'opacity 0.15s', letterSpacing: '0.02em',
                    marginTop: '0.25rem',
                  }}
                >
                  {status === 'loading' ? '신청 중...' : '무료 상담받기'}
                </button>

                <div style={{ textAlign: 'center', fontSize: '0.82rem', color: '#475569' }}>
                  급하신 분은 바로 전화하세요 →{' '}
                  <a href="tel:1551-5718" style={{ color: '#002C5F', fontWeight: '700', textDecoration: 'none' }}>
                    1551-5718
                  </a>
                </div>

              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
