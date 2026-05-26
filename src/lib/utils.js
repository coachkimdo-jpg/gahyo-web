export const getRegionShortName = (address, name = '') => {
  const text = `${address} ${name}`;
  
  if (text.includes('서울') || text.includes('은평') || text.includes('노원') || text.includes('영등포') || text.includes('강남') || text.includes('서초')) return '서울';
  if (text.includes('부산') || text.includes('동래') || text.includes('해운대')) return '부산';
  if (text.includes('대구') || text.includes('수성') || text.includes('달서')) return '대구';
  if (text.includes('인천') || text.includes('부평') || text.includes('강화')) return '인천';
  if (text.includes('광주')) return '광주';
  if (text.includes('대전')) return '대전';
  if (text.includes('울산')) return '울산';
  if (text.includes('세종')) return '세종';
  if (text.includes('경기') || text.includes('안양') || text.includes('시흥') || text.includes('의정부') || text.includes('안산') || text.includes('이천') || text.includes('파주') || text.includes('여주') || text.includes('양주')) return '경기';
  if (text.includes('강원') || text.includes('동해') || text.includes('태백') || text.includes('속초') || text.includes('삼척') || text.includes('강릉') || text.includes('원주') || text.includes('춘천')) return '강원';
  if (text.includes('충북') || text.includes('충청북') || text.includes('충주') || text.includes('청주') || text.includes('제천')) return '충북';
  if (text.includes('충남') || text.includes('충청남') || text.includes('천안') || text.includes('아산') || text.includes('금산') || text.includes('홍성')) return '충남';
  if (text.includes('전북') || text.includes('전라북') || text.includes('부안') || text.includes('익산') || text.includes('임실') || text.includes('정읍') || text.includes('김제')) return '전북';
  if (text.includes('전남') || text.includes('전라남') || text.includes('보성') || text.includes('해남') || text.includes('목포') || text.includes('담양') || text.includes('광양')) return '전남';
  if (text.includes('경북') || text.includes('경상북') || text.includes('안동') || text.includes('포항') || text.includes('영주') || text.includes('김천') || text.includes('경주')) return '경북';
  if (text.includes('경남') || text.includes('경상남') || text.includes('창원') || text.includes('거제') || text.includes('진주') || text.includes('김해') || text.includes('양산')) return '경남';
  if (text.includes('제주') || text.includes('서귀포')) return '제주';
  
  return '기타';
};

export const getSlug = (address, name) => {
  const region = getRegionShortName(address, name);
  const cleanName = name.replace(/[\s/\\_]+/g, '');
  return `${region}-${cleanName}`;
};
