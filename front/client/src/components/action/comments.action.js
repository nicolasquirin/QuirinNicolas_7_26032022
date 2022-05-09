import axios from "axios";

// Récupération des posts de la BDD
export const GET_COMMENTS = "GET_COMMENTS";
export const DELETE_POST = "DELETE_COMMENTS";
export const ADD_COMMENT = "ADD_COMMENT";
export const UPDATE_COMMENT = "UPDATE_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

//
// CRUD COMMENTS
//
export const getComments = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/comm/`)
      .then((res) => {

        dispatch({ type: GET_COMMENTS, payload: res.data });
        console.log();
      })

      .catch((err) => console.log(err));
  };
};

export const addComment = ( id_post, id_user, text) => {

  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/comm/${id_post}`,{ id_user, text})
      .then((res) => {
    
        dispatch({ type: ADD_COMMENT, payload: res.data });

        return axios;
      })
      .catch((err) => {
        console.log(err);
      });
  };
};


export const updateComment = (comment_id, text) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/comm/${comment_id}`,
      data: { comment_id, text },
    })
      .then((res) => {
        console.log(res);
        dispatch({ type: UPDATE_COMMENT, payload: {comment_id, text } });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteComment = (id_post) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/comm/${id_post}`,
    })
      .then((res) => {
        localStorage.removeItem("id_post");
        dispatch({ type: DELETE_POST, payload: { id_post } });
      })
      .catch((err) => console.log(err));
  };
};
