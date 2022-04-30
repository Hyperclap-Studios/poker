import Lobby from "./Lobby";


class Lobbies {
    public lobbies: Array<Lobby> = [];

    constructor() {
        this.lobbies = [];
    }

    public addLobby(lobby: Lobby) {
        this.lobbies.push(lobby);
    }

    public getLobby(code: string): Lobby | null {
        for (let i = 0; i < this.lobbies.length; i++) {
            if (this.lobbies[i].code === code) {
                return this.lobbies[i];
            }
        }
        return null;
    }

    public getCodes(): Array<string> {
        let codes: Array<string> = [];
        for (let i = 0; i < this.lobbies.length; i++) {
            codes.push(this.lobbies[i].code);
        }
        return codes;
    }
}

export default Lobbies;