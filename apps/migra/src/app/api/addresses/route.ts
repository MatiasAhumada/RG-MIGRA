import { NextRequest, NextResponse } from "next/server";
import { addressService } from "@/server/services/address.service";
import { apiErrorHandler, ApiError } from "@/utils/handlers/apiError.handler";
import httpStatus from "http-status";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const clienteId = searchParams.get("clienteId");

    if (!clienteId) {
      throw new ApiError({
        status: httpStatus.BAD_REQUEST,
        message: "clienteId es requerido",
      });
    }

    const addresses = await addressService.findByClienteId(Number(clienteId));

    return NextResponse.json(addresses, { status: httpStatus.OK });
  } catch (error) {
    return apiErrorHandler({ error: error as ApiError, request });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const address = await addressService.create(body);

    return NextResponse.json(address, { status: httpStatus.CREATED });
  } catch (error) {
    return apiErrorHandler({ error: error as ApiError, request });
  }
}
