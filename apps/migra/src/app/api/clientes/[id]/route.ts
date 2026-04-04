import { NextRequest, NextResponse } from "next/server";
import { clienteService } from "@/server/services";
import { apiErrorHandler } from "@/utils/handlers/apiError.handler";
import httpStatus from "http-status";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const cliente = await clienteService.findById(Number(params.id));

    return NextResponse.json(cliente, { status: httpStatus.OK });
  } catch (error) {
    return apiErrorHandler(error);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const body = await request.json();
    const cliente = await clienteService.update(Number(params.id), body);

    return NextResponse.json(cliente, { status: httpStatus.OK });
  } catch (error) {
    return apiErrorHandler(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await clienteService.delete(Number(params.id));

    return NextResponse.json(null, { status: httpStatus.NO_CONTENT });
  } catch (error) {
    return apiErrorHandler(error);
  }
}
