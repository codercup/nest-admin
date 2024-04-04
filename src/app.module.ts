import { Global, Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import configuration from './config/configuration'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UploadModule } from './upload/upload.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      useFactory(configService: ConfigService) {
        const mysqlConfig = configService.get<{
          host: string
          port: number
          username: string
          password: string
          database: string
        }>('mysql', {
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: '123456',
          database: 'nest_study',
        })
        console.log('mysqlConfig:', mysqlConfig) // 居然获取的是这里的默认值，不是配置的值，TODO: fix me
        return {
          ...mysqlConfig,
          type: 'mysql',
          synchronize: true,
          logging: false,
          entities: [],
          poolSize: 10,
          connectorPackage: 'mysql2',
        }
      },
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    UploadModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
  ],
})
export class AppModule {}
