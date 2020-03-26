import { Controller, Post, Body, Res, HttpException, HttpStatus } from "@nestjs/common";
import { Response } from 'express'
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post("/signUp")
    signUp(
        @Res() res: Response,
        @Body("username") username: string,
        @Body("password") password: string
    ) {

        return this.authService.signUp(username, password)
    }
}