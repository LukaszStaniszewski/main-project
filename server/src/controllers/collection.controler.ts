import{ Request, Response } from "express"

import { ICreateItemCollection } from "../models/collection.model"
import { findCollectionsByUser,
         findAllCollections,
         createCollection,
         deleteCollections,
} from "../services/collection.service"
import {ErrorMessage, SuccessMessage,collectionTopics} from "../config/constants.config"
import { uploadImage, } from "../utils/imageKit.utils"


export const createCollectionHandler = async (req: Request<{}, {}, ICreateItemCollection>, res:Response) => {

   const uploadedImage= req.file?.buffer
   try {
      const isTopicExisting = collectionTopics.find(topic => topic === req.body.topic)
      if(!isTopicExisting) return res.status(401).send({message: ErrorMessage.COLLECTION_TOPIC_ERROR})

      const colletion = await createCollection(req.body, uploadedImage)
      return res.json({colletion})
   } catch (error) {
      res.sendStatus(400)
   }
}

export const uploadImageHandler = async (req: Request, res:Response) => {
   const uploadedImage = req.file?.buffer
   const collectionId = "cos"
   if(!uploadedImage) return
   try {
      //@ts-ignore
      const image = await uploadImage(uploadedImage, collectionId)
      console.log("image", image)
      res.status(200).json({image})
   } catch {
      res.sendStatus(400)
   }
}

export const getCollectionsPinnedToUser = async (req:Request, res: Response) => {
   const params = req.params.name
   // const user = res.locals.user
   // if(params !== user.name || user.role !== "admin") return res.status(401).send({message: ErrorMessage.NOT_AUTHORIZED})
   try {
      const collections = await findCollectionsByUser(params)
      if(!collections.length) res.status(406).send({message: "Haven't found collections owned by this user"})
      res.json(collections)
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

export const deleteCollectionsHandler = async (req:Request, res:Response) => {
   const param = req.params._id
   const user = res.locals.user
   if(param !== user.userId || user.role !== "admin") return res.status(401).send({message: ErrorMessage.NOT_AUTHORIZED})
   try { 
      const collection = deleteCollections(user.name)
      res.send({message: SuccessMessage.COLLECTION_DELETED})
   } catch (error) {
      res.status(401).send({message: ErrorMessage.NOT_AUTHORIZED})
   }
}