import * as matchers from "redux-saga-test-plan/matchers";
import { throwError } from "redux-saga-test-plan/providers";
import { expectSaga } from "redux-saga-test-plan";

import {
   API_URL,
   deleteRequest,
   getRequest,
   patchRequest,
   postRequest,
} from "../../api/axios-instance.api";
import {
   DeleteUsersStart,
   SignInStart,
   SignUpStart,
   USER_ACTION_TYPES,
   UpdateUsersStart,
} from "./user.types";
import * as action from "./user.action";
import {
   Authenticate,
   signInWithEmail,
   signUpWithEmail,
   updateUsers,
   deleteUsers,
   updateOrDeleteUsers,
   getUsers,
   logOut,
} from "./user.saga";
import { currentUser, successMessage } from "../../test-utils/fake-data";

const response = { data: { accessToken: "secredcode4324" } };

const allUsers = { data: [currentUser] };
const user = { data: currentUser };

const signInCredentials = {
   email: "test@email.com",
   password: "abc123",
};

const signInStart: SignInStart = {
   type: USER_ACTION_TYPES.SIGN_IN_START,
   payload: signInCredentials,
};

const signUpCredentials = {
   name: "test",
   email: "test@email.com",
   password: "abc123",
};

const signUpStart: SignUpStart = {
   type: USER_ACTION_TYPES.SIGN_UP_START,
   payload: signUpCredentials,
};

const updateUsersAction: UpdateUsersStart = {
   type: USER_ACTION_TYPES.UPDATE_USERS_START,
   payload: [currentUser],
};

const deleteUsersAction: DeleteUsersStart = {
   type: USER_ACTION_TYPES.DELETE_USERS_START,
   payload: [currentUser],
};

// const getUserByNameAction: GetUserByCredentialsStart = {
//    type: USER_ACTION_TYPES.GET_USER_BY_CREDENTIALS_START,
//    payload: "admin",
// };

const error = {
   response: {
      data: {
         message: "wrong credentials",
      },
   },
};
describe("sign in flow", () => {
   test("sign in success", () => {
      return expectSaga(signInWithEmail, signInStart)
         .provide([
            [matchers.call(postRequest, API_URL.SIGN_IN, signInCredentials), response],
         ])
         .call(Authenticate, signInStart.payload, API_URL.SIGN_IN)
         .put(action.authenticationSuccess(currentUser))
         .run();
   });

   test("when user enters wrong credentials recives info toast", () => {
      return expectSaga(signInWithEmail, signInStart)
         .provide([
            [
               matchers.call(postRequest, API_URL.SIGN_IN, signInCredentials),
               throwError(new Error("wrong credentials")),
            ],
         ])
         .call(Authenticate, signInStart.payload, API_URL.SIGN_IN)
         .put(
            action.showToast({
               type: "warning",
               message: `Sign in failed: wrong credentials`,
            })
         )
         .run();
   });

   test("logout success", () => {
      return expectSaga(logOut)
         .provide([[matchers.call(deleteRequest, API_URL.LOG_OUT), { status: 200 }]])
         .put(action.logOutSuccess())
         .run();
   });
});

describe("sign up flow", () => {
   test("sign up success", () => {
      return expectSaga(signUpWithEmail, signUpStart)
         .provide([
            [matchers.call(postRequest, API_URL.SIGN_UP, signUpCredentials), response],
         ])
         .call(Authenticate, signUpStart.payload, API_URL.SIGN_UP)
         .put(action.authenticationSuccess(currentUser))
         .run();
   });
});

describe("update users", () => {
   test("successful update users request", () => {
      return expectSaga(updateUsers, updateUsersAction)
         .provide([
            [matchers.call(patchRequest, API_URL.UPDATE_USERS, [currentUser]), null],
         ])
         .call(
            updateOrDeleteUsers,
            patchRequest,
            updateUsersAction.payload,
            API_URL.UPDATE_USERS
         )
         .put(action.updateUsersSuccess())
         .run();
   });

   test("successful delete users request", () => {
      return expectSaga(deleteUsers, deleteUsersAction)
         .provide([
            [matchers.call(postRequest, API_URL.DELETE_USERS, [currentUser]), null],
         ])
         .call(
            updateOrDeleteUsers,
            postRequest,
            deleteUsersAction.payload,
            API_URL.DELETE_USERS
         )
         .put(action.updateUsersSuccess())
         .run();
   });
});

describe("get users from DB", () => {
   test("successful get all users request", () => {
      return expectSaga(getUsers)
         .provide([[matchers.call(getRequest, API_URL.GET_USERS), allUsers]])
         .put(action.getUsersSuccess(allUsers.data))
         .run();
   });

   // test("successfuly get user by url params", () => {
   //    return expectSaga(getUserByCredentials, getUserByNameAction)
   //       .provide([
   //          [
   //             matchers.call(getRequest, API_URL.GET_USER_SEND_URL, {
   //                name: "admin",
   //             }),
   //             user,
   //          ],
   //       ])
   //       .put(action.getUserByCredentialsSuccess(currentUser))
   //       .run();
   // });
});
