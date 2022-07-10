import CommentModel, {ICreateComment} from "../models/comment.model";
import { omit } from "lodash";

import { Values_TO_Omit } from "../config/constants.config";
import getErrorMessage from "../utils/getErrorMessage";
import logger from "../utils/logger";


export const createComment = async (input : ICreateComment) => {
   try {
      const comment = await CommentModel.create(input);
      return omit(comment.toJSON(), Values_TO_Omit.SEND_COMMENT)
   } catch (error) {
      logger.error(getErrorMessage(error))
      throw new Error(getErrorMessage(error))
   }
}

export const deleteComment = async (id: string) => {
   try {
      await CommentModel.findByIdAndDelete(id)
      return true
   } catch (error) {
      logger.error(getErrorMessage(error))
      throw new Error(getErrorMessage(error))
   }
} 

export const findComments = async (itemId: string) => {
   try {
      const comments = await CommentModel.find({itemId: itemId})
      return comments
   } catch (error) {
      logger.error(getErrorMessage(error))
      throw new Error(getErrorMessage(error))
      
   }
}
