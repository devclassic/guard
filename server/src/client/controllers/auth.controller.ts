import { Controller, Post, Req } from '@nestjs/common'
import { type Request } from 'express'
import { InjectKnex, type Knex } from 'nestjs-knex'
import jwt from 'jsonwebtoken'

@Controller('api/client')
export class AuthController {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  @Post('login')
  async login(@Req() req: Request) {
    const account = req.body.account
    const password = req.body.password
    const user = await this.knex
      .table('user')
      .select('id', 'name', 'account')
      .where({ account, password })
      .first()
    if (user) {
      const token = jwt.sign(user, process.env.SECRET as string, { expiresIn: '10y' })
      return { success: true, message: '登录成功', data: { token, user } }
    } else {
      return { success: false, message: '账号或密码错误' }
    }
  }

  @Post('check')
  async check(@Req() req: Request) {
    try {
      const token = req.headers.token as string
      jwt.verify(token, process.env.SECRET as string)
      return { success: true, message: '已登录' }
    } catch (err) {
      return { success: false, message: '令牌错误' }
    }
  }
}
