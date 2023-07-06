import { get } from "lodash";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { isEmail } from "validator";

// Meus imports
import Loading from "../../components/Loading";
import * as actions from "../../store/modules/auth/actions";
import { Container, Form } from "../../styles/GlobalStyles";

export default function Login(props) {
  // Disparador de ações
  const dispath = useDispatch();

  // Pegando a rota anterior usuário
  const prevPath = get(props, "location.state.prevPath", "/");

  // Setando o isLoading
  const isLoading = useSelector((state) => state.auth.isLoading);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    // Parando o envio do formulário
    event.preventDefault();
    let formErrors = false;

    // Fazendo a verificação do email
    if (!isEmail(email)) {
      formErrors = true;
      return toast.error("Email ou senha inválido");
    }

    // Fazendo a verificação da senha
    if (password.length < 6 || password.length > 50) {
      formErrors = true;
      return toast.error("Email ou senha inválido");
    }

    if (formErrors) return null; // Se houver erros não deixaremos o usuário continuar

    // Enviando o login, senha e a rota anterior para o SAGA;
    return dispath(actions.loginRequest({ email, password, prevPath }));
  };

  return (
    <Container>
      <h1>Login</h1>

      <Loading isLoading={isLoading} />

      {/* Chamando a função handleSubmit quando o formulário for enviado */}
      <Form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email:
          <input
            type="text"
            // Salvando o valor do input na variável email
            value={email}
            // Passando o valor do input para o setSenha
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Digite seu Email"
          />
        </label>

        <label htmlFor="password">
          Senha:
          <input
            type="password"
            // Salvando o valor do input na variável password
            value={password}
            // Passando o valor do input para o setSenha
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Digite sua Senha"
          />
        </label>

        <button type="submit">Entrar</button>
      </Form>
    </Container>
  );
}
