import axios from "axios";
import { useSelector } from "react-redux";

const DeleteAccount = () => {
  const userData = useSelector((state) => state.userReducer);

  const deleteAccount = async () => {
    if (
      !window.confirm(
        `Voulez-vous vraiment suprimer votre compte définitivement ?`
      )
    )
      return;

    await axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/user/${userData.id_user}`,
      withCredentials: true,
    })
      .then(() => localStorage.clear())
      .catch((err) => console.log(err));

    window.location = "/";
  };

  return (
    <div className="profil-page">
      <button className="delete_account" onClick={deleteAccount}>
        Suprimer le compte
      </button>
    </div>
  );
};

export default DeleteAccount;
