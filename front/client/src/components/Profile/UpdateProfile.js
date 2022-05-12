import React from "react";
import { useSelector } from "react-redux";
import LeftNav from "../LeftNav";
import UploadImg from "./UploadImg";
import DeleteAccount from "../Log/DeleteAccount";

const UpdateProfile = () => {
  const userData = useSelector((state) => state.userReducer);

  return (
    <div className="profil-container">
      <LeftNav />
      <h1> Profil de {userData.profil_prenom + "  " + userData.profil_nom}</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Photo de profil</h3>
          <img src={userData.photo} alt="user-pic" />
          <UploadImg />
        </div>
      </div>
      <DeleteAccount />
    </div>
  );
};

export default UpdateProfile;
