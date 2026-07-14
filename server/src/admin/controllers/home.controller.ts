import { Body, Controller, Post } from '@nestjs/common'
import { InjectKnex, type Knex } from 'nestjs-knex'

@Controller('api/admin/home')
export class HomeController {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  @Post('info')
  async info(@Body() body: any) {
    const data = {
      url: process.env.PLATFORM_BASE_URL,
      account: process.env.PLATFORM_ACCOUNT,
      password: process.env.PLATFORM_PASSWORD,
    }
    return { success: true, message: '获取云平台信息成功', data }
  }
}
