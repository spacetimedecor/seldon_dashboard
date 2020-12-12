import { UPDATE_MACHINE_VALUES } from "./actionTypes";

export const updateMachineValues = (MachineValues) => ({
  type: UPDATE_MACHINE_VALUES,
  MachineValues,
});

export const test = () => ({
  type: TEST
});
