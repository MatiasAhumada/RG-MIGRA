-- CreateEnum
CREATE TYPE "ColorProducto" AS ENUM ('BLANCO', 'CELESTE', 'ROSA', 'VERDE', 'NEGRO');

-- CreateTable
CREATE TABLE "producto_variantes" (
    "id" SERIAL NOT NULL,
    "color" "ColorProducto" NOT NULL,
    "talle" INTEGER NOT NULL,
    "sinStock" BOOLEAN NOT NULL DEFAULT false,
    "productoId" INTEGER NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "producto_variantes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "producto_variantes_productoId_color_talle_key" ON "producto_variantes"("productoId", "color", "talle");

-- AddForeignKey
ALTER TABLE "producto_variantes" ADD CONSTRAINT "producto_variantes_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "productos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
