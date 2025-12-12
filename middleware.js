import { NextResponse } from "next/server";

export function middleware(request) {
  const access = request.cookies.get("access")?.value;

  const protectedRoutes = ["/dashboard", "/invitation", "/users", "/team"];

  const isProtected = protectedRoutes.some((p) =>
    request.nextUrl.pathname.startsWith(p)
  );

  if (isProtected && !access) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/invitation/:path*",
    "/users/:path*",
    "/team/:path*",
  ],
};
