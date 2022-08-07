import { LOCAL_ACTION_TYPES, LocalAction } from "./local.types";

export interface ILocalState {
   currentLanguage: string;
   topicDropdownState: boolean;
   notFoundPage: boolean;
}

const LOCAL_INITIAL_STATE: ILocalState = {
   currentLanguage: "en",
   topicDropdownState: false,
   notFoundPage: false,
};

const localReducer = (state = LOCAL_INITIAL_STATE, action = {} as LocalAction): ILocalState => {
   switch (action.type) {
      case LOCAL_ACTION_TYPES.SET_LANGUAGE:
         return {
            ...state,
            currentLanguage: action.payload,
         };
      case LOCAL_ACTION_TYPES.SHOW_404_PAGE:
         return {
            ...state,
            notFoundPage: action.payload,
         };
      case LOCAL_ACTION_TYPES.DISABLE_TOPIC_DROPDOWN:
         return {
            ...state,
            topicDropdownState: action.payload,
         };
      default:
         return state;
   }
};

export default localReducer;
