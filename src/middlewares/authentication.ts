import { Socket } from 'socket.io';
import jwt, {verify} from "jsonwebtoken";
import {uuidv4} from "../helpers/uuid";


const authentication = (socket: Socket, next: any) => {
    const token = socket.handshake.auth.token; // JWT

    if (process.env.JWT_SECRET) {
        const payload = verify(token, process.env.JWT_SECRET);

        if (payload) {
            console.log('HAS TOKEN');
            socket.data.user = payload;

            next();
        } else {
            console.log('NO TOKEN');
            const _token = jwt.sign({
                uuid: uuidv4(),
            }, process.env.JWT_SECRET);

            socket.emit('get_token', _token);
            next(new Error("Authentication error"));
        }
    } else {
        next(new Error("No JWT_SECRET"));
    }
};


export default authentication;