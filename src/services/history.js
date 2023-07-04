import { createBrowserHistory } from "history";

// Usado dentro de uma página para levar o usuário para outra rota do site
// permite usar o histórico para navega
// o createBrowserHistory nos possibilita guardar as rotas para que seja possível usar os botões do browser para voltar para a página anterior. A “history” será passada por props para o Componente Routes.
const history = createBrowserHistory();

// o history é utilizado junto com o Router
export default history;
