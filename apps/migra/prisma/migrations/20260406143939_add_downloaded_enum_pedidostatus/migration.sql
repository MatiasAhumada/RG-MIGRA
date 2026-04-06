/*
  Warnings:

  - The values [PREPARING,DELIVERED,CANCELLED] on the enum `PedidoStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PedidoStatus_new" AS ENUM ('PENDING', 'CONFIRMED', 'DOWNLOADED', 'SHIPPED');
ALTER TABLE "public"."Pedido" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Pedido" ALTER COLUMN "status" TYPE "PedidoStatus_new" USING ("status"::text::"PedidoStatus_new");
ALTER TYPE "PedidoStatus" RENAME TO "PedidoStatus_old";
ALTER TYPE "PedidoStatus_new" RENAME TO "PedidoStatus";
DROP TYPE "public"."PedidoStatus_old";
ALTER TABLE "Pedido" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterTable
ALTER TABLE "Pedido" ADD COLUMN     "codSeguimiento" TEXT;
