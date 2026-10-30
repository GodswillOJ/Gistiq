
import { NextRequest, NextResponse } from "next/server";

const API = process.env.NEXT_PUBLIC_API_URL;

export async function POST(request: NextRequest) {
  try {
    if (!API) {
      return NextResponse.json(
        { message: "Backend API URL is not configured." },
        { status: 500 }
      );
    }

    const body = await request.json();

    const response = await fetch(`${API}/auth/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, {
        status: response.status,
      });
    }

    const cookieHeader = response.headers.get("set-cookie");
    const token = cookieHeader?.match(/(?:^|,\s*)token=([^;]+)/)?.[1];

    if (!token) {
      return NextResponse.json(
        { message: "Authentication cookie was not received from the backend." },
        { status: 500 }
      );
    }

    const nextResponse = NextResponse.json(data);

    nextResponse.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60,
    });

    return nextResponse;
  } catch (error) {
    console.error("Admin login error:", error);

    return NextResponse.json(
      { message: "Unable to complete admin login." },
      { status: 500 }
    );
  }
}
