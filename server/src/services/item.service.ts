import { ObjectId } from "mongoose"
import { IItemCollectionDocument } from "../models/collection.model"
import ItemModel, {ICreateItem, IItemDocument} from "../models/item.model"
import getErrorMessage from "../utils/getErrorMessage"

export const createItem = async (input: ICreateItem[], collectionId: IItemCollectionDocument["_id"]):Promise<IItemDocument[]> => {
   try{
      if(!createItem.length) throw new Error(getErrorMessage("To create item it must an array"))
      const item = await Promise.all(input.map(item => {
        return  ItemModel.create({...item, collectionId: collectionId})
      }))
      console.log("item",item)
      return item
   } catch (error) {
      throw new Error(getErrorMessage(error))
   }
}

export const updateItem = () => {

}

export const deleteItemsByCollection = async (collectionId : IItemCollectionDocument["_id"]) => {
   try {
      const item = await ItemModel.deleteMany({collectionId: collectionId})
      if(item.deletedCount === 0) throw new Error(getErrorMessage("item wasn't deleted"))
      return true
   } catch (error) {
      throw new Error(getErrorMessage(error))
   }
}

export const deleteItems = async (itemId : ObjectId) => {
   try {
      const item = await ItemModel.deleteMany(itemId)
      if(item.deletedCount === 0) throw new Error(getErrorMessage("item wasn't deleted"))
      return true
   } catch (error) {
      throw new Error(getErrorMessage(error))
   }
}


export const findItems = async (collectionsPinnedToUser: IItemCollectionDocument[]): Promise<IItemDocument[]> => {
   try {
     const items =  await  ItemModel.where("collectionId").equals(collectionsPinnedToUser.map(collection => collection._id)).lean()
     if(!items) throw new Error("collection and items not found")
     return items
   } catch (error) {
      throw new Error(getErrorMessage(error))
   }
}