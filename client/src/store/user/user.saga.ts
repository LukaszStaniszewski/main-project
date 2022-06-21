import {takeLatest, put, all} from "typed-redux-saga"
import * as Effects from "typed-redux-saga"


import { signInSuccess, signInStart, signInFailure, SignInStart } from "./user.action"
import { USER_ACTION_TYPES, } from "./user.types"
import { decodeToken } from "../../utils/userToken.utils"
import {User} from "../../api/axios-instance.api"
import { StrictEffect } from "redux-saga/effects"
import { AxiosResponse } from "axios"

const call: any = Effects.call;

// function* signInWithEmail(payload : IUserLoginCredentials) {
//    try {
//      const authenticate = yield* call(api.signIn(payload))
//      localStorage.setItem('token', JSON.stringify(authenticate.data))
     
//    } catch (error) {
      
//    }
// }

function* signInWithEmail({payload: payload}: SignInStart) {
 
   try {
     const authenticate = yield* call(User.signIn(payload))
   //   const authenticate = yield* User.signIn(payload)
   console.log("authenticate", authenticate)
     localStorage.setItem('token', JSON.stringify(authenticate.data))
     const user = decodeToken()
     console.log("userDecoded", user)
     if(user) {
        yield put(signInSuccess(user))
     }
   } catch (error) {
      yield* put(signInFailure(error as Error))
   }
}

export function* onEmailSignInStart() {
   yield takeLatest(USER_ACTION_TYPES.SIGN_IN_START, signInWithEmail)
}

export function* userSagas() {
   yield all([
      call(onEmailSignInStart),
   ]);
}