import axios from "axios";

// Récupération des posts de la BDD
export const GET_POSTS = "GET_POSTS";
export const ADD_POST = "ADD_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";
export const URGENT_POST = "URGENT_POST";
export const NOTURGENT_POST = "NOTURGENT_POST";

//const insertId = id_post;

export const getPosts = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/post/`)

      .then((res) => {
 
        console.log(res.data);
        dispatch({ type: GET_POSTS, payload: res.data});
        
      })
      .catch((err) => console.log(err));
  };
};

//
//
//


export const AddPost = (data) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/post/`, data)
      .then((res) => {
        console.log(res);
        dispatch({ type: ADD_POST, payload: res});
       
        return axios
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

//
//
//

export const updatePost = (id_post, message) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/post/${id_post}`,
      data: { message },
    })
      .then((res) => {
        console.log(res);
        dispatch({ type: UPDATE_POST, payload: { message, id_post } });
      })
      .catch((err) => console.log(err));
  };
};

//
//
//

export const deletePost = (id_post) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/post/${id_post}`,
    })
      .then((res) => {
        //localStorage.removeItem("id_post")
        dispatch({ type: DELETE_POST, payload: { id_post} });
      })
      .catch((err) => console.log(err));
  };
};


export const urgentPost = (id_post, id_user) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url:
        `${process.env.REACT_APP_API_URL}api/post/urgent-post/${id_post}`,
      data: { id: id_user },
    })
      .then((res) => {
        console.log(res);
        dispatch({ type: URGENT_POST, payload: { id_post, id_user } });
      })
      .catch((err) => console.log(err));
  };
};


export const notUrgentPost = (id_post, id_user) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/post/noturgent-post/` + id_post,
      data: { id: id_user },
    })
      .then((res) => {
        console.log(res);
        dispatch({ type: NOTURGENT_POST, payload: { id_post, id_user } });
      })
      .catch((err) => console.log(err));
  };
};