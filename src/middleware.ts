// middleware.ts
import jwtDecode from 'jwt-decode';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { IAuth } from './types/user';

export function middleware(request: NextRequest) {
  if (request.cookies.has('access_token')) {
    const payload: IAuth = jwtDecode(
      request.cookies.get('access_token')!.value,
    );
    // 회원가입을 하지 않은 사용자는 회원가입 페이지로 이동
    if (payload.role === 'ROLE_GUEST' && request.nextUrl.pathname !== '/join') {
      return NextResponse.redirect(new URL('/join', request.url));
    }

    // 로그인을 하지 않은 사용자는 로그인 페이지로 이동
  } else if (!request.cookies.has('refresh_token')) {
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${request.nextUrl.pathname}`, request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/join/:path*', '/charge', '/complete', '/mypage/:path*'],
};
