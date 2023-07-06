// AQUI CRIAREMOS TODAS CONFIGURAÇÕES DO SAGA DE TERMINADA FUNÇÃO -> (LOGIN)
// SAGA É UM MIDDLEWARE
import { get } from "lodash";
import { toast } from "react-toastify";
import { all, call, put, takeLatest } from "redux-saga/effects";

import axios from "../../../services/axios";
import history from "../../../services/history";

import * as types from "../types";
import * as actions from "./actions";

// O Saga utiliza funções geradoras
function* loginRequest({ payload }) {
  try {
    // Pegando a senha e o login do payload
    const { email, password } = payload;

    // Enviando os dados para o back-end
    const response = yield call(axios.post, "/tokens/", { email, password });

    // Retornando mensagem de sucesso;
    toast.success("Você fez login");

    // Enviado os dados para a action
    yield put(actions.loginSuccess({ ...response.data }));

    // Enviando o authorization no headers
    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;

    // Redirecionando o usuário para página em que eles estava
    history.push(payload.prevPath);
  } catch (error) {
    toast.error("Usuário ou senha inválidos");
    yield put(actions.loginFailure());
  }
}

// Verificando se existe um token para enviar pelo header
function persistRehydrate({ payload }) {
  // Tentando pegar o token se não tiver retorna uma string vazia
  const token = get(payload, "auth.token", "");
  // Verificando se o token foi pego se não for retorna
  if (!token) return;
  // Enviando o token pelo header
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

// Recebendo os dados do register
function* registerRequest({ payload }) {
  // Salvando os dados
  const { id, nome, email, password } = payload;

  try {
    if (id) {
      // Atualizando os dados do usuário
      yield call(axios.put, "/users", {
        email,
        nome,
        password: password || undefined,
      });
      toast.success("Conta alterada com sucesso!");

      // Disparando ação para remover a mensagem de carregando
      yield put(actions.registerUpdatedSuccess({ nome, email, password }));
    } else {
      // Cadastrando o usuário
      yield call(axios.post, "/users", {
        email,
        nome,
        password,
      });
      toast.success("Cadastrado realizado com sucesso!");

      // Disparando ação para remover a mensagem de carregando
      yield put(actions.registerCreatedSuccess({ nome, email, password }));

      // Redirecionando o usuário para a tela de login
      history.push("/login");
    }
  } catch (error) {
    const errors = get(error, "response.data.errors", []); // Pegando os erros
    const status = get(error, "response.status", 0); // Pegando o status do erro

    if (status === 401) {
      toast.info("Você precisa fazer login novamente");
      // Deslogando o usuário
      yield put(actions.loginFailure());
      // Redirecionando o usuário para a tela de login
      return history.push("/login");
    }

    // Verificando se tem algum erro
    if (errors.length > 0) {
      errors.map((err) => toast.error(err));
    } else {
      toast.error("Erro desconhecido");
    }

    // Deslogando o usuário
    yield put(actions.registerFailure());
  }

  return "";
}

// O all permite você colocar mais de uma ação para escutar
// O takeLatest você só vai pegar a ultima vez que o usuário clico no botão

// No primeiro parâmetro passamos qual ação ele vai ouvir e no segundo qual função ele vai executar
export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
  takeLatest(types.REGISTER_REQUEST, registerRequest),
]);
