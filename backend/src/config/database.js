import mongoose from "mongoose";
import config from "./config.js";

const connectDatabase = async () => {
  try {
    await mongoose.connect(config.database.mongoUri);

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);

    process.exit(1);
  }
};

export default connectDatabase;
