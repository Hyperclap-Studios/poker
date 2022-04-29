import express from 'express';
import cors from 'cors';
import {createServer} from "http";
import {Server, Socket} from "socket.io";
import bodyParser from "body-parser";
import api from "../routes/api";
import path from "path";

// Initialize
const app = express();
const server = createServer(app);
const io = new Server(server);

let players: Player[] = [];

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use('/api', api);


io.on('connection', (_socket: Socket) => {
    console.log('New user connected');

    _socket.emit('test', 'Hello world');
});

io.on('bruh', (data: any) => {
    console.log(data);
});

// Serve Frontend
app.get('*', (_req, res) => {
    res.sendFile(path.resolve(`${__dirname}/../../client/build/index.html`));
});

export {app, server, io, players};