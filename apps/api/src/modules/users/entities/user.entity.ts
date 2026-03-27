import { Exclude } from 'class-transformer'

export class UserEntity {
  id: string
  name: string
  email: string

  @Exclude()
  password: string

  isActive: boolean
  createdAt: Date
  updatedAt: Date
}
