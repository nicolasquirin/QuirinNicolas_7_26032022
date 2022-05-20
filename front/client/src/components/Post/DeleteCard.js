import React from "react";
import { useDispatch } from "react-redux";
import { deletePost, getPosts } from "../action/post.actions";

const DeleteCard = (props) => {
  const dispatch = useDispatch();
  const deleteQuote = () => dispatch(deletePost(props.id));

  return (
    <div
      onClick={() => {
        if (
          window.confirm(
            "Etes-vous sûr de vouloir supprimer votre publication ? "
          )
        ) {
          deleteQuote();
          dispatch(getPosts());
        }
      }}
    >
      <img src="./img/icons/trash.svg" alt="Supression" />
    </div>
  );
};

export default DeleteCard;
