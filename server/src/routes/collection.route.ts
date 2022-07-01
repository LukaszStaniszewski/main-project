import { Router } from "express";
import { createCollectionHandler, sendCollectionWithItemsByUser, getCollectionWithItems } from "../controllers/collection.controler";

const collectionRouter = Router()

collectionRouter.post("/new", createCollectionHandler)
collectionRouter.post("/", sendCollectionWithItemsByUser)
collectionRouter.get("/", getCollectionWithItems)

export default collectionRouter