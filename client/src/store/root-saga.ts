import { all, call } from 'typed-redux-saga';

import userSagas from './user/user.saga';
import collectionSagas from "./collections/collection.saga";

export default function* rootSaga() {
   yield* all([
      call(userSagas),
      call(collectionSagas)
   ]);
}
