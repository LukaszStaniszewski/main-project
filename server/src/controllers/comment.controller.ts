import { Response, Request } from "express";
import { ICreateComment } from "../models/comment.model";
import { createComment, deleteComment, findComments } from "../services/comment.service";
import { ErrorMessage } from "../config/constants.config";


export const createCommentHandler = async (req:Request<{}, {}, ICreateComment>, res: Response) => {
   try {
      const comment = await createComment(req.body)
      if(!comment) res.status(405).send({message: ErrorMessage.COMMENT_NOT_CREATED})
      res.json(comment)
   } catch (error) {
      res.status(405).send({message: ErrorMessage.COMMENT_NOT_CREATED})
   }
}

export const deleteCommentHandler = async (req:Request<{id: string}, {}, {}>, res: Response) => {
   try {
      await deleteComment(req.params.id)
   } catch (error) {
      res.sendStatus(405)
   }
}

export const sendCommentsHandler = async (req:Request<{id: string}, {}, {}>, res: Response) => {
   try {
      const comments = await findComments(req.params.id)
      res.json(comments)
   } catch (error) {
      res.sendStatus(405)
   }
}
