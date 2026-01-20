import { type NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { auth } from './auth';
import { routing } from './i18n/routing';

const handleI18nRouting = createMiddleware(routing);

export async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      const callbackUrl = encodeURIComponent(request.nextUrl.pathname + request.nextUrl.search);
      return NextResponse.redirect(new URL(`/login?callback=${callbackUrl}`, request.url));
    }

    const headers = new Headers(request.headers);
    headers.set('x-current-path', request.nextUrl.pathname);
    return NextResponse.next({ headers });
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: [
    {
      source: '/((?!api|_next|_vercel|favicon.ico|sitemap.xml|robots.txt|login|.*\\..*).*)',
      missing: [{ type: 'header', key: 'next-action' }],
    },
  ],
};
