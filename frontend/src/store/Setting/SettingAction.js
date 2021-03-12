import * as types from "./SettingTypes";

export const setCurrentSetting = (payload) => {
  return { type: types.SET_SETTING, payload };
};

export const getCurrentSetting = () => {
  return { type: types.GET_SETTING };
};
