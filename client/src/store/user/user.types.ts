import { Action, ActionWithPayload } from "../../utils/store.utils";

export enum USER_ACTION_TYPES {
   SET_CURRENT_USER = "user/setCurrentUser",
   SET_USERS = "user/setUsers",
   SHOW_TOAST = "user/showToast",
   CLOSE_TOAST = "user/closeToast",
   
   SIGN_IN_START = "user/signInStart",
   SIGN_UP_START = "user/signUpStart",
   LOG_OUT_START = "user/logOutStart",
   LOG_OUT_SUCCESS = "user/logOutSuccess",

   GET_USERS_START = "user/GetUsersStart",

   UPDATE_USERS_START = "user/UpdateUsersStart",
   UPDATE_USERS_SUCCESS = "user/UpdateUserSuccess",

   DELETE_USERS_START = "user/UpdateUserStart",

   GET_CURRENT_USER_START = "user/GetCurrentUserStart",
}

export type SignInStart = ActionWithPayload<
   USER_ACTION_TYPES.SIGN_IN_START,
   IUserFormValues
>;

export type SignUpStart = ActionWithPayload<
   USER_ACTION_TYPES.SIGN_UP_START,
   IUserFormValues
>;

export type StartToast = ActionWithPayload<USER_ACTION_TYPES.CLOSE_TOAST, IToast>;

export type LogOutStart = Action<USER_ACTION_TYPES.LOG_OUT_START>;

export type GetUsersStart = Action<USER_ACTION_TYPES.GET_USERS_START>;

export type UpdateUsersStart = ActionWithPayload<
   USER_ACTION_TYPES.UPDATE_USERS_START,
   ICurrentUser[]
>;

export type DeleteUsersStart = ActionWithPayload<
   USER_ACTION_TYPES.DELETE_USERS_START,
   ICurrentUser[]
>;

export type GetCurrentUserStart = Action<USER_ACTION_TYPES.GET_CURRENT_USER_START>;


export interface ICurrentUser {
   _id: string;
   name: string;
   status: string;
   email: string;
   role: string;
   lastLogin: string;
   sessionId: string;
}

export interface IUserFormValues {
   email: string;
   password: string;
   name?: string;
}

export interface IToast {
   type: "info" | "warning" | "error" | "success";
   message: string;
}
