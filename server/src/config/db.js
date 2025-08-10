import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export default async function connectDB() {
  const url = process.env.DB_URL;
  if (!url) throw new Error("DB_URL is not set");
  mongoose.set("strictQuery", true);
  await mongoose.connect(url);
  console.log("MongoDB connected");
}
