import { Controller, Get, HttpStatus, HttpCode } from '@nestjs/common'
import { HealthService } from '../services/health.service'

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async checkHealth() {
    return this.healthService.checkHealth()
  }

  @Get('ready')
  @HttpCode(HttpStatus.OK)
  async checkReadiness() {
    return this.healthService.checkReadiness()
  }
}
