import express from "express"
import dotenv from "dotenv"
dotenv.config({debug: true});
import mongoose from "mongoose"
import cors from "cors"

import getErrorMessage from "./utils/getErrorMessage";
import logger from "./utils/logger"
import userRouter from "./routes/user.route"

mongoose.connect(process.env.MONGO_URL_CLOUD as string).
catch(error => logger.error(error));

const db = mongoose.connection

db.on('error', error => new Error(error))
db.once('open', () => logger.info('🔓 MongoDB connected 🔓'))

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use("/api/user", userRouter)

const PORT = 8000;

app.listen(PORT, () => {
   logger.info(`🚀 Server is running at http://localhost:${PORT} 🚀 `)
})