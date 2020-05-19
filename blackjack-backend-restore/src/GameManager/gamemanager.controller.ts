import { Controller, Get, UseGuards, Res, Inject, Post, Body, Query } from "@nestjs/common";
import { Response } from 'express';
import { IGameManagerService } from "./IGameManagerService.interface";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { join } from "path";


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

<<<<<<< HEAD
    @UseGuards(JwtAuthGuard)
=======
    //@UseGuards(JwtAuthGuard)
>>>>>>> 30a924b52ae4450ed90bbaa601700c48efe0910b
    @Get("/card-image")
    getCardImage(
        @Res() res: Response,
        @Query("cardId") cardId: string
    ) {
        res.sendFile(join(__dirname, '../../', "src", "assets", "cards", cardId))
    }

}