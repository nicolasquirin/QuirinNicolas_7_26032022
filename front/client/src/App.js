import React, { useEffect, useState } from "react";
import Routes from "./components/Routes/indexRoute";
import { UidContext } from "./components/AppContext";


const App = () => {
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      
       if (localStorage.id_user === undefined) {
         window.location.href = "/login";
       } else {
         setUid(localStorage.id_user);
       }

    };
    fetchToken();
  }, [uid]);

  return (
    <UidContext.Provider value={uid}>
      <Routes/>
    </UidContext.Provider>
  );
};

export default App;
