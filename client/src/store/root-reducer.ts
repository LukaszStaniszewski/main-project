import { combineReducers } from "redux";

import localReducer from "./local/local.reducer";
import collectionReducer from "./collections/collection.slice";
import itemReducer from "./items/item.slice";
import commentReducer from "./comments/comment.slice";
import userReducer from "./user/user.slice";

const rootReducer = combineReducers({
   user: userReducer,
   localData: localReducer,
   collection: collectionReducer,
   item: itemReducer,
   comments: commentReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
