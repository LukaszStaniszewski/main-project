import CommentModel, { ICommentDocument, ICreateComment } from "../models/comment.model";
import { omit } from "lodash";

import { ErrorMessage, Values_TO_Omit } from "../config/constants.config";
import getErrorMessage from "../utils/getErrorMessage";
import logger from "../utils/logger";
import { FilterQuery } from "mongoose";
import { IUserDocument } from "../models/user.model";

export const createComment = async (input: ICreateComment) => {
   try {
      const comment = await CommentModel.create(input);
      return omit(comment.toJSON(), Values_TO_Omit.SEND_COMMENT);
   } catch (error) {
      logger.error(getErrorMessage(error));
      throw new Error(getErrorMessage(error));
   }
};

export const deleteComment = async (id: string) => {
   try {
      await CommentModel.findByIdAndDelete(id);
      return true;
   } catch (error) {
      logger.error(getErrorMessage(error));
      throw new Error(getErrorMessage(error));
   }
};

export const findComments = async (itemId: FilterQuery<ICommentDocument>) => {
   try {
      const comments = await CommentModel.find(itemId).lean();
      return comments;
   } catch (error) {
      logger.error(getErrorMessage(error));
      throw new Error(getErrorMessage(error));
   }
};

export const authorizeCommentOwner = async (
   user: IUserDocument,
   params: FilterQuery<ICommentDocument>
) => {
   try {
      const comment = await findComments(params);
      if (comment[0].postedBy !== user.name) {
         throw new Error(ErrorMessage.NOT_AUTHORIZED);
      }
      return true;
   } catch (error) {
      throw new Error(getErrorMessage(error));
   }
};
