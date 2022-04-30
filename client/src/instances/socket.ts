import {io} from "socket.io-client";

const socket = io('/');

socket.auth = {
    token: localStorage.getItem('token')
};

export default socket;