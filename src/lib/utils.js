export const getRegionShortName = (address, name = '') => {
  const text = `${address} ${name}`;
  if (text.includes('서울')) return '서울';
  if (text.includes('부산')) return '부산';
  if (text.includes('대구')) return '대구';
  if (text.includes('인천')) return '인천';
  if (text.includes('광주')) return '광주';
  if (text.includes('대전')) return '대전';
  if (text.includes('울산')) return '울산';
  if (text.includes('세종')) return '세종';
  if (text.includes('경기')) return '경기';
  if (text.includes('강원')) return '강원';
  if (text.includes('충북') || text.includes('충청북')) return '충북';
  if (text.includes('충남') || text.includes('충청남')) return '충남';
  if (text.includes('전북') || text.includes('전라북')) return '전북';
  if (text.includes('전남') || text.includes('전라남')) return '전남';
  if (text.includes('경북') || text.includes('경상북')) return '경북';
  if (text.includes('경남') || text.includes('경상남')) return '경남';
  if (text.includes('제주')) return '제주';
  return '기타';
};

export const getSlug = (address, name) => {
  const region = getRegionShortName(address, name);
  const cleanName = name.replace(/[\s/\\_]+/g, '');
  return `${region}-${cleanName}`;
};
