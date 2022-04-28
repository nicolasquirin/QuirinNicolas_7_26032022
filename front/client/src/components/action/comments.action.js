import axios from "axios";

// Récupération des posts de la BDD
export const GET_COMMENTS = "GET_COMMENTS";
export const DELETE_POST = "DELETE_COMMENTS";

export const getComments = (id_post) => {

  
  
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/comm/`)
      .then((res) => {
        console.log(res.data[0].id_post);
        const id_post = res.data[0].id_post
        dispatch({ type: GET_COMMENTS, payload: res.data, id_post });
        console.log(res);
      })

      .catch((err) => console.log(err));
  };
};
