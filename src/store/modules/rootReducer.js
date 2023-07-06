import { combineReducers } from "redux";

// AQUI IREMOS IMPORTAR TODOS OS REDUCER
import authReducerLogin from "./auth/Reducers/reducerLogin";
import authReducerRegister from "./auth/Reducers/reducerRegister";

// AQUI IREMOS EXPORTAR OS REDUCER
export default combineReducers({
  authReducerLogin,
  authReducerRegister,
});
