import { all } from "redux-saga/effects";

// AQUI IREI COLOCAR TODAS AS MINHAS SAGAS
import auth from "./auth/sagas";

export default function* rootSaga() {
  // Aqui você coloca todos os sagas separando por virgulas
  return yield all([auth]);
}
