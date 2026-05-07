import { Address as PrismaAddress } from "@prisma/client";

export type Address = PrismaAddress;

export interface CreateAddressDto {
  provincia: string;
  localidad: string;
  direccion: string;
  codPostal: string;
  clienteId: number;
}

export interface UpdateAddressDto extends Partial<CreateAddressDto> {}
