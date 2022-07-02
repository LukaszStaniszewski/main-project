import { Router } from "express";
import { createItemHandler, deleteItemsHandler } from "../controllers/item.controller";

const itemRouter = Router()

itemRouter.post("/new", createItemHandler)
itemRouter.post("/delete", deleteItemsHandler)

export default itemRouter