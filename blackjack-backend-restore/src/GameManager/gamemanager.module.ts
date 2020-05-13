import { Module } from "@nestjs/common";
import { GameManagerController } from './gamemanager.controller'
import { GameManagerService } from "./gamemanager.service";
import { GameGateway } from "./game/game.gateway";



@Module(
    {
        providers: [
            GameGateway,
            { provide: 'IGameManagerService', useClass: GameManagerService },
        ],
        controllers: [GameManagerController],
        imports: [],
        exports: []
    }
)

export class GameManagerModule { }
