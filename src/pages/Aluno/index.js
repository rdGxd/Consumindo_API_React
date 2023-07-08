import React, { useState, useEffect } from "react";
import { get } from "lodash";
import PropTypes from "prop-types";
import { FaEdit, FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

// Meus imports
import { Container } from "../../styles/GlobalStyles";
import { Form, ProfilePicture, Title } from "./styled";
import Loading from "../../components/Loading";
import axios from "../../services/axios";
import history from "../../services/history";
import validate from "./validate";
import editUser from "./editUser";
import createUser from "./createUser";

export default function Aluno({ match }) {
  // Pegando o ID do aluno
  const id = get(match, "params.id", null);

  // Configurando os estados do formulário
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [idade, setIdade] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [foto, setFoto] = useState("");
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
        setFoto(Foto);

        // Removendo imagem de carregamento
        setIsLoading(false);
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

      // Checando se o usuário existe
      if (id) {
        // Se tiver ID ira editar usuário
        editUser(id, nome, sobrenome, email, idade, peso, altura);
      } else {
        // Se não tiver ID ira criar um usuário
        createUser(nome, sobrenome, email, idade, peso, altura);
      }
    };

    getData();
  }, [id, nome, sobrenome, email, idade, peso, altura]);

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <Title>{id ? "Editar aluno" : "Novo aluno"}</Title>

      {id && (
        <ProfilePicture>
          {foto ? <img src={foto} alt={nome} /> : <FaUserCircle size={180} />}
          <Link to={`/fotos/${id}`}>
            <FaEdit size={24} />
          </Link>
        </ProfilePicture>
      )}

      <Form
        onSubmit={(e) =>
          validate(e, id, nome, sobrenome, email, idade, peso, altura)
        }
      >
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          name="Nome"
          id="Nome"
        />

        <input
          type="text"
          value={sobrenome}
          onChange={(e) => setSobrenome(e.target.value)}
          name="Sobrenome"
          id="Sobrenome"
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="Email"
          id="Email"
        />

        <input
          type="number"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          name="Idade"
          id="Idade"
        />

        <input
          type="number"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          name="Peso"
          id="Peso"
        />

        <input
          type="number"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
          name="Altura"
          id="Altura"
        />

        <button type="submit">Enviar</button>
      </Form>
    </Container>
  );
}

// Validando o {match}
Aluno.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
