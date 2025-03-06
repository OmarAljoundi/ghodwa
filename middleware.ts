import { betterFetch } from "@better-fetch/fetch";
import { NextResponse, type NextRequest } from "next/server";
import { auth } from "./auth";
import i18nConfig from "./i18nConfig";
import { i18nRouter } from "next-i18n-router";

type Session = typeof auth.$Infer.Session;

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const { data: session } = await betterFetch<Session>(
      "/api/auth/get-session",
      {
        baseURL: request.nextUrl.origin,
        cache: "force-cache",
        headers: {
          cookie: request.headers.get("cookie") || "",
        },
      }
    );

    if (!session) {
      const callbackUrl = encodeURIComponent(
        request.nextUrl.pathname + request.nextUrl.search
      );
      return NextResponse.redirect(
        new URL(`/login?callback=${callbackUrl}`, request.url)
      );
    }

    const headers = new Headers(request.headers);
    headers.set("x-current-path", request.nextUrl.pathname);
    return NextResponse.next({ headers });
  }

  return i18nRouter(request, i18nConfig);
}

export const config = {
  matcher: [
    {
      source:
        "/((?!api|_next|_vercel|favicon.ico|sitemap.xml|robots.txt|login|.*\\..*).*)",
      missing: [{ type: "header", key: "next-action" }],
    },
  ],
};
