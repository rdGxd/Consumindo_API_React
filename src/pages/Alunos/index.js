import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { get } from "lodash";
import { FaUserCircle, FaEdit, FaWindowClose } from "react-icons/fa";

// Meus imports
import { Container } from "../../styles/GlobalStyles";
import axios from "../../services/axios";
import { AlunoContainer, ProfilePicture } from "./styled";
import Loading from "../../components/Loading";

export default function Alunos() {
  // useState retorna 2 valores -> Primeiro valor que vc coloco e depois Valor para setar o valor
  const [alunos, setAlunos] = useState([]);

  // Controlando o isLoading
  const [isLoading, setIsLoading] = useState(false);

  // Pegando os dados dos alunos e renderizando assim que a página estiver pronta
  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const response = await axios.get("/alunos");
      // Setando o valor de Alunos
      setAlunos(response.data);
      setIsLoading(false);
    }
    getData();
  }, []);

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Alunos</h1>

      <AlunoContainer>
        {/* Retornando os dados dos alunos */}
        {alunos.map((aluno) => (
          <div key={String(aluno.id)}>
            {/* Tentando pegar a foto do aluno */}
            <ProfilePicture>
              {get(aluno, "Fotos[0].url", false) ? (
                <img src={aluno.Fotos[0].url} alt="AlunoFoto" />
              ) : (
                // Exibindo um ícone se ele não tiver foto
                <FaUserCircle size={36} />
              )}
            </ProfilePicture>

            {/* Exibindo o nome e email do aluno */}
            <span>{aluno.nome}</span>
            <span>{aluno.email}</span>

            {/* Criando botão de Edit e enviando o usuário para a página de edição */}
            <Link to={`/aluno/${aluno.id}/edit`}>
              <FaEdit size={16} />
            </Link>

            {/* Criando botão de Delete */}
            <Link to={`/aluno/${aluno.id}/delete`}>
              <FaWindowClose />
            </Link>
          </div>
        ))}
      </AlunoContainer>
    </Container>
  );
}
