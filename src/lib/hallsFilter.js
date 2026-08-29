import funeralHalls from '@/lib/realData.json';

export const SIDO_VARIATIONS = {
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

// halls 목록 필터링 + 페이지네이션 (API route와 서버 컴포넌트 SSR 초기 렌더가 동일 로직을 공유)
export function filterHalls({ sido = '전체', sigungu = '전체', search = '', page = 1, limit = 20 } = {}) {
  let filtered = funeralHalls;

  if (sido && sido !== '전체') {
    const variations = SIDO_VARIATIONS[sido] || [sido];
    filtered = filtered.filter((h) => {
      const addr = (h.address || '').trim();
      return variations.some(v => addr.startsWith(v) || addr.startsWith(sido));
    });
  }

  if (sigungu && sigungu !== '전체') {
    filtered = filtered.filter(h => h.address && h.address.includes(sigungu));
  }

  if (search) {
    filtered = filtered.filter(h =>
      h.name.includes(search) || (h.address && h.address.includes(search))
    );
  }

  const total = filtered.length;
  const start = (page - 1) * limit;
  const paged = filtered.slice(start, start + limit);

  const slim = paged.map(h => ({
    id: h.id,
    name: h.name,
    address: h.address,
    regionCode: h.regionCode,
    photo: h.photos && h.photos.length > 0 ? h.photos[0] : null,
  }));

  return { data: slim, total, page, limit };
}
