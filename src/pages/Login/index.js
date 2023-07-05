import React, { useState } from "react";
import { toast } from "react-toastify";
import { isEmail } from "validator";
import { useDispatch } from "react-redux";

// Meus imports
import { Container, Form } from "../../styles/GlobalStyles";
import * as actions from "../../store/modules/auth/actions";

export default function Login() {
  // Disparador de ações
  const dispath = useDispatch();

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

    // Enviando o login e a senha;
    return dispath(actions.loginRequest({ email, password }));
  };

  return (
    <Container>
      <h1>Login</h1>

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
