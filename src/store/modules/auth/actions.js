import * as types from "../types";

// AQUI CRIAREMOS TODAS AS ACTIONS DE TERMINADA FUNÇÃO -> (LOGIN)

// payload são os dados em sí

export function loginRequest(payload) {
  return {
    type: types.LOGIN_REQUEST,
    payload,
  };
}

export function loginSuccess(payload) {
  return {
    type: types.LOGIN_SUCCESS,
    payload,
  };
}

export function loginFailure(payload) {
  return {
    type: types.LOGIN_FAILURE,
    payload,
  };
}
