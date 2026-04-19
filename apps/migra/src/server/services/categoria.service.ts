import { categoriaRepository } from "@/server/repository/categoria.repository";

export const categoriaService = {
  async findByName(name: string, empresaId: number, marcaId: number) {
    let categoria = await categoriaRepository.findByName(
      name,
      empresaId,
      marcaId,
    );

    if (!categoria) {
      categoria = await categoriaRepository.create({
        name,
        empresaId,
        marcaId,
      });
    }

    return categoria;
  },

  async findAll(empresaId?: number, marcaId?: number) {
    return categoriaRepository.findAll(empresaId, marcaId);
  },

  async findById(id: number) {
    return categoriaRepository.findById(id);
  },

  async findByMarcaId(marcaId: number) {
    return categoriaRepository.findByMarcaId(marcaId);
  },
};
