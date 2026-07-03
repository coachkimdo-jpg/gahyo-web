import funeralHalls from '@/lib/realData.json';
import { NextResponse } from 'next/server';

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
  "제주특별자치도": ["제주", "제주특별자치도", "제주도"],
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const sido = searchParams.get('sido') || '전체';
  const sigungu = searchParams.get('sigungu') || '전체';
  const search = searchParams.get('search') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '20', 10);

  let filtered = funeralHalls;

  // 시/도 필터
  if (sido && sido !== '전체') {
    const variations = SIDO_VARIATIONS[sido] || [sido];
    filtered = filtered.filter((h) => {
      const addr = (h.address || '').trim();
      return variations.some(v => addr.startsWith(v) || addr.startsWith(sido));
    });
  }

  // 시/군/구 필터
  if (sigungu && sigungu !== '전체') {
    filtered = filtered.filter(h => h.address && h.address.includes(sigungu));
  }

  // 검색어 필터
  if (search) {
    filtered = filtered.filter(h =>
      h.name.includes(search) || (h.address && h.address.includes(search))
    );
  }

  const total = filtered.length;
  const start = (page - 1) * limit;
  const paged = filtered.slice(start, start + limit);

  // 클라이언트에 필요한 필드만 반환 (사진, 이름, 주소만)
  const slim = paged.map(h => ({
    id: h.id,
    name: h.name,
    address: h.address,
    regionCode: h.regionCode,
    photo: h.photos && h.photos.length > 0 ? h.photos[0] : null,
  }));

  return NextResponse.json({ data: slim, total, page, limit });
}
