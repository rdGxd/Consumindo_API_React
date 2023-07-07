import React, { useState } from "react";
import { get } from "lodash";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { isEmail } from "validator";

// Meus imports
import { Container } from "../../styles/GlobalStyles";
import { Form } from "./styled";

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

  // Pegando o evento do formulário
  const handleSubmit = (e) => {
    // Parando o envio do formulário
    e.preventDefault();
    let formErrors = false;

    // Validando formulário
    if (nome.length < 3 || nome.length > 55) {
      formErrors = true;
      return toast.error("O nome deve conter entre 3 a 55 caracteres");
    }

    if (!isEmail(email)) {
      formErrors = true;
      return toast.error("Email inválido");
    }

    if (idade < 10 || idade > 100) {
      formErrors = true;
      return toast.error("Insira uma idade valida");
    }

    if (!peso) {
      formErrors = true;
      return toast.error("Insira um peso");
    }

    if (!altura) {
      formErrors = true;
      return toast.error("Insira uma altura");
    }

    if (formErrors) return null;

    return true;
  };

  return (
    <Container>
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
            step="0.01"
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
            step="0.01"
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
