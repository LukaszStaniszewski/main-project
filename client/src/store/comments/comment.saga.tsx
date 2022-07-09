import {  call, put, takeLatest, take, all } from "typed-redux-saga/macro"
import { eventChannel, END, EventChannel } from "redux-saga";
import {io, Socket} from "socket.io-client"
import { baseUrl } from "../../api/axios-instance.api";

import { COMMENTS_ACTION_TYPES, IComment } from "./comment.types";
import { getCommentFailure, getCommentSuccess } from "./comment.action";

const receiveMessage = (socket: Socket) :EventChannel<IComment> => {
  socket.on("disconnect", () => {
    socket.connect();
    console.log('socket disconnected');
  });
  return eventChannel((emitter) => {
    socket.on('comment', (msg) => {
      emitter(msg);
    });
    return () => {
      emitter(END);
    }
  });
};

function* getSocketData () {
  const socket = io(baseUrl);
  const channel = yield* call(receiveMessage, socket);
  while (true) {
    try {
      const value = yield* take<IComment>(channel);

      yield* put(getCommentSuccess(value));
    } catch (error) {
      console.error('socket error:', error)
      yield* put(getCommentFailure(error as Error))
    }
  }
};
function* onGetSocketData() {
  yield* takeLatest(COMMENTS_ACTION_TYPES.GET_COMMENT_START, getSocketData);
}

export default function* commentSagas() {
  yield all([onGetSocketData()]);
}