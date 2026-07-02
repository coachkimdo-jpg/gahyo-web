'use client';
import { useEffect, useRef, useState } from 'react';

function StatCard({ end, suffix, label, color, special }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStarted(true); },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started || special) return;
    let cur = 0;
    const step = end / (1600 / 16);
    const t = setInterval(() => {
      cur += step;
      if (cur >= end) { setCount(end); clearInterval(t); }
      else setCount(Math.floor(cur));
    }, 16);
    return () => clearInterval(t);
  }, [started, end, special]);

  return (
    <div ref={ref} style={{
      padding: '2rem 1rem',
      background: 'white',
      borderRadius: '16px',
      boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
      border: '1px solid var(--border-color)',
      textAlign: 'center',
    }}>
      <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', fontWeight: '700', color: color || 'var(--navy)', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
        {special ? '0원' : `${count.toLocaleString()}${suffix}`}
      </div>
      <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.6rem', fontWeight: '600' }}>{label}</div>
    </div>
  );
}

export default function StatsCounter() {
  return (
    <section style={{ padding: '3.5rem 0', background: 'var(--gray-bg)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
            숫자로 증명하는 가효상조
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>신뢰할 수 있는 후불제 장례 전문 기업</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
          <StatCard end={400} suffix="건+" label="누적 상담 건수" />
          <StatCard end={200} suffix="+" label="전국 제휴 장례식장" />
          <StatCard end={98} suffix="%" label="고객 만족도" />
          <StatCard end={0} suffix="원" label="가입비" special={true} />
        </div>
      </div>
    </section>
  );
}
