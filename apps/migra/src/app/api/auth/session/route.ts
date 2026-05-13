import { NextResponse, type NextRequest } from "next/server";
import { userRepository } from "@/server/repository/user.repository";
import {
  apiErrorHandler,
  type ApiError,
} from "@/utils/handlers/apiError.handler";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;

    if (!userId) {
      return NextResponse.json({ user: null });
    }

    const user = await userRepository.findById(userId);

    if (!user) {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        empresaId: user.empresaId,
        mustChangePassword: user.mustChangePassword,
      },
    });
  } catch (error) {
    return apiErrorHandler({ error: error as ApiError, request });
  }
}
