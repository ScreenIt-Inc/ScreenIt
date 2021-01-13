import * as types from "./SettingTypes";

const INITIAL_STATE = {
  category: "General"
}

export default function locale(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.SET_SETTING:
      return { ...state, category: action.payload };
    case types.GET_SETTING:
      return state;
    default:
      return state;
  }
}
