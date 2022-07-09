import { IError } from "../user/user.reducer";
import { ITEM_TYPES, ItemActionTypes, IItem } from "./item.types";

export interface IItemState {
   isLoading: boolean
   error: IError,
   items: IItem[],
   item: null,
}

const ITEM_INITIAL_STATE = {
   isLoading: true,
   error: null,
   item: null,
   items: []
}

const itemReducer = (state = ITEM_INITIAL_STATE, action ={} as ItemActionTypes) => {
   switch(action.type) {
      case ITEM_TYPES.CREATE_ITEMS_START:
      case ITEM_TYPES.GET_ITEM_START:
         return {
            ...state,
            isLoading: true,
         }
      case ITEM_TYPES.CREATE_ITEMS_SUCCESS:
         return {
            ...state,
            items: action.payload,
            isLoading: false,
         }
      case ITEM_TYPES.SET_ITEMS:
         return {
            ...state,
            items: action.payload
         }
      case ITEM_TYPES.GET_ITEM_SUCCESS:
         return {
            ...state,
            item: action.payload,
         }
      case ITEM_TYPES.CREATE_ITEMS_FAILURE:
         return {
            ...state,
            isLoading: false,
            error: action.payload
         }
      default:
         return state
   }  
}

export default itemReducer