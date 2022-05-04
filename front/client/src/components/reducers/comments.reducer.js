import { GET_COMMENTS } from "../action/comments.action";
import { ADD_COMMENT } from "../action/comments.action";

const initialState = {};

export default function commentsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENTS:
      return action.payload;
    case ADD_COMMENT:
      return action.payload;

    default:
      return state;
  }
}
