import path from "path";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import { Server } from "socket.io";
import { createServer } from "http";

import logger from "./utils/logger";

import socket from "./utils/socket.utils";
import createExpressServer from "./utils/server";

mongoose
   .connect(process.env.MONGO_URL_CLOUD as string, { socketTimeoutMS: 45000 })
   .catch((error) => logger.error(error));

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => logger.info("🔓 MongoDB connected 🔓"));

const app = createExpressServer();

const httpServer = createServer(app);
const io = new Server(httpServer, {
   cors: {
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST", "PATCH", "DELETE"],
      allowedHeaders: ["Content-type", "Authorization", "x-refresh"],
      credentials: true,
   },
});

if (process.env.NODE_ENV === "production") {
   app.use(express.static(path.join(__dirname, "../../client/build")));

   app.get("*", (req, res) =>
      res.sendFile(path.resolve(__dirname, "../../", "client", "build", "index.html"))
   );
} else {
   app.get("/", (req, res) => res.send("Please set to production"));
}

const PORT = process.env.PORT || 8000;

httpServer.listen(PORT, async () => {
   logger.info(`🚀 Server is running at http://localhost:${PORT} 🚀 `);
   socket({ io });
   // await connect();
});
