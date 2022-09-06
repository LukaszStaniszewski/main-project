import { createAction } from "@reduxjs/toolkit";
import { IItem } from "../items/item.types";
import { COMMENTS_ACTION_TYPES, IComment, ICreateComment,} from "./comment.types";

export const createCommentStart = createAction<ICreateComment>(COMMENTS_ACTION_TYPES.CREATE_COMMENT_START)

export const getCommentStart = createAction<string>(COMMENTS_ACTION_TYPES.GET_COMMENT_START)

export const getCommentsStart = createAction<IItem["_id"]>(COMMENTS_ACTION_TYPES.GET_COMMENTS_START)

export const deleteCommentStart = createAction<IComment["_id"]>(COMMENTS_ACTION_TYPES.DELETE_COMMENT_START)

export const setComments = createAction<IComment[]>(COMMENTS_ACTION_TYPES.SET_COMMENTS)
export const setComment = createAction<IComment>(COMMENTS_ACTION_TYPES.SET_COMMENT)