import { ICommentDocument, ICreateComment } from "../../models/comment.model";
import { Types } from "mongoose";

export const commentResponse = {
   _id: "6300a38b03f2df3786c6ee40",
   body: "Great stuff!!",
   postedBy: "Frank_100",
   itemId: "62cd6c2dda4f9f38f6c6c61d",
   createdAt: "20-08-2022 09:02:55",
   updatedAt: "20-08-2022 09:02:55",
};

export const commentPayload: ICommentDocument = {
   _id: "6300a38b03f2df3786c6ee40",
   body: "Great stuff!!",
   postedBy: "Frank_100",
   itemId: new Types.ObjectId("62cd6c2dda4f9f38f6c6c61d"),
   createdAt: "20-08-2022 09:02:55",
   updatedAt: "20-08-2022 09:02:55",
};

export const commentInput: ICreateComment = {
   body: "Great stuff!!",
   postedBy: "Frank_100",
   itemId: "62cd6c2dda4f9f38f6c6c61d",
};

export const getCommentsByItemIdInput = "62cd6c2dda4f9f38f6c6c61d";
