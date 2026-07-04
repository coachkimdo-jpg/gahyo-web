import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const baseUrl = 'https://gahyo.co.kr';

  let articles = [];
  try {
    // articles.json 사용 (db.json은 더 이상 사용하지 않음)
    const articlesPath = path.join(process.cwd(), 'src', 'lib', 'articles.json');
    if (fs.existsSync(articlesPath)) {
      const content = fs.readFileSync(articlesPath, 'utf8');
      articles = JSON.parse(content);
    }
  } catch (e) {
    console.error('Failed to load articles for RSS:', e);
  }

  // 최신순 정렬
  articles.sort((a, b) => {
    return new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0);
  });

  const rssItemsXml = articles.map(article => {
    // slug 우선, 없으면 id fallback
    const urlKey = article.slug || article.id;
    // 네이버 RSS 가이드: description에 전문 본문 필요
    const fullContent = article.content || article.summary || article.title;
    return `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${baseUrl}/guide/${encodeURIComponent(urlKey)}</link>
      <guid>${baseUrl}/guide/${encodeURIComponent(urlKey)}</guid>
      <pubDate>${new Date(article.publishedAt || new Date()).toUTCString()}</pubDate>
      <description><![CDATA[${fullContent}]]></description>
      ${article.category ? `<category>${article.category}</category>` : ''}
    </item>
  `;
  }).join('');

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>가효상조 장례 가이드</title>
    <link>${baseUrl}</link>
    <description>가효상조에서 제공하는 유익한 장례 정보 및 가이드입니다.</description>
    <language>ko-KR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <item>
      <title><![CDATA[가효상조 | AI 기반 투명한 장례 서비스]]></title>
      <link>${baseUrl}/</link>
      <guid>${baseUrl}/</guid>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <description><![CDATA[AI 기반 장례 견적부터 전국 장례식장 검색, 장지 안내까지. 가효상조와 함께 품격 있는 작별을 준비하세요.]]></description>
    </item>
    ${rssItemsXml}
  </channel>
</rss>`;

  return new NextResponse(rssFeed, {
    headers: {
      'Content-Type': 'text/xml',
      'Cache-Control': 's-maxage=86400, stale-while-revalidate',
    },
  });
}
