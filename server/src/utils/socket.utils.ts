import {Socket, Server} from "socket.io"
import logger from "./logger"
import { createComment } from "../services/comment.service"

const socket = ({io} : {io: Server}) => {
   logger.info("😊 Sockets enabled 😊")

  io.on("connection", (socket : Socket) => {
      logger.info(`User connected ${socket.id}`)

       socket.on("createComment", async (commentData, callback) => {
         const comment =  await createComment(commentData)
         callback({
            comment: comment
         })
      }) 
   })
}

export default socket