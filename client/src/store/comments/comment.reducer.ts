import { createReducer, AnyAction } from "@reduxjs/toolkit";
import { IComment, setComment, setComments } from "./index";

export interface ICommentState{
   isCommentFetching: boolean,
   comments: IComment[] ,
}

const initialState: ICommentState = {
   isCommentFetching: false,
   comments: [],
}

const isActionCommentStartType = (action: AnyAction) => {
   const regex = new RegExp(`(comment).*(start?$)`, "i");
   return regex.test(action.type)
};

const commentReducer = createReducer(initialState, (builder) => {
   builder
      .addCase(setComment, (state, action) => {
         state.comments = [state.comments, action.payload].flat()
         state.isCommentFetching = false
      })
      .addCase(setComments, (state, action) => {
         state.comments = action.payload
         state.isCommentFetching = false
      })
      .addMatcher(isActionCommentStartType, (state)=> {
         state.isCommentFetching = true
      })
})

export default commentReducer