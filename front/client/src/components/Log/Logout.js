import React from "react";
import axios from "axios";

const Logout = () => {
  const logout = async () => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/user/logout`,
      withCredentials: true,
    })
      .then(() => localStorage.clear())
      .catch((err) => console.log(err));

    window.location = "/";
  };

  return (
    <li onClick={logout}>
      <img src="./img/logout3.jpg" alt="logout" />
    </li>
  );
};

export default Logout;
