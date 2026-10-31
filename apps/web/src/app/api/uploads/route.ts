
import { NextRequest, NextResponse } from "next/server";

const API = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");

export async function POST(request: NextRequest) {
  try {
    // 1. Get the authentication token from the HttpOnly cookie
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized. Please log in again." },
        { status: 401 }
      );
    }

    // 2. Check backend configuration
    if (!API) {
      console.error("NEXT_PUBLIC_API_URL is missing");

      return NextResponse.json(
        { message: "Backend API URL is not configured." },
        { status: 500 }
      );
    }

    // 3. Read and validate the uploaded file
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json(
        { message: "No valid image file was received." },
        { status: 400 }
      );
    }

    console.log("Uploading file:", file.name);
    console.log("File size:", file.size);
    console.log("Backend URL:", `${API}/uploads`);

    // 4. Forward the upload to the ASP.NET Core backend
    const response = await fetch(`${API}/uploads`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
      cache: "no-store",
    });

    // 5. Read the backend response
    const responseBody = await response.text();

    console.log("Backend upload status:", response.status);

    if (!response.ok) {
      console.error(
        "Backend upload failed:",
        response.status,
        responseBody || "Empty response body"
      );
    }

    // 6. Return the backend response to the frontend
    return new NextResponse(responseBody || null, {
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
