import { Response, Request } from "express";
import { ICreateComment } from "../models/comment.model";
import {
   authorize,
   createComment,
   deleteComment,
   findComments,
} from "../services/comment.service";
import { ErrorMessage } from "../config/constants.config";
import getErrorMessage from "../utils/getErrorMessage";

export const createCommentHandler = async (
   req: Request<{}, {}, ICreateComment>,
   res: Response
) => {
   try {
      const comment = await createComment(req.body);
      if (!comment) res.status(409).send({ message: ErrorMessage.COMMENT_NOT_CREATED });
      res.json(comment);
   } catch (error) {
      res.status(409).send({ message: ErrorMessage.COMMENT_NOT_CREATED });
   }
};

export const deleteCommentHandler = async (
   req: Request<{ id: string }>,
   res: Response
) => {
   const user = res.locals.user;
   try {
      await authorize(user, req.params);
      await deleteComment(req.params.id);
      res.sendStatus(200);
   } catch (error) {
      if (getErrorMessage(error) === ErrorMessage.NOT_AUTHORIZED) {
         return res.status(401).send({ message: getErrorMessage(error) });
      }
      res.sendStatus(404);
   }
};

export const sendCommentsHandler = async (
   req: Request<{ id: string }>,
   res: Response
) => {
   try {
      const comments = await findComments(req.params);
      res.json(comments);
   } catch (error) {
      res.sendStatus(404);
   }
};
