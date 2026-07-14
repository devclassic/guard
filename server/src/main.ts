import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import { Logger } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.enableCors()
  app.useStaticAssets('public/client', { prefix: '/' })
  app.useStaticAssets('public/admin', { prefix: '/admin' })
  const port = process.env.PORT ?? 3000
  await app.listen(port)
  Logger.log(`http://localhost:${port}`, 'Server')
}

bootstrap()
