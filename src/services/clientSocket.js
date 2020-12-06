import {io} from 'socket.io-client';
const PORT = process.env.PORT || 3231
const production  = 'https://seldon-dashboard.herokuapp.com/';
const development = `http://localhost:${PORT}/`;
const URL = (process.env.REACT_APP_NODE_ENV ? production : development);
const socket = io(`${URL}`, {
    transports: ['websocket', 'polling']
});

export default socket;