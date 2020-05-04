import { Module } from "@nestjs/common";
import { GameManagerController } from './gamemanager.controller'
import { AuthModule } from '../auth/auth.module'
import { GameManagerService } from "./gamemanager.service";



@Module(
    {
        providers: [
            { provide: 'IGameManagerService', useClass: GameManagerService }
        ],
        controllers: [GameManagerController],
        imports: [],
        exports: [
            { provide: "IGameManagerService", useClass: GameManagerService }
        ]
    }
)

export class GameManagerModule { }
