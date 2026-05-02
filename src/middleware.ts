// import createMiddleware from "next-intl/middleware";
// import { getToken, type JWT } from "next-auth/jwt";
// import { NextResponse, type NextRequest } from "next/server";
// import { routing } from "./i18n/routing";

// const intlMiddleware = createMiddleware(routing);

// const authRoutes = ["/login", "/register"];
// const publicRoutes = ["/choosetrack"];

// const protectedRoutes = [
//   "/",
//   "/projects",
//   "/cv",
//   "/cv-result",
//   "/exam",
//   "/experience",
//   "/Linkedin",
//   "/profile",
//   "/learning-plan",
//   "/acad-courses",
//   "/certificates",
//   "/trends",
//   "/assesment",
//   "/assesment-access",
//   "/assesment-first",
//   "/doctor-view",
//   "/add-new-exam",
//   "/past-exams",
//   "/profile-doctor",
//   "/:id/questions",
//   "/:id/results",
// ];

// type AuthenticatedToken = JWT & {
//   accessToken: NonNullable<JWT["accessToken"]>;
// };

// function getLocalePrefix(pathname: string) {
//   const locale = routing.locales.find(
//     (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
//   );

//   return locale ? `/${locale}` : "";
// }

// function stripLocale(pathname: string) {
//   const localePrefix = getLocalePrefix(pathname);

//   if (!localePrefix) {
//     return pathname || "/";
//   }

//   const pathnameWithoutLocale = pathname.slice(localePrefix.length);
//   return pathnameWithoutLocale || "/";
// }

// function isExactRoute(pathname: string, routes: string[]) {
//   return routes.includes(pathname);
// }

// function isNestedRoute(pathname: string, route: string) {
//   return pathname === route || pathname.startsWith(`${route}/`);
// }

// function isTemplateRoute(pathname: string, route: string) {
//   const pathnameSegments = pathname.split("/").filter(Boolean);
//   const routeSegments = route.split("/").filter(Boolean);

//   if (pathnameSegments.length !== routeSegments.length) {
//     return false;
//   }

//   return routeSegments.every((segment, index) => {
//     return segment.startsWith(":") || segment === pathnameSegments[index];
//   });
// }

// function isProtectedRoute(pathname: string) {
//   return protectedRoutes.some((route) => {
//     if (route.includes(":")) {
//       return isTemplateRoute(pathname, route);
//     }

//     return isNestedRoute(pathname, route);
//   });
// }

// function isTokenValid(token: JWT | null): token is AuthenticatedToken {
//   if (!token?.accessToken) {
//     return false;
//   }

//   if (typeof token.exp === "number" && token.exp < Math.floor(Date.now() / 1000)) {
//     return false;
//   }

//   return true;
// }

// async function getAuthToken(request: NextRequest) {
//   try {
//     return await getToken({
//       req: request,
//       secret: process.env.NEXTAUTH_SECRET,
//     });
//   } catch {
//     return null;
//   }
// }

// function getAuthenticatedRedirectPath(token: AuthenticatedToken, localePrefix: string) {
//   const role = typeof token.role === "string" ? token.role.toUpperCase() : "";

//   if (role === "TEACHER" || role === "INSTRUCTOR" || role === "ADMIN") {
//     return `${localePrefix}/doctor-view`;
//   }

//   if (token.isFirstTime) {
//     return `${localePrefix}/assesment-access`;
//   }

//   return localePrefix || "/";
// }

// export default async function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;
//   const localePrefix = getLocalePrefix(pathname);
//   const pathnameWithoutLocale = stripLocale(pathname);

//   const token = await getAuthToken(request);
//   const isAuthenticated = isTokenValid(token);
//   const isAuthRoute = isExactRoute(pathnameWithoutLocale, authRoutes);
//   const isPublicRoute = isExactRoute(pathnameWithoutLocale, publicRoutes);
//   const isProtected = isProtectedRoute(pathnameWithoutLocale);

//   if (isAuthRoute && isAuthenticated) {
//     return NextResponse.redirect(
//       new URL(getAuthenticatedRedirectPath(token, localePrefix), request.url),
//     );
//   }

//   if (isProtected && !isPublicRoute && !isAuthenticated) {
//     const loginPath = `${localePrefix}/login`;
//     const loginUrl = new URL(loginPath, request.url);
//     const callbackUrl = request.nextUrl.pathname + request.nextUrl.search;

//     loginUrl.searchParams.set("callbackUrl", callbackUrl);

//     return NextResponse.redirect(loginUrl);
//   }

//   return intlMiddleware(request);
// }

// export const config = {
//   matcher: ["/((?!api|trpc|_next|_vercel|_next/static|_next/image|images|.*\\..*).*)"],
// };


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
