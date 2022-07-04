import CollectionModel, {ICreateItemCollection, IItemCollectionDocument} from "../models/collection.model"

import { IUserDocument } from "../models/user.model"
import getErrorMessage from "../utils/getErrorMessage"
import { deleteItemsByCollection } from "./item.service"
import { uploadImage} from "../utils/imageKit.utils"

export const createCollection = async (collectionData: ICreateItemCollection, image?:Buffer): Promise<IItemCollectionDocument> => {
   try {
      console.log("image", image)
      console.log("collectionData", collectionData)
      if(image) {
         console.log("hit image")
      //@ts-ignore
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

export const findCollectionsByUser = async (userId : IUserDocument["_id"]): Promise<IItemCollectionDocument[]> => {
   try {

       const collections = await CollectionModel.find({"owner._id": userId}).lean()
       if(!collections) throw new Error("Collection not found")
       return collections
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


export const deleteCollections = async (userId : IUserDocument["_id"]) => {
   try {
      const foundCollections = await findCollectionsByUser(userId)
      if(!foundCollections) throw new Error(getErrorMessage("Couldn't find collection to delete"))
      await Promise.all(foundCollections.map(collection =>  deleteItemsByCollection(collection._id)))
      const collection =  await CollectionModel.deleteMany(foundCollections)
      if(collection.deletedCount === 0) throw new Error(getErrorMessage("collection wasn't deleted"))
      return true
   } catch (error) {
      throw new Error(getErrorMessage(error))
   }
}

