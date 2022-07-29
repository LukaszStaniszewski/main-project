import { ICurrentUser, USER_ACTION_TYPES } from "./user.types";
import { UserAction } from "./user.types";

export interface IError {
   response: {
      data: {
         message: string;
      };
   };
}

export interface IUserState {
   currentUser: ICurrentUser | null;
   users: ICurrentUser[];
   user: ICurrentUser | null;
   isLoading: boolean;
   error: IError | null;
}

const USER_INITIAL_STATE: IUserState = {
   currentUser: null,
   user: null,
   error: null,
   users: [],
   isLoading: true,
};

const userReducer = (state = USER_INITIAL_STATE, action = {} as UserAction) => {
   switch (action.type) {
      case USER_ACTION_TYPES.SIGN_IN_START:
      case USER_ACTION_TYPES.SIGN_UP_START:
      case USER_ACTION_TYPES.GET_USERS_START:
      case USER_ACTION_TYPES.LOG_OUT_START:
      case USER_ACTION_TYPES.GET_USER_BY_CREDENTIALS_START:
         return {
            ...state,
            isLoading: true,
            error: null,
         };
      case USER_ACTION_TYPES.AUTHENTICATION_SUCCESS:
         return {
            ...state,
            currentUser: action.payload,
            isLoading: false,
         };
      case USER_ACTION_TYPES.GET_USER_BY_CREDENTIALS_SUCCESS:
         return {
            ...state,
            user: action.payload,
            isLoading: false,
         };
      case USER_ACTION_TYPES.LOG_OUT_SUCCESS:
         return {
            ...state,
            currentUser: null,
            isLoading: false,
            error: null,
         };
      case USER_ACTION_TYPES.GET_USERS_SUCCESS:
      case USER_ACTION_TYPES.SET_USERS:
         return {
            ...state,
            isLoading: false,
            users: action.payload,
         };
      case USER_ACTION_TYPES.SET_CURRENT_USER:
         return {
            ...state,
            currentUser: action.payload,
         };
      case USER_ACTION_TYPES.AUTHENTICATION_FAILURE:
      case USER_ACTION_TYPES.LOG_OUT_FAILURE:
      case USER_ACTION_TYPES.GET_USERS_FAILURE:
      case USER_ACTION_TYPES.UPDATE_USERS_FAILURE:
         return {
            ...state,
            error: action.payload,
            isLoading: false,
         };
      default:
         return state;
   }
};

export default userReducer;
