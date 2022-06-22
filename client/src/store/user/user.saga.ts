import {takeLatest, put, all, call} from "typed-redux-saga/macro"
import { authenticationSuccess, authenticationFailure, SignInStart, logOutSuccess, logOutFailure, SignUpStart} from "./user.action"
import { USER_ACTION_TYPES, IUserFormValues,  ICurrentUser} from "./user.types"
import { decode as decodeToken } from "../../utils/userToken.utils"
import {API_URL, postRequest, deleteRequest, ITokens} from "../../api/axios-instance.api"
import axios,{ AxiosError}  from "axios"


function* Authenticate(credentials: IUserFormValues, url:string) {
   try {
      const {data, status} = yield* call(postRequest<ITokens>, url, credentials)
      localStorage.setItem('token', JSON.stringify(data))

      const user = decodeToken(data.accessToken)
      if(user) {
         yield* put(authenticationSuccess(user))
      }
    } catch (error) {
      yield* put(authenticationFailure(error as AxiosError))
   }
}

function* signInWithEmail({payload: credentials}: SignInStart) {
   yield* Authenticate(credentials, API_URL.SIGN_IN)
}

function* signUpWithEmail({payload: credentials}: SignUpStart) {
  yield* Authenticate(credentials, API_URL.SIGN_UP)
}


function* logOut() {
   try {
      const {status} = yield* call(deleteRequest, API_URL.LOG_OUT)
      if(status === 200) {
         localStorage.removeItem("token")
         yield put(logOutSuccess())
      }
     
   } catch(error) {
      yield* put(logOutFailure(error as AxiosError))
   }
}

export function* onLogOut() {
   yield* takeLatest(USER_ACTION_TYPES.LOG_OUT_START, logOut)
}

export function* onEmailSignUpStart() {
   yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUpWithEmail)
}

export function* onEmailSignInStart() {
   yield* takeLatest(USER_ACTION_TYPES.SIGN_IN_START, signInWithEmail)
}

export function* userSagas() {
   yield all([
      call(onEmailSignInStart),
      call(onLogOut),
      call(onEmailSignUpStart),
   ]);
}