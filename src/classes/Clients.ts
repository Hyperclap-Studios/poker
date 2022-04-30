import Player from "./Player";


class Clients {
    public clients: Player[] = [];

    constructor() {
        this.clients = [];
    }

    public addClient(uuid: string): void {
        const player = new Player(uuid, '');
        if (!this.UUIDExists(uuid)) this.clients.push(player);
    }

    public exists(player: Player): boolean {
        return this.clients.some(c => c.uuid === player.uuid);
    }

    public UUIDExists(uuid: string): boolean {
        return this.clients.some(c => c.uuid === uuid);
    }
}

export default Clients;