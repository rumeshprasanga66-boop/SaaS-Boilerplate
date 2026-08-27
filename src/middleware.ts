import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { AllLocales, AppConfig } from './utils/AppConfig';

const intlMiddleware = createMiddleware({
  locales: AllLocales,
  localePrefix: AppConfig.localePrefix,
  defaultLocale: AppConfig.defaultLocale,
});

export default function middleware(request: NextRequest) {
  // API routes must not be locale-rewritten — pass through unchanged.
  if (request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next();
  }
  return intlMiddleware(request);
}

// Edge runtime is required for Cloudflare Workers (Node runtime is unsupported).
export const runtime = 'experimental-edge';

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next|monitoring).*)', '/', '/(api|trpc)(.*)'], // Also exclude tunnelRoute used in Sentry from the matcher
};
