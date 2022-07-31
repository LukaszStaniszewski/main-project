import { Action, ActionWithPayload } from "../../utils/store.utils";

export enum USER_ACTION_TYPES {
   SET_CURRENT_USER = "SET_CURRENT_USER",
   SET_USERS = "SET_USERS",
   SIGN_IN_START = "SIGN_IN_START",
   SIGN_UP_START = "SIGN_UP_START",
   // authentication = signIn or signUp
   AUTHENTICATION_SUCCESS = "AUTHENTICATION_SUCCESS",

   START_TOAST = "START_TOAST",
   CLOSE_TOAST = "CLOSE_TOAST",

   LOG_OUT_START = "LOG_OUT_START",
   LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS",

   GET_USERS_START = "GET_USERS_START",
   GET_USERS_SUCCESS = "GET_USERS_SUCCESS",
   GET_USERS_FAILURE = "GET_USERS_FAILURE",

   UPDATE_USERS_START = "UPDATE_USERS_START",
   UPDATE_USERS_SUCCESS = "UPDATE_USERS_SUCCESS",
   UPDATE_USERS_FAILURE = "UPDATE_USERS_FAILURE",

   DELETE_USERS_START = "DELETE_USERS_START",

   GET_USER_BY_CREDENTIALS_START = "GET_USER_BY_CREDENTIALS_START",
   GET_USER_BY_CREDENTIALS_SUCCESS = "GET_USER_BY_CREDENTIALS_SUCCESS",
   GET_USER_BY_CREDENTIALS_FAILURE = "GET_USER_BY_CREDENTIALS_FAILURE",
}

export type SignInStart = ActionWithPayload<
   USER_ACTION_TYPES.SIGN_IN_START,
   IUserFormValues
>;

export type SignUpStart = ActionWithPayload<
   USER_ACTION_TYPES.SIGN_UP_START,
   IUserFormValues
>;

export type AuthenticationSuccess = ActionWithPayload<
   USER_ACTION_TYPES.AUTHENTICATION_SUCCESS,
   ICurrentUser
>;
export type StartToast = ActionWithPayload<USER_ACTION_TYPES.START_TOAST, IToast>;

export type LogOutStart = Action<USER_ACTION_TYPES.LOG_OUT_START>;
export type LogOutSuccess = Action<USER_ACTION_TYPES.LOG_OUT_SUCCESS>;
export type CloseToast = Action<USER_ACTION_TYPES.CLOSE_TOAST>;

export type SetCurrentUser = ActionWithPayload<
   USER_ACTION_TYPES.SET_CURRENT_USER,
   ICurrentUser | null
>;
export type SetUsers = ActionWithPayload<USER_ACTION_TYPES.SET_USERS, ICurrentUser[]>;

export type GetUsersStart = Action<USER_ACTION_TYPES.GET_USERS_START>;
export type GetUsersSuccess = ActionWithPayload<
   USER_ACTION_TYPES.GET_USERS_SUCCESS,
   ICurrentUser[]
>;
export type GetUsersFailure = ActionWithPayload<
   USER_ACTION_TYPES.GET_USERS_FAILURE,
   IToast
>;

export type UpdateUsersStart = ActionWithPayload<
   USER_ACTION_TYPES.UPDATE_USERS_START,
   ICurrentUser[]
>;
export type UpdateUsersSuccess = Action<USER_ACTION_TYPES.UPDATE_USERS_SUCCESS>;
export type UpdateUsersFailure = ActionWithPayload<
   USER_ACTION_TYPES.UPDATE_USERS_FAILURE,
   IToast
>;

export type DeleteUsersStart = ActionWithPayload<
   USER_ACTION_TYPES.DELETE_USERS_START,
   ICurrentUser[]
>;

export type GetUserByCredentialsStart = ActionWithPayload<
   USER_ACTION_TYPES.GET_USER_BY_CREDENTIALS_START,
   ICurrentUser["name"]
>;
export type GetUserByCredentialsSuccess = ActionWithPayload<
   USER_ACTION_TYPES.GET_USER_BY_CREDENTIALS_SUCCESS,
   ICurrentUser
>;
export type GetUserByCredentialsFailure = ActionWithPayload<
   USER_ACTION_TYPES.GET_USER_BY_CREDENTIALS_FAILURE,
   IToast
>;

export type UserAction =
   | SignInStart
   | SignUpStart
   | AuthenticationSuccess
   | StartToast
   | CloseToast
   | LogOutStart
   | LogOutSuccess
   | SetCurrentUser
   | SetUsers
   | GetUsersStart
   | GetUsersSuccess
   | GetUsersFailure
   | UpdateUsersStart
   | DeleteUsersStart
   | UpdateUsersSuccess
   | UpdateUsersFailure
   | GetUserByCredentialsStart
   | GetUserByCredentialsSuccess
   | GetUserByCredentialsFailure;

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
