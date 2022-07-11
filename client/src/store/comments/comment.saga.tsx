import {  call, put, takeLatest, take, all } from "typed-redux-saga/macro"
import { eventChannel, END, EventChannel } from "redux-saga";
import {io, Socket} from "socket.io-client"
import { API_URL, baseUrl, deleteRequest, getRequest, postRequest } from "../../api/axios-instance.api";

import { COMMENTS_ACTION_TYPES, CreateCommentStart, DeleteCommentStart, GetCommentsStart, GetCommentStart, IComment, ICreateComment } from "./comment.types";
import { createCommentFailure, createCommentSuccess, deleteCommentFailure, deleteCommentSuccess, getCommentFailure, getCommentsFailure, getCommentsSuccess, getCommentSuccess } from "./comment.action";
import { AxiosError } from "axios";
import { IItem } from "../items/item.types";
import socket from "../../api/socket";



const receiveMessage = () :EventChannel<IComment> => {
   socket.on("connect", () => {
     socket.connect();
     console.log('socket disconnected');
   });
   return eventChannel((emitter) => {
      console.log("hit")
      //@ts-ignore
     socket.on("comment", (response) => {
      console.log("response", response)
       emitter(response);
     });
     return () => {
       emitter(END);
     }
   });
 };

const createComment =  (comment : ICreateComment) :EventChannel<IComment> => {
   socket.on("connect", () => {
      socket.connect();
   });
   return eventChannel((emitter) => {

      socket.emit("createComment", comment, (response: {data: IComment}) => {
         emitter(response.data);
      });
      return () => {
         emitter(END);
      }
   });
 };


function* createCommentSocket ({payload: comment}: CreateCommentStart) {
   const data =yield* call(createComment, comment)
   while (true) {
      try {
        const value = yield* take(data);
        yield* put(createCommentSuccess(value));
      } catch (error) {
        console.error('socket error:', error)
        yield* put(createCommentFailure(error as Error))
      }
    }
}
 
function* getCommentFromSocket () {
   console.log("hit")
   const channel = yield* call(receiveMessage);
   while (true) {
     try {
       const value = yield* take(channel);
       yield* put(getCommentSuccess(value));
     } catch (error) {
       console.error('socket error:', error)
       yield* put(getCommentFailure(error as Error))
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
function* onGetCommentFromSocket() {
   yield* takeLatest(COMMENTS_ACTION_TYPES.GET_COMMENT_START, getCommentFromSocket)
}

function* onGetCommentsStart() {
   yield* takeLatest(COMMENTS_ACTION_TYPES.GET_COMMENTS_START, getComments)
}

function* onCreateCommentStart() {
   yield* takeLatest(COMMENTS_ACTION_TYPES.CREATE_COMMENT_START, createCommentSocket);
 }


 function* onDeleteCommentStart() {
   yield* takeLatest(COMMENTS_ACTION_TYPES.DELETE_COMMENT_START, deleteComment);
 }


export default function* commentSagas() {
  yield all([
   call(onCreateCommentStart),
   call(onDeleteCommentStart),
   call(onGetCommentsStart),
   call(onGetCommentFromSocket),
  ])
   
}