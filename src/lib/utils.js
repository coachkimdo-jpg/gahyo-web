export const getRegionShortName = (address, name = '') => {
  if (address) {
    const prefixes = {
      '서울': '서울', '부산': '부산', '대구': '대구', '인천': '인천', 
      '광주': '광주', '대전': '대전', '울산': '울산', '세종': '세종', 
      '경기': '경기', '강원': '강원', '충북': '충북', '충청북': '충북', 
      '충남': '충남', '충청남': '충남', '전북': '전북', '전라북': '전북', 
      '전남': '전남', '전라남': '전남', '경북': '경북', '경상북': '경북', 
      '경남': '경남', '경상남': '경남', '제주': '제주'
    };
    for (let prefix in prefixes) {
      if (address.trim().startsWith(prefix)) return prefixes[prefix];
    }
  }

  const matchRegion = (str) => {
    if (!str) return null;
    if (str.includes('서울') || str.includes('은평구') || str.includes('노원구') || str.includes('영등포구') || str.includes('강남구') || str.includes('서초구')) return '서울';
    if (str.includes('부산') || str.includes('동래구') || str.includes('해운대구')) return '부산';
    if (str.includes('대구') || str.includes('수성구') || str.includes('달서구')) return '대구';
    if (str.includes('인천') || str.includes('부평구') || str.includes('강화군')) return '인천';
    if (str.includes('광주')) return '광주';
    if (str.includes('대전')) return '대전';
    if (str.includes('울산')) return '울산';
    if (str.includes('경기') || str.includes('안양시') || str.includes('시흥시') || str.includes('의정부시') || str.includes('안산시') || str.includes('이천시') || str.includes('파주시') || str.includes('여주시') || str.includes('양주시') || str.includes('부천시') || str.includes('광명시') || str.includes('평택시') || str.includes('수원시')) return '경기';
    if (str.includes('강원') || str.includes('동해시') || str.includes('태백시') || str.includes('속초시') || str.includes('삼척시') || str.includes('강릉시') || str.includes('원주시') || str.includes('춘천시')) return '강원';
    if (str.includes('충북') || str.includes('충청북') || str.includes('충주시') || str.includes('청주시') || str.includes('제천시')) return '충북';
    if (str.includes('충남') || str.includes('충청남') || str.includes('천안시') || str.includes('아산시') || str.includes('금산군') || str.includes('홍성군')) return '충남';
    if (str.includes('전북') || str.includes('전라북') || str.includes('부안군') || str.includes('익산시') || str.includes('임실군') || str.includes('정읍시') || str.includes('김제시')) return '전북';
    if (str.includes('전남') || str.includes('전라남') || str.includes('보성군') || str.includes('해남군') || str.includes('목포시') || str.includes('담양군') || str.includes('광양시')) return '전남';
    if (str.includes('경북') || str.includes('경상북') || str.includes('안동시') || str.includes('포항시') || str.includes('영주시') || str.includes('김천시') || str.includes('경주시')) return '경북';
    if (str.includes('경남') || str.includes('경상남') || str.includes('창원시') || str.includes('거제시') || str.includes('진주시') || str.includes('김해시') || str.includes('양산시')) return '경남';
    if (str.includes('제주') || str.includes('서귀포시')) return '제주';
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
