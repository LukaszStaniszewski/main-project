import express from "express"
import dotenv from "dotenv"
dotenv.config({debug: true});
import mongoose from "mongoose"
import cors from "cors"
import {Server} from "socket.io"
import {createServer} from "http"

import logger from "./utils/logger"
import userRouter from "./routes/user.route"
import sessionRouter from "./routes/session.route";
import deserialaizeUser from "./middleware/deserialaizeUser"
import collectionRouter from "./routes/collection.route";
import itemRouter from "./routes/item.route";
import socket from "./utils/socket.utils"


mongoose.connect(process.env.MONGO_URL_CLOUD as string).
catch(error => logger.error(error));

const db = mongoose.connection
db.on('error', error => new Error(error))
db.once('open', () => logger.info('🔓 MongoDB connected 🔓'))

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
   cors: {
      origin: ["http://localhost:3000"],
      // origin: "*",
      methods: ["GET", "POST", "PATCH", "DELETE"],
      allowedHeaders: ["Access-Control-Allow-Origin"],
      credentials: true
   },
})


app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors({
   methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: false,
}))
app.use(deserialaizeUser) 

app.use("/api/user", userRouter)
app.use("/api/session", sessionRouter)
app.use("/api/collection", collectionRouter)
app.use("/api/item", itemRouter)

const PORT = 8000;

httpServer.listen(PORT, () => {
   logger.info(`🚀 Server is running at http://localhost:${PORT} 🚀 `)
   socket({io})
})