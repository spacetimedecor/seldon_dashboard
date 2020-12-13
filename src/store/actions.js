import * as actionTypes from "./actionTypes";

// Socket control
export const wsConnect = host => ({ type: actionTypes.WS_CONNECT, host });
export const wsSetup = host => ({ type: actionTypes.WS_SETUP, host });
export const wsDisconnect = host => ({ type: actionTypes.WS_DISCONNECT, host });

// To client
export const updateMachineValues = (MachineValues) => ({
  type: actionTypes.UPDATE_MACHINE_VALUES,
  MachineValues,
});

// To server
export const setPollSpeed = (payload) => ({
  type: actionTypes.SET_POLL_SPEED,
  payload
});

export const addMachine = payload => ({
  type: actionTypes.ADD_MACHINE,
  payload
});