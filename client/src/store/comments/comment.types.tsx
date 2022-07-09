import { AxiosError } from "axios";
import { Action, ActionWithPayload } from "../../utils/store.utils";
import { IItem } from "../items/item.types";

export enum COMMENTS_ACTION_TYPES {
   CREATE_COMMENT_START = "CREATE_COMMENT_START",
   CREATE_COMMENT_SUCCESS = "CREATE_COMMENT_SUCCESS",
   CREATE_COMMENT_FAILURE = "CREATE_COMMENT_FAILURE",

   GET_COMMENTS_START = "GET_COMMENTS_START",
   GET_COMMENTS_SUCCESS = "GET_COMMENTS_SUCCESS",
   GET_COMMENTS_FAILURE = "GET_COMMENTS_FAILURE",

   DELETE_COMMENT_START = "DELETE_COMMENT_START",
   DELETE_COMMENT_SUCCESS = "DELETE_COMMENT_SUCCESS",
   DELETE_COMMENT_FAILURE = "DELETE_COMMENT_FAILURE",

}
export interface ICreateComment {
   body: string,
   recipient: string,
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
DeleteCommentStart | DeleteCommentSuccess | DeleteCommentFailure

export type CreateCommentStart = ActionWithPayload<COMMENTS_ACTION_TYPES.CREATE_COMMENT_START, ICreateComment>
export type CreateCommentSuccess = ActionWithPayload<COMMENTS_ACTION_TYPES.CREATE_COMMENT_SUCCESS, IComment>
export type CreateCommentFailure = ActionWithPayload<COMMENTS_ACTION_TYPES.CREATE_COMMENT_FAILURE, AxiosError>

export type DeleteCommentStart = ActionWithPayload<COMMENTS_ACTION_TYPES.DELETE_COMMENT_START, IComment["_id"]>
export type DeleteCommentSuccess = Action<COMMENTS_ACTION_TYPES.DELETE_COMMENT_SUCCESS>
export type DeleteCommentFailure = ActionWithPayload<COMMENTS_ACTION_TYPES.DELETE_COMMENT_FAILURE, AxiosError>