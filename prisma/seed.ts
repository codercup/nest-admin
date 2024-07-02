import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const user = await prisma.user.create({
    data: {
      name: '鸽鸽',
      email: 'grove@qq.com',
    },
  })
  console.log(user)
}

main()
