import CollectionModel, {ICreateItemCollection, IItemCollectionDocument, IAppendItemsToCollections} from "../models/collection.model"
import {IItemDocument} from "../models/item.model"
import { IUserDocument } from "../models/user.model"
import getErrorMessage from "../utils/getErrorMessage"
import { deleteItemsByCollection } from "./item.service"
import { uploadImage, getFileUrl } from "../utils/imageKit.utils"

export const createCollection = async ({body, image }: {body: ICreateItemCollection, image: Buffer}): Promise<IItemCollectionDocument> => {
   try {
      //@ts-ignore
      const {url, fileId} = uploadImage(image, body.name)
      const collection = await CollectionModel.create({...body, image: {url: url, imageId: fileId}})
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

export const appendItemsToCollections = (collections: IItemCollectionDocument[], items: IItemDocument[]):IAppendItemsToCollections[] => {
   for(let collection = 0; collection < collections.length; collection++) {
      for(let item = 0; item < items.length; item++) {
         if(collections[collection]["_id"].toString() === items[item]["collectionId"].toString()){
            //@ts-ignore
           collections[collection].items = [items[item]]
         } else {
           collections
         }
      }
   }
   return [...collections]
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

