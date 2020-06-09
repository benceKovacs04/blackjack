import IPlayer from '../player/IPlayer'

export default interface IGame {
    getName(): string;
    getOwner(): string;
    getPlayerNum(): number;
    addPlayer(player: IPlayer): boolean;
    removePlayer(player: IPlayer): void;
}