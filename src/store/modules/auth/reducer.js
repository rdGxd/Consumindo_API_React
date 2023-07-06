import * as types from "../types";
import axios from "../../../services/axios";

// AQUI CRIAREMOS O REDUCER DE TERMINADA FUNÇÃO

const initialState = {
  isLoggedIn: false,
  isLoading: false,
  token: false,
  user: {},
};

// SEMPRE RETORNE UM NOVO ESTADO OU O ESTADO ATUAL

export default (state = initialState, action = {}) => {
  switch (action.type) {
    // LOGIN TYPES
    case types.LOGIN_SUCCESS: {
      // Pegando os dados do estado atual
      const newState = { ...state };
      // Manipulando o estado
      newState.isLoggedIn = true; // Exibindo a imagem de Carregamento
      newState.token = action.payload.token; // Recebendo o token pelo payload e setando ele
      newState.user = action.payload.user; // Recebendo o user pelo payload e setando ele
      newState.isLoading = false; // Removendo o Carregamento
      return newState;
    }

    case types.LOGIN_FAILURE: {
      // Apagando o token de autorização ao deslogar
      delete axios.defaults.headers.Authorization;
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
