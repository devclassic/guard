import { Body, Controller, Post } from '@nestjs/common'
import { InjectKnex, type Knex } from 'nestjs-knex'

@Controller('api/admin/group')
export class GroupController {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  @Post('list')
  async list(@Body() body: any) {
    const page = body.page
    const size = body.size || 10
    const offset = (page - 1) * size
    const result = await this.knex.table('group').count('*', { as: 'total' })
    const total = result[0].total
    let knex = this.knex.table('group').orderBy('id', 'desc').limit(size).offset(offset)
    if (body.search.name) {
      knex = knex.where('name', 'like', `%${body.search.name}%`)
    }
    const list = await knex
    return { success: true, message: '获取列表成功', data: { total, list } }
  }

  @Post('add')
  async add(@Body() body: any) {
    await this.knex.table('group').insert(body)
    return { success: true, message: '添加成功' }
  }

  @Post('update')
  async update(@Body() body: any) {
    await this.knex.table('group').where({ id: body.id }).update(body)
    return { success: true, message: '更新成功' }
  }

  @Post('remove')
  async remove(@Body() body: any) {
    const ids = body.ids + ''
    await this.knex.table('group').where('id', 'in', ids.split(',')).delete()
    return { success: true, message: '删除成功' }
  }
}
