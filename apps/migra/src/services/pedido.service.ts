import clientAxios from "@/utils/clientAxios.util";
import { API_ROUTES } from "@/constants/routes";
import type {
  CreatePedidoDto,
  PedidoWithRelations,
} from "@/types/pedido.types";
import type { PedidoStatus } from "@prisma/client";

export const pedidoService = {
  async create(dto: CreatePedidoDto) {
    const { data } = await clientAxios.post<PedidoWithRelations>(
      API_ROUTES.PEDIDOS,
      dto,
    );
    return data;
  },

  async findAll() {
    const { data } = await clientAxios.get<PedidoWithRelations[]>(
      API_ROUTES.PEDIDOS,
    );
    return data;
  },

  async findByClienteId(clienteId: number) {
    const { data } = await clientAxios.get<PedidoWithRelations[]>(
      API_ROUTES.PEDIDOS,
      {
        params: { clienteId: String(clienteId) },
      },
    );
    return data;
  },

  async updateStatus(id: number, status: PedidoStatus) {
    const { data } = await clientAxios.patch<PedidoWithRelations>(
      `${API_ROUTES.PEDIDOS}/${id}`,
      { status },
    );
    return data;
  },
};
