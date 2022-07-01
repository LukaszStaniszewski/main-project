import { ObjectId } from "mongoose"
import { IItemCollectionDocument } from "../models/collection.model"
import ItemModel, {ICreateItem, IItemDocument} from "../models/item.model"
import getErrorMessage from "../utils/getErrorMessage"

export const createItem = async (input: ICreateItem):Promise<IItemDocument> => {
   try{
      const item = ItemModel.create(input)
      return item
   } catch (error) {
      throw new Error(getErrorMessage(error))
   }
}

export const updateItem = () => {

}

export const deleteItem = () => {

}

export const findItems = async (itemCollectionId: IItemCollectionDocument["_id"]): Promise<IItemDocument[]> => {
   try {
      return await ItemModel.find({itemCollection: itemCollectionId})
   } catch (error) {
      throw new Error(getErrorMessage(error))
   }
}
      //@ts-ignore
export const findAllItems = async (collections : IItemCollectionDocument[]): Promise<IItemDocument[]> => {
   try {
      // return await ItemModel.find({itemCollection: itemCollectionId})
      const items =  await Promise.all(collections.map(collection => {
        const item = ItemModel.findOne({itemCollection: collection._id})
        return item
      }))
      if(!items) throw new Error("collection and items not found")
      //@ts-ignore
      console.log("allItems", items)
      // return items
   } catch (error) {
      throw new Error(getErrorMessage(error))
   }
}