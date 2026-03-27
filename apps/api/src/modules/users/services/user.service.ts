import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { UserRepository } from '../repository/user.repository'
import { CreateUserDto } from '../dto/create-user.dto'
import { UpdateUserDto } from '../dto/update-user.dto'
import { UserEntity } from '../entities/user.entity'
import { IPaginationParams, IPaginationResult } from '@interfaces/repository.interface'
import { ApiErrorHandler } from '@exceptions/apiError.handler'
import { ClientErrorHandler } from '@exceptions/clientError.handler'
import { USER_ERRORS } from '@constants/error.constant'
import { BCRYPT_CONSTANTS } from '@constants/auth.constant'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findById(id)
    if (!user) {
      ApiErrorHandler.notFound(USER_ERRORS.NOT_FOUND)
    }
    return user
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.findAll()
  }

  async findWithPagination(pagination: IPaginationParams): Promise<IPaginationResult<UserEntity>> {
    return this.userRepository.findWithPagination(pagination)
  }

  async create(userInput: CreateUserDto): Promise<UserEntity> {
    const existingUser = await this.userRepository.findByEmail(userInput.email)
    if (existingUser) {
      ApiErrorHandler.conflict(USER_ERRORS.EMAIL_EXISTS)
    }

    const hashedPassword = await bcrypt.hash(userInput.password, BCRYPT_CONSTANTS.SALT_ROUNDS)

    try {
      return await this.userRepository.create({
        name: userInput.name,
        email: userInput.email,
        password: hashedPassword,
        isActive: true,
      })
    } catch (error) {
      ClientErrorHandler.handle(error, USER_ERRORS.ALREADY_EXISTS)
    }
  }

  async update(id: string, updateUserParams: UpdateUserDto): Promise<UserEntity> {
    await this.findById(id)

    const updateData: Partial<UpdateUserDto> = { ...updateUserParams }

    if (updateUserParams.password) {
      updateData.password = await bcrypt.hash(
        updateUserParams.password,
        BCRYPT_CONSTANTS.SALT_ROUNDS,
      )
    }

    try {
      return await this.userRepository.update(id, updateData)
    } catch (error) {
      ClientErrorHandler.handle(error, USER_ERRORS.ALREADY_EXISTS)
    }
  }

  async delete(id: string): Promise<void> {
    await this.findById(id)
    await this.userRepository.delete(id)
  }
}
