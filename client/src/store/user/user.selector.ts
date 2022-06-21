import {createSelector} from "reselect"
import { IUserState } from "./user.reducer"

const selectUserReducer = (state: any) : IUserState => state.categories

export const selectCurrentUser = createSelector(
   selectUserReducer,
   (user) => user.currentUser
)