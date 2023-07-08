import { toast } from "react-toastify";
import axios from "../../services/axios";
import history from "../../services/history";

export default async (nome, sobrenome, email, idade, peso, altura) => {
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
};
