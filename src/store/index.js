import { persistStore } from "redux-persist";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./modules/rootReducer";
import rootSaga from "./modules/rootSaga";
import persistedReducer from "./modules/reduxPersist";

// Configurando o MIDDLEWARE
const sagaMiddleware = createSagaMiddleware();

// Reduce é quem vai escutar as ações que estão sendo disparadas.
// Dependendo da ação que for disparada ele executa determinada ação

const store = createStore(
  // Salvando no LocalStore
  persistedReducer(rootReducer),
  // Aplicando middleware
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

// Salvando no LocalStore
export const persistor = persistStore(store);

export default store;
