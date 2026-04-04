import { NextRequest, NextResponse } from "next/server";
import { clienteService } from "@/server/services";
import { apiErrorHandler, ApiError } from "@/utils/handlers/apiError.handler";
import httpStatus from "http-status";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search") || undefined;
    const empresaId = searchParams.get("empresaId");
    const status = searchParams.get("status");

    if (status && empresaId) {
      const clientes = await clienteService.findByStatus(
        status as any,
        Number(empresaId),
      );
      return NextResponse.json(clientes, { status: httpStatus.OK });
    }

    if (empresaId) {
      const clientes = await clienteService.findByEmpresaId(Number(empresaId));
      return NextResponse.json(clientes, { status: httpStatus.OK });
    }

    const clientes = await clienteService.findAll(
      search,
      empresaId ? Number(empresaId) : undefined,
    );

    return NextResponse.json(clientes, { status: httpStatus.OK });
  } catch (error) {
    return apiErrorHandler({ error: error as ApiError, request });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const cliente = await clienteService.create(body);

    return NextResponse.json(cliente, { status: httpStatus.CREATED });
  } catch (error) {
    return apiErrorHandler({ error: error as ApiError, request });
  }
}
