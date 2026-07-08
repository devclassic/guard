import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import { Logger } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  const port = process.env.PORT ?? 3000
  await app.listen(port)
  Logger.log(`http://localhost:${port}`)
}

bootstrap()
