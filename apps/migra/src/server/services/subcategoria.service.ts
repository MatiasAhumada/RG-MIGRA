import { subcategoriaRepository } from "@/server/repository/subcategoria.repository";

export const subcategoriaService = {
  async findByName(name: string, categoriaId: number, empresaId: number) {
    let subcategoria = await subcategoriaRepository.findByName(
      name,
      categoriaId,
    );

    if (!subcategoria) {
      subcategoria = await subcategoriaRepository.create({
        name,
        categoriaId,
        empresaId,
      });
    }

    return subcategoria;
  },

  async findById(id: number) {
    return subcategoriaRepository.findById(id);
  },
};
