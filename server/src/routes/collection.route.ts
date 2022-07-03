import { Router, Request } from "express";
import multer, { FileFilterCallback} from "multer"

import getErrorMessage from "../utils/getErrorMessage";
import {uploadImageHandler, deleteCollectionsHandler, createCollectionHandler, getCollectionsWithItemsPinnedToUser, getCollectionWithItems, getCollectionsPinnedToUser } from "../controllers/collection.controler";

const storage = multer.diskStorage({
   destination: function(req, file, cb) {
      cb(null, "uploads")
   },
   filename: function(req, file, cb) {
      cb(null, file.originalname)
   }
});

const fileFilter = (req: Request, file: Express.Multer.File , cb: FileFilterCallback) => {
   if(file.mimetype === "image/jpeg" || file.mimetype === "imager/png") {
      cb(null, true)
   } else {
      cb(null, false)
   }
}

const upload = multer({
   // dest: "uploads",
   storage: storage,
   limits: {
      fileSize: 1024 * 1024 * 5
   },
   fileFilter: fileFilter
 }) 

const collectionRouter = Router()

collectionRouter.post("/new", upload.single('image'), createCollectionHandler)
collectionRouter.post("/image", upload.single('image'), uploadImageHandler)
collectionRouter.get("/", getCollectionWithItems)
collectionRouter.post("/user", getCollectionsWithItemsPinnedToUser)
// collectionRouter.post("/user", getCollectionsPinnedToUser)
collectionRouter.delete('/delete', deleteCollectionsHandler)

export default collectionRouter