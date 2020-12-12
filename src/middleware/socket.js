import * as actions from "../store/actions";
import {
  RECEIVE_MACHINE_UPDATES, TO_SERVER,
  WS_CONNECT,
  WS_DISCONNECT
} from "../store/actionTypes";
import {updateMachineValues} from "../store/actions";
import {io} from "socket.io-client";
import {URL} from "../config";

const socketMiddleware = () => {

  let socket = null;

  const onMessage = (store) => (event) => {
    switch (event.type) {
      case RECEIVE_MACHINE_UPDATES:
        store.dispatch(updateMachineValues(event.MachineValues));
        break;
      default:
        break;
    }
  }

  const onDisconnect = (store) => () => {
    store.dispatch(actions.wsDisconnected(URL));
  }

  const onConnect = (store) => () => {
    console.log("websocket open", URL);
    store.dispatch(actions.wsConnected(URL));
  }

  // the middleware part of this function
  return (store) => (next) => (action) => {
    switch (action.type) {
      case WS_CONNECT:
        socket = io.connect(URL, {
          transports: ["websocket", "polling"],
        });

        socket.on('connect', onConnect(store));
        socket.on("message", onMessage(store));
        socket.on('disconnect', onDisconnect(store));
        socket.emit('terminate');
        break;
      case WS_DISCONNECT:
        console.log('Got here, socket is: ', socket);
        socket?.removeAllListeners();
        socket?.disconnect();
        socket?.destroy();
        socket = null;
        console.log("websocket closed");
        break;
      case TO_SERVER:
        socket.emit('to_server', action.payload);
        break;
      default:
        console.log("the next action:", action);
        return next(action);
    }
  };
};

export default socketMiddleware();
