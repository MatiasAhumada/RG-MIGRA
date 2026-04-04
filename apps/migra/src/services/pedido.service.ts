import clientAxios from "@/utils/clientAxios.util";
import { API_ROUTES } from "@/constants/routes";
import {
  CreatePedidoDto,
  UpdatePedidoDto,
  Pedido,
  PedidoStatus,
} from "@/types/pedido.types";
import { CreateDetallePedidoDto } from "@/types/detalle-pedido.types";

interface CreatePedidoWithDetallesDto extends CreatePedidoDto {
  detalles: CreateDetallePedidoDto[];
}

export const pedidoService = {
  async create(dto: CreatePedidoWithDetallesDto) {
    const { data } = await clientAxios.post<Pedido>(API_ROUTES.PEDIDOS, dto);
    return data;
  },

  async update(id: number, dto: UpdatePedidoDto) {
    const { data } = await clientAxios.patch<Pedido>(
      `${API_ROUTES.PEDIDOS}/${id}`,
      dto,
    );
    return data;
  },

  async delete(id: number) {
    const { data } = await clientAxios.delete(`${API_ROUTES.PEDIDOS}/${id}`);
    return data;
  },

  async findById(id: number) {
    const { data } = await clientAxios.get<Pedido>(
      `${API_ROUTES.PEDIDOS}/${id}`,
    );
    return data;
  },

  async findAll(clienteId?: number) {
    const params: Record<string, string> = {};
    if (clienteId) params.clienteId = String(clienteId);

    const { data } = await clientAxios.get<Pedido[]>(API_ROUTES.PEDIDOS, {
      params,
    });
    return data;
  },

  async findByClienteId(clienteId: number) {
    const { data } = await clientAxios.get<Pedido[]>(API_ROUTES.PEDIDOS, {
      params: { clienteId: String(clienteId) },
    });
    return data;
  },

  async findByStatus(status: PedidoStatus) {
    const { data } = await clientAxios.get<Pedido[]>(API_ROUTES.PEDIDOS, {
      params: { status },
    });
    return data;
  },
};
