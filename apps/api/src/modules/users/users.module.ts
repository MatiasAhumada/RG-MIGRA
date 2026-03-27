import { Module } from '@nestjs/common'
import { UserController } from './controller/user.controller'
import { UserService } from './services/user.service'
import { UserRepository } from './repository/user.repository'

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UsersModule {}
