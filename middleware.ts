import { betterFetch } from "@better-fetch/fetch";
import { NextResponse, type NextRequest } from "next/server";
import { auth } from "./auth";
import i18nConfig from "./i18nConfig";
import { i18nRouter } from "next-i18n-router";

type Session = typeof auth.$Infer.Session;

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin")) {
    console.log("Calling TOKEN");
    const { data: session } = await betterFetch<Session>(
      "/api/auth/get-session",
      {
        baseURL: request.nextUrl.origin,
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

    return NextResponse.next();
  }

  return i18nRouter(request, i18nConfig);
}

export const config = {
  matcher: [
    {
      source:
        "/((?!api|_next|_vercel|favicon.ico|sitemap.xml|robots.txt|login|.*\\..*).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
