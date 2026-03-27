import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { BaseRepository } from './base.repository'

export interface HealthCheckResult {
  status: string
  timestamp: string
}

@Injectable()
export class HealthRepository extends BaseRepository<HealthCheckResult> {
  constructor(private readonly prisma: PrismaClient) {
    super(prisma, 'user')
  }

  async checkDatabaseConnection(): Promise<boolean> {
    try {
      await this.prisma.$queryRaw`SELECT 1`
      return true
    } catch {
      return false
    }
  }
}
