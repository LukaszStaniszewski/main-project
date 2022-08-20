import mongoose from "mongoose";
import logger from "./logger";

const connect = async () => {
   const dbUri = process.env.MONGO_URL_CLOUD as string;

   try {
      await mongoose.connect(dbUri, { socketTimeoutMS: 45000 });
      logger.info("🔓 MongoDB connected 🔓");
   } catch (error) {
      logger.error("Could not connect to db");
      process.exit(1);
   }
};

export default connect;
