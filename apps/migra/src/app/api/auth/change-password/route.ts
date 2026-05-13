import { NextResponse, type NextRequest } from "next/server";
import { userRepository } from "@/server/repository/user.repository";
import { apiErrorHandler, ApiError } from "@/utils/handlers/apiError.handler";
import httpStatus from "http-status";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;

    if (!userId) {
      throw new ApiError({
        status: httpStatus.UNAUTHORIZED,
        message: "No autenticado",
      });
    }

    const body = await request.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      throw new ApiError({
        status: httpStatus.BAD_REQUEST,
        message: "Contraseña actual y nueva son requeridas",
      });
    }

    if (newPassword.length < 8) {
      throw new ApiError({
        status: httpStatus.BAD_REQUEST,
        message: "La nueva contraseña debe tener al menos 8 caracteres",
      });
    }

    const user = await userRepository.findById(userId);

    if (!user) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: "Usuario no encontrado",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password,
    );

    if (!isPasswordValid) {
      throw new ApiError({
        status: httpStatus.UNAUTHORIZED,
        message: "Contraseña actual incorrecta",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await userRepository.update(userId, {
      password: hashedPassword,
      mustChangePassword: false,
    });

    return NextResponse.json({
      message: "Contraseña actualizada exitosamente",
    });
  } catch (error) {
    return apiErrorHandler({ error: error as ApiError, request });
  }
}
