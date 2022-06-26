import {LOCAL_ACTION_TYPES, LocalAction} from "./local.types"

export interface ILocalState  {
   currentLanguage: string
}


const LOCAL_INITIAL_STATE: ILocalState = {
   currentLanguage:  ""

}

const localReducer = (state = LOCAL_INITIAL_STATE, action = {} as LocalAction) => {

   switch(action.type) {
      case LOCAL_ACTION_TYPES.SET_LANGUAGE:
         return {
            ...state,
            currentLanguage: action.payload
         }
      default:
         return state
   }
}

export default localReducer