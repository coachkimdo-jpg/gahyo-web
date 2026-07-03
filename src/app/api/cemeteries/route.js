import { NextResponse } from 'next/server';
import ossuariesRaw from '@/lib/ossuaries.json';
import naturalBurialsRaw from '@/lib/naturalBurials.json';
import graveyardsRaw from '@/lib/graveyards.json';

// 봉안시설 - ossuaries.json (684건, type='봉안당' 고정)
const ossuariesData = ossuariesRaw.map(o => ({
  id: o.id,
  type: '봉안당',
  typeLabel: '🏛️ 봉안시설',
  name: o.name,
  address: o.address,
  description: o.intro || '상세 정보는 페이지를 확인하세요.',
  priceRange: o.priceRange || '전화 문의',
  benefits: ['할인 혜택', '전문 상담', '장례지도사 동행'],
  photos: o.photos,
  isOssuary: true
}));

// 자연장지 - naturalBurials.json (260건, type='수목장' 고정)
const naturalBurialsData = naturalBurialsRaw.map(n => ({
  id: n.id,
  type: '수목장',
  typeLabel: '🌲 자연장지',
  name: n.name,
  address: n.address,
  description: n.intro || '상세 정보는 페이지를 확인하세요.',
  priceRange: n.priceRange || '전화 문의',
  benefits: ['할인 혜택', '방문 상담', '장례지도사 동행'],
  photos: n.photos,
  isNatural: true
}));

// 묘지 - graveyards.json (신규)
const graveyardsData = graveyardsRaw.map(g => ({
  id: g.id,
  type: '묘지',
  typeLabel: '🪦 묘지',
  name: g.name,
  address: g.address,
  description: g.intro || '상세 정보는 페이지를 확인하세요.',
  priceRange: g.priceRange || '전화 문의',
  benefits: ['할인 혜택', '방문 상담', '장례지도사 동행'],
  photos: g.photos,
  isGraveyard: true
}));

const combinedData = [...ossuariesData, ...naturalBurialsData, ...graveyardsData];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || '';
  const search = searchParams.get('search') || '';
  const sido = searchParams.get('sido') || '전체';
  const sigungu = searchParams.get('sigungu') || '전체';

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

  let filtered = combinedData.filter((c) => {
    // Type Filtering
    const matchType = !type || c.type === type;
    
    // Region Filtering (Sido & Sigungu)
    let matchSido = false;
    if (sido === '전체') {
      matchSido = true;
    } else {
      const variations = SIDO_VARIATIONS[sido] || [sido];
      const addr = (c.address || '').trim();
      matchSido = variations.some(v => addr.startsWith(v) || addr.startsWith(sido));
    }
    
    const matchSigungu = !sigungu || sigungu === '전체' || (c.address && c.address.includes(sigungu));
    
    // Search Filtering
    const matchSearch = !search || c.name.includes(search) || (c.address && c.address.includes(search));
    
    return matchType && matchSido && matchSigungu && matchSearch;
  });

  return NextResponse.json({
    total: filtered.length,
    data: filtered,
  });
}
