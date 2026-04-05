import { NextRequest, NextResponse } from "next/server";
import { clienteService } from "@/server/services";
import { apiErrorHandler, ApiError } from "@/utils/handlers/apiError.handler";
import httpStatus from "http-status";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const cliente = await clienteService.findById(Number(id));

    return NextResponse.json(cliente, { status: httpStatus.OK });
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
    const body = await request.json();
    const cliente = await clienteService.update(Number(id), body);

    return NextResponse.json(cliente, { status: httpStatus.OK });
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
    await clienteService.delete(Number(id));

    return NextResponse.json(null, { status: httpStatus.NO_CONTENT });
  } catch (error) {
    return apiErrorHandler({ error: error as ApiError, request });
  }
}
