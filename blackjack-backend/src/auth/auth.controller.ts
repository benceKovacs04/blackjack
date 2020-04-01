import { Controller, Post, Body, Res, HttpException, HttpStatus, Inject, Header, HttpCode, Get, UseGuards } from "@nestjs/common";
import { Response } from 'express'
import { IAuthService } from './IAuthService'
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt-auth.guard";

@Controller("auth")
export class AuthController {
    constructor(
        @Inject('IAuthService') private readonly authService: IAuthService
    ) { }

    @Post("/signUp")
    signUp(
        @Res() res: Response,
        @Body("username") username: string,
        @Body("password") password: string
    ) {

        return this.authService.signUp(username, password)
    }

    @Post("/login")
    @HttpCode(200)
    async signIn(
        @Res() res: Response,
        @Body("username") username: string,
        @Body("password") password: string
    ) {
        const token: string = await this.authService.signIn(username, password)
        res.set("Set-Cookie", `access_token=${token}; Domain=localhost; Path=/; expires=${new Date(new Date().getTime() + 86409000).toUTCString()}`)
        res.send()
    }
}