/*
  Warnings:

  - Added the required column `marcaId` to the `categorias` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "categorias" ADD COLUMN     "marcaId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "categorias" ADD CONSTRAINT "categorias_marcaId_fkey" FOREIGN KEY ("marcaId") REFERENCES "marcas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
