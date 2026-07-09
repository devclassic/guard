import { Body, Controller, Post } from '@nestjs/common'
import { InjectKnex, type Knex } from 'nestjs-knex'

@Controller('api/admin/admin')
export class AdminController {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  @Post('list')
  async list(@Body() body: any) {
    const page = body.page
    const size = body.size || 10
    const offset = (page - 1) * size
    const result = await this.knex.table('admin').count('*', { as: 'total' })
    const total = result[0].total
    let knex = this.knex.table('admin').orderBy('id', 'desc').limit(size).offset(offset)
    if (body.search.name) {
      knex = knex.where('name', 'like', `%${body.search.name}%`)
    }
    if (body.search.account) {
      knex = knex.where('account', 'like', `%${body.search.account}%`)
    }
    const list = await knex
    return { success: true, message: '获取列表成功', data: { total, list } }
  }

  @Post('add')
  async add(@Body() body: any) {
    const admin = await this.knex.table('admin').where({ account: body.account }).first()
    if (admin) {
      return { success: false, message: '已经存在相同账号' }
    }
    await this.knex.table('admin').insert(body)
    return { success: true, message: '添加成功' }
  }

  @Post('update')
  async update(@Body() body: any) {
    await this.knex.table('admin').where({ id: body.id }).update(body)
    return { success: true, message: '更新成功' }
  }

  @Post('remove')
  async remove(@Body() body: any) {
    const ids = body.ids + ''
    await this.knex.table('admin').where('id', 'in', ids.split(',')).delete()
    return { success: true, message: '删除成功' }
  }
}
