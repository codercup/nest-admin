import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('/api')
  const configService = app.get(ConfigService)
  const port = configService.get<number>('http.port')
  // 这里port改为6000却会有问题，好奇怪
  await app.listen(port)
  console.log(`Application is running on: http://localhost:${port}`)
}
bootstrap()
