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
      .exclude('api/client/login', 'api/client/check', 'api/client/test')
      .forRoutes('api/client')
  }
}
