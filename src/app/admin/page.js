'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { funeralHalls } from '@/lib/mockDb';

const TABS = ['장례식장 관리', '견적 로그', '게시판 관리', '시스템 설정', '고객 문의 관리'];

const MODULE_LIST = [
  { key: 'slider', label: '이미지 슬라이더', icon: '🖼️', desc: '장례식장 사진 갤러리' },
  { key: 'description', label: '시설 안내 텍스트', icon: '📋', desc: '시설 설명 및 주요 정보' },
  { key: 'pricing', label: '비용 표', icon: '💰', desc: '빈소 및 식사 요금표' },
  { key: 'map', label: '지도 API', icon: '🗺️', desc: '위치 안내 지도' },
  { key: 'consult', label: '상담하기 버튼', icon: '📞', desc: '전화 상담 연결 버튼' },
];

const mockEstimateLogs = [
  { id: 1, region: '서울', guests: 150, options: ['flower', 'premium_shroud'], price: 8200000, contacted: true, createdAt: '2025-05-10 14:32' },
  { id: 2, region: '경기', guests: 80, options: ['video_tribute'], price: 5100000, contacted: false, createdAt: '2025-05-11 09:15' },
  { id: 3, region: '대구', guests: 200, options: ['flower', 'limousine'], price: 9800000, contacted: true, createdAt: '2025-05-11 16:48' },
  { id: 4, region: '인천', guests: 50, options: [], price: 3800000, contacted: false, createdAt: '2025-05-12 11:20' },
];

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedHall, setSelectedHall] = useState(null);
  
  // 게시판 관리 상태
  const [articles, setArticles] = useState([]);
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [aiKeyword, setAiKeyword] = useState('');
  const [selectedGuidelines, setSelectedGuidelines] = useState([]);
  const [customGuideline, setCustomGuideline] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  // 고객 문의 관리 상태
  const [qnaPosts, setQnaPosts] = useState([]);
  const [isQnaModalOpen, setIsQnaModalOpen] = useState(false);
  const [selectedQna, setSelectedQna] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  
  const PRESET_GUIDELINES = [
    {
      id: 'seo_master',
      label: '[기본] 가효상조 전용 고품질 SEO 콘텐츠 템플릿 전체 적용 (권장)',
      value: `[역할 정의]
너는 구글/네이버 SEO, AEO, GEO 전문가이자, 장례 문화 및 상조 마케팅에 정통한 팩트 중심의 콘텐츠 마케터야. 
너의 임무는 제공된 [타겟 핵심 키워드]에 대해, 사용자가 검색을 통해 얻고자 하는 '핵심 의도(Intent)'를 실시간 검색으로 파악하고, 가장 정확한 정보와 함께 '가효상조'의 가치를 논리적으로 연결한 고품질 문서를 작성하는 것이다.

[🔥 최우선 절대 규칙: 2단계 프로세스 강제 수행]
너는 이 지침을 받으면 한 번에 글을 바로 작성하지 말고, 반드시 아래의 순서대로 단계를 나누어 실행해야 한다.

■ 1단계: 실시간 웹 검색 및 유저 의도 파악 (Thinking & Search)
- 제공된 [타겟 핵심 키워드]를 구글/네이버에 실시간 검색하여 아래 사항을 먼저 파악해라.
  1) 이 키워드를 검색하는 유저들이 가장 궁금해하는 '핵심 질문과 답변(Fact)'
  2) 검색 상위에 노출되기 위해 반드시 포함되어야 할 필수 연관 정보 및 정확한 절차/예절/방법
  3) 유저들이 해당 상황에서 겪는 실질적인 고민이나 페인 포인트(Pain Point)

■ 2단계: 웹 표준 HTML 콘텐츠 작성
1단계에서 확보한 최신 정보와 팩트를 바탕으로 아래의 엔진별 최적화 가이드에 맞춰 최종 글을 출력해라.

[엔진별(SEO/AEO/GEO) 최적화 및 본문 구성 지침]

1. 도입부 (AEO 타겟)
   - 제목과 도입부 첫 문단에 [타겟 핵심 키워드]를 자연스럽게 포함할 것.
   - 유저가 글을 열자마자 핵심 답변을 직관적으로 알 수 있도록 요약된 스니펫(Snippet) 문단을 상단에 제공할 것.

2. 본문 1부: [타겟 핵심 키워드]에 대한 완벽 가이드 (SEO/GEO 타겟 - 정보성 강화)
   - 1단계 검색을 통해 얻은 정확한 정보(예절 단계, 방법 순서, 준비물 등)를 명확한 소제목(H2, H3)과 함께 서술할 것.
   - 독자가 이해하기 쉽도록 표(<table>)나 글머리 기호(*), 숫자 리스트를 적극적으로 활용해 시각화할 것.
   - 문장은 간결한 단문 위주로 작성하고, "~에 따르면", "~이 올바른 방법입니다"처럼 신뢰도 높은 어조를 사용할 것.

3. 본문 2부: 맥락적 브랜드 전환 및 솔루션 제시 (가효상조 홍보)
   - 억지스러운 광고가 아니라, 본문 1부의 내용(예절, 조문, 절차 등)에서 유가족이나 조문객이 맞닥뜨릴 수 있는 '어려움이나 막막함'을 페인 포인트로 짚어줄 것.
   - 이를 해결해 줄 수 있는 완벽한 파트너로 '가효상조'를 자연스럽게 소개할 것.
   - 키워드의 성격에 맞춰 가효상조의 셀링 포인트를 다르게 매칭할 것:
     * 비용/절차 관련 키워드 ➔ 매월 납입금 없는 100% 후불제, 쓰지 않은 품목은 빼주는 '미사용 품목 공제 시스템' 강조.
     * 예절/방법/인력 관련 키워드 ➔ 임종 즉시 24시간 출동하여 빈소 섭외부터 복잡한 예절 안내까지 1:1로 밀착 케어해 주는 '10년 이상 경력의 국가공인 장례지도사' 시스템 강조.

4. 자주 묻는 질문 (FAQ) 및 스키마 마크업 (SEO/AEO 타겟)
   - [타겟 핵심 키워드]와 연관된 실질적인 질문 2가지를 구성하고 답할 것. (질문이나 답변에 '가효상조'가 솔루션으로 자연스럽게 포함되도록 할 것)
   - 검색 로봇이 구조를 파악할 수 있도록 JSON-LD 스키마 마크업을 동적으로 생성하여 하단에 첨부할 것.

[글의 최종 출력 양식]
- [제목] 키워드가 포함된 직관적이고 정보성 있는 제목
- [도입부] 유저의 공감대 형성 및 핵심 요약 문단
- [본문 소제목 1] 키워드에 대한 구체적인 정보 및 방법 안내 (표나 리스트 필수 활용)
- [본문 소제목 2] 해당 상황에서 놓치기 쉬운 핵심 주의사항 또는 팁
- [브랜드 솔루션] 가효상조가 제안하는 완벽하고 투명한 장례 지원 서비스
- [자주 묻는 질문 (FAQ)] 
- [JSON-LD 스키마 마크업]`
    },
    {
      id: 'tone_warm',
      label: '[어조] 유가족을 위로하는 따뜻하고 부드러운 어조로 작성',
      value: '[어조] 유가족을 위로하는 따뜻하고 부드러운 어조로 작성'
    },
    {
      id: 'target_2030',
      label: '[타겟] 장례를 처음 겪는 2030 세대를 타겟으로 알기 쉽게 설명',
      value: '[타겟] 장례를 처음 겪는 2030 세대를 타겟으로 알기 쉽게 설명'
    }
  ];
  
  useEffect(() => {
    // 마운트 시 API에서 게시물 목록을 불러옵니다.
    fetch('/api/articles')
      .then(res => res.json())
      .then(data => setArticles(data))
      .catch(err => console.error('Failed to load articles:', err));
      
    // QnA 목록 불러오기
    fetch('/api/qna')
      .then(res => res.json())
      .then(data => setQnaPosts(data))
      .catch(err => console.error('Failed to load QnA:', err));
  }, []);

  const [moduleState, setModuleState] = useState(
    funeralHalls[0]
      ? Object.fromEntries(MODULE_LIST.map((m) => [m.key, funeralHalls[0].facilityInfo[`${m.key}Enabled`] ?? true]))
      : {}
  );
  const [newHallForm, setNewHallForm] = useState({ name: '', address: '', contact: '', regionCode: 'seoul' });
  const [showSuccess, setShowSuccess] = useState('');

  function handleSave(msg) {
    setShowSuccess(msg);
    setTimeout(() => setShowSuccess(''), 3000);
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const handleAiGenerate = async () => {
    if (!aiKeyword) return alert('키워드를 입력해주세요.');
    setIsGenerating(true);
    try {
      const res = await fetch('/api/generate-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword: aiKeyword, guideline: aiGuideline })
      });
      const data = await res.json();
      if (res.ok) {
        setEditingArticle({ ...editingArticle, ...data });
        handleSave('AI 작성이 완료되었습니다!');
      } else {
        alert(`AI 생성 실패: ${data.error}`);
      }
    } catch (err) {
      alert('오류가 발생했습니다.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveArticle = async () => {
    try {
      const isEditing = !!editingArticle.id;
      const url = isEditing ? `/api/articles/${editingArticle.id}` : '/api/articles';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingArticle)
      });
      
      if (res.ok) {
        const savedArticle = await res.json();
        if (isEditing) {
          setArticles(articles.map(a => a.id === savedArticle.id ? savedArticle : a));
        } else {
          setArticles([savedArticle, ...articles]);
        }
        setIsArticleModalOpen(false);
        handleSave(`'${savedArticle.title}' 게시물이 저장되었습니다.`);
        router.refresh();
      } else {
        alert('저장에 실패했습니다.');
      }
    } catch (err) {
      console.error(err);
      alert('저장 중 오류가 발생했습니다.');
    }
  };

  const statCards = [
    { icon: '🏛️', label: '등록 장례식장', value: funeralHalls.length, unit: '곳' },
    { icon: '🧮', label: '오늘 견적 요청', value: 12, unit: '건' },
    { icon: '📞', label: '상담 연결', value: 7, unit: '건' },
    { icon: '💬', label: '미답변 문의', value: qnaPosts.filter(p => !p.reply).length, unit: '건' },
    { icon: '📖', label: '가이드 게시물', value: articles.length, unit: '편' },
  ];

  return (
    <>
      <div style={{ background: 'linear-gradient(135deg, var(--navy-dark) 0%, var(--navy) 100%)', padding: '2rem 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span style={{ color: 'rgba(201,168,76,0.8)', fontSize: '0.8rem', fontWeight: '600', letterSpacing: '0.1em' }}>ADMIN</span>
            <h1 style={{ color: 'white', fontWeight: '800', fontSize: '1.5rem', marginTop: '0.25rem' }}>가효상조 관리자 시스템</h1>
          </div>
          <div>
            <button 
              onClick={handleLogout}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'; }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'; }}
            >
              로그아웃
            </button>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px #4ade80' }} />
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>시스템 정상 운영 중</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '2rem 1.25rem 5rem' }}>
        {/* 성공 알림 */}
        {showSuccess && (
          <div style={{ background: '#dcfce7', border: '1px solid #86efac', borderRadius: 'var(--radius-sm)', padding: '0.875rem 1.25rem', marginBottom: '1.5rem', color: '#14532d', fontWeight: '600', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            ✅ {showSuccess}
          </div>
        )}

        {/* 통계 카드 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {statCards.map((s) => (
            <div key={s.label} style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '1.25rem', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-color)', display: 'flex', gap: '0.875rem', alignItems: 'center' }}>
              <div style={{ width: '48px', height: '48px', background: 'var(--navy-light)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>{s.icon}</div>
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.125rem' }}>{s.label}</p>
                <p style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--navy)', lineHeight: 1 }}>{s.value}<span style={{ fontSize: '0.875rem', fontWeight: '500', marginLeft: '0.25rem' }}>{s.unit}</span></p>
              </div>
            </div>
          ))}
        </div>

        {/* 탭 */}
        <div style={{ display: 'flex', gap: 0, background: 'var(--gray-bg)', borderRadius: 'var(--radius-md)', padding: '4px', marginBottom: '1.75rem', overflowX: 'auto' }}>
          {TABS.map((tab, i) => (
            <button key={tab} onClick={() => setActiveTab(i)} id={`admin-tab-${i}`} style={{ flex: '1 0 auto', padding: '0.625rem 1.125rem', borderRadius: 'calc(var(--radius-md) - 4px)', fontFamily: 'inherit', fontWeight: '600', fontSize: '0.875rem', cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap', background: activeTab === i ? 'white' : 'transparent', color: activeTab === i ? 'var(--navy)' : 'var(--text-secondary)', boxShadow: activeTab === i ? 'var(--shadow-sm)' : 'none', border: 'none' }}>
              {tab}
            </button>
          ))}
        </div>

        {/* 탭 1: 장례식장 관리 */}
        {activeTab === 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            {/* 신규 등록 폼 */}
            <div className="card" style={{ padding: '1.75rem' }}>
              <h3 style={{ fontWeight: '700', color: 'var(--navy)', marginBottom: '1.25rem', fontSize: '1.0625rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>🏛️ 장례식장 신규 등록</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { id: 'hall-name', label: '장례식장 이름 *', key: 'name', placeholder: '예: 서울 ○○ 장례식장' },
                  { id: 'hall-address', label: '주소 *', key: 'address', placeholder: '예: 서울시 강남구 ...' },
                  { id: 'hall-contact', label: '연락처 *', key: 'contact', placeholder: '예: 02-1234-5678' },
                ].map((f) => (
                  <div key={f.key}>
                    <label className="form-label" htmlFor={f.id}>{f.label}</label>
                    <input id={f.id} type="text" className="form-input" placeholder={f.placeholder} value={newHallForm[f.key]} onChange={(e) => setNewHallForm({ ...newHallForm, [f.key]: e.target.value })} />
                  </div>
                ))}
                <div>
                  <label className="form-label" htmlFor="hall-region">지역 *</label>
                  <select id="hall-region" className="form-input" value={newHallForm.regionCode} onChange={(e) => setNewHallForm({ ...newHallForm, regionCode: e.target.value })}>
                    {[['seoul','서울'],['gyeonggi','경기'],['incheon','인천'],['daejeon','대전'],['daegu','대구'],['gwangju','광주'],['busan','부산']].map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                  </select>
                </div>
                <button id="hall-register-btn" className="btn-primary" onClick={() => handleSave(`"${newHallForm.name || '새 장례식장'}" 등록이 완료되었습니다. URL: /halls/${funeralHalls.length + 1}`)}>
                  ✅ 등록 및 URL 자동 생성
                </button>
              </div>
            </div>

            {/* 모듈 On/Off 빌더 */}
            <div className="card" style={{ padding: '1.75rem' }}>
              <h3 style={{ fontWeight: '700', color: 'var(--navy)', marginBottom: '0.5rem', fontSize: '1.0625rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>🔧 페이지 모듈 빌더</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>각 모듈을 켜고 끄면 장례식장 상세 페이지에 즉시 반영됩니다.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {MODULE_LIST.map((m) => (
                  <div key={m.key} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.875rem 1rem', background: moduleState[m.key] ? 'var(--navy-light)' : 'var(--gray-bg)', borderRadius: 'var(--radius-sm)', border: `1.5px solid ${moduleState[m.key] ? 'var(--navy)' : 'var(--border-color)'}`, transition: 'all 0.2s' }}>
                    <span style={{ fontSize: '1.25rem' }}>{m.icon}</span>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--navy)' }}>{m.label}</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{m.desc}</p>
                    </div>
                    <button id={`module-toggle-${m.key}`} onClick={() => { setModuleState((s) => ({ ...s, [m.key]: !s[m.key] })); handleSave(`'${m.label}' 모듈이 ${!moduleState[m.key] ? '활성화' : '비활성화'}되었습니다.`); }} style={{ width: '48px', height: '26px', borderRadius: '999px', background: moduleState[m.key] ? 'var(--navy)' : '#d1d5db', border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.3s', flexShrink: 0 }}>
                      <span style={{ position: 'absolute', top: '3px', left: moduleState[m.key] ? '24px' : '3px', width: '20px', height: '20px', background: 'white', borderRadius: '50%', transition: 'left 0.3s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 기존 장례식장 목록 */}
            <div className="card" style={{ padding: '1.75rem', gridColumn: '1 / -1' }}>
              <h3 style={{ fontWeight: '700', color: 'var(--navy)', marginBottom: '1.25rem', fontSize: '1.0625rem' }}>📋 등록된 장례식장 목록</h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                  <thead>
                    <tr style={{ background: 'var(--navy)', color: 'white' }}>
                      {['ID', '장례식장명', '지역', '연락처', '평점', '관리'].map((h) => (
                        <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: '600', whiteSpace: 'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {funeralHalls.map((hall, i) => (
                      <tr key={hall.id} style={{ borderBottom: '1px solid var(--border-color)', background: i % 2 === 0 ? 'white' : 'var(--gray-bg)' }}>
                        <td style={{ padding: '0.75rem 1rem', color: 'var(--text-secondary)' }}>#{hall.id}</td>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: '600', color: 'var(--navy)' }}>{hall.name}</td>
                        <td style={{ padding: '0.75rem 1rem' }}><span className="badge badge-navy">{hall.regionCode}</span></td>
                        <td style={{ padding: '0.75rem 1rem', color: 'var(--text-secondary)' }}>{hall.contact}</td>
                        <td style={{ padding: '0.75rem 1rem' }}><span style={{ color: 'var(--gold)', fontWeight: '700' }}>★ {hall.rating}</span></td>
                        <td style={{ padding: '0.75rem 1rem' }}>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button id={`edit-hall-${hall.id}`} onClick={() => handleSave(`${hall.name} 수정 모드`)} style={{ padding: '0.375rem 0.875rem', background: 'var(--navy-light)', color: 'var(--navy)', border: 'none', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' }}>수정</button>
                            <button id={`view-hall-${hall.id}`} onClick={() => window.open(`/halls/${hall.id}`, '_blank')} style={{ padding: '0.375rem 0.875rem', background: 'var(--gold-light)', color: 'var(--gold-dark)', border: 'none', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' }}>보기</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 탭 2: 견적 로그 */}
        {activeTab === 1 && (
          <div className="card" style={{ padding: '1.75rem' }}>
            <h3 style={{ fontWeight: '700', color: 'var(--navy)', marginBottom: '1.25rem', fontSize: '1.0625rem' }}>🧮 AI 견적 요청 로그</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ background: 'var(--navy)', color: 'white' }}>
                    {['Log ID', '지역', '조문객 수', '선택 옵션', '견적가', '상담 연결', '요청 일시'].map((h) => (
                      <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: '600', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mockEstimateLogs.map((log, i) => (
                    <tr key={log.id} style={{ borderBottom: '1px solid var(--border-color)', background: i % 2 === 0 ? 'white' : 'var(--gray-bg)' }}>
                      <td style={{ padding: '0.75rem 1rem', color: 'var(--text-secondary)' }}>#{log.id}</td>
                      <td style={{ padding: '0.75rem 1rem', fontWeight: '600', color: 'var(--navy)' }}>{log.region}</td>
                      <td style={{ padding: '0.75rem 1rem' }}>{log.guests}명</td>
                      <td style={{ padding: '0.75rem 1rem', color: 'var(--text-secondary)' }}>{log.options.length > 0 ? log.options.join(', ') : '-'}</td>
                      <td style={{ padding: '0.75rem 1rem', fontWeight: '700', color: 'var(--navy)' }}>{(log.price / 10000).toLocaleString()}만원</td>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        <span style={{ padding: '0.25rem 0.625rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '600', background: log.contacted ? '#dcfce7' : '#fee2e2', color: log.contacted ? '#14532d' : '#991b1b' }}>
                          {log.contacted ? '연결됨' : '미연결'}
                        </span>
                      </td>
                      <td style={{ padding: '0.75rem 1rem', color: 'var(--text-secondary)' }}>{log.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 탭 3: 게시판 관리 */}
        {activeTab === 2 && (
          <div className="card" style={{ padding: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
              <h3 style={{ fontWeight: '700', color: 'var(--navy)', fontSize: '1.0625rem' }}>📖 장례 가이드 게시물 관리</h3>
              <button id="new-guide-btn" className="btn-primary" style={{ padding: '0.625rem 1.25rem', fontSize: '0.875rem' }} onClick={() => { setEditingArticle({ title: '', summary: '', category: '임종절차', readTime: '5분', publishedAt: new Date().toISOString().split('T')[0] }); setIsArticleModalOpen(true); }}>+ 새 게시물</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {articles.map((article) => (
                <div key={article.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem', background: 'var(--gray-bg)', borderRadius: 'var(--radius-md)', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>📄</span>
                  <div style={{ flex: 1, minWidth: '180px' }}>
                    <p style={{ fontWeight: '600', color: 'var(--navy)', fontSize: '0.9375rem', marginBottom: '0.25rem' }}>{article.title}</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{article.category} · {article.publishedAt} · {article.readTime}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button id={`edit-guide-${article.id}`} onClick={() => { setEditingArticle(article); setIsArticleModalOpen(true); }} style={{ padding: '0.375rem 0.875rem', background: 'var(--navy-light)', color: 'var(--navy)', border: 'none', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' }}>수정</button>
                    <button id={`delete-guide-${article.id}`} onClick={async () => { 
                      if(confirm(`'${article.title}' 게시물을 정말 삭제하시겠습니까?`)) { 
                        try {
                          const res = await fetch(`/api/articles/${article.id}`, { method: 'DELETE' });
                          if (res.ok) {
                            setArticles(articles.filter(a => a.id !== article.id)); 
                            handleSave(`'${article.title}' 삭제 처리되었습니다.`); 
                          } else {
                            alert('삭제에 실패했습니다.');
                          }
                        } catch (e) {
                          alert('삭제 중 오류가 발생했습니다.');
                        }
                      } 
                    }} style={{ padding: '0.375rem 0.875rem', background: '#fee2e2', color: '#991b1b', border: 'none', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' }}>삭제</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 탭 4: 시스템 설정 */}
        {activeTab === 3 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {[
              { title: '📞 대표 전화번호', id: 'sys-phone', value: '1588-0000', type: 'text' },
              { title: '📧 상담 이메일', id: 'sys-email', value: 'info@gahyo.com', type: 'email' },
            ].map((s) => (
              <div key={s.id} className="card" style={{ padding: '1.75rem' }}>
                <h3 style={{ fontWeight: '700', color: 'var(--navy)', marginBottom: '1rem', fontSize: '1.0625rem' }}>{s.title}</h3>
                <input id={s.id} type={s.type} defaultValue={s.value} className="form-input" style={{ marginBottom: '1rem' }} />
                <button className="btn-primary" style={{ fontSize: '0.875rem', padding: '0.625rem 1.25rem' }} onClick={() => handleSave('설정이 저장되었습니다.')}>저장</button>
              </div>
            ))}
            <div className="card" style={{ padding: '1.75rem' }}>
              <h3 style={{ fontWeight: '700', color: 'var(--navy)', marginBottom: '1rem', fontSize: '1.0625rem' }}>🔑 관리자 비밀번호 변경</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <input id="sys-pw-current" type="password" placeholder="현재 비밀번호" className="form-input" />
                <input id="sys-pw-new" type="password" placeholder="새 비밀번호" className="form-input" />
                <button className="btn-primary" style={{ fontSize: '0.875rem', padding: '0.625rem 1.25rem' }} onClick={() => handleSave('비밀번호가 변경되었습니다.')}>변경하기</button>
              </div>
            </div>
          </div>
        )}

        {/* 탭 5: 고객 문의 관리 */}
        {activeTab === 4 && (
          <div className="card" style={{ padding: '1.75rem' }}>
            <h3 style={{ fontWeight: '700', color: 'var(--navy)', marginBottom: '1.25rem', fontSize: '1.0625rem' }}>💬 고객 문의/상담 관리</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {qnaPosts.length === 0 ? (
                <p style={{ color: 'var(--text-secondary)' }}>등록된 문의가 없습니다.</p>
              ) : (
                qnaPosts.map((post) => (
                  <div key={post.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem', background: 'var(--gray-bg)', borderRadius: 'var(--radius-md)', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0, minWidth: '60px' }}>
                      {post.reply ? <span className="badge" style={{ background: '#dcfce7', color: '#14532d' }}>답변완료</span> : <span className="badge" style={{ background: '#fee2e2', color: '#991b1b' }}>답변대기</span>}
                    </div>
                    <div style={{ flex: 1, minWidth: '180px' }}>
                      <p style={{ fontWeight: '600', color: 'var(--navy)', fontSize: '0.9375rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        {post.isSecret && <span>🔒</span>} {post.title}
                      </p>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        작성자: {post.author} · {post.date}
                        {post.phone && ` · 📞 ${post.phone}`}
                        {post.email && ` · 📧 ${post.email}`}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button onClick={() => { setSelectedQna(post); setReplyContent(post.reply || ''); setIsQnaModalOpen(true); }} style={{ padding: '0.375rem 0.875rem', background: 'var(--navy-light)', color: 'var(--navy)', border: 'none', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' }}>
                        {post.reply ? '수정/확인' : '답변하기'}
                      </button>
                      <button onClick={async () => {
                        if(confirm('이 문의글을 삭제하시겠습니까?')) {
                          try {
                            const res = await fetch(`/api/qna/${post.id}`, { method: 'DELETE' });
                            if (res.ok) {
                              setQnaPosts(qnaPosts.filter(p => p.id !== post.id));
                              handleSave('문의글이 삭제되었습니다.');
                            } else alert('삭제 실패');
                          } catch (err) { alert('삭제 중 오류 발생'); }
                        }
                      }} style={{ padding: '0.375rem 0.875rem', background: '#fee2e2', color: '#991b1b', border: 'none', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' }}>삭제</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* 게시물 작성/수정 모달 */}
      {isArticleModalOpen && editingArticle && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '1rem' }}>
          <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto', padding: '2rem', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '1.5rem' }}>
              {editingArticle.id ? '게시물 수정' : '새 게시물 작성'}
            </h3>
            
            <div style={{ marginBottom: '1.5rem', padding: '1.25rem', background: 'var(--navy-light)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(0,26,58,0.1)' }}>
              <label className="form-label" style={{ color: 'var(--navy)' }}>✨ AI 자동 작성 (SEO 최적화)</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <input type="text" className="form-input" value={aiKeyword} onChange={e => setAiKeyword(e.target.value)} placeholder="검색 상위 노출을 원하는 키워드를 입력하세요 (예: 장례식장 비용)" disabled={isGenerating} />
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <p style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--navy)', marginBottom: '0.25rem' }}>추가 반영 지침 (다중 선택 가능)</p>
                    {PRESET_GUIDELINES.map((guide, idx) => (
                      <label key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                        <input 
                          type="checkbox" 
                          checked={selectedGuidelines.includes(guide.value)}
                          onChange={(e) => {
                            if (e.target.checked) setSelectedGuidelines([...selectedGuidelines, guide.value]);
                            else setSelectedGuidelines(selectedGuidelines.filter(g => g !== guide.value));
                          }}
                          disabled={isGenerating}
                        />
                        {guide.label}
                      </label>
                    ))}
                    <input 
                      type="text" 
                      className="form-input" 
                      value={customGuideline} 
                      onChange={e => setCustomGuideline(e.target.value)} 
                      placeholder="기타 직접 입력 (예: 무빈소 장례 위주로 강조해주세요)" 
                      disabled={isGenerating} 
                      style={{ marginTop: '0.25rem', fontSize: '0.85rem', padding: '0.5rem 0.75rem' }} 
                    />
                  </div>

                  <button className="btn-primary" style={{ padding: '0.75rem 1.25rem', opacity: isGenerating ? 0.7 : 1, marginTop: '0.5rem' }} disabled={isGenerating} onClick={async () => {
                    if (!aiKeyword) return alert('키워드를 입력해주세요.');
                    setIsGenerating(true);
                    
                    const finalGuideline = [...selectedGuidelines, customGuideline].filter(Boolean).join('\n');
                    
                    try {
                      const res = await fetch('/api/generate-post', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ keyword: aiKeyword, guideline: finalGuideline })
                      });
                      const data = await res.json();
                      if (data.error) throw new Error(data.error);
                      setEditingArticle(prev => ({
                        ...prev,
                        title: data.title || '',
                        summary: data.summary || '',
                        category: data.category || '장례상식',
                        readTime: data.readTime || '5분',
                        content: data.content || ''
                      }));
                      handleSave('AI 게시물 생성이 완료되었습니다.');
                    } catch (error) {
                      alert('AI 생성 실패: ' + error.message);
                    } finally {
                      setIsGenerating(false);
                    }
                  }}>
                    {isGenerating ? '생성 중...' : '자동 작성'}
                  </button>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              <div>
                <label className="form-label">게시물 제목</label>
                <input type="text" className="form-input" value={editingArticle.title} onChange={e => setEditingArticle({...editingArticle, title: e.target.value})} placeholder="제목을 입력하세요" />
              </div>
              <div>
                <label className="form-label">요약 내용</label>
                <textarea className="form-input" value={editingArticle.summary} onChange={e => setEditingArticle({...editingArticle, summary: e.target.value})} placeholder="목록에 표시될 요약 내용을 입력하세요" style={{ minHeight: '80px', resize: 'vertical' }} />
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label className="form-label">카테고리</label>
                  <input type="text" className="form-input" value={editingArticle.category} onChange={e => setEditingArticle({...editingArticle, category: e.target.value})} placeholder="예: 임종절차" />
                </div>
                <div style={{ flex: 1 }}>
                  <label className="form-label">읽는 시간</label>
                  <input type="text" className="form-input" value={editingArticle.readTime} onChange={e => setEditingArticle({...editingArticle, readTime: e.target.value})} placeholder="예: 5분" />
                </div>
              </div>
              <div>
                <label className="form-label">발행일</label>
                <input type="date" className="form-input" value={editingArticle.publishedAt} onChange={e => setEditingArticle({...editingArticle, publishedAt: e.target.value})} />
              </div>
              <div>
                <label className="form-label">본문 내용 (HTML/마크다운)</label>
                <textarea className="form-input" value={typeof editingArticle.content === 'object' && editingArticle.content !== null ? JSON.stringify(editingArticle.content, null, 2) : (editingArticle.content || '')} onChange={e => setEditingArticle({...editingArticle, content: e.target.value})} placeholder="본문 내용이 여기에 표시됩니다." style={{ minHeight: '300px', resize: 'vertical', fontFamily: 'monospace', fontSize: '0.9rem' }} />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button onClick={() => setIsArticleModalOpen(false)} style={{ padding: '0.75rem 1.25rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'white', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' }}>
                취소
              </button>
              <button onClick={() => {
                if (!editingArticle.title) return alert('제목을 입력해주세요.');
                handleSaveArticle();
              }} className="btn-primary" style={{ padding: '0.75rem 1.5rem' }}>
                저장하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QnA 답변 모달 */}
      {isQnaModalOpen && selectedQna && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '1rem' }}>
          <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', padding: '2rem', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              💬 고객 문의 답변하기
            </h3>
            
            <div style={{ background: 'var(--gray-bg)', padding: '1.25rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem' }}>
              <h4 style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--navy)', marginBottom: '0.5rem' }}>{selectedQna.title}</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                작성자: {selectedQna.author} | 등록일: {selectedQna.date}
                {selectedQna.phone && ` | 연락처: ${selectedQna.phone}`}
                {selectedQna.email && ` | 이메일: ${selectedQna.email}`}
              </p>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--text)', whiteSpace: 'pre-wrap' }}>{selectedQna.content}</p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label className="form-label" style={{ color: 'var(--navy)' }}>관리자 답변 내용</label>
              <textarea 
                className="form-input" 
                value={replyContent} 
                onChange={e => setReplyContent(e.target.value)} 
                placeholder="답변을 입력해주세요." 
                style={{ minHeight: '150px', resize: 'vertical' }} 
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button onClick={() => setIsQnaModalOpen(false)} style={{ padding: '0.75rem 1.25rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'white', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' }}>
                취소
              </button>
              <button onClick={async () => {
                if (!replyContent.trim()) return alert('답변을 입력해주세요.');
                try {
                  const res = await fetch(`/api/qna/${selectedQna.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ reply: replyContent })
                  });
                  if (res.ok) {
                    const updated = await res.json();
                    setQnaPosts(qnaPosts.map(p => p.id === updated.id ? updated : p));
                    setIsQnaModalOpen(false);
                    handleSave('답변이 등록되었습니다.');
                  } else {
                    alert('답변 저장 실패');
                  }
                } catch (err) {
                  alert('오류가 발생했습니다.');
                }
              }} className="btn-primary" style={{ padding: '0.75rem 1.5rem' }}>
                답변 저장
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
