import React from "react";
import LeftNav from "../LeftNav";
import UploadImg from "./UploadImg";

const UpdateProfile = () => {


  return (
    <div className="profil-container">
      <LeftNav />
      <h1> Profil de "userData.pseudo"</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Photo de profil</h3>
          <img src="userData.picture" alt="user-pic" />
          <UploadImg />
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
