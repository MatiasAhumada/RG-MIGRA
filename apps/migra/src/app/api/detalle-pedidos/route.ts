import { NextRequest, NextResponse } from "next/server";
import { detallePedidoService } from "@/server/services";
import { apiErrorHandler } from "@/utils/handlers/apiError.handler";
import httpStatus from "http-status";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const pedidoId = searchParams.get("pedidoId");

    if (pedidoId) {
      const detalles = await detallePedidoService.findByPedidoId(
        Number(pedidoId),
      );
      return NextResponse.json(detalles, { status: httpStatus.OK });
    }

    const detalles = await detallePedidoService.findAll(
      pedidoId ? Number(pedidoId) : undefined,
    );

    return NextResponse.json(detalles, { status: httpStatus.OK });
  } catch (error) {
    return apiErrorHandler(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const detalle = await detallePedidoService.create(body);

    return NextResponse.json(detalle, { status: httpStatus.CREATED });
  } catch (error) {
    return apiErrorHandler(error);
  }
}
