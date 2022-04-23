import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../Utils";

const CardComments = ({}) => {
  const [text, setText] = useState("");
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const comments = useSelector((state) => state.commentsReducer);
  const dispatch = useDispatch();

  const handleComment = () => {};

  return (
    <div className="comments-container">
      {!isEmpty(comments[0]) &&
        comments
          .map((comment) => {
            console.log(comments);
            if (comment.id_user === userData.id_user) return comment.comment;
            else return null;
          })
          .join("")}
    </div>
  );
};

export default CardComments;
