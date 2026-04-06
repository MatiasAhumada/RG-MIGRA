import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const empresa = await prisma.empresa.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Robles Gonzalo",
    },
  });

  const adminUser = await prisma.user.upsert({
    where: { email: "admin@rg.com" },
    update: {},
    create: {
      email: "admin@rg.com",
      name: "Admin RG",
      password: "admin123",
      role: "ADMIN",
      empresaId: empresa.id,
    },
  });

  const clientUser = await prisma.user.upsert({
    where: { email: "cliente@example.com" },
    update: {},
    create: {
      email: "cliente@example.com",
      name: "Cliente Test",
      password: "cliente123",
      role: "CLIENT",
    },
  });

  await prisma.cliente.upsert({
    where: { cuit: "20-12345678-9" },
    update: {},
    create: {
      razonSocial: "Cliente Test S.A.",
      titular: "Cliente Test",
      cuit: "20-12345678-9",
      correo: "cliente@example.com",
      telefono: "1234567890",
      status: "APPROVED",
      empresaId: empresa.id,
      userId: clientUser.id,
    },
  });

  console.log("Seed completed successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
