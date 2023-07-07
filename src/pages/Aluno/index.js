import React, { useState, useEffect } from "react";
import { get } from "lodash";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { isEmail, isInt, isFloat } from "validator";
import { useDispatch } from "react-redux";
import * as actions from "../../store/modules/auth/actions";

// Meus imports
import { Container } from "../../styles/GlobalStyles";
import { Form } from "./styled";
import Loading from "../../components/Loading";
import axios from "../../services/axios";
import history from "../../services/history";

export default function Aluno({ match }) {
  const dispatch = useDispatch();

  // Pegando o ID do aluno
  const id = get(match, "params.id", null);

  // Configurando os estados do formulário
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [idade, setIdade] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Checando se tem um ID
    if (!id) return;

    // Pegando todos os dados do usuário
    const getData = async () => {
      try {
        // Exibindo imagem de carregamento
        setIsLoading(true);

        // Pegando as informações do aluno
        const { data } = await axios.get(`/alunos/${id}`);

        // Pegando a foto do Aluno
        const Foto = get(data, "Fotos[0].url", "");

        // Exibindo as informações do usuário
        setNome(data.nome);
        setSobrenome(data.sobrenome);
        setEmail(data.email);
        setIdade(data.idade);
        setPeso(data.peso);
        setAltura(data.altura);

        // Removendo imagem de carregamento
        setIsLoading(false);
        console.log(Foto);
      } catch (err) {
        // Removendo imagem de carregamento
        setIsLoading(false);
        // Pegando o status do erro
        const status = get(err, "response.status", 0);

        // Pegando a mensagem do erro
        const errors = get(err, "response.data.errors", []);

        // Se a requisição inválida redireciona para a HOME
        if (status === 400) errors.map((error) => toast.error(error));
        history.push("/");
      }
    };

    getData();
  }, [id]);

  // Pegando o evento do formulário
  const handleSubmit = async (e) => {
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

      if (id) {
        // Editando usuário
        await axios.put(`/alunos/${id}`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        toast.success("Aluno(a) alterado(a) com sucesso");
      } else {
        // Criando usuário
        const { data } = await axios.post(`/alunos/`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        toast.success("Aluno(a) criado(a) com sucesso");

        // Redirecionando o usuário para página de edit
        history.push(`/aluno/${data.id}/edit`);
      }

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

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>{id ? "Editar aluno" : "Novo aluno"}</h1>

      <Form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="Nome">
          Nome:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            name="Nome"
            id="Nome"
          />
        </label>

        <label htmlFor="Sobrenome">
          Sobrenome:
          <input
            type="text"
            value={sobrenome}
            onChange={(e) => setSobrenome(e.target.value)}
            name="Sobrenome"
            id="Sobrenome"
          />
        </label>

        <label htmlFor="Email">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="Email"
            id="Email"
          />
        </label>

        <label htmlFor="Idade">
          Idade:
          <input
            type="number"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
            name="Idade"
            id="Idade"
          />
        </label>

        <label htmlFor="Peso">
          Peso:
          <input
            type="number"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            name="Peso"
            id="Peso"
          />
        </label>

        <label htmlFor="Altura">
          Altura:
          <input
            type="number"
            value={altura}
            onChange={(e) => setAltura(e.target.value)}
            name="Altura"
            id="Altura"
          />
        </label>

        <button type="submit">Enviar</button>
      </Form>
    </Container>
  );
}

// Validando o {match}
Aluno.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
