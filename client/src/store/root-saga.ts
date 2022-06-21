import { all, call } from 'typed-redux-saga';

import { userSagas } from './user/user.saga';

export default function* rootSaga() {
  yield* all([call(userSagas)]);
}
