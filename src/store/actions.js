import * as actionTypes from "./actionTypes";

// Socket control
export const wsConnect = host => ({ type: actionTypes.WS_CONNECT, host });
export const wsSetup = host => ({ type: actionTypes.WS_SETUP, host });
export const wsDisconnect = host => ({ type: actionTypes.WS_DISCONNECT, host });

export const switchConnection = (Connection) => ({ type: actionTypes.SWITCH_CONNECTION, Connection });

// To client
export const updateMachineValues = (MachineValues) => ({
  type: actionTypes.UPDATE_MACHINE_VALUES,
  MachineValues,
});

export const setLocalPollSpeed = (payload) => ({
  type: actionTypes.SET_LOCAL_POLL_SPEED,
  payload
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