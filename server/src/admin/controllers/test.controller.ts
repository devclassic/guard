import { Controller, Get } from '@nestjs/common'
import { InjectKnex, type Knex } from 'nestjs-knex'

@Controller('admin/test')
export class TestController {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  @Get()
  index() {
    return { message: '后台接口' }
  }
}
