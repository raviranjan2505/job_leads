import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
const PROTECTED_ROUTES = ["/admin"];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if the route is protected
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    const token = request.cookies.get("admin_token")?.value;

    if (!token) {
      // No token, redirect to sign-in
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    try {
      jwt.verify(token, JWT_SECRET);
      // Token is valid, proceed
      return NextResponse.next();
    } catch (error) {
      // Token is invalid or expired, redirect to sign-in
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
