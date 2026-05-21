import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    // 하드코딩된 임시 최고 관리자 계정 (향후 DB 연동 시 교체)
    const ADMIN_USER = process.env.ADMIN_USERNAME || 'gahyofuneral@naver.com';
    const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'kdh953828!!';

    if (username === ADMIN_USER && password === ADMIN_PASS) {
      // 인증 성공 시 쿠키 발급
      const response = NextResponse.json({ success: true }, { status: 200 });
      
      // HttpOnly, Secure(프로덕션에서만), SameSite 옵션 적용
      response.cookies.set('admin_auth_token', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 // 24시간 유지
      });

      return response;
    } else {
      return NextResponse.json({ error: '아이디 또는 비밀번호가 일치하지 않습니다.' }, { status: 401 });
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
