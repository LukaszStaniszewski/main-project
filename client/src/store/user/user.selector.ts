import {createSelector} from "reselect"
import { IUserState } from "./user.reducer"
import { AppState } from "../root-reducer"

const selectUserReducer = (state: AppState) : IUserState => state.categories

export const selectCurrentUser = createSelector(
   selectUserReducer,
   (user) => user.currentUser
)