import { Router } from "express";


import {uploadImageHandler, deleteCollectionsHandler, createCollectionHandler, getCollectionsPinnedToUser } from "../controllers/collection.controler";
import { createCollectionWithItemsHandler, getCollectionsWithItemsById, getCollectionWithItems } from "../controllers/collection&Items.controller";
import upload from "../middleware/uploadImage.middleware";


const collectionRouter = Router()

collectionRouter.post("/new",  createCollectionHandler)
collectionRouter.post("/image", upload, uploadImageHandler)
collectionRouter.get("/", getCollectionWithItems)
collectionRouter.get("/:id", getCollectionsWithItemsById)
collectionRouter.get("/user/:name", getCollectionsPinnedToUser)
collectionRouter.delete('/delete', deleteCollectionsHandler)
collectionRouter.post('/', createCollectionWithItemsHandler)

export default collectionRouter