import { Request, Response } from "express"
import logger from "../utils/logger"

import { createCollectionWithItems, ICollectionWithItems } from "../services/collection&Items.service"
import { IUserDocument } from "../models/user.model"
import { findCollectionsByUser, findAllCollections } from "../services/collection.service"
import { findItems} from "../services/item.service"
import { appendItemsToCollections } from "../services/collection&Items.service"
import getErrorMessage from "../utils/getErrorMessage"
import { ErrorMessage } from "../config/constants.config"

export const createCollectionWithItemsHandler = async (req: Request<{}, {}, ICollectionWithItems>, res: Response) => {
   try {
      console.log("colItems", req.body)
      const uploadedImage= req.file?.buffer
      console.log("createCollectionWithItemsHandler", uploadedImage)
      await createCollectionWithItems(req.body, uploadedImage)
   } catch (error) {
      logger.error(getErrorMessage(error))
      res.status(409).send({error: ErrorMessage.COLLECTION_NOT_CREATED})
   }
}

// this can be get request - get user id from locals - then search for user to ensure that it exist ...
export const getCollectionsWithItemsPinnedToUser = async (req:Request<{}, {}, IUserDocument["_id"]>, res:Response) => {
   try {
      const collections = await findCollectionsByUser(req.body._id)
      const items = await findItems(collections)
      const itemsWithCollections = appendItemsToCollections(collections, items)
      res.json(itemsWithCollections)
   } catch (error) {
      res.sendStatus(404)
   }
}

export const getCollectionWithItems = async (req:Request, res:Response) => {
   try {
      const collections = await findAllCollections()
      const items = await findItems(collections)
      const itemsWithCollections = appendItemsToCollections(collections, items)
      res.json(itemsWithCollections)
   } catch (error) {
      res.sendStatus(404)
   }
}