import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { urgentPost, notUrgentPost } from "../action/post.actions";
import { UidContext } from "../AppContext";

//Recupération props => post
const UrgentButton = ({ post }) => {
  const userData = useSelector((state) => state.userReducer);
  const [urgent, setUrgent] = useState(false);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const Urgent = () => {
    if (post.id_user == uid || userData.isAdmin === 1) {
      dispatch(urgentPost(post.id_post, uid));
      setUrgent(true);
    }
  };
  const notUrgent = () => {
    if (post.id_user == uid || userData.isAdmin === 1) {
      dispatch(notUrgentPost(post.id_post, uid));
      setUrgent(false);
    }
  };

  useEffect(() => {
    if (post.urgent === 1) setUrgent(true);
    else setUrgent(false);
  }, [uid, post.urgent]);

  return (
    <div className="urgent-container">
      <h5> Urgent &nbsp; </h5>
      {uid && urgent === false && (
        <img src="./img/whiteButton.jpg" onClick={Urgent} alt="ugrent" />
      )}
      {uid && urgent && (
        <img src="./img/redButton.jpg" onClick={notUrgent} alt="pas urgent" />
      )}
    </div>
  );
};

export default UrgentButton;
