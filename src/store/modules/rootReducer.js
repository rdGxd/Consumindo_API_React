import { combineReducers } from "redux";

import exampleReducer from "./example/reducer";

// AQUI IREMOS IMPORTAR TODOS OS REDUCER PARA DEPOIS REPORTAR

export default combineReducers({
  example: exampleReducer,
});
