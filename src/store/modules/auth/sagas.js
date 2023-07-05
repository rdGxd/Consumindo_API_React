// AQUI CRIAREMOS TODAS CONFIGURAÇÕES DO SAGA DE TERMINADA FUNÇÃO -> (LOGIN)
// SAGA É UM MIDDLEWARE
import { call, put, all, takeLatest } from "redux-saga/effects";
// import { toast } from "react-toastify";

// import * as actions from "./actions";
import * as types from "../types";

// O Saga utiliza funções geradoras
function* loginRequest({ payload }) {
  yield console.log("saga", payload);
}

// O all permite você colocar mais de uma ação para escutar
// O takeLatest você só vai pegar a ultima vez que o usuário clico no botão

// No primeiro parâmetro passamos qual ação ele vai ouvir e no segundo qual função ele vai executar
export default all([takeLatest(types.LOGIN_REQUEST, loginRequest)]);
