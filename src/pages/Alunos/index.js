import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { get } from "lodash";
import {
  FaUserCircle,
  FaEdit,
  FaWindowClose,
  FaExclamation,
} from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "../../services/axios";

// Meus imports
import { Container } from "../../styles/GlobalStyles";
import { AlunoContainer, ProfilePicture, NovoAluno } from "./styled";
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

  // Função para exibir a opção de delete
  const handleDeleteAsk = (e) => {
    // Cancelando o evento padrão
    e.preventDefault();
    // Acessando o próximo irmão do elemento atual
    const exclamation = e.currentTarget.nextSibling;
    // Exibindo o ícone de delete
    exclamation.setAttribute("display", "block");
    // Removendo o ícone anterior
    e.currentTarget.remove();
  };

  // Função para deletar
  const handleDelete = async (e, id, index) => {
    try {
      // Exibindo a tela de carregamento
      setIsLoading(true);
      // Enviando os dados para delete
      await axios.delete(`/alunos/${id}`);
      // Copiando os alunos atuais
      const novosAlunos = [...alunos];
      // Apagando o aluno selecionado da lista
      novosAlunos.splice(index, 1);
      // Setando novos Alunos e exibindo na lista atualizada
      setAlunos(novosAlunos);
      // Removendo tela de carregamento
      setIsLoading(false);
    } catch (error) {
      const status = get(error, "response.status", []); // Capturando erros

      if (status === 401) {
        // Exibindo erro
        toast.error("Você precisa fazer login");
      } else {
        // Exibindo erro
        toast.error("Ocorreu um erro ao excluir aluno");
      }
      // Removendo tela de carregamento
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>Alunos</h1>

      <NovoAluno to="/aluno">Novo aluno</NovoAluno>

      <AlunoContainer>
        {/* Retornando os dados dos alunos */}
        {alunos.map((aluno, index) => (
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
            <Link onClick={handleDeleteAsk} to={`/aluno/${aluno.id}/delete`}>
              <FaWindowClose />
            </Link>

            <FaExclamation
              size={16}
              display="none"
              cursor="pointer"
              onClick={(e) => handleDelete(e, aluno.id, index)}
            />
          </div>
        ))}
      </AlunoContainer>
    </Container>
  );
}
