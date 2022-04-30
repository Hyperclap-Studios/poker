import express from 'express';
import cors from 'cors';
import {createServer} from "http";
import {Server, Socket} from "socket.io";
import bodyParser from "body-parser";
import api from "../routes/api";
import path from "path";
import authentication from "../middlewares/authentication";
import Lobby from "../classes/Lobby";
import Player from "../classes/Player";
import lobbies from "./lobbies";

// Initialize
const app = express();
const server = createServer(app);
const io = new Server(server);

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use('/api', api);

io.use(authentication);

io.on('connection', (socket: Socket) => {
    console.log('New user connected');

    socket.emit('refresh_lobbies', lobbies.getCodes());

    socket.on('create_lobby', (name: string) => {
        const lobby = new Lobby();

        const host = new Player(socket.id, socket.data.user.uuid, name ?? 'Host', true);

        lobby.join(lobby.code, host);
        socket.join(lobby.code);

        lobbies.addLobby(lobby);

        io.emit('refresh_lobbies', lobbies.getCodes());
        //console.log(lobby);

        socket.emit('lobby_created', lobby.code);
        socket.emit('refresh_player', host);


    });

    socket.on('refresh_player', (code: string) => {
        console.log(socket.data.user.uuid);
        const player = lobbies.getLobby(code)?.getPlayer(socket.data.user.uuid);
        console.log(lobbies.lobbies[0]?.players);
        console.log(player);
        if (player) socket.emit('refresh_player', player);
    });
});


// Serve Frontend
app.get('*', (_req, res) => {
    res.sendFile(path.resolve(`${__dirname}/../../client/build/index.html`));
});

export {app, server, io};