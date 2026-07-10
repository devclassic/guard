import { Injectable, NestMiddleware } from '@nestjs/common'
import jwt from 'jsonwebtoken'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    try {
      const token = req.headers.token
      jwt.verify(token, process.env.SECRET as string)
      next()
    } catch (err) {
      res.json({ code: 1001, success: false, message: '未登录' })
    }
  }
}
