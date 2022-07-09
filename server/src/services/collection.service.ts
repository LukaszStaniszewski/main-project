import mongoose from "mongoose"

import CollectionModel, {ICreateItemCollection, IItemCollectionDocument} from "../models/collection.model"
import { IUserDocument } from "../models/user.model"
import getErrorMessage from "../utils/getErrorMessage"
import { deleteItemsByCollection } from "./item.service"
import { uploadImage} from "../utils/imageKit.utils"
import { Values_TO_Omit } from "../config/constants.config"

export const createCollection = async (collectionData: ICreateItemCollection, image?:Buffer): Promise<IItemCollectionDocument> => {
   try {
      if(image) {
         const {url, fileId} = await uploadImage(image, collectionData.name)
         const collection = await CollectionModel.create({...collectionData, image: {url: url, imageId: fileId}})
         return collection
      }
      const collection = await CollectionModel.create({...collectionData})
      return collection
   } catch (error) {
      throw new Error(getErrorMessage(error))
   }
}

export const findCollectionsByUser = async (name : IUserDocument["name"]): Promise<IItemCollectionDocument[]> => {
   try {
       const collections = await CollectionModel.find({"owner.name": name}).select(Values_TO_Omit.SEND_COLLECTION_REQUEST).lean()
       if(!collections) throw new Error("Collection not found")
       return collections
   } catch (error) {
      throw new Error(getErrorMessage(error))
   }
}
export const findCollection = async (collectionId: string): Promise<IItemCollectionDocument> => {
   try {
       const collection = await CollectionModel.findOne({_id: collectionId}).select(Values_TO_Omit.SEND_COLLECTION_REQUEST)
       console.log(collection)
       if(!collection) throw new Error("Collection not found")
       return collection
   } catch (error) {
      throw new Error(getErrorMessage(error))
   }
}


export const findAllCollections = async (): Promise<IItemCollectionDocument[]> => {
   try {
       const collections = await CollectionModel.find().lean()
       console.log(collections)
       if(!collections) throw new Error("Collections not found")
       return collections
   } catch (error) {
      throw new Error(getErrorMessage(error))
   }
}


export const deleteCollections = async (name : IUserDocument["name"]) => {
   try {
      const foundCollections = await findCollectionsByUser(name)
      if(!foundCollections) throw new Error(getErrorMessage("Couldn't find collection to delete"))
      await Promise.all(foundCollections.map(collection =>  deleteItemsByCollection(collection._id)))
      const collection =  await CollectionModel.deleteMany(foundCollections)
      if(collection.deletedCount === 0) throw new Error(getErrorMessage("collection wasn't deleted"))
      return true
   } catch (error) {
      throw new Error(getErrorMessage(error))
   }
}

export const deleteCollection = async (collectionId: string) => {
      try {
      await deleteItemsByCollection(collectionId)
      await CollectionModel.findByIdAndDelete(collectionId)
      return true
   } catch (error) {
      throw new Error(getErrorMessage(error))
      
   }
}

