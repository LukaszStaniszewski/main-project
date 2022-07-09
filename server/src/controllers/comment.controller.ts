import { Response, Request } from "express";
import { ICreateItem } from "../models/item.model";
import { createComment, deleteComment } from "../services/comment.service";


export const createCommentHandler = async (req:Request<{}, {}, ICreateItem>, res: Response) => {
   try {
      const comment = await createComment(req.body)
      res.json(comment)
   } catch (error) {
      res.send(405)
   }
}

export const deleteCommentHandler = async (req:Request<{}, {}, string>, res: Response) => {
   try {
      await deleteComment(req.body)
   } catch (error) {
      res.send(405)
   }
}

