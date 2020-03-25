import { Controller, Get, Post, Body, NotFoundException } from "@nestjs/common";

@Controller("login")
export class UserAuthController {

    @Post()
    logIn(
        @Body("username") username: string,
        @Body("password") password: string
    ) {
        console.log(username + " " + password)
        throw new NotFoundException()
    }

}