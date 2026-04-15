import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

const brandData = [
  {
    name: "Jactans",
    categories: [
      { name: "Perfumes", subcategories: ["Perfumes infantiles", "Perfumes en LATA", "EXHIBIDORES"] },
      { name: "Jabones Liquidos", subcategories: [] },
      { name: "Esmaltes", subcategories: [] },
      { name: "Cosmetica", subcategories: [] },
    ],
  },
  {
    name: "Random",
    categories: [
      { name: "Cepillos Dentales", subcategories: ["Adultos", "Niños"] },
    ],
  },
  {
    name: "SPA",
    categories: [
      { name: "Esponjas", subcategories: ["Esponjas", "Manopla"] },
      { name: "Jabones", subcategories: ["Liquidos", "En barra"] },
      { name: "Aromatizantes", subcategories: [] },
      { name: "Ceras", subcategories: [] },
    ],
  },
  {
    name: "Babelito",
    categories: [
      { name: "Biberones y Accesorios", subcategories: ["Accesorios", "Biberones boca ancha", "Biberones boca estandar", "Tetina", "Tetina boca estandar"] },
      { name: "Chupetes y Prendedores", subcategories: ["Chupete Anatomico", "Chupete Redondo", "Prendedores"] },
      { name: "Cosmetica e Higiene", subcategories: ["Accesorios de higiene", "Cosmetica", "Maternal"] },
      { name: "Mordillos y Sonajeros", subcategories: ["Mordillos"] },
      { name: "Primeras Comidas", subcategories: ["Baberos", "Platos y Cubiertos", "Vasos"] },
    ],
  },
];

async function main() {
  console.log("\n=== EMPRESA Y USUARIO ADMIN ===");
  console.log("Buscando o creando empresa MIGRA...");

  const foundEmpresa = await prisma.empresa.findFirst({
    where: { name: "MIGRA Distribuciones S.R.L" },
  });

  const empresa = foundEmpresa
    ? foundEmpresa
    : await prisma.empresa.create({
        data: { name: "MIGRA Distribuciones S.R.L" },
      });

  console.log(
    foundEmpresa
      ? `Empresa "${foundEmpresa.name}" ya existe con ID: ${foundEmpresa.id}`
      : `Empresa creada con ID: ${empresa.id}`,
  );

  const adminEmail = "admin@migra.com";
  const foundAdminUser = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!foundAdminUser) {
    const hashedPassword = await hashPassword("admin123");
    await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        name: "Admin MIGRA",
        role: "ADMIN",
        empresaId: empresa.id,
      },
    });
    console.log(`✓ Usuario admin creado: ${adminEmail} / admin123`);
  } else {
    console.log(`✓ Usuario admin ya existe: ${adminEmail}`);
  }

  console.log("\n=== CLIENTE Y USUARIO CLIENTE ===");
  console.log("Buscando o creando cliente...");

  const foundCliente = await prisma.cliente.findFirst({
    where: { razonSocial: "Cliente Ejemplo S.A." },
  });

  const cliente = foundCliente
    ? foundCliente
    : await prisma.cliente.create({
        data: {
          razonSocial: "Cliente Ejemplo S.A.",
          titular: "Juan Pérez",
          cuit: "20-12345678-9",
          correo: "contacto@clienteejemplo.com",
          telefono: "+5491112345678",
          status: "APPROVED",
          empresaId: empresa.id,
        },
      });

  console.log(
    foundCliente
      ? `Cliente "${foundCliente.razonSocial}" ya existe con ID: ${foundCliente.id}`
      : `Cliente creado con ID: ${cliente.id}`,
  );

  const clienteEmail = "cliente@ejemplo.com";
  const foundClienteUser = await prisma.user.findUnique({
    where: { email: clienteEmail },
  });

  if (!foundClienteUser) {
    const hashedPassword = await hashPassword("cliente123");
    await prisma.user.create({
      data: {
        email: clienteEmail,
        password: hashedPassword,
        name: "Juan Pérez",
        role: "CLIENT",
        cliente: {
          connect: { id: cliente.id },
        },
      },
    });
    console.log(`✓ Usuario cliente creado: ${clienteEmail} / cliente123`);
  } else {
    console.log(`✓ Usuario cliente ya existe: ${clienteEmail}`);
  }

  console.log("\n=== MARCAS, CATEGORÍAS Y SUBCATEGORÍAS ===");

  for (const brand of brandData) {
    console.log(`Procesando marca: ${brand.name}`);

    const foundMarca = await prisma.marca.findFirst({
      where: { name: brand.name, empresaId: empresa.id },
    });

    const marca = foundMarca
      ? foundMarca
      : await prisma.marca.create({
          data: {
            name: brand.name,
            empresaId: empresa.id,
          },
        });

    console.log(
      foundMarca
        ? `  Marca "${brand.name}" ya existe con ID: ${foundMarca.id}`
        : `  Marca creada con ID: ${marca.id}`,
    );

    for (const category of brand.categories) {
      const foundCategoria = await prisma.categoria.findFirst({
        where: { 
          name: category.name, 
          empresaId: empresa.id,
          marcaId: marca.id,
        },
      });

      const categoria = foundCategoria
        ? foundCategoria
        : await prisma.categoria.create({
            data: {
              name: category.name,
              empresaId: empresa.id,
              marcaId: marca.id,
            },
          });

      console.log(
        foundCategoria
          ? `    Categoría "${category.name}" ya existe con ID: ${foundCategoria.id}`
          : `    Categoría creada con ID: ${categoria.id}`,
      );

      for (const subName of category.subcategories) {
        const existingSub = await prisma.subcategoria.findFirst({
          where: { name: subName, categoriaId: categoria.id },
        });

        if (existingSub) {
          console.log(`      Subcategoría "${subName}" ya existe`);
        } else {
          await prisma.subcategoria.create({
            data: {
              name: subName,
              categoriaId: categoria.id,
              empresaId: empresa.id,
            },
          });
          console.log(`      Subcategoría creada: "${subName}"`);
        }
      }
    }
  }

  console.log("\nSeed completado exitosamente.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
