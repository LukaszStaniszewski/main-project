import { Router } from "express";
import { createItemHandler } from "../controllers/item.controller";

const itemRouter = Router()

itemRouter.post("/new", createItemHandler)

export default itemRouter