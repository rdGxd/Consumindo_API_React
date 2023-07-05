import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { get } from "lodash";
import { FaUserCircle, FaEdit, FaWindowClose } from "react-icons/fa";

// Meus imports
import { Container } from "../../styles/GlobalStyles";
import axios from "../../services/axios";
import { AlunoContainer, ProfilePicture } from "./styled";

export default function Alunos() {
  // useState retorna 2 valores -> Primeiro valor que vc coloco e depois Valor para setar o valor
  const [alunos, setAlunos] = useState([]);

  // Pegando os dados dos alunos e renderizando assim que a página estiver pronta
  useEffect(() => {
    async function getData() {
      const response = await axios.get("/alunos");
      // Setando o valor de Alunos
      setAlunos(response.data);
    }
    getData();
  }, []);

  return (
    <Container>
      <h1>Alunos</h1>

      <AlunoContainer>
        {/* Retornando os dados dos alunos */}
        {alunos.map((aluno) => (
          <div key={String(aluno.id)}>
            {/* Tentando pegar a foto do aluno se ele não tiver exibir um ícone */}
            <ProfilePicture>
              {get(aluno, "Fotos[0].url", false) ? (
                <img src={aluno.Fotos[0].url} alt="AlunoFoto" />
              ) : (
                <FaUserCircle size={36} />
              )}
            </ProfilePicture>

            <span>{aluno.nome}</span>
            <span>{aluno.email}</span>

            <Link to={`/aluno/${aluno.id}/edit`}>
              <FaEdit size={16} />
            </Link>

            <Link to={`/aluno/${aluno.id}/delete`}>
              <FaWindowClose />
            </Link>
          </div>
        ))}
      </AlunoContainer>
    </Container>
  );
}
