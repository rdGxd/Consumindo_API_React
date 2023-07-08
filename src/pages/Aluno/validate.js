import { useState } from "react";
import { useDispatch } from "react-redux";
import { get } from "lodash";
import { toast } from "react-toastify";
import { isEmail, isInt, isFloat } from "validator";

import * as actions from "../../store/modules/auth/actions";

// Pegando o evento do formulário
export default async (e, id, nome, sobrenome, email, idade, peso, altura) => {
  const dispatch = useDispatch();
  const [setIsLoading] = useState(false);

  // Parando o envio do formulário
  e.preventDefault();
  let formErrors = false;

  // Validando nome
  if (nome.length < 3 || nome.length > 255) {
    formErrors = true;
    return toast.error("O nome deve conter entre 3 a 255 caracteres");
  }

  // Validando sobrenome
  if (sobrenome.length < 3 || sobrenome.length > 255) {
    formErrors = true;
    return toast.error("O sobrenome deve conter entre 3 a 255 caracteres");
  }

  // Validando email
  if (!isEmail(email)) {
    formErrors = true;
    return toast.error("E-mail inválido");
  }

  // Validando idade
  if (!isInt(String(idade))) {
    formErrors = true;
    return toast.error("Idade precisa ser um número inteiro");
  }

  // Validando peso
  if (!isFloat(String(peso))) {
    formErrors = true;
    return toast.error("Peso precisa ser um número com ponto flutuante");
  }

  // Validando altura
  if (!isFloat(String(altura))) {
    formErrors = true;
    return toast.error("Altura precisa ser um número com ponto flutuante");
  }

  // Se houver algum erro não será enviado
  if (formErrors) return false;

  try {
    // Exibindo imagem de carregamento
    setIsLoading(true);

    // Removendo imagem de carregamento
    setIsLoading(false);
  } catch (err) {
    // Removendo imagem de carregamento
    setIsLoading(false);

    // Pegando o status do erro
    const status = get(err, "response.status", 0);
    const data = get(err, "response.data", {});

    // Pegando a Mensagem de erro
    const errors = get(data, "errors", []);

    // Retornando a mensagem de erro
    if (errors.length > 0) {
      errors.map((error) => toast.error(error));
    } else {
      toast.error("Erro desconhecido");
    }

    // Se vier algum erro do back-end com status 401 você é desconectado
    if (status === 401) dispatch(actions.loginFailure());
  }

  return true;
};
