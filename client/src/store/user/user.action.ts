import { Action, ActionWithPayload } from "../../utils/store.utils";
import { ICurrentUser, USER_ACTION_TYPES, IUserFormValues } from "./user.types";
import { AxiosError}  from "axios"

export type SignInStart = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_START, IUserFormValues>

export type SignUpStart = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_START, IUserFormValues>

export type AuthenticationSuccess = ActionWithPayload<USER_ACTION_TYPES.AUTHENTICATION_SUCCESS, ICurrentUser>
export type AuthenticationFailure = ActionWithPayload<USER_ACTION_TYPES.AUTHENTICATION_FAILURE, AxiosError>

export type LogOutStart = Action<USER_ACTION_TYPES.LOG_OUT_START>
export type LogOutSuccess = Action<USER_ACTION_TYPES.LOG_OUT_SUCCESS>
export type LogOutFailure= ActionWithPayload<USER_ACTION_TYPES.LOG_OUT_FAILURE, AxiosError>

export type SetCurrentUser = ActionWithPayload<USER_ACTION_TYPES.SET_CURRENT_USER, ICurrentUser>

export type UserAction = AuthenticationFailure | AuthenticationSuccess | SignInStart | LogOutStart | LogOutSuccess | LogOutFailure | SetCurrentUser

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

export const logOutFailure= (error: AxiosError) : LogOutFailure => ({
   type: USER_ACTION_TYPES.LOG_OUT_FAILURE,
   payload: error
})

export const signUpStart = (credentials: IUserFormValues) : SignUpStart => ({
   type: USER_ACTION_TYPES.SIGN_UP_START,
   payload: credentials 
 })


export const signInStart = (credentials: IUserFormValues) : SignInStart => ({
   type: USER_ACTION_TYPES.SIGN_IN_START,
   payload: credentials 
 })

export const authenticationSuccess = (user: ICurrentUser) : AuthenticationSuccess => ({
   type: USER_ACTION_TYPES.AUTHENTICATION_SUCCESS,
   payload: user 
 })

export const authenticationFailure = (error: AxiosError) : AuthenticationFailure => ({
   type: USER_ACTION_TYPES.AUTHENTICATION_FAILURE,
   payload: error
})
