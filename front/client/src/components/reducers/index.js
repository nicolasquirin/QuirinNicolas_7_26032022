import { combineReducers } from "redux";
import userReducer from "./user.reducer";


// Importation des actions de l'utilisateur => user.reducer
export default combineReducers({
    userReducer,
})