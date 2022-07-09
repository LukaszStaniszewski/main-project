import { Router } from "express";
import { createItemHandler, deleteItemsHandler, sendItemHandler } from "../controllers/item.controller";

const itemRouter = Router()

itemRouter.post("/new", createItemHandler)
itemRouter.post("/delete", deleteItemsHandler)
itemRouter.get("/get/:id", sendItemHandler)

export default itemRouter