import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AuthMiddleware } from './middlewares/auth.middleware'
import { AuthController } from './controllers/auth.controller'
import { ApiController } from './controllers/api.controller'

@Module({
  controllers: [AuthController, ApiController],
})
export class ClientModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude('api/client/test', 'api/client/login', 'api/client/check')
      .forRoutes('api/client')
  }
}
