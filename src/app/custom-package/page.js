'use client';
// Force redeploy

import { useState, useEffect } from 'react';
import Link from 'next/link';

// BASE_PRICE is dynamic based on altar selection

const STEPS = [
  { id: 'altar', label: '빈소', mainCopy: '남들이 정해준 비싼 패키지, 더 이상 손해 보지 마세요.', subCopy: '쓰지도 않을 품목 강요 없이, 우리 가족에게 꼭 필요한 장례 서비스만 직접 구성하세요.' },
  { id: 'clothes', label: '상복', mainCopy: '입지도 않을 상복까지 강제로 결제하고 계시진 않나요?', subCopy: '남상복 5만 원, 여상복 2만 원. 우리 가족 규모에 딱 맞게 꼭 필요한 수량만 합리적으로 대여하세요.' },
  { id: 'vehicles', label: '차량', mainCopy: '쓰지도 않을 고급 리무진, 억지로 탈 필요 없습니다.', subCopy: '리무진, 45인승 장의버스, 관내 앰뷸런스 중 장지 이동 거리와 유족 규모에 맞춰 필요한 차량만 선택하세요.' },
  { id: 'staff', label: '도우미', mainCopy: '조문객이 적은데 비싼 도우미 비용을 다 내실 건가요?', subCopy: '1명당 12만 원(10시간 기준). 예상되는 조문객 수에 딱 맞춰 꼭 필요한 인원만 투명하게 추가하세요.' },
  { id: 'shroud', label: '수의', mainCopy: '수의에 숨겨진 수백만 원의 거품을 완벽하게 뺐습니다.', subCopy: '10만 원대 면수의부터 고급 한복 수의까지. 고인을 모시는 마음만 생각하며 예산에 맞게 자유롭게 고르세요.' },
  { id: 'urn', label: '납골함', mainCopy: '마지막 모시는 길, 납골함 바가지 요금은 이제 없습니다.', subCopy: '기본 목함 3만 원부터 종교별 고급 도자기까지. 비싼 강매 없이 투명한 정찰제로 직접 선택하세요.' }
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
  
  const basePrice = selections.altar === 'a_none' ? 1200000 : 1150000;
  
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
    const koreanRegex = /^[가-힣]+$/;
    if (!koreanRegex.test(consultForm.name.trim().replace(/\s/g, ''))) {
      alert('상주명(고객명)은 한글로만 입력해주세요.');
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
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '700', color: '#1e293b' }}>
                    {selections.altar === 'a_none' ? '기본 제공 항목 (무빈소 기준)' : '기본 제공 항목 (빈소 마련 기준)'}
                  </div>
                  <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', padding: '1.25rem 1rem', background: '#f8fafc', borderRadius: '8px' }}>
                    {(selections.altar === 'a_none' ? [
                      '장례지도사 1명 (3일 진행)',
                      '입관지도사 1명 (염습, 입관 진행)',
                      '스프린터 8인승 리무진 1대',
                      '상주용품 3종 (완장, 리본, 장갑)',
                      <>입관용품 16종 (오동나무 화장 규격관, 관보, 결관바, 습신, 탈지면, 염지, 알코올, 예단, 기독경,<br/>천주경, 다라니경, 멧베, 천금, 지금, 장매, 보공, 한지, 베개, 수시포)</>,
                      '장례식장 안치실 예약',
                      '화장장 예약',
                      '장지(모실곳) 할인 및 예약',
                      '유품 정리 할인',
                      '산재, 재산 및 상속 법률 상담 무료'
                    ] : [
                      '장례지도사 1명 (3일 진행)',
                      '입관지도사 2명 (염습, 입관 진행)',
                      '빈소용품 (향, 초, 부의록, 명패, 위패, 운구장갑, 머리핀, 완장)',
                      <>입관용품 (관, 관보, 결관바, 습신, 탈지면, 염지, 알코올, 예단, 기독경, 천주경,<br/>다라니경, 멧베, 천금, 지금, 장매, 보공, 한지, 베개, 수시포)</>,
                      '장례식장 빈소 예약',
                      '모바일 부고 문자',
                      '화장장 예약',
                      '장지(모실곳) 할인 및 예약',
                      '유품 정리 할인',
                      '산재, 재산 및 상속 법률 상담 무료'
                    ]).filter(Boolean).map((benefit, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.85rem', color: '#475569', lineHeight: '1.6' }}>
                        <span style={{ color: 'var(--gold, #d4af37)', fontSize: '0.9rem', marginTop: '-0.05rem', fontWeight: 'bold' }}>✓</span>
                        <span style={{ wordBreak: 'keep-all' }}>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ fontWeight: '700', color: '#1e293b', whiteSpace: 'nowrap', marginLeft: '1rem' }}>{basePrice.toLocaleString()}원</div>
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
            <div style={{ marginTop: '1.5rem', padding: '1.5rem', background: '#f8fafc', borderRadius: '12px', fontSize: '0.85rem', color: '#64748b', lineHeight: '1.6', wordBreak: 'keep-all', border: '1px solid #e2e8f0' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: '#334155', marginBottom: '1rem' }}>[장례 서비스 이용 및 추가 비용 안내]</h4>
              
              <div style={{ marginBottom: '1rem' }}>
                <strong style={{ color: '#475569' }}>■ 기본 안내</strong>
                <ul style={{ paddingLeft: '1.2rem', marginTop: '0.3rem', marginBottom: '0' }}>
                  <li>현장 컨설팅을 통해 최적의 품목을 안내해 드리며, 다른 품목으로 대체는 어렵습니다. (매장 진행 시 관, 수의, 유골함 등 품목 변경)</li>
                  <li>장례식장 시설 이용료, 식대(접대 음식비), 제물 구입비는 장례식장에 직접 납부해 주셔야 합니다.</li>
                </ul>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <strong style={{ color: '#475569' }}>■ 일정 및 인력 추가</strong>
                <ul style={{ paddingLeft: '1.2rem', marginTop: '0.3rem', marginBottom: '0' }}>
                  <li>일정 연장(4·5일장 등): 3일장 초과 시 1일당 지도사 비용 20만 원 추가 (무빈소장 15만 원)</li>
                  <li>접객 도우미: 시간 초과 시 시간당 2만 원 추가 (시간당 공제 불가 / 22시 이후 교통비 20,000원 별도)</li>
                </ul>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <strong style={{ color: '#475569' }}>■ 차량 이용 추가</strong>
                <ul style={{ paddingLeft: '1.2rem', marginTop: '0.3rem', marginBottom: '0' }}>
                  <li>장의 차량: 기본 거리 초과 시 1km당 2천 원 추가 (관외 이용 시 거리와 상황에 따라 비용 책정)</li>
                  <li>리무진: 화장장까지 편도 운행 기준, 초과 시 1km당 2천 원 추가 (경유 요청 시 추가 경유비 발생)</li>
                </ul>
              </div>

              <div>
                <strong style={{ color: '#475569' }}>■ 취소 및 특수 상황</strong>
                <ul style={{ paddingLeft: '1.2rem', marginTop: '0.3rem', marginBottom: '0' }}>
                  <li>출동 후 취소: 취소 위약금 기본 25만 원 + 준비 완료된 품목 비용 추가 청구</li>
                  <li>진행 중 취소: 이미 배차 및 배치 완료된 품목은 취소 및 공제 불가</li>
                  <li>특수염: 사고사 등 발생 시 최대 50만 원 추가</li>
                </ul>
              </div>
            </div>
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
                    <button onClick={() => setActiveTermsModal('night')} style={{ background: 'none', border: 'none', fontSize: '0.8rem', color: '#94a3b8', textDecoration: 'underline', cursor: 'pointer' }}>보기</button>
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
                      {activeTermsModal === 'terms' ? '서비스 이용약관' : activeTermsModal === 'privacy' ? '개인정보 수집 및 이용 동의' : '긴급 상황 시 수신 동의(야간)'}
                    </h3>
                    <button onClick={() => setActiveTermsModal(null)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#64748b' }}>✕</button>
                  </div>
                  <div style={{ flex: 1, overflowY: 'auto', background: '#f8fafc', padding: '1rem', borderRadius: '8px', fontSize: '0.85rem', color: '#475569', lineHeight: '1.6' }}>
                    {activeTermsModal === 'terms' ? (
                      <>
                        <strong>제1조 (계약의 목적 및 당사자)</strong><br/>
                        본 약관은 가효상조(갑)가 이용자(을)에게 제공하는 후불제 상조서비스의 이용조건 및 절차를 규정함에 목적이 있습니다. '의사결정 대표자'는 장례 현장에서 '을'을 대리하여 서비스 변경 및 추가 비용을 승인할 권한을 가집니다.<br/><br/>
                        <strong>제2조 (불포함 비용 및 결제)</strong><br/>
                        1. 본 상품은 선납금 없는 후불제이며, 발인 전 최종 정산내역 확인 후 결제합니다.<br/>
                        2. 불포함 항목: 장례식장 이용료(빈소, 안치실 등), 조문객 식대, 화장 수수료, 제단 생화, 장지 비용 등 외부 시설 이용료는 '을'이 해당 시설에 직접 결제해야 합니다.<br/><br/>
                        <strong>제3조 (서비스 범위 및 추가 승인)</strong><br/>
                        '갑'은 상품별 규격과 수량을 준수합니다. 명시되지 않은 추가 서비스는 사전 단가 고지 및 '을'(또는 대표자)의 객관적 승인(문자, 서명 등)이 있는 경우에만 청구할 수 있습니다.<br/><br/>
                        <strong>제4조 (계약 해지 및 정산 기준)</strong><br/>
                        중도 해지 시 '갑'은 실제 투입된 원가를 정산하며, 최종 정산 시 또는 '을'의 요청 시 지체 없이 객관적 산출근거를 제시합니다.<br/>
                        1) 1단계(출동 전): 위약금 없음.<br/>
                        2) 2단계(배차·출동 후): 차량 및 인력 실비.<br/>
                        3) 3단계(용품 개봉 후): 인건비 및 재사용 불가 용품 실비.<br/>
                        4) 4단계(입관 후): 80% 한도 내 실제 원가.<br/>
                        5) 5단계(발인 후): 전액 청구(단, 미제공 항목 공제).<br/><br/>
                        <strong>제6조 (기타 보충 규정)</strong><br/>
                        1. 기준지: 거리 산정은 고인의 임종 장소 기준이며, 관외는 해당 행정구역 외 지역입니다.<br/>
                        2. 품질보증: 계약보다 낮은 품질 제공 시 동급 교환 또는 차액 환급을 이행합니다.<br/>
                        3. 분쟁해결: 1372 소비자상담센터를 통해 상담 및 분쟁조정 절차를 안내 받을 수 있습니다. 소송 시 민사소송법상 관할법원에 따릅니다.
                      </>
                    ) : activeTermsModal === 'privacy' ? (
                      <>
                        <strong>제5조 (개인정보 처리 상세 고지)</strong><br/><br/>
                        <strong>1. [필수] 수집목적/항목</strong><br/>
                        - 행사 이행 및 정산용(성명, 연락처, 관계, 주소(세금계산서 발행·환불 처리 필요 시) 등)<br/><br/>
                        <strong>2. [필수] 제3자 제공처별 목적</strong><br/>
                        - 장례식장(시설 이용), 화장장·봉안시설(예약 대행), 운송업체(운송 서비스), 결제업체(주식회사 오늘라이프상조)<br/><br/>
                        <strong>3. [필수] 제3자 제공항목/보유기간</strong><br/>
                        - 고인 성명, 계약자 성명/연락처, 사망일시 등 정보<br/>
                        - 제공처별 제공 목적 달성 시까지 보관
                      </>
                    ) : (
                      <>
                        <strong>[필수] 24시 긴급 대응을 위한 야간 통지 동의</strong><br/><br/>
                        가효상조는 고인의 임종 및 임종 임박 등 긴급한 조치가 필요한 상황이 심야 혹은 새벽 시간(오후 9시 ~ 익일 오전 8시)에 발생할 때를 대비하여, 고객님께 지체 없이 상황을 공유하고 장례를 접수하고자 합니다. 이에 따라 해당 시간대에 전화, 문자메시지, 카카오톡 등으로 안내 연락을 드릴 수 있습니다.<br/><br/>
                        <strong>※ 안내 사항</strong><br/>
                        귀하는 본 동의를 거부할 수 있으나, 긴급 상황 발생 시 즉각적인 연락이 원활하지 않으면 장례 차량 배차 및 화장장 예약 대행 등 필수 업무 지원이 불가능하므로 서비스 이용이 제한됩니다.
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
      <style>{`
        .hero-section {
          padding: 5rem 1rem;
        }
        .hero-title {
          font-size: 2.6rem;
          margin-bottom: 1.2rem;
        }
        .hero-sub {
          font-size: 1.15rem;
          margin-bottom: 3rem;
        }
        .config-container {
          padding-top: 3.5rem;
        }
        .progress-bar-container {
          margin-bottom: 3rem;
        }
        .hero-btn {
          padding: 1.2rem 3rem;
          font-size: 1.3rem;
        }
        @media (max-width: 768px) {
          .hero-section {
            padding: 2rem 1rem 1.5rem;
          }
          .hero-title {
            font-size: 1.5rem;
            margin-bottom: 0.8rem;
          }
          .hero-sub {
            font-size: 0.95rem;
            margin-bottom: 1rem;
            line-height: 1.4 !important;
          }
          .hero-btn {
            padding: 0.8rem 2rem;
            font-size: 1.05rem;
            margin-bottom: 0.5rem;
          }
          .config-container {
            padding-top: 1.5rem;
          }
          .progress-bar-container {
            margin-bottom: 1.5rem;
          }
        }
      `}</style>

      {/* Header Spacer */}
      <div style={{ height: '76px' }} />

      {/* Landing Hero Section */}
      {!isFinished && (
        <div className="hero-section" style={{ background: 'linear-gradient(135deg, var(--navy), #0a192f)', color: 'white', textAlign: 'center' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 className="hero-title" style={{ fontWeight: '900', wordBreak: 'keep-all', lineHeight: '1.3', letterSpacing: '-0.02em' }}>
              {STEPS[currentStep].mainCopy.split(', ').map((text, idx, arr) => (
                <span key={idx}>
                  {text}{idx < arr.length - 1 && ','}
                  {idx < arr.length - 1 && <br />}
                </span>
              ))}
            </h1>
            <p className="hero-sub" style={{ color: '#cbd5e1', wordBreak: 'keep-all', lineHeight: '1.6' }}>
              {STEPS[currentStep].subCopy.split('. ').map((text, idx, arr) => (
                <span key={idx}>
                  {text}{idx < arr.length - 1 && '.'}
                  {idx < arr.length - 1 && <br />}
                </span>
              ))}
            </p>
            <button 
              className="hero-btn"
              onClick={() => {
                const el = document.getElementById('config-start');
                if (el) {
                  const y = el.getBoundingClientRect().top + window.pageYOffset - 100;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                }
              }}
              style={{ background: '#f97316', color: 'white', fontWeight: '800', border: 'none', borderRadius: '50px', cursor: 'pointer', boxShadow: '0 10px 25px rgba(249, 115, 22, 0.4)', transition: 'all 0.2s', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              상조 직접 구성하기 👉
            </button>
          </div>
        </div>
      )}

      <div id="config-start" className="container config-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* 상단 진행 상태 바 */}
        <div className="progress-bar-container" style={{ textAlign: 'center' }}>
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
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '1.5rem' }}>
            {currentStep + 1}단계: {currentStepData.label} 선택
          </h2>

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
