import clientAxios from "@/utils/clientAxios.util";
import { API_ROUTES } from "@/constants/routes";
import {
  CreateDetallePedidoDto,
  UpdateDetallePedidoDto,
  DetallePedido,
} from "@/types/detalle-pedido.types";

export const detallePedidoService = {
  async create(dto: CreateDetallePedidoDto) {
    const { data } = await clientAxios.post<DetallePedido>(
      API_ROUTES.DETALLE_PEDIDOS,
      dto,
    );
    return data;
  },

  async update(id: number, dto: UpdateDetallePedidoDto) {
    const { data } = await clientAxios.patch<DetallePedido>(
      `${API_ROUTES.DETALLE_PEDIDOS}/${id}`,
      dto,
    );
    return data;
  },

  async delete(id: number) {
    const { data } = await clientAxios.delete(
      `${API_ROUTES.DETALLE_PEDIDOS}/${id}`,
    );
    return data;
  },

  async findById(id: number) {
    const { data } = await clientAxios.get<DetallePedido>(
      `${API_ROUTES.DETALLE_PEDIDOS}/${id}`,
    );
    return data;
  },

  async findAll(pedidoId?: number) {
    const params: Record<string, string> = {};
    if (pedidoId) params.pedidoId = String(pedidoId);

    const { data } = await clientAxios.get<DetallePedido[]>(
      API_ROUTES.DETALLE_PEDIDOS,
      { params },
    );
    return data;
  },

  async findByPedidoId(pedidoId: number) {
    const { data } = await clientAxios.get<DetallePedido[]>(
      API_ROUTES.DETALLE_PEDIDOS,
      {
        params: { pedidoId: String(pedidoId) },
      },
    );
    return data;
  },
};
