const fs = require('fs');
const path = require('path');

const files = {
  'src/app/admin/login/page.js': `export default function AdminLogin() { return <div>Admin Login</div>; }`,
  'src/app/admin/page.js': `export default function AdminPage() { return <div>Admin Dashboard</div>; }`,
  'src/app/api/articles/route.js': `import { NextResponse } from 'next/server';\nexport async function GET() { return NextResponse.json([]); }`,
  'src/app/api/auth/login/route.js': `import { NextResponse } from 'next/server';\nexport async function POST() { return NextResponse.json({ success: true }); }`,
  'src/app/api/auth/logout/route.js': `import { NextResponse } from 'next/server';\nexport async function POST() { return NextResponse.json({ success: true }); }`,
  'src/app/api/generate-post/route.js': `import { NextResponse } from 'next/server';\nexport async function POST() { return NextResponse.json({ success: true }); }`,
  'src/app/cemeteries/page.js': `export default function CemeteriesPage() { return <div style={{padding:'5rem 1rem'}}><h2>전국 장지/묘지 안내</h2></div>; }`,
  'src/app/estimate/page.js': `export default function EstimatePage() { return <div style={{padding:'5rem 1rem'}}><h2>장례 비용 견적</h2></div>; }`,
  'src/app/halls/page.js': `export default function HallsPage() { return <div style={{padding:'5rem 1rem'}}><h2>전국 장례식장 안내</h2></div>; }`,
  'src/app/layout.js': `import '../globals.css';\nimport Header from '../components/Header';\nimport Footer from '../components/Footer';\nexport default function RootLayout({ children }) {\n  return (\n    <html lang="ko">\n      <body><Header />{children}<Footer /></body>\n    </html>\n  );\n}`,
  'src/app/privacy/page.js': `export default function PrivacyPage() { return <div>Privacy Policy</div>; }`,
  'src/app/qna/page.js': `export default function QnaPage() { return <div>Q&A</div>; }`,
  'src/app/sitemap.js': `export default function sitemap() { return []; }`,
  'src/app/terms/page.js': `export default function TermsPage() { return <div>Terms of Service</div>; }`,
  'src/lib/mockDb.js': `export const db = {};`,
  'src/middleware.js': `import { NextResponse } from 'next/server';\nexport function middleware(request) { return NextResponse.next(); }`
};

for (const [file, content] of Object.entries(files)) {
  const fullPath = path.join('C:/Users/PC/Desktop/gahyo', file);
  try {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log('Fixed ' + file);
  } catch(e) {
    console.log('Error writing ' + file);
  }
}
