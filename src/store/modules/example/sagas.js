// AQUI CRIAREMOS TODAS CONFIGURAÇÕES DO SAGA DE TERMINADA FUNÇÃO -> (EXAMPLE)
// SAGA É UM MIDDLEWARE
import { call, put, all, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";

import * as actions from "./actions";
import * as types from "../types";

const requisicao = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 600);
  });

// O Saga utiliza funções geradoras
function* exampleRequest() {
  try {
    // Passando a referencia se tiver parâmetros coloque uma ',' ex: call(requisicao, ParamA, paramB)
    yield call(requisicao); // Basicamente um await
    yield put(actions.clickButtonSuccess()); // Disparando a ação de sucesso
    toast.success("Deu Bom"); // Enviando mensagem de Sucesso
  } catch (error) {
    toast.error("Deu erro"); // Enviando mensagem de erro
    yield put(actions.clickButtonFailure()); // Disparando a ação de erro
  }
}

// O all permite você colocar mais de uma ação para escutar
// O takeLatest você só vai pegar a ultima vez que o usuário clico no botão

// No primeiro parâmetro passamos qual ação ele vai ouvir e no segundo qual função ele vai executar
export default all([takeLatest(types.BOTAO_CLICADO_REQUEST, exampleRequest)]);
