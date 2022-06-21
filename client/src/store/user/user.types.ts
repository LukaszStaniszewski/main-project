export enum USER_ACTION_TYPES {
   SET_CURRENT_USER = "SET_CURRENT_USER",
   SIGN_IN_START = "SIGN_IN_START",
   SIGN_IN_SUCESS = "SIGN_IN_SUCESS",
   SIGN_IN_FAILURE = "SIGN_IN_FAILURE",
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