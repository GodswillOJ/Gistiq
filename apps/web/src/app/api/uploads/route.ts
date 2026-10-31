
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
      console.error("NEXT_PUBLIC_API_URL is missing");

      return NextResponse.json(
        { message: "Backend API URL is not configured." },
        { status: 500 }
      );
    }

    const formData = await request.formData();

    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { message: "No valid image file was received." },
        { status: 400 }
      );
    }

    console.log("Uploading file:", file.name);
    console.log("Backend URL:", `${API}/uploads`);

    const response = await fetch(`${API}/uploads`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
      cache: "no-store",
    });

    const responseBody = await response.text();

    console.log("Backend upload status:", response.status);
    console.log("Backend upload response:", responseBody);

    return new NextResponse(responseBody, {
      status: response.status,
      headers: {
        "Content-Type":
          response.headers.get("content-type") ||
          "application/json",
        "Cache-Control": "no-store",
      },
    });

  } catch (error) {
    console.error("Image upload proxy error:", error);

    return NextResponse.json(
      {
        message: "Next.js upload proxy failed.",
        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },
      { status: 500 }
    );
  }
}
