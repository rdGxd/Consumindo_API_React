import React from "react";
import { get } from "lodash";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

// Meus imports
import { Container } from "../../styles/GlobalStyles";
import Loading from "../../components/Loading";
import { Title, Form } from "./styled";
import axios from "../../services/axios";
import history from "../../services/history";
import * as actions from "../../store/modules/auth/actions";

export default function Fotos({ match }) {
  const dispatch = useDispatch();

  // Pegando o ID
  const id = get(match, "params.id", null);

  // Setando os estados
  const [isLoading, setIsLoading] = React.useState(false);
  const [foto, setFoto] = React.useState("");

  React.useEffect(() => {
    const getData = async () => {
      try {
        // Adicionando imagem de carregamento
        setIsLoading(true);

        // Pegando os dados
        const { data } = await axios.get(`/alunos/${id}`);

        // Pegando a foto
        setFoto(get(data, "Fotos[0].url", ""));

        // Removendo imagem de carregamento
        setIsLoading(false);
      } catch (err) {
        toast.error("Erro ao obter imagem");

        // Removendo imagem de carregamento
        setIsLoading(false);

        history.push("/");
      }
    };

    getData();
  }, [id]);

  const handleChange = async (e) => {
    // Pegando o arquivo
    const arquivo = e.target.files[0];

    // Criando uma URL
    const fotoURL = URL.createObjectURL(arquivo);

    // Setando a foto
    setFoto(fotoURL);

    // Simulando formulário para depois enviar para o servidor com o axios
    const formData = new FormData();
    formData.append("aluno_id", id);
    formData.append("foto", arquivo);

    try {
      setIsLoading(true);

      // Enviando para o servidor
      await axios.post(`/fotos/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Foto enviada com sucesso");
      setIsLoading(false);
    } catch (err) {
      // Removendo imagem de carregamento
      setIsLoading(false);

      // Pegando erros
      const { status } = get(err, "response.status", "");
      toast.error("Erro ao enviar foto.");

      // Se o for 401 enviar o usuário para a página de Login
      if (status === 401) {
        toast.error("Login expirado");
        dispatch(actions.loginFailure());
        history.push("/login");
      }
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <Title>Fotos</Title>

      <Form>
        <label htmlFor="foto">
          {/* Verificando se o aluno tem foto */}
          {foto ? <img src={foto} alt="Foto" /> : "Selecionar"}
          <input type="file" name="" id="foto" onChange={handleChange} />
        </label>
      </Form>
    </Container>
  );
}

// Validando o {match}
Fotos.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
