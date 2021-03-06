import { DELETE_POST, GET_POSTS, URGENT_POST, NOTURGENT_POST, UPDATE_POST } from "../action/post.actions";

const initialState = {};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return action.payload;


    case UPDATE_POST:
      return state.map((post) => {
        if (post.id_post === action.payload.id_post) {
          return {
            ...post,
            message: action.payload.message,
          };
        } else return post;
      });

    case DELETE_POST:
      return state.filter((post) => post.id_post !== action.payload.id_post);

    case URGENT_POST:
      return state.map((post) => {
        if (post.id_post === action.payload.id_post) {
          return {
            ...post,
          }
        }
        return post;
    })

    case NOTURGENT_POST:
      return state.map((post) => {
        if (post.id_post === action.payload.id_post) {
          return {
            ...post,
          };
        }
        return post;
      })

    default:
      return state;
  }
}
