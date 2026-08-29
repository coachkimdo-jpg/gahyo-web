'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { regions } from '@/lib/mockDb';
import { getSlug, getRegionShortName } from '@/lib/utils';

const TYPES = [
  { code: '', label: '전체' },
  { code: '수목장', label: '🌲 자연장지' },
  { code: '봉안당', label: '🏛️ 봉안시설' },
  { code: '묘지', label: '🪦 묘지' },
];

export default function CemeteriesListClient({ regionData, initialFiltered }) {
  const SIDO_OPTIONS = Object.keys(regionData);

  const [sido, setSido] = useState('전체');
  const [sigungu, setSigungu] = useState('전체');
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const [filtered, setFiltered] = useState(initialFiltered);
  const [loading, setLoading] = useState(false);
  const isFirstRun = useRef(true);

  useEffect(() => {
    const savedSido = sessionStorage.getItem('cem_sido');
    const savedSigungu = sessionStorage.getItem('cem_sigungu');
    const savedSearch = sessionStorage.getItem('cem_search');
    const savedType = sessionStorage.getItem('cem_type');

    if (savedSido) setSido(savedSido);
    if (savedSigungu) setSigungu(savedSigungu);
    if (savedSearch) setSearch(savedSearch);
    if (savedType) setSelectedType(savedType);
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      sessionStorage.setItem('cem_sido', sido);
      sessionStorage.setItem('cem_sigungu', sigungu);
      sessionStorage.setItem('cem_search', search);
      sessionStorage.setItem('cem_type', selectedType);
    }
  }, [sido, sigungu, search, selectedType, isMounted]);

  const sigunguOptions = ['전체', ...(regionData[sido] || [])];

  const handleSidoChange = (e) => {
    setSido(e.target.value);
    setSigungu('전체');
  };

  useEffect(() => {
    if (!isMounted) return;

    // 최초 마운트에 필터가 기본값(서버에서 이미 받아온 초기 목록)과 같다면 중복 fetch를 건너뛴다.
    if (isFirstRun.current) {
      isFirstRun.current = false;
      if (sido === '전체' && sigungu === '전체' && search === '' && selectedType === '') {
        return;
      }
    }

    const fetchCemeteries = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ type: selectedType, search, sido, sigungu });
        const res = await fetch(`/api/cemeteries?${params}`);
        const json = await res.json();
        setFiltered(json.data);
      } catch (error) {
        console.error('Failed to fetch cemeteries:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCemeteries();
  }, [sido, sigungu, search, selectedType, isMounted]);

  return (
    <>
      {/* Search & Filter Section */}
      <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1rem' }}>

          <select value={sido} onChange={handleSidoChange} className="form-input" style={{ flex: 1, minWidth: '150px' }}>
            {SIDO_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          <select value={sigungu} onChange={(e) => setSigungu(e.target.value)} className="form-input" style={{ flex: 1, minWidth: '150px' }}>
            {sigunguOptions.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          <div style={{ flex: 2, position: 'relative', minWidth: '200px' }}>
            <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }}>🔍</span>
            <input type="text" placeholder="장지 이름, 지역 검색..." value={search} onChange={(e) => setSearch(e.target.value)} className="form-input" style={{ paddingLeft: '2.75rem' }} />
          </div>

          <button style={{ background: '#4078e6', color: 'white', border: 'none', padding: '0 1.5rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            🔍
          </button>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {TYPES.map((t) => (
            <button
              key={t.code}
              onClick={() => setSelectedType(t.code)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '999px',
                fontFamily: 'inherit',
                fontWeight: '600',
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                background: selectedType === t.code ? 'var(--navy)' : 'var(--gray-bg)',
                color: selectedType === t.code ? 'white' : 'var(--text-secondary)',
                border: `1.5px solid ${selectedType === t.code ? 'var(--navy)' : 'var(--border-color)'}`
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
        총 <strong style={{ color: 'var(--navy)' }}>{filtered.length}곳</strong>의 장지가 검색되었습니다. {loading && '(검색 중...)'}
      </p>

      {!loading && filtered.length === 0 ? (
        <div className="empty-state"><p style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🌿</p><p style={{ fontWeight: '600', color: 'var(--navy)' }}>검색 결과가 없습니다</p></div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {filtered.map((cem) => (
            <Link
              href={
                cem.isOssuary ? `/cemeteries/ossuary/${getSlug(cem.address, cem.name)}` :
                cem.isNatural ? `/cemeteries/natural/${getSlug(cem.address, cem.name)}` :
                `/cemeteries/graveyard/${getSlug(cem.address, cem.name)}`
              }
              key={`${cem.id}-${cem.name}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="card" style={{ transition: 'transform 0.2s', cursor: 'pointer' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'none'}>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: '120px', minHeight: '140px', background: 'linear-gradient(135deg, var(--navy-light), #d8ecd8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
                    {cem.photos && cem.photos.length > 0 ? (
                      <img src={cem.photos[0]} alt={`${cem.region} ${cem.name} - 쾌적한 ${cem.type === 'ossuary' ? '납골당(봉안당)' : cem.type === 'natural' ? '수목장/자연장지' : '공원묘지'} 전경`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      cem.type === '수목장' ? '🌲' : cem.type === '봉안당' ? '🏛️' : '🪦'
                    )}
                  </div>
                  <div style={{ padding: '1.25rem', flex: 1 }}>
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                      <span className="badge badge-gold">{cem.typeLabel}</span>
                      <span className="badge badge-navy">{cem.regionCode ? regions.find(r => r.code === cem.regionCode)?.label : getRegionShortName(cem.address)}</span>
                    </div>
                    <h3 style={{ fontWeight: '700', color: 'var(--navy)', fontSize: '1.0625rem', marginBottom: '0.375rem' }}>{cem.name}</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>📍 {cem.address}</p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '0.75rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{cem.description}</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <span style={{ fontWeight: '700', color: 'var(--navy)', fontSize: '0.9375rem' }}>💰 {cem.priceRange}</span>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          window.location.href = 'tel:1551-5718';
                        }}
                        style={{
                          background: 'white',
                          color: 'var(--gold-dark)',
                          border: '1px solid var(--gold-dark)',
                          borderRadius: '4px',
                          padding: '0.4rem 0.8rem',
                          fontSize: '0.85rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.4rem'
                        }}
                      >
                        📞 무료상담받기
                      </button>
                    </div>
                  </div>
                </div>
                <div style={{ borderTop: '1px solid var(--border-color)', padding: '1rem 1.25rem', background: 'var(--gold-50)', display: 'flex', alignItems: 'flex-start', gap: '0.625rem' }}>
                  <span style={{ color: 'var(--gold-dark)', fontSize: '1rem', flexShrink: 0 }}>🎁</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}><strong style={{ color: 'var(--gold-dark)' }}>가효상조 고객 혜택</strong> · {cem.benefits.join(' · ')}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
