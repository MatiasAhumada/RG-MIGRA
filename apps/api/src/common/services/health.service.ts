import { Injectable } from '@nestjs/common'
import { HealthRepository } from '../repositories/health.repository'

@Injectable()
export class HealthService {
  constructor(private readonly healthRepository: HealthRepository) {}

  async checkHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    }
  }

  async checkReadiness() {
    const database = await this.healthRepository.checkDatabaseConnection()

    return {
      status: database ? 'ready' : 'not_ready',
      database: database ? 'connected' : 'disconnected',
      timestamp: new Date().toISOString(),
    }
  }
}
