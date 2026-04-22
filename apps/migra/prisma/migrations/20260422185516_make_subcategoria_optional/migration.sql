-- DropForeignKey
ALTER TABLE "productos" DROP CONSTRAINT "productos_subcategoriaId_fkey";

-- AlterTable
ALTER TABLE "productos" ALTER COLUMN "subcategoriaId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "productos" ADD CONSTRAINT "productos_subcategoriaId_fkey" FOREIGN KEY ("subcategoriaId") REFERENCES "subcategorias"("id") ON DELETE SET NULL ON UPDATE CASCADE;
