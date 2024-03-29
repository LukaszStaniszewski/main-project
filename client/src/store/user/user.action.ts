import { ICurrentUser, USER_ACTION_TYPES, IUserFormValues} from "./user.types";
import { createAction } from "@reduxjs/toolkit";

export const signInStart = createAction<IUserFormValues>(USER_ACTION_TYPES.SIGN_IN_START);
export const signUpStart = createAction<IUserFormValues>(USER_ACTION_TYPES.SIGN_UP_START);

export const getUsersStart = createAction(USER_ACTION_TYPES.GET_USERS_START)
export const getCurrentUserStart = createAction(USER_ACTION_TYPES.GET_CURRENT_USER_START)

export const updateUsersStart = createAction<ICurrentUser[]>(USER_ACTION_TYPES.UPDATE_USERS_START)
export const updateUsersSuccess = createAction(USER_ACTION_TYPES.UPDATE_USERS_SUCCESS)

export const logOutStart = createAction(USER_ACTION_TYPES.LOG_OUT_START)

export const deleteUsersStart = createAction<ICurrentUser[]>(USER_ACTION_TYPES.DELETE_USERS_START)