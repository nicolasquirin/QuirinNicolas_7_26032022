import axios from "axios";

// Récupération des posts de la BDD
export const GET_COMMENTS = "GET_COMMENTS";
export const DELETE_POST = "DELETE_COMMENTS";
export const ADD_COMMENT = "ADD_COMMENT";

//
// CRUD COMMENTS
//
export const getComments = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/comm/`)
      .then((res) => {
        console.log(res.data[0].id_post);
        dispatch({ type: GET_COMMENTS, payload: res.data });
        console.log(res);
      })

      .catch((err) => console.log(err));
  };
};

export const addComment = ( id_user, text, id_post) => {


  id_post = JSON.parse(localStorage.getItem("id_post"));
  

  return (dispatch) => {
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/comm/${id_post}`,
      data: { id_user, text, id_post },
    })
      .then((res) => {
        console.log(res);
        dispatch({ type: ADD_COMMENT, payload: { id_post } });
      })
      .catch((err) => console.log(err));
  };
};
