import { Router, Request } from "express";
import multer, { FileFilterCallback} from "multer"
import ImageKit from "imagekit"
import { readFile } from "fs/promises";

import getErrorMessage from "../utils/getErrorMessage";
import {uploadImageHandler, deleteCollectionsHandler, createCollectionHandler, getCollectionsWithItemsPinnedToUser, getCollectionWithItems, getCollectionsPinnedToUser } from "../controllers/collection.controler";
import { imageKitPublicKey,imageKitPrivateKey, awsAccessKey, awsSecretAccessKey } from "../config/keyes";

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

export const upload = multer({
   // dest: "uploads",
   storage: storage,
   limits: {
      fileSize: 1024 * 1024 * 5
   },
   fileFilter: fileFilter
 })

 const imageKit = new ImageKit({
   publicKey: imageKitPublicKey,
   privateKey: imageKitPrivateKey,
   urlEndpoint: "https://ik.imagekit.io/9rjpvqxqk/"
})




const collectionRouter = Router()
collectionRouter.post("/upload", upload.single("image"),async  (req,res) => {
   const file =  req.file
   const result =  await readFile(`uploads/${file?.filename}`, 'base64')

   console.log("file", req.file);
   imageKit.upload({
      file: result,
      //@ts-ignore
      fileName: file?.filename
   }, function(error, response) {
      if(error) console.log(error);
      //@ts-ignore
      else console.log(Buffer.from(response, 'base64').toString('ascii'))
   })
}) 
// collectionRouter.post("/new", upload, createCollectionHandler)
// collectionRouter.post("/image", upload, uploadImageHandler)
collectionRouter.get("/", getCollectionWithItems)
collectionRouter.post("/user", getCollectionsWithItemsPinnedToUser)
// collectionRouter.post("/user", getCollectionsPinnedToUser)
collectionRouter.delete('/delete', deleteCollectionsHandler)

export default collectionRouter