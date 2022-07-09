import { createSelector } from "reselect";
import { AppState } from "../root-reducer";
import { ICommentState } from "./comment.reducer";

export const selectCommentReducer = (state: AppState): ICommentState => state.comments

export const selectComment = createSelector(
   selectCommentReducer,
   (state) => state.comment
)
