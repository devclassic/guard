import { Body, Controller, Post } from '@nestjs/common'
import { InjectKnex, type Knex } from 'nestjs-knex'

@Controller('api/admin/config')
export class ConfigController {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  @Post('list')
  async list(@Body() body: any) {
    const page = body.page
    const size = body.size || 10
    const offset = (page - 1) * size
    const result = await this.knex.table('config').count('*', { as: 'total' })
    const total = result[0].total
    let knex = this.knex.table('config').orderBy('id', 'desc').limit(size).offset(offset)
    if (body.search.name) {
      knex = knex.where('name', 'like', `%${body.search.name}%`)
    }
    if (body.search.value) {
      knex = knex.where('name', 'like', `%${body.search.value}%`)
    }
    const list = await knex
    return { success: true, message: '获取列表成功', data: { total, list } }
  }

  @Post('add')
  async add(@Body() body: any) {
    const data = await this.knex.table('config').where({ name: body.name }).first()
    if (data) {
      return { success: false, message: '已经存在相同配置' }
    }
    await this.knex.table('config').insert(body)
    return { success: true, message: '添加成功' }
  }

  @Post('update')
  async update(@Body() body: any) {
    await this.knex.table('config').where({ id: body.id }).update(body)
    return { success: true, message: '更新成功' }
  }

  @Post('remove')
  async remove(@Body() body: any) {
    const ids = body.ids + ''
    await this.knex.table('config').where('id', 'in', ids.split(',')).delete()
    return { success: true, message: '删除成功' }
  }
}
