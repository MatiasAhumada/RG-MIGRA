import { NextRequest, NextResponse } from "next/server";
import { addressService } from "@/server/services";
import { apiErrorHandler } from "@/utils/handlers/apiError.handler";
import httpStatus from "http-status";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const clienteId = searchParams.get("clienteId");

    if (clienteId) {
      const addresses = await addressService.findByClienteId(Number(clienteId));
      return NextResponse.json(addresses, { status: httpStatus.OK });
    }

    const addresses = await addressService.findAll(
      clienteId ? Number(clienteId) : undefined,
    );

    return NextResponse.json(addresses, { status: httpStatus.OK });
  } catch (error) {
    return apiErrorHandler(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const address = await addressService.create(body);

    return NextResponse.json(address, { status: httpStatus.CREATED });
  } catch (error) {
    return apiErrorHandler(error);
  }
}
