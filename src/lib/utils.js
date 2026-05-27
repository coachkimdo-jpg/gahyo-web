export const getRegionShortName = (address, name = '') => {
  const matchRegion = (str) => {
    if (!str) return null;
    if (str.includes('서울') || str.includes('은평') || str.includes('노원') || str.includes('영등포') || str.includes('강남') || str.includes('서초')) return '서울';
    if (str.includes('부산') || str.includes('동래') || str.includes('해운대')) return '부산';
    if (str.includes('대구') || str.includes('수성') || str.includes('달서')) return '대구';
    if (str.includes('인천') || str.includes('부평') || str.includes('강화')) return '인천';
    if (str.includes('광주')) return '광주';
    if (str.includes('대전')) return '대전';
    if (str.includes('울산')) return '울산';
    if (str.includes('경기') || str.includes('안양') || str.includes('시흥') || str.includes('의정부') || str.includes('안산') || str.includes('이천') || str.includes('파주') || str.includes('여주') || str.includes('양주') || str.includes('부천') || str.includes('광명') || str.includes('평택') || str.includes('수원')) return '경기';
    if (str.includes('강원') || str.includes('동해') || str.includes('태백') || str.includes('속초') || str.includes('삼척') || str.includes('강릉') || str.includes('원주') || str.includes('춘천')) return '강원';
    if (str.includes('충북') || str.includes('충청북') || str.includes('충주') || str.includes('청주') || str.includes('제천')) return '충북';
    if (str.includes('충남') || str.includes('충청남') || str.includes('천안') || str.includes('아산') || str.includes('금산') || str.includes('홍성')) return '충남';
    if (str.includes('전북') || str.includes('전라북') || str.includes('부안') || str.includes('익산') || str.includes('임실') || str.includes('정읍') || str.includes('김제')) return '전북';
    if (str.includes('전남') || str.includes('전라남') || str.includes('보성') || str.includes('해남') || str.includes('목포') || str.includes('담양') || str.includes('광양')) return '전남';
    if (str.includes('경북') || str.includes('경상북') || str.includes('안동') || str.includes('포항') || str.includes('영주') || str.includes('김천') || str.includes('경주')) return '경북';
    if (str.includes('경남') || str.includes('경상남') || str.includes('창원') || str.includes('거제') || str.includes('진주') || str.includes('김해') || str.includes('양산')) return '경남';
    if (str.includes('제주') || str.includes('서귀포')) return '제주';
    if (str.includes('세종')) return '세종';
    return null;
  };

  return matchRegion(address) || matchRegion(name) || '기타';
};

export const getSlug = (address, name) => {
  const region = getRegionShortName(address, name);
  const cleanName = name.replace(/[\s/\\_]+/g, '');
  return `${region}-${cleanName}`;
};
