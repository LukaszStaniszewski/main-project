import { Router } from "express";
import { createCommentHandler, deleteCommentHandler, sendCommentsHandler } from "../controllers/comment.controller";

const commentRouter = Router()

commentRouter.post("/new", createCommentHandler)
commentRouter.delete("/delete/:id", deleteCommentHandler)
commentRouter.get("/:id", sendCommentsHandler)

export default commentRouter