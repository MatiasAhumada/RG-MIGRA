import { NextResponse, type NextRequest } from "next/server";
import {
  apiErrorHandler,
  type ApiError,
} from "@/utils/handlers/apiError.handler";

export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json({ message: "Sesión cerrada" });

    response.cookies.set("userId", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });

    response.cookies.set("userRole", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });

    return response;
  } catch (error) {
    return apiErrorHandler({ error: error as ApiError, request });
  }
}
