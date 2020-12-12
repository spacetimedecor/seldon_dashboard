import { UPDATE_MACHINE_VALUES, TEST } from "./actionTypes";

export const updateMachineValues = (MachineValues) => ({
  type: UPDATE_MACHINE_VALUES,
  MachineValues,
});

export const test = () => ({ type: TEST });

export const wsConnect = host => ({ type: 'WS_CONNECT', host });
export const wsConnecting = host => ({ type: 'WS_CONNECTING', host });
export const wsConnected = host => ({ type: 'WS_CONNECTED', host });
export const wsDisconnect = host => ({ type: 'WS_DISCONNECT', host });
export const wsDisconnected = host => ({ type: 'WS_DISCONNECTED', host });