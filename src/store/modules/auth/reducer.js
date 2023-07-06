import * as types from "../types";

// AQUI CRIAREMOS O REDUCER DE TERMINADA FUNÇÃO -> (LOGIN)

const initialState = {
  isLoggedIn: false,
  isLoading: false,
  token: false,
  user: {},
};

// SEMPRE RETORNE UM NOVO ESTADO OU O ESTADO ATUAL

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS: {
      // Pegando os dados do estado atual
      const newState = { ...state };
      // Manipulando o estado
      newState.isLoggedIn = true;
      newState.token = action.payload.token; // Recebendo o token pelo payload e setando ele
      newState.user = action.payload.user; // Recebendo o user pelo payload e setando ele
      newState.isLoading = false; // Removendo o Carregamento
      return newState;
    }

    case types.LOGIN_FAILURE: {
      // Copiando o estado inicial
      const newState = { ...initialState };
      // Se der qualquer erro o usuário é desconectado e é retornado o estado inicial
      return newState;
    }

    case types.LOGIN_REQUEST: {
      // Copiando o estado inicial
      const newState = { ...state };
      // Setando isLoading
      newState.isLoading = true;
      return newState;
    }

    default: {
      return state;
    }
  }
};
