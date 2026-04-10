import clientAxios from "@/utils/clientAxios.util";
import { API_ROUTES } from "@/constants/routes";
import { User, Role } from "@/types/user.types";

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterClienteDto {
  razonSocial: string;
  titular: string;
  cuit: string;
  correo: string;
  telefono: string;
  empresaId: number;
}

interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    role: Role;
    empresaId: number | null;
  };
}

interface SessionResponse {
  user: AuthResponse["user"] | null;
}

interface RegisterResponse {
  message: string;
}

export const authService = {
  async login(dto: LoginDto) {
    const { data } = await clientAxios.post<AuthResponse>(
      API_ROUTES.AUTH.LOGIN,
      dto,
    );
    return data.user;
  },

  async logout() {
    const { data } = await clientAxios.post<{ message: string }>(
      API_ROUTES.AUTH.LOGOUT,
    );
    return data;
  },

  async getSession() {
    const { data } = await clientAxios.get<SessionResponse>(
      API_ROUTES.AUTH.SESSION,
    );
    return data.user;
  },

  async registerCliente(dto: RegisterClienteDto) {
    const { data } = await clientAxios.post<RegisterResponse>(
      API_ROUTES.AUTH.REGISTER,
      dto,
    );
    return data;
  },
};
