import { NextResponse } from 'next/server';

export function middleware(request) {
  // 현재 접속하려는 경로 확인
  const path = request.nextUrl.pathname;

  // /admin 으로 시작하는 경로에 대해서만 검사하되, /admin/login 경로는 제외
  if (path.startsWith('/admin') && !path.startsWith('/admin/login')) {
    // 브라우저 쿠키에서 'admin_auth_token' 값 확인
    const token = request.cookies.get('admin_auth_token')?.value;

    // 토큰이 없거나 유효하지 않으면 로그인 페이지로 리다이렉트
    if (token !== 'authenticated') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // 그 외의 경우는 정상적으로 요청 통과
  return NextResponse.next();
}

// 미들웨어가 적용될 특정 경로 설정 (필요없는 리소스 호출 방지용)
export const config = {
  matcher: ['/admin/:path*'],
};
