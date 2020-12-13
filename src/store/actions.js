import * as actionTypes from "./actionTypes";

export const updateMachineValues = (MachineValues) => ({
  type: actionTypes.UPDATE_MACHINE_VALUES,
  MachineValues,
});

export const messageToServer = (Message) => ({
  type: actionTypes.TO_SERVER,
  Message
});

export const test = () => ({ type: actionTypes.TEST });

export const wsConnect = host => ({ type: actionTypes.WS_CONNECT, host });
export const wsDisconnect = host => ({ type: actionTypes.WS_DISCONNECT, host });
