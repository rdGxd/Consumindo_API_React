import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

// CONFIGURANDO PARA SALVANDO NO LOCAL STORAGE COM REDUX PERSIST

export default (reducers) => {
  const persistedReducer = persistReducer(
    {
      key: "CONSUMO-API", // Nome da Aplicação
      storage,
      whitelist: ["auth"], // Falando qual modulo a gente quer salvar
    },
    reducers
  );

  return persistedReducer;
};
