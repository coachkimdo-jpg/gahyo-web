import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true }, { status: 200 });
  
  // 인증 쿠키 만료(삭제) 처리
  response.cookies.set('admin_auth_token', '', {
    httpOnly: true,
    expires: new Date(0), // 즉시 만료
    path: '/'
  });

  return response;
}
