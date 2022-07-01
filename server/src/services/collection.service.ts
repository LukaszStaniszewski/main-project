import CollectionModel, {ICreateItemCollection, IItemCollectionDocument} from "../models/collection.model"
import { IUserDocument } from "../models/user.model"
import getErrorMessage from "../utils/getErrorMessage"

export const createCollection = async (input : ICreateItemCollection): Promise<IItemCollectionDocument> => {
   try {
      const collection = await CollectionModel.create(input)
      return collection
   } catch (error) {
      throw new Error(getErrorMessage(error))
   }
}

export const deleteCollection = () => {

}

export const findCollection = async (userId : IUserDocument["_id"]): Promise<IItemCollectionDocument> => {
   try {
      console.log("userId", userId)
       const collection = await CollectionModel.findOne({"owner._id": userId})
       console.log(collection)
       if(!collection) throw new Error("Collection not found")
       return collection
   } catch (error) {
      throw new Error(getErrorMessage(error))
   }
}

export const findAllCollections = async (): Promise<IItemCollectionDocument[]> => {
   try {
       const collections = await CollectionModel.find()
       console.log(collections)
       if(!collections) throw new Error("Collections not found")
       return collections
   } catch (error) {
      throw new Error(getErrorMessage(error))
   }
}
