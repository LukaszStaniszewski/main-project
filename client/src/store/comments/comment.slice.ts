import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IComment } from "./comment.types";

export interface ICommentState{
   isCommentFetching: boolean,
   comments: IComment[] ,
}

const initialState: ICommentState = {
   isCommentFetching: false,
   comments: [],
}

const commentSlice = createSlice({
   name: "comment",
   initialState,
   reducers: {
      startLoading: (state) => {
         state.isCommentFetching = true
      },
      setComments: (state, action: PayloadAction<IComment[]>) => {
         state.comments = action.payload,
         state.isCommentFetching = false
      },
      setComment: (state, action:PayloadAction<IComment>) => {
         state.comments = [state.comments, action.payload].flat()
      }
   }
})

export const {startLoading, setComments, setComment} = commentSlice.actions
export default commentSlice.reducer