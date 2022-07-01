import { Request, Response } from "express"

import { ICreateItemCollection } from "../models/collection.model"
import { IUserDocument } from "../models/user.model"
import { createCollection } from "../services/collection.service"
import { findCollection, findAllCollections } from "../services/collection.service"
import { findItems, findAllItems } from "../services/item.service"

export const createCollectionHandler = async (req: Request<{}, {}, ICreateItemCollection>, res:Response) => {
   console.log("hit", req.body)
   try {
      const colletion = await createCollection(req.body)
      res.json({colletion})
   } catch (error) {
      res.sendStatus(400)
   }
}
// this can be get request - get user id from locals - then search for user to ensure that it exist ...
export const sendCollectionWithItemsByUser = async (req:Request<{}, {}, IUserDocument["_id"]>, res:Response) => {
   console.log("hit", req.body)
   try {
      const collection = await findCollection(req.body._id)
      const items = await findItems(collection._id)
      res.json({collection, items})
   } catch (error) {
      res.sendStatus(404)
   }
}

export const getCollectionWithItems = async (req:Request, res:Response) => {
   console.log("hit", req.body)
   try {
      const collections = await findAllCollections()
      const items = await findAllItems(collections)
      // res.json({collection, items})
   } catch (error) {
      res.sendStatus(404)
   }
}