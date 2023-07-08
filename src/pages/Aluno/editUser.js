import { toast } from "react-toastify";
import axios from "../../services/axios";

export default async (id, nome, sobrenome, email, idade, peso, altura) => {
  await axios.put(`/alunos/${id}`, {
    nome,
    sobrenome,
    email,
    idade,
    peso,
    altura,
  });
  toast.success("Aluno(a) alterado(a) com sucesso");
};
