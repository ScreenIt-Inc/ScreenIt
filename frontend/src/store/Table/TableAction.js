import * as types from './TableTypes';

export const setCurrentTable = payload  => {
  localStorage.setItem('table', payload);
  return { type: types.SET_TABLE, payload };
}

export const getCurrentTable = () => {
  return { type: types.GET_TABLE };
};