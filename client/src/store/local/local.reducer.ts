import {LOCAL_ACTION_TYPES, LocalAction} from "./local.types"

export interface ILocalState  {
   currentLanguage: string,
   topicDropdownState: boolean,
}


const LOCAL_INITIAL_STATE: ILocalState = {
   currentLanguage:  "",
   topicDropdownState: false,
}

const localReducer = (state = LOCAL_INITIAL_STATE, action = {} as LocalAction) => {

   switch(action.type) {
      case LOCAL_ACTION_TYPES.SET_LANGUAGE:
         return {
            ...state,
            currentLanguage: action.payload
         }
      case LOCAL_ACTION_TYPES.DISABLE_TOPIC_DROPDOWN:
         return {
            ...state,
            topicDropdownState: action.payload
         }
      default:
         return state
   }
}

export default localReducer