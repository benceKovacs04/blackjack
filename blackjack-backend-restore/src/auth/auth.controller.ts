import { Controller, Post, Body, Res, HttpException, HttpStatus, Inject, Header, HttpCode, Get, UseGuards } from "@nestjs/common";
import { Response } from 'express'
import { IAuthService } from './IAuthService'
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { STATUS_CODES } from "http";

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

        const success = this.authService.signUp(username, password)
        if (success) {
            res.status(201).send();
        } else {
            res.status(404).send();
        }
    }

    @Post("/login")
    @HttpCode(200)
    async signIn(
        @Res() res: Response,
        @Body("username") username: string,
        @Body("password") password: string
    ) {
        const token: string = await this.authService.signIn(username, password)
        res.cookie("access-token", token, { expires: new Date(Date.now() + 86409000), path: "/", httpOnly: true, domain: "localhost" })
        res.cookie("loggedIn", true, { path: "/" })
        res.send()
    }
}