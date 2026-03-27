export interface IPaginationParams {
  page: number
  limit: number
}

export interface IPaginationResult<T> {
  data: T[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export interface ISortParams {
  field: string
  order: 'ASC' | 'DESC'
}
