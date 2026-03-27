import { PrismaClient, Prisma } from '@prisma/client'
import { IPaginationParams, IPaginationResult, ISortParams } from '@interfaces/repository.interface'

export abstract class BaseRepository<T, CreateDto = Partial<T>, UpdateDto = Partial<T>> {
  constructor(
    protected readonly prisma: PrismaClient,
    protected readonly modelName: keyof PrismaClient,
  ) {}

  protected get model(): Prisma.ModelDelegate<T> {
    return this.prisma[this.modelName] as unknown as Prisma.ModelDelegate<T>
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findUnique({ where: { id } })
  }

  async findAll(): Promise<T[]> {
    return this.model.findMany()
  }

  async findWithPagination(
    pagination: IPaginationParams,
    where?: Prisma.WhereInput<T>,
    sort?: ISortParams,
  ): Promise<IPaginationResult<T>> {
    const skip = (pagination.page - 1) * pagination.limit

    const [data, total] = await Promise.all([
      this.model.findMany({
        where,
        skip,
        take: pagination.limit,
        orderBy: sort ? { [sort.field]: sort.order } : undefined,
      }),
      this.model.count({ where }),
    ])

    return {
      data,
      meta: {
        total,
        page: pagination.page,
        limit: pagination.limit,
        totalPages: Math.ceil(total / pagination.limit),
      },
    }
  }

  async create(createInput: CreateDto): Promise<T> {
    return this.model.create({ data: createInput }) as Promise<T>
  }

  async update(id: string, updateInput: UpdateDto): Promise<T> {
    return this.model.update({
      where: { id },
      data: updateInput,
    }) as Promise<T>
  }

  async delete(id: string): Promise<void> {
    await this.model.delete({ where: { id } })
  }

  async exists(id: string): Promise<boolean> {
    const record = await this.model.findUnique({
      where: { id },
      select: { id: true },
    })
    return !!record
  }
}
