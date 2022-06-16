import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
dotenv.config({debug: true});

import logger from "./utils/logger"

mongoose.connect(process.env.MONGO_URL_CLOUD as string).
catch(error => logger.error(error));

const db = mongoose.connection

db.on('error', error => logger.error(error))
db.once('open', () => logger.info('🔓 Database connected 🔓'))

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors())

const PORT = 8000;

app.listen(PORT, () => {
   logger.info(`🚀 Server is running at http://localhost:${PORT} 🚀 `)
})