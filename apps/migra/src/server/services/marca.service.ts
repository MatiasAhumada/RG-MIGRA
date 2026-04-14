import { marcaRepository } from "@/server/repository/marca.repository";

export const marcaService = {
  async findAll(empresaId?: number) {
    return marcaRepository.findAll(empresaId);
  },

  async findById(id: number) {
    return marcaRepository.findById(id);
  },
};
