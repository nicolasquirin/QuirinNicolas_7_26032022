import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../Utils";
import { getPosts } from "../action/post.actions";
import { timestampParser } from "../Utils";


// Stockage des commentaires dans => text 
const CardComments = () => {
  const [text, setText] = useState("");
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.commentsReducer);

  const handleComment = (e) => {
    e.preventDefault();

    if (text) {
      dispatch(
        (comments.id_post,
        userData.id_user,
        userData.profil_prenom)
      )
        .then(() => dispatch(getPosts()))
        .then(() => setText(""));
    }
  };

  return (
    
    <div className="comments-container">
      {comments.map((comment) => {
        console.log(comment.id_post);
        return (
          <div
            className={
              comment.id_user === userData.id_user
                ? "comment-container client"
                : "comment-container"
            }
            key={comment.id_post}
          >
            <div className="left-part">
              <img
                src={
                  !isEmpty(usersData[0]) &&
                  usersData
                    .map((user) => {
                      if (user.id_user === comment.id_user) return user.photo;
                      else return null;
                    })
                    .join("")
                }
                alt="commenter-pic"
              />
            </div>
            <div className="right-part">
              <div className="comment-header">
                <div className="prenom">
                  <h3>{comment.profil_prenom}</h3>
                  {comment.id_user !== userData.id_user}
                </div>
                <span>{timestampParser(comment.comment.timestamp)}</span>
              </div>
              <p>{comment.comment}</p>
            </div>
          </div>
        );
      })}
      {userData.id_user && (
        <form action="" onSubmit={handleComment} className="comment-form">
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder="Un commentaire ?"
          />
          <br />
          <input type="submit" value="Envoyer" />
        </form>
      )}
    </div>
    
  );
};

export default CardComments;
