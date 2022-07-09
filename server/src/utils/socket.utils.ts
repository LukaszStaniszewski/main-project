import {Socket, Server} from "socket.io"
import logger from "./logger"

const socket = ({io} : {io: Server}) => {
   logger.info("😊 Sockets enabled 😊")

   io.on("connection", (socket) => {
      logger.info(`User connected ${socket.id}`)
      console.log(socket.id)
      socket.emit("comment", "hi im working!!!")
   })
}

export default socket