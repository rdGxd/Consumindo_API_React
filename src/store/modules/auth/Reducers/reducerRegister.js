import * as types from "../../types";

// AQUI CRIAREMOS O REDUCER DE TERMINADA FUNÇÃO -> (REGISTER)

const initialState = {
  isLoggedIn: false,
  isLoading: false,
  token: false,
  user: {},
};

// SEMPRE RETORNE UM NOVO ESTADO OU O ESTADO ATUAL

export default (state = initialState, action = {}) => {
  switch (action.type) {
    // REGISTER TYPES
    case types.REGISTER_UPDATED_SUCCESS: {
      // Copiando o estado inicial
      const newState = { ...state };
      // Setando os novos valores do usuário
      newState.user.nome = action.payload.nome;
      newState.user.email = action.payload.email;
      // Setando isLoading
      newState.isLoading = false;
      return newState;
    }

    case types.REGISTER_CREATED_SUCCESS: {
      // Copiando o estado inicial
      const newState = { ...state };
      // Setando isLoading
      newState.isLoading = false;
      return newState;
    }

    case types.REGISTER_FAILURE: {
      // Copiando o estado inicial
      const newState = { ...state };
      // Setando isLoading
      newState.isLoading = false;
      return newState;
    }

    case types.REGISTER_REQUEST: {
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
