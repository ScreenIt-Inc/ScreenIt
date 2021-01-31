import Auth from "../../utils/Auth";
import * as types from "./SettingTypes";

const INITIAL_STATE = {
  category: "General",
  general: {
    establishmentName: "",
    establishmentId: Auth.getUser().establishmentId,
    maxCapacity: 250,
    notficationMessage: "You may now enter.",
  },
  permissions: [],
  form: [],
};

export default function locale(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.SET_SETTING:
      console.log("payloaf", action.payload);
      return { ...state, ...action.payload };
    case types.GET_SETTING:
      return state;
    default:
      return state;
  }
}
