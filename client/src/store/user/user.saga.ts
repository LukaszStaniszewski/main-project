import {takeLatest, put, all, call, } from "typed-redux-saga/macro"
import{ AxiosError}  from "axios"

import { decode as decodeToken } from "../../utils/userToken.utils"
import {API_URL, postRequest, deleteRequest, ITokens, getRequest, patchRequest} from "../../api/axios-instance.api"
import { USER_ACTION_TYPES, IUserFormValues,  ICurrentUser, SignInStart, SignUpStart, UpdateUsersStart, DeleteUsersStart, GetUserByCredentialsStart} from "./user.types"
import * as action from "./user.action"


function* Authenticate(credentials:IUserFormValues,url:string) {
   try {
      localStorage.removeItem("token")
      const {data} = yield* call(postRequest<ITokens>, url, credentials)
      localStorage.setItem('token', JSON.stringify(data))
      const userData = decodeToken(data.accessToken)
      yield* put(action.authenticationSuccess(userData))
      
    } catch (error) {
      yield* put(action.authenticationFailure(error))
   }
}


function* signInWithEmail({payload: credentials}: SignInStart) {
   yield* call(Authenticate,credentials, API_URL.SIGN_IN)
}


function* signUpWithEmail({payload: credentials}: SignUpStart) {
  yield* call(Authenticate, credentials, API_URL.SIGN_UP)
}

function* updateOrDeleteUsers (requestType:any, usersToUpdate: ICurrentUser[], url:string) {
   try {
      yield* call(requestType, url, usersToUpdate)
      yield* put(action.updateUsersSuccess())
   } catch (error) {
      yield* put(action.updateUsersFailure(error as AxiosError))
   }
}

function* updateUsers({payload: users}: UpdateUsersStart) {
   yield* updateOrDeleteUsers(patchRequest, users, API_URL.UPDATE_USERS)
}

function* deleteUsers({payload: users}: DeleteUsersStart) {
   yield* updateOrDeleteUsers(postRequest, users, API_URL.DELETE_USERS)
}

function* logOut() {
   try {
      const {status} = yield* call(deleteRequest, API_URL.LOG_OUT)
      if(status === 200) {
         localStorage.removeItem("token")
         yield* put(action.logOutSuccess())
      }
   } catch(error) {
      yield* put(action.logOutFailure(error as AxiosError))
   }
}

function* getUsers() {
   try {
      const repsonse = yield* call(getRequest<ICurrentUser[]>, API_URL.GET_USERS)
      yield* put(action.getUsersSuccess(repsonse.data))
   } catch (error) {
      yield* put(action.getUsersFailure(error as AxiosError))
   }
}

function* getUserByCredentials({payload: userName}: GetUserByCredentialsStart) {
   if(!userName) return
   try {
      const response = yield* call(postRequest<ICurrentUser>, API_URL.GET_USER_SEND_CREDENTIALS, {name: userName})
      yield* put(action.GetUserByCredentialsSuccess(response.data))
   } catch (error) {
      yield* put(action.GetUserByCredentialsFailure(error as AxiosError))
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