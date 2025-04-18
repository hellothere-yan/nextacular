import { NextResponse } from 'next/server';
import { clerkMiddleware } from '@clerk/nextjs/server';

function multiTenantRewrite(req) {
  const { host } = new URL(process.env.APP_URL);
  const url = req.nextUrl.clone();
  const { pathname } = req.nextUrl;
  const hostname = req.headers.get('host');
  const currentHost = hostname.replace(`.${host}`, '');

  if (pathname.startsWith(`/_sites`)) {
    return new Response(null, { status: 404 });
  }

  if (!pathname.includes('.') && !pathname.startsWith('/api')) {
    if (hostname === host) {
      url.pathname = `${pathname}`;
    } else {
      url.pathname = `/_sites/${currentHost}${pathname}`;
    }

    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

// 将 Clerk 中间件包住你的逻辑
const middleware = clerkMiddleware((auth, req) => {
  return multiTenantRewrite(req);
});

export default middleware;

export const config = {
  matcher: [
    // 忽略 Next.js 静态资源路径
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};

