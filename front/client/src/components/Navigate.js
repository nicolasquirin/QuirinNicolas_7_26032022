import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import { useSelector } from "react-redux";
import Logout from "./Log/Logout";


const Navigate = () => {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);

  //Si Uid true => affichage logout
  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <NavLink exact to="/">
            <div className="logo">
              <img src="./img/icon.png" alt="icon" />
              <h3>Groupomania</h3>
            </div>
          </NavLink>
        </div>
        {uid ? (
          <ul>
            <li></li>
            <li className="welcome">
              <NavLink exact to="/login">
                <h5>Bienvenue {userData.profil_prenom}</h5>
              </NavLink>
            </li>
            <Logout />
          </ul>
        ) : (
          <ul>
            <li></li>
            <li>
              <NavLink exact to="/login">
                <img src="./img/icons/login.svg" alt="login" />
                <h5>Connexion</h5>
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navigate;
