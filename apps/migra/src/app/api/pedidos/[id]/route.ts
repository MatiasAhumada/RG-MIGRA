import { NextRequest, NextResponse } from "next/server";
import { pedidoService } from "@/server/services";
import { documentGeneratorService } from "@/server/services/document-generator.service";
import { emailService } from "@/server/services/email.service";
import { apiErrorHandler, ApiError } from "@/utils/handlers/apiError.handler";
import httpStatus from "http-status";
import type { PedidoWithRelations } from "@/types/pedido.types";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action");
    const format = searchParams.get("format");

    if (action === "download" && format) {
      const pedidoData = (await pedidoService.findById(
        Number(id),
      )) as PedidoWithRelations;

      let buffer: Buffer;
      let filename: string;
      let contentType: string;

      switch (format) {
        case "excel":
          buffer = await documentGeneratorService.generateExcel(pedidoData);
          filename = `pedido-PED-${id}.xlsx`;
          contentType =
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
          break;
        case "pdf":
          buffer = await documentGeneratorService.generatePDF(pedidoData);
          filename = `pedido-PED-${id}.pdf`;
          contentType = "application/pdf";
          break;
        case "word":
          buffer = await documentGeneratorService.generateWord(pedidoData);
          filename = `pedido-PED-${id}.docx`;
          contentType =
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
          break;
        default:
          throw new ApiError({
            status: httpStatus.BAD_REQUEST,
            message: "Formato no válido",
          });
      }

      return new NextResponse(buffer as unknown as BodyInit, {
        headers: {
          "Content-Type": contentType,
          "Content-Disposition": `attachment; filename="${filename}"`,
        },
      });
    }

    const pedido = await pedidoService.findById(Number(id));
    return NextResponse.json(pedido, { status: httpStatus.OK });
  } catch (error) {
    return apiErrorHandler({ error: error as ApiError, request });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action");

    if (action === "upload") {
      const formData = await request.formData();
      const type = formData.get("type") as string;
      const file = formData.get("file") as File;

      if (!file) {
        throw new ApiError({
          status: httpStatus.BAD_REQUEST,
          message: "Archivo requerido",
        });
      }

      const pedidoData = (await pedidoService.findById(
        Number(id),
      )) as PedidoWithRelations;

      const fileBuffer = Buffer.from(await file.arrayBuffer());

      if (type === "invoice") {
        await emailService.sendInvoice(
          pedidoData.cliente.correo,
          pedidoData.id,
          fileBuffer,
        );
      } else if (type === "shipping") {
        await emailService.sendShippingDocuments(
          pedidoData.cliente.correo,
          pedidoData.id,
          fileBuffer,
          file.name,
        );
      } else {
        throw new ApiError({
          status: httpStatus.BAD_REQUEST,
          message: "Tipo de documento no válido",
        });
      }

      return NextResponse.json(
        { message: "Documento enviado exitosamente" },
        { status: httpStatus.OK },
      );
    }

    const body = await request.json();
    const pedido = await pedidoService.update(Number(id), body);

    return NextResponse.json(pedido, { status: httpStatus.OK });
  } catch (error) {
    return apiErrorHandler({ error: error as ApiError, request });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await pedidoService.delete(Number(id));

    return NextResponse.json(null, { status: httpStatus.NO_CONTENT });
  } catch (error) {
    return apiErrorHandler({ error: error as ApiError, request });
  }
}
