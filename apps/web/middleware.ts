import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

type TokenPayload = {
  sub: string;
  email: string;
  exp: number;
  role?: string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string;
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("token")?.value;

  const isAuthPage =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register");

  const isAdminRoute = pathname.startsWith("/admin");
  const isAdminLogin = pathname.startsWith("/admin/login");

  const publicRoutes = [
    "/",
    "/news",
    "/category",
    "/contact"
  ];

  const isPublic = publicRoutes.some((r) =>
    pathname.startsWith(r)
  );

  // =========================
  // NO TOKEN
  // =========================
  if (!token) {
    if (isAdminRoute) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    if (isAuthPage) {
      return NextResponse.next();
    }

    if (isPublic) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const decoded = jwtDecode<TokenPayload>(token);

    const role =
      decoded.role ??
      decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    const currentTime = Date.now() / 1000;

    // expired token
    if (decoded.exp < currentTime) {
      const res = NextResponse.redirect(new URL("/login", request.url));
      res.cookies.delete("token");
      return res;
    }

    // =========================
    // ADMIN PROTECTION
    // =========================
    if (isAdminRoute && role !== "Admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // =========================
    // ADMIN LOGIN BLOCK IF ALREADY ADMIN
    // =========================
    if (isAdminLogin && role === "Admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    // =========================
    // BLOCK LOGIN/REGISTER IF LOGGED IN
    // =========================
    if (isAuthPage && token) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  } catch {
    const res = NextResponse.redirect(new URL("/login", request.url));
    res.cookies.delete("token");
    return res;
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
};