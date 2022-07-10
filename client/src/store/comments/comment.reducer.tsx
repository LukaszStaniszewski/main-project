import { COMMENTS_ACTION_TYPES, IComment, CommentActions } from "./comment.types";
import { IError } from "../user/user.reducer";

export interface ICommentState{
   isCommentFetching: boolean,
   comments: IComment[] | null,
   error: IError | null;
   
}

const COMMENT_INITIAL_STATE: ICommentState = {
   isCommentFetching: false,
   comments: null,
   error: null
}

const commentReducer = (state = COMMENT_INITIAL_STATE, action = {} as CommentActions) => {
   switch(action.type){
      case COMMENTS_ACTION_TYPES.CREATE_COMMENT_SUCCESS:
         return {
            ...state,
            error: null,
            comments: [state.comments, action.payload].flat()
         }
      case COMMENTS_ACTION_TYPES.SET_COMMENTS:
      case COMMENTS_ACTION_TYPES.GET_COMMENTS_SUCCESS:
         return {
            ...state,
            comments: action.payload,
            error: null
         }
      case COMMENTS_ACTION_TYPES.CREATE_COMMENT_FAILURE:
      case COMMENTS_ACTION_TYPES.DELETE_COMMENT_FAILURE:
      case COMMENTS_ACTION_TYPES.GET_COMMENTS_FAILURE:
         return {
            ...state,
            error: action.payload
         }
      default:
         return state
   }
}

export default commentReducer