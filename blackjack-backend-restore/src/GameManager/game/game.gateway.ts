import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets'

@WebSocketGateway({ namespace: "game" })
export class GameGateway {

    @SubscribeMessage("create-game")
    createGame(@MessageBody() data: string): string {
        return data;
    }
}
