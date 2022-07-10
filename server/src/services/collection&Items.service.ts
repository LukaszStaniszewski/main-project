import { ICreateItemCollection, IItemCollectionDocument,IAppendItemsToCollections} from "../models/collection.model"
import { ICreateItem, IItemDocument} from "../models/item.model"
import getErrorMessage from "../utils/getErrorMessage"
import { createCollection } from "./collection.service"
import { createItem } from "./item.service"
import logger from "../utils/logger"

export interface ICollectionWithItems extends ICreateItemCollection {
   items: ICreateItem[]
}

export const createCollectionWithItems = async (body: ICollectionWithItems, image?: Buffer) => {
   try {
      const {items, ...excludeItems} = body 
      const collection = await createCollection(excludeItems)
      if(!collection) throw new Error(getErrorMessage("collection wasn't created"));
      const item = await createItem(items, collection._id)
      if(!item) throw new Error(getErrorMessage("item wasn't created"));
   } catch (error) {
      logger.info(error)
      throw new Error(getErrorMessage(error))
   }
}

export const appendItemsToCollections = (collections: IItemCollectionDocument[] extends IAppendItemsToCollections[] ? IItemCollectionDocument[] : IAppendItemsToCollections[], items: IItemDocument[]):IAppendItemsToCollections[] => {
   for(let collection = 0; collection < collections.length; collection++) {
      for(let item = 0; item < items.length; item++) {
         if(collections[collection]["_id"].toString() === items[item]["collectionId"].toString()){
           collections[collection].items = [items[item]]
         } else {
           collections
         }
      }
   }
   return [...collections]
}
