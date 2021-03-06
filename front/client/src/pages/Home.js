import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import LeftNav from "../components/LeftNav";
import NewPostForm from "../components/Post/NewPostForm";
import Log from "../components/Log";
import Thread from "../components/Thread";
import { NavLink } from "react-router-dom";

const Home = () => {
  const uid = useContext(UidContext);

  //Ternaire sur <Tread /> afin de voir le fil d'actualité que si la condition signin est true
  return (
    <div className="home">
      <LeftNav />
      <div className="main">
        <div className="home-header">
          {uid ? <NewPostForm /> : <Log signin={true} signup={false} />}
        </div>
        <div className="thread">{uid ? <Thread /> : !uid}</div>
      </div>
      <div className="right-side">
        <div className="icons">
          <div className="icons-bis">
            <NavLink
              to="/login"
              exact="true"
              activeclassname="active-right-nav"
            >
              <img src="./img/icons/user.svg" alt="home" />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
