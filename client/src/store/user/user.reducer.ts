import { AnyAction, createReducer } from "@reduxjs/toolkit";
import {
   ICurrentUser,
   IToast,
   setCurrentUser,
   setUsers,
   showToast,
   closeToast,
} from "./index";

export interface IUserState {
   currentUser: ICurrentUser | null;
   users: ICurrentUser[];
   user: ICurrentUser | null;
   isLoading: boolean;
   toast: IToast | null;
}

const initialState: IUserState = {
   currentUser: null,
   user: null,
   toast: null,
   users: [],
   isLoading: true,
};

const isActionUserStartType = (action: AnyAction) => {
   const regex = new RegExp(`(user).*(start?$)`, "i");
   return regex.test(action.type)
};

const userReducer = createReducer(initialState, (builder) => {
   builder
      .addCase(setCurrentUser, (state, action) => {
         state.isLoading = false,
         state.currentUser = action.payload
      })
      .addCase(showToast, (state, action) => {
         state.isLoading = false,
         state.toast = action.payload
      })
      .addCase(closeToast, (state) => {
         state.isLoading = false,
         state.toast = null
      })
      .addCase(setUsers, (state, action) => {
         state.isLoading = false
         state.users = action.payload
      })
      .addMatcher(isActionUserStartType, (state)=> {
         state.isLoading = true
      });
});

export default userReducer;
