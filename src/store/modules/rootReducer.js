import { combineReducers } from "redux";

import auth from "./auth/reducer";

// AQUI IREMOS IMPORTAR TODOS OS REDUCER PARA DEPOIS EXPORTAR

export default combineReducers({
  auth,
});
