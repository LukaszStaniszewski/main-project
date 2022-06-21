import { createAction, Action, ActionWithPayload } from "../../utils/store.utils";
import { ICurrentUser, USER_ACTION_TYPES, IUserFormValues } from "./user.types";

export type SignInStart = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_START, IUserFormValues>
export type SignInSuccess = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_SUCESS, ICurrentUser>
export type SignInFailure = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_FAILURE, Error>

// export const signInStart = (email: string, password: string) : SignInStart => {
//    return createAction(USER_ACTION_TYPES.SIGN_IN_START, {email, password})
// }d
export type UserAction = SignInFailure | SignInSuccess | SignInStart

// export const signInStart = (email: string, password: string) : SignInStart => ({
//   type: USER_ACTION_TYPES.SIGN_IN_START,
//   payload: {email, password} 
// })

export const signInStart = (payload: IUserFormValues) : SignInStart => ({
   type: USER_ACTION_TYPES.SIGN_IN_START,
   payload: payload 
 })

export const signInSuccess = (user: ICurrentUser) : SignInSuccess => ({
   type: USER_ACTION_TYPES.SIGN_IN_SUCESS,
   payload: user 
 })

export const signInFailure = (error: Error) : SignInFailure => ({
   type: USER_ACTION_TYPES.SIGN_IN_FAILURE,
   payload: error
})
