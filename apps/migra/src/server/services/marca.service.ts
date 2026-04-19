import { marcaRepository } from "@/server/repository/marca.repository";

export const marcaService = {
  async findByName(name: string, empresaId: number) {
    let marca = await marcaRepository.findByName(name, empresaId);

    if (!marca) {
      marca = await marcaRepository.create({ name, empresaId });
    }

    return marca;
  },

  async findAll(empresaId?: number) {
    return marcaRepository.findAll(empresaId);
  },

  async findById(id: number) {
    return marcaRepository.findById(id);
  },
};
