import * as types from "./TableTypes";

const INITIAL_STATE = {
  category: "Queue",
};

export default function locale(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.SET_TABLE:
      return { ...state, ...action.payload };
    case types.GET_TABLE:
      return state;
    default:
      return state;
  }
}
