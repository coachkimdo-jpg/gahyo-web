'use client';
// Force redeploy

import { useState, useEffect } from 'react';
import Link from 'next/link';

// BASE_PRICE is dynamic based on altar selection

const STEPS = [
  { id: 'altar', label: '빈소' },
  { id: 'clothes', label: '상복' },
  { id: 'vehicles', label: '차량' },
  { id: 'staff', label: '도우미' },
  { id: 'shroud', label: '수의' },
  { id: 'urn', label: '납골함' }
];

const OPTIONS = {
  altar: [
    { id: 'a_none', title: '빈소 없이 간소하게 (무빈소)', desc: '장례식장 빈소를 대여하지 않고 조용히 모십니다.', price: 0, type: 'radio' },
    { id: 'a_traditional', title: '빈소를 차려 전통대로', desc: '조문객을 맞이하고 제례를 지낼 빈소를 마련합니다.', price: 0, type: 'radio', recommended: true },
  ],
  clothes: [
    { id: 'c_m', title: '남자 상복', desc: '1벌 기준 (Y셔츠, 넥타이 포함)', price: 50000, type: 'counter' },
    { id: 'c_f', title: '여자 상복', desc: '1벌 기준', price: 20000, type: 'counter' },
  ],
  vehicles: [
    { id: 'v_amb', title: '앰블런스', desc: '자택이나 요양원, 요양병원처럼 장례식장이 함께 있지 않은 곳에서 임종하신 경우 필요한 서비스입니다. 고인을 장례식장 안치실까지 편안하게 모실 수 있도록 전용 앰뷸런스를 배차해 드립니다.', price: 100000, type: 'checkbox' },
    { id: 'v_sprinter', title: '스프린터(8인승)', desc: '소규모 가족 이동에 적합', price: 300000, type: 'checkbox' },
    { id: 'v_limo', title: '리무진', desc: '최고급 고인 전용 차량', price: 400000, type: 'checkbox' },
    { id: 'v_bus', title: '장의버스(45인승)', desc: '유족 및 조문객 이동용 대형 버스', note: '💡 장의버스 자체에 고인 이송 공간이 포함되어 있어, 버스 한 대로 고인과 유족이 함께 정중히 이동하실 수 있습니다. 리무진은 꼭 선택하지 않으셔도 됩니다.', price: 450000, type: 'checkbox' },
  ],
  staff: [
    { id: 's_count', title: '접객 도우미', desc: '1명당 총 10시간 지원 (2명 추가 시 총 20시간 지원)', note: '💡 무빈소의 경우, 접객 도우미가 필요하지 않습니다. 일반 장례 시에도 필요 시 현장에서 추가하실 수 있습니다.', price: 120000, type: 'counter' },
  ],
  shroud: [
    { id: 'sh_none', title: '선택 안 함 (개인 준비)', desc: '사전에 준비하신 경우', price: 0, type: 'radio' },
    { id: 'sh_cotton', title: '면수의', desc: '기본 면 100%', price: 100000, type: 'radio' },
    { id: 'sh_hanji', title: '친환경 전통한지수의', desc: '자연 친화적 소재', price: 300000, type: 'radio' },
    { id: 'sh_jeoma', title: '저마수의', desc: '고급 모시 재질', price: 400000, type: 'radio' },
    { id: 'sh_daema', title: '대마수의', desc: '최고급 대마', price: 500000, type: 'radio' },
    { id: 'sh_hanbok', title: '한복수의', desc: '전통 예절을 다하는 궁중 한복', price: 600000, type: 'radio' },
  ],
  urn: [
    { id: 'u_none', title: '선택 안 함 (개인 준비 등)', desc: '유골함을 별도 준비하시거나 매장하시는 경우', price: 0, type: 'radio' },
    { id: 'u_wood', title: '오동나무 목함', desc: '수목장, 자연장에 적합', price: 30000, type: 'radio' },
    { id: 'u_ceramic', title: '도자기 기본 유골함', desc: '습기에 강한 기본 도자기함', price: 150000, type: 'radio' },
    { id: 'u_religion', title: '종교별 도자기 유골함', desc: '천주교, 기독교, 불교 맞춤 각인', price: 700000, type: 'radio' },
  ]
};

export default function CustomPackagePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState({
    altar: 'a_traditional',
    clothes: { c_m: 0, c_f: 0 },
    vehicles: [],
    staff: { s_count: 0 },
    shroud: 'sh_none',
    urn: 'u_none'
  });
  const [isFinished, setIsFinished] = useState(false);
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const [consultForm, setConsultForm] = useState({ name: '', phone: '' });
  const [consents, setConsents] = useState({ terms: false, privacy: false, night: false });
  const [activeTermsModal, setActiveTermsModal] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep, isFinished]);

  const handleSelect = (stepId, opt) => {
    if (opt.type === 'radio') {
      setSelections(prev => ({ ...prev, [stepId]: opt.id }));
    } else if (opt.type === 'checkbox') {
      setSelections(prev => {
        const list = prev[stepId];
        if (list.includes(opt.id)) {
          return { ...prev, [stepId]: list.filter(x => x !== opt.id) };
        } else {
          return { ...prev, [stepId]: [...list, opt.id] };
        }
      });
    }
  };

  const handleCounter = (stepId, optId, delta) => {
    setSelections(prev => {
      const current = prev[stepId][optId] || 0;
      const next = current + delta;
      if (next < 0) return prev;
      return { ...prev, [stepId]: { ...prev[stepId], [optId]: next } };
    });
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
  
  const basePrice = selections.altar === 'a_none' ? 800000 : 1150000;
  
  let optionsPrice = 0;
  STEPS.slice(0, currentStep + 1).forEach(step => {
    const stepId = step.id;
    if (stepId === 'altar') return; // 빈소 기본 요금은 추가금에서 제외
    
    const selected = selections[stepId];
    if (typeof selected === 'string') {
      const opt = OPTIONS[stepId].find(o => o.id === selected);
      if (opt && opt.price > 0) optionsPrice += opt.price;
    } else if (Array.isArray(selected)) {
      selected.forEach(id => {
        const opt = OPTIONS[stepId].find(o => o.id === id);
        if (opt && opt.price > 0) optionsPrice += opt.price;
      });
    } else if (typeof selected === 'object') {
      Object.keys(selected).forEach(id => {
        const count = selected[id];
        const opt = OPTIONS[stepId].find(o => o.id === id);
        if (opt && count > 0 && opt.price > 0) optionsPrice += opt.price * count;
      });
    }
  });

  const finalTotalPrice = basePrice + optionsPrice;

  const handleConsultSubmit = async () => {
    if (!consultForm.name.trim() || !consultForm.phone.trim()) {
      alert('상주명과 연락처를 모두 입력해주세요.');
      return;
    }
    const phoneClean = consultForm.phone.replace(/[^0-9]/g, '');
    if (!phoneClean.startsWith('010') || phoneClean.length < 10) {
      alert('올바른 핸드폰 번호(010으로 시작)를 입력해주세요.');
      return;
    }
    if (!consents.terms || !consents.privacy || !consents.night) {
      alert('필수 이용약관 및 동의 항목에 모두 동의해주세요.');
      return;
    }

    setIsSubmitting(true);

    const stepTitleMap = { clothes: '상복', vehicles: '차량', staff: '도우미', shroud: '수의', urn: '납골함' };
    
    const estimateDetails = [
      { category: '기본 제공 항목', name: selections.altar === 'a_none' ? '무빈소 기준' : '빈소 마련 기준', price: basePrice },
      ...Object.keys(selections).filter(k => k !== 'altar').flatMap(stepId => {
        const selected = selections[stepId];
        const stepOpts = OPTIONS[stepId];
        if (Array.isArray(selected)) {
          return selected.map(id => {
            const opt = stepOpts.find(o => o.id === id);
            return { category: stepTitleMap[stepId], name: opt?.title, price: opt?.price || 0 };
          });
        } else if (typeof selected === 'object') {
          return Object.keys(selected).filter(key => selected[key] > 0).map(key => {
            const opt = stepOpts.find(o => o.id === key);
            return { category: stepTitleMap[stepId], name: `${opt?.title} (${selected[key]}${stepId === 'staff' ? '명' : '벌'})`, price: (opt?.price || 0) * selected[key] };
          });
        } else if (selected && selected !== 'sh_none' && selected !== 'u_none' && selected !== 'a_none' && selected !== 'a_traditional') {
           const opt = stepOpts.find(o => o.id === selected);
           return { category: stepTitleMap[stepId], name: opt?.title, price: opt?.price || 0 };
        }
        if (selected === 'sh_none' || selected === 'u_none') {
           const opt = stepOpts.find(o => o.id === selected);
           return { category: stepTitleMap[stepId], name: opt?.title, price: 0 };
        }
        return [];
      })
    ];

    try {
      const res = await fetch('/api/consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: consultForm.name,
          phone: consultForm.phone,
          totalPrice: finalTotalPrice,
          estimateDetails
        })
      });
      const data = await res.json();
      if (res.ok) {
        alert('상담 신청이 완료되었습니다. 곧 연락드리겠습니다.');
        setIsConsultModalOpen(false);
      } else {
        alert(data.error || '오류가 발생했습니다.');
      }
    } catch (e) {
      alert('전송 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
              선택한 항목에 따른 확정 견적입니다.
            </p>
          </div>

          <div style={{ background: 'white', borderRadius: '16px', padding: '2.5rem', boxShadow: '0 10px 40px rgba(0,44,95,0.08)', border: '1px solid #e2e8f0' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--navy)', borderBottom: '2px solid var(--gold)', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
              견적 상세 내역
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px dashed #cbd5e1' }}>
                <div>
                  <div style={{ fontWeight: '700', color: '#1e293b' }}>
                    {selections.altar === 'a_none' ? '기본 제공 항목 (무빈소 기준)' : '기본 제공 항목 (빈소 마련 기준)'}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.2rem' }}>
                    장례지도사 파견, 기본 오동나무 관, 입관{selections.altar !== 'a_none' && '/빈소'} 용품 일체
                  </div>
                </div>
                <div style={{ fontWeight: '700', color: '#1e293b' }}>{basePrice.toLocaleString()}원</div>
              </div>

              {STEPS.map((step) => {
                const selected = selections[step.id];
                let items = [];
                if (typeof selected === 'string') {
                  const opt = OPTIONS[step.id].find(o => o.id === selected);
                  if (opt && opt.price >= 0 && opt.id !== `${step.id}_none`) items.push({ title: opt.title, price: opt.price });
                } else if (Array.isArray(selected)) {
                  selected.forEach(id => {
                    const opt = OPTIONS[step.id].find(o => o.id === id);
                    if (opt) items.push({ title: opt.title, price: opt.price });
                  });
                } else if (typeof selected === 'object') {
                  Object.keys(selected).forEach(id => {
                    const count = selected[id];
                    if (count > 0) {
                      const opt = OPTIONS[step.id].find(o => o.id === id);
                      if (opt) items.push({ title: `${opt.title} (${count}${step.id === 'clothes' ? '벌' : '명'})`, price: opt.price * count });
                    }
                  });
                }

                if (items.length === 0) {
                   return (
                     <div key={step.id} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px dashed #cbd5e1' }}>
                       <div>
                         <div style={{ fontSize: '0.8rem', color: 'var(--gold-dark)', fontWeight: '700', marginBottom: '0.1rem' }}>{step.label}</div>
                         <div style={{ fontWeight: '600', color: '#334155' }}>선택 안 함</div>
                       </div>
                       <div style={{ fontWeight: '600', color: '#334155', alignSelf: 'flex-end' }}>0원</div>
                     </div>
                   );
                }

                if (step.id === 'altar') return null; // 빈소 선택은 기본 항목에서 보여주므로 생략

                return items.map((item, idx) => (
                  <div key={`${step.id}-${idx}`} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px dashed #cbd5e1' }}>
                    <div>
                      {idx === 0 && <div style={{ fontSize: '0.8rem', color: 'var(--gold-dark)', fontWeight: '700', marginBottom: '0.1rem' }}>{step.label}</div>}
                      <div style={{ fontWeight: '600', color: '#334155' }}>{item.title}</div>
                    </div>
                    <div style={{ fontWeight: '600', color: '#334155', alignSelf: 'flex-end' }}>
                      +{item.price.toLocaleString()}원
                    </div>
                  </div>
                ));
              })}
            </div>

            <div style={{ marginTop: '2rem', background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '1.1rem', fontWeight: '700', color: '#475569' }}>총 확정 금액</span>
              <span style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--navy)' }}>{finalTotalPrice.toLocaleString()}<span style={{ fontSize: '1.2rem', fontWeight: '700', marginLeft: '2px' }}>원</span></span>
            </div>
            <p style={{ textAlign: 'right', fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.75rem' }}>
              * 위 금액은 선택하신 내역에 해당하는 고정가격이며 장례식장, 화장, 장지 시설 사용료 및 식대는 별도입니다.
            </p>
          </div>

          <div style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button 
              onClick={() => setIsConsultModalOpen(true)}
              className="btn-primary" 
              style={{ textAlign: 'center', padding: '1.25rem', fontSize: '1.2rem', borderRadius: '12px', width: '100%', border: 'none', cursor: 'pointer' }}
            >
              위 구성으로 상담 예약하기
            </button>
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

        {isConsultModalOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem' }}>
            <div style={{ background: 'white', borderRadius: '16px', width: '100%', maxWidth: '400px', padding: '2.5rem 2rem', position: 'relative', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}>
              <button 
                onClick={() => setIsConsultModalOpen(false)}
                style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#64748b' }}
              >
                ✕
              </button>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1e293b', marginBottom: '0.75rem', lineHeight: '1.3' }}>막막한 장례,<br/>한번에 알아보세요.</h2>
              <p style={{ fontSize: '0.95rem', color: '#64748b', marginBottom: '2.5rem', wordBreak: 'keep-all', lineHeight: '1.5' }}>
                장례식장 빈소 할인, 장지 상담, 맞춤형 견적까지 전문 장례지도사가 고객님을 도와드립니다.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: '700', color: '#334155' }}>카카오톡 없이 서비스를 계속 이용할 수 있어요</span>
                <input 
                  type="text" 
                  placeholder="상주명(고객명)을 입력해주세요" 
                  value={consultForm.name}
                  onChange={(e) => setConsultForm({...consultForm, name: e.target.value})}
                  style={{ padding: '1rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '1rem', marginTop: '0.5rem', width: '100%', boxSizing: 'border-box' }}
                />
                <input 
                  type="tel" 
                  placeholder="핸드폰 번호를 입력해주세요" 
                  value={consultForm.phone}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, '');
                    setConsultForm({...consultForm, phone: val});
                  }}
                  maxLength={11}
                  style={{ padding: '1rem', border: '1px solid #cbd5e1', borderRadius: '8px', fontSize: '1rem', marginTop: '0.5rem', width: '100%', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ marginBottom: '2rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '1rem' }}>서비스 이용약관 및 동의 항목</span>
                
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', paddingBottom: '0.75rem', borderBottom: '1px solid #e2e8f0' }}>
                    <input 
                      type="checkbox" 
                      checked={consents.terms && consents.privacy && consents.night}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setConsents({ terms: checked, privacy: checked, night: checked });
                      }}
                      style={{ width: '1.25rem', height: '1.25rem', accentColor: '#f97316' }}
                    />
                    <span style={{ fontSize: '0.95rem', color: '#334155', fontWeight: '800' }}>전체 동의하기</span>
                  </label>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        checked={consents.terms}
                        onChange={(e) => setConsents({...consents, terms: e.target.checked})}
                        style={{ width: '1.1rem', height: '1.1rem', accentColor: '#f97316' }}
                      />
                      <span style={{ fontSize: '0.85rem', color: '#475569' }}>[필수] 서비스 이용약관</span>
                    </label>
                    <button onClick={() => setActiveTermsModal('terms')} style={{ background: 'none', border: 'none', fontSize: '0.8rem', color: '#94a3b8', textDecoration: 'underline', cursor: 'pointer' }}>보기</button>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        checked={consents.privacy}
                        onChange={(e) => setConsents({...consents, privacy: e.target.checked})}
                        style={{ width: '1.1rem', height: '1.1rem', accentColor: '#f97316' }}
                      />
                      <span style={{ fontSize: '0.85rem', color: '#475569' }}>[필수] 개인정보 수집, 이용, 제공 동의</span>
                    </label>
                    <button onClick={() => setActiveTermsModal('privacy')} style={{ background: 'none', border: 'none', fontSize: '0.8rem', color: '#94a3b8', textDecoration: 'underline', cursor: 'pointer' }}>보기</button>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        checked={consents.night}
                        onChange={(e) => setConsents({...consents, night: e.target.checked})}
                        style={{ width: '1.1rem', height: '1.1rem', accentColor: '#f97316' }}
                      />
                      <span style={{ fontSize: '0.85rem', color: '#475569' }}>[필수] 긴급 상황 시 수신 동의(야간)</span>
                    </label>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleConsultSubmit}
                disabled={isSubmitting}
                style={{ width: '100%', padding: '1.25rem', background: isSubmitting ? '#cbd5e1' : '#f97316', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: '800', cursor: isSubmitting ? 'not-allowed' : 'pointer', transition: 'background 0.2s' }}
              >
                {isSubmitting ? '전송 중...' : '문의하기'}
              </button>

              {activeTermsModal && (
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(255,255,255,0.98)', borderRadius: '16px', zIndex: 10, padding: '2rem', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1e293b' }}>
                      {activeTermsModal === 'terms' ? '서비스 이용약관' : '개인정보 수집 및 이용 동의'}
                    </h3>
                    <button onClick={() => setActiveTermsModal(null)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#64748b' }}>✕</button>
                  </div>
                  <div style={{ flex: 1, overflowY: 'auto', background: '#f8fafc', padding: '1rem', borderRadius: '8px', fontSize: '0.85rem', color: '#475569', lineHeight: '1.6' }}>
                    {activeTermsModal === 'terms' ? (
                      <>
                        제1조 (목적)<br/>
                        본 약관은 가효(이하 "회사")가 제공하는 상조 및 장례 관련 서비스의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임사항 등을 규정함을 목적으로 합니다.<br/><br/>
                        제2조 (서비스의 제공)<br/>
                        회사는 고객에게 장례식장 안내, 빈소 할인 상담, 맞춤형 견적 산출 및 기타 관련 서비스를 제공합니다.
                      </>
                    ) : (
                      <>
                        1. 수집하는 개인정보 항목<br/>
                        - 필수항목: 이름, 휴대전화번호<br/><br/>
                        2. 개인정보의 수집 및 이용 목적<br/>
                        - 장례 상담, 견적 안내, 서비스 이용 확인 및 고객 응대<br/><br/>
                        3. 개인정보의 보유 및 이용 기간<br/>
                        - 원칙적으로 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 일정 기간 동안 보존합니다.
                      </>
                    )}
                  </div>
                  <button onClick={() => setActiveTermsModal(null)} style={{ marginTop: '1rem', padding: '1rem', background: '#334155', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}>확인</button>
                </div>
              )}
            </div>
          </div>
        )}
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
              <div 
                key={step.id} 
                onClick={() => setCurrentStep(idx)}
                style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
              >
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
            {currentStepData.id === 'vehicles' ? '원하시는 차량을 모두 선택해주세요.' : 
             (currentStepData.id === 'clothes' || currentStepData.id === 'staff') ? '필요하신 수량(인원)을 조절해주세요.' : 
             '원하시는 옵션을 하나 선택해주세요.'}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {OPTIONS[currentStepData.id].map((opt) => {
              if (opt.type === 'counter') {
                 const count = selections[currentStepData.id][opt.id] || 0;
                 const isSelected = count > 0;
                 return (
                    <div key={opt.id} style={{ 
                      border: isSelected ? '2px solid var(--navy)' : '1px solid #cbd5e1',
                      background: isSelected ? '#f8fafc' : 'white',
                      borderRadius: '12px', padding: '1.5rem',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      transition: 'all 0.2s'
                    }}>
                       <div>
                         <div style={{ fontSize: '1.15rem', fontWeight: '800', color: isSelected ? 'var(--navy)' : '#334155' }}>{opt.title}</div>
                         <div style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '2px' }}>{opt.desc}</div>
                         <div style={{ fontWeight: '800', color: 'var(--navy)', fontSize: '1rem', marginTop: '6px' }}>+{opt.price.toLocaleString()}원</div>
                       </div>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#e2e8f0', padding: '6px', borderRadius: '8px' }}>
                         <button onClick={(e) => { e.stopPropagation(); handleCounter(currentStepData.id, opt.id, -1) }} style={{ width: '32px', height: '32px', border: 'none', background: 'white', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.1rem' }}>-</button>
                         <span style={{ fontWeight: '800', minWidth: '24px', textAlign: 'center', color: '#1e293b' }}>{count}</span>
                         <button onClick={(e) => { e.stopPropagation(); handleCounter(currentStepData.id, opt.id, 1) }} style={{ width: '32px', height: '32px', border: 'none', background: 'white', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.1rem' }}>+</button>
                       </div>
                    </div>
                 );
              }

              let isSelected = false;
              if (opt.type === 'radio') {
                 isSelected = selections[currentStepData.id] === opt.id;
              } else if (opt.type === 'checkbox') {
                 isSelected = selections[currentStepData.id].includes(opt.id);
              }

              return (
                <div 
                  key={opt.id} 
                  onClick={() => handleSelect(currentStepData.id, opt)}
                  style={{ 
                    border: isSelected ? '2px solid var(--navy)' : '1px solid #cbd5e1',
                    background: isSelected ? '#f8fafc' : 'white',
                    borderRadius: '12px', padding: '1.5rem', cursor: 'pointer',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ 
                      width: '22px', height: '22px', 
                      borderRadius: opt.type === 'radio' ? '50%' : '6px', 
                      border: isSelected ? '6px solid var(--navy)' : '2px solid #cbd5e1', 
                      background: isSelected ? 'white' : 'transparent',
                      transition: 'all 0.2s', flexShrink: 0
                    }} />
                    <div>
                      <div style={{ fontSize: '1.15rem', fontWeight: '800', color: isSelected ? 'var(--navy)' : '#334155' }}>
                        {opt.title}
                      </div>
                      {opt.desc && <div style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '2px' }}>{opt.desc}</div>}
                      {opt.note && (
                        <div style={{ fontSize: '0.8rem', color: '#0369a1', background: '#f0f9ff', padding: '0.6rem 0.8rem', borderRadius: '6px', marginTop: '0.6rem', lineHeight: '1.4', wordBreak: 'keep-all' }}>
                          {opt.note}
                        </div>
                      )}
                    </div>
                  </div>
                  <div style={{ fontWeight: '800', color: isSelected ? 'var(--navy)' : '#475569', fontSize: '1.1rem', whiteSpace: 'nowrap', flexShrink: 0 }}>
                    {opt.price > 0 && `+${opt.price.toLocaleString()}원`}
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
      {!isFinished && currentStep > 0 && (
        <div style={{ 
          position: 'fixed', bottom: 0, left: 0, right: 0, background: 'white',
          borderTop: '1px solid #e2e8f0', padding: '1rem 1.5rem', zIndex: 100,
          boxShadow: '0 -4px 20px rgba(0,0,0,0.05)'
        }}>
          <div className="container" style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>추가 선택 항목 합계 (기본요금 별도)</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--navy)' }}>
                {optionsPrice > 0 ? '+' : ''}{optionsPrice.toLocaleString()}<span style={{ fontSize: '1rem', marginLeft: '2px' }}>원</span>
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
