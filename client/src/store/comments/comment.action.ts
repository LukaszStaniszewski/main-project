import { AxiosError } from "axios";
import { COMMENTS_ACTION_TYPES,CreateCommentSuccess, CreateCommentStart, IComment, ICreateComment, CreateCommentFailure, GetCommentStart, GetCommentSuccess, GetCommentFailure } from "./comment.types";


export const createCommentStart = (comment: ICreateComment) : CreateCommentStart => ({
   type: COMMENTS_ACTION_TYPES.CREATE_COMMENT_START,
   payload: comment
})

export const createCommentSuccess = (comment: IComment): CreateCommentSuccess => ({
   type: COMMENTS_ACTION_TYPES.CREATE_COMMENT_SUCCESS,
   payload: comment,
})

export const createCommentFailure = (error: AxiosError) : CreateCommentFailure => ({
   type: COMMENTS_ACTION_TYPES.CREATE_COMMENT_FAILURE,
   payload: error
})

export const getCommentStart = () :GetCommentStart => ({
   type: COMMENTS_ACTION_TYPES.GET_COMMENT_START,
})

export const getCommentSuccess = (comment: IComment): GetCommentSuccess => ({
   type: COMMENTS_ACTION_TYPES.GET_COMMENT_SUCCESS,
   payload: comment
})

export const getCommentFailure = (error: Error): GetCommentFailure => ({
   type: COMMENTS_ACTION_TYPES.GET_COMMENT_FAILURE,
   payload: error
})