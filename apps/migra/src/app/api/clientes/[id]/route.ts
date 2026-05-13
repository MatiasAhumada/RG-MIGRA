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
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action");

    if (action === "approve") {
      const cliente = await clienteService.approve(Number(id));
      return NextResponse.json(cliente, { status: httpStatus.OK });
    }

    if (action === "reject") {
      const cliente = await clienteService.reject(Number(id));
      return NextResponse.json(cliente, { status: httpStatus.OK });
    }

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

    return NextResponse.json(
      { message: "Cliente eliminado exitosamente" },
      { status: httpStatus.OK },
    );
  } catch (error) {
    return apiErrorHandler({ error: error as ApiError, request });
  }
}
