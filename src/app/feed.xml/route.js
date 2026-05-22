import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const baseUrl = 'https://gahyo.co.kr';
  
  let articles = [];
  try {
    const dbPath = path.join(process.cwd(), 'src', 'lib', 'db.json');
    if (fs.existsSync(dbPath)) {
      const dbContent = fs.readFileSync(dbPath, 'utf8');
      articles = JSON.parse(dbContent);
    }
  } catch (e) {
    console.error('Failed to load articles for RSS:', e);
  }

  // 최신순 정렬
  articles.sort((a, b) => {
    return new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0);
  });

  const rssItemsXml = articles.map(article => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${baseUrl}/guide/${article.id}</link>
      <guid>${baseUrl}/guide/${article.id}</guid>
      <pubDate>${new Date(article.publishedAt || new Date()).toUTCString()}</pubDate>
      <description><![CDATA[${article.summary || article.title}]]></description>
      ${article.category ? `<category>${article.category}</category>` : ''}
    </item>
  `).join('');

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>가효상조 장례 가이드</title>
      <link>${baseUrl}</link>
      <description>가효상조에서 제공하는 유익한 장례 정보 및 가이드입니다.</description>
      <language>ko-KR</language>
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
