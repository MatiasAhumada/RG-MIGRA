import { NextRequest, NextResponse } from "next/server";
import { productoService } from "@/server/services";
import { apiErrorHandler, ApiError } from "@/utils/handlers/apiError.handler";
import httpStatus from "http-status";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search") || undefined;
    const empresaId = searchParams.get("empresaId");
    const tipo = searchParams.get("tipo");

    if (tipo && empresaId) {
      const productos = await productoService.findByTipo(
        tipo,
        Number(empresaId),
      );
      return NextResponse.json(productos, { status: httpStatus.OK });
    }

    if (empresaId) {
      const productos = await productoService.findByEmpresaId(
        Number(empresaId),
      );
      return NextResponse.json(productos, { status: httpStatus.OK });
    }

    const productos = await productoService.findAll(
      search,
      empresaId ? Number(empresaId) : undefined,
    );

    return NextResponse.json(productos, { status: httpStatus.OK });
  } catch (error) {
    return apiErrorHandler({ error: error as ApiError, request });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const producto = await productoService.create(body);

    return NextResponse.json(producto, { status: httpStatus.CREATED });
  } catch (error) {
    return apiErrorHandler({ error: error as ApiError, request });
  }
}
