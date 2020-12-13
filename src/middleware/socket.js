import * as actions from "../store/actions";
import {
  RECEIVE_MACHINE_UPDATES, TO_SERVER,
  WS_CONNECT,
  WS_DISCONNECT, WS_DISCONNECTED
} from "../store/actionTypes";
import {updateMachineValues} from "../store/actions";
import {io} from "socket.io-client";
import {URL} from "../config";

const socketMiddleware = () => {

  let socket = null;

  const onMessage = (store) => (event) => {
    //console.log("message from server: ", event)
    switch (event.type) {
      case RECEIVE_MACHINE_UPDATES:
        store.dispatch(updateMachineValues(event.MachineValues));
        break;
      default:
        break;
    }
  }

  const onConnect = () => {
    console.log("websocket open", URL);
  }

  const disconnect = () => {
    socket?.removeAllListeners();
    socket?.disconnect();
    socket?.close();
    socket?.destroy();
    socket = null;
  }

  // the middleware part of this function
  return (store) => (next) => (action) => {
    switch (action.type) {
      case WS_CONNECT:
        socket = io.connect(URL, {
          transports: ["websocket", "polling"],
        });
        socket.on('connect', onConnect);
        socket.on("message", onMessage(store));
        break;
      case WS_DISCONNECT:
        disconnect();
        console.log("websocket closed");
        break;
      case TO_SERVER:
        socket.emit('to_server', action.payload);
        break;
      default:
        // console.log("the next action:", action);
        return next(action);
    }
  };
};

export default socketMiddleware();
