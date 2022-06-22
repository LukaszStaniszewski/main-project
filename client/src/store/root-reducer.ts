import { combineReducers} from "redux";

import userReducer from "./user/user.reducer";

const rootReducer = combineReducers({
   userData: userReducer
});

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer