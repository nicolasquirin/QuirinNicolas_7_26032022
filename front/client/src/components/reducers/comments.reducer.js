import {
  DELETE_COMMENT,
  GET_COMMENTS,
  UPDATE_COMMENT,
} from "../action/comments.action";
import { ADD_COMMENT } from "../action/comments.action";

const initialState = [];

// Gestion du state des comments
// Get_comments => tableau => payload => SQL
// Add_comments => payload => Commentaire ajouté
// Put
//
export default function commentsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENTS:
      return action.payload;

    //
    case ADD_COMMENT:
      state.push(action.payload);
      return state;

    case UPDATE_COMMENT:
      state.push(action.payload);
      return state;

    case DELETE_COMMENT:
      return state.filter((comment) => comment.comment_id !== action.payload.comment_id
      );

    default:
      return state;
  }
}
