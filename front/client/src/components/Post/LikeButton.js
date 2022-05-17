import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { likePost, unLikePost } from "../action/post.actions";
import { UidContext } from "../AppContext";

//Recupération props => post
const LikeButton = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const like = () => {
    dispatch(likePost(post.id_post, uid));
    setLiked(true);
  };
  const unLike = () => {
    dispatch(unLikePost(post.id_post, uid));
    setLiked(false);
  };

  useEffect(() => {
    if (post.likers) setLiked(true);
  }, [uid, post.likers, liked]);

  return (
    <div className="like-container">
      {uid && liked === false && (
        <img src="./img/icons/heart.svg" onClick={like} alt="j'aime" />
      )}
      {uid && liked && (
        <img
          src="./img/icons/heart-filled.svg"
          onClick={unLike}
          alt="j'aime plus"
        />
      )}
      <span>{post.likers.length}</span>
    </div>
  );
};

export default LikeButton;
