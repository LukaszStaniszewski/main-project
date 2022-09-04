import { ActionWithPayload } from "../../utils/store.utils";
import { ICollectionFields } from "../../pages/create-collection/create-collection";
import { IItem } from "../items/item.types";
import { ICurrentUser } from "../user/user.types";
import { ICreateItem, Topic } from "../../components/create-item/item-types/itemTypes";

export enum COLLECTION_ACTION_TYPES {
   DELETE_COLLECTION_START = "DELETE_COLLECTION_START",
   CREATE_COLLECTION_WITH_ITEMS_START = "CREATE_COLLECTION_WITH_ITEMS_START",
   GET_COLLECTION_WITH_ITEMS_START = "GET_COLLECTION_WITH_ITEMS_START",
   GET_COLLECTIONS_WIHOUT_ITEMS_START = "GET_COLLECTIONS_WIHOUT_ITEMS_START",
   GET_LARGEST_COLLECTIONS_START = "GET_LARGEST_COLLECTIONS_START",
   AUTOCOMPLETE_START = "AUTOCOMPLETE_START",
}

export interface ICollection extends Omit<ICreateCollection, "image" | "items"> {
   createdAt: string;
   updatedAt: string;
   _id: string;
   image?: {
      url: string;
      imageId: string;
   };
   items?: IItem[];
}

export interface ICreateCollection extends Omit<ICollectionFields, "topic"> {
   topic: Topic;
   owner: {
      _id: string;
      name: string;
   };
   image?: {
      url: string;
      imageId: string;
   };
   items?: ICreateItem[];
}

export interface ICollectionWithoutItems extends Omit<ICollection, "items"> {}

export interface ILargestCollection extends ICollectionWithoutItems {
   itemCount: number;
}

export type DeleteCollectionStart = ActionWithPayload<
   COLLECTION_ACTION_TYPES.DELETE_COLLECTION_START,
   ICollection["_id"]
>;

export type CreateCollectionWithItemsStart = ActionWithPayload<
   COLLECTION_ACTION_TYPES.CREATE_COLLECTION_WITH_ITEMS_START,
   { collectionWithItems: ICreateCollection; image?: File }
>;

export type GetCollectionWithItemsStart = ActionWithPayload<
   COLLECTION_ACTION_TYPES.GET_COLLECTION_WITH_ITEMS_START,
   ICollection["_id"]
>;

export type GetCollectionsWithoutItemsStart = ActionWithPayload<
   COLLECTION_ACTION_TYPES.GET_COLLECTIONS_WIHOUT_ITEMS_START,
   ICurrentUser["name"]
>;

export type GetLargestCollectionsStart = ActionWithPayload<
   COLLECTION_ACTION_TYPES.GET_LARGEST_COLLECTIONS_START,
   number
>;

export type AutocompleteStart = ActionWithPayload<
   COLLECTION_ACTION_TYPES.AUTOCOMPLETE_START,
   { query: string }
>;

