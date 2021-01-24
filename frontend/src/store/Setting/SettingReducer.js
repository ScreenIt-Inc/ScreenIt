import * as types from "./SettingTypes";

const INITIAL_STATE = {
  category: "General",
  general: {
    establishmentName: "",
    establishmentId: 123321,
    maxCapacity: 250,
    message: "You may now enter.",
  },
};

export default function locale(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.SET_SETTING:
      return { ...state, ...action.payload };
    case types.GET_SETTING:
      return state;
    default:
      return state;
  }
}
