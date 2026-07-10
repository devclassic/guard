import { Controller, Get, Post, Req } from '@nestjs/common'
import { type Request } from 'express'
import { InjectKnex, type Knex } from 'nestjs-knex'
import platform from '../utils/platform'

@Controller('api/client')
export class ApiController {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  @Post('groups')
  async groups(@Req() req: Request) {
    const data = await this.knex.table('group').orderBy('id', 'desc')
    return { success: true, message: '获取分组成功', data }
  }

  @Post('realtime')
  async realtime(@Req() req: Request) {
    const group_id = req.body.group_id
    const localDevices = await this.knex.table('device').where('group_id', group_id)
    const addrs = localDevices.map(item => item.address)
    const remoteDevices = await platform.getRealTimeDataByDeviceAddr(addrs.join(','))
    if (remoteDevices) {
      for (let i = 0; i < remoteDevices.length; i++) {
        remoteDevices[i].addr = localDevices[i].address
        remoteDevices[i].name = localDevices[i].name
        remoteDevices[i].pos = localDevices[i].position
      }
    }
    return { success: true, message: '获取实时数据成功', data: remoteDevices ?? [] }
  }
}
