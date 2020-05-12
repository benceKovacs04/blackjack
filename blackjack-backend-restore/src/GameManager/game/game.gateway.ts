import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets'
import { IGameManagerService } from '../IGameManagerService.interface';
import { Socket } from 'socket.io';
import { UseGuards, Logger, Inject } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@WebSocketGateway({ namespace: "game" })
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {

    private _connections: Map<string, string> = new Map<string, string>();

    constructor(
        @Inject('IGameManagerService') private readonly gameManager: IGameManagerService,
    ) { }

    @UseGuards(JwtAuthGuard)
    handleConnection(client: Socket, ...args: any[]) {
        client.emit("connected")

    }

    handleDisconnect(client: Socket) {
        let username;
        for (let [key, value] of this._connections.entries()) {
            if (value === client.id) {
                username = key
                break
            }
        }
        this._connections.delete(username)
        this.gameManager.removePlayerFromGame(username)
    }

    @SubscribeMessage("map_username")
    mapUsername(client: Socket, username: string): void {
        if (!this._connections.get(username)) {
            this._connections.set(username, client.id)
            client.emit("username_mapped", true)
            return
        }
        client.emit("username_mapped", false)
    }

    @SubscribeMessage("sit_player_in")
    sitPlayerIn(client: Socket, data: { username: string, tableName: string }): void {
        this.gameManager.addPlayerToGame(data.username, data.tableName)
    }
}
