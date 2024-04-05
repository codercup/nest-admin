import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.setGlobalPrefix('/api', { exclude: [''] })
  // 前面一个uplaods表示要进行静态资源托管的目录，后一个uplaods表示用户访问时要带上的前缀
  app.useStaticAssets('uploads', {
    // http://localhost:3000/uploads/file-1712218189297-853241156-pretty-girl.png
    // 如果不带上prefix （或者直接注释掉），则访问路径为 http://localhost:3000/file-1712218189297-853241156-pretty-girl.png
    prefix: '/uploads',
  })
  const configService = app.get(ConfigService)
  const port = configService.get<number>('http.port')
  // 这里port改为6000却会有问题，好奇怪
  await app.listen(port)
  console.log(`Application is running on: http://localhost:${port}`)
}
bootstrap()
