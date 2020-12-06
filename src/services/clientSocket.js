import {io} from 'socket.io-client';

const socket = io("http://localhost:3231", {
    transports: ['websocket', 'polling']
});

export default socket;