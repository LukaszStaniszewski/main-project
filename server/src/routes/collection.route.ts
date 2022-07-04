import { Router } from "express";


import {uploadImageHandler, deleteCollectionsHandler, createCollectionHandler, getCollectionsPinnedToUser } from "../controllers/collection.controler";
import { createCollectionWithItemsHandler, getCollectionsWithItemsPinnedToUser, getCollectionWithItems } from "../controllers/collection&Items.controller";
import upload from "../middleware/uploadImage.middleware";


const collectionRouter = Router()

collectionRouter.post("/new",  createCollectionHandler)
collectionRouter.post("/image", upload, uploadImageHandler)
collectionRouter.get("/", getCollectionWithItems)
collectionRouter.post("/user", getCollectionsWithItemsPinnedToUser)
// collectionRouter.post("/user", getCollectionsPinnedToUser)
collectionRouter.delete('/delete', deleteCollectionsHandler)
collectionRouter.post('/', upload, createCollectionWithItemsHandler)

export default collectionRouter