export enum USER_ACTION_TYPES {
   SET_CURRENT_USER = "SET_CURRENT_USER",
   SIGN_IN_START = "SIGN_IN_START",
   SIGN_UP_START = "SIGN_UP_START",
   // authentication = signIn or signUp
   AUTHENTICATION_SUCCESS = "AUTHENTICATION_SUCCESS",
   AUTHENTICATION_FAILURE = "AUTHENTICATION_FAILURE",

   LOG_OUT_START = "LOG_OUT_START",
   LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS",
   LOG_OUT_FAILURE = "LOG_OUT_FAILURE",

   GET_USERS_START = "GET_USERS_START",
   GET_USERS_SUCCESS = "GET_USERS_SUCCESS",
   GET_USERS_FAILURE = "GET_USERS_FAILURE",
}

export interface ICurrentUser {
   _id: string,
   name: string,
   status: string,
   email: string,
   isAdmin: boolean,
   lastLogin: string,
   sessionId: string,
}

export interface IUserFormValues {
   email: string,
   password: string,
   name?: string,
}
