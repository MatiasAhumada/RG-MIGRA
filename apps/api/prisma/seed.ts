import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import { BCRYPT_CONSTANTS } from '../constants/auth.constant'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('Test1234!', BCRYPT_CONSTANTS.SALT_ROUNDS)

  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
      isActive: true,
    },
  })

  await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      name: 'Test User',
      email: 'user@example.com',
      password: hashedPassword,
      isActive: true,
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
