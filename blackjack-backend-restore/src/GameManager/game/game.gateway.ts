import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets'
import { IGameManagerService } from '../IGameManagerService.interface';
import { Socket } from 'socket.io';
import { UseGuards, Inject, Injectable } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import IPlayer from '../player/IPlayer';
import Player from '../player/player.model';



@Injectable()
@WebSocketGateway({ namespace: "game" })
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {

    private _connections: Map<string, IPlayer> = new Map<string, IPlayer>();

    constructor(
        @Inject('IGameManagerService') private readonly gameManager: IGameManagerService,
    ) { }

    @UseGuards(JwtAuthGuard)
    handleConnection(client: Socket, ...args: any[]) {
        client.emit("connected")
    }

    handleDisconnect(client: Socket) {
        const player = this._connections.get(client.id)
        this._connections.delete(client.id)
        this.gameManager.removePlayerFromGame(player)
    }


    @SubscribeMessage("sit_player_in")
    sitPlayerIn(client: Socket, data: { username: string, tableName: string }): void {
        const player: IPlayer = new Player(client, data.username)
        this._connections.set(client.id, player)
        this.gameManager.addPlayerToGame(player, data.tableName)
    }

}
