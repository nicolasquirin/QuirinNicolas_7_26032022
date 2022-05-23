import React, { useEffect, useState } from "react";
import Routes from "./components/Routes/indexRoute";
import { UidContext } from "./components/AppContext";
import { useDispatch } from "react-redux";
import { getUser } from "./components/action/user.action";

const App = () => {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  //Si Id utilisateur reconnu dans le localStorage affiché ses infos avec reducer => Uid Sinon utilisateur Inconnu
  useEffect(() => {
    const fetchToken = async () => {
      if (localStorage.id_user === undefined) {
        console.log("Utilisateur Inconnu");
      } else {
        setUid(localStorage.id_user);
      }
    };
    fetchToken();

    if (uid) dispatch(getUser(uid));
  }, [uid, dispatch]);

  return (
    <UidContext.Provider value={uid}>
      <React.StrictMode>
        <Routes />
      </React.StrictMode>
    </UidContext.Provider>
  );
};

export default App;
