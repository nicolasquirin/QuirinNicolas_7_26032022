import axios from "axios";
import jwtDecode from "jwt-decode";
import { getItem, addItem, removeItem } from "../../services/LocalStorage";


export function fetchToken() {
    const token = getItem('myToken');
    const tokenIsValid = token ? tokenIsValid(token) : false;


    if(false === tokenIsValid) {
        removeItem('myToken')
    }
    return tokenIsValid;
}

export function logout() {
    removeItem('myToken');
}

function tokenIsValid(token) {
    const { exp } = jwtDecode(token);
    if (exp * 1000 > new Date().getTime()) {
        return true;
    }
    return false;
}