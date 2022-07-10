import {  call, put, takeLatest, take, all } from "typed-redux-saga/macro"
import { eventChannel, END, EventChannel } from "redux-saga";
import {io, Socket} from "socket.io-client"
import { API_URL, baseUrl, deleteRequest, getRequest, postRequest } from "../../api/axios-instance.api";

import { COMMENTS_ACTION_TYPES, CreateCommentStart, DeleteCommentStart, GetCommentsStart, GetCommentStart, IComment, ICreateComment } from "./comment.types";
import { createCommentFailure, createCommentSuccess, deleteCommentFailure, deleteCommentSuccess, getCommentFailure, getCommentsFailure, getCommentsSuccess, getCommentSuccess } from "./comment.action";
import { AxiosError } from "axios";
import { IItem } from "../items/item.types";


const receiveMessage = (socket: Socket, comment: ICreateComment) :EventChannel<IComment> => {
   socket.on("disconnect", () => {
     socket.connect();
     console.log('socket disconnected');
   });
   return eventChannel((emitter) => {
      //@ts-ignore
     socket.emit("createComment" ,comment, (response) => {
       emitter(response);
     });
     return () => {
       emitter(END);
     }
   });
 };
 
 
 function* getSocketData ({payload: comment}: CreateCommentStart) {
   const socket = io(baseUrl);
   const channel = yield* call(receiveMessage, socket, comment);
   while (true) {
     try {
       const value = yield* take(channel);
         //@ts-ignore
       yield* put(createCommentSuccess(value.comment));
     } catch (error) {
       console.error('socket error:', error)
       yield* put(createCommentFailure(error as Error))
     }
   }
 };


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
   yield* takeLatest(COMMENTS_ACTION_TYPES.CREATE_COMMENT_START, getSocketData);
 }


 function* onDeleteCommentStart() {
   yield* takeLatest(COMMENTS_ACTION_TYPES.DELETE_COMMENT_START, deleteComment);
 }


export default function* commentSagas() {
  yield all([
   call(onCreateCommentStart),
   call(onDeleteCommentStart),
   call(onGetCommentsStart),
  ])
   
}