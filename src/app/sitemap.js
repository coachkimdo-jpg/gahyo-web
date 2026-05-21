import fs from 'fs';
import path from 'path';
import ossuaries from '@/lib/ossuaries.json';
import naturalBurials from '@/lib/naturalBurials.json';
import graveyards from '@/lib/graveyards.json';

export const dynamic = 'force-dynamic'; // 항상 최신 데이터를 반영하도록 설정

export default async function sitemap() {
  const baseUrl = 'https://gahyo.com';

  // 정적 페이지 목록
  const staticPages = [
    '',
    '/about',
    '/terms',
    '/privacy',
    '/guide',
    '/products',
    '/estimate',
    '/cemeteries',
  ];

  // 정적 페이지의 lastmod는 해당 페이지 소스 코드의 수정 날짜를 추적하거나 빌드 시점 활용
  // Vercel 환경에서는 파일 시스템 접근이 빌드 시점 시간으로 고정될 수 있으므로, 현재 시간(동적 렌더링 시점)이나 특정 파일 업데이트 시간을 기준으로 잡을 수 있습니다.
  const staticUrls = staticPages.map((route) => {
    let lastmod = new Date().toISOString();
    try {
      // 로컬/개발 환경에서 페이지 파일의 실제 수정 시간 추적
      const pagePath = path.join(process.cwd(), 'src', 'app', route === '' ? 'page.js' : `${route}/page.js`);
      if (fs.existsSync(pagePath)) {
        const stats = fs.statSync(pagePath);
        lastmod = stats.mtime.toISOString();
      }
    } catch (e) {
      // 무시하고 기본값 사용
    }

    return {
      url: `${baseUrl}${route}`,
      lastModified: lastmod,
      changeFrequency: route === '' ? 'daily' : 'weekly',
      priority: route === '' ? 1.0 : 0.8,
    };
  });

  // 동적 페이지: 봉안당 목록
  const ossuaryUrls = ossuaries.map((facility) => ({
    url: `${baseUrl}/cemeteries/ossuary/${facility.id}`,
    lastModified: facility.updatedAt || new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // 동적 페이지: 자연장지 목록
  const naturalBurialUrls = naturalBurials.map((facility) => ({
    url: `${baseUrl}/cemeteries/natural/${facility.id}`,
    lastModified: facility.updatedAt || new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // 동적 페이지: 묘지 목록
  const graveyardUrls = graveyards.map((facility) => ({
    url: `${baseUrl}/cemeteries/graveyard/${facility.id}`,
    lastModified: facility.updatedAt || new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // 동적 페이지: 장례 가이드 게시물
  let articleUrls = [];
  try {
    const dbPath = path.join(process.cwd(), 'src', 'lib', 'db.json');
    if (fs.existsSync(dbPath)) {
      const dbContent = fs.readFileSync(dbPath, 'utf8');
      const articles = JSON.parse(dbContent);
      articleUrls = articles.map(article => ({
        url: `${baseUrl}/guide/${article.id}`,
        lastModified: article.publishedAt ? new Date(article.publishedAt).toISOString() : new Date().toISOString(),
        changeFrequency: 'weekly',
        priority: 0.8,
      }));
    }
  } catch (e) {
    console.error('Failed to generate article sitemap:', e);
  }

  // 동적 페이지: 장례식장 정보
  let hallUrls = [];
  try {
    const hallsPath = path.join(process.cwd(), 'src', 'lib', 'realData.json');
    if (fs.existsSync(hallsPath)) {
      const hallsContent = fs.readFileSync(hallsPath, 'utf8');
      const halls = JSON.parse(hallsContent);
      hallUrls = halls.map(hall => ({
        url: `${baseUrl}/halls/${hall.id}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.7,
      }));
    }
  } catch (e) {
    console.error('Failed to generate hall sitemap:', e);
  }

  // 모든 URL 합치기
  return [...staticUrls, ...ossuaryUrls, ...naturalBurialUrls, ...graveyardUrls, ...articleUrls, ...hallUrls];
}
