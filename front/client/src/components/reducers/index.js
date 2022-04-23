import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import usersReducer from "./users.reducer";
import postReducer from "./post.reducer";

// Importation des actions de l'utilisateur => user.reducer
export default combineReducers({
  userReducer,
  usersReducer,
  postReducer,
});
