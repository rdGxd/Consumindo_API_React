import axios from "axios";

// Configurando a URL BASE -> Você não precisara digitar a URL inteira
export default axios.create({
  baseURL: "http://34.95.191.245:81",
});
