import {UPDATE_MACHINE_VALUES} from "./actionTypes";

export default (state = {}, action) => {
  switch (action.type) {
    case UPDATE_MACHINE_VALUES:
      return {
        ...state,
        MachineValues: action.MachineValues
      }
    default:
      return state;
  }
}