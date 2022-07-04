import {createSelector} from "reselect"
import { IUserState } from "./user.reducer"
import { AppState } from "../root-reducer"

export const selectUserReducer = (state: AppState) : IUserState => state.user

export const selectCurrentUser = createSelector(
   selectUserReducer,
  (state) => state.currentUser
)

export const selectErrorMessage = createSelector(
   selectUserReducer,
   (state) => state.error?.response.data.message
)

export const selectUsers = createSelector(
   selectUserReducer,
   (state) => state.users
)

export const selectLoadingState = createSelector(
   selectUserReducer,
  (state) => state.isLoading
)

