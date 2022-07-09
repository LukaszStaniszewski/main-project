import { combineReducers} from "redux";

import localReducer from "./local/local.reducer";
import userReducer from "./user/user.reducer";
import collectionReducer from "./collections/collection.reducer";
import itemReducer from "./items/item.reducer";
import commentReducer from "./comments/comment.reducer";

const rootReducer = combineReducers({
   user: userReducer,
   localData: localReducer,
   collection: collectionReducer,
   item: itemReducer,
   comments: commentReducer,
});

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer