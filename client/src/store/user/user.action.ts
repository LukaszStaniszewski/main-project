import { ICurrentUser, USER_ACTION_TYPES, IUserFormValues, IToast } from "./user.types";
import * as type from "./user.types";

export const getUserByCredentialsStart = (
   userName: ICurrentUser["name"]
): type.GetUserByCredentialsStart => ({
   type: USER_ACTION_TYPES.GET_USER_BY_CREDENTIALS_START,
   payload: userName,
});

export const getUserByCredentialsSuccess = (
   user: ICurrentUser
): type.GetUserByCredentialsSuccess => ({
   type: USER_ACTION_TYPES.GET_USER_BY_CREDENTIALS_SUCCESS,
   payload: user,
});

export const getUserByCredentialsFailure = (
   toast: IToast
): type.GetUserByCredentialsFailure => ({
   type: USER_ACTION_TYPES.GET_USER_BY_CREDENTIALS_FAILURE,
   payload: toast,
});

export const setUsers = (users: ICurrentUser[]): type.SetUsers => ({
   type: USER_ACTION_TYPES.SET_USERS,
   payload: users,
});

export const deleteUsersStart = (users: ICurrentUser[]): type.DeleteUsersStart => ({
   type: USER_ACTION_TYPES.DELETE_USERS_START,
   payload: users,
});

export const updateUsersStart = (users: ICurrentUser[]): type.UpdateUsersStart => ({
   type: USER_ACTION_TYPES.UPDATE_USERS_START,
   payload: users,
});

export const updateUsersSuccess = (): type.UpdateUsersSuccess => ({
   type: USER_ACTION_TYPES.UPDATE_USERS_SUCCESS,
});

export const updateUsersFailure = (toast: IToast): type.UpdateUsersFailure => ({
   type: USER_ACTION_TYPES.UPDATE_USERS_FAILURE,
   payload: toast,
});

export const getUsersStart = (): type.GetUsersStart => ({
   type: USER_ACTION_TYPES.GET_USERS_START,
});

export const getUsersSuccess = (users: ICurrentUser[]): type.GetUsersSuccess => ({
   type: USER_ACTION_TYPES.GET_USERS_SUCCESS,
   payload: users,
});

export const getUsersFailure = (error: IToast): type.GetUsersFailure => ({
   type: USER_ACTION_TYPES.GET_USERS_FAILURE,
   payload: error,
});

export const setCurrentUser = (user: ICurrentUser | null): type.SetCurrentUser => ({
   type: USER_ACTION_TYPES.SET_CURRENT_USER,
   payload: user,
});

export const logOutStart = (): type.LogOutStart => ({
   type: USER_ACTION_TYPES.LOG_OUT_START,
});

export const logOutSuccess = (): type.LogOutSuccess => ({
   type: USER_ACTION_TYPES.LOG_OUT_SUCCESS,
});

// export const logOutFailure = (toast: IToast): type.LogOutFailure => ({
//    type: USER_ACTION_TYPES.LOG_OUT_FAILURE,
//    payload: toast,
// });

export const signUpStart = (credentials: IUserFormValues): type.SignUpStart => ({
   type: USER_ACTION_TYPES.SIGN_UP_START,
   payload: credentials,
});

export const signInStart = (credentials: IUserFormValues): type.SignInStart => ({
   type: USER_ACTION_TYPES.SIGN_IN_START,
   payload: credentials,
});

export const authenticationSuccess = (
   user: ICurrentUser
): type.AuthenticationSuccess => ({
   type: USER_ACTION_TYPES.AUTHENTICATION_SUCCESS,
   payload: user,
});

export const showToast = (toast: IToast): type.StartToast => ({
   type: USER_ACTION_TYPES.START_TOAST,
   payload: toast,
});

export const closeToast = (): type.CloseToast => ({
   type: USER_ACTION_TYPES.CLOSE_TOAST,
});
