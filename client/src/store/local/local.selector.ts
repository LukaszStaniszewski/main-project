import {createSelector} from "reselect"
import { ILocalState } from "./local.reducer"
import { AppState } from "../root-reducer"

export const selectLocalReducer = (state: AppState) : ILocalState => state.localData

export const selectCurrentLanguage = createSelector(
   selectLocalReducer,
   (local) => local.currentLanguage
)

export const selectTopicDropdown = createSelector(
   selectLocalReducer,
   (local) => local.topicDropdownState
)

