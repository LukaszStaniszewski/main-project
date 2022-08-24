import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import deserialaizeUser from "../middleware/deserialaizeUser";
import collectionRouter from "../routes/collection.route";
import commentRouter from "../routes/comment.route";
import itemRouter from "../routes/item.route";
import sessionRouter from "../routes/session.route";
import userRouter from "../routes/user.route";

const createExpressServer = () => {
   const app = express();
   app.use(express.json());
   app.use(express.urlencoded({ extended: false }));
   app.use(
      cors({
         origin: process.env.ORIGIN,
         methods: ["GET", "POST", "PATCH", "DELETE"],
         credentials: false,
         allowedHeaders: ["Content-type", "Authorization", "x-refresh"],
      })
   );
   app.use(deserialaizeUser);

   app.use("/api/user", userRouter);
   app.use("/api/session", sessionRouter);
   app.use("/api/collection", collectionRouter);
   app.use("/api/item", itemRouter);
   app.use("/api/comment", commentRouter);

   return app;
};
export default createExpressServer;
