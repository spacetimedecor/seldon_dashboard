import {io} from 'socket.io-client';
const PORT = process.env.PORT || 3231
const socket = io(`https://seldon-dashboard.herokuapp.com:${PORT}`, {
    transports: ['websocket', 'polling']
});

export default socket;