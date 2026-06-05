'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const BASE_PRICE = 900000;

const STEPS = [
  { id: 'clothes', label: '상복' },
  { id: 'vehicles', label: '차량' },
  { id: 'staff', label: '도우미' },
  { id: 'shroud', label: '수의' },
  { id: 'urn', label: '유골함' }
];

const OPTIONS = {
  clothes: [
    { id: 'c_none', title: '선택 안 함', desc: '상복을 직접 준비하시거나 입지 않으실 경우', price: 0 },
    { id: 'c_basic', title: '기본 세트 (각 2벌)', desc: '남·여 상복 각 2벌 및 상장, 완장 등 소품 일체', price: 100000, recommended: true },
    { id: 'c_premium', title: '넉넉한 세트 (각 5벌)', desc: '직계 가족이 많으신 경우 추천 (각 5벌)', price: 250000 },
  ],
  vehicles: [
    { id: 'v_amb', title: '앰뷸런스 (기본)', desc: '관내 고인 이송용 앰뷸런스만 이용', price: 0 },
    { id: 'v_bus', title: '앰뷸런스 + 장의버스', desc: '유족 및 조문객 이동을 위한 45인승 대형 버스 추가', price: 400000, recommended: true },
    { id: 'v_full', title: '앰뷸런스 + 버스 + 리무진', desc: '최고급 고인 전용 리무진까지 포함된 풀 패키지', price: 800000 },
  ],
  staff: [
    { id: 's_none', title: '선택 안 함', desc: '가족이 직접 조문객 접객을 하실 경우', price: 0 },
    { id: 's_two', title: '2명 지원 (20시간)', desc: '소규모 장례나 가족장에 적합한 인원', price: 200000 },
    { id: 's_four', title: '4명 지원 (40시간)', desc: '일반적인 3일장 기준 권장 접객 인원', price: 400000, recommended: true },
  ],
  shroud: [
    { id: 'sh_none', title: '개인 준비', desc: '수의를 사전에 미리 준비해 두신 경우', price: 0 },
    { id: 'sh_cotton', title: '기본 면 수의', desc: '피부에 닿아도 안전한 깔끔한 100% 면 수의', price: 150000, recommended: true },
    { id: 'sh_hemp', title: '고급 대마 수의', desc: '예의를 다하는 최고급 안동 대마 100% 수의', price: 350000 },
  ],
  urn: [
    { id: 'u_none', title: '매장 진행 / 개인 준비', desc: '매장하시거나 봉안함을 별도로 준비하신 경우', price: 0 },
    { id: 'u_ceramic', title: '일반 도자기 봉안함', desc: '습기에 강하고 단아한 기본 도자기함', price: 150000, recommended: true },
    { id: 'u_vacuum', title: '고급 진공 봉안함', desc: '결로를 막고 장기 보관에 최적화된 이중 진공함', price: 350000 },
  ]
};

export default function CustomPackagePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState({
    clothes: OPTIONS.clothes[1], // 기본 추천값
    vehicles: OPTIONS.vehicles[1],
    staff: OPTIONS.staff[2],
    shroud: OPTIONS.shroud[1],
    urn: OPTIONS.urn[1]
  });
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep, isFinished]);

  const handleSelect = (stepId, option) => {
    setSelections(prev => ({ ...prev, [stepId]: option }));
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const currentStepData = STEPS[currentStep];
  
  const totalPrice = BASE_PRICE + Object.values(selections).reduce((sum, opt) => sum + (opt ? opt.price : 0), 0);

  if (isFinished) {
    return (
      <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '6rem 1rem 4rem' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ fontSize: '3rem' }}>✨</span>
            <h1 style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--navy)', marginTop: '1rem', letterSpacing: '-0.03em' }}>
              나만의 상조 상품 구성 완료
            </h1>
            <p style={{ color: '#475569', fontSize: '1.05rem', marginTop: '0.5rem' }}>
              선택하신 항목들을 바탕으로 산출된 예상 견적입니다.
            </p>
          </div>

          <div style={{ background: 'white', borderRadius: '16px', padding: '2.5rem', boxShadow: '0 10px 40px rgba(0,44,95,0.08)', border: '1px solid #e2e8f0' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--navy)', borderBottom: '2px solid var(--gold)', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
              견적 상세 내역
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px dashed #cbd5e1' }}>
                <div>
                  <div style={{ fontWeight: '700', color: '#1e293b' }}>기본 제공 항목</div>
                  <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.2rem' }}>장례지도사 파견, 기본 오동나무 관, 입관/빈소 용품 일체</div>
                </div>
                <div style={{ fontWeight: '700', color: '#1e293b' }}>{BASE_PRICE.toLocaleString()}원</div>
              </div>

              {STEPS.map((step) => {
                const selectedOpt = selections[step.id];
                return (
                  <div key={step.id} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px dashed #cbd5e1' }}>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--gold-dark)', fontWeight: '700', marginBottom: '0.1rem' }}>{step.label}</div>
                      <div style={{ fontWeight: '600', color: '#334155' }}>{selectedOpt.title}</div>
                    </div>
                    <div style={{ fontWeight: '600', color: '#334155', alignSelf: 'flex-end' }}>
                      {selectedOpt.price > 0 ? `+${selectedOpt.price.toLocaleString()}원` : '0원'}
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: '2rem', background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '1.1rem', fontWeight: '700', color: '#475569' }}>총 예상 금액</span>
              <span style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--navy)' }}>{totalPrice.toLocaleString()}<span style={{ fontSize: '1.2rem', fontWeight: '700', marginLeft: '2px' }}>원</span></span>
            </div>
            <p style={{ textAlign: 'right', fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.75rem' }}>
              * 위 금액은 참고용이며, 장례식장 시설 사용료 및 식대는 별도입니다.
            </p>
          </div>

          <div style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <a href="tel:1551-5718" className="btn-primary" style={{ textAlign: 'center', padding: '1.25rem', fontSize: '1.2rem', borderRadius: '12px', width: '100%' }}>
              📞 위 구성으로 즉시 상담하기 (1551-5718)
            </a>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={() => setIsFinished(false)} style={{ flex: 1, padding: '1rem', background: 'white', color: 'var(--navy)', border: '1px solid #cbd5e1', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' }}>
                구성 수정하기
              </button>
              <Link href="/products" style={{ flex: 1, padding: '1rem', background: '#e2e8f0', color: '#334155', border: 'none', borderRadius: '12px', fontWeight: '700', textAlign: 'center', textDecoration: 'none' }}>
                완성된 패키지 보기
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '100px' }}>
      {/* Header Spacer */}
      <div style={{ height: '76px' }} />

      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '3rem' }}>
        
        {/* 상단 진행 상태 바 */}
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--navy)', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
            상조 직접 구성하기
          </h1>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '3px', background: '#e2e8f0', zIndex: 0, transform: 'translateY(-50%)' }} />
            <div style={{ position: 'absolute', top: '50%', left: 0, height: '3px', background: 'var(--gold)', zIndex: 1, transform: 'translateY(-50%)', width: `${(currentStep / (STEPS.length - 1)) * 100}%`, transition: 'width 0.3s ease' }} />
            
            {STEPS.map((step, idx) => (
              <div key={step.id} style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ 
                  width: '32px', height: '32px', borderRadius: '50%', 
                  background: idx <= currentStep ? 'var(--gold)' : '#fff', 
                  border: idx <= currentStep ? '2px solid var(--gold)' : '2px solid #cbd5e1',
                  color: idx <= currentStep ? '#fff' : '#94a3b8',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.9rem',
                  transition: 'all 0.3s'
                }}>
                  {idx + 1}
                </div>
                <div style={{ fontSize: '0.8rem', fontWeight: idx <= currentStep ? '700' : '500', color: idx <= currentStep ? 'var(--navy)' : '#94a3b8' }}>
                  {step.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 현재 스텝 컨텐츠 */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '2.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '0.5rem' }}>
            {currentStep + 1}단계: {currentStepData.label} 선택
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '2rem' }}>
            원하시는 {currentStepData.label} 옵션을 하나 선택해주세요.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {OPTIONS[currentStepData.id].map((opt) => {
              const isSelected = selections[currentStepData.id]?.id === opt.id;
              return (
                <div 
                  key={opt.id} 
                  onClick={() => handleSelect(currentStepData.id, opt)}
                  style={{ 
                    border: isSelected ? '2px solid var(--navy)' : '1px solid #cbd5e1',
                    background: isSelected ? '#f8fafc' : 'white',
                    borderRadius: '12px', padding: '1.5rem', cursor: 'pointer',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    transition: 'all 0.2s', position: 'relative', overflow: 'hidden'
                  }}
                >
                  {opt.recommended && (
                    <div style={{ position: 'absolute', top: 0, right: 0, background: 'var(--gold)', color: 'white', fontSize: '0.7rem', fontWeight: '800', padding: '0.2rem 0.75rem', borderRadius: '0 0 0 8px' }}>
                      추천
                    </div>
                  )}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <span style={{ fontSize: '1.15rem', fontWeight: '800', color: isSelected ? 'var(--navy)' : '#334155' }}>
                        {opt.title}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#64748b' }}>{opt.desc}</div>
                  </div>
                  <div style={{ fontWeight: '800', color: isSelected ? 'var(--navy)' : '#475569', fontSize: '1.1rem' }}>
                    {opt.price === 0 ? '기본 포함' : `+${opt.price.toLocaleString()}원`}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 이전/다음 버튼 */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between' }}>
          <button 
            onClick={handlePrev} 
            disabled={currentStep === 0}
            style={{ 
              padding: '1rem 2rem', borderRadius: '8px', fontWeight: '700', fontSize: '1rem',
              background: currentStep === 0 ? '#f1f5f9' : 'white', 
              color: currentStep === 0 ? '#cbd5e1' : '#475569',
              border: '1px solid #e2e8f0', cursor: currentStep === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            이전 단계
          </button>
          <button 
            onClick={handleNext}
            className="btn-primary"
            style={{ padding: '1rem 3rem', borderRadius: '8px', fontSize: '1.05rem', border: 'none' }}
          >
            {currentStep === STEPS.length - 1 ? '구성 완료 및 견적 보기' : '다음 단계'}
          </button>
        </div>

      </div>

      {/* 하단 고정 가격 표시 바 */}
      {!isFinished && (
        <div style={{ 
          position: 'fixed', bottom: 0, left: 0, right: 0, background: 'white',
          borderTop: '1px solid #e2e8f0', padding: '1rem 1.5rem', zIndex: 100,
          boxShadow: '0 -4px 20px rgba(0,0,0,0.05)'
        }}>
          <div className="container" style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>현재까지 합산된 견적</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--navy)' }}>
                {totalPrice.toLocaleString()}<span style={{ fontSize: '1rem', marginLeft: '2px' }}>원</span>
              </div>
            </div>
            <button onClick={handleNext} className="btn-primary" style={{ padding: '0.75rem 2rem', borderRadius: '8px' }}>
              {currentStep === STEPS.length - 1 ? '완료' : '다음'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
