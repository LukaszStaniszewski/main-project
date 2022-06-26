import { ICurrentUser, USER_ACTION_TYPES, IUserFormValues } from "./user.types";
import { AxiosError}  from "axios"
import * as type from "./user.types"


export const setUsers = (users: ICurrentUser[]): type.SetUsers => ({
   type: USER_ACTION_TYPES.SET_USERS,
   payload: users
})

export const deleteUsersStart = (users: ICurrentUser[]): type.DeleteUsersStart => ({
   type: USER_ACTION_TYPES.DELETE_USERS_START,
   payload: users
})

// export const deleteUsersSuccess = (): type.DeleteUsersSuccess => ({
//    type: USER_ACTION_TYPES.DELETE_USERS_SUCCESS,
// })

// export const deleteUsersFailure = (error: AxiosError): type.DeleteUsersFailure => ({
//    type: USER_ACTION_TYPES.DELETE_USERS_FAILURE,
//    payload: error
// })

export const updateUsersStart = (users: ICurrentUser[]): type.UpdateUsersStart => ({
   type: USER_ACTION_TYPES.UPDATE_USERS_START,
   payload: users,
})

export const updateUsersSuccess = (): type.UpdateUsersSuccess => ({
   type: USER_ACTION_TYPES.UPDATE_USERS_SUCCESS,
})

export const updateUsersFailure = (error: AxiosError): type.UpdateUsersFailure => ({
   type: USER_ACTION_TYPES.UPDATE_USERS_FAILURE,
   payload: error,
})

export const getUsersStart = () : type.GetUsersStart =>({
   type: USER_ACTION_TYPES.GET_USERS_START
})

export const getUsersSuccess = (users: ICurrentUser[]) : type.GetUsersSuccess =>({
   type: USER_ACTION_TYPES.GET_USERS_SUCCESS,
   payload: users
})

export const getUsersFailure = (error: AxiosError) : type.GetUsersFailure =>({
   type: USER_ACTION_TYPES.GET_USERS_FAILURE,
   payload: error
})

export const setCurrentUser = (user: ICurrentUser) : type.SetCurrentUser => ({
   type: USER_ACTION_TYPES.SET_CURRENT_USER,
   payload: user
})

export const logOutStart = () : type.LogOutStart => ({
   type: USER_ACTION_TYPES.LOG_OUT_START
})

export const logOutSuccess= () : type.LogOutSuccess => ({
   type: USER_ACTION_TYPES.LOG_OUT_SUCCESS
})

export const logOutFailure= (error: AxiosError) : type.LogOutFailure => ({
   type: USER_ACTION_TYPES.LOG_OUT_FAILURE,
   payload: error
})

export const signUpStart = (credentials: IUserFormValues) : type.SignUpStart => ({
   type: USER_ACTION_TYPES.SIGN_UP_START,
   payload: credentials 
 })


export const signInStart = (credentials: IUserFormValues) : type.SignInStart => ({
   type: USER_ACTION_TYPES.SIGN_IN_START,
   payload: credentials 
 })

export const authenticationSuccess = (user: ICurrentUser) : type.AuthenticationSuccess => ({
   type: USER_ACTION_TYPES.AUTHENTICATION_SUCCESS,
   payload: user 
 })

 //@ts-ignore
export const authenticationFailure = (error) : type.AuthenticationFailure => ({
   type: USER_ACTION_TYPES.AUTHENTICATION_FAILURE,
   payload: error
})
