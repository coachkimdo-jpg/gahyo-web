export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://gahyo.co.kr/sitemap.xml',
  };
}
