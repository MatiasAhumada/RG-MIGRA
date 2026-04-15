import { categoriaRepository } from "@/server/repository/categoria.repository";

export const categoriaService = {
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
