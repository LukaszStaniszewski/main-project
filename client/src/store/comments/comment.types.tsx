import { AxiosError } from "axios";
import { Action, ActionWithPayload } from "../../utils/store.utils";
import { IItem } from "../items/item.types";

export enum COMMENTS_ACTION_TYPES {
   CREATE_COMMENT_START = "CREATE_COMMENT_START",
   CREATE_COMMENT_SUCCESS = "CREATE_COMMENT_SUCCESS",
   CREATE_COMMENT_FAILURE = "CREATE_COMMENT_FAILURE",

   GET_COMMENT_START = "GET_COMMENT_START",
   GET_COMMENT_SUCCESS = "GET_COMMENT_SUCCESS",
   GET_COMMENT_FAILURE = "GET_COMMENT_FAILIRE",

   GET_COMMENTS_START = "GET_COMMENTS_START",
   GET_COMMENTS_SUCCESS = "GET_COMMENTS_SUCCESS",
   GET_COMMENTS_FAILURE = "GET_COMMENTS_FAILURE",

   DELETE_COMMENT_START = "DELETE_COMMENT_START",
   DELETE_COMMENT_SUCCESS = "DELETE_COMMENT_SUCCESS",
   DELETE_COMMENT_FAILURE = "DELETE_COMMENT_FAILURE",

   SET_COMMENTS = "SET_COMMENTS",

}

export interface ICreateComment {
   body: string,
   postedBy: string,
   itemId: IItem["_id"]
}

export interface IComment extends ICreateComment{
   _id : string,
   createdAt: string,
   updatedAt: string,
}

export type CommentActions = 
CreateCommentStart | CreateCommentSuccess | CreateCommentFailure |
DeleteCommentStart | DeleteCommentSuccess | DeleteCommentFailure |
GetCommentsStart | GetCommentsSuccess | GetCommentsFailure | 
GetCommentStart | GetCommentSuccess | GetCommentFailure |
SetComments


export type CreateCommentStart = ActionWithPayload<COMMENTS_ACTION_TYPES.CREATE_COMMENT_START, ICreateComment>
export type CreateCommentSuccess = ActionWithPayload<COMMENTS_ACTION_TYPES.CREATE_COMMENT_SUCCESS, IComment>
export type CreateCommentFailure = ActionWithPayload<COMMENTS_ACTION_TYPES.CREATE_COMMENT_FAILURE, Error>

export type DeleteCommentStart = ActionWithPayload<COMMENTS_ACTION_TYPES.DELETE_COMMENT_START, IComment["_id"]>
export type DeleteCommentSuccess = Action<COMMENTS_ACTION_TYPES.DELETE_COMMENT_SUCCESS>
export type DeleteCommentFailure = ActionWithPayload<COMMENTS_ACTION_TYPES.DELETE_COMMENT_FAILURE, AxiosError>

export type GetCommentStart = Action<COMMENTS_ACTION_TYPES.GET_COMMENT_START>
export type GetCommentSuccess = ActionWithPayload<COMMENTS_ACTION_TYPES.GET_COMMENT_SUCCESS, IComment>
export type GetCommentFailure = ActionWithPayload<COMMENTS_ACTION_TYPES.GET_COMMENT_FAILURE, Error>


export type GetCommentsStart = ActionWithPayload<COMMENTS_ACTION_TYPES.GET_COMMENTS_START, IItem["_id"]>
export type GetCommentsSuccess = ActionWithPayload<COMMENTS_ACTION_TYPES.GET_COMMENTS_SUCCESS, IComment[]>
export type GetCommentsFailure = ActionWithPayload<COMMENTS_ACTION_TYPES.GET_COMMENTS_FAILURE, Error>

export type SetComments = ActionWithPayload<COMMENTS_ACTION_TYPES.SET_COMMENTS, IComment[]>

