'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const REGION_DATA = {
  "전체": [],
  "서울특별시": ["강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구", "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구", "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구"],
  "부산광역시": ["강서구", "금정구", "기장군", "남구", "동구", "동래구", "부산진구", "북구", "사상구", "사하구", "서구", "수영구", "연제구", "영도구", "중구", "해운대구"],
  "대구광역시": ["남구", "달서구", "달성군", "동구", "북구", "서구", "수성구", "중구", "군위군"],
  "인천광역시": ["강화군", "계양구", "남동구", "동구", "미추홀구", "부평구", "서구", "연수구", "옹진군", "중구"],
  "광주광역시": ["광산구", "남구", "동구", "북구", "서구"],
  "대전광역시": ["대덕구", "동구", "서구", "유성구", "중구"],
  "울산광역시": ["남구", "동구", "북구", "울주군", "중구"],
  "세종특별자치시": ["세종시"],
  "경기도": ["고양시", "과천시", "광명시", "광주시", "구리시", "군포시", "김포시", "남양주시", "동두천시", "부천시", "성남시", "수원시", "시흥시", "안산시", "안성시", "안양시", "양주시", "여주시", "오산시", "용인시", "의왕시", "의정부시", "이천시", "파주시", "평택시", "포천시", "하남시", "화성시", "가평군", "양평군", "연천군"],
  "강원특별자치도": ["강릉시", "동해시", "삼척시", "속초시", "원주시", "춘천시", "태백시", "고성군", "양구군", "양양군", "영월군", "인제군", "정선군", "철원군", "평창군", "홍천군", "화천군", "횡성군"],
  "충청북도": ["제천시", "청주시", "충주시", "괴산군", "단양군", "보은군", "영동군", "옥천군", "음성군", "증평군", "진천군"],
  "충청남도": ["계룡시", "공주시", "논산시", "보령시", "서산시", "아산시", "천안시", "당진시", "금산군", "부여군", "서천군", "예산군", "청양군", "태안군", "홍성군"],
  "전북특별자치도": ["군산시", "김제시", "남원시", "익산시", "전주시", "정읍시", "고창군", "무주군", "부안군", "순창군", "완주군", "임실군", "장수군", "진안군"],
  "전라남도": ["광양시", "나주시", "목포시", "순천시", "여수시", "강진군", "고흥군", "곡성군", "구례군", "담양군", "무안군", "보성군", "신안군", "영광군", "영암군", "완도군", "장성군", "장흥군", "진도군", "함평군", "해남군", "화순군"],
  "경상북도": ["경산시", "경주시", "구미시", "김천시", "문경시", "상주시", "안동시", "영주시", "영천시", "포항시", "고령군", "봉화군", "성주군", "영덕군", "영양군", "예천군", "울릉군", "울진군", "의성군", "청도군", "청송군", "칠곡군"],
  "경상남도": ["거제시", "김해시", "밀양시", "사천시", "양산시", "진주시", "창원시", "통영시", "거창군", "고성군", "남해군", "산청군", "의령군", "창녕군", "하동군", "함안군", "함양군", "합천군"],
  "제주특별자치도": ["제주시", "서귀포시"]
};

const SIDO_OPTIONS = Object.keys(REGION_DATA).filter(s => s !== "전체");

const STEPS = ['지역 선택', '시군구 선택', '장례식장 선택', '조문객수 선택', '견적 결과'];

const GUEST_CATEGORIES = [
  { id: '0', label: '무빈소(0명)' },
  { id: '50-100', label: '50~100명' },
  { id: '100-200', label: '100~200명' },
  { id: '200-300', label: '200~300명' }
];

const GAHYO_PRODUCTS = {
  '0': {
    name: '가효 무빈소 170',
    price: '1,700,000',
    badge: '실속 장례',
    desc: '빈소 없이 가족끼리 조용히 모시는 1~2일장',
    highlights: ['장례지도사 1명 (염습 2명 파견)', '앰뷸런스 관내 / 유족전용 버스 200km', '면 수의 100%', '남상복 2복 / 여상복 2복'],
    href: '/products'
  },
  '50-100': {
    name: '가효 270',
    price: '2,700,000',
    badge: '추천 상품',
    desc: '합리적인 비용으로 치르는 표준 3일장',
    highlights: ['장례도우미 4명 (10시간)', '앰뷸런스 + 버스 200km', '친환경 전통한지수의', '남상복 3복 / 여상복 5복'],
    href: '/products'
  },
  '100-200': {
    name: '가효 330',
    price: '3,300,000',
    badge: '가장 많이 찾는',
    desc: '리무진이 포함된 품격 있는 3일장',
    highlights: ['장례도우미 5명 (10시간)', '리무진 200km + 버스 200km', '저마수의 (저마 100%)', '남상복 5복 / 여상복 7복'],
    href: '/products'
  },
  '200-300': {
    name: '가효 430',
    price: '4,300,000',
    badge: '프리미엄 VIP',
    desc: '장거리 이동이 가능한 최고급 프리미엄 장례',
    highlights: ['장례도우미 6명 (10시간)', '리무진 400km + 버스 400km', '대마수의 (대마 100%)', '남상복 7복 / 여상복 9복'],
    href: '/products'
  }
};

const SIDO_VARIATIONS = {
  "서울특별시": ["서울"],
  "부산광역시": ["부산"],
  "대구광역시": ["대구"],
  "인천광역시": ["인천"],
  "광주광역시": ["광주"],
  "대전광역시": ["대전"],
  "울산광역시": ["울산"],
  "세종특별자치시": ["세종"],
  "경기도": ["경기"],
  "강원특별자치도": ["강원"],
  "충청북도": ["충청북도", "충북"],
  "충청남도": ["충청남도", "충남"],
  "전북특별자치도": ["전북", "전라북도", "전북특별자치도"],
  "전라남도": ["전라남도", "전남"],
  "경상북도": ["경상북도", "경북"],
  "경상남도": ["경상남도", "경남"],
  "제주특별자치도": ["제주", "제주특별자치도", "제주도"]
};

export default function EstimatePage() {
  const [step, setStep] = useState(0);
  const [sido, setSido] = useState('');
  const [sigungu, setSigungu] = useState('');
  const [selectedHall, setSelectedHall] = useState(null);
  const [guestCategory, setGuestCategory] = useState('');
  const [result, setResult] = useState(null);

  const [loadingHalls, setLoadingHalls] = useState(false);
  const [loadingEstimate, setLoadingEstimate] = useState(false);
  const [availableHalls, setAvailableHalls] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const pSido = params.get('sido');
      const pSigungu = params.get('sigungu');
      const pHall = params.get('hall');
      const pCategory = params.get('category');

      if (pSido && pSigungu && pHall && pCategory) {
        setSido(pSido);
        setSigungu(pSigungu);
        setSelectedHall({ name: pHall });
        setGuestCategory(pCategory);
        setStep(4);
        
        setLoadingEstimate(true);
        fetch(`/api/estimate?hall=${encodeURIComponent(pHall)}&category=${encodeURIComponent(pCategory)}`)
          .then(res => res.json())
          .then(est => {
            setResult(est);
            setLoadingEstimate(false);
          })
          .catch(e => {
            console.error(e);
            setResult({
              min: 0,
              max: 0,
              details: { anchi: 0, ipgwan: 0, susi: 0, binso: 0, binsoName: '', gwanri: 0, chungso: 0, meal: 0, floralMin: 0, floralMax: 0 }
            });
            setLoadingEstimate(false);
          });
      }
    }
  }, []);

  const sigunguOptions = sido ? REGION_DATA[sido] : [];

  async function handleSigunguSelect(s) {
    setSigungu(s);
    setSelectedHall(null);
    setLoadingHalls(true);
    setStep(2);
    try {
      const res = await fetch(`/api/halls?sido=${encodeURIComponent(sido)}&sigungu=${encodeURIComponent(s)}&limit=100`);
      const json = await res.json();
      setAvailableHalls(json.data || []);
    } catch (e) {
      console.error(e);
      setAvailableHalls([]);
    } finally {
      setLoadingHalls(false);
    }
  }

  async function handleNext(overrideCategory) {
    const activeCategory = typeof overrideCategory === 'string' ? overrideCategory : guestCategory;
    if (step === 3) {
      setLoadingEstimate(true);
      try {
        const res = await fetch(`/api/estimate?hall=${encodeURIComponent(selectedHall.name)}&category=${encodeURIComponent(activeCategory)}`);
        const est = await res.json();
        setResult(est);
      } catch (e) {
        console.error(e);
        setResult({
          min: 0,
          max: 0,
          details: { anchi: 0, ipgwan: 0, susi: 0, binso: 0, binsoName: '', gwanri: 0, chungso: 0, meal: 0, floralMin: 0, floralMax: 0 }
        });
      } finally {
        setLoadingEstimate(false);
      }
      setStep(4);
    } else {
      setStep((s) => s + 1);
    }
  }

  function handleBack() { 
    setStep((s) => Math.max(0, s - 1)); 
  }
  
  function handleReset() { 
    setStep(0); 
    setSido(''); 
    setSigungu(''); 
    setSelectedHall(null); 
    setGuestCategory(''); 
    setResult(null); 
  }

  let canNext = false;
  if (step === 0) canNext = !!sido;
  if (step === 1) canNext = !!sigungu;
  if (step === 2) canNext = !!selectedHall;
  if (step === 3) canNext = !!guestCategory;

  const handleShare = async () => {
    const url = new URL(window.location.href);
    if (sido) url.searchParams.set('sido', sido);
    if (sigungu) url.searchParams.set('sigungu', sigungu);
    if (selectedHall) url.searchParams.set('hall', selectedHall.name);
    if (guestCategory) url.searchParams.set('category', guestCategory);

    const shareUrl = url.toString();
    const shareData = {
      title: '가효상조 장례 견적',
      text: '나에게 맞는 맞춤형 장례 견적 결과를 확인해보세요.',
      url: shareUrl,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (e) {
        console.log('공유하기가 취소되었거나 실패했습니다.', e);
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert('견적 결과 링크가 클립보드에 복사되었습니다.');
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <>
      {/* Hero */}
      <div className="page-hero">
        <div className="container">
          <span className="section-label" style={{ color: 'rgba(201,168,76,0.9)' }}>AI 장례 견적 계산기</span>
          <h1 className="page-hero-title">지역별 장례비용 무료 견적</h1>
          <p className="page-hero-desc">지역·장례식장·조문객 수를 선택하면 빈소 대여료, 식대, 제단비 등 항목별 예상 비용을 즉시 투명하게 안내해 드립니다.</p>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1rem', marginTop: '1.5rem' }}>
            {/* BLUF 요약 (AI 검색 인용 최적화) */}
            <div style={{ maxWidth: '680px', padding: '1rem 1.5rem', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.18)', textAlign: 'left' }}>
              <p style={{ color: 'rgba(255,255,255,0.92)', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
                <strong style={{ color: 'var(--gold)' }}>이 계산기는 가효상조가 실제 장례식장 고지 요금을 기반으로 만든 무료 견적 도구입니다.</strong><br />
                상조 상품 금액과 별개로 발생하는 <strong>장례식장 시설 실비</strong>(안치실·입관실·빈소·식대)를 지역별로 즉시 확인할 수 있습니다.
              </p>
            </div>

            {/* E-E-A-T 신뢰도 배지 */}
            <div style={{ display: 'inline-flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', padding: '0.7rem 1.25rem', background: 'rgba(255,255,255,0.08)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.1rem' }}>🏢</span>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.55)' }}>데이터 수집 및 검수</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'white' }}>가효상조 수석 장례지도사</div>
                </div>
              </div>
              <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.2)' }} />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.55)' }}>최종 업데이트</div>
                <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'white' }}>{today}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '3rem 1.25rem', maxWidth: '800px' }}>
        {/* Step Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '3rem' }}>
          {STEPS.map((label, i) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', position: 'relative' }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: '700', fontSize: '0.875rem', transition: 'all 0.3s',
                  background: i < step ? 'var(--gold)' : i === step ? 'var(--navy)' : 'var(--gray-bg)',
                  color: i <= step ? 'white' : 'var(--text-secondary)',
                  border: i > step ? '1px solid var(--border-color)' : 'none'
                }}>
                  {i < step ? '✓' : i + 1}
                </div>
                <span style={{ fontSize: '0.75rem', color: i === step ? 'var(--navy)' : 'var(--text-secondary)', fontWeight: i === step ? '700' : '500', whiteSpace: 'nowrap', position: 'absolute', top: '45px' }}>{label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div style={{ flex: 1, height: '3px', background: i < step ? 'var(--gold)' : 'var(--gray-bg)', margin: '0 0.5rem', transition: 'background 0.3s' }} />
              )}
            </div>
          ))}
        </div>

        <div className="card" style={{ padding: '3rem 2.5rem' }}>

          {/* Step 0: 지역 선택 */}
          {step === 0 && (
            <div>
              <h2 style={{ fontWeight: '700', color: 'var(--navy)', fontSize: '1.5rem', marginBottom: '0.75rem' }}>어느 지역에서 장례를 모실 계획이신가요?</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '2rem' }}>해당 시/도를 선택해 주세요.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.75rem' }}>
                {SIDO_OPTIONS.map((s) => (
                  <button key={s} onClick={() => { setSido(s); setSigungu(''); setSelectedHall(null); setTimeout(() => setStep(1), 300); }} style={{
                    padding: '1rem 0.5rem', borderRadius: 'var(--radius-md)', fontFamily: 'inherit',
                    fontWeight: '600', fontSize: '1rem', cursor: 'pointer', transition: 'all 0.2s',
                    background: sido === s ? 'var(--navy)' : 'white',
                    color: sido === s ? 'white' : 'var(--text-primary)',
                    border: sido === s ? '2px solid var(--navy)' : '2px solid var(--border-color)',
                  }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 1: 시/군/구 선택 */}
          {step === 1 && (
            <div>
              <h2 style={{ fontWeight: '700', color: 'var(--navy)', fontSize: '1.5rem', marginBottom: '0.75rem' }}>{sido}의 어느 시/군/구를 원하시나요?</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '2rem' }}>해당 시/군/구를 선택해 주세요.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '0.75rem' }}>
                {sigunguOptions.map((s) => (
                  <button key={s} onClick={() => handleSigunguSelect(s)} style={{
                    padding: '0.875rem 0.5rem', borderRadius: 'var(--radius-md)', fontFamily: 'inherit',
                    fontWeight: '600', fontSize: '0.95rem', cursor: 'pointer', transition: 'all 0.2s',
                    background: sigungu === s ? 'var(--navy)' : 'white',
                    color: sigungu === s ? 'white' : 'var(--text-primary)',
                    border: sigungu === s ? '2px solid var(--navy)' : '2px solid var(--border-color)',
                  }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: 장례식장 선택 */}
          {step === 2 && (
            <div>
              <h2 style={{ fontWeight: '700', color: 'var(--navy)', fontSize: '1.5rem', marginBottom: '0.75rem' }}>장례식장을 선택해 주세요</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '2rem' }}>{sido} {sigungu} 지역의 제휴 장례식장입니다.</p>
              
              {loadingHalls ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>장례식장 목록을 불러오는 중...</div>
              ) : availableHalls.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '400px', overflowY: 'auto', paddingRight: '0.5rem' }}>
                  {availableHalls.map((hall) => (
                    <div 
                      key={hall.id} 
                      onClick={() => { setSelectedHall(hall); setTimeout(() => setStep(3), 300); }}
                      style={{
                        padding: '1.25rem', borderRadius: 'var(--radius-md)', cursor: 'pointer', transition: 'all 0.2s',
                        background: selectedHall?.id === hall.id ? 'var(--navy-light)' : 'white',
                        border: selectedHall?.id === hall.id ? '2px solid var(--navy)' : '2px solid var(--border-color)',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: '700', color: 'var(--navy)', fontSize: '1.1rem', marginBottom: '0.25rem' }}>{hall.name}</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>📍 {hall.address}</div>
                      </div>
                      <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: selectedHall?.id === hall.id ? '6px solid var(--navy)' : '2px solid var(--border-color)' }}></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state" style={{ padding: '3rem 1rem' }}>
                  <p style={{ fontSize: '2rem', marginBottom: '1rem' }}>🏢</p>
                  <p style={{ fontWeight: '600', color: 'var(--navy)' }}>해당 지역에 등록된 장례식장이 없습니다.</p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>이전 단계로 돌아가 다른 지역을 선택해 보세요.</p>
                </div>
              )}
            </div>
          )}

          {/* Step 3: 조문객 수 선택 */}
          {step === 3 && (
            <div>
              <h2 style={{ fontWeight: '700', color: 'var(--navy)', fontSize: '1.5rem', marginBottom: '0.75rem' }}>예상 조문객 수를 선택해 주세요</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '2rem' }}>조문객 수에 따라 적정 빈소 규모와 식사 비용이 책정됩니다.</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                {GUEST_CATEGORIES.map((cat) => (
                  <button 
                    key={cat.id} 
                    onClick={() => { setGuestCategory(cat.id); setTimeout(() => handleNext(cat.id), 300); }} 
                    disabled={loadingEstimate}
                    style={{
                      padding: '1.5rem', borderRadius: 'var(--radius-md)', fontFamily: 'inherit',
                      fontWeight: '700', fontSize: '1.1rem', cursor: 'pointer', transition: 'all 0.2s',
                      background: guestCategory === cat.id ? 'var(--navy)' : 'white',
                      color: guestCategory === cat.id ? 'white' : 'var(--navy)',
                      border: guestCategory === cat.id ? '2px solid var(--navy)' : '2px solid var(--border-color)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem'
                    }}
                  >
                    {cat.id === '0' ? '🕊️' : '👥'} {cat.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: 결과 */}
          {step === 4 && result && selectedHall && !loadingEstimate && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🧾</div>
                <h2 style={{ fontWeight: '800', color: 'var(--navy)', fontSize: '1.75rem', marginBottom: '0.375rem' }}>AI 맞춤 견적 리포트</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
                  <strong>{selectedHall.name}</strong> · {GUEST_CATEGORIES.find(c => c.id === guestCategory)?.label} 기준
                </p>
              </div>
              <div style={{ background: 'linear-gradient(135deg, var(--navy) 0%, #003a7a 100%)', borderRadius: 'var(--radius-lg)', padding: '2.5rem', textAlign: 'center', marginBottom: '2rem', color: 'white', boxShadow: 'var(--shadow-lg)' }}>
                <p style={{ fontSize: '0.95rem', opacity: 0.8, marginBottom: '0.75rem' }}>예상 견적 범위</p>
                <p style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--gold)', marginBottom: '0.25rem', letterSpacing: '-1px' }}>
                  {Math.round(result.min / 10000).toLocaleString()}만원 ~ {Math.round(result.max / 10000).toLocaleString()}만원
                </p>
                <p style={{ fontSize: '0.85rem', opacity: 0.6, marginTop: '1rem' }}>* 실제 비용은 상차림, 제단 장식 등에 따라 달라질 수 있습니다</p>
              </div>
              
              <div style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '2rem' }}>
                <div style={{ padding: '1rem 1.25rem', background: 'var(--gray-bg)', fontWeight: '700', color: 'var(--navy)', fontSize: '1.05rem', borderBottom: '2px solid var(--border-color)' }}>
                  장례식장 시설 사용료 (예상)
                  <span style={{ float: 'right', color: 'var(--gold-dark)' }}>{Math.round((result.details.anchi + result.details.ipgwan + result.details.susi + result.details.binso + result.details.gwanri + result.details.chungso) / 10000).toLocaleString()}만원</span>
                </div>
                <div style={{ padding: '0.5rem 0', background: 'white' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '0.25rem', padding: '0.5rem 1.25rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    <span>└ 안치실 사용료 (48시간)</span><span style={{ fontWeight: '500', color: 'var(--navy)' }}>{Math.round(result.details.anchi / 10000).toLocaleString()}만원</span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '0.25rem', padding: '0.5rem 1.25rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    <span>└ 입관실 사용료 (1회)</span><span style={{ fontWeight: '500', color: 'var(--navy)' }}>{Math.round(result.details.ipgwan / 10000).toLocaleString()}만원</span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '0.25rem', padding: '0.5rem 1.25rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    <span>└ 수시/위생비</span><span style={{ fontWeight: '500', color: 'var(--navy)' }}>{Math.round(result.details.susi / 10000).toLocaleString()}만원</span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '0.25rem', padding: '0.5rem 1.25rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    <span>└ 빈소 사용료 {result.details.binsoName ? `(${result.details.binsoName})` : ''}</span><span style={{ fontWeight: '500', color: 'var(--navy)' }}>{Math.round(result.details.binso / 10000).toLocaleString()}만원</span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '0.25rem', padding: '0.5rem 1.25rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    <span>└ 관리 및 청소비</span><span style={{ fontWeight: '500', color: 'var(--navy)' }}>{Math.round((result.details.gwanri + result.details.chungso) / 10000).toLocaleString()}만원</span>
                  </div>
                </div>

                <div style={{ padding: '1rem 1.25rem', background: 'var(--gray-bg)', fontWeight: '700', color: 'var(--navy)', fontSize: '1.05rem', borderTop: '2px solid var(--border-color)', borderBottom: '2px solid var(--border-color)' }}>
                  예상 식음료비
                  <span style={{ float: 'right', color: 'var(--gold-dark)' }}>{Math.round(result.details.meal / 10000).toLocaleString()}만원</span>
                </div>
                <div style={{ padding: '0.5rem 0', background: 'white' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '0.25rem', padding: '0.5rem 1.25rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    <span>└ 조문객 식대 (선택 구간 기준)</span><span style={{ fontWeight: '500', color: 'var(--navy)' }}>{Math.round(result.details.meal / 10000).toLocaleString()}만원</span>
                  </div>
                </div>

                <div style={{ padding: '1rem 1.25rem', background: 'var(--gray-bg)', fontWeight: '700', color: 'var(--navy)', fontSize: '1.05rem', borderTop: '2px solid var(--border-color)', borderBottom: '2px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ wordBreak: 'keep-all' }}>제단 꽃 장식 및 제사 상차림비</span>
                  <span style={{ color: 'var(--gold-dark)', whiteSpace: 'nowrap', flexShrink: 0 }}>{Math.round(result.details.floralMin / 10000).toLocaleString()}만원 ~ {Math.round(result.details.floralMax / 10000).toLocaleString()}만원</span>
                </div>
                <div style={{ padding: '0.5rem 0', background: 'white' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', padding: '0.5rem 1.25rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    <span style={{ wordBreak: 'keep-all', flex: 1 }}>└ 제단 장식 및 제사상 (선택 변동 가능)</span>
                    <span style={{ fontWeight: '600', color: 'var(--navy)', textAlign: 'right', whiteSpace: 'nowrap', flexShrink: 0 }}>
                      {Math.round(result.details.floralMin / 10000).toLocaleString()}만원 ~ {Math.round(result.details.floralMax / 10000).toLocaleString()}만원
                    </span>
                  </div>
                </div>
              </div>
              
              {/* 가효상조 추천 상품 */}
              {(() => {
                const rec = GAHYO_PRODUCTS[guestCategory];
                if (!rec) return null;
                return (
                  <div style={{
                    border: '2px solid var(--gold)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1.75rem',
                    marginBottom: '2rem',
                    background: 'linear-gradient(135deg, #fffdf5 0%, #fff9e8 100%)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      position: 'absolute', top: 0, right: 0,
                      background: 'var(--navy)', color: 'var(--gold)',
                      padding: '0.4rem 1.1rem',
                      borderBottomLeftRadius: 'var(--radius-md)',
                      fontWeight: '700', fontSize: '0.8rem'
                    }}>{rec.badge}</div>

                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
                      <div style={{ flex: 1, minWidth: '200px' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--gold-dark)', fontWeight: '700', marginBottom: '0.35rem', letterSpacing: '0.04em', paddingRight: '5rem' }}>🎁 선택하신 조문객 수에 맞는 가효상조 추천 상품</div>
                        <div style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '0.35rem' }}>{rec.name}</div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>{rec.desc}</div>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                          {rec.highlights.map((h, i) => (
                            <li key={i} style={{ fontSize: '0.9rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <span style={{ color: 'var(--gold)', fontWeight: '700' }}>✓</span> {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', minWidth: '160px', paddingTop: '1.5rem' }}>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>상품 가격</div>
                          <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--gold-dark)' }}>{rec.price}<span style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>원</span></div>
                        </div>
                        <Link href={rec.href} style={{
                          background: 'var(--navy)', color: 'white',
                          padding: '0.75rem 1.5rem',
                          borderRadius: 'var(--radius-sm)',
                          fontWeight: '700', fontSize: '0.95rem',
                          textDecoration: 'none', textAlign: 'center', width: '100%'
                        }}>상품 자세히 보기 →</Link>
                      </div>
                    </div>
                  </div>
                );
              })()}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.8rem' }}>
                <a href="tel:1551-5718" className="btn-primary" style={{ textAlign: 'center', padding: '1.25rem', fontSize: '1.1rem' }}>📞 전문 장례지도사 1:1 무료 상담</a>
                <button onClick={handleShare} className="btn-secondary" style={{ padding: '1.25rem', fontSize: '1.1rem', background: '#f8f9fa', borderColor: '#d1d5db', color: '#374151' }}>🔗 견적 결과 공유하기</button>
                <button onClick={handleReset} className="btn-secondary" style={{ padding: '1.25rem', fontSize: '1.1rem' }}>처음부터 다시하기</button>
              </div>
            </div>
          )}

          {/* 하단 버튼 (결과 페이지 이전) */}
          {step < 4 && (
            <div style={{ display: 'flex', gap: '1rem', marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
              {step > 0 && <button onClick={handleBack} className="btn-secondary" style={{ flex: 1, padding: '1rem' }}>← 이전 단계</button>}
              <button onClick={() => handleNext()} disabled={!canNext || loadingEstimate} className="btn-primary" style={{ flex: step > 0 ? 2 : 1, padding: '1rem', opacity: canNext && !loadingEstimate ? 1 : 0.5, cursor: canNext && !loadingEstimate ? 'pointer' : 'not-allowed', transition: 'all 0.2s' }}>
                {loadingEstimate ? '계산 중...' : step === 3 ? '🧮 견적 산출하기' : '다음 단계 →'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── 정적 SEO 콘텐츠 영역 (FAQ + 이용 안내) ── */}
      <div className="container" style={{ padding: '0 1.25rem 5rem', maxWidth: '800px' }}>

        {/* 이용 방법 (HowTo 스키마 시각화) */}
        <section style={{ marginTop: '3rem', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: '3px solid var(--gold)' }}>
            📋 견적 계산기 이용 방법 (4단계)
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
            {[
              { step: '01', icon: '🗺️', title: '시/도 선택', desc: '장례를 모실 광역시·도를 선택합니다.' },
              { step: '02', icon: '📍', title: '시/군/구 선택', desc: '해당 지역의 세부 행정구역을 선택합니다.' },
              { step: '03', icon: '🏛️', title: '장례식장 선택', desc: '원하는 장례식장을 목록에서 선택합니다.' },
              { step: '04', icon: '👥', title: '조문객 수 선택', desc: '예상 조문객 수를 선택하면 즉시 견적이 산출됩니다.' },
            ].map(item => (
              <div key={item.step} style={{ background: 'white', borderRadius: '12px', padding: '1.25rem', textAlign: 'center', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>{item.icon}</div>
                <div style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--gold-dark)', marginBottom: '0.25rem' }}>STEP {item.step}</div>
                <h3 style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '0.35rem' }}>{item.title}</h3>
                <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 견적 항목 설명 (정보성 콘텐츠) */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: '3px solid var(--gold)' }}>
            💡 견적 항목 설명 — 무엇이 포함되나요?
          </h2>
          <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 2fr', padding: '0.9rem 1.25rem', background: 'var(--navy)', color: 'white', fontWeight: '700', fontSize: '0.9rem' }}>
              <span>항목</span><span>설명</span>
            </div>
            {[
              ['안치실 사용료', '임종 후 발인까지 고인을 모시는 공간 이용 요금 (48시간 기준)'],
              ['입관실 사용료', '입관 의식을 진행하는 공간 이용 요금 (1회)'],
              ['빈소 사용료', '조문객을 맞이하는 빈소 공간 대여 요금 (규모별 상이)'],
              ['관리 및 청소비', '빈소 청결 유지와 시설 관리 비용'],
              ['조문객 식대', '조문객 식사 비용 (인원수 × 평균 단가 기준 추정)'],
              ['제단 장식·제사상', '꽃 장식 및 제사 상차림 비용 (선택 사항, 범위 제시)'],
            ].map(([label, desc], i) => (
              <div key={label} style={{ display: 'grid', gridTemplateColumns: '1.5fr 2fr', padding: '0.9rem 1.25rem', background: i % 2 === 0 ? 'white' : '#f8fafc', borderTop: '1px solid #e2e8f0', alignItems: 'center' }}>
                <span style={{ fontWeight: '700', color: '#334155', fontSize: '0.9rem' }}>{label}</span>
                <span style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.5 }}>{desc}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.75rem', textAlign: 'right' }}>* 화장장 이용료·납골당 비용은 지역별 편차가 커 별도 상담으로 안내드립니다.</p>
        </section>

        {/* FAQ 섹션 (롱테일 질문형 키워드 최적화) */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: '3px solid var(--gold)' }}>
            자주 묻는 질문 (FAQ)
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {[
              {
                q: '장례비용 견적에 가효상조 상품 금액도 포함되나요?',
                a: '아니요. 이 계산기는 장례식장 시설 사용료, 식대, 제단 비용 등 현장 실비만 계산합니다. 가효상조의 의전 서비스 상품가(장례지도사, 수의, 차량 등)는 별도로 투명하게 안내됩니다. 두 금액을 합산하면 총 예상 장례비용이 됩니다.'
              },
              {
                q: '견적 결과와 실제 비용 차이는 얼마나 되나요?',
                a: '이 계산기는 장례식장 실제 고지 요금과 평균 식대를 기반으로 산출한 예상값입니다. 빈소 등급, 제단 장식 수준, 실제 조문객 수에 따라 ±20% 내외의 차이가 발생할 수 있습니다. 보다 정확한 견적은 가효상조 1:1 전화 상담(1551-5718)을 통해 확인해 주세요.'
              },
              {
                q: '화장장 이용료와 납골당 비용은 왜 견적에 포함되지 않나요?',
                a: '화장장 이용료는 지자체별로 큰 차이가 있고, 납골당·자연장지 등 장지 비용은 선택에 따라 수십만 원에서 수천만 원까지 편차가 매우 큽니다. 이 부분은 가효상조 상담 시 정확한 내역을 분리하여 안내해 드립니다.'
              },
            ].map((faq, i) => (
              <article key={i} style={{ background: 'white', borderRadius: '12px', padding: '1.75rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#1e293b', marginBottom: '0.75rem', display: 'flex', gap: '0.5rem' }}>
                  <span style={{ color: '#c0392b', flexShrink: 0 }}>Q.</span> {faq.q}
                </h3>
                <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.7, paddingLeft: '1.7rem', margin: 0 }}>
                  <strong style={{ color: 'var(--gold-dark)', marginRight: '0.3rem' }}>A.</strong>{faq.a}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* CTA 배너 */}
        <section style={{ background: 'var(--navy)', borderRadius: '12px', padding: '2.5rem', textAlign: 'center', color: 'white' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '0.75rem' }}>정확한 장례비용, 전문가와 직접 확인하세요</h2>
          <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.75rem', maxWidth: '520px', margin: '0 auto 1.75rem' }}>
            AI 견적은 참고용입니다. 1:1 전담 장례지도사 상담을 통해 우리 가족에게 꼭 맞는 정확한 비용을 투명하게 안내받으세요.
          </p>
          <a href="tel:1551-5718" style={{ display: 'inline-block', background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))', color: '#0f172a', padding: '1rem 2.5rem', borderRadius: '999px', fontWeight: '900', fontSize: '1.1rem', textDecoration: 'none', boxShadow: '0 4px 20px rgba(201,168,76,0.4)' }}>
            📞 1551-5718 무료 상담
          </a>
        </section>
      </div>
    </>
  );
}
