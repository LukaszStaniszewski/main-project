import { createSelector } from "reselect";
import { AppState } from "../root-reducer";
import { ICommentState } from "./comment.slice";

export const selectCommentReducer = (state: AppState): ICommentState => state.comments

export const selectComments = createSelector(
   selectCommentReducer,
   (state) => state.comments
)

export const isCommentFetching = createSelector(
   selectCommentReducer,
   (state) => state.isCommentFetching
)
