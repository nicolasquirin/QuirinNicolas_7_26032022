import React from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../action/post.actions";

const DeleteCard = (props) => {
  const dispatch = useDispatch();
  const deleteQuote = () => dispatch(deletePost(props.id));

  return (
    <div
      onClick={() => {
        if (
          window.confirm("Etes-vous sûr de vouloir supprimer votre text ? ")
        ) {
          deleteQuote();
        }
      }}
    >
      <img src="./img/icons/trash.svg" alt="Supression" />
    </div>
  );
};

export default DeleteCard;
