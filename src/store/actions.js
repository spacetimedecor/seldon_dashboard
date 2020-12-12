import * as actionTypes from "./actionTypes";

export const updateMachineValues = (MachineValues) => ({
  type: actionTypes.UPDATE_MACHINE_VALUES,
  MachineValues,
});

export const test = () => ({ type: actionTypes.TEST });

export const wsConnect = host => ({ type: actionTypes.WS_CONNECT, host });
export const wsConnecting = host => ({ type: actionTypes.WS_CONNECTING, host });
export const wsConnected = host => ({ type: actionTypes.WS_CONNECTED, host });
export const wsDisconnect = host => ({ type: actionTypes.WS_DISCONNECT, host });
export const wsDisconnected = host => ({ type: actionTypes.WS_DISCONNECTED, host });