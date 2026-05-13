import { NextResponse, type NextRequest } from "next/server";
import { userRepository } from "@/server/repository/user.repository";
import { apiErrorHandler, ApiError } from "@/utils/handlers/apiError.handler";
import httpStatus from "http-status";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { email, password } = body;

    if (!email || !password) {
      throw new ApiError({
        status: httpStatus.BAD_REQUEST,
        message: "Email y contraseña son requeridos",
      });
    }

    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new ApiError({
        status: httpStatus.UNAUTHORIZED,
        message: "Credenciales inválidas",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new ApiError({
        status: httpStatus.UNAUTHORIZED,
        message: "Credenciales inválidas",
      });
    }

    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        empresaId: user.empresaId,
        mustChangePassword: user.mustChangePassword,
      },
    });

    response.cookies.set("userId", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    response.cookies.set("userRole", user.role, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    return apiErrorHandler({ error: error as ApiError, request });
  }
}
