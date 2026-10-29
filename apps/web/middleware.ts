
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
    pathname === "/login" || pathname === "/register";

  const publicRoutes = ["/", "/news", "/category", "/contact"];

  const isPublic = publicRoutes.some((route) =>
    route === "/"
      ? pathname === "/"
      : pathname === route || pathname.startsWith(`${route}/`)
  );

  // Handle requests without a token.
  if (!token) {
    if (isAdminLogin || isAuthPage || isPublic) {
      return NextResponse.next();
    }

    if (isAdminRoute) {
      return NextResponse.redirect(
        new URL("/admin/login", request.url)
      );
    }

    return NextResponse.redirect(new URL("/login", request.url));
  }

  let decoded: TokenPayload;

  // Decode the token and check its expiry.
  try {
    decoded = jwtDecode<TokenPayload>(token);

    if (!decoded.exp || decoded.exp <= Date.now() / 1000) {
      throw new Error("Token expired or missing expiry");
    }
  } catch {
    // Clear the invalid cookie and route the request appropriately.
    let response: NextResponse;

    if (isAdminRoute && !isAdminLogin) {
      response = NextResponse.redirect(
        new URL("/admin/login", request.url)
      );
    } else if (isAuthPage || isAdminLogin || isPublic) {
      response = NextResponse.next();
    } else {
      response = NextResponse.redirect(
        new URL("/login", request.url)
      );
    }

    response.cookies.delete("token");
    return response;
  }

  const role =
    decoded.role ??
    decoded[
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    ];

  const isAdmin = role?.toLowerCase() === "admin";

  // An authenticated admin visiting the admin login page
  // should go to the dashboard.
  if (isAdminLogin && isAdmin) {
    return NextResponse.redirect(
      new URL("/admin/dashboard", request.url)
    );
  }

  // Do not allow non-admin users into admin pages.
  if (isAdminRoute && !isAdmin) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Keep logged-in users out of the normal login/register pages.
  if (isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).* )".replace(".* ", ".*"),
  ],
};
