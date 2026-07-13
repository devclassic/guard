import { Controller, Get, Post, Req, Res } from '@nestjs/common'
import { type Response, type Request } from 'express'
import { InjectKnex, type Knex } from 'nestjs-knex'
import platform from '../utils/platform'
import OpenAI from 'openai'

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

  @Post('info')
  async info(@Req() req: Request) {
    let addrs = await this.knex.table('device').select('address')
    const reqs: any[] = []
    addrs.forEach(item => {
      const req = platform.alarmRecordList(item.address)
      reqs.push(req)
    })
    const res = await Promise.all(reqs)
    const alarms: any[] = []
    res.forEach(items => alarms.push(...items))

    addrs = addrs.map(item => item.address)
    const remoteDevices = await platform.getRealTimeDataByDeviceAddr(addrs.join(','))
    const offlines = remoteDevices.filter((item: any) => item.deviceStatus === 'offline')

    const data = { alarm: alarms.length, offline: offlines.length }

    return { success: true, message: '获取消息通知成功', data }
  }

  @Post('alarms')
  async alarms(@Req() req: Request) {
    let addrs = await this.knex.table('device').select('address')
    const reqs: any[] = []
    addrs.forEach(item => {
      const req = platform.alarmRecordList(item.address)
      reqs.push(req)
    })
    const res = (await Promise.all(reqs)) ?? []
    const data: any[] = []
    res.forEach(items => data.push(...items))

    const localDevice = await this.knex.table('device')
    const localAlarms = await this.knex.table('alarm')

    data.forEach(item => {
      const device = localDevice.find(x => item.deviceAddr + '' === x.address + '')
      const alarm = localAlarms.find(x => item.recordId === x.record_id)
      item.name = device.name
      item.pos = device.position
      item.info = device.info
      item.read = alarm ? !!alarm.read : false
    })
    data.sort((a, b) => Number(a.read) - Number(b.read))
    return { success: true, message: '获取告警列表成功', data }
  }

  @Post('read')
  async read(@Req() req: Request) {
    const record_id = req.body.record_id
    await this.knex.table('alarm').insert({
      record_id,
      read: 1,
    })
    return { success: true, message: '告警处理成功' }
  }

  @Post('ai')
  async ai(@Req() req: Request, @Res() res: Response) {
    try {
      const info = req.body.info
      const openai = new OpenAI({
        baseURL: process.env.AI_BASE_URL,
        apiKey: process.env.AI_API_KEY,
      })
      res.setHeader('Content-Type', 'text/event-stream')
      res.setHeader('Cache-Control', 'no-cache')
      res.setHeader('Connection', 'keep-alive')

      const message = `
### 设备信息
${info.info}

### 传感器信息
名称：${info.name}
位置：${info.pos}
报警因子：${info.factorName}
报警因子值：${info.dataValue}

### 主要任务
根据设备信息和传感器信息分析并给出可能的设备故障信息
用markdown格式回答
`

      const stream = await openai.chat.completions.create({
        messages: [{ role: 'user', content: message }],
        model: process.env.AI_MODEL as string,
        stream: true,
      })

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || ''
        if (content) {
          res.write(`data: ${JSON.stringify({ content })}\n\n`)
        }
      }

      res.write(`data: ${JSON.stringify({ done: true })}\n\n`)
      res.end()
    } catch (error) {
      res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`)
      res.end()
    }
  }

  @Post('config')
  async config(@Req() req: Request) {
    const data = await this.knex.table('config')
    return { success: true, message: '获取配置成功', data }
  }
}
