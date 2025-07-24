import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const pathname = request.nextUrl.pathname;
  const isAdminRoute = pathname.startsWith('/admin');
  const isMyAccountRoute = pathname.startsWith('/myaccount');
  const isDangKyRoute = pathname.startsWith('/dangky')

  if ((isAdminRoute || isMyAccountRoute || isDangKyRoute) && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/myaccount/:path*', '/dangky/:path*'],
};
