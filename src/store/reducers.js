import {
  SET_LOCAL_POLL_SPEED,
  SET_POLL_SPEED,
  SET_SORT_BY,
  SWITCH_CONNECTION,
  UPDATE_MACHINE_VALUES
} from "./actionTypes";

export default (state = {}, action) => {
  switch (action.type) {
    case UPDATE_MACHINE_VALUES:
      return {
        ...state,
        MachineValues: action.MachineValues
      }
    case SWITCH_CONNECTION:
      return {
        ...state,
        Connection: action.Connection
      }
    case SET_LOCAL_POLL_SPEED:
      return {
        ...state,
        LocalPollSpeed: action.payload
      }
    case SET_SORT_BY:
      return {
        ...state,
        SortBy: action.payload
      }
    default:
      return state;
  }
}