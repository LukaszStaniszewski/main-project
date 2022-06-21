import { USER_ACTION_TYPES, ICurrentUser} from "./user.types"
import { UserAction } from "./user.action"

export interface IUserState {
   currentUser: ICurrentUser | null,
   isLoading: boolean,
   error: Error | null
}

const USER_INITIAL_STATE: IUserState = {
   currentUser: null,
   isLoading: false,
   error: null,
}

export const userReducer = (state = USER_INITIAL_STATE, action = {} as UserAction) => {

   switch(action.type) {
      case USER_ACTION_TYPES.SIGN_IN_START:
         return {
            ...state,
            isLoading: true
         }
      case USER_ACTION_TYPES.SIGN_IN_SUCESS:
         return {
            ...state,
            currentUser: action.payload,
            isLoading: false
         }
      case USER_ACTION_TYPES.SIGN_IN_FAILURE:
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