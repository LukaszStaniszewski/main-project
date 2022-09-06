import {  ActionWithPayload } from "../../utils/store.utils";
import { IItem } from "../items/item.types";

export enum COMMENTS_ACTION_TYPES {
   CREATE_COMMENT_START = "CREATE_COMMENT_START",
   GET_COMMENT_START = "GET_COMMENT_START",
   GET_COMMENTS_START = "GET_COMMENTS_START",
   DELETE_COMMENT_START = "DELETE_COMMENT_START",
   SET_COMMENTS = "SET_COMMENTS",
   SET_COMMENT = "SET_COMMENT"
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

export type CreateCommentStart = ActionWithPayload<COMMENTS_ACTION_TYPES.CREATE_COMMENT_START, ICreateComment>
export type DeleteCommentStart = ActionWithPayload<COMMENTS_ACTION_TYPES.DELETE_COMMENT_START, IComment["_id"]>
export type GetCommentStart = ActionWithPayload<COMMENTS_ACTION_TYPES.GET_COMMENT_START, IItem["_id"]>
export type GetCommentsStart = ActionWithPayload<COMMENTS_ACTION_TYPES.GET_COMMENTS_START, IItem["_id"]>

