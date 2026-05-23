'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const REGION_DATA = {
  "전체": [],
  "서울특별시": ["강남구","강동구","강북구","강서구","관악구","광진구","구로구","금천구","노원구","도봉구","동대문구","동작구","마포구","서대문구","서초구","성동구","성북구","송파구","양천구","영등포구","용산구","은평구","종로구","중구","중랑구"],
  "부산광역시": ["강서구","금정구","기장군","남구","동구","동래구","부산진구","북구","사상구","사하구","서구","수영구","연제구","영도구","중구","해운대구"],
  "대구광역시": ["남구","달서구","달성군","동구","북구","서구","수성구","중구","군위군"],
  "인천광역시": ["강화군","계양구","남동구","동구","미추홀구","부평구","서구","연수구","옹진군","중구"],
  "광주광역시": ["광산구","남구","동구","북구","서구"],
  "대전광역시": ["대덕구","동구","서구","유성구","중구"],
  "울산광역시": ["남구","동구","북구","울주군","중구"],
  "세종특별자치시": ["세종시"],
  "경기도": ["고양시","과천시","광명시","광주시","구리시","군포시","김포시","남양주시","동두천시","부천시","성남시","수원시","시흥시","안산시","안성시","안양시","양주시","여주시","오산시","용인시","의왕시","의정부시","이천시","파주시","평택시","포천시","하남시","화성시","가평군","양평군","연천군"],
  "강원특별자치도": ["강릉시","동해시","삼척시","속초시","원주시","춘천시","태백시","고성군","양구군","양양군","영월군","인제군","정선군","철원군","평창군","홍천군","화천군","횡성군"],
  "충청북도": ["제천시","청주시","충주시","괴산군","단양군","보은군","영동군","옥천군","음성군","증평군","진천군"],
  "충청남도": ["계룡시","공주시","논산시","보령시","서산시","아산시","천안시","당진시","금산군","부여군","서천군","예산군","청양군","태안군","홍성군"],
  "전북특별자치도": ["군산시","김제시","남원시","익산시","전주시","정읍시","고창군","무주군","부안군","순창군","완주군","임실군","장수군","진안군"],
  "전라남도": ["광양시","나주시","목포시","순천시","여수시","강진군","고흥군","곡성군","구례군","담양군","무안군","보성군","신안군","영광군","영암군","완도군","장성군","장흥군","진도군","함평군","해남군","화순군"],
  "경상북도": ["경산시","경주시","구미시","김천시","문경시","상주시","안동시","영주시","영천시","포항시","고령군","봉화군","성주군","영덕군","영양군","예천군","울릉군","울진군","의성군","청도군","청송군","칠곡군"],
  "경상남도": ["거제시","김해시","밀양시","사천시","양산시","진주시","창원시","통영시","거창군","고성군","남해군","산청군","의령군","창녕군","하동군","함안군","함양군","합천군"],
  "제주특별자치도": ["제주시","서귀포시"],
};

const SIDO_OPTIONS = Object.keys(REGION_DATA);

export default function HallsPage() {
  const [sido, setSido] = useState('서울특별시');
  const [sigungu, setSigungu] = useState('전체');
  const [search, setSearch] = useState('');
  const [halls, setHalls] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);
  const LIMIT = 24;

  const fetchHalls = useCallback(async (newPage = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        sido, sigungu, search,
        page: newPage, limit: LIMIT,
      });
      const res = await fetch(`/api/halls?${params}`);
      const json = await res.json();
      if (newPage === 1) {
        setHalls(json.data);
      } else {
        setHalls(prev => [...prev, ...json.data]);
      }
      setTotal(json.total);
      setPage(newPage);
    } finally {
      setLoading(false);
    }
  }, [sido, sigungu, search]);

  useEffect(() => {
    const savedSido = sessionStorage.getItem('gahyo_sido');
    const savedSigungu = sessionStorage.getItem('gahyo_sigungu');
    const savedSearch = sessionStorage.getItem('gahyo_search');
    if (savedSido) setSido(savedSido);
    if (savedSigungu) setSigungu(savedSigungu);
    if (savedSearch) setSearch(savedSearch);
  }, []);

  useEffect(() => {
    sessionStorage.setItem('gahyo_sido', sido);
    sessionStorage.setItem('gahyo_sigungu', sigungu);
    sessionStorage.setItem('gahyo_search', search);
    fetchHalls(1);
  }, [sido, sigungu, search, fetchHalls]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === 'left' ? -300 : 300, behavior: 'smooth' });
    }
  };

  const sigunguOptions = ['전체', ...(REGION_DATA[sido] || [])];

  return (
    <div style={{ background: '#edf2f7', minHeight: '100vh', padding: '2rem 0' }}>
      <div className="container" style={{ padding: '0 1.25rem' }}>

        {/* 상단 검색 필터 바 */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <select
            value={sido}
            onChange={(e) => { setSido(e.target.value); setSigungu('전체'); }}
            style={{ flex: 1, minWidth: '150px', padding: '0.75rem', border: '1px solid #cbd5e0', borderRadius: '4px', background: 'white', color: '#4a5568' }}
          >
            {SIDO_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select
            value={sigungu}
            onChange={(e) => setSigungu(e.target.value)}
            style={{ flex: 1, minWidth: '150px', padding: '0.75rem', border: '1px solid #cbd5e0', borderRadius: '4px', background: 'white', color: '#4a5568' }}
          >
            {sigunguOptions.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="장례식장 이름 또는 주소 검색"
            style={{ flex: 2, minWidth: '200px', padding: '0.75rem', border: '1px solid #cbd5e0', borderRadius: '4px', background: 'white' }}
          />
        </div>

        {/* 결과 수 */}
        <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1rem' }}>
          총 <strong>{total}</strong>개 장례식장
          {loading && ' (검색 중...)'}
        </p>

        {/* 가로 스크롤 카드 리스트 */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <div onClick={() => scroll('left')} style={{ width: '40px', height: '40px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', left: '-20px', zIndex: 10, boxShadow: '0 2px 4px rgba(0,0,0,0.1)', cursor: 'pointer' }}>
            <span style={{ fontWeight: 'bold' }}>&lt;</span>
          </div>
          <div onClick={() => scroll('right')} style={{ width: '40px', height: '40px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', right: '-20px', zIndex: 10, boxShadow: '0 2px 4px rgba(0,0,0,0.1)', cursor: 'pointer' }}>
            <span style={{ fontWeight: 'bold' }}>&gt;</span>
          </div>

          <div
            ref={scrollRef}
            style={{ display: 'flex', gap: '1rem', overflowX: 'auto', padding: '1rem 0', scrollSnapType: 'x mandatory', width: '100%', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}
          >
            {halls.map((hall, idx) => (
              <Link key={hall.id} href={`/halls/${hall.id}`} style={{ textDecoration: 'none' }}>
                <div style={{ minWidth: '260px', height: '300px', background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', position: 'relative', scrollSnapAlign: 'start', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ position: 'relative', height: '180px', width: '100%', background: '#f7fafc', flexShrink: 0 }}>
                    {hall.photo ? (
                      <Image
                        src={hall.photo}
                        alt={`${hall.name} 장례식장 전경`}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="260px"
                        loading={idx < 6 ? 'eager' : 'lazy'}
                      />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a0aec0' }}>이미지 없음</div>
                    )}
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1rem', gap: '0.75rem' }}>
                    <h3 style={{ margin: 0, fontSize: '1rem', color: '#2d3748', fontWeight: '600', textAlign: 'center', lineHeight: 1.3 }}>{hall.name}</h3>
                    <button
                      onClick={(e) => { e.preventDefault(); window.location.href = 'tel:1551-5718'; }}
                      style={{ background: 'var(--navy)', color: 'white', border: 'none', borderRadius: '4px', padding: '0.5rem 1rem', fontSize: '0.85rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', width: '100%', justifyContent: 'center' }}
                    >
                      📞 문의하기
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 더 보기 버튼 */}
        {halls.length < total && (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button
              onClick={() => fetchHalls(page + 1)}
              disabled={loading}
              style={{ padding: '0.875rem 2.5rem', background: 'var(--navy)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1 }}
            >
              {loading ? '로딩 중...' : `더 보기 (${halls.length}/${total})`}
            </button>
          </div>
        )}
      </div>
      <style>{`div::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
}
