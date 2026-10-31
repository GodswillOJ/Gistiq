import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Allow the admin login page without authentication.
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // No token means the visitor is not authenticated.
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(
      new URL("/admin/login", request.url)
    );
  }

  try {
    // Ask the backend to validate the token and admin role.
    const authResponse = await fetch(
      `${request.nextUrl.origin}/api/auth/me`,
      {
        method: "GET",
        headers: {
          Cookie: request.headers.get("cookie") ?? "",
        },
        cache: "no-store",
      }
    );

    // Only an authenticated Admin can continue.
    if (!authResponse.ok) {
      const response = NextResponse.redirect(
        new URL("/admin/login", request.url)
      );

      response.cookies.delete("token");

      return response;
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Admin middleware authentication error:", error);

    // Fail closed if authentication cannot be verified.
    return NextResponse.redirect(
      new URL("/admin/login", request.url)
    );
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};