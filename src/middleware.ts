// import createMiddleware from "next-intl/middleware";
// import { routing } from "./i18n/routing";
// import { NextRequest, NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";

// const authRoutes = ["/login", "/register", "/forgot", "/newpassword" , "/otp"];
// const publicRoutes = ["/"];

// // middleware.ts
// export default async function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   // Get authentication token
//   const token = await getToken({
//     req: request,
//     secret: process.env.NEXTAUTH_SECRET,
//   });

//   // Extract pathname without locale
//   const localeRegex = /^\/(en|ar)(\/|$)/;
//   const pathnameWithoutLocale = localeRegex.test(pathname)
//     ? pathname.replace(localeRegex, "/")
//     : pathname || "/";

//   // Check route types
//   const isAuthRoute = authRoutes.includes(pathnameWithoutLocale);
//   const isPublicRoute = publicRoutes.includes(pathnameWithoutLocale);
//   const isProtectedRoute = !isPublicRoute && !isAuthRoute;

//   // Scenario 1: Authenticated user trying to access auth pages
//   if (isAuthRoute && token) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   // Scenario 2: Unauthenticated user trying to access protected routes
//   if (isProtectedRoute && !token) {
//     const loginUrl = new URL("/login", request.url);
//     loginUrl.searchParams.set("callbackUrl", pathname);
//     return NextResponse.redirect(loginUrl);
//   }

//   // Scenario 3: Allow public routes and apply i18n middleware
//   return createMiddleware(routing)(request);
// }

// export const config = {
//   matcher: [
//     "/((?!api|trpc|_next|_vercel|_next/static|_next/image|.*\\..*|.*\\.png$).*)",
//   ],
// };


// middleware.ts
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import type { NextRequest } from "next/server";


export default async function middleware(request: NextRequest) {
  return await createMiddleware(routing)(request);
}

export const config = {
  matcher: [
    "/((?!api|trpc|_next|_vercel|_next/static|_next/image|.*\\..*|.*\\.png$).*)",
  ],
};
