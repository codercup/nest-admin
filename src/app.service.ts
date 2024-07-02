import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!'
  }
  async createUser() {
    await prisma.user.create({
      data: {
        name: '菲鸽',
        email: 'xx@xx.com',
      },
    })

    await prisma.user.create({
      data: {
        name: '悟空',
        email: 'xxx@xxx.com',
      },
    })

    const users = await prisma.user.findMany()
    console.log(users)
  }
}
