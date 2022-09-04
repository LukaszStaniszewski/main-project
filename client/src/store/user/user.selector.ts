import { createSelector } from "reselect";
import { IUserState } from "./user.slice";
import { AppState } from "../root-reducer";

export const selectUserReducer = (state: AppState): IUserState => state.user;

export const selectCurrentUser = createSelector(
   selectUserReducer,
   (state) => state.currentUser
);

export const selectToast = createSelector(selectUserReducer, (state) => state.toast);

export const selectUsers = createSelector(selectUserReducer, (state) => state.users);

export const selectLoadingState = createSelector(
   selectUserReducer,
   (state) => state.isLoading
);
