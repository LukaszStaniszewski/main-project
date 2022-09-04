import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import { ICurrentUser, IToast} from "./index";

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

export const userSlice = createSlice({
   name: "user",
   initialState,
   reducers: {
      startLoading: (state) => {
         state.isLoading = true
         state.toast = null
      },
      setCurrentUser: (state, action: PayloadAction<ICurrentUser | null>) => {
         state.isLoading = false, 
         state.currentUser = action.payload
      },
      showToast: (state, action: PayloadAction<IToast>) => {
         state.isLoading = false, 
         state.toast = action.payload
      },
      closeToast: (state) => {
         state.isLoading = false, 
         state.toast = null
      },
      setUsers: (state, action: PayloadAction<ICurrentUser[]>) => {
         state.isLoading = false
         state.users = action.payload
      },  
   },
});

export const { setCurrentUser, showToast, startLoading, closeToast, setUsers } = userSlice.actions;

export default userSlice.reducer;
