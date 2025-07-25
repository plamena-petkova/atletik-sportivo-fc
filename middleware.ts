import { NextRequest, NextResponse } from 'next/server';

const SUPPORTED_LANGUAGES = ['en', 'bg'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;


  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.match(/\.[^\/]+$/) ||
    SUPPORTED_LANGUAGES.some((lang) => pathname.startsWith(`/${lang}`))
  ) {
    return NextResponse.next();
  }


  const langCookie = request.cookies.get('lang')?.value;
  const fromCookie = SUPPORTED_LANGUAGES.includes(langCookie || '') ? langCookie : null;

  const acceptLang = request.headers.get('accept-language') || '';
  const browserLang = acceptLang.split(',')[0].split('-')[0];
  const fromBrowser = SUPPORTED_LANGUAGES.includes(browserLang) ? browserLang : null;

  const locale = fromCookie || fromBrowser || 'en';

  const newUrl = request.nextUrl.clone();
  newUrl.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
