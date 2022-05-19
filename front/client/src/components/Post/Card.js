import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../action/post.actions";
import { dateParser, isEmpty } from "../Utils";
import CardComments from "./CardComments";
import DeleteCard from "./DeleteCard";
import UrgentButton from "./UrgentButton";

//Destructuration de Post

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const [textUpdate, setTextUpdate] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);
  const dispatch = useDispatch();
  const [showComments, setShowComments] = useState(false);
  const _comments = useSelector((state) => state.commentsReducer);
  
  // Filtre du commentaire => posts
  const comments = (_comments || [])
    .filter((comment) => comment.id_post === post.id_post);

  const updateItem = async () => {
    if (textUpdate) {
      dispatch(updatePost(post.id_post, textUpdate));
    }
    setIsUpdated(false);
  };

  useEffect(() => {
    !isEmpty(usersData) && setIsLoading(false);
  }, [usersData]);
  return (
    <li className="card-container" key={post.id_post}>
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          <div className="card-left">
            <img
              src={
                !isEmpty(usersData[0]) &&
                usersData
                  .map((usersData) => {
                    if (usersData.id_user === post.id_user)
                      return usersData.photo;
                    else return null;
                  })
                  .join("")
              }
              alt="profil"
            />
          </div>
          <div className="card-right">
            <div className="card-header">
              <div className="prenom">
                <h3>
                  {!isEmpty(usersData[0]) &&
                    usersData
                      .map((usersData) => {
                        if (usersData.id_user === post.id_user)
                          return usersData.profil_prenom;
                        else return null;
                      })
                      .join("")}
                </h3>
              </div>
              <span>{dateParser(post.timestamp)}</span>
            </div>
            {isUpdated === false && <p>{post.message}</p>}
            {isUpdated && (
              <div className="update-post">
                <textarea
                  defaultValue={post.message}
                  onChange={(e) => setTextUpdate(e.target.value)}
                />
                <div className="button-container">
                  <button className="btn" onClick={updateItem}>
                    valider la modification
                  </button>
                </div>
              </div>
            )}
            {post.picture && (
              <img
                src={post.picture}
                alt="partage de visuel"
                className="card-pic"
              />
            )}

            {userData.isAdmin === 1 && (
              <div className="button-container">
                <div onClick={() => setIsUpdated(!isUpdated)}>
                  <img src="./img/icons/edit.svg" alt="modification" />
                </div>
                <DeleteCard id={post.id_post} />
              </div>
            )}
            {userData.id_user === post.id_user && (
              <div className="button-container">
                <div onClick={() => setIsUpdated(!isUpdated)}>
                  <img src="./img/icons/edit.svg" alt="modification" />
                </div>
                <DeleteCard id={post.id_post} />
              </div>
            )}
            <div className="card-footer">
              <div className="comment-icon">
                <img
                  onClick={() => setShowComments(!showComments)}
                  src="./img/comment.jpg"
                  alt="commentaires"
                />
                <span>
                  {comments.length === 0
                    ? "Pas de commentaire, soyez le premier !"
                    : comments.length}
                </span>
              </div>
              <UrgentButton post={post}/>
            </div>
            <CardComments
              comments={comments}
              show={showComments}
              id_post={post.id_post}
            />
          </div>
        </>
      )}
    </li>
  );
};

export default Card;
