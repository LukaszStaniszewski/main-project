import { combineReducers} from "redux";

import localReducer from "./local/local.reducer";
import userReducer from "./user/user.reducer";

const rootReducer = combineReducers({
   userData: userReducer,
   localData: localReducer,
});

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer