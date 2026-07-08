import { Controller, Get } from '@nestjs/common'
import { InjectKnex, type Knex } from 'nestjs-knex'

@Controller('test')
export class TestController {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  @Get()
  index() {
    const users = this.knex.table('user').limit(10)
    return users
  }
}
