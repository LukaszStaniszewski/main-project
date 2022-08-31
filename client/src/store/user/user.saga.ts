import { takeLatest, put, all, call } from "typed-redux-saga/macro";

import {
   API_URL,
   postRequest,
   deleteRequest,
   ITokens,
   getRequest,
   patchRequest,
} from "../../api/axios-instance.api";
import {
   USER_ACTION_TYPES,
   IUserFormValues,
   ICurrentUser,
   SignInStart,
   SignUpStart,
   UpdateUsersStart,
   DeleteUsersStart,
} from "./user.types";
import * as action from "./user.action";

export function* Authenticate(credentials: IUserFormValues, url: string) {
   try {
      yield* call(postRequest<ITokens>, url, credentials);
      const { data } = yield* call(getRequest<ICurrentUser>, "/api/user/current");
      yield* all([
         put(action.authenticationSuccess(data)),
         put(action.showToast({ message: `Sign up as ${data.name}`, type: "success" })),
      ]);
   } catch (error) {
      const act = credentials.name ? "up" : "in";
      yield* put(
         action.showToast({
            //@ts-ignore
            message: `Sign ${act} failed: ${error.response.data.message}`,
            type: "warning",
         })
      );
   }
}

export function* signInWithEmail({ payload: credentials }: SignInStart) {
   yield* call(Authenticate, credentials, API_URL.SIGN_IN);
}

export function* signUpWithEmail({ payload: credentials }: SignUpStart) {
   yield* call(Authenticate, credentials, API_URL.SIGN_UP);
}

// export function* signInWithGoogle() {
//    const { data } = yield* call(getRequest<ICurrentUser>, getGoogleOAuthUrl());
// }

export function* getCurrentUser() {
   try {
      const { data } = yield* call(getRequest<ICurrentUser>, API_URL.GET_CURRENT_USER);
      yield* put(action.setCurrentUser(data));
   } catch (error) {
      yield* all([
         put(
            action.showToast({
               //@ts-ignore
               message: `${error.response.data.message}`,
               type: "warning",
            })
         ),
         put(action.setCurrentUser(null)),
      ]);
   }
}

export function* updateOrDeleteUsers(
   requestType: any,
   usersToUpdate: ICurrentUser[],
   url: string
) {
   try {
      yield* call(requestType, url, usersToUpdate);
      yield* put(action.updateUsersSuccess());
   } catch (error) {
      // yield* put(action.updateUsersFailure(error as AxiosError))
   }
}

export function* updateUsers({ payload: users }: UpdateUsersStart) {
   yield* call(updateOrDeleteUsers, patchRequest, users, API_URL.UPDATE_USERS);
}

export function* deleteUsers({ payload: users }: DeleteUsersStart) {
   yield* call(updateOrDeleteUsers, postRequest, users, API_URL.DELETE_USERS);
}

export function* logOut() {
   try {
      yield* call(deleteRequest, API_URL.LOG_OUT);

      yield* put(action.logOutSuccess());
   } catch (error) {
      // yield* put(action.logOutFailure(error as AxiosError))
   }
}

export function* getUsers() {
   try {
      const response = yield* call(getRequest<ICurrentUser[]>, API_URL.GET_USERS);
      yield* put(action.getUsersSuccess(response.data));
   } catch (error) {
      // yield* put(action.getUsersFailure(error as AxiosError))
   }
}

function* onGetCurrentUser() {
   yield* takeLatest(USER_ACTION_TYPES.GET_CURRENT_USER_START, getCurrentUser);
}

function* onUpdateUsers() {
   yield* takeLatest(USER_ACTION_TYPES.UPDATE_USERS_START, updateUsers);
}

function* onDeleteUsers() {
   yield* takeLatest(USER_ACTION_TYPES.DELETE_USERS_START, deleteUsers);
}

function* onGetUsers() {
   yield* takeLatest(USER_ACTION_TYPES.GET_USERS_START, getUsers);
}

function* onLogOut() {
   yield* takeLatest(USER_ACTION_TYPES.LOG_OUT_START, logOut);
}

function* onEmailSignUpStart() {
   yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUpWithEmail);
}

function* onEmailSignInStart() {
   yield* takeLatest(USER_ACTION_TYPES.SIGN_IN_START, signInWithEmail);
}

export default function* userSagas() {
   yield* all([
      call(onEmailSignInStart),
      call(onLogOut),
      call(onEmailSignUpStart),
      call(onGetUsers),
      call(onDeleteUsers),
      call(onUpdateUsers),
      call(onGetCurrentUser),
   ]);
}
