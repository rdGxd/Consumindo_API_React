import * as types from "../types";

// AQUI CRIAREMOS TODAS AS ACTIONS DE TERMINADA FUNÇÃO -> (EXAMPLE)

export function clickButtonRequest() {
  return {
    type: types.BOTAO_CLICADO_REQUEST,
  };
}

export function clickButtonSuccess() {
  return {
    type: types.BOTAO_CLICADO_SUCCESS,
  };
}

export function clickButtonFailure() {
  return {
    type: types.BOTAO_CLICADO_FAILURE,
  };
}
