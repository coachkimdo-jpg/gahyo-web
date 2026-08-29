'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getSlug } from '@/lib/utils';

export default function HallsListClient({ regionData, initialSido, initialSigungu, initialHalls, initialTotal }) {
  const SIDO_OPTIONS = Object.keys(regionData);

  const [sido, setSido] = useState(initialSido);
  const [sigungu, setSigungu] = useState(initialSigungu);
  const [search, setSearch] = useState('');
  const [halls, setHalls] = useState(initialHalls);
  const [total, setTotal] = useState(initialTotal);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);
  const isFirstRun = useRef(true);
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

    // 최초 렌더는 서버에서 이미 내려받은 초기 목록(SSR)을 그대로 사용하고,
    // 필터가 기본값과 동일하면 중복 fetch를 건너뛴다.
    if (isFirstRun.current) {
      isFirstRun.current = false;
      if (sido === initialSido && sigungu === initialSigungu && search === '') {
        return;
      }
    }
    fetchHalls(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sido, sigungu, search]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === 'left' ? -300 : 300, behavior: 'smooth' });
    }
  };

  const sigunguOptions = ['전체', ...(regionData[sido] || [])];

  return (
    <>
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
            <Link key={hall.id} href={`/halls/${getSlug(hall.address, hall.name)}`} style={{ textDecoration: 'none' }}>
              <div style={{ minWidth: '260px', height: '300px', background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', position: 'relative', scrollSnapAlign: 'start', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', height: '180px', width: '100%', background: '#f7fafc', flexShrink: 0 }}>
                  {hall.photo ? (
                    <Image
                      src={hall.photo}
                      alt={`${hall.name} 장례식장 전경`}
                      fill
                      unoptimized={true}
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

      <style>{`div::-webkit-scrollbar { display: none; }`}</style>
    </>
  );
}
