import {createSelector} from "reselect"
import { IUserState } from "./user.reducer"
import { AppState } from "../root-reducer"
import { error } from "console"

export const selectUserReducer = (state: AppState) : IUserState => state.userData

export const selectCurrentUser = createSelector(
   selectUserReducer,
  (state) => state.currentUser
)

export const selectErrorMessage = createSelector(
   selectUserReducer,
   (state) => state.error?.response.data
)

export const selectUsers = createSelector(
   selectUserReducer,
   (state) => state.users
)