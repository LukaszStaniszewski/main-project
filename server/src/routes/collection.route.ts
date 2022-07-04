import { Router } from "express";


import {uploadImageHandler, deleteCollectionsHandler, createCollectionHandler, getCollectionsWithItemsPinnedToUser, getCollectionWithItems, getCollectionsPinnedToUser } from "../controllers/collection.controler";
import upload from "../middleware/uploadImage.middleware";


const collectionRouter = Router()

collectionRouter.post("/new",  createCollectionHandler)
collectionRouter.post("/image", upload, uploadImageHandler)
collectionRouter.get("/", getCollectionWithItems)
collectionRouter.post("/user", getCollectionsWithItemsPinnedToUser)
// collectionRouter.post("/user", getCollectionsPinnedToUser)
collectionRouter.delete('/delete', deleteCollectionsHandler)

export default collectionRouter