import clientAxios from "@/utils/clientAxios.util";
import { API_ROUTES } from "@/constants/routes";
import { User, Role } from "@/types/user.types";

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  name: string;
  razonSocial: string;
  titular: string;
  cuit: string;
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

  async register(dto: RegisterDto) {
    const { data } = await clientAxios.post<AuthResponse>(
      API_ROUTES.AUTH.REGISTER,
      dto,
    );
    return data.user;
  },
};
