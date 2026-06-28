'use client';

import { useState } from 'react';

const REVIEWS = [
  { text: '새벽 3시에도 30분 만에 출동해주셨어요. 큰 위로가 됐습니다.', name: '최○○', region: '인천 연수구' },
  { text: '견적과 실제 비용이 거의 똑같았어요. 추가비용 없이 투명했습니다.', name: '이○○', region: '경기 수원시' },
  { text: '처음부터 끝까지 장례지도사가 옆에서 안내해줘서 당황하지 않았어요.', name: '김○○', region: '서울 강남구' },
];

export default function FreeConsultSection() {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phone.trim()) {
      setStatus('error');
      setErrorMsg('연락처를 입력해 주세요.');
      return;
    }
    if (!agreed) {
      setStatus('error');
      setErrorMsg('개인정보 수집에 동의해 주세요.');
      return;
    }
    setStatus('loading');
    try {
      const res = await fetch('/api/free-consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, region: '', situation: '', agreeTerms: true }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || '오류가 발생했습니다.');
      setStatus('success');
      setPhone(''); setName(''); setAgreed(false);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message);
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
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2.5rem',
          alignItems: 'start',
          maxWidth: '900px',
          margin: '0 auto',
        }}>

          {/* 왼쪽 — 신뢰 + 후기 */}
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
              fontSize: 'clamp(1.5rem, 4vw, 2rem)',
              fontWeight: '800',
              color: '#1e293b',
              lineHeight: 1.35,
              marginBottom: '0.75rem',
              wordBreak: 'keep-all',
            }}>
              연락처 하나만 남기시면<br />
              <span style={{ color: '#7a5910' }}>5분 안에 전화드립니다</span>
            </h2>
            <p style={{
              fontSize: '0.9rem',
              color: '#475569',
              lineHeight: 1.65,
              marginBottom: '1rem',
              wordBreak: 'keep-all',
            }}>
              가입비 0원 · 월 납입 0원 · 장례 종료 후 결제<br />
              국가공인 장례지도사가 직접 전화드립니다.
            </p>

            {/* 실제 후기 3개 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {REVIEWS.map((r, i) => (
                <div key={i} style={{
                  background: 'white',
                  borderRadius: '10px',
                  padding: '0.7rem 0.9rem',
                  borderLeft: '3px solid var(--gold)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                }}>
                  <div style={{ display: 'flex', gap: '0.1rem', marginBottom: '0.25rem' }}>
                    {[1,2,3,4,5].map(s => <span key={s} style={{ color: '#C9A84C', fontSize: '0.72rem' }}>★</span>)}
                  </div>
                  <p style={{ fontSize: '0.82rem', color: '#334155', lineHeight: 1.55, margin: '0 0 0.3rem', fontStyle: 'italic' }}>
                    "{r.text}"
                  </p>
                  <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b' }}>{r.name} · {r.region}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 오른쪽 — 단순화된 폼 */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
            border: '1px solid #e8e0d4',
          }}>
            {status === 'success' ? (
              <div style={{ textAlign: 'center', padding: '2.5rem 0' }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>✅</div>
                <div style={{ fontWeight: '800', fontSize: '1.2rem', color: '#002C5F', marginBottom: '0.5rem' }}>
                  신청 완료!
                </div>
                <div style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                  장례지도사가 <strong>5분 안에</strong> 연락드립니다.<br />
                  급하시면 바로 전화하세요.
                </div>
                <a href="tel:1551-5718" style={{
                  display: 'block', padding: '0.9rem', marginBottom: '0.75rem',
                  background: 'linear-gradient(135deg,#c0392b,#96281b)',
                  color: 'white', borderRadius: '10px', fontWeight: '800',
                  fontSize: '1.05rem', textDecoration: 'none', textAlign: 'center',
                }}>
                  📞 1551-5718 지금 전화하기
                </a>
                <button
                  onClick={() => setStatus('idle')}
                  style={{
                    padding: '0.6rem 1.25rem', background: 'none',
                    border: '1px solid #cbd5e1', borderRadius: '8px',
                    color: '#64748b', cursor: 'pointer', fontSize: '0.85rem',
                    fontFamily: 'inherit',
                  }}
                >
                  다시 신청하기
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                {/* 헤더 */}
                <div style={{
                  background: 'linear-gradient(135deg, #fff8e8, #fef3cd)',
                  border: '1px solid #f0d060',
                  borderRadius: '10px',
                  padding: '0.9rem 1rem',
                }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#92700a' }}>가입비 0원 · 월 납입 0원</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e293b', marginTop: '0.1rem' }}>1분 무료 상담받기</div>
                </div>

                {/* 연락처 (필수) */}
                <div>
                  <label htmlFor="consult-phone" style={{ display: 'block', fontWeight: '700', fontSize: '0.9rem', color: '#1e293b', marginBottom: '0.4rem' }}>
                    연락처 <span style={{ color: '#c0392b' }}>*</span>
                  </label>
                  <input
                    id="consult-phone"
                    type="tel"
                    value={phone}
                    onChange={e => { setPhone(e.target.value); setStatus('idle'); }}
                    placeholder="010-0000-0000"
                    style={{
                      width: '100%', padding: '0.9rem 1rem',
                      border: '2px solid #e2e8f0', borderRadius: '8px',
                      fontSize: '1rem', color: '#1e293b', background: '#f8fafc',
                      outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
                    }}
                  />
                </div>

                {/* 성함 (선택) */}
                <div>
                  <label htmlFor="consult-name" style={{ display: 'block', fontWeight: '700', fontSize: '0.9rem', color: '#1e293b', marginBottom: '0.4rem' }}>
                    성함 <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: '500' }}>(선택)</span>
                  </label>
                  <input
                    id="consult-name"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="성함을 입력해주세요."
                    style={{
                      width: '100%', padding: '0.9rem 1rem',
                      border: '2px solid #e2e8f0', borderRadius: '8px',
                      fontSize: '1rem', color: '#1e293b', background: '#f8fafc',
                      outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
                    }}
                  />
                </div>

                {/* 약관 동의 */}
                <label style={{
                  display: 'flex', alignItems: 'center', gap: '0.6rem',
                  cursor: 'pointer', fontSize: '0.83rem', color: '#475569',
                }}>
                  <span
                    onClick={() => { setAgreed(a => !a); setStatus('idle'); }}
                    style={{
                      width: '20px', height: '20px', borderRadius: '4px', flexShrink: 0,
                      border: agreed ? 'none' : '2px solid #cbd5e1',
                      background: agreed ? '#C9A84C' : 'white',
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.15s', cursor: 'pointer',
                    }}
                  >
                    {agreed && <span style={{ color: 'white', fontSize: '12px', fontWeight: '800', lineHeight: 1 }}>✓</span>}
                  </span>
                  이용약관 및 개인정보 수집·이용에 동의합니다.
                </label>

                {status === 'error' && (
                  <div style={{
                    padding: '0.7rem 1rem',
                    background: '#fef2f2', border: '1px solid #fecaca',
                    borderRadius: '8px', fontSize: '0.85rem', color: '#c0392b', fontWeight: '600',
                  }}>
                    ⚠️ {errorMsg}
                  </div>
                )}

                {/* 제출 버튼 */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  style={{
                    padding: '1.1rem',
                    background: status === 'loading'
                      ? '#94a3b8'
                      : 'linear-gradient(135deg, #c0392b, #96281b)',
                    color: 'white', border: 'none', borderRadius: '10px',
                    fontWeight: '800', fontSize: '1.05rem',
                    cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                    fontFamily: 'inherit', letterSpacing: '0.01em',
                  }}
                >
                  {status === 'loading' ? '신청 중...' : '📞 무료 상담 신청하기'}
                </button>

                {/* 보증 배지 */}
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: '0.4rem', padding: '0.6rem',
                  background: '#f0fdf4', borderRadius: '8px',
                  fontSize: '0.82rem', color: '#166534', fontWeight: '700',
                }}>
                  🛡️ 추가비용 청구 없음 보장 · 장례 종료 후 결제
                </div>

                <div style={{ textAlign: 'center', fontSize: '0.82rem', color: '#475569' }}>
                  급하신 분은 바로 전화하세요 →{' '}
                  <a href="tel:1551-5718" style={{ color: '#c0392b', fontWeight: '800', textDecoration: 'none' }}>
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
