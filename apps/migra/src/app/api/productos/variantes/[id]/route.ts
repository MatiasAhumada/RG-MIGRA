import { NextRequest, NextResponse } from "next/server";
import { productoVarianteService } from "@/server/services/producto-variante.service";
import { apiErrorHandler } from "@/utils/handlers/apiError.handler";
import { httpStatus } from "@/constants/http-status.constant";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const variante = await productoVarianteService.findById(Number(id));

    return NextResponse.json(variante, { status: httpStatus.OK });
  } catch (error) {
    return apiErrorHandler(error);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const variante = await productoVarianteService.update(Number(id), body);

    return NextResponse.json(variante, { status: httpStatus.OK });
  } catch (error) {
    return apiErrorHandler(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await productoVarianteService.delete(Number(id));

    return NextResponse.json(
      { message: "Variante eliminada" },
      { status: httpStatus.OK },
    );
  } catch (error) {
    return apiErrorHandler(error);
  }
}
