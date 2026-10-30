
import { NextRequest, NextResponse } from "next/server";

const API = process.env.BACKEND_API_URL;

export async function GET(request: NextRequest) {
  try {
    if (!API) {
      return NextResponse.json(
        { message: "Backend API URL is not configured." },
        { status: 500 }
      );
    }

    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Not authenticated." },
        { status: 401 }
      );
    }

    const response = await fetch(`${API}/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const nextResponse = NextResponse.json(
        data ?? { message: "Authentication failed." },
        { status: response.status }
      );

      if (response.status === 401) {
        nextResponse.cookies.delete("token");
      }

      return nextResponse;
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Auth verification error:", error);

    return NextResponse.json(
      { message: "Unable to verify authentication." },
      { status: 500 }
    );
  }
}
