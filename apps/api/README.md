# Generic Nest Prisma

Production-ready NestJS + Prisma template with Repository Pattern, following SOLID principles and strict TypeScript conventions.

## Features

- **NestJS** - Progressive Node.js framework
- **Prisma** - Next-generation ORM
- **Repository Pattern** - Clean architecture with base repository
- **JWT Authentication** - Access and refresh tokens
- **Global Error Handling** - Structured error responses
- **DTO Validation** - class-validator based validation
- **Swagger Documentation** - Auto-generated API docs
- **Docker Support** - Ready for containerization
- **Environment Validation** - Zod-based env validation

## Project Structure

```
generic-nest-prisma/
├── config/                 # Configuration files
│   ├── env.config.ts       # Environment validation schema
│   ├── database.config.ts  # Database configuration
│   ├── jwt.config.ts       # JWT configuration
│   ├── email.config.ts     # Email configuration
│   └── cloudflare.config.ts # Cloudflare R2 configuration
├── constants/              # Global constants
│   ├── app.constant.ts
│   ├── error.constant.ts
│   └── http-status.constant.ts
├── prisma/
│   ├── schema.prisma       # Prisma schema
│   └── seed.ts             # Database seeding
├── src/
│   ├── common/             # Shared modules
│   │   ├── controllers/    # Base and health controllers
│   │   ├── decorators/     # Custom decorators (@Public)
│   │   ├── repositories/   # Base repository
│   │   └── services/       # Health service
│   ├── config/             # NestJS configuration module
│   ├── constants/          # Re-exported constants
│   ├── exceptions/         # Exception classes and handlers
│   ├── filters/            # Exception filters and validation pipe
│   ├── guards/             # JWT authentication guard
│   ├── interceptors/       # Logging and transform interceptors
│   ├── interfaces/         # TypeScript interfaces
│   ├── modules/            # Feature modules
│   │   ├── auth/           # Authentication module
│   │   ├── users/          # Users module
│   │   ├── email/          # Email service (Resend)
│   │   └── cloudflare/     # Cloudflare R2 storage
│   ├── utils/              # Utility functions
│   ├── app.module.ts       # Root module
│   └── main.ts             # Application entry point
├── docker-compose.yml      # Docker services
├── Dockerfile              # Production image
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL 15+
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd generic-nest-prisma
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment file:
```bash
cp .env.example .env
```

4. Update `.env` with your credentials.

5. Generate Prisma client:
```bash
npm run prisma:generate
```

6. Run database migrations:
```bash
npm run prisma:migrate
```

7. Seed the database (optional):
```bash
npm run prisma:seed
```

8. Start development server:
```bash
npm run start:dev
```

The API will be available at `http://localhost:3000/api`
Swagger docs at `http://localhost:3000/api/docs`

## Docker

Start all services:
```bash
npm run docker:up
```

Stop all services:
```bash
npm run docker:down
```

View logs:
```bash
npm run docker:logs
```

## API Endpoints

### Health

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /health | Check health status |
| GET | /health/ready | Check readiness (includes DB) |

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /auth/login | Login and get tokens |
| POST | /auth/register | Register new user |
| POST | /auth/refresh | Refresh access token |

### Users

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | /users | Get all users (paginated) | ✓ |
| GET | /users/:id | Get user by ID | ✓ |
| POST | /users | Create user | Public |
| PUT | /users/:id | Update user | ✓ |
| DELETE | /users/:id | Delete user | ✓ |

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| NODE_ENV | Environment | development |
| PORT | Server port | 3000 |
| DATABASE_URL | PostgreSQL connection string | - |
| JWT_SECRET | JWT signing secret | - |
| JWT_EXPIRATION | Access token expiration | 1h |
| JWT_REFRESH_SECRET | Refresh token secret | - |
| JWT_REFRESH_EXPIRATION | Refresh token expiration | 7d |
| RESEND_API_KEY | Resend API key | - |
| CLOUDFLARE_* | Cloudflare R2 credentials | - |

## Code Conventions

### TypeScript

- Strict mode enabled
- No `any` type (except Zod preprocess)
- No `typeof` comparisons
- Explicit types for all functions
- Descriptive variable names

### Conditionals

```typescript
// ❌ Prohibited
if (value === null)
if (value === undefined)
if (flag === true)
if (flag === false)

// ✅ Allowed
if (value)
if (!value)
if (condition) { doSomething() }
```

### Error Handling

```typescript
// Backend
ApiErrorHandler.notFound('User not found')
ApiErrorHandler.unauthorized('Invalid credentials')

// Frontend
clientError.handler(error)
```

### Constants

All values must be in constants files:
- `/constants/*.constant.ts` - Business rules
- `/config/*.ts` - Configuration
- Prisma enums when applicable

### REST Design

```typescript
// ✅ Correct
GET    /users
GET    /users/:id
POST   /users
PUT    /users/:id
PATCH  /users/:id
DELETE /users/:id

// ❌ Incorrect
GET    /users/getAll
POST   /users/doSomething
POST   /users/:id/activate
```

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:cov
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run build` | Build for production |
| `npm run start:dev` | Start development server |
| `npm run start:prod` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run format` | Format with Prettier |
| `npm run prisma:generate` | Generate Prisma client |
| `npm run prisma:migrate` | Run migrations |
| `npm run prisma:studio` | Open Prisma Studio |
| `npm run docker:up` | Start Docker services |
| `npm run docker:down` | Stop Docker services |

## License

MIT
