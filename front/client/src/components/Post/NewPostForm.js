import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { AddPost, getPosts } from "../action/post.actions";
import { timestampParser } from "../Utils";

const NewPostForm = () => {
  const [message, setMessage] = useState("");
  const [postPicture, setPostPicture] = useState(null);
  const [file, setFile] = useState();
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handlePost = async () => {
    if (message || postPicture) {
      const data = new FormData();
      data.append("id_user", userData.id_user);
      data.append("message", message);
      if (file) data.append("file", file);

      await dispatch(AddPost(data));
      dispatch(getPosts());
      cancelPost();
    } else {
      alert("Veuillez entrer un message");
    }
  };

  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const cancelPost = () => {
    setMessage("");
    setPostPicture("");
    setFile("");
  };

  useEffect(() => {}, [userData, message]);

  return (
    <div className="post-container">
      <>
        <NavLink exact="true" to="/login">
          <div className="user-info">
            <img
              src={userData.photo} alt="profil"
            />
          </div>
        </NavLink>
        <div className="post-form">
          <textarea
            name="message"
            id="message"
            placeholder="Exprimez-vous !"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          {message ? (
            <li className="card-container">
              <div className="card-left">
                <img src={userData.photo} alt="user-pic" />
              </div>
              <div className="card-right">
                <div className="card-header">
                  <div className="prenom">
                    <h3>{userData.profil_prenom}</h3>
                  </div>
                  <span>{timestampParser(Date.now())}</span>
                </div>
                <div className="content">
                  <p>{message}</p>
                  <img src={postPicture} alt="" />
                </div>
              </div>
            </li>
          ) : null}
          <div className="footer-form">
            <div className="icon">
              <img src="./img/icons/picture.svg" alt="envoyer" />
              <input
                type="file"
                id="file-upload"
                name="file"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => handlePicture(e)}
              />
            </div>
            <div className="btn-send">
              {message || postPicture > 20 ? (
                <button className="cancel" onClick={cancelPost}>
                  Annuler message
                </button>
              ) : null}
              <button className="send" onClick={handlePost}>
                Envoyer
              </button>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default NewPostForm;
