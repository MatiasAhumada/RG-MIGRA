import { NextResponse, type NextRequest } from "next/server";
import { clienteService } from "@/server/services/cliente.service";
import { userRepository } from "@/server/repository/user.repository";
import { apiErrorHandler, ApiError } from "@/utils/handlers/apiError.handler";
import httpStatus from "http-status";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const params = await context.params;
    const body = await request.json();

    const { action } = body;

    const id = Number(params.id);

    if (action === "APPROVE") {
      const cliente = await clienteService.findById(id);

      const existingUser = await userRepository.findByEmail(cliente.correo);

      if (!existingUser) {
        const defaultPassword = `Migra${cliente.cuit.replace(/-/g, "").slice(-6)}`;

        await userRepository.create({
          email: cliente.correo,
          password: defaultPassword,
          name: cliente.titular,
          role: "CLIENT",
          empresaId: cliente.empresaId,
        });
      }

      await clienteService.update(id, { status: "APPROVED" });

      return NextResponse.json({
        message: `Cliente "${cliente.razonSocial}" aprobado. Usuario creado con contraseña temporal.`,
      });
    }

    if (action === "REJECT") {
      await clienteService.update(id, { status: "REJECTED" });

      return NextResponse.json({
        message: "Cliente rechazado correctamente",
      });
    }

    throw new ApiError({
      status: httpStatus.BAD_REQUEST,
      message: "Acción no válida. Use APPROVE o REJECT",
    });
  } catch (error) {
    return apiErrorHandler({ error: error as ApiError, request });
  }
}
