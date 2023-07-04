import * as types from "../types";

// AQUI CRIAREMOS O REDUCER DE TERMINADA FUNÇÃO -> (EXAMPLE)

const initialState = {
  botaoClicado: false,
};

// SEMPRE RETORNE UM NOVO ESTADO OU O ESTADO ATUAL

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case types.BOTAO_CLICADO_SUCCESS: {
      const newState = { ...state };
      newState.botaoClicado = !newState.botaoClicado;
      return newState;
    }

    case types.BOTAO_CLICADO_FAILURE: {
      return state;
    }

    case types.BOTAO_CLICADO_REQUEST: {
      return state;
    }

    default: {
      return state;
    }
  }
};
