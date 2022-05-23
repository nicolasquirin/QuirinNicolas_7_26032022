import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UidContext } from "../AppContext";
import {
  deleteComment,
  getComments,
  updateComment,
} from "../action/comments.action";

const UpdateDeleteComment = ({ comment }) => {
  const [isAuthor, setIsAuthor] = useState(false);
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("");
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleEdit = (e) => {
    e.preventDefault();

    if (text) {
      dispatch(updateComment(comment.comment_id, text))
        .then(() => dispatch(getComments()))
        .then(() => setEdit(false));
    }
  };

  const handleDelete = () =>
    dispatch(deleteComment(comment.comment_id))
      .then(() => dispatch(getComments()))
      .then(() => setEdit(false));


  useEffect(() => {
    const checkAuthor = () => {
      if (uid == comment.id_user || userData.isAdmin === 1) {
        setIsAuthor(true);
        dispatch(getComments());
      }
    };
    checkAuthor();
  }, [uid, comment.id_user]);

  return (
    <div className="edit-comment">
      {isAuthor && edit === false && (
        <span onClick={() => setEdit(!edit)}>
          <img src="./img/icons/edit.svg" alt="edit-comment" />
        </span>
      )}
      {isAuthor && edit && (
        <form action="" onSubmit={handleEdit} className="edit-comment-form">
          <label htmlFor="text" onClick={() => setEdit(!edit)}>
            Annuler
          </label>
          <br />
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            defaultValue={comment.text}
          />
          <br />
          <div className="btn">
            <span
              onClick={() => {
                handleDelete();
                dispatch(getComments());
              }}
            >
              <img src="./img/icons/trash.svg" alt="delete" />
            </span>
            <input type="submit" value="Valider modification" />
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdateDeleteComment;
