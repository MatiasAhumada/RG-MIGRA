import { User as PrismaUser, Role as PrismaRole } from "@prisma/client";

export type User = PrismaUser;

export type Role = PrismaRole;

export interface CreateUserDto {
  email: string;
  password: string;
  name: string;
  role?: Role;
  empresaId?: number;
  mustChangePassword?: boolean;
}

export interface UpdateUserDto extends Partial<CreateUserDto> {}

export interface UserWithRelations extends User {
  empresa: Empresa | null;
  cliente: Cliente | null;
}

import { Cliente } from "./cliente.types";
import { Empresa } from "./empresa.types";
