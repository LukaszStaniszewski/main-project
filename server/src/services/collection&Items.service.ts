import { ICreateItemCollection } from "../models/collection.model";
import { ICreateItem } from "../models/item.model";
import getErrorMessage from "../utils/getErrorMessage";
import { createCollection } from "./collection.service";
import { createItem } from "./item.service";
import logger from "../utils/logger";
import { ErrorMessage } from "../config/constants.config";

export interface ICollectionWithItems extends ICreateItemCollection {
   items: ICreateItem[];
}

export const createCollectionWithItems = async (body: ICollectionWithItems) => {
   try {
      const { items, ...excludeItems } = body;
      const collection = await createCollection(excludeItems);
      if (!collection)
         throw new Error(getErrorMessage(ErrorMessage.COLLECTION_NOT_CREATED));
      const item = await createItem(items, collection._id);
      if (!item) throw new Error(getErrorMessage(ErrorMessage.ITEM_NOT_CREATED));
      return collection._id;
   } catch (error) {
      logger.info(error);
      throw new Error(getErrorMessage(error));
   }
};
