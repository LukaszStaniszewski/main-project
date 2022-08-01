import {takeLatest, put, all, call, } from "typed-redux-saga/macro"

import { decode as decodeToken } from "../../utils/userToken.utils"
import {API_URL, postRequest, deleteRequest, ITokens, getRequest, patchRequest} from "../../api/axios-instance.api"
import { USER_ACTION_TYPES, IUserFormValues,  ICurrentUser, SignInStart, SignUpStart, UpdateUsersStart, DeleteUsersStart, GetUserByCredentialsStart} from "./user.types"
import { show404Page } from "../local/local.action"
import * as action from "./user.action"


export function* Authenticate(credentials:IUserFormValues,url:string) {
   try {
      localStorage.removeItem("token")
      const {data} = yield* call(postRequest<ITokens>, url, credentials)
      localStorage.setItem('token', JSON.stringify(data))
      const userData = yield* call(decodeToken, data.accessToken)
      yield* all([
          put(action.authenticationSuccess(userData)),
          put(action.showToast({message: `Sign up as ${userData.name}`, type: "success"}))
     ]);
   } catch (error) {
      const act = credentials.name ? "up" : "in"
      //@ts-ignore
      yield* put(action.showToast({message: `Sign ${act} failed: ${error.response.data.message}`, type: "warning"}))
   }
}


export function* signInWithEmail({payload: credentials}: SignInStart) {
   yield* call(Authenticate,credentials, API_URL.SIGN_IN)
}


export function* signUpWithEmail({payload: credentials}: SignUpStart) {
  yield* call(Authenticate, credentials, API_URL.SIGN_UP)
}

export function* updateOrDeleteUsers (requestType:any, usersToUpdate: ICurrentUser[], url: string) {
   try {
      yield* call(requestType, url, usersToUpdate)
      yield* put(action.updateUsersSuccess())
   } catch (error) {
      // yield* put(action.updateUsersFailure(error as AxiosError))
   }
}

export function* updateUsers({payload: users}: UpdateUsersStart) {
   yield* call(updateOrDeleteUsers, patchRequest, users, API_URL.UPDATE_USERS)
}

export function* deleteUsers({payload: users}: DeleteUsersStart) {
   yield* call(updateOrDeleteUsers, postRequest, users, API_URL.DELETE_USERS)
}

export function* logOut() {
   try {
      const {status} = yield* call(deleteRequest, API_URL.LOG_OUT)
      if(status === 200) {
         localStorage.removeItem("token")
         yield* put(action.logOutSuccess())
      }
   } catch(error) {
      localStorage.removeItem("token")
      // yield* put(action.logOutFailure(error as AxiosError))
   }
}

export function* getUsers() {
   try {
      const response = yield* call(getRequest<ICurrentUser[]>, API_URL.GET_USERS)
      yield* put(action.getUsersSuccess(response.data))
   } catch (error) {
      // yield* put(action.getUsersFailure(error as AxiosError))
   }
}

export function* getUserByCredentials({payload: userName}: GetUserByCredentialsStart) {
   try {
      const {data} = yield* call(getRequest<ICurrentUser>, `${API_URL.GET_USER_SEND_URL}/${userName}`)
      yield* all([
         put(action.GetUserByCredentialsSuccess(data)), 
         put(show404Page(false))
      ])
   } catch (error) {
      yield* put(show404Page(true))
   }
}

function* onGetUserByCredentials() {
   yield* takeLatest(USER_ACTION_TYPES.GET_USER_BY_CREDENTIALS_START, getUserByCredentials)
}

function* onUpdateUsers() {
   yield* takeLatest(USER_ACTION_TYPES.UPDATE_USERS_START, updateUsers)
}

function* onDeleteUsers() {
   yield* takeLatest(USER_ACTION_TYPES.DELETE_USERS_START, deleteUsers)
}

function* onGetUsers() {
   yield* takeLatest(USER_ACTION_TYPES.GET_USERS_START, getUsers)
}

function* onLogOut() {
   yield* takeLatest(USER_ACTION_TYPES.LOG_OUT_START, logOut)
}

function* onEmailSignUpStart() {
   yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUpWithEmail)
}

function* onEmailSignInStart() {
   yield* takeLatest(USER_ACTION_TYPES.SIGN_IN_START, signInWithEmail)
}

export default function* userSagas() {
   yield* all([
      call(onEmailSignInStart),
      call(onLogOut),
      call(onEmailSignUpStart),
      call(onGetUsers),
      call(onDeleteUsers),
      call(onUpdateUsers),
      call(onGetUserByCredentials),
   ]);
}