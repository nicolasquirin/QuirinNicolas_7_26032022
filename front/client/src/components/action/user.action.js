import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";

// Envoie des données de l'utilisateur au reducer grace au dispatch
export const getUser = (uid) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data.results[0] });
      })
      .catch((err) => console.log(err));
  };
};

export const uploadPicture = (data, id) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/user/upload/${id}`, data)
      .then((res) => {
        return axios

          .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
          .then((res) => {
            dispatch({
              type: UPLOAD_PICTURE,
              payload: res.data.results[0].photo,
            });
            window.location.href = "/login";
          });
      })
      .catch((err) => console.log(err));
  };
};
