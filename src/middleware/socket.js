import * as actions from "../store/actions";
import {
  ADD_MACHINE,
  RECEIVE_MACHINE_UPDATES, SET_LOCAL_POLL_SPEED, SET_POLL_SPEED, TO_SERVER,
  WS_CONNECT,
  WS_DISCONNECT, WS_DISCONNECTED, WS_SETUP
} from "../store/actionTypes";
import {setLocalPollSpeed, updateMachineValues} from "../store/actions";
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
      case WS_SETUP:
        socket = io.connect(URL, {
          transports: ["websocket", "polling"],
        });
        socket.on("message", onMessage(store));
        socket?.emit(WS_SETUP);
        break;
      case WS_CONNECT:
        socket?.emit(WS_CONNECT);
        console.log("websocket open", URL);
        break;
      case WS_DISCONNECT:
        socket?.emit(WS_DISCONNECT);
        // disconnect();
        console.log("websocket closed");
        break;
      case SET_POLL_SPEED:
        socket?.emit(SET_POLL_SPEED, action.payload);
        store.dispatch(setLocalPollSpeed(action.payload));
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
