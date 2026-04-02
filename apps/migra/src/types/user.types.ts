import { User as PrismaUser, Role as PrismaRole } from "@prisma/client";

export type User = PrismaUser;

export type Role = PrismaRole;

export interface CreateUserDto {
  email: string;
  password: string;
  name: string;
  role?: Role;
}

export interface UpdateUserDto extends Partial<CreateUserDto> {}

export interface UserWithCliente extends User {
  cliente: Cliente | null;
}

import { Cliente } from "./cliente.types";
