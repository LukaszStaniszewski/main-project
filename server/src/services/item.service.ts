import { ObjectId } from "mongoose"
import { IItemCollectionDocument } from "../models/collection.model"
import ItemModel, {ICreateItem, IItemDocument} from "../models/item.model"
import getErrorMessage from "../utils/getErrorMessage"
import { Values_TO_Omit } from "../config/constants.config"

export const createItem = async (input: ICreateItem[], collectionId?: IItemCollectionDocument["_id"]):Promise<IItemDocument[]> => {
   try{
      if(!createItem.length) throw new Error(getErrorMessage("To create item it must an array"))
      const item = await Promise.all(input.map(item => {
         if(collectionId){
            return  ItemModel.create({...item, collectionId: collectionId})
         } else{
            return  ItemModel.create(item)
         }
      }))
      return item
   } catch (error) {
      throw new Error(getErrorMessage(error))
   }
}

export const updateItem = () => {

}

export const deleteItemsByCollection = async (collectionId : IItemCollectionDocument["_id"] | string) => {
   try {
      await ItemModel.deleteMany({collectionId: collectionId})
      return true
   } catch (error) {
      throw new Error(getErrorMessage(error))
   }
}

export const deleteItems = async (itemId : [{_id: string}]) => {
   try {
      Promise.all(itemId.map(id => ItemModel.deleteMany({_id: id._id}))) 
      
      // if(item.deletedCount === 0) throw new Error(getErrorMessage("item wasn't deleted"))
      return true
   } catch (error) {
      throw new Error(getErrorMessage(error))
   }
}


export const findItems = async (collectionPinnedToUser: IItemCollectionDocument | undefined): Promise<IItemDocument[] | undefined> => {
      if(!collectionPinnedToUser) return undefined
   try {
     const items =  await  ItemModel.find({collectionId: collectionPinnedToUser._id}).select(Values_TO_Omit.SEND_ITEMS_REQUEST).lean()
     if(!items) throw new Error("collection and items not found")
     return items
   } catch (error) {
      throw new Error(getErrorMessage(error))
   }
}
