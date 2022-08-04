import {
   CollectionActions,
   ICollection,
   COLLECTION_ACTION_TYPES,
   ICollectionWithoutItems,
   ILargestCollection,
} from "./collection.types";
import { IError } from "../user/user.reducer";

export interface ICollectionState {
   collection: ICollection | null;
   collections: ICollection[];
   collectionsWihoutItems: ICollectionWithoutItems[];
   largestCollections: ILargestCollection[] | null;
   autocomplete: [];
   collectionFetch: boolean;
   error: IError | null;
   successMessage: IError | null;
}

const COLLECTION_INITIAL_STATE: ICollectionState = {
   collection: null,
   collections: [],
   collectionsWihoutItems: [],
   largestCollections: [],
   autocomplete: [],
   collectionFetch: false,
   error: null,
   successMessage: null,
};

const collectionReducer = (
   state = COLLECTION_INITIAL_STATE,
   action = {} as CollectionActions
) => {
   switch (action.type) {
      case COLLECTION_ACTION_TYPES.CREATE_COLLECTION_START:
      case COLLECTION_ACTION_TYPES.DELETE_COLLECTION_START:
      case COLLECTION_ACTION_TYPES.CREATE_COLLECTION_WITH_ITEMS_START:
      case COLLECTION_ACTION_TYPES.GET_COLLECTION_WITH_ITEMS_START:
      case COLLECTION_ACTION_TYPES.GET_COLLECTIONS_WIHOUT_ITEMS_START:
      case COLLECTION_ACTION_TYPES.GET_LARGEST_COLLECTIONS_START:
      case COLLECTION_ACTION_TYPES.AUTOCOMPLETE_START:
         return {
            ...state,
            error: null,
            collectionFetch: true,
         };
      case COLLECTION_ACTION_TYPES.AUTOCOMPLETE_SUCCESS:
         return {
            ...state,
            autocomplete: action.payload,
            collectionFetch: true,
         };
      case COLLECTION_ACTION_TYPES.GET_LARGEST_COLLECTIONS_SUCCESS:
         return {
            ...state,
            largestCollections: action.payload,
            collectionFetch: false,
         };
      case COLLECTION_ACTION_TYPES.GET_COLLECTION_WITH_ITEMS_SUCCESS:
      case COLLECTION_ACTION_TYPES.CREATE_COLLECTION_SUCCESS:
         return {
            ...state,
            collectionFetch: false,
            collection: action.payload,
         };
      case COLLECTION_ACTION_TYPES.GET_COLLECTIONS_WIHOUT_ITEMS_SUCCESS:
         return {
            ...state,
            collectionFetch: false,
            collectionsWihoutItems: action.payload,
         };
      case COLLECTION_ACTION_TYPES.SET_COLLECTION:
         return {
            ...state,
            collectionsWihoutItems: action.payload,
         };
      case COLLECTION_ACTION_TYPES.DELETE_COLLECTION_SUCCESS:
         return {
            ...state,
            collectionFetch: false,
            successMessage: action.payload,
         };
      case COLLECTION_ACTION_TYPES.CREATE_COLLECTION_FAILURE:
      case COLLECTION_ACTION_TYPES.DELETE_COLLECTION_FAILURE:
      case COLLECTION_ACTION_TYPES.CREATE_COLLECTION_WITH_ITEMS_FAILURE:
      case COLLECTION_ACTION_TYPES.GET_COLLECTION_WITH_ITEMS_FAILURE:
      case COLLECTION_ACTION_TYPES.GET_COLLECTIONS_WIHOUT_ITEMS_FAILURE:
      case COLLECTION_ACTION_TYPES.GET_LARGEST_COLLECTIONS_FAILURE:
      case COLLECTION_ACTION_TYPES.AUTOCOMPLETE_FAILURE:
         return {
            ...state,
            collectionFetch: false,
            error: action.payload,
         };
      default:
         return state;
   }
};
export default collectionReducer;
