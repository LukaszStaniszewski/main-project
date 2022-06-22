import {createSelector} from "reselect"
import { IUserState } from "./user.reducer"
import { AppState } from "../root-reducer"
import { error } from "console"

const selectUserReducer = (state: AppState) : IUserState => state.userData

export const selectCurrentUser = createSelector(
   selectUserReducer,
  (state) => state.currentUser
)

export const selectErrorMessage = createSelector(
   selectUserReducer,
   (state) => state.error?.response.data
)