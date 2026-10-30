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
  const isAdminLogin = pathname === "/admin/login";
  const isAdminRoute = pathname.startsWith("/admin");

  const isAuthPage =
    pathname === "/login" ||
    pathname === "/register";

  const publicRoutes = [
    "/",
    "/news",
    "/category",
    "/contact"
  ];

  const isPublic = publicRoutes.some(
    (route) =>
      route === "/"
        ? pathname === "/"
        : pathname === route || pathname.startsWith(`${route}/`)
  );


  // =========================
  // NO TOKEN
  // =========================
  if (!token) {
    if (isAdminLogin || isAuthPage || isPublic) {
      return NextResponse.next();
    }

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

    // expired token
    if (decoded.exp || decoded.exp <= Date.now() / 1000) {
      throw new Error("Token expired or missing expiry");
    }

    const role =
    decoded.role ??
    decoded[
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    ];

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