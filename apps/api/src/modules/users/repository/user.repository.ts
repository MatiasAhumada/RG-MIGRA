import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { BaseRepository } from '@common/repositories/base.repository'
import { UserEntity } from '../entities/user.entity'

@Injectable()
export class UserRepository extends BaseRepository<UserEntity> {
  constructor(private readonly prisma: PrismaClient) {
    super(prisma, 'user')
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.model.findUnique({
      where: { email },
    }) as Promise<UserEntity | null>
  }

  async findActiveUsers(): Promise<UserEntity[]> {
    return this.model.findMany({
      where: { isActive: true },
    }) as Promise<UserEntity[]>
  }
}
