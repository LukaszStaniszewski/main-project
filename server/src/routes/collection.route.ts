import { Router } from "express";

import {uploadImageHandler, deleteCollectionHandler, createCollectionHandler, getCollectionsPinnedToUser } from "../controllers/collection.controler";
import { createCollectionWithItemsHandler, getCollectionWithItemsById, } from "../controllers/collection&Items.controller";
import upload from "../middleware/uploadImage.middleware";

const collectionRouter = Router()

collectionRouter.post("/new",  createCollectionHandler)
collectionRouter.post("/image", upload, uploadImageHandler)
collectionRouter.get("/:id", getCollectionWithItemsById)
collectionRouter.get("/user/:name", getCollectionsPinnedToUser)
// collectionRouter.delete('/delete', deleteCollectionsHandler)
collectionRouter.delete('/delete/:id', deleteCollectionHandler)
collectionRouter.post('/', createCollectionWithItemsHandler)

export default collectionRouter