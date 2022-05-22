import "./styles/index.scss";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware, createStore } from "redux";
import rootReducer from "./components/reducers";
// outils pour voir l'évolution du store en temps réel
import thunk from "redux-thunk";
//import logger from "redux-logger";
import { getUsers } from "./components/action/users.action";
import { getComments } from "./components/action/comments.action";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

// Importation des actions de l'utilisateur user.Reducer transitant par index.reducer
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);//logger

store.dispatch(getUsers());
store.dispatch(getComments());

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
