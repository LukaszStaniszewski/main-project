import { COMMENTS_ACTION_TYPES, IComment, CommentActions } from "./comment.typeS";
import { IError } from "../user/user.reducer";

export interface ICommentState{
   isCommentFetching: boolean,
   comment: IComment | null,
   error: IError | null;
   
}

const COMMENT_INITIAL_STATE: ICommentState = {
   isCommentFetching: false,
   comment: null,
   error: null
}

const commentReducer = (state = COMMENT_INITIAL_STATE, action = {} as CommentActions) => {
   switch(action.type){
      case COMMENTS_ACTION_TYPES.CREATE_COMMENT_SUCCESS:
         return {
            ...state,
            error: null,
            comment: action.payload
         }
      case COMMENTS_ACTION_TYPES.DELETE_COMMENT_SUCCESS:
         return {
            ...state,
            comment: null,
            error: null
         }
            
      case COMMENTS_ACTION_TYPES.CREATE_COMMENT_FAILURE:
      case COMMENTS_ACTION_TYPES.DELETE_COMMENT_FAILURE:
         return {
            ...state,
            error: action.payload
         }
   }
}

export default commentReducer