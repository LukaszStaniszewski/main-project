import { USER_ACTION_TYPES, ICurrentUser} from "./user.types"
import { UserAction } from "./user.action"

export interface IError {
   response: {
      data: {
         message: string
      }
   }
}

export interface IUserState {
   currentUser: ICurrentUser | null,
   users: ICurrentUser[]
   isLoading: boolean,
   error: IError | null
}

const USER_INITIAL_STATE: IUserState = {
   currentUser: null,
   users: [],
   isLoading: true,
   error: null,
}

const userReducer = (state = USER_INITIAL_STATE, action = {} as UserAction) => {

   switch(action.type) {
      case USER_ACTION_TYPES.SIGN_IN_START:
      case USER_ACTION_TYPES.GET_USERS_START:
         return {
            ...state,
            isLoading: true,
            error: null,
         }
      case USER_ACTION_TYPES.AUTHENTICATION_SUCCESS:
         return {
            ...state,
            currentUser: action.payload,
            isLoading: false,
            error: null,
         }
      case USER_ACTION_TYPES.LOG_OUT_SUCCESS:
         return {
            ...state,
            currentUser: null,
            error: null,
         }
      case USER_ACTION_TYPES.GET_USERS_SUCCESS:
         return {
            ...state,
            isLoading: false,
            users: action.payload,
            error: null,
         }
      case USER_ACTION_TYPES.SET_CURRENT_USER:
         return {
            ...state,
            currentUser: action.payload
         }
      case USER_ACTION_TYPES.AUTHENTICATION_FAILURE:
      case USER_ACTION_TYPES.GET_USERS_FAILURE:
      case USER_ACTION_TYPES.LOG_OUT_FAILURE:   
         return {
            ...state,
            error: action.payload,
            isLoading: false,
         }
      default:
         return state
   }
}

export default userReducer