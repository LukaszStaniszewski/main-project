import {Socket, Server} from "socket.io"
import logger from "./logger"
import { createComment } from "../services/comment.service"

const socket = ({io} : {io: Server}) => {
   logger.info("😊 Sockets enabled 😊")

  io.on("connection", (socket : Socket) => {
      logger.info(`User connected ${socket.id}`)

         //@ts-ignore
      // const getComment = (comment) => socket.emit("62c96bacd0cccdf3117ef724", comment)

       socket.on("createComment", async (commentData, callback) => {
         const comment =  await createComment(commentData)
         // getComment(comment)
         socket.broadcast.emit("comment", comment)
         callback({
            data: comment
         })
      }) 
   })
}

export default socket