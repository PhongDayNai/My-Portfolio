import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJWT } from './lib/jwt';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Read session cookie
  const sessionCookie = request.cookies.get('session')?.value;
  const jwtSecret = process.env.JWT_SECRET || 'fallback_secret_key_12345678';
  
  let isValidSession = false;
  if (sessionCookie) {
    const payload = await verifyJWT(sessionCookie, jwtSecret);
    if (payload && payload.username) {
      isValidSession = true;
    }
  }

  // Case 1: Trying to access protected routes (like /settings) without a valid session
  if (pathname.startsWith('/settings')) {
    if (!isValidSession) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      
      const response = NextResponse.redirect(loginUrl);
      // Prevent browser caching of redirects
      response.headers.set('Cache-Control', 'no-store, max-age=0, must-revalidate');
      return response;
    }
  }

  // Case 2: Trying to access the login page with an active valid session
  if (pathname === '/login') {
    if (isValidSession) {
      const settingsUrl = new URL('/settings', request.url);
      return NextResponse.redirect(settingsUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/settings/:path*', '/login'],
};
