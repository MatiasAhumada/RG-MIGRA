import { NextRequest, NextResponse } from "next/server";
import { pedidoService } from "@/server/services";
import { apiErrorHandler } from "@/utils/handlers/apiError.handler";
import httpStatus from "http-status";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const clienteId = searchParams.get("clienteId");
    const status = searchParams.get("status");

    if (status) {
      const pedidos = await pedidoService.findByStatus(status as any);
      return NextResponse.json(pedidos, { status: httpStatus.OK });
    }

    if (clienteId) {
      const pedidos = await pedidoService.findByClienteId(Number(clienteId));
      return NextResponse.json(pedidos, { status: httpStatus.OK });
    }

    const pedidos = await pedidoService.findAll(
      clienteId ? Number(clienteId) : undefined,
    );

    return NextResponse.json(pedidos, { status: httpStatus.OK });
  } catch (error) {
    return apiErrorHandler(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const pedido = await pedidoService.create(body);

    return NextResponse.json(pedido, { status: httpStatus.CREATED });
  } catch (error) {
    return apiErrorHandler(error);
  }
}
