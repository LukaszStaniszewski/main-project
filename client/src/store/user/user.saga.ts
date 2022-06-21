import {takeLatest, put, all, call} from "typed-redux-saga/macro"
import { signInSuccess, signInFailure, SignInStart, logOutSuccess, logOutFailure,} from "./user.action"
import { USER_ACTION_TYPES, } from "./user.types"
import { decode as decodeToken } from "../../utils/userToken.utils"
import {User} from "../../api/axios-instance.api"

function* signInWithEmail({payload: credentials}: SignInStart) {
 
   try {
     const {data, status} = yield* call(User.signIn, credentials)
     localStorage.setItem('token', JSON.stringify(data))

     const user = decodeToken(data.accessToken)
     if(user) {
        yield* put(signInSuccess(user))
     }
   } catch (error) {
      yield* put(signInFailure(error as Error))
   }
}

function* logOut() {
   try {
      const repsonse = yield* call(User.logout)
      localStorage.removeItem("token")
      yield put(logOutSuccess())
   } catch(error) {
      yield* put(logOutFailure(error as Error))
   }
}

export function* onLogOut() {
   yield* takeLatest(USER_ACTION_TYPES.LOG_OUT_START, logOut)
}

export function* onEmailSignInStart() {
   yield* takeLatest(USER_ACTION_TYPES.SIGN_IN_START, signInWithEmail)
}

export function* userSagas() {
   yield all([
      call(onEmailSignInStart),
      call(onLogOut)
   ]);
}