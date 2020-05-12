import { Module } from "@nestjs/common";
import { GameGateway } from "./game.gateway";
import { GameManagerModule } from "../gamemanager.module";

@Module({
    providers: [
        GameGateway,
        { provide: "IWebSocketConnection", useClass: GameGateway }
    ],
    imports: [GameManagerModule]
})

export class GameModule { }