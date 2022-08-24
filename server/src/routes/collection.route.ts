import { Router } from "express";

import {
   uploadImageHandler,
   deleteCollectionHandler,
   createCollectionHandler,
   getCollectionsPinnedToUser,
   getLargestCollections,
} from "../controllers/collection.controler";
import {
   createCollectionWithItemsHandler,
   getCollectionWithItemsById,
   autoCompleteHandler,
} from "../controllers/collection&Items.controller";
import upload from "../middleware/uploadImage.middleware";
import requireUser from "../middleware/requireUser";

const collectionRouter = Router();

collectionRouter.post("/new", requireUser, createCollectionHandler);
collectionRouter.post("/image", upload, uploadImageHandler);
collectionRouter.get("/:id", getCollectionWithItemsById);
collectionRouter.get("/user/:name", getCollectionsPinnedToUser);
collectionRouter.delete("/delete/:id", requireUser, deleteCollectionHandler);
collectionRouter.post("/", requireUser, createCollectionWithItemsHandler);
collectionRouter.post("/autocomplete", autoCompleteHandler);
collectionRouter.get("/largest/:number", getLargestCollections);
export default collectionRouter;
