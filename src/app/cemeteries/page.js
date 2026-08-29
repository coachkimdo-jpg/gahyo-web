import HallStickyBar from '@/components/HallStickyBar';
import CemeteriesListClient from '@/components/CemeteriesListClient';
import { filterCemeteries } from '@/lib/cemeteriesFilter';

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

export default function CemeteriesPage() {
  // SSR에서 기본 필터(전체/전체) 결과를 직접 계산해 크롤러에게도 실제 목록이 보이도록 한다.
  const { data: initialFiltered } = filterCemeteries({ type: '', search: '', sido: '전체', sigungu: '전체' });

  return (
    <>
      <HallStickyBar subtitle="장지 무료 상담" />
      <header className="page-hero">
        <div className="container">
          <span className="section-label" style={{ color: 'rgba(201,168,76,0.9)' }}>모실곳 찾기</span>
          <h1 className="page-hero-title">전국 자연장지·봉안당·묘지 찾기</h1>
          <p className="page-hero-desc">수목장, 자연장지, 봉안당, 평장 묘지 등 전국 장지 정보를 지역별로 무료 검색하세요.</p>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1rem', marginTop: '1.5rem' }}>
            {/* BLUF 핵심 요약 */}
            <div style={{ maxWidth: '680px', padding: '1rem 1.5rem', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.18)', textAlign: 'left' }}>
              <p style={{ color: 'rgba(255,255,255,0.92)', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
                <strong style={{ color: 'var(--gold)' }}>이 페이지는 가효상조가 직접 수집한 전국 장지 정보를 통합하여 제공합니다.</strong><br />
                가효상조 고객은 제휴 장지 이용 시 <strong>전문 맞춤 컨설팅 및 장례지도사 동행 서비스</strong>를 무료로 제공받으실 수 있습니다.
              </p>
            </div>

            {/* E-E-A-T 신뢰도 배지 */}
            <div style={{ display: 'inline-flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', padding: '0.7rem 1.25rem', background: 'rgba(255,255,255,0.08)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.1rem' }}>🏢</span>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.9)' }}>데이터 수집 및 검수</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: '700', color: 'white' }}>가효상조 수석 장례지도사</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="container" style={{ padding: '2.5rem 1.25rem 5rem' }}>
        <CemeteriesListClient regionData={REGION_DATA} initialFiltered={initialFiltered} />
      </div>

      {/* ── 정적 SEO 콘텐츠 영역 ── */}
      <div className="container" style={{ padding: '0 1.25rem 5rem', maxWidth: '860px' }}>

        {/* 장지 종류 안내 */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: '3px solid var(--gold)' }}>
            장지 종류별 안내
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {[
              { icon: '🌲', type: '자연장지 (수목장)', desc: '화장한 골분을 나무·잔디·바위 기점에 안치하는 친환경 장법입니다.' },
              { icon: '🏛️', type: '봉안당', desc: '실내·실외 봉안함에 골분을 모시는 형태로, 정기적인 참배가 용이합니다.' },
              { icon: '⛰️', type: '평장 묘지', desc: '전통적인 매장 방식으로 묘지에 안치하는 형태입니다.' },
            ].map(item => (
              <div key={item.type} style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{item.icon}</div>
                <h3 style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '0.5rem' }}>{item.type}</h3>
                <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--navy)', marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: '3px solid var(--gold)' }}>
            자주 묻는 질문 (FAQ)
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {[
              { q: '자연장지(수목장)와 봉안당의 차이는 무엇인가요?', a: '자연장지(수목장)는 화장한 골분을 나무·잔디·바위 주변에 안치하는 친환경 장법입니다. 봉안당은 실내·실외 봉안함에 골분을 모시는 형태로 정기 참배가 용이합니다. 비용은 시설의 위치와 등급에 따라 크게 다릅니다.' },
              { q: '가효상조를 통해 장지를 이용하면 어떤 혜택이 있나요?', a: '가효상조 고객은 제휴 장지 이용 시 맞춤 컨설팅, 우선 예약, 장례지도사 동행 서비스를 무료로 제공받으실 수 있습니다. 전담 장례지도사가 장지 선택부터 안치까지 밀착 지원합니다.' },
              { q: '수목장(자연장지) 이용 시 사전에 판정해야 하는 사항은 무엇인가요?', a: '매장(일반 묘지 안치)으로 진행할지, 화장 후 자연장지로 진행할지를 사전에 결정하셔야 합니다. 자연장지는 반드시 화장을 요구하며, 장지별로 모실 수 있는 분골(0.25평, 0.5평 등) 규격이 다르므로 사전 상담이 필수입니다.' },
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
      </div>
    </>
  );
}
