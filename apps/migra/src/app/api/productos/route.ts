import { NextRequest, NextResponse } from "next/server";
import { productoService } from "@/server/services";
import { apiErrorHandler, ApiError } from "@/utils/handlers/apiError.handler";
import httpStatus from "http-status";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search") || undefined;
    const empresaId = searchParams.get("empresaId");
    const marcaId = searchParams.get("marcaId");
    const categoriaId = searchParams.get("categoriaId");
    const subcategoriaId = searchParams.get("subcategoriaId");
    const includeDeleted = searchParams.get("includeDeleted") === "true";

    if (marcaId && empresaId) {
      const productos = await productoService.findByMarca(
        Number(marcaId),
        Number(empresaId),
      );
      return NextResponse.json(productos, { status: httpStatus.OK });
    }

    if (categoriaId && empresaId) {
      const productos = await productoService.findByCategoria(
        Number(categoriaId),
        Number(empresaId),
      );
      return NextResponse.json(productos, { status: httpStatus.OK });
    }

    if (subcategoriaId && empresaId) {
      const productos = await productoService.findBySubcategoria(
        Number(subcategoriaId),
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

    const productos = includeDeleted
      ? await productoService.findAll(
          search,
          empresaId ? Number(empresaId) : undefined,
        )
      : await productoService.findAllActive(
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
    const contentType = request.headers.get("content-type");
    const searchParams = request.nextUrl.searchParams;
    const bulk = searchParams.get("bulk");

    // Carga masiva desde PDF
    if (bulk === "true" && contentType?.includes("multipart/form-data")) {
      const formData = await request.formData();
      const file = formData.get("file") as File;
      const defaultPrice = formData.get("defaultPrice") as string;
      const empresaId = formData.get("empresaId") as string;
      const categoriaId = formData.get("categoriaId") as string;
      const subcategoriaId = formData.get("subcategoriaId") as string;
      const marcaId = formData.get("marcaId") as string;

      if (
        !file ||
        !defaultPrice ||
        !empresaId ||
        !categoriaId ||
        !subcategoriaId ||
        !marcaId
      ) {
        throw new ApiError({
          status: httpStatus.BAD_REQUEST,
          message:
            "Faltan campos requeridos: file, defaultPrice, empresaId, categoriaId, subcategoriaId, marcaId",
        });
      }

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const result = await productoService.bulkCreateFromPdf({
        pdfBuffer: buffer,
        defaultPrice: Number(defaultPrice),
        empresaId: Number(empresaId),
        categoriaId: Number(categoriaId),
        subcategoriaId: Number(subcategoriaId),
        marcaId: Number(marcaId),
      });

      return NextResponse.json(result, { status: httpStatus.CREATED });
    }

    // Creación individual
    const body = await request.json();
    const producto = await productoService.create(body);

    return NextResponse.json(producto, { status: httpStatus.CREATED });
  } catch (error) {
    return apiErrorHandler({ error: error as ApiError, request });
  }
}
