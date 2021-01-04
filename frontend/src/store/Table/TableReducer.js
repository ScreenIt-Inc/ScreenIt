import * as types from "./TableTypes";

const INITIAL_STATE = localStorage.getItem("table") || "Queue";

export default function locale(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.SET_TABLE:
      return action.payload;
    case types.GET_TABLES:
      return action.payload;
    default:
      return state;
  }
}
