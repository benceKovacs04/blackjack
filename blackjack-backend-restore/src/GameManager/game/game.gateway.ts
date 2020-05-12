import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets'
import { IGameManagerService } from '../IGameManagerService.interface';
import { Socket } from 'socket.io';
import { UseGuards, Logger, Inject } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@WebSocketGateway({ namespace: "game" })
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {

    private _connections: Map<string, Set<string>> = new Map<string, Set<string>>();

    constructor(
        @Inject('IGameManagerService') private readonly gameManager: IGameManagerService,
    ) { }

    @UseGuards(JwtAuthGuard)
    handleConnection(client: Socket, ...args: any[]) {
        console.log(client.id)
        client.emit("connected")

    }

    handleDisconnect(client: Socket) {
        console.log("disconnected")
    }

    @SubscribeMessage("map_username")
    mapUsername(client: Socket, username: string): void {
        console.log(username)
        console.log(client.id)
    }
}
