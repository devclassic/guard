import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AuthMiddleware } from './middlewares/auth.middleware'
import { AuthController } from './controllers/auth.controller'
import { AdminController } from './controllers/admin.controller'
import { UserController } from './controllers/user.controller'

@Module({
  controllers: [AuthController, AdminController, UserController],
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude('api/admin/login', 'api/admin/check')
      .forRoutes('api/admin')
  }
}
