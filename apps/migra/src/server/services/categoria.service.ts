import { categoriaRepository } from "@/server/repository/categoria.repository";

export const categoriaService = {
  async findAll(empresaId?: number) {
    return categoriaRepository.findAll(empresaId);
  },

  async findById(id: number) {
    return categoriaRepository.findById(id);
  },
};
