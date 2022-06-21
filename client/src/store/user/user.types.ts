export enum USER_ACTION_TYPES {
   SET_CURRENT_USER = "SET_CURRENT_USER",
   SIGN_IN_START = "SIGN_IN_START",
   SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS",
   SIGN_IN_FAILURE = "SIGN_IN_FAILURE",
   LOG_OUT_START = "LOG_OUT_START",
   LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS",
   LOG_OUT_FAILURE = "LOG_OUT_FAILURE",
}

export interface ICurrentUser {
   _id: string,
   name: string,
   status: string
   isAdmin: boolean,
   lastLogin: string,
   sessionId: string,
}

export interface IUserFormValues {
   email: string,
   password: string,
   name?: string,
}