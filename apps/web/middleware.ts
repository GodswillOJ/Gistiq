
import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

type TokenPayload = {
  sub?: string;
  email?: string;
  exp?: number;
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
    "/contact",
  ];

  const isPublic = publicRoutes.some(
    (route) =>
      route === "/"
        ? pathname === "/"
        : pathname === route || pathname.startsWith(`${route}/`)
  );

  // Allow login and registration pages without a token.
  if (!token) {
    if (isAdminLogin || isAuthPage || isPublic) {
      return NextResponse.next();
    }

    if (isAdminRoute) {
      return NextResponse.redirect(
        new URL("/admin/login", request.url)
      );
    }

    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  let decoded: TokenPayload;

  try {
    decoded = jwtDecode<TokenPayload>(token);

    if (!decoded.exp || decoded.exp <= Date.now() / 1000) {
      throw new Error("Token expired or missing expiry");
    }
  } catch {
    const response = NextResponse.next();
    response.cookies.delete("token");
    return response;
  }

  const role =
    decoded.role ??
    decoded[
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    ];

  // Admin login page: send an existing admin to the dashboard.
  if (isAdminLogin && role === "Admin") {
    return NextResponse.redirect(
      new URL("/admin/dashboard", request.url)
    );
  }

  // Admin routes require the Admin role.
  if (isAdminRoute && role !== "Admin") {
    return NextResponse.redirect(
      new URL("/", request.url)
    );
  }

  // Prevent logged-in users from revisiting normal login pages.
  if (isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
