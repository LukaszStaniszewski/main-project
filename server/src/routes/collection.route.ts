import { Router } from "express";
import { deleteCollectionsHandler, createCollectionHandler, getCollectionsWithItemsPinnedToUser, getCollectionWithItems, getCollectionsPinnedToUser } from "../controllers/collection.controler";

const collectionRouter = Router()

collectionRouter.post("/new", createCollectionHandler)
collectionRouter.get("/", getCollectionWithItems)
collectionRouter.post("/user", getCollectionsWithItemsPinnedToUser)
// collectionRouter.post("/user", getCollectionsPinnedToUser)
collectionRouter.delete('/user', deleteCollectionsHandler)

export default collectionRouter