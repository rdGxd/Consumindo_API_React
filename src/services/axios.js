import axios from "axios";

// Configurando a URL BASE -> Você não precisara digitar a URL inteira
export default axios.create({
  baseURL: "COLOQUE_SUA_URL_AQUI",
});
