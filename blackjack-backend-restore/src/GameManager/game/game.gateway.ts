import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets'
import { IGameManagerService } from '../IGameManagerService.interface';
import { Socket } from 'socket.io';
import { UseGuards, Logger, Inject } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { request } from 'http';

@UseGuards(JwtAuthGuard)
@WebSocketGateway({ namespace: "game" })
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {

    constructor(
        @Inject('IGameManagerService') private readonly gameManager: IGameManagerService,
    ) { }

    handleConnection(client: Socket, ...args: any[]) {
        client.emit("asd", "it works")
    }

    handleDisconnect(client: Socket) {
        console.log("disconnected")
    }

    @SubscribeMessage("create-game")
    createGame(@MessageBody() data: string): string {
        return data;
    }
}
