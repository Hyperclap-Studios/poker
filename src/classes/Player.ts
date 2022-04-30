


class Player {

    public name: string;
    public money: number;
    public role: Role;
    public uuid: string;
    public lastActivity: number;
    public socketId: string;
    public isHost: boolean;

    constructor(socketId: string, uuid: string, name: string, isHost: boolean = false, money: number = 100, role: Role = 'Player') {
        this.uuid = uuid;
        this.socketId = socketId;
        this.lastActivity = Date.now();
        this.name = name;
        this.money = money;
        this.role = role;
        this.isHost = isHost;
    }

}

export default Player;