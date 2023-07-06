import { combineReducers } from "redux";

// AQUI IREMOS IMPORTAR TODOS OS REDUCER
import auth from "./auth/reducer";

// AQUI IREMOS EXPORTAR OS REDUCER
export default combineReducers({
  auth,
});
