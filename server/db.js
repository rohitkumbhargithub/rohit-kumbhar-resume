import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.warn("WARNING: MONGODB_URI is not defined in .env");
}

let cachedConnection = null;

export async function connectDB() {
  if (cachedConnection && mongoose.connection.readyState >= 1) {
    return cachedConnection;
  }

  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    cachedConnection = conn;
    console.log("Connected to MongoDB Atlas successfully");
    return conn;
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    throw err;
  }
}
