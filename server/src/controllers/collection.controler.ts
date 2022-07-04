import{ Request, Response } from "express"

import { ICreateItemCollection } from "../models/collection.model"
import { IUserDocument } from "../models/user.model"
import { findCollectionsByUser,
         findAllCollections,
         createCollection,
         appendItemsToCollections,
         deleteCollections,
       
} from "../services/collection.service"
import { findItems} from "../services/item.service"
import {ErrorMessage, SuccessMessage,collectionTopics} from "../config/constants.config"
import { uploadImage, findFile } from "../utils/imageKit.utils"


export const createCollectionHandler = async (req: Request<{}, {}, ICreateItemCollection>, res:Response) => {
   const uploadedImage= req.file?.buffer

   try {
      let imageUrl;
      if(uploadedImage) {
       
      }
      const isTopicExisting = collectionTopics.find(topic => topic === req.body.topic)
      if(!isTopicExisting) return res.status(401).send({message: ErrorMessage.COLLECTION_TOPIC_ERROR})
   //@ts-ignore
      const colletion = await createCollection({body: req.body, image: uploadedImage})
      res.json({colletion})
   } catch (error) {
      res.sendStatus(400)
   }
}

export const uploadImageHandler = async (req: Request, res:Response) => {
   console.log("hit")
   const uploadedImage = req.file?.buffer
   const collectionId = "cos"
   if(!uploadedImage) return
   try {
      //@ts-ignore
      const image = await uploadImage(uploadedImage, collectionId)
      res.status(200).json({image})
   } catch {
      res.sendStatus(400)
   }
}


export const getCollectionsPinnedToUser = async (req:Request, res: Response) => {
   // const params = req.params._id
   // const user = res.locals.user
   // if(params !== user.userId || user.role !== "admin") return res.status(401).send({message: ErrorMessages.NOT_AUTHORIZED})
   try {
      const collections = await findCollectionsByUser(req.body._id)
      res.json({collections})
   } catch (error) {
      res.sendStatus(402)
   }
}

export const getAllCollections = async (req: Request, res: Response) => {
   try{
      const collections = await findAllCollections();
      res.json({collections})
   } catch(error) {
      res.sendStatus(405)
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

export const deleteCollectionsHandler = async (req:Request, res:Response) => {
   const param = req.params._id
   const user = res.locals.user
   if(param !== user.userId || user.role !== "admin") return res.status(401).send({message: ErrorMessage.NOT_AUTHORIZED})
   try { 
      const collection = deleteCollections(user.Id)
      res.send({message: SuccessMessage.COLLECTION_DELETED})
   } catch (error) {
      res.status(401).send({message: ErrorMessage.NOT_AUTHORIZED})
   }
}