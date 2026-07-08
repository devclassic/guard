import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { KnexModule } from 'nestjs-knex'
import { ClientModule } from './client/client.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    KnexModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        config: {
          client: config.get('DB_DRIVER'),
          connection: {
            host: config.get('DB_HOST'),
            port: config.get('DB_PORT'),
            database: config.get('DB_DATABASE'),
            user: config.get('DB_USER'),
            password: config.get('DB_PASSWORD'),
          },
        },
      }),
    }),
    ClientModule,
  ],
  providers: [],
})
export class AppModule {}
