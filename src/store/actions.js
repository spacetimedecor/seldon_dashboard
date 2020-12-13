import * as actionTypes from "./actionTypes";

export const updateMachineValues = (MachineValues) => ({
  type: actionTypes.UPDATE_MACHINE_VALUES,
  MachineValues,
});

export const messageToServer = (payload) => ({
  type: actionTypes.TO_SERVER,
  payload
});

export const setPollSpeed = (payload) => ({
  type: actionTypes.SET_POLL_SPEED,
  payload
});

export const addMachine = payload => ({
  type: actionTypes.ADD_MACHINE,
  payload
});

export const test = () => ({ type: actionTypes.TEST });

export const wsConnect = host => ({ type: actionTypes.WS_CONNECT, host });
export const wsDisconnect = host => ({ type: actionTypes.WS_DISCONNECT, host });
