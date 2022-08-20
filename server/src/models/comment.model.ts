import { Schema, model } from "mongoose";
import dayjs from "dayjs";
import { IItemDocument } from "./item.model";

export interface ICreateComment {
   body: string;
   postedBy: string;
   itemId: string;
}

export interface ICommentDocument extends Omit<ICreateComment, "itemId"> {
   _id: string;
   itemId: IItemDocument["_id"];
   createdAt: string;
   updatedAt: string;
}

const commentSchema = new Schema<ICommentDocument>({
   body: {
      type: String,
      required: true,
      maxlength: 2000,
   },
   postedBy: {
      type: Schema.Types.String,
      ref: "user",
      required: true,
   },
   itemId: {
      type: Schema.Types.ObjectId,
      ref: "Item",
      required: true,
   },
   createdAt: {
      type: String,
      default: dayjs().format("DD-MM-YYYY HH:mm:ss"),
      immutable: true,
   },
   updatedAt: {
      type: String,
      default: dayjs().format("DD-MM-YYYY HH:mm:ss"),
   },
});

const CommentModel = model<ICommentDocument>("Comment", commentSchema);
export default CommentModel;
