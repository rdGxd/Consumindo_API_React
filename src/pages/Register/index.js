import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { isEmail } from "validator";

// Meus imports
import Loading from "../../components/Loading";
import { Container, Form } from "../../styles/GlobalStyles";
import * as actions from "../../store/modules/auth/actions";

export default function Register() {
  const dispatch = useDispatch();

  // Pegando os dados do usuário
  const id = useSelector((state) => state.auth.user.id);
  const nomeStored = useSelector((state) => state.auth.user.nome);
  const emailStored = useSelector((state) => state.auth.user.email);
  const isLoading = useSelector((state) => state.auth.isLoading);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Setando os valores padrões
  React.useEffect(() => {
    if (!id) return;
    setNome(nomeStored);
    setEmail(emailStored);
  }, [emailStored, id, nomeStored]);

  const handleSubmit = async (e) => {
    // Cancelando o evento padrão
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
    // se não tiver id ele vai uma senha e fazer a verificação
    // se tiver ID ele tiver ID não vai precisar fazer a verificação
    if (!id && (password.length < 6 || password > 50)) {
      formErrors = true;
      return toast.error("A senha precisa ter entre 6 e 50 caracteres");
    }

    if (formErrors) return null; // Se houver erros não deixaremos o usuário continuar

    // Enviando os dados para a Action
    return dispatch(actions.registerRequest({ nome, email, password, id }));
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />

      {/* Trocando o se ele estiver ou não logado */}
      <h1>{id ? "Editar dados" : "Crie sua conta"}</h1>

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

        <button type="submit">{id ? "Salvar" : "Criar minha conta"}</button>
      </Form>
    </Container>
  );
}
