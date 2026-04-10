import { NextResponse, type NextRequest } from "next/server";
import { userService } from "@/server/services/user.service";
import { clienteService } from "@/server/services/cliente.service";
import { apiErrorHandler, ApiError } from "@/utils/handlers/apiError.handler";
import httpStatus from "http-status";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { email, password, name, razonSocial, titular, cuit, telefono, empresaId } = body;

    if (!email || !password || !name || !razonSocial || !titular || !cuit) {
      throw new ApiError({
        status: httpStatus.BAD_REQUEST,
        message: "Todos los campos son requeridos",
      });
    }

    const user = await userService.create({
      email,
      password,
      name,
    });

    await clienteService.create({
      razonSocial,
      titular,
      cuit,
      correo: email,
      telefono: telefono || "",
      empresaId: empresaId || 1,
    });

    return NextResponse.json(
      { user: { id: user.id, email: user.email, name: user.name, role: user.role } },
      { status: httpStatus.CREATED },
    );
  } catch (error) {
    return apiErrorHandler({ error: error as ApiError, request });
  }
}
