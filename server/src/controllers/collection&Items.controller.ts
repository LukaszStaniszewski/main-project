import { Request, Response } from "express"
import logger from "../utils/logger"

import CollectionModel, { IItemCollectionDocument } from "../models/collection.model"
import { Values_TO_Omit } from "../config/constants.config"
import { createCollectionWithItems, ICollectionWithItems } from "../services/collection&Items.service"
import { findItems} from "../services/item.service"
import getErrorMessage from "../utils/getErrorMessage"
import { ErrorMessage } from "../config/constants.config"

export const createCollectionWithItemsHandler = async (req: Request<{}, {}, ICollectionWithItems>, res: Response) => {
   try {
      await createCollectionWithItems(req.body)
      res.send(200)
   } catch (error) {
      logger.error(getErrorMessage(error))
      res.status(409).send({error: ErrorMessage.COLLECTION_NOT_CREATED})
   }
}

export const getCollectionWithItemsById= async (req:Request, res:Response) => {
      const params = req.params.id
   try {
      const collection = await CollectionModel.findOne({_id: params}).select(Values_TO_Omit.SEND_COLLECTION_REQUEST).lean() as IItemCollectionDocument
      const items = await findItems(collection)
      const itemWithCollections = {...collection, items: items}
      if(!itemWithCollections) throw new Error

      res.json(itemWithCollections)
   } catch (error) {
      res.sendStatus(404)
   }
}

