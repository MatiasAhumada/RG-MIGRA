import { NextResponse, type NextRequest } from "next/server";
import { clienteService } from "@/server/services/cliente.service";
import { apiErrorHandler, ApiError } from "@/utils/handlers/apiError.handler";
import httpStatus from "http-status";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { razonSocial, titular, cuit, correo, telefono, empresaId } = body;

    if (!razonSocial || !titular || !cuit || !correo) {
      throw new ApiError({
        status: httpStatus.BAD_REQUEST,
        message: "Razón Social, Titular, CUIT y correo son requeridos",
      });
    }

    await clienteService.create({
      razonSocial,
      titular,
      cuit,
      correo,
      telefono: telefono || "",
      empresaId: empresaId || 1,
    });

    return NextResponse.json(
      { message: "Solicitud de registro enviada correctamente" },
      { status: httpStatus.CREATED },
    );
  } catch (error) {
    return apiErrorHandler({ error: error as ApiError, request });
  }
}
