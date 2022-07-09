import CommentModel, {ICreateItem} from "../models/item.model"
import { omit } from "lodash";

import { Values_TO_Omit } from "../config/constants.config";
import getErrorMessage from "../utils/getErrorMessage";


export const createComment = async (input : ICreateItem) => {
   try {
      const comment = await CommentModel.create(input);
      return omit(comment.toJSON(), Values_TO_Omit.SEND_COMMENT)
   } catch (error) {
      throw new Error(getErrorMessage(error))
   }
}

export const deleteComment = async (id: string) => {
   try {
      await CommentModel.findByIdAndDelete(id)
      return true
   } catch (error) {
      throw new Error(getErrorMessage(error))
   }
} 

