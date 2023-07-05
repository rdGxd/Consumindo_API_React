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
    case types.LOGIN_REQUEST: {
      console.log("REDUCER", action.payload);
      return state;
    }

    default: {
      return state;
    }
  }
};
