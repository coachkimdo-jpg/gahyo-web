import { NextResponse } from 'next/server';

export function proxy(request) {
  // Generate a random nonce for CSP
  const nonce = btoa(crypto.randomUUID());
  
  // Construct a strict CSP using nonce and strict-dynamic
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' 'unsafe-eval' 'unsafe-inline' https:;
    style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://fonts.googleapis.com;
    img-src 'self' blob: data: https:;
    font-src 'self' data: https://fonts.gstatic.com;
    connect-src 'self' https:;
    frame-src 'self' https://bid.g.doubleclick.net https://td.doubleclick.net https://www.google.com https://www.google.co.kr;
    object-src 'none';
    base-uri 'none';
    frame-ancestors 'self';
    form-action 'self';
    upgrade-insecure-requests;
    require-trusted-types-for 'script';
  `.replace(/\s{2,}/g, ' ').trim();

  // Set the nonce and CSP on the request headers so they can be read by Server Components
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', cspHeader);
  requestHeaders.set('x-middleware-request-content-security-policy', cspHeader);

  const path = request.nextUrl.pathname;

  // /admin auth check
  if (path.startsWith('/admin') && !path.startsWith('/admin/login')) {
    const token = request.cookies.get('admin_auth_token')?.value;

    if (token !== 'authenticated') {
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.headers.set('Content-Security-Policy', cspHeader);
      return response;
    }
  }

  // Pass request to next handler
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Set the CSP header on the response
  response.headers.set('Content-Security-Policy', cspHeader);

  return response;
}

export const config = {
  matcher: [
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
