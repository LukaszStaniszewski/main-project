import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const supportedLanguages = ["en", "pl"] as const
type SupportedLanguages = typeof supportedLanguages[number]

export interface ILocalState {
   currentLanguage: SupportedLanguages;
   topicDropdownState: boolean;
   notFoundPage: boolean;
}

const initialState: ILocalState = {
   currentLanguage: "en",
   topicDropdownState: false,
   notFoundPage: false,
};

const localSlice = createSlice({
   name: "local",
   initialState,
   reducers: {
      setLanguage: (state, action: PayloadAction<SupportedLanguages>) => {
         state.currentLanguage = action.payload
      },
      show404Page: (state, action: PayloadAction<boolean>) => {
         state.notFoundPage =action.payload
      },
      disableTopicDropdown: (state, action: PayloadAction<boolean>) => {
         state.topicDropdownState = action.payload
      }
   }
})

export const {setLanguage, show404Page, disableTopicDropdown} = localSlice.actions
export default localSlice.reducer