import axios from "axios";

// Récupération des posts de la BDD
export const GET_POSTS = "GET_POSTS";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";

export const getPosts = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/post/`)
      .then((res) => {
        dispatch({ type: GET_POSTS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const updatePost = (id_post, message) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/post/${id_post}`,
      data: { message },
    })
      .then((res) => {
        console.log(id_post);
        dispatch({ type: UPDATE_POST, payload: { message, id_post } });
      })
      .catch((err) => console.log(err));
  };
};

export const deletePost = (id_post) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/post/${id_post}`,
    })
      .then((res) => {
        console.log(id_post);
        dispatch({ type: DELETE_POST, payload: { id_post} });
      })
      .catch((err) => console.log(err));
  };
};
