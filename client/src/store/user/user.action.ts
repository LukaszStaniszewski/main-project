import { Action, ActionWithPayload } from "../../utils/store.utils";
import { ICurrentUser, USER_ACTION_TYPES, IUserFormValues } from "./user.types";

export type SignInStart = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_START, IUserFormValues>
export type SignInSuccess = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_SUCCESS, ICurrentUser>
export type SignInFailure = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_FAILURE, Error>

export type LogOutStart = Action<USER_ACTION_TYPES.LOG_OUT_START>
export type LogOutSuccess = Action<USER_ACTION_TYPES.LOG_OUT_SUCCESS>
export type LogOutFailure= ActionWithPayload<USER_ACTION_TYPES.LOG_OUT_FAILURE, Error>

export type SetCurrentUser = ActionWithPayload<USER_ACTION_TYPES.SET_CURRENT_USER, ICurrentUser>

export type UserAction = SignInFailure | SignInSuccess | SignInStart | LogOutStart | LogOutSuccess | LogOutFailure | SetCurrentUser

export const setCurrentUser = (user: ICurrentUser) : SetCurrentUser => ({
   type: USER_ACTION_TYPES.SET_CURRENT_USER,
   payload: user
})

export const logOutStart = () : LogOutStart => ({
   type: USER_ACTION_TYPES.LOG_OUT_START
})

export const logOutSuccess= () : LogOutSuccess => ({
   type: USER_ACTION_TYPES.LOG_OUT_SUCCESS
})

export const logOutFailure= (error: Error) : LogOutFailure => ({
   type: USER_ACTION_TYPES.LOG_OUT_FAILURE,
   payload: error
})

export const signInStart = (credentials: IUserFormValues) : SignInStart => ({
   type: USER_ACTION_TYPES.SIGN_IN_START,
   payload: credentials 
 })

export const signInSuccess = (user: ICurrentUser) : SignInSuccess => ({
   type: USER_ACTION_TYPES.SIGN_IN_SUCCESS,
   payload: user 
 })

export const signInFailure = (error: Error) : SignInFailure => ({
   type: USER_ACTION_TYPES.SIGN_IN_FAILURE,
   payload: error
})
