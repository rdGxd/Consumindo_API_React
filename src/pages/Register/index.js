import React, { useState } from "react";
import { toast } from "react-toastify";
import { isEmail } from "validator";
import { get } from "lodash";

// Meus imports
import { Container, Form } from "../../styles/GlobalStyles";
import axios from "../../services/axios";
import history from "../../services/history";
import Loading from "../../components/Loading";

export default function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    // Parando o envio do formulário
    e.preventDefault();
    let formErrors = false;

    // Fazendo a verificação do nome
    if (nome.length < 3 || nome.length > 255) {
      formErrors = true;
      return toast.error("Campo nome deve conter entre 3 a 255 caracteres");
    }

    // Fazendo a verificação do email
    if (!isEmail(email)) {
      formErrors = true;
      return toast.error("Email precisa ser valido");
    }

    // Fazendo a verificação da senha
    if (password.length < 6 || password > 50) {
      formErrors = true;
      return toast.error("A senha precisa ter entre 6 e 50 caracteres");
    }

    if (formErrors) return null; // Se houver erros não deixaremos o usuário continuar

    setIsLoading(true);
    // Tentando cadastrar os usuários
    try {
      await axios.post("/users/", {
        nome,
        password,
        email,
      });
      // Avisando que o cadastro foi feito com sucesso
      toast.success("Você fez seu cadastro");
      setIsLoading(false);
      // Redirecionando o usuário para a página de Login
      history.push("/login");
    } catch (error) {
      const errors = get(error, "response.data.errors", []);

      errors.map((err) => toast.error(err));
      setIsLoading(false);
    }

    return null;
  };

  return (
    <Container>
      <h1>Crie sua conta</h1>

      <Loading isLoading={isLoading} />

      {/* Chamando a função handleSubmit quando o formulário for enviado */}
      <Form onSubmit={handleSubmit}>
        <label htmlFor="nome">
          Nome:
          <input
            type="text"
            // Salvando o valor do input na variável nome
            value={nome}
            // Passando o valor do input para o setNome
            onChange={(e) => setNome(e.target.value)}
            placeholder="Seu Nome"
          />
        </label>

        <label htmlFor="email">
          Email:
          <input
            type="email"
            // Salvando o valor do input na variável email
            value={email}
            // Passando o valor do input para o setSenha
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu Email"
          />
        </label>

        <label htmlFor="password">
          Senha:
          <input
            type="password"
            // Salvando o valor do input na variável password
            value={password}
            // Passando o valor do input para o setSenha
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Sua Senha"
          />
        </label>

        <button type="submit">Criar minha conta</button>
      </Form>
    </Container>
  );
}
