import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AuthMiddleware } from './middlewares/auth.middleware'
import { HomeController } from './controllers/home.controller'
import { AuthController } from './controllers/auth.controller'
import { AdminController } from './controllers/admin.controller'
import { UserController } from './controllers/user.controller'
import { GroupController } from './controllers/group.controller'
import { ConfigController } from './controllers/config.controller'
import { DeviceController } from './controllers/device.controller'

@Module({
  controllers: [
    AuthController,
    HomeController,
    AdminController,
    UserController,
    GroupController,
    ConfigController,
    DeviceController,
  ],
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude('api/admin/login', 'api/admin/check')
      .forRoutes('api/admin')
  }
}
