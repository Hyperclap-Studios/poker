import foodWords from '../../data/foodWords.json';
import Player from "./Player";

class Lobby {

    public code: string;
    public players: Player[];
    public state: GameState;

    constructor() {
        this.code = Lobby.generateCode();
        this.players = [];
        this.state = 'Waiting';
    }

    public join(code: string, player: Player): boolean {
        if (this.code !== code) return false;
        this.players.push(player);
        return true;
    }

    public getPlayerNames(): string[] {
        return this.players.map(player => player.name);
    }

    // get player by uuid
    public getPlayer(uuid: string): Player | null {
        return this.players.find(player => player.uuid === uuid) ?? null;
    }

    private static generateCode(): string {
        return foodWords[Math.floor(Math.random() * (foodWords.length - 1))]
            + '-' + foodWords[Math.floor(Math.random() * (foodWords.length - 1))];
    }

}

export default Lobby;