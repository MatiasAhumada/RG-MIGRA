import {
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  HttpStatus,
  HttpCode,
} from '@nestjs/common'
import { IPaginationParams, IPaginationResult } from '@interfaces/repository.interface'
import { PAGINATION_CONSTANTS } from '@constants/app.constant'

interface IService<T, CreateDto, UpdateDto> {
  findById(id: string): Promise<T>
  findAll(): Promise<T[]>
  findWithPagination(pagination: IPaginationParams): Promise<IPaginationResult<T>>
  create(createInput: CreateDto): Promise<T>
  update(id: string, updateInput: UpdateDto): Promise<T>
  delete(id: string): Promise<void>
}

export abstract class BaseController<T, CreateDto, UpdateDto> {
  constructor(protected readonly service: IService<T, CreateDto, UpdateDto>) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    const pagination: IPaginationParams = {
      page: page || PAGINATION_CONSTANTS.DEFAULT_PAGE,
      limit: limit || PAGINATION_CONSTANTS.DEFAULT_LIMIT,
    }

    return this.service.findWithPagination(pagination)
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    return this.service.findById(id)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createInput: CreateDto) {
    return this.service.create(createInput)
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateInput: UpdateDto) {
    return this.service.update(id, updateInput)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    await this.service.delete(id)
  }
}
