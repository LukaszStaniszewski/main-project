import { Router } from "express";
import { createCommentHandler, deleteCommentHandler } from "../controllers/comment.controller";

const commentRouter = Router()

commentRouter.post("/new", createCommentHandler)
commentRouter.delete("/delte", deleteCommentHandler)

export default commentRouter