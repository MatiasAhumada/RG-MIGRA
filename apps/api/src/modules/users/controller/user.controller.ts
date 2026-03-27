import { Controller, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '@guards/jwt-auth.guard'
import { Public } from '@common/decorators/public.decorator'
import { BaseController } from '@common/controllers/base.controller'
import { UserService } from '../services/user.service'
import { CreateUserDto } from '../dto/create-user.dto'
import { UpdateUserDto } from '../dto/update-user.dto'
import { UserEntity } from '../entities/user.entity'

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController extends BaseController<UserEntity, CreateUserDto, UpdateUserDto> {
  constructor(protected readonly userService: UserService) {
    super(userService)
  }

  @Public()
  @Post()
  create(@Body() createUserInput: CreateUserDto) {
    return this.userService.create(createUserInput)
  }
}
