import React, { useContext } from 'react';
import Log from '../components/Log';
import { UidContext } from "../components/AppContext";
import UpdateProfile from '../components/Profile/UpdateProfile';
import DeleteAccount from "../components/Log/DeleteAccount";


const Login = () => {
  const uid = useContext(UidContext);

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
      <DeleteAccount />
    </div>
  );
};

export default Login;