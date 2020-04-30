import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from 'express'

@Injectable()
export class JwtCookieToHeader implements NestMiddleware {
    use(req: Request, res: Response, next: Function) {
        if (req.cookies['access-token'] != null) {
            req.headers.authorization = `Bearer ${req.cookies['access-token']}`
        }
        next();
    }
}