import CollectionModel, {
   ICreateItemCollection,
   IItemCollectionDocument,
   ILargestCollection,
} from "../models/collection.model";
import { IUserDocument } from "../models/user.model";
import getErrorMessage from "../utils/getErrorMessage";
import { deleteItemsByCollection } from "./item.service";
import { Values_TO_Omit } from "../config/constants.config";
import ItemModel from "../models/item.model";
import logger from "../utils/logger";

export const createCollection = async (
   collectionData: ICreateItemCollection
): Promise<IItemCollectionDocument> => {
   try {
      const collection = await CollectionModel.create(collectionData);
      return collection;
   } catch (error) {
      logger.error(error);
      throw new Error(getErrorMessage(error));
   }
};

export const findCollectionsByUser = async (
   name: IUserDocument["name"]
): Promise<IItemCollectionDocument[]> => {
   try {
      const collections = await CollectionModel.find({ "owner.name": name })
         .select(Values_TO_Omit.SEND_COLLECTION_REQUEST)
         .lean();
      if (!collections.length) throw new Error("Given user has no collections");
      return collections;
   } catch (error) {
      logger.error(error);
      throw new Error(getErrorMessage(error));
   }
};

export const findLargestCollections = async (
   limit: number
): Promise<ILargestCollection[]> => {
   try {
      const items = await ItemModel.aggregate([
         { $sortByCount: "$collectionId" },
         { $limit: limit },
      ]);
      const collections = Promise.all(
         items.map(async (item: { _id: string; count: number }) => {
            const collection: IItemCollectionDocument = await CollectionModel.findById(
               item._id
            )
               .select("-__v")
               .lean();
            return { ...collection, itemCount: item.count };
         })
      );
      return collections;
   } catch (error) {
      logger.error(error);
      throw new Error(getErrorMessage(error));
   }
};

export const findCollection = async (
   collectionId: string
): Promise<IItemCollectionDocument> => {
   try {
      const collection = await CollectionModel.findOne({ _id: collectionId }).select(
         Values_TO_Omit.SEND_COLLECTION_REQUEST
      );
      if (!collection) throw new Error("Collection not found");
      return collection;
   } catch (error) {
      logger.error(error);
      throw new Error(getErrorMessage(error));
   }
};

export const findAllCollections = async (): Promise<IItemCollectionDocument[]> => {
   try {
      const collections = await CollectionModel.find().lean();
      if (!collections) throw new Error("Collections not found");
      return collections;
   } catch (error) {
      logger.error(error);
      throw new Error(getErrorMessage(error));
   }
};

export const deleteCollections = async (name: IUserDocument["name"]) => {
   try {
      const foundCollections = await findCollectionsByUser(name);
      if (!foundCollections)
         throw new Error(getErrorMessage("Couldn't find collection to delete"));
      await Promise.all(
         foundCollections.map((collection) => deleteItemsByCollection(collection._id))
      );
      const collection = await CollectionModel.deleteMany(foundCollections);
      if (collection.deletedCount === 0)
         throw new Error(getErrorMessage("collection wasn't deleted"));
      return true;
   } catch (error) {
      logger.error(error);
      throw new Error(getErrorMessage(error));
   }
};

export const deleteCollection = async (collectionId: string) => {
   try {
      await deleteItemsByCollection(collectionId);
      await CollectionModel.findByIdAndDelete(collectionId);
      return true;
   } catch (error) {
      logger.error(error);
      throw new Error(getErrorMessage(error));
   }
};

export const autoCompleteCollection = async (query: string) => {
   try {
      const result = await CollectionModel.aggregate([
         {
            $search: {
               index: "autoCompleteCollections",
               compound: {
                  should: [
                     {
                        autocomplete: {
                           query: query,
                           path: "name",
                           fuzzy: { maxEdits: 1 },
                        },
                     },
                     {
                        autocomplete: {
                           query: query,
                           path: "topic",
                           fuzzy: { maxEdits: 1 },
                        },
                     },
                  ],
                  minimumShouldMatch: 1,
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
      return result.map((collection) => ({
         ...collection,
         label: collection.label + " - Collection",
      }));
   } catch (error) {
      logger.error(error);
      throw new Error(getErrorMessage(error));
   }
};
