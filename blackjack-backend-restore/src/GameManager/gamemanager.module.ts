import { Module } from "@nestjs/common";
import { GameManagerController } from './gamemanager.controller'
import { AuthModule } from '../auth/auth.module'



@Module(
    {
        controllers: [GameManagerController],
        imports: [AuthModule]
    }
)

export class GameManagerModule { }
