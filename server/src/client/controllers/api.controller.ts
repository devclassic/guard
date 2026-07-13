import { Controller, Get, Post, Req } from '@nestjs/common'
import { type Request } from 'express'
import { InjectKnex, type Knex } from 'nestjs-knex'
import platform from '../utils/platform'
import { token } from '../utils/http'

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
    let knex = this.knex.table('device')
    if (group_id != 0) {
      knex = knex.where('group_id', group_id)
    }
    const localDevices = await knex
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

  @Get('test')
  async info(@Req() req: Request) {
    const sleep = (ms: number) => {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, ms)
      })
    }

    let addrs = await this.knex.table('device').select('address')
    const alarms: any[] = []
    for (let i = 0; i < addrs.length; i++) {
      const items = await platform.alarmRecordList(addrs[i].address)
      alarms.push(...items)
      await sleep(500)
    }

    addrs = addrs.map(item => item.address)
    const remoteDevices = await platform.getRealTimeDataByDeviceAddr(addrs.join(','))
    const offlines = remoteDevices.filter((item: any) => item.deviceStatus === 'offline')

    const data = { alarm: alarms.length, offline: offlines.length }

    return { success: true, message: '获取消息通知成功', data }
  }

  @Post('config')
  async config(@Req() req: Request) {
    const data = await this.knex.table('config')
    return { success: true, message: '获取配置成功', data }
  }
}
