import { all, call } from 'typed-redux-saga';

import userSagas from './user/user.saga';
import collectionSagas from "./collections/collection.saga";
import itemsSaga from "./items/item.saga";
import commentSagas from "./comments/comment.saga";

export default function* rootSaga() {
   yield* all([
      call(userSagas),
      call(collectionSagas),
      call(itemsSaga),
      call(commentSagas)
   ]);
}
