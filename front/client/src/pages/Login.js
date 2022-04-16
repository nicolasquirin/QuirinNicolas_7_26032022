
import React, { useContext } from 'react';
import Log from '../components/Log';
import { UidContext } from "../components/AppContext";
import UpdateProfile from '../components/Profile/UpdateProfile';

const Login = () => {
  const uid = useContext(UidContext);

  return (
    <div className="profil-page">
      {uid ? (
        <UpdateProfile/>
      ) : (
        <div className="log-container">
          <Log signin={false} signup={true} />
          <div className="img-container">
            <img src="./img/login.webp" alt="img-log" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;