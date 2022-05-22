import React, { useContext } from 'react';
import Log from '../components/Log';
import { UidContext } from "../components/AppContext";
import UpdateProfile from '../components/Profile/UpdateProfile';


const Login = () => {
  const uid = useContext(UidContext);

  //Ternaire < UpdateProfile /> afin de pouvoir editer des messages que si la condition signin est true
  return (
    <div className="profil-page">
      {uid ? (
        <UpdateProfile />
      ) : (
        <div className="log-container">
          <Log signin={false} signup={true} />
          <div className="img-container">
            <img src="./img/login.png" alt="img-log" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;