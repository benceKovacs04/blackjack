import { Module } from "@nestjs/common";
import { GameManagerController } from './gamemanager.controller'
import { GameManagerService } from "./gamemanager.service";
import { GameGateway } from "./game/game.gateway";



@Module(
    {
        providers: [
            { provide: 'IGameManagerService', useClass: GameManagerService },
            GameGateway,
        ],
        controllers: [GameManagerController],
        imports: [],
        exports: [
            { provide: "IGameManagerService", useClass: GameManagerService }
        ]
    }
)

export class GameManagerModule { }
