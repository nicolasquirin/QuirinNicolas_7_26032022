import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../Utils";
import { timestampParser } from "../Utils";
import { addComment, getComments } from "../action/comments.action";
import UpdateDeleteComment from "./UpdateDeleteComment";

// Stockage des commentaires dans => text
const CardComments = ({ comments, show, id_post }) => {
  const [text, setText] = useState("");
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleComment = async (e) => {
    e.preventDefault();

    if (text) {
      dispatch(
        addComment(id_post, userData.id_user, text, userData.profil_prenom)
      )
        .then(() => dispatch(getComments()))
        .then(() => setText(""));
    }
  };

  return !show ? null : (
    <div className="comments-container">
      {comments.map((comment) => {
        return (
          <div
            className={
              comment.id_user === userData.id_user
                ? "comment-container client"
                : "comment-container"
            }
            //
            key={comment.comment_id}
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
                <span>{timestampParser(comment.timestamp)}</span>
              </div>
              <p>{comment.text}</p>
              <UpdateDeleteComment comment={comment} id_post={id_post} />
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
