import { combineReducers } from "redux";

import localReducer from "./local/local.reducer";
// import userReducer from "./user/user.reducer";
import collectionReducer from "./collections/collection.slice";
import itemReducer from "./items/item.reducer";
import commentReducer from "./comments/comment.reducer";
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
