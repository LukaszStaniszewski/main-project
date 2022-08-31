import { Router } from "express";
import {
   createCommentHandler,
   deleteCommentHandler,
   sendCommentsHandler,
} from "../controllers/comment.controller";
import requireUser from "../middleware/requireUser";

const commentRouter = Router();

commentRouter.post("/new", requireUser, createCommentHandler);
commentRouter.delete("/delete/:id", requireUser, deleteCommentHandler);
commentRouter.get("/:itemId", sendCommentsHandler);

export default commentRouter;
