import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
  console.log("Buscando o creando empresa MIGRA...");

  const existingEmpresa = await prisma.empresa.findFirst({
    where: { name: "MIGRA Distribuciones S.R.L" },
  });

  let empresa = existingEmpresa;

  if (existingEmpresa) {
    console.log(`Empresa "${existingEmpresa.name}" ya existe con ID: ${existingEmpresa.id}`);
  } else {
    empresa = await prisma.empresa.create({
      data: { name: "MIGRA Distribuciones S.R.L" },
    });
    console.log(`Empresa creada con ID: ${empresa.id}`);
  }

  for (const brand of brandData) {
    console.log(`Procesando marca: ${brand.name}`);

    const existingMarca = await prisma.marca.findFirst({
      where: { name: brand.name, empresaId: empresa.id },
    });

    let marca = existingMarca;

    if (existingMarca) {
      console.log(`  Marca "${brand.name}" ya existe con ID: ${existingMarca.id}`);
    } else {
      marca = await prisma.marca.create({
        data: {
          name: brand.name,
          empresaId: empresa.id,
        },
      });
      console.log(`  Marca creada con ID: ${marca.id}`);
    }

    for (const category of brand.categories) {
      const existingCategoria = await prisma.categoria.findFirst({
        where: { name: category.name, empresaId: empresa.id },
      });

      let categoria = existingCategoria;

      if (existingCategoria) {
        console.log(`    Categoría "${category.name}" ya existe con ID: ${existingCategoria.id}`);
      } else {
        categoria = await prisma.categoria.create({
          data: {
            name: category.name,
            empresaId: empresa.id,
          },
        });
        console.log(`    Categoría creada con ID: ${categoria.id}`);
      }

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

  console.log("Seed completado exitosamente.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
