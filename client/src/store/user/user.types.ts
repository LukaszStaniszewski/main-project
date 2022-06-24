import { Action, ActionWithPayload } from "../../utils/store.utils";
import { AxiosError}  from "axios"

export enum USER_ACTION_TYPES {
   SET_CURRENT_USER = "SET_CURRENT_USER",
   SET_USERS = "SET_USERS",
   SIGN_IN_START = "SIGN_IN_START",
   SIGN_UP_START = "SIGN_UP_START",
   // authentication = signIn or signUp
   AUTHENTICATION_SUCCESS = "AUTHENTICATION_SUCCESS",
   AUTHENTICATION_FAILURE = "AUTHENTICATION_FAILURE",

   LOG_OUT_START = "LOG_OUT_START",
   LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS",
   LOG_OUT_FAILURE = "LOG_OUT_FAILURE",

   GET_USERS_START = "GET_USERS_START",
   GET_USERS_SUCCESS = "GET_USERS_SUCCESS",
   GET_USERS_FAILURE = "GET_USERS_FAILURE",

   UPDATE_USERS_START = "UPDATE_USERS_START",
   UPDATE_USERS_SUCCESS = "UPDATE_USERS_SUCCESS",
   UPDATE_USERS_FAILURE = "UPDATE_USERS_FAILURE",

   DELETE_USERS_START = "DELETE_USERS_START",
   // DELETE_USERS_SUCCESS = "DELETE_USERS_SUCCESS",
   // DELETE_USERS_FAILURE = "DELETE_USERS_FAILURE",
}


export type SignInStart = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_START, IUserFormValues>

export type SignUpStart = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_START, IUserFormValues>

export type AuthenticationSuccess = ActionWithPayload<USER_ACTION_TYPES.AUTHENTICATION_SUCCESS, ICurrentUser>
export type AuthenticationFailure = ActionWithPayload<USER_ACTION_TYPES.AUTHENTICATION_FAILURE, AxiosError>

export type LogOutStart = Action<USER_ACTION_TYPES.LOG_OUT_START>
export type LogOutSuccess = Action<USER_ACTION_TYPES.LOG_OUT_SUCCESS>
export type LogOutFailure= ActionWithPayload<USER_ACTION_TYPES.LOG_OUT_FAILURE, AxiosError>

export type SetCurrentUser = ActionWithPayload<USER_ACTION_TYPES.SET_CURRENT_USER, ICurrentUser>
export type SetUsers = ActionWithPayload<USER_ACTION_TYPES.SET_USERS, ICurrentUser[]>

export type GetUsersStart = Action<USER_ACTION_TYPES.GET_USERS_START>
export type GetUsersSuccess = ActionWithPayload<USER_ACTION_TYPES.GET_USERS_SUCCESS, ICurrentUser[]>
export type GetUsersFailure = ActionWithPayload<USER_ACTION_TYPES.GET_USERS_FAILURE, AxiosError>

export type UpdateUsersStart = ActionWithPayload<USER_ACTION_TYPES.UPDATE_USERS_START, ICurrentUser[]>
export type UpdateUsersSuccess = Action<USER_ACTION_TYPES.UPDATE_USERS_SUCCESS>
export type UpdateUsersFailure = ActionWithPayload<USER_ACTION_TYPES.UPDATE_USERS_FAILURE, AxiosError>

export type DeleteUsersStart = ActionWithPayload<USER_ACTION_TYPES.DELETE_USERS_START, ICurrentUser[]>
// export type DeleteUsersSuccess = Action<USER_ACTION_TYPES.DELETE_USERS_SUCCESS>
// export type DeleteUsersFailure = ActionWithPayload<USER_ACTION_TYPES.DELETE_USERS_FAILURE, AxiosError>


export type UserAction = 
AuthenticationFailure | AuthenticationSuccess | SignInStart | LogOutStart | 
LogOutSuccess | LogOutFailure | SetCurrentUser| GetUsersStart| GetUsersSuccess| 
GetUsersFailure | DeleteUsersStart | UpdateUsersStart | UpdateUsersFailure |
UpdateUsersSuccess | SetUsers

export interface ICurrentUser {
   _id: string,
   name: string,
   status: string,
   email: string,
   isAdmin: boolean,
   lastLogin: string,
   sessionId: string,
}

export interface IUserFormValues {
   email: string,
   password: string,
   name?: string,
}
