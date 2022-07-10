import {  call, put, takeLatest, take, all } from "typed-redux-saga/macro"
import { eventChannel, END, EventChannel } from "redux-saga";
import {io, Socket} from "socket.io-client"
import { API_URL, baseUrl, deleteRequest, getRequest, postRequest } from "../../api/axios-instance.api";

import { COMMENTS_ACTION_TYPES, CreateCommentStart, DeleteCommentStart, GetCommentsStart, IComment } from "./comment.types";
import { createCommentFailure, createCommentSuccess, deleteCommentFailure, deleteCommentSuccess, getCommentsFailure, getCommentsSuccess } from "./comment.action";
import { AxiosError } from "axios";

const receiveMessage = (socket: Socket) :EventChannel<IComment[]> => {
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
      const value = yield* take(channel);

      yield* put(getCommentsSuccess(value));
    } catch (error) {
      console.error('socket error:', error)
      yield* put(getCommentsFailure(error as Error))
    }
  }
};


function* createComment ({payload: comment}:CreateCommentStart) {
   try {
      const response = yield* call(postRequest<IComment>, API_URL.CREATE_COMMENT, comment)
      const commentInArray = new Array(response.data)
      yield* put(createCommentSuccess(commentInArray))
   } catch (error) {
      yield* put(createCommentFailure(error as AxiosError))
   }
}

function* deleteComment ({payload: id}: DeleteCommentStart ){
   try {
      yield* call(deleteRequest,`${API_URL.DELETE_COMMENT}/${id}`)
      yield* put(deleteCommentSuccess())
   } catch (error) {
      yield* put(deleteCommentFailure(error as AxiosError))
   }
}

function* getComments ({payload: id}: GetCommentsStart) {
   try {
      const response = yield* call(getRequest<IComment[]>, `${API_URL.GET_COMMENTS}/${id}`)
      yield* put(getCommentsSuccess(response.data))
   } catch (error) {
      yield* put(getCommentsFailure(error as AxiosError))
   }
}

function* onGetCommentsStart() {
   yield* takeLatest(COMMENTS_ACTION_TYPES.GET_COMMENTS_START, getComments)
}

function* onCreateCommentStart() {
   yield* takeLatest(COMMENTS_ACTION_TYPES.CREATE_COMMENT_START, createComment);
 }


 function* onDeleteCommentStart() {
   yield* takeLatest(COMMENTS_ACTION_TYPES.DELETE_COMMENT_START, deleteComment);
 }

function* onGetSocketData() {
  yield* takeLatest(COMMENTS_ACTION_TYPES.GET_COMMENT_START, getSocketData);
}

export default function* commentSagas() {
  yield all([
   call(onGetSocketData),
   call(onCreateCommentStart),
   call(onDeleteCommentStart),
   call(onGetCommentsStart),
  ])
   
}