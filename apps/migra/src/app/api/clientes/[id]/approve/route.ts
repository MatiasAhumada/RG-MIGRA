import { NextResponse, type NextRequest } from "next/server";
import { clienteService } from "@/server/services/cliente.service";
import { userRepository } from "@/server/repository/user.repository";
import { apiErrorHandler, ApiError } from "@/utils/handlers/apiError.handler";
import { sendCredentialsEmail } from "@/services/email.service";
import httpStatus from "http-status";

function generatePassword(): string {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const length = 12;
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => chars[byte % chars.length]).join("");
}

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
        const temporaryPassword = generatePassword();

        await userRepository.create({
          email: cliente.correo,
          password: temporaryPassword,
          name: cliente.titular,
          role: "CLIENT",
          empresaId: cliente.empresaId,
        });

        await sendCredentialsEmail({
          to: cliente.correo,
          name: cliente.titular,
          password: temporaryPassword,
        });
      }

      await clienteService.update(id, { status: "APPROVED" });

      return NextResponse.json({
        message: `Cliente "${cliente.razonSocial}" aprobado. Usuario creado y credenciales enviadas por correo.`,
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
