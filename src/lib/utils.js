export const getRegionShortName = (address) => {
  if (!address) return '기타';
  const fw = address.split(' ')[0];
  if (fw.startsWith('서울')) return '서울';
  if (fw.startsWith('부산')) return '부산';
  if (fw.startsWith('대구')) return '대구';
  if (fw.startsWith('인천')) return '인천';
  if (fw.startsWith('광주')) return '광주';
  if (fw.startsWith('대전')) return '대전';
  if (fw.startsWith('울산')) return '울산';
  if (fw.startsWith('세종')) return '세종';
  if (fw.startsWith('경기')) return '경기';
  if (fw.startsWith('강원')) return '강원';
  if (fw.startsWith('충북') || fw.startsWith('충청북')) return '충북';
  if (fw.startsWith('충남') || fw.startsWith('충청남')) return '충남';
  if (fw.startsWith('전북') || fw.startsWith('전라북')) return '전북';
  if (fw.startsWith('전남') || fw.startsWith('전라남')) return '전남';
  if (fw.startsWith('경북') || fw.startsWith('경상북')) return '경북';
  if (fw.startsWith('경남') || fw.startsWith('경상남')) return '경남';
  if (fw.startsWith('제주')) return '제주';
  return fw.slice(0, 2);
};

export const getSlug = (address, name) => {
  const region = getRegionShortName(address);
  const cleanName = name.replace(/[\s/\\_]+/g, '-');
  return `${region}-${cleanName}`;
};
