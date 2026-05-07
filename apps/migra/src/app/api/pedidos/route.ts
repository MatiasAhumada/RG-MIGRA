import { NextRequest, NextResponse } from "next/server";
import { pedidoService } from "@/server/services/pedido.service";
import { pedidoRepository } from "@/server/repository/pedido.repository";
import { apiErrorHandler, ApiError } from "@/utils/handlers/apiError.handler";
import httpStatus from "http-status";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const clienteId = searchParams.get("clienteId");

    if (clienteId) {
      const pedidos = await pedidoService.findByClienteId(Number(clienteId));
      return NextResponse.json(pedidos, { status: httpStatus.OK });
    }

    const pedidos = await pedidoRepository.findAll();
    return NextResponse.json(pedidos, { status: httpStatus.OK });
  } catch (error) {
    return apiErrorHandler({ error: error as ApiError, request });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const pedido = await pedidoService.create(body);

    return NextResponse.json(pedido, { status: httpStatus.CREATED });
  } catch (error) {
    return apiErrorHandler({ error: error as ApiError, request });
  }
}
