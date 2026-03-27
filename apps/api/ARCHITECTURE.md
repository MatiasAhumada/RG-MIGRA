# Architecture

## Overview

This project follows a clean architecture with Repository Pattern, separating business logic from data access.

## Layers

### 1. Controllers Layer

- Handle HTTP requests/responses
- Delegate to services
- Use base controller for CRUD operations
- Apply guards for authentication

### 2. Services Layer

- Business logic
- Transaction management
- Call repositories
- Handle errors with ApiErrorHandler

### 3. Repositories Layer

- Data access
- Extend BaseRepository
- Prisma operations
- Custom queries

### 4. DTOs Layer

- Input validation
- class-validator decorators
- Type definitions

## Module Structure

```
module-name/
├── controller/
│   └── *.controller.ts
├── dto/
│   ├── create-*.dto.ts
│   ├── update-*.dto.ts
│   └── *-response.dto.ts
├── entities/
│   └── *.entity.ts
├── repository/
│   └── *.repository.ts
├── services/
│   └── *.service.ts
├── *.module.ts
└── index.ts
```

## Dependency Injection

All dependencies are injected via constructors:

```typescript
@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}
}
```

## Error Handling

### Exception Classes

- `ApiException` - Base exception
- `NotFoundException` - 404
- `BadRequestException` - 400
- `ConflictException` - 409
- `UnauthorizedException` - 401
- `ForbiddenException` - 403

### Error Handlers

```typescript
// Service layer
ApiErrorHandler.notFound(USER_ERRORS.NOT_FOUND)
ApiErrorHandler.conflict(USER_ERRORS.EMAIL_EXISTS)

// Catch-all
ClientErrorHandler.handle(error, defaultMessage)
```

### Filters

1. `ApiExceptionFilter` - Catches ApiException
2. `ApiErrorFilter` - Catches AxiosError
3. `ClientErrorFilter` - Catches all others

## Validation

### DTO Validation

```typescript
export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string

  @MinLength(8)
  password: string
}
```

### Environment Validation

Zod schema in `config/env.config.ts`:

```typescript
const envSchema = z.object({
  NODE_ENV: z.string(),
  PORT: z.preprocess((v) => Number(v), z.number()),
  DATABASE_URL: z.string(),
})
```

## Authentication

### JWT Strategy

1. User logs in
2. Server generates access + refresh tokens
3. Access token in Authorization header
4. JwtAuthGuard validates tokens
5. @Public() decorator bypasses auth

### Token Flow

```
Login → [accessToken, refreshToken]
Request → Authorization: Bearer <accessToken>
Expired → POST /auth/refresh { refreshToken }
New tokens → [accessToken, refreshToken]
```

## Database

### Prisma Schema

Located in `prisma/schema.prisma`:

```prisma
model User {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  password  String
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Migrations

```bash
# Development
npm run prisma:migrate

# Production
npm run prisma:migrate:prod
```

## Global Modules

### EmailModule

- Resend integration
- Google Mail (nodemailer)
- Global for all modules

### CloudflareModule

- R2 bucket access
- File upload/download
- Signed URLs
- Global for all modules

### ConfigurationModule

- Environment loading
- Zod validation
- Global config access

## Interceptors

### LoggingInterceptor

Logs all requests with duration:
```
[POST] /api/users - 201 - 45ms
```

### TransformInterceptor

Wraps responses:
```json
{
  "data": { ... },
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/api/users"
}
```

## Repository Pattern

### Base Repository

Generic CRUD operations:

```typescript
abstract class BaseRepository<T> {
  findById(id: string): Promise<T | null>
  findAll(): Promise<T[]>
  findWithPagination(pagination, where?, sort?): Promise<IPaginationResult<T>>
  create(data): Promise<T>
  update(id, data): Promise<T>
  delete(id): Promise<void>
  exists(id): Promise<boolean>
}
```

### Custom Repository

Extend base for custom queries:

```typescript
@Injectable()
export class UserRepository extends BaseRepository<UserEntity> {
  constructor(private readonly prisma: PrismaClient) {
    super(prisma, 'user')
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.model.findUnique({ where: { email } })
  }
}
```

## SOLID Principles

### Single Responsibility

Each class has one purpose:
- Controllers handle HTTP
- Services handle business logic
- Repositories handle data access

### Open/Closed

Extend base classes instead of modifying:
- BaseRepository → CustomRepository
- BaseController → CustomController

### Liskov Substitution

Derived classes can replace base classes without breaking functionality.

### Interface Segregation

Small, specific interfaces:
- IPaginationParams
- IPaginationResult
- ISortParams

### Dependency Inversion

Depend on abstractions:
- Services depend on repository interfaces
- Injected via constructor
