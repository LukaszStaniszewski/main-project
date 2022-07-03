import { Request } from "express";
import multer, { FileFilterCallback} from "multer"

const storage = multer.memoryStorage()

const fileFilter = (req: Request, file: Express.Multer.File , cb: FileFilterCallback) => {
   console.log("hit filter")
   if(file.mimetype === "image/jpeg" || file.mimetype === "imager/png") {
      cb(null, true)
   } else {
      cb(null, false)
   }
}

 const upload = multer({
   storage: storage,
   limits: {
      fileSize: 1024 * 1024 * 5
   },
   fileFilter: fileFilter
 }).single("image")

export default upload