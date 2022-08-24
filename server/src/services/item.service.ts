import CollectionModel, { IItemCollectionDocument } from "../models/collection.model";
import ItemModel, {
   ICreateItem,
   IItemDocument,
   ILatestItems,
} from "../models/item.model";
import getErrorMessage from "../utils/getErrorMessage";
import logger from "../utils/logger";
import { Values_TO_Omit } from "../config/constants.config";

export const createItem = async (
   input: ICreateItem[],
   collectionId?: IItemCollectionDocument["_id"]
): Promise<IItemDocument[]> => {
   try {
      if (!input.length)
         throw new Error(getErrorMessage("To create item it must an array"));
      const item = await Promise.all(
         input.map((item) => {
            if (collectionId) {
               return ItemModel.create({ ...item, collectionId: collectionId });
            } else {
               return ItemModel.create(item);
            }
         })
      );
      return item;
   } catch (error) {
      logger.info(error);
      throw new Error(getErrorMessage(error));
   }
};

export const deleteItemsByCollection = async (
   collectionId: IItemCollectionDocument["_id"] | string
) => {
   try {
      await ItemModel.deleteMany({ collectionId: collectionId });
      return true;
   } catch (error) {
      logger.error(error);
      throw new Error(getErrorMessage(error));
   }
};

export const deleteItems = async (itemId: { _id: string }[]) => {
   try {
      Promise.all(itemId.map((id) => ItemModel.deleteOne(id)));
      return true;
   } catch (error) {
      logger.error(error);
      throw new Error(getErrorMessage(error));
   }
};

export const findItems = async (
   collectionPinnedToUser: IItemCollectionDocument | undefined
): Promise<IItemDocument[] | undefined> => {
   if (!collectionPinnedToUser) return undefined;
   try {
      const items = await ItemModel.find({ collectionId: collectionPinnedToUser._id })
         .select(Values_TO_Omit.SEND_ITEMS_REQUEST)
         .lean();
      if (!items) throw new Error("collection and items not found");
      return items;
   } catch (error) {
      logger.error(error);
      throw new Error(getErrorMessage(error));
   }
};

export const findItem = async (itemId: string) => {
   try {
      const item = await ItemModel.findById(itemId).lean();
      return item;
   } catch (error) {
      logger.error(error);
      throw new Error(getErrorMessage(error));
   }
};

export const findLatestItems = async (limit: number) => {
   try {
      const items = await ItemModel.aggregate<ILatestItems>([
         {
            $project: {
               _id: 1,
               name: 1,
               topic: 1,
               collectionId: 1,
               createdAt: 1,
            },
         },

         { $sort: { createdAt: -1 } },
         { $limit: limit },
      ]);
      return items;
   } catch (error) {
      logger.error(error);
      throw new Error(getErrorMessage(error));
   }
};

export const assignCollectionNameToItem = async (
   items: ILatestItems[]
): Promise<ILatestItems[]> => {
   const collections = await CollectionModel.aggregate([
      {
         $project: {
            _id: 1,
            name: 1,
            owner: 1,
         },
      },
   ]);
   for (let item = 0; item < items.length; item++) {
      for (let collection = 0; collection < collections.length; collection++) {
         const itemId = collections[collection]._id.toString();
         const collectionId = items[item].collectionId.toString();
         if (collectionId === itemId) {
            items[item]["collection"] = collections[collection].name;
            items[item]["createdBy"] = collections[collection].owner.name;
         }
      }
   }
   return [...items];
};

export const autoCompleteItem = async (query: string) => {
   try {
      const result = await ItemModel.aggregate([
         {
            $search: {
               index: "autocompleteItems",
               autocomplete: {
                  query: query,
                  path: "name",
                  fuzzy: { maxEdits: 1 },
               },
            },
         },
         { $limit: 7 },
         {
            $project: {
               _id: 0,
               value: "$_id",
               label: "$name",
            },
         },
      ]);
      return result.map((item) => ({ ...item, label: item.label + " - Item" }));
   } catch (error) {
      logger.error(error);
      throw new Error(getErrorMessage(error));
   }
};
