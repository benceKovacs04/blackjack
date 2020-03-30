import { Controller, Post, Body, Res, HttpException, HttpStatus, Inject } from "@nestjs/common";
import { Response } from 'express'
import { IAuthService } from './IAuthService'

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

    @Post("/signIn")
    signIn(
        @Body("username") username: string,
        @Body("password") password: string
    ) {
        return this.authService.signIn(username, password)
    }
}