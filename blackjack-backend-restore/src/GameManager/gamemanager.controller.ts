import { Controller, Get, UseGuards, Res, Inject, Post, Body } from "@nestjs/common";
import { Response } from 'express';
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { IGameManagerService } from "./IGameManagerService.interface";


@Controller("gameManager")
export class GameManagerController {
    constructor(
        @Inject('IGameManagerService') private readonly gameManagerService: IGameManagerService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post("/newgame")
    createNewLobby(@Res() res: Response, @Body("name") name: string) {
        res.send(this.gameManagerService.addNewGame(name))
    }

    @UseGuards(JwtAuthGuard)
    @Get("/getGamesData")
    getGameNames(@Res() res: Response) {
        res.send(this.gameManagerService.getGamesData())
    }

}