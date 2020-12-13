import * as actions from "../store/actions";
import {
  ADD_MACHINE,
  RECEIVE_MACHINE_UPDATES, SET_POLL_SPEED, TO_SERVER,
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
      case SET_POLL_SPEED:
        socket?.emit(SET_POLL_SPEED, action.payload);
        break;
      case ADD_MACHINE:
        socket?.emit(ADD_MACHINE, action.payload);
        break;
      case TO_SERVER:
        socket?.emit(TO_SERVER, action.payload);
        break;
      default:
        return next(action);
    }
  };
};

export default socketMiddleware();
