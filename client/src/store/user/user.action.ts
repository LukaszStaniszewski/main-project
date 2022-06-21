import { createAction, Action, ActionWithPayload } from "../../utils/store.utils";
import { ICurrentUser, USER_ACTION_TYPES } from "./user.types";

type SignInStart = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_START, {email: string, password: string}>
type SignInSuccess = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_SUCESS, ICurrentUser>
type SignInFailure = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_FAILURE, Error>

// export const signInStart = (email: string, password: string) : SignInStart => {
//    return createAction(USER_ACTION_TYPES.SIGN_IN_START, {email, password})
// }
export type UserAction = SignInFailure | SignInSuccess | SignInStart

export const signInStart = (email: string, password: string) : SignInStart => ({
  type: USER_ACTION_TYPES.SIGN_IN_START,
  payload: {email, password} 
})

export const signInSuccess = (user: ICurrentUser) : SignInSuccess => ({
   type: USER_ACTION_TYPES.SIGN_IN_SUCESS,
   payload: user 
 })

export const signInFailure = (error: Error) : SignInFailure => ({
   type: USER_ACTION_TYPES.SIGN_IN_FAILURE,
   payload: error
})
