import { GET_COMMENTS } from "../action/comments.action";
import { ADD_COMMENT } from "../action/comments.action";

const initialState = [];

// Gestion du state des comments
// Get_comments => tableau => payload => SQL
// ADD_comments => payload => Commentaire ajouté
export default function commentsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENTS:
      return action.payload;

    //
    case ADD_COMMENT:
      state.push(action.payload);
      return state;

    default:
      return state;
  }
}
