import { GET_COMMENTS } from "../action/comments.action";

const initialState = {};

export default function commentsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENTS:
      return action.payload;

    default:
      return state;
  }
}
