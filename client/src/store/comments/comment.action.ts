import { AxiosError } from "axios";
import { IItem } from "../items/item.types";
import { COMMENTS_ACTION_TYPES,CreateCommentSuccess, CreateCommentStart, IComment, ICreateComment, CreateCommentFailure, GetCommentStart, GetCommentsSuccess, GetCommentsFailure, DeleteCommentStart, DeleteCommentSuccess, DeleteCommentFailure, GetCommentsStart, SetComments, GetCommentSuccess, GetCommentFailure } from "./comment.types";


export const createCommentStart = (comment: ICreateComment) : CreateCommentStart => ({
   type: COMMENTS_ACTION_TYPES.CREATE_COMMENT_START,
   payload: comment
})

export const createCommentSuccess = (comment: IComment): CreateCommentSuccess => ({
   type: COMMENTS_ACTION_TYPES.CREATE_COMMENT_SUCCESS,
   payload: comment,
})

export const createCommentFailure = (error: Error) : CreateCommentFailure => ({
   type: COMMENTS_ACTION_TYPES.CREATE_COMMENT_FAILURE,
   payload: error
})

export const getCommentStart = (id: IItem["_id"]) :GetCommentStart => ({
   type: COMMENTS_ACTION_TYPES.GET_COMMENT_START,
   payload: id, 
})

export const getCommentSuccess = (comment: IComment): GetCommentSuccess => ({
   type: COMMENTS_ACTION_TYPES.GET_COMMENT_SUCCESS,
   payload: comment
})

export const getCommentFailure = (error: Error): GetCommentFailure => ({
   type: COMMENTS_ACTION_TYPES.GET_COMMENT_FAILURE,
   payload: error
})

export const getCommentsStart = (id: IItem["_id"]): GetCommentsStart => ({
   type: COMMENTS_ACTION_TYPES.GET_COMMENTS_START,
   payload: id
})

export const getCommentsSuccess = (comment: IComment[]): GetCommentsSuccess => ({
   type: COMMENTS_ACTION_TYPES.GET_COMMENTS_SUCCESS,
   payload: comment
})

export const getCommentsFailure = (error: AxiosError): GetCommentsFailure => ({
   type: COMMENTS_ACTION_TYPES.GET_COMMENTS_FAILURE,
   payload: error
})

export const deleteCommentStart = (id: IComment["_id"]):DeleteCommentStart => ({
   type: COMMENTS_ACTION_TYPES.DELETE_COMMENT_START,
   payload: id,
})

export const deleteCommentSuccess = ( ): DeleteCommentSuccess => ({
   type: COMMENTS_ACTION_TYPES.DELETE_COMMENT_SUCCESS,
})

export const deleteCommentFailure = (error : AxiosError):DeleteCommentFailure => ({
   type: COMMENTS_ACTION_TYPES.DELETE_COMMENT_FAILURE,
   payload: error,
})

export const setComments = (comments : IComment[]): SetComments => ({
   type: COMMENTS_ACTION_TYPES.SET_COMMENTS,
   payload: comments
})