import { CollectionActions, ICollection, COLLECTION_ACTION_TYPES } from "./collection.types";
import { IError } from "../user/user.reducer";

export interface ICollectionState {
   collection: ICollection,
   collections?: ICollection[]
   isLoading: boolean,
   error: IError
   successMessage: IError
}

const COLLECTION_INITIAL_STATE = {
   collection: null,
   collections: [],
   isLoading: true,
   error: null,
   successMessage: null
}

const collectionReducer = (state = COLLECTION_INITIAL_STATE , action = {} as CollectionActions) => {
   switch(action.type) {
      case COLLECTION_ACTION_TYPES.CREATE_COLLECTION_START:
      case COLLECTION_ACTION_TYPES.DELETE_COLLECTION_START:
         return {
            ...state,
            isLoading: true,
         }
      case COLLECTION_ACTION_TYPES.CREATE_COLLECTION_SUCCESS:
         return{
            ...state,
            isLoading: false,
            collection: action.payload
         }
      case COLLECTION_ACTION_TYPES.DELETE_COLLECTION_SUCCESS:
         return {
            ...state,
            isLoading: false,
            successMessage: action.payload
         }
      case COLLECTION_ACTION_TYPES.CREATE_COLLECTION_FAILURE:
      case COLLECTION_ACTION_TYPES.DELETE_COLLECTION_FAILURE:
         return{
            ...state,
            isLoading :false,
            error: action.payload
         }
      default:
         return state
   }

}
export default collectionReducer