
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

    // Read the JWT from the HttpOnly cookie.
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "You must log in before publishing a post." },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Forward the request to the .NET backend with Bearer authentication.
    const backendResponse = await fetch(`${API}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const responseBody = await backendResponse.text();

    return new Response(responseBody, {
      status: backendResponse.status,
      headers: {
        "Content-Type":
          backendResponse.headers.get("content-type") ??
          "application/json",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Create post proxy error:", error);

    return NextResponse.json(
      { message: "Unable to publish the post." },
      { status: 500 }
    );
  }
}
