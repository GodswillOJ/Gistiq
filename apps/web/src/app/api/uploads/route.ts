import { NextRequest, NextResponse } from "next/server";

const API = process.env.NEXT_PUBLIC_API_URL;

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized. Please log in again." },
        { status: 401 }
      );
    }

    if (!API) {
      return NextResponse.json(
        { message: "Backend API URL is not configured." },
        { status: 500 }
      );
    }

    // Keep the original multipart form data.
    const formData = await request.formData();

    const response = await fetch(`${API}/uploads`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
      cache: "no-store",
    });

    const responseBody = await response.text();

    return new NextResponse(responseBody, {
      status: response.status,
      headers: {
        "Content-Type":
          response.headers.get("content-type") || "application/json",
      },
    });
  } catch (error) {
    console.error("Image upload proxy error:", error);

    return NextResponse.json(
      { message: "Unable to upload image." },
      { status: 500 }
    );
  }
}