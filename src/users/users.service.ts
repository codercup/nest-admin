import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { ConfigService } from '@nestjs/config'

// This should be a real class/interface representing a user entity
export type User = any

@Injectable()
export class UsersService implements OnModuleInit {
  @Inject()
  private configService: ConfigService
  private readonly users = [
    {
      userId: 1,
      username: 'feige',
      password: '123456',
    },
    {
      userId: 2,
      username: '菲鸽',
      password: '888888',
    },
  ]

  constructor() {
    // const dbOptions = this.configService.get('db');
    // console.log(dbOptions);
  }
  onModuleInit() {
    const dbOptions = this.configService.get('db')
    console.log(dbOptions)
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user'
  }

  findAll() {
    const dbOptions = this.configService.get('db')
    console.log(dbOptions)
    return `This action returns all users`
  }

  findOneFaker(id: number) {
    return `This action returns a #${id} user`
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username)
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
